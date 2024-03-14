import { useContext, useEffect, useRef } from "react";
import Title from "../Components/shared/Title";
import { toast } from "react-toastify";
import { postData } from "../Helpers/httpRequest"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { User } from "../Context/user";
import { USER_SIGNIN } from "../Helpers/Actions";
import { getError } from "@/Helpers/utils";
import Logo from "../../assets/Netflix-Logo-large.svg"



const SignInPage = () => {

    const navigate = useNavigate();
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(User);
    const { search } = useLocation();
    const redirectURL = new URLSearchParams(search);
    const redirectValue = redirectURL.get("redirect");
    const redirect = redirectValue ? redirectValue : "/";
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }else(
            navigate('/signin')
        )
    }, [navigate, redirect, userInfo]);

    const loginHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault();
        try {
            let emailValue = "";
            let passwordValue = "";

            if (action === "autoFill") {
                emailValue = "admin@example.com";
                passwordValue = "12345";
            } else {
                emailValue = emailRef.current?.value || "";
                passwordValue = passwordRef.current?.value || "";
            }

            const data = await postData("/api/v1/users/signin", { email: emailValue, password: passwordValue })
            if (data) {
                ctxDispatch({ type: USER_SIGNIN, payload: data })
                localStorage.setItem("userInfo",JSON.stringify(data));
                Cookies.set("token",data.token)
                navigate(redirect);
            }
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <div className="flex items-center bg-cover min-h-screen md:bg-[url('../assets/netflix-bg.jpg')]  flex-col">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Title title="Sign In" />
            <div className="mx-auto ml-0 z-10">
                <img src={Logo} alt="Netflix Logo" className="h-20 md:h-20 w-22 md:w-60" />
            </div>
            <div className="w-full max-w-md px-3 py-3 bg-black bg-opacity-80 rounded-lg md:px-6 md:py-6 z-10">
                <h1 className="text-4xl mb-10 md:text-6xl text-white font-semibold">Sign In</h1>
                <form onSubmit={(e) => loginHandler(e, "submit")} className="mb-6">
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md focus:outline-none focus:bg-stone-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        className="block w-full py-3 px-4 mb-4 bg-stone-700 rounded-md text-white focus:outline-none focus:bg-stone-500"
                    />
                    <button type="submit" className="w-full py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-8 ">Login</button>
                </form>
                <p className="text-gray-400 ">Forgot password? <Link to="/resetpassword" className="text-white hover:underline">Reset now.</Link></p>
                <p className="text-gray-400 ">New to Netflix? <Link to="/signup" className="text-white hover:underline">Sign up now.</Link></p>
                <div className="container border border-white flex flex-col items-center justify-center mt-5">
                    <p className="text-gray-400 mb-3">Welcome to my Netflix clone project. For your convenience, you can use this button to log in</p>
                    <p className="text-white">Email: admin@example.com</p>
                    <p className="text-white">Password: 12345</p>
                    <button type="button" onClick={(e) => loginHandler(e, "autoFill")} className="bg-gray-500 text-white py-2 px-4 rounded-md mb-5">Auto Connect</button>
                </div>
            </div>
        </div>
    );
}
export default SignInPage;