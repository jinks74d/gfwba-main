'use client'
import { useLoggedStatus } from '@/context/LoggedStatusProvider';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const NavLog = () => {
    const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const router = useRouter();
    useEffect(() => {
        // Check if user is logged in using localStorage
        const isLoggedIn = localStorage.getItem("GFWBAUSER");
        if (isLoggedIn) {
            updateLoggedStatus(true);
            let profile = JSON.parse(localStorage.getItem("GFWBAUSER"));
            // console.log(profile);
            setUserName(profile.FirstName);
            setUserId(profile.Id);
        }
    }, []); // Run this effect only once, on component mount
    return (
        <div className='flex gap-5'>
            {loggedStatus == true &&
                <div className="bg-[#c3271b] text-white text-xl uppercase py-2 px-10">
                    <a className="uppercase" href={`/profile/${userId}`}>
                        Profile
                    </a>
                </div>
            }
            <div className="bg-[#c3271b] text-white text-xl uppercase py-2 px-10">
                {loggedStatus == false ?
                    <a href='/login'>
                        Member Login
                    </a> :
                    <button className="uppercase" onClick={() => { localStorage.removeItem("GFWBAUSER"); updateLoggedStatus(false); router.push(`/`); }}>
                        Logout
                    </button>
                }
            </div>
        </div>
    )
}

export default NavLog