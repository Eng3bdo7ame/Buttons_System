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
  const [buttons, setButtons] = useState(
    JSON.parse(localStorage.getItem('buttons')) || [],
  );

  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem('pages')) || [],
  ); // الصفحات المخزنة
  const [showPagePopup, setShowPagePopup] = useState(false); // حالة عرض الـ popup لاختيار الصفحة

  const toggleButtonSidebar = () => {
    setShowButtonSidebar(!showButtonSidebar);
  };

  const handleMeasurementClick = () => {
    if (selectedButton) {
      setMeasurementForm(true);
    } else {
      alert('من فضلك اختر زرًا لتعديله!');
    }
  };

  const AddNewButton = () => {
    let newId = buttons.length + 1;
    while (buttons.some((button) => button.id === newId)) {
      newId++;
    }
  
    const newButton = {
      id: newId,
      name: `Button ${newId}`,
      height: 50,
      columns: 3,
      isFixed: false,
      isActive: true, // خاصية تفعيل الزر
      targetPage: 'الصفحة الرئيسية', // الصفحة الافتراضية
    };
  
    const updatedButtons = [...buttons, newButton];
    setButtons(updatedButtons);
    localStorage.setItem('buttons', JSON.stringify(updatedButtons));
  };
  

  const handleMovementButton = () => {
    if (selectedButton) {
      const updatedButtons = buttons.map((button) =>
        button.id === selectedButton.id
          ? { ...button, isFixed: !button.isFixed }
          : button,
      );
      setButtons(updatedButtons);
      localStorage.setItem('buttons', JSON.stringify(updatedButtons));
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
    const updatedButtons = buttons.filter((button) => button.id !== id);
    setButtons(updatedButtons);
    localStorage.setItem('buttons', JSON.stringify(updatedButtons));

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
    const updatedButtons = buttons.map((button) =>
      button.id === id ? { ...button, ...updatedValues } : button,
    );
    setButtons(updatedButtons);
    localStorage.setItem('buttons', JSON.stringify(updatedButtons));
    setSelectedButton({ ...selectedButton, ...updatedValues });
  };

  const AddNewPage = () => {
    const pageName = prompt('أدخل اسم الصفحة الجديدة:'); // طلب اسم الصفحة
    if (!pageName) return; // إذا لم يتم إدخال اسم، لا تُضيف الصفحة

    const newPage = {
      id: pages.length + 1,
      name: pageName, // تخزين الاسم المدخل
    };

    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    localStorage.setItem('pages', JSON.stringify(updatedPages));
  };

  const handleSwitchPage = (pageId) => {
    if (selectedButton) {
      const updatedButtons = buttons.map((button) =>
        button.id === selectedButton.id
          ? {
              ...button,
              targetPage: pages.find((page) => page.id === pageId)?.name,
            }
          : button,
      );
      setButtons(updatedButtons);
      localStorage.setItem('buttons', JSON.stringify(updatedButtons));
      setSelectedButton({
        ...selectedButton,
        targetPage: pages.find((page) => page.id === pageId)?.name,
      });
    }
    setShowPagePopup(false); // إغلاق النافذة المنبثقة
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
          <ButtonArea
            setButtons={setButtons}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            updateButton={updateButton}
            buttons={buttons}
            AddNewButton={AddNewButton}
          />
        </div>
        <ButtonFooter
          onAddPage={AddNewPage}
          selectedButton={selectedButton}
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
        setShowButtonSidebar={setShowButtonSidebar}
        pages={pages} // تمرير الصفحات
        AddNewPage={AddNewPage} // تمرير دالة إضافة صفحة جديدة
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
          buttons={buttons}
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
