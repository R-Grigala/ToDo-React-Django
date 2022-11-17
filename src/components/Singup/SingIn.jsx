import React, { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar-edit"


const Singup = (props) => {

  const [preview, setPreview] = useState(null);
  const [input, setInput] = useState('');

  const inputRef = useRef(null)

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

  useEffect(() => {
    inputRef.current.focus()
})

const handleChange = e => {
    setInput(e.target.value);
};

const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input
    });

    setInput('');
}

  return (
    <div className="container-singup">
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
      <div onSubmit={handleSubmit}>
        <h3>fill in you name</h3>
        <input
            type='text' 
            placeholder='my task' 
            value={input} 
            name="text"
            className='todo-input' 
            onChange={handleChange}
            ref={inputRef}
        />
        <button className='singin-button'>Sing In</button>
      </div>      
    </div>
  );
}

export default Singup