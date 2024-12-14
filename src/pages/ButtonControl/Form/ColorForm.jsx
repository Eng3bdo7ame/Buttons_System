import React from 'react'

export default function ColorForm(confirmColorChange, setShowColorPicker, color, setColor) {
    return (

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

    )
}
