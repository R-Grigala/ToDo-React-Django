import './App.css';
import SingIn from './components/Singup/SingIn';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import TodoList from './components/ToDo/TodoList';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/singin" element={<SingIn />}/>
      <Route path="/todo" element={<TodoList />}/>
    </Routes>
    </>
  );
}

export default App;
