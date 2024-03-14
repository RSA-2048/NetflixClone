import Title from "@/Components/shared/Title";
import Logo from "../../assets/Netflix-Logo-large.svg";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "@/Helpers/utils";
import { useNavigate, useParams } from "react-router-dom";

const ChangePasswordPage = () => {

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const { token } = useParams();
    const navigate = useNavigate()

    const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const passwordValue = passwordRef.current?.value || "";
        const confirmPasswordValue = confirmPasswordRef.current?.value || "";

        if (passwordValue !== confirmPasswordValue) {
            setError("Passwords do not match");
            return;
        }
        try {

            const data = await axios.patch(`api/v1/users/reset/${token}`, { password: passwordValue });
            if (data) {
                toast.success("Changed password!");
                navigate("/signin")
            }



        } catch (error) {
            toast.error(getError(error));
        }
    }

    return (
        <div className="flex items-center bg-cover min-h-screen md:bg-[url('../assets/netflix-bg.jpg')]  flex-col">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Title title="Reset password" />
            <div className="z-10 flex flex-row items-center justify-between mx-auto ml-0 px-4 w-full">
                <div>
                    <img src={Logo} alt="Netflix Logo" className="h-20 md:h-20 w-22 md:w-60" />
                </div>
                <div className="mr-0 ">
                    <button type="button" onClick={() => navigate("/signin")} className="py-3 px-4 bg-red-600 text-white rounded-md">Sign In</button>
                </div>
            </div>
            <div className="text-white w-full flex items-center flex-col mt-20 z-10">
                <div className="w-full max-w-md px-10 py-10 bg-none md:bg-black bg-opacity-80 rounded-lg md:px-6 md:py-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-center">Change password</h1>
                    <form onSubmit={changePassword} className="flex flex-col items-center mt-5 mb-5">
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className="block w-3/4 py-3 px-4 mb-4 bg-stone-700 rounded-md text-gray-400 focus:outline-none focus:bg-stone-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            ref={confirmPasswordRef}
                            className="block w-3/4 py-3 px-4 mb-2 bg-stone-700 rounded-md text-gray-400 focus:outline-none focus:bg-stone-500"
                        />
                        {error && <span className="text-red-500">{error}</span>}
                        <button type="submit" className="w-1/2 py-3 px-4 bg-red-600 text-white rounded-md focus:outline-none mt-2 md:mt-0">Change {">"}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ChangePasswordPage