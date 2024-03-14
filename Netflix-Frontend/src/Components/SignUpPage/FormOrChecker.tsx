import { USER_SIGNIN } from "../../Helpers/Actions";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { postData } from "../../Helpers/httpRequest";
import { getError } from "../../Helpers/utils";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/Context/user";


const FormOrChecker = () => {



    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { dispatch: ctxDispatch } = useContext(User);
    const [error, setError] = useState<string>("");
    const [isEmail, setIsEmail] = useState<boolean>(false);


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailValue = emailRef.current?.value || "";
            const passwordValue = passwordRef.current?.value || "";
            const confirmPasswordValue = confirmPasswordRef.current?.value || "";
            const usernameValue = usernameRef.current?.value || "";

            if (passwordValue !== confirmPasswordValue) {
                setError("Passwords do not match");
                return;
            }

            const data = await postData("/api/v1/users/signup", { email: emailValue, password: passwordValue, username: usernameValue, isAdmin: false });
            if (data) {
                ctxDispatch({ type: USER_SIGNIN, payload: data })
                localStorage.setItem("userInfo",JSON.stringify(data));
                Cookies.set("token",data.token)
                navigate("/");
            }
        } catch (error) {
            toast.error(getError(error));
        }
    };

    const checkEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailValue = emailRef.current?.value || "";
            const data = await postData("/api/v1/users/checkemail", { email: emailValue });
            if (data.message === "this email already exists") {
                setIsEmail(false);
            } else {
                setIsEmail(true);
            }
        } catch (error) {
            toast.error(getError(error));
        }
    }



    return (
        <div className="z-10">
            {isEmail ?
                <div className="w-full max-w-md px-10 py-10 bg-black bg-opacity-80 rounded-lg md:px-6 md:py-6">
                    <h1 className="text-4xl mb-10 md:text-6xl text-white font-semibold">Sign Up</h1>
                    <form onSubmit={submitHandler} className="mb-8">
                        <input
                            type="email"
                            placeholder="Email"
                            disabled
                            value={emailRef.current?.value}
                            ref={emailRef}
                            className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-gray-400 focus:outline-none focus:bg-stone-500"
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            ref={usernameRef}
                            className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            ref={confirmPasswordRef}
                            className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                        />
                        {error && <span className="text-red-500">{error}</span>}
                        <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-8">Sign Up</button>
                    </form>
                    <p className="text-gray-400 ">Already have an account? <Link to="/signin" className="text-white hover:underline">Sign in.</Link></p>
                </div>
                :
                <div className="text-white w-full flex items-center flex-col mt-20">
                    <h1 className="text-3xl md:text-5xl font-bold text-center">Unlimited movies, TV shows, and more</h1>
                    <h1 className="text-xl md:text-2xl mt-5 text-center">Watch anywhere. Cancel anytime.</h1>
                    <h1 className="text-xl md:text-2xl mt-5 text-center">Ready to watch? Enter your email to create your membership.</h1>
                    <form onSubmit={checkEmail} className="flex flex-col md:flex-row items-center mt-5 mb-5">
                        <input
                            type="email"
                            placeholder="Email address"
                            ref={emailRef}
                            className="w-full py-3 px-10  bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-600 mr-2"
                        />
                        <button type="submit" className="w-1/2  md:w-full py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-2 md:mt-0">Get Started {">"}</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default FormOrChecker