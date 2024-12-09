import React, { useState, useRef, useEffect } from "react";
import { GiMove } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

const ButtonFooter = ({
    toggleButtonSidebar,
    showButtonSidebar,
    onMeasurementClick,
    handleRenameClick,
    deleteButton,
    handleMovementButton,
    selectedButton

}) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null); // Reference to the dropdown

    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowMenu(false); // Close the dropdown if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const buttons = [
        {
            id: 1,
            name: "ملف اكسيل",
            icon: <MdDelete />,
            action: deleteButton,
        },
        {
            id: 2,
            name: "اضافه صوره او فيديو",
            icon: <GiMove />,
            action: handleMovementButton,
        },
        {
            id: 3,
            name: "الالوان",
            icon: <FaPlus />,
        },
        {
            id: 4,
            name: "تحويل شكل جديد",
            icon: <FaPenToSquare />,
            action: handleRenameClick,
        },
        {
            id: 5,
            name: "تحويل صفحه جديده",
            icon: <AiOutlineFullscreen />,
            action: onMeasurementClick,
        },
    ];

    return (
        <>
            <nav className="bg-white dark:bg-gray-800 text-white p-4 flex justify-between w-full items-center shadow-lg shadow-gray-500/50 dark:shadow-none">


                <div className="container mx-auto xl:flex items-center justify-end gap-8 2xsm:hidden ">
                    <ul className="flex gap-4">
                        {buttons.map((button, index) => (
                            <li key={index}>
                                <button
                                    onClick={button.action}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {button.icon} {button.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="">
                    {!showButtonSidebar && (
                        <button onClick={toggleButtonSidebar} className="text-gray-900 dark:text-white ml-15">
                            <AiOutlineMenu size={25} />
                        </button>
                    )}
                </div>

                <div className="relative" ref={dropdownRef}>
                    <div className="xl:hidden lg:flex items-center justify-end">
                        <button
                            onClick={toggleShowMenu}
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Dropdown
                        </button>
                    </div>

                    {showMenu && (
                        <div className="xl:hidden lg:flex z-10 absolute right-0 mt-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-64">
                            <ul className="py-2 text-sm text-gray-700">
                                {buttons.map((button, index) => (
                                    <li className="p-2" key={index}>
                                        <button
                                            onClick={button.action}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                                        >
                                            {button.icon} {button.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default ButtonFooter;
