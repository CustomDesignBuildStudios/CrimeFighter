import React, { useState } from 'react';
import GenderTimeQuery from '../Components/GenderTime';
import AreaTimeQuery from '../Components/AreaTime';
import CrimeMonthQuery from '../Components/CrimeMonth';
import CrimeTimeOfDayQuery from '../Components/CrimeTimeOfDay';
import CrimeAreaTimeQuery from '../Components/CrimeAreaTime';

function AdvanceQueryPage() {
  const [activeTab, setActiveTab] = useState('gender');

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'gender'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('gender')}
        >
          Crime Trends by Gender
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'area'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('area')}
        >
          Severe Crime Trends by Area
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'crime-month'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('crime-month')}
        >
          Crime Trends by Month
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'crime-tod'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('crime-tod')}
        >
          Crime Trends by Time of Day
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'crime-area-time'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('crime-area-time')}
        >
          All Crime Trends by Area
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'gender' && <GenderTimeQuery />}
        {activeTab === 'area' && <AreaTimeQuery />}
        {activeTab === 'crime-month' && <CrimeMonthQuery />}
        {activeTab === 'crime-tod' && <CrimeTimeOfDayQuery />}
        {activeTab === 'crime-area-time' && <CrimeAreaTimeQuery />}
      </div>
    </div>
  );
}

export default AdvanceQueryPage;