import { User } from '@/Context/user';
import { USER_SIGNOUT } from '@/Helpers/Actions';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ProfileSection = (props: { image: string }) => {
    const navigate = useNavigate();
    const { dispatch: ctxDispatch } = useContext(User);
    const [showDropdown, setShowDropdown] = useState(false);
    const [hideTimeoutId, setHideTimeoutId] = useState<number | null>(null);

    const clickHandler = () => {
        ctxDispatch({ type: USER_SIGNOUT })
        localStorage.removeItem("userInfo")
        Cookies.remove("token");
        navigate("/");
    }

    const showDropdownMenu = () => {
        setShowDropdown(true);
        if (hideTimeoutId) {
            clearTimeout(hideTimeoutId);
        }
    }

    const hideDropdownMenu = () => {
        const timeoutId = window.setTimeout(() => {
            setShowDropdown(false);
        }, 200);
        setHideTimeoutId(timeoutId);
    }

    const dropdownIconClass = showDropdown ? "rotate-180" : "rotate-0";

    return (
        <div className="relative" onMouseEnter={showDropdownMenu} onMouseLeave={hideDropdownMenu}>
            <div className='flex flex-row items-center'>
                <img src={props.image} alt="Profile Picture" className="w-8 rounded mr-2" />
                <i className={`fa-solid fa-caret-down transform transition-transform duration-300 ${dropdownIconClass}`}></i>
            </div>
            {showDropdown && (
                <div className="absolute right-0 rounded shadow-lg mt-2 py-2 w-48 bg-black bg-opacity-90 z-10">
                    <Link onClick={clickHandler} className="block px-4 py-2 text-white hover:underline" to={'/'}>Sign out</Link>
                </div>
            )}
        </div>
    )
}

export default ProfileSection