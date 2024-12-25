import { AuthAPI } from '../../apis/authAPI'
import { LockClosedIcon, TagIcon } from '@heroicons/react/24/outline';
import { googleLogout } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = AuthAPI.getUser();
    const navigation = useNavigate();

    const logout = () => {
        const value = confirm('Are you sure you want to logout?');
        if(value) {
            localStorage.clear()
            googleLogout()
            navigation('/login');
        }
    }
    
  return (
    <div className='page-container'>
        <div className='max-w-lg mx-auto min-h-screen'>
            <div className='content'>
                <header>
                    <div className='h-20 bg-violet-200 px-3 text-gray-700 py-4 flex items-center gap-2'>
                        <div className="border border-violet-800 w-8 h-8" style={{display: "block", background: `url("${user.avatar}")`, backgroundSize: "contain", borderRadius: "50px"}}></div>
                        <div className=' text-lg'>
                            {user.name}
                        </div>
                    </div>
                    <div className=''>
                        <Link to="/category" className='px-3 py-3 flex items-center gap-2 cursor-pointer'>
                            <div className='text-gray-500'> <TagIcon width={20} /> </div> 
                            <div className='text-gray-500'>Cagegory</div>
                        </Link>
                        <div className='px-3 py-3 flex items-center gap-2 cursor-pointer' onClick={logout}>
                            <div className='text-red-500'> <LockClosedIcon width={20} /> </div> 
                            <div className='text-gray-500'>Logout</div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    </div>
  )
}

export default Profile