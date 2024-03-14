import { Link } from 'react-router-dom';
import { useState } from 'react';

const BrowseSection = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [hideTimeoutId, setHideTimeoutId] = useState<number | null>(null);


    const showDropdownMenu = () => {
        setShowDropdown(true);
        if (hideTimeoutId) {
            clearTimeout(hideTimeoutId);
        }
    }

    const hideDropdownMenu = () => {
        const timeoutId = window.setTimeout(() => {
            setShowDropdown(false);
        }, 100);
        setHideTimeoutId(timeoutId);
    }

    const dropdownIconClass = showDropdown ? "rotate-180" : "rotate-0";

    return (
        <div>
            <div className='flex-row ml-8 space-x-4 hidden lg:flex'>
                <Link className='p-1' to={'/'} >Home</Link>
                <Link className='p-1' to={'/series'} >TV Shows</Link>
                <Link className='p-1' to={'/movies'} >Movies</Link>
                <Link className='p-1' to={'/mylist'} >My List</Link>
            </div>
            <div className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative" onMouseEnter={showDropdownMenu} onMouseLeave={hideDropdownMenu}>
                <div className='flex flex-row items-center'>
                    <h1 className='font-semibold mr-2'>Browse</h1>
                    <i className={`fa-solid fa-caret-down transform transition-transform duration-300 ${dropdownIconClass}`}></i>
                </div>
                {showDropdown && (
                    <div className="absolute flex flex-col rounded shadow-lg mt-40 py-2 w-48 bg-black items-center bg-opacity-90 z-10 border-t-4">
                        <Link className='p-1' to={'/'} >Home</Link>
                        <Link className='p-1' to={'/series'} >TV Shows</Link>
                        <Link className='p-1' to={'/movies'} >Movies</Link>
                        <Link className='p-1' to={'/mylist'} >My List</Link>
                    </div>
                )}
            </div>
        </div>

    );
};

export default BrowseSection;
