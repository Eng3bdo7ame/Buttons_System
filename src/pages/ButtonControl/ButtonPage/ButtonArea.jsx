import React, { useEffect, useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../SortableItem';
import { FaPlus } from 'react-icons/fa';
import { arrayMove } from '@dnd-kit/sortable';

export default function ButtonArea({
  buttons,
  setButtons,
  selectedButton,
  setSelectedButton,
  AddNewButton,
}) {
  const [draggingButtonId, setDraggingButtonId] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  );

  const containerRef = useRef(null);

  useEffect(() => {
    // وظيفة لإلغاء التحديد عند النقر خارج العناصر
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) // إذا كان النقر خارج الشبكة أو popup
      ) {
        setSelectedButton(null); // إلغاء تحديد الزر
        setPopupVisible(false); // إخفاء popup
      }
    };

    // إضافة مستشعر النقر
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // إزالة المستشعر عند إلغاء تحميل المكون
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSelectedButton, containerRef]);

  //   console.log('selectedButton', selectedButton);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeButton = buttons.find((button) => button.id === active.id);
    const overButton = buttons.find((button) => button.id === over.id);

    if (activeButton?.isFixed || overButton?.isFixed) return;

    if (active.id !== over.id) {
      const oldIndex = buttons.findIndex((button) => button.id === active.id);
      const newIndex = buttons.findIndex((button) => button.id === over.id);

      const reorderedButtons = arrayMove(buttons, oldIndex, newIndex);

      setButtons(reorderedButtons);
      localStorage.setItem('buttons', JSON.stringify(reorderedButtons));
    }

    setDraggingButtonId(null);
  };

  const handleDragStart = (event) => {
    setDraggingButtonId(event.active.id);
  };

//   console.log(
//     'columns',
//     buttons.map((button) => button.columns),
//   );

  const handleButtonClick = (button, event) => {
    const rect = event.target.getBoundingClientRect();
    setSelectedButton(selectedButton?.id === button.id ? null : button);

    if (selectedButton?.id === button.id) {
      setPopupVisible(false);
    } else {
      setPopupPosition({
        top: rect.top - 70,
        left: rect.left + rect.width / 2,
      });
      setPopupVisible(true);
    }
  };

  return (
    <main className="relative flex-1 p-6 bg-gray-200 dark:bg-gray-600">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div className="relative mb-12">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext
            items={buttons.map((button) => button.id)}
            strategy={rectSortingStrategy}
          >
            {/* الشبكة العامة */}
            <div
              className="grid grid-cols-12 gap-4 relative"
            //   ref={containerRef}
            >
              {buttons.map((button) => {
                const isDragging = button.id === draggingButtonId;
                const isSelected = selectedButton?.id === button.id; // التحقق مما إذا كان الزر المحدد هو نفسه الزر الحالي

                return (
                  <div
                    key={button.id}
                    className={`relative col-span-${button.columns || 3} ${
                      isDragging ? 'shadow-lg' : ''
                    }`}
                    style={{
                      gridColumn: `span ${button.columns || 3} / span ${
                        button.columns || 3
                      }`,
                    }}
                  >
                    {/* عنصر الزر */}
                    <SortableItem
                      id={button.id}
                      button={button}
                      onClick={(e) => (
                        setSelectedButton(isSelected ? null : button),
                        handleButtonClick(button, e)
                      )}
                      selectedButton={selectedButton}
                    />


                    {/* المربع يظهر فقط للزر المحدد */}
                    {isSelected && popupPosition && (
                      <div className="absolute -top-[300%] left-0 bg-white shadow-lg rounded p-4 z-50 border border-gray-300">
                        <div
                          className="absolute w-4 h-4 bg-white border-l border-t border-gray-300"
                          style={{
                            bottom: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            zIndex: -1,
                          }}
                        ></div>

                        <h3 className="text-lg font-bold mb-2 text-center">
                          {selectedButton.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                          ينقل إلى: {selectedButton.targetPage || 'غير محدد'}
                        </p>
                        <ul className="space-y-2">
                          <li>
                            <button
                              onClick={() =>
                                handleDeleteButton(selectedButton.id)
                              }
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                            >
                              حذف الزر
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <button
        onClick={AddNewButton}
        className="absolute bottom-3 left-3 bg-primary text-white text-lg py-3 px-3 rounded-full"
      >
        <FaPlus />
      </button>
    </main>
  );
}
