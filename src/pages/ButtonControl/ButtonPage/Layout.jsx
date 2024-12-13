import React, { useState } from 'react';
import ButtonSidebar from './ButtonSidebar';
import ButtonNavbar from './ButtonNavbar';
import ButtonFooter from './ButtonFooter';
import ButtonArea from './ButtonArea';
import MeasurementForm from '../Form/MeasurementForm';
import Rename from '../Form/Rename';

export default function Layout() {
  const [showButtonSidebar, setShowButtonSidebar] = useState(true);
  const [showMeasurementForm, setMeasurementForm] = useState(false);
  const [showRenameForm, setShowRenameForm] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem('pages')) || [
      { id: 1, name: 'الصفحة الرئيسية', buttons: [] },
    ],
  ); // الصفحات المخزنة

  const [currentPageId, setCurrentPageId] = useState(pages[0]?.id || null); // الصفحة النشطة
  const [showPagePopup, setShowPagePopup] = useState(false); // حالة عرض الـ popup لاختيار الصفحة

  const toggleButtonSidebar = () => {
    setShowButtonSidebar(!showButtonSidebar);
  };

  console.log('showPagePopup', showPagePopup);

  const handleMeasurementClick = () => {
    if (selectedButton) {
      setMeasurementForm(true);
    } else {
      alert('من فضلك اختر زرًا لتعديله!');
    }
  };

  const AddNewButton = () => {
    const currentPage = pages.find((page) => page.id === currentPageId);
    if (!currentPage) return;

    const newId = Date.now();
    const newButton = {
      id: newId,
      name: `Button ${currentPage.buttons.length + 1}`,
      height: 50,
      columns: 3,
      isFixed: false,
      isActive: true, // خاصية تفعيل الزر
      targetPage: 'الصفحة الرئيسية', // الصفحة الافتراضية
    };

    const updatedPages = pages.map((page) =>
      page.id === currentPageId
        ? { ...page, buttons: [...page.buttons, newButton] }
        : page,
    );

    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
  };

  const AddNewPage = () => {
    const pageName = prompt('أدخل اسم الصفحة الجديدة:'); // طلب اسم الصفحة
    if (!pageName) return; // إذا لم يتم إدخال اسم، لا تُضيف الصفحة

    const newPage = {
      id: Date.now(),
      name: pageName, // تخزين الاسم المدخل
      buttons: [],
    };

    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
    setCurrentPageId(newPage.id); // الانتقال للصفحة الجديدة
  };

  const handleSwitchPage = (pageId) => {
    setCurrentPageId(pageId);
    setShowPagePopup(false);
    setSelectedButton(null);
  };



  const handleMovementButton = () => {
    if (selectedButton) {
      const updatedPages = pages.map((page) =>
        page.id === currentPageId
          ? {
            ...page,
            buttons: page.buttons.map((button) =>
              button.id === selectedButton.id
                ? { ...button, isFixed: !button.isFixed }
                : button,
            ),
          }
          : page,
      );
      setPages(updatedPages);
      localStorage.setItem('pages', JSON.stringify(updatedPages));
      setSelectedButton(null);
    } else {
      alert('من فضلك اختر زرًا لتثبيته أو إلغاء تثبيته!');
    }
  };

  const handleRenameClick = () => {
    if (selectedButton) {
      setShowRenameForm(true);
    } else {
      alert('من فضلك اختر زرًا لتعديله!');
    }
  };

  const deleteButton = (id) => {
    const updatedPages = pages.map((page) =>
      page.id === currentPageId
        ? { ...page, buttons: page.buttons.filter((button) => button.id !== id) }
        : page,
    );

    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));

    if (selectedButton?.id === id) {
      setSelectedButton(null);
    }
  };

  const handleDeleteButton = () => {
    if (selectedButton) {
      const confirmDelete = window.confirm(
        `هل أنت متأكد أنك تريد حذف الزر "${selectedButton.name}"؟`,
      );
      if (confirmDelete) {
        deleteButton(selectedButton.id);
      }
    } else {
      alert('من فضلك اختر زرًا لحذفه!');
    }
  };

  const updateButton = (id, updatedValues) => {
    const updatedPages = pages.map((page) =>
      page.id === currentPageId
        ? {
          ...page,
          buttons: page.buttons.map((button) =>
            button.id === id ? { ...button, ...updatedValues } : button,
          ),
        }
        : page,
    );

    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
    setSelectedButton({ ...selectedButton, ...updatedValues });
  };

  const currentPage = pages.find((page) => page.id === currentPageId);



  const handleFooterAction = (footerAction) => {
    if (selectedButton) {
      updateButton(selectedButton.id, { action: footerAction }); // تحديث الوظيفة
      alert(`تم تعيين الوظيفة للزر "${selectedButton.name}"`);
      setSelectedButton(null); // إلغاء تحديد الزر

    } else {
      alert('من فضلك اختر زرًا أولاً!');
    }
  };





  return (
    <div className="flex gap-3 h-screen overflow-hidden bg-white dark:bg-gray-900">


      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <ButtonNavbar
          toggleButtonSidebar={toggleButtonSidebar}
          showButtonSidebar={showButtonSidebar}
          onMeasurementClick={handleMeasurementClick}
          handleRenameClick={handleRenameClick}
          deleteButton={handleDeleteButton}
          handleMovementButton={handleMovementButton}
          selectedButton={selectedButton}
        />

        <div className="flex py-3">
          {currentPage && currentPage.buttons ? (
            <ButtonArea
              buttons={currentPage.buttons}
              setButtons={(newButtons) => {
                const updatedPages = pages.map((page) =>
                  page.id === currentPageId
                    ? { ...page, buttons: newButtons }
                    : page,
                );
                setPages(updatedPages);
                localStorage.setItem('pages', JSON.stringify(updatedPages));
              }}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
              AddNewButton={AddNewButton}
              pages={pages}

            />
          ) : (
            <p className="text-center text-gray-500">لا توجد بيانات لعرضها!</p>
          )}
        </div>

        <ButtonFooter
          toggleButtonSidebar={toggleButtonSidebar}
          showButtonSidebar={showButtonSidebar}
          onMeasurementClick={handleMeasurementClick}
          handleRenameClick={handleRenameClick}
          setSelectedButton={setSelectedButton}
          deleteButton={handleDeleteButton}
          handleMovementButton={handleMovementButton}
          selectedButton={selectedButton}
          handleSwitchPage={handleSwitchPage}
          updateButton={updateButton}
          pages={pages}
          setShowPagePopup={setShowPagePopup}
          handleFooterAction={handleFooterAction}
          onSwitchPage={() => {
            if (selectedButton) {
              setShowPagePopup(true);
            } else {
              alert('من فضلك اختر زرًا لتحديد الصفحة!');
            }

          }}
        />
      </div>

      <ButtonSidebar
        toggleButtonSidebar={toggleButtonSidebar}
        showButtonSidebar={showButtonSidebar}
        pages={pages}
        AddNewPage={AddNewPage}
        setCurrentPageId={handleSwitchPage}
      />

      {showMeasurementForm && (
        <MeasurementForm
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          onClose={() => setMeasurementForm(false)}
          updateButton={updateButton}
        />
      )}

      {showRenameForm && (
        <Rename
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          onClose={() => setShowRenameForm(false)}
          updateButton={updateButton}
          buttons={currentPage?.buttons || []}
        />
      )}

      {showPagePopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-65">
            <h2 className="text-lg font-bold mb-4">اختر الصفحة</h2>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.id}>
                  <button
                    onClick={() => handleSwitchPage(page.id)}
                    className="block w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowPagePopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
