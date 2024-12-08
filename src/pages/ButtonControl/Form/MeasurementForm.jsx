import React, { useState } from "react";

const MeasurementForm = ({ selectedButton, onClose, updateButton, setSelectedButton }) => {
    const [columns, setColumns] = useState(selectedButton?.columns || 3);
    const [height, setHeight] = useState(selectedButton?.height || 50);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateButton(selectedButton.id, { columns, height });
        setSelectedButton(null);
        onClose();

    };

    return (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-black bg-opacity-90">
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Update Button Measurements
                    </h2>
                    <form onSubmit={handleSubmit} className="text-right text-black space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">
                                Number of Columns (1-12):
                            </label>
                            <input
                                type="number"
                                max="12"
                                value={columns || ''}
                                onChange={(e) => setColumns(e.target.value ? Math.min(Math.max(Number(e.target.value), 1), 12) : '')}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">
                                Height (px):
                            </label>
                            <input
                                type="number"
                                value={height || ''}
                                onChange={(e) => setHeight(e.target.value ? Math.max(Number(e.target.value), 1) : '')}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                                min="20"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MeasurementForm;
