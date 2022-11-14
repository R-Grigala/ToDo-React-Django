import React, {useState} from 'react'
import TodoForm from './TodoForm'

import done_icon from '../assets/images/done_icon.svg'
import delete_icon from '../assets/images/delete_icon.svg'

const Todo = ({todos, completeTodo, removeTodo}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })

  return todos.map((todo, index) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <div className='done_icon' onClick={() => removeTodo(todo.id)}>
          <img src={done_icon} alt='done_icon'/>
        </div>
        <div className='delete_icon'>
          <img src={delete_icon} alt='delete_icon'/>
        </div>
      </div>
    </div>
  ))
}

export default Todo