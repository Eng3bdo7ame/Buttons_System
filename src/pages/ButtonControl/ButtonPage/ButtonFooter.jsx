import React, { useState, useRef, useEffect } from 'react';
import { GiMove } from 'react-icons/gi';
import { FaPlus } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import * as XLSX from 'xlsx';

const ButtonFooter = ({
    handleRenameClick,
    selectedButton,
    updateButton,
    setSelectedButton,
    pages,
    setShowPagePopup,
    handleFooterAction,
    addMedia }) => {
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const exportToExcel = () => {
        if (!selectedButton) {
            alert('من فضلك اختر زرًا!');
            return;
        }
        const data = [
            { اسم: selectedButton.name, ارتفاع: selectedButton.height, أعمدة: selectedButton.columns },
        ];
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Buttons');
        XLSX.writeFile(workbook, 'buttons_data.xlsx');

        alert('تم التصدير بنجاح');
        setSelectedButton(null);
    };





    const changeShape = () => {
        if (!selectedButton) {
            alert('من فضلك اختر زرًا!');
            return;
        }
        const newShape = prompt('أدخل وصف الشكل الجديد:');
        if (newShape) {
            updateButton(selectedButton.id, { shape: newShape });
        }

        setSelectedButton(null);
    };

    const switchToPage = () => {
        if (!selectedButton) {
            alert('من فضلك اختر زرًا!');
            return;
        }
        setShowPagePopup(true);
    };

    const buttons = [
        {
            id: 1,
            name: 'ملف اكسيل',
            icon: <MdDelete />,
            action: () => handleFooterAction(exportToExcel),
        },
        {
            id: 2,
            name: 'اضافه صوره او فيديو',
            icon: <GiMove />,
            action: addMedia,
        },

        {
            id: 4,
            name: 'تحويل شكل جديد',
            icon: <FaPenToSquare />,
            action: () => handleFooterAction(changeShape),
        },
        {
            id: 5,
            name: 'تحويل صفحه جديده',
            icon: <AiOutlineFullscreen />,
            action: switchToPage,
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
                                    disabled={!selectedButton?.isActive}
                                    className={`flex items-center gap-2 px-4 py-2 rounded ${selectedButton?.isActive
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    {button.icon} {button.name}
                                </button>
                            </li>
                        ))}
                    </ul>
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
                        <div className="xl:hidden lg:flex z-10 absolute left-0 mt-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-64">
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
