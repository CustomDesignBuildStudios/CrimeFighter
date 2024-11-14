import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import {MarkerF} from '@react-google-maps/api'

const allowedColumns = [
  'DR_NO',
  'DATERPTD',
  'AREANAME',
  'CRMCDDESC',
  'VICTAGE',
  'VICTSEX',
  'LOC'
];
const CrimeModal = ({ isOpen, onClose, crimeData, onSave, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(crimeData);
  const containerStyle = {
    width: '100%',
    height: '200px'
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (!isOpen) return null;

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const toggleEditMode = () => setIsEditMode(!isEditMode);

  // Submit edited data
  const handleSave = () => {
    onSave(formData);
    setIsEditMode(false);
  };

  // Display in read-only or edit mode
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl z-50 relative">
        <h2 className="text-xl font-bold mb-4">Crime Record Details</h2>

        {isEditMode ? (
          // Edit mode with input fields in a 3-column layout
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="font-semibold">{key}:</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ''}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 mt-1"
                  disabled={key === 'DR_NO'} // Disable editing of primary key
                />
              </div>
            ))}



            <div className="col-span-full flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleEditMode}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Display mode with text in a 3-column layout
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allowedColumns.map((key) => (
              <div key={key} className="flex flex-col">
                <span className="font-semibold">{key}:</span>
                <span>{crimeData[key]}</span>
              </div>
            ))}
<div className="flex flex-col col-span-3">

<GoogleMap 
                mapContainerStyle={containerStyle}
                center={{lat:formData.LAT,lng:formData.LON}}
                zoom={10}
              >
                    <MarkerF key={crimeData['DR_NO']}
                      position={{lat:formData.LAT,lng:formData.LON}}
                    />
              </GoogleMap>

</div>



            <div className="col-span-full flex justify-end gap-4 mt-4">
              <button
                onClick={toggleEditMode}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(crimeData.DR_NO)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CrimeModal;