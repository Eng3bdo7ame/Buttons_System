import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ButtonSidebar = ({ toggleButtonSidebar, showButtonSidebar }) => {
    const location = useLocation();


    const Links = [
        {
            name: 'Dashboard',
            path: '/buttonArea',
        },
        {
            name: 'Settings',
            path: '/settings',
        },
        {
            name: 'Profile',
            path: '/profile',
        },
    ];

    console.log('showButtonSidebar', showButtonSidebar);

    return (
        <div className='relative'>
            <aside
                className={`${showButtonSidebar ? 'block' : 'hidden'
                    } xl:relative absolute left-0 top-0 z-50 w-55 shadow-lg shadow-gray-500/50 dark:shadow-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-screen duration-300 ease-linear transition-width`}
            >

                <div className='flex justify-between p-4 border-1'>
                    <h1>AddButton</h1>
                    <button onClick={toggleButtonSidebar} className="">
                        <FaArrowLeft />
                    </button>
                </div>


                <nav className="mt-4">
                    <ul className="mb-6 flex flex-col gap-3">
                        {Links.map((item, index) => (
                            <li
                                key={index}
                                className="border-b border-stroke dark:border-strokedark"
                            >
                                <Link
                                    to={item.path}
                                    className={`relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-900 dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${item.path === location.pathname ? 'bg-gray-100 dark:bg-meta-4' : ''
                                        }`}
                                >
                                    {item.icon}
                                    <span className="whitespace-nowrap">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </nav>

            </aside>
        </div>
    );
};

export default ButtonSidebar;
