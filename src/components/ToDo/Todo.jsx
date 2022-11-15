import React, {useState} from 'react'
import TodoForm from './TodoForm'
import { TiEdit } from 'react-icons/ti'

import done_icon from '../../assets/images/done_icon.svg'
import delete_icon from '../../assets/images/delete_icon.svg'

const Todo = ({todos, completeTodo, removeTodo, updateTodo}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }

  return todos.map((todo, index) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
      <div key={todo.id}>
        {todo.text}
      </div>
      <div className='icons'>
        <div className='done-icon' onClick={() => completeTodo(todo.id)}>
          <img src={done_icon} alt='done-icon'/>
        </div>
        <TiEdit className='edit-icon'onClick={() => setEdit({id: todo.id, value: todo.text})}/>
        <div className='delete-icon' onClick={() => removeTodo(todo.id)}>
          <img src={delete_icon} alt='delete-icon'/>
        </div>
      </div>
    </div>
  ))
}

export default Todo