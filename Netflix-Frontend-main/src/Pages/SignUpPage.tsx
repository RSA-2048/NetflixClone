import { useNavigate } from "react-router-dom";
import Title from "../Components/shared/Title";
import { useContext, useEffect } from "react";
import { User } from "../Context/user";
import FormOrChecker from "@/Components/SignUpPage/FormOrChecker";

const SignUpPage = () => {

    const navigate = useNavigate();
    const { state: { userInfo } } = useContext(User);


    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);



    return (
        <div className="relative flex items-center bg-cover min-h-screen bg-[url('../assets/netflix-bg.jpg')]  flex-col">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Title title="Sign Up" />
            <div className="z-10 flex flex-row items-center justify-between mx-auto ml-0 px-4 w-full">
                <div>
                    <img src="\assets\Netflix-Logo.wine.svg" alt="Netflix Logo" className="w-22 md:w-60" />
                </div>
                <div className="mr-0 ">
                    <button type="button" onClick={() => navigate("/signin")} className="py-3 px-4 bg-red-600 text-white rounded-md">Sign In</button>
                </div>
            </div>
            <FormOrChecker/>
        </div>

    );
}

export default SignUpPage;