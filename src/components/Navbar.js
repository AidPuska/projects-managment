import logo from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className='w-full py-7 px-0 box-border mb-20'>
            <ul className='flex my-0 mx-auto items-center justify-end'>
                <li className='font-bold text-gray-400 tracking-wider flex items-center mr-auto'>
                    <img src={logo} className='mr-2.5 invert-[25%] w-9 mt-[-8px]' alt="page logo" />
                    <span>ProManag</span>
                </li>

                {!user &&
                    <>
                        <li>
                            <Link className='text-gray-500 no-underline mr-5' to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link className='text-gray-500 no-underline mr-5' to='/signup'>Signup</Link>
                        </li>
                    </>
                }

                {user && <li>
                    {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                    {isPending && <button className='btn' onClick={logout} disabled>Logging out...</button>}
                </li>}
            </ul>
        </div>
    )
}

export default Navbar