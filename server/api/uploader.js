const express = require("express");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const config = require("../config/firebase");

const router = express.Router();

// Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("filenames"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();
        const files = req.files;
        const uploadPromises = [];

        for (const file of files) {
            const storageRef = ref(storage, `files/${file.originalname + "       " + dateTime}`);

            // Create file metadata including the content type
            const metadata = {
                contentType: file.mimetype,
            };

            // Upload the file in the bucket storage
            const uploadPromise = uploadBytesResumable(storageRef, file.buffer, metadata);
            uploadPromises.push(uploadPromise);
        }

        // Wait for all files to be uploaded
        const snapshots = await Promise.all(uploadPromises);

        // Get download URLs for all uploaded files
        const downloadURLs = await Promise.all(snapshots.map(snapshot => getDownloadURL(snapshot.ref)));

        console.log('Files successfully uploaded.');
        console.log(downloadURLs)
        return res.send({
            message: 'Files uploaded to Firebase Storage',
            files: files.map((file, index) => ({
                name: file.originalname,
                type: file.mimetype,
                downloadURL: downloadURLs[index]
            }))
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

module.exports = router;
