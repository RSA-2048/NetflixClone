import Title from "@/Components/shared/Title";
import Logo from "../../assets/Netflix-Logo-large.svg";
import { useRef} from "react";
import { getError } from "@/Helpers/utils";
import { toast } from "react-toastify";
import axios from "axios";



const ResetPasswordPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);



    const checkEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailValue = emailRef.current?.value || "";
        try {

            const data = await axios.post("api/v1/users/forgot", { email: emailValue });
            if (data)
                toast.success("Email sent");

        } catch (error) {
            toast.error(getError(error));
        }
    }



    return (
        <div className="flex items-center bg-cover min-h-screen md:bg-[url('../assets/netflix-bg.jpg')]  flex-col">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Title title="Reset password" />
            <div className="mx-auto ml-0 z-10">
                <img src={Logo} alt="Netflix Logo" className="h-20 md:h-20 w-22 md:w-60" />
            </div>
            <div className="text-white w-full flex items-center flex-col mt-20 z-10">
                <h1 className="text-3xl md:text-5xl font-bold text-center">Enter your email</h1>
                <h2 className="text-xl md:text-3xl font-bold text-center">Check spam folder</h2>

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
        </div>
    )
}

export default ResetPasswordPage