'use client'
import { useLoggedStatus } from '@/context/LoggedStatusProvider';

const NavLog = () => {
    const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
    // if (localStorage.getItem("GFWBAUSER")) {
    //     updateLoggedStatus(true)
    // }
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