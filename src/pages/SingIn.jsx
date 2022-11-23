import AddIMG from "../img/addimg.png"
import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import ROUTES from "../config/ROUTES"
import { AppContext } from "../context/AppContext"
import { AuthContext } from "../context/AuthContext"

function SignIn() {
    const { name, setName, img, setImg } = useContext(AppContext)
    const { setIsAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate();
    const uploadFileInput = useRef(null);

    const uploadImg = () => {
        uploadFileInput.current.click();
    }

    const imgFilehandler = (e) => {
        if (e.target.files.length !== 0) {
            setImg(URL.createObjectURL(e.target.files[0]));
        }
    };

    const isUploaded = () => {
        if (img.length === 0) {
            return false
        }
        return true
    }

    const signInButton = () => {
        if (isUploaded() && name.length >= 4) {
            localStorage.setItem("USER_IMG", JSON.stringify(img))
            localStorage.setItem("USER_NAME", JSON.stringify(name))
            localStorage.setItem("IS_AUTHENTICATED", "1")
            setIsAuthenticated(true);
            navigate(`/${ROUTES.TODO}`);
        } else {
            alert("INFO!")
        }
    }

    return (
        <section className='sm:bg-black text-center  sm:pt-8 pb-10'>
            <main className='bg-white max-w-xl mx-auto pt-8 sm:rounded px-8 pb-8 sm:px-10'>
                <h1 className='font-semibold text-[40px] sm:text-[48px] mb-6 sm:mb-10'>Get Started</h1>
                {!isUploaded() ? <span className='text-[22px] block mb-2'>add a photo</span> : ''}

                <input
                    ref={uploadFileInput}
                    type='file'
                    className="hidden"
                    onChange={imgFilehandler}
                ></input>

                {isUploaded()
                    ? <div>
                        <img alt="camera" className='w-[100px] h-[100px] mx-auto rounded-full' src={img} />
                        <button className="mt-2 text-sm hover:text-main-green" onClick={uploadImg}> Change Image</button>
                    </div>
                    : <button onClick={uploadImg} className="block mx-auto bg-main-gray hover:bg-main-green p-8 rounded-full">
                        <img alt="camera" src={AddIMG} />
                    </button>
                }
                <span className='text-[22px] block mt-6 sm:mt-12 mb-4'>fill in you name</span>
                <form onSubmit={signInButton}>
                    <input
                        placeholder='your name'
                        className='bg-main-gray w-full h-[76px] px-6'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <button
                        type="submit"
                        className='bg-main-green hover:bg-black hover:text-white text-[32px] block mx-auto  px-16 sm:px-20 mt-8 mb-4 sm:mt-16 rounded'
                    >Sign In</button>
                </form>
            </main>
        </section>
    );
}

export default SignIn;