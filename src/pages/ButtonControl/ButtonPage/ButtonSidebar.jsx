import { useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

const ButtonSidebar = ({
  toggleButtonSidebar,
  showButtonSidebar,
  pages, // تمرير قائمة الصفحات
  AddNewPage, // تمرير دالة إضافة صفحة جديدة
}) => {
//   console.log('showButtonSidebar', showButtonSidebar);

  return (
    <div className="relative">
      <aside
        className={`${
          showButtonSidebar ? 'block' : 'hidden'
        } xl:relative absolute left-0 top-0 z-50 w-55 shadow-lg shadow-gray-500/50 dark:shadow-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-screen duration-300 ease-linear transition-width`}
      >
        <div className="flex justify-between p-4 border-b border-gray-300">
          <h1 className="text-lg font-bold">إضافة صفحة جديدة</h1>
          <button
            onClick={toggleButtonSidebar}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaArrowLeft />
          </button>
        </div>

        {/* زر إضافة صفحة */}
        <button
          onClick={AddNewPage}
          className="w-full flex justify-center items-center gap-2 mt-5 bg-blue-500 text-white text-lg py-3 px-3 rounded-md hover:bg-blue-600"
        >
          <FaPlus />
          إضافة صفحة جديدة
        </button>

        {/* قائمة الصفحات */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {pages.map((page) => (
              <li
                key={page.id}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span>{page.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default ButtonSidebar;
