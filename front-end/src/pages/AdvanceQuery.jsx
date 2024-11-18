import React, { useState } from 'react';
import GenderTimeQuery from '../Components/GenderTime';
import AreaTimeQuery from '../Components/AreaTime';

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
          Gender Time Query
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'area'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('area')}
        >
          Area Time Query
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'gender' && <GenderTimeQuery />}
        {activeTab === 'area' && <AreaTimeQuery />}
      </div>
    </div>
  );
}

export default AdvanceQueryPage;