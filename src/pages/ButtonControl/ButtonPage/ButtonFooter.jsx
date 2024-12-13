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
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false); // لحالة عرض فورم اللون
    const [color, setColor] = useState('#2563eb'); // القيمة الافتراضية للون
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

    const addMedia = () => {
        if (!selectedButton) {
            alert('من فضلك اختر زرًا!');
            return;
        }
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,video/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                updateButton(selectedButton.id, { media: file.name });
                alert(`تم إضافة ${file.name}`);
            }
        };
        fileInput.click();

        setSelectedButton(null);
    };

    const changeColor = () => {
        if (!selectedButton) {
            alert('من فضلك اختر زرًا!');
            return;
        }
        setShowColorPicker(true); // عرض فورم اختيار اللون
    };

    const confirmColorChange = () => {
        updateButton(selectedButton.id, { color });
        alert(`تم تغيير لون الزر إلى ${color}`);
        setShowColorPicker(false); // إخفاء الفورم
        setSelectedButton(null); // إلغاء تحديد الزر

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
            action: () => handleFooterAction(addMedia),
        },
        {
            id: 3,
            name: 'الالوان',
            icon: <FaPlus />,
            action: () => handleFooterAction(changeColor),
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
            action: () => handleFooterAction(switchToPage),
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
            </nav>

            {/* فورم اختيار اللون */}
            {showColorPicker && (
                <div className="w-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow-lg w-[30%]">
                        <h2 className="text-lg font-bold mb-4">اختر اللون</h2>
                        <label
                            htmlFor="hs-color-input"
                            className="block text-sm font-medium mb-2 dark:text-white"
                        >
                            Color picker
                        </label>
                        <div className="mt-5 flex items-center gap-3">
                            <input
                                className="text-right text-black dark:text-white dark:bg-gray-800 font-semibold w-full p-1 border rounded"
                                type="text" id="hs-color-input" value={color} onChange={(e) => setColor(e.target.value)} />
                            <input
                                type="color"
                                className="p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                                id="hs-color-input"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between">

                            <button
                                onClick={() => setShowColorPicker(false)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                الغاء
                            </button>

                            <button
                                onClick={confirmColorChange}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                تأكيد
                            </button>



                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ButtonFooter;
