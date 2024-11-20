import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  LoadScriptNext,
} from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import Comments from "./Comments";
import { useAuth } from "../AuthContext.jsx";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const allowedColumns = [
  'DR_NO',
  'DATERPTD',
  'AREA',
  'VICTAGE',
  'VICTSEX',
  'CRMCD',
  'WEAPONUSEDCD',
  'LAT',
  'LON'
];
const CrimeModal = ({ isOpen, onClose, data, onSave, onDelete, sexData, descentData,areaData,crimeData,weaponData,statusData }) => {
  const [endDate, setEndOccurredDate] = useState(new Date());

  // Set startOccurredDate to one month ago from today
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const [startDate, setStartOccurredDate] = useState(oneMonthAgo);

  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(data);
  const [canEdit, setCanEdit] = useState(false);
  const containerStyle = {
    width: "100%",
    height: "200px",
  };
  useEffect(() => {
    let userID = ""
    console.log(user)
    if(user){
      userID = user['ACCOUNTID']
    }
    setFormData((prev) => ({ ...prev, ['ACCOUNTID']: userID }));
    if(user){
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }, [user]);

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
    axios
      .post("http://localhost:8080/add-report", { data: formData })
      .then((results) => {
        if (results.data === true) {
          setIsEditMode(false);
          onSave();
        }
      });
  };

  // Display in read-only or edit mode
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative z-50 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Crime Record Details</h2>

        {isEditMode || formData["DR_NO"] == "NEW REPORT" ? (
          // Edit mode with input fields in a 3-column layout
          <form className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="font-semibold">{key}:</label>
                {key === "DATETIMEOCC" ? (
                  <DatePicker
                    name={key}
                    selected={formData[key] || ""}
                    onChange={(date) => {
                      setFormData((prev) => ({ ...prev, [key]: date }));
                    }}
                    selectsEnd
                    minDate={startDate} // Start date is one month ago
                    maxDate={endDate}
                    placeholderText="End Date"
                    className="w-full p-2 text-white bg-gray-700 rounded"
                    showTimeSelect // Enables time selection
                    timeFormat="HH:mm" // Sets time format (e.g., 24-hour format)
                    timeIntervals={15} // Sets time intervals (e.g., every 15 minutes)
                    dateFormat="yyyy-MM-dd HH:mm:ss" // Sets the format for displaying date and time
                  />
                ) : key === "AREA" ? (
                  <select
                    id="area"
                    value={formData[key] || ""}
                    onChange={(event) => {
                      // Log the event object to make sure it's correctly passed
                      console.log(event.target.value); // Should print the selected value

                      if (key && event.target) {
                        // Make sure key and event.target are defined
                        let val = "";
                        if (
                          event.target.value != null &&
                          event.target.value != ""
                        ) {
                          val = areaData[event.target.value]["title"];
                        }
                        setFormData((prev) => ({
                          ...prev,
                          [key]: event.target.value, // Update the first key with the selected value
                          AREANAME: val, // Update the second key with the same or different value
                        }));
                      } else {
                        console.error("Key or event.target is undefined");
                      }
                    }}
                    className="w-full p-2 text-white bg-gray-700 rounded"
                  >
                    <option value="">Select Area</option>
                    {Object.entries(areaData).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value["title"]}
                      </option>
                    ))}
                  </select>
                ) : key === "CRMCD" ? (
                  <select
                    id="crime"
                    value={formData[key] || ""}
                    onChange={(event) => {
                      if (key && event.target) {
                        // Make sure key and event.target are defined
                        setFormData((prev) => ({
                          ...prev,
                          [key]: event.target.value, // Correctly updating the value in formData
                          CRMCDDESC: crimeData[event.target.value], // Update the second key with the same or different value
                        }));
                      } else {
                        console.error("Key or event.target is undefined");
                      }
                    }}
                    className="w-full p-2 text-white bg-gray-700 rounded"
                  >
                    {Object.entries(crimeData).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : key === "VICTAGE" || key === "LAT" || key === "LON" ? (
                  <input
                    type="number"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="p-2 mt-1 border border-gray-300 rounded"
                  />
                ) : key === "VICTSEX" ? (
                  <select
                    id="gender"
                    value={formData[key] || ""}
                    onChange={(event) => {
                      // Log the event object to make sure it's correctly passed
                      console.log(event.target.value); // Should print the selected value

                      if (key && event.target) {
                        // Make sure key and event.target are defined
                        setFormData((prev) => ({
                          ...prev,
                          [key]: event.target.value, // Correctly updating the value in formData
                        }));
                      } else {
                        console.error("Key or event.target is undefined");
                      }
                    }}
                    className="w-full p-2 text-white bg-gray-700 rounded"
                  >
                    <option value="">Select Gender</option>
                    {Object.entries(sexData).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : key === "VICTDESCENT" ? (
                  <select
                    id="gender"
                    value={formData[key] || ""}
                    onChange={(event) => {
                      // Log the event object to make sure it's correctly passed
                      console.log(event.target.value); // Should print the selected value

                      if (key && event.target) {
                        // Make sure key and event.target are defined
                        setFormData((prev) => ({
                          ...prev,
                          [key]: event.target.value, // Correctly updating the value in formData
                        }));
                      } else {
                        console.error("Key or event.target is undefined");
                      }
                    }}
                    className="w-full p-2 text-white bg-gray-700 rounded"
                  >
                    <option value="">Select Descent</option>
                    {Object.entries(descentData).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : key === "PREMISCD" ? (
                  <p>Loading...</p>
                ) : key === "WEAPONUSEDCD" ? (
                  <select
                    id="weapon"
                    value={formData[key] || ""}
                    onChange={(event) => {
                      if (key && event.target) {
                        // Make sure key and event.target are defined
                        setFormData((prev) => ({
                          ...prev,
                          [key]: event.target.value, // Correctly updating the value in formData
                          WEAPONDESC: weaponData[event.target.value], // Update the second key with the same or different value
                        }));
                      } else {
                        console.error("Key or event.target is undefined");
                      }
                    }}
                    className="w-full p-2 text-white bg-gray-700 rounded"
                  >
                    {Object.entries(weaponData).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="p-2 mt-1 border border-gray-300 rounded"
                    disabled={key === "DR_NO"} // Disable editing of primary key
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end gap-4 mt-4 col-span-full">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Display mode with text in a 3-column layout
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {allowedColumns.map((key) => (
              <div key={key} className="flex flex-col">
                <span className="font-semibold">{key}:</span>
                <span>{data[key]}</span>
              </div>
            ))}
            <div className="flex flex-col col-span-3">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: formData.LAT, lng: formData.LON }}
                zoom={10}
              >
                <MarkerF
                  key={data["DR_NO"]}
                  position={{ lat: formData.LAT, lng: formData.LON }}
                />
              </GoogleMap>
            </div>

            <Comments CrimeID={data["DR_NO"]} />
            {canEdit && user["accountId"] == data["ACCOUNTID"] ? (
              <div className="flex justify-end gap-4 mt-4 col-span-full">
                {/* <button
                  onClick={toggleEditMode}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button> */}
                {/* <button
                  onClick={() => onDelete(data.DR_NO)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button> */}
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex justify-end gap-4 mt-4 col-span-full">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CrimeModal;
