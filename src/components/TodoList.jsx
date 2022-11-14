import React, {useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if(!todo.text || /^\s*$/.test(todo.text)){
      return
    }

    const newTodos = [todo, ...todos]

    setTodos(newTodos);
    console.log(todo, ...todos);
  };

  const deleteTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)

    setTodos(removeArr);
  };

  const completeTodo = id => {
    let updateTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  } 

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo}/>
      <Todo 
      todos={todos}
      completeTodo={completeTodo}
      removeTodo={deleteTodo}
      />
    </div>
  )
}

export default TodoList