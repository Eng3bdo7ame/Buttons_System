import React, { useState } from "react";
import ButtonSidebar from "./ButtonSidebar";
import ButtonNavbar from "./ButtonNavbar";
import ButtonArea from "./ButtonArea";
import MeasurementForm from "../Form/MeasurementForm";
import Rename from "../Form/Rename";

export default function Layout() {
    const [showButtonSidebar, setShowButtonSidebar] = useState(true);
    const [showMeasurementForm, setMeasurementForm] = useState(false);
    const [showRenameForm, setShowRenameForm] = useState(false);

    const [selectedButton, setSelectedButton] = useState(null);

    const [buttons, setButtons] = useState(
        JSON.parse(localStorage.getItem("buttons")) || []
    );

    const toggleButtonSidebar = () => {
        setShowButtonSidebar(!showButtonSidebar);
    };

    const handleMeasurementClick = () => {
        if (selectedButton) {
            setMeasurementForm(true);
        } else {
            alert("من فضلك اختر زرًا لتعديله!");
        }
    };


    const handleMovementButton = () => {
        if (selectedButton) {
            const updatedButtons = buttons.map((button) =>
                button.id === selectedButton.id
                    ? { ...button, isFixed: !button.isFixed } // تبديل حالة التثبيت
                    : button
            );
            setButtons(updatedButtons);
            localStorage.setItem("buttons", JSON.stringify(updatedButtons));
            setSelectedButton(null);
        }
        else {
            alert("من فضلك اختر زرًا لتثبيته أو إلغاء تثبيته!");
        }

    };


    const handleRenameClick = () => {
        if (selectedButton) {
            setShowRenameForm(true);
        } else {
            alert("من فضلك اختر زرًا لتعديله!");
        }
    };

    const deleteButton = (id) => {
        const updatedButtons = buttons.filter((button) => button.id !== id); // استخدام الـ id للتصفية
        setButtons(updatedButtons);
        localStorage.setItem("buttons", JSON.stringify(updatedButtons));
        setSelectedButton(null);
    };
    const handleDeleteButton = () => {
        if (selectedButton) {
            deleteButton(selectedButton.id);  // إرسال الـ id للحذف
        } else {
            alert("من فضلك اختر زرًا لتعديله!");
        }
    };




    const updateButton = (id, updatedValues) => {
        const updatedButtons = buttons.map((button) =>
            button.id === id ? { ...button, ...updatedValues } : button
        );
        setButtons(updatedButtons);
        localStorage.setItem("buttons", JSON.stringify(updatedButtons));
        setSelectedButton({ ...selectedButton, ...updatedValues });
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
            isFixed: false, // الزر غير مثبت افتراضيًا
        };
        const updatedButtons = [...buttons, newButton];
        setButtons(updatedButtons);
        localStorage.setItem("buttons", JSON.stringify(updatedButtons)); // تحديث الترتيب في localStorage
    };


    console.log('buttonsbuttons', buttons);


    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900">
            <ButtonSidebar
                toggleButtonSidebar={toggleButtonSidebar}
                showButtonSidebar={showButtonSidebar}
                setShowButtonSidebar={setShowButtonSidebar}
            />
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
                <div className="flex p-6">
                    <ButtonArea
                        setButtons={setButtons}
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                        updateButton={updateButton}
                        buttons={buttons}
                        AddNewButton={AddNewButton} // تمرير دالة الإضافة
                    />
                </div>
            </div>

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
        </div>
    );
}
