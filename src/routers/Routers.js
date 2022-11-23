import React from 'react'
import SingUp from '../pages/SingUp';
import { Route, Routes, Navigate} from "react-router-dom";
import Home from '../pages/Home';
import ToDo from '../pages/ToDo';


const Routers = () => {
    return (
        <Routes>
          <Route path="/" element={<Navigate to="home" />}/>
          <Route path='/home' element={<Home/>}/>
          <Route path="/singup" element={<SingUp />}/>
          <Route path="/todo" element={<ToDo />}/>
        </Routes>
      );
}

export default Routers