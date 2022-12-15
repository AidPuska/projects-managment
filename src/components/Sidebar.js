import addIcon from '../assets/add_icon.svg'
import dashIcon from '../assets/dashboard_icon.svg'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from './Avatar'

const Sidebar = () => {

    const { user } = useAuthContext()

    return (
        <div className='s w-72 min-w-[288px] bg-purple-500 min-h-[100vh] box-border relative text-yellow-100'>
            <div className='sc fixed inherit'>
                <div className='user font-bold flex flex-col items-center gap-2 text-center tracking-widest py-10 px-8 border border-white/20'>
                    {user && <Avatar src={user.photoURL} />}
                    <p>Hey {user.displayName}</p>
                </div>

                <nav className="links mt-20 ml-5">
                    <ul>
                        <li className='mt-2'>
                            <NavLink className={({ isActive }) => isActive ? 'bg-white text-gray-500 flex p-2.5 w-full rounded-l-lg' : 'flex p-2.5 no-underline w-full text-yellow-100 box-border'} to='/'>
                                <img className='mr-2.5' src={dashIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        <li className='mt-2'>
                            <NavLink className={({ isActive }) => isActive ? 'bg-white text-gray-500 flex p-2.5 w-full rounded-l-lg' : 'flex p-2.5 no-underline w-full text-yellow-100 box-border'} to='/create'>
                                <img className='mr-2.5' src={addIcon} alt="add project icon" />
                                <span>New project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar