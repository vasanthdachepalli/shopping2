const express = require("express");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const config = require("../config/firebase");
const order = require('../database/orders')
const router = express.Router();

// Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("photo"), async (req, res) => {
    try {
        console.log(req.body);
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        // By using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);
        order.create({
            Sellerid : req.user.username,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            brandName: req.body.brandName,
            category: req.body.category,
            photo: downloadURL, // Change to single photo
            cost: req.body.cost,
            shippingDays: req.body.shippingDays
        });
        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
router.post('/update/:id',(req,res)=>{
   
    order.findByIdAndUpdate(req.params.id,{
        $set:{
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            brandName: req.body.brandName,
            category: req.body.category,
            cost: req.body.cost,
            shippingDays: req.body.shippingDays
        }
    })
    .then(()=>{
        res.status(200).send('updated suuccfully')
    })
    .catch( (error)=> {
        return res.status(400).send(error.message);
    })
})

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};

module.exports = router;
