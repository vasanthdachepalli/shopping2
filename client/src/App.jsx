import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Nav1 from './pages/Nav'
import "./App.css";
import Addproduct from './pages/Addproduct'

import Detailed from './pages/Detailed';
function App() {
  const [user, setUser] = useState(0);
const[userid,setuserid] = useState(null);
  const getUser = async () => {
    try {
      const url = `http://localhost:8080/api/count`;
      const { data } = await axios.get(url, {
        withCredentials: true
      });
      setUser(data.count);
     
    } catch (err) {
      console.log(err);
    }
  };

  const getUserid = async () => {
    try {
      const url = `http://localhost:8080/users`;
      const response = await axios.get(url, {
        withCredentials: true
      });
      setuserid(response.data.userid);
     console.log( response.data.userid)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
    getUserid();
   
  }, []);

  let componentToRender;

  if (user === 0) {
    componentToRender = <Login />;
  } else if (user === 1) {
    componentToRender = <Welcome />;
  } else {
    componentToRender = <Home user={userid}/>;
  }

  return (
    <div className="container">
      <div>
        {user === 2 && <Nav1/>}
      </div>
      <Routes>
        <Route exact path="/" element={componentToRender} />
    
        <Route exact path="/addproduct" element={user ? <Addproduct /> : <Navigate to="/" />} />
    
        <Route
        path="/product/:id"
 
        element={<Detailed user={userid}/>} // Pass all route props to SingleProduct
      />
       
        </Routes>
    </div>
  );
}

export default App;
