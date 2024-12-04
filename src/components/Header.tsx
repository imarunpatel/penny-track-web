import { AuthAPI } from "../apis/authAPI";

const Header = () => {
    const user = AuthAPI.getUser()
    return (
        <header className="h-16 px-3 flex items-center justify-between">
            <div className="bg-blue-400 rounded-full">
                {/* <UserCircleIcon className="w-9 text-white"/> */}
                {/* <img src={user.avatar} alt="Profile"  title="Profile" width="50" height="50" style={{display: 'block'}}/> */}
                <div style={{height: "35px", width: "35px", display: "block", background: `url("${user.avatar}")`, backgroundSize: "contain", borderRadius: "50px"}}></div>
                {/* <div style={{height: "24px", width: "24px", display: "block", background: `url(IMAGE SOURCE)`, background-size: "contain"}}></div> */}
            </div>
            <div className="text-xl">Home</div>
            <div></div>
            {/* <button onClick={() => {}}>
                Logout
            </button> */}
            {/* <ThemeToggle /> */}
            {/* <div>
                <BellIcon className="w-9" />
            </div> */}
        </header>
    )
}

export default Header;