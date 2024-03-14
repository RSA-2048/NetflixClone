import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from '@/Context/user';
import '@fortawesome/fontawesome-free/css/all.css';
import SearchSection from '../Navbar/SearchSection';
import ProfileSection from '../Navbar/ProfileSection';
import BrowseSection from '../Navbar/browseSection';
import Logo from "../../../assets/Netflix-Logo.wine.svg"


const NavBar = () => {
    const navigate = useNavigate();
    const { state: { userInfo } } = useContext(User);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [image, setImage] = useState('');
    const { pathname } = useLocation();

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        if (userInfo && userInfo.profilePicture) {
            setImage(userInfo.profilePicture)
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navbarClass = scrollPosition > 0 ? "bg-zinc-900" : "bg-gradient-to-b from-black to-transparent";
    if (
        pathname === "/signin" ||
        pathname === "/signup" ||
        pathname.includes("/reset") ||
        pathname.includes("/watch"))
        return null;

    return (
        <div className={`p-2 fixed top-0 left-0 right-0 z-50 text-white transition-all duration-500 ${navbarClass}`}>
            <div className="flex justify-between items-center">
                <div className='flex items-center ml-0 md:ml-8'>
                    <img src={Logo} alt="Netflix Logo" className="h-4 md:h-8 w-10 md:w-24 mr-1 md:mr-0 mt-2 ml-0 md:ml-5" onClick={() => navigate("/")} />
                    <BrowseSection />
                </div>
                <div className='flex justify-between-right items-center mr-10 space-x-4 md:space-x-6'>
                    <SearchSection />
                    <Link to='#' className='nav-link'>
                        <i className="fa-regular fa-bell"></i>
                    </Link>
                    <ProfileSection image={image} />
                </div>
            </div>
        </div>

    );
}

export default NavBar;