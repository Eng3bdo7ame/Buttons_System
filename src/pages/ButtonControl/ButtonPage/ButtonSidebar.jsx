import { FaArrowLeft, FaPlus } from 'react-icons/fa';



const ButtonSidebar = ({
  toggleButtonSidebar,
  showButtonSidebar,
  pages,
  AddNewPage,
  setCurrentPageId,
}) => {




  return (
    <aside
      className={`
          ${showButtonSidebar ? 'block' : 'hidden'} 
          xl:relative absolute right-0 z-50 w-55 shadow-lg shadow-gray-500/50 dark:shadow-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-screen duration-300 ease-linear transition-width`}
    >
      <div className="flex justify-between p-4 border-b border-gray-300">
        <h1 className="text-lg font-bold">إضافة صفحة جديدة</h1>
        <button onClick={toggleButtonSidebar} className="text-gray-500">
          <FaArrowLeft />
        </button>
      </div>

      <button
        onClick={AddNewPage}
        className="w-full flex items-center gap-2 p-3 bg-blue-500 text-white"
      >
        <FaPlus />
        إضافة صفحة جديدة
      </button>

      <nav className="mt-4">
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <button
                onClick={() => setCurrentPageId(page.id)}
                className="w-full my-1 mx-1 p-2 bg-gray-200 rounded dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300"
              >
                {page.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ButtonSidebar;
