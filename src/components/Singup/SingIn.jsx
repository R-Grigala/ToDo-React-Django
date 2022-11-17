import React, { useState, useEffect, useRef} from "react";
import Avatar from "react-avatar-edit"
import { Link } from 'react-router-dom'
import TodoList from "../ToDo/TodoList";
import './singIn.css'


const Singup = () => {

  const avatar = useRef();
  const localAvatar = localStorage.getItem("avatar");
  const [preview, setPreview] = useState(null);


  const [showHome,setShowHome]=useState(false)
  const [show,setShow]=useState(false)

  const name = useRef();
  const localName = localStorage.getItem("name");
  const localSignUp=localStorage.getItem("signUp")

  useEffect(()=>{
    if(localSignUp){
        setShowHome(true)
    }
    if(localName){
        setShow(true)
    }
   })


  function onClose() {
    setPreview(null);
  }

  function onCrop(pv) {
    setPreview(pv);
  }

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  const handleClick = () => {
    
    if(name.current.value){
      localStorage.setItem("name", name.current.value)
      console.log(name.current.value)
    }
  };

  const handleSignIn = () => {
    if(name.current.value===localName){
        localStorage.setItem("signUp",name.current.value)
    }
   }
  return (
    <div className="container-singin">
      {showHome?<TodoList/>: <Link to='/singin'/>}
      <div className="update-img">
        <Avatar
          width={122}
          height={122}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={null}
        />
        {preview && <img src={preview} alt="Preview" />}
      </div>
      <div>
        <form>
          <h3>fill in you name</h3>
          <input
              type='text' 
              placeholder='your name' 
              name="text"
              className='todo-input' 
              onChange={handleClick}
              ref={name}
          />
          <button className='singin-button' onSubmit={handleSignIn}>Sing In</button>
        </form>
      </div>      
    </div>
  );
}

export default Singup