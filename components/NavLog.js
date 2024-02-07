'use client'
import { useLoggedStatus } from '@/context/LoggedStatusProvider';
import { useEffect } from 'react';

const NavLog = () => {
    const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
    useEffect(() => {
        // Check if user is logged in using localStorage
        const isLoggedIn = localStorage.getItem("GFWBAUSER");
        if (isLoggedIn) {
            updateLoggedStatus(true);
        }
    }, []); // Run this effect only once, on component mount
    return (
        <div className="bg-[#c3271b] text-white text-xl uppercase py-2 px-10">
            {loggedStatus == false ?
                <a href='/login'>
                    Member Login
                </a> :
                <button className="uppercase" onClick={() => { localStorage.removeItem("GFWBAUSER"); updateLoggedStatus(false) }}>
                    Logout
                </button>}
        </div>
    )
}

export default NavLog