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
const [todos, setTodos] = useState([]);

// ToDo-ჩამონათვალში ახალი task-ის დამატება
const addTodo = todo => {
  // Task-ის ტექსტში არასაჭირო space-ების ამოშლა 
  if(!todo.text || /^\s*$/.test(todo.text)){
    return
  }

  const newTodos = [todo, ...todos]

  setTodos(newTodos);
  console.log(todo, ...todos);
};

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
        <button className='singin-button' onSubmit={addTodo}>Sing In</button>
      </div>      
    </div>
  );
}

export default Singup