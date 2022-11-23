import { useState, useEffect, useContext } from "react";
import Task from "../components/Task";
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext"
import defaultsToLocalStorage from "../functions/defaultsToLocalStorage";

function ToDo() {
    const { name, img, setName, setImg, unfinishedTasks, setUnfinishedTasks, doneAndDelTasks, setDoneAndDelTasks } = useContext(AppContext)
    const { setIsAuthenticated } = useContext(AuthContext)
    const [addTaskText, setAddTaskText] = useState('');
    useEffect(() => {
        const userNameFromLocal = localStorage.getItem("USER_NAME");
        const userImgFromLocal = localStorage.getItem("USER_IMG");
        const DoneAndDelTasksNum = localStorage.getItem("DONE_AND_DELETED_TASKS");
        const TaskNames = localStorage.getItem("TASKS");
        setDoneAndDelTasks(JSON.parse(DoneAndDelTasksNum))
        setUnfinishedTasks(JSON.parse(TaskNames))
        setName(JSON.parse(userNameFromLocal))
        setImg(JSON.parse(userImgFromLocal))
    }, [])

    const logout = () => {
        defaultsToLocalStorage();
        setIsAuthenticated(false)
        setImg([]);
        setName('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (unfinishedTasks.some(task => task === addTaskText) || addTaskText.length === 0) {
            alert('NOPE!')
        } else {
            setUnfinishedTasks(prev => {
                const newTasks = [...prev, addTaskText];
                localStorage.setItem("TASKS", JSON.stringify(newTasks))
                return newTasks
            });
        }
        setAddTaskText("");
    }

    const clearTask = (key, taskName) => {
        setDoneAndDelTasks(prev => {
            const newNumbersOfDoneAndDeletedTasks = { ...prev, [key]: prev[key] + 1 }
            localStorage.setItem("DONE_AND_DELETED_TASKS", JSON.stringify(newNumbersOfDoneAndDeletedTasks))
            return newNumbersOfDoneAndDeletedTasks
        })

        setUnfinishedTasks(() => {
            const newTasks = unfinishedTasks.filter((task) => task !== taskName)
            localStorage.setItem("TASKS", JSON.stringify(newTasks))
            return newTasks
        })
    }
    return (
        <section className=''>
            <header className='bg-black mb-10'>
                <div className="flex justify-between items-center pt-6 px-4 sm:px-[28px]">
                    <h1 className='text-white text-xl sm400:text-[36px] font-black'>TO DO</h1>
                    <div className='flex items-center'>
                        <span className='text-white text-sm sm400:text-lg'>{name}</span>
                        <img alt='img' src={img} className='w-[68px] h-[68px] rounded-full ml-2 sm:ml-4' />
                    </div>
                </div>
                <button onClick={logout} className="text-red-500 ml-auto mr-8 py-2 block"> Log Out</button>
            </header>
            <main className='text-center px-4'>
                <div>
                    <div className="text-center">
                        <span className='text-main-green font-bold text-5xl'>{doneAndDelTasks.done}</span>
                        <span className=' font-bold text-4xl'>/</span>
                        <span className='text-main-red font-bold text-5xl'>{doneAndDelTasks.deleted}</span>
                    </div>
                    <button
                        className="text-white text-sm block mx-auto hover:text-main-green"
                        onClick={() => {
                            setDoneAndDelTasks(prev => ({ done: 0, deleted: 0 }))
                            localStorage.setItem("DONE_AND_DELETED_TASKS", JSON.stringify({ done: 0, deleted: 0 }))
                        }}
                    >New Day</button>
                </div>
                <h1 className='text-2xl sm400:text-[35px] sm:text-[42px] font-semibold mb-6'>Add Your Daily Tasks</h1>
                <div className='sm:w-595 mx-auto'>
                    <form className='w-full mb-10 flex ' onSubmit={handleSubmit}>
                        <input
                            className='bg-main-gray rounded-l w-full inline-block py-2 px-6'
                            placeholder='my task'
                            value={addTaskText}
                            onChange={(e) => setAddTaskText(e.target.value)}
                        ></input>
                        <button type="submit" className='bg-main-green hover:bg-black hover:text-white rounded-r p-2 sm400:p-4 text-xl sm400:text-[32px]'>Add</button>
                    </form>
                    <div>
                        {unfinishedTasks.map((task) => <Task taskName={task} key={uuidv4()} clearTask={clearTask} />)}
                    </div>
                </div>
            </main>
        </section>
    );
}

export default ToDo;