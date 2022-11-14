import React, {useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

const TodoList = () => {
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

  const updateTodo = (todoId, newValue) => {
    if(!newValue.text || /^\s*$/.test(newValue.text)){
      return
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
  }

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
    <div className='container'>
      <h1>Add Your Daily Tasks</h1>
      <TodoForm onSubmit={addTodo}/>
      <Todo 
      todos={todos}
      completeTodo={completeTodo}
      removeTodo={deleteTodo}
      updateTodo={updateTodo}
      />
    </div>
  )
}

export default TodoList