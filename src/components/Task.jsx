import Done from "../img/done.png"
import Delete from "../img/del.png"


function Task({ taskName, clearTask }) {

    return (
        <div className='bg-black hover:bg-neutral-900 w-full items-center flex justify-between mb-4 '>
            <span className='text-white ml-4'>{taskName}</span>
            <div className='flex items-center'>
                <button
                    onClick={() => clearTask("done", taskName)}
                    className='hover:bg-main-green px-2 py-[13px]'>
                    <img alt='add' src={Done} />
                </button>
                <button
                    onClick={() => clearTask("deleted", taskName)}
                    className='hover:bg-main-red p-2'>
                    <img alt='del' src={Delete} />
                </button>
            </div>
        </div>
    )

}

export default Task