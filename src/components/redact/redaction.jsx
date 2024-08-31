import React, { useState } from 'react';
import { useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import axios from 'axios';

const RedactionComponent = () => {
  const [text, setText] = useState('');
  const [redactedText, setRedactedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = {
    "PII (Personally Identifiable Information)": ['ACCOUNT_NUMBER', 'AGE', 'DATE', 'DATE_INTERVAL', 'DOB', 'DRIVER_LICENSE', 'DURATION', 'EMAIL_ADDRESS', 'EVENT', 'FILENAME', 'GENDER_SEXUALITY', 'GENDER', 'SEXUALITY', 'HEALTHCARE_NUMBER', 'IP_ADDRESS', 'LANGUAGE', 'LOCATION', 'LOCATION_ADDRESS', 'LOCATION_ADDRESS_STREET', 'LOCATION_CITY', 'LOCATION_COORDINATE', 'LOCATION_COUNTRY', 'LOCATION_STATE', 'LOCATION_ZIP', 'MARITAL_STATUS', 'MONEY', 'NAME', 'NAME_FAMILY', 'NAME_GIVEN', 'NAME_MEDICAL_PROFESSIONAL', 'NUMERICAL_PII', 'ORGANIZATION', 'ORGANIZATION_MEDICAL_FACILITY', 'OCCUPATION', 'ORIGIN', 'PASSPORT_NUMBER', 'PASSWORD', 'PHONE_NUMBER', 'PHYSICAL_ATTRIBUTE', 'POLITICAL_AFFILIATION', 'RELIGION', 'SSN', 'TIME', 'URL', 'USERNAME', 'VEHICLE_ID', 'ZODIAC_SIGN'],
    "PHI (Protected Health Information)": ['BLOOD_TYPE', 'CONDITION', 'DOSE', 'DRUG', 'INJURY', 'MEDICAL_PROCESS', 'STATISTICS'],
    "PCI (Payment Card Industry)": ['BANK_ACCOUNT', 'CREDIT_CARD', 'CREDIT_CARD_EXPIRATION', 'CVV', 'ROUTING_NUMBER'],
  };
  const handleSelectAll = (category) => {
    const allSelected = filters[category].every((option) =>
      selectedFilters.includes(option)
  );
  if (allSelected) {
    setSelectedFilters(
      selectedFilters.filter((option) => !filters[category].includes(option))
    );
  } else {
    setSelectedFilters([
      ...selectedFilters,
      ...filters[category].filter((option) => !selectedFilters.includes(option)),
    ]);
  }
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleCheckboxChange = (option) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(option)? prevSelected.filter((item) => item !== option): [...prevSelected, option]
    );
    
  };
  const redact = async () => {
    setIsLoading(true);
    try {
      const r = await axios.post("https://0815-2406-b400-71-d2dc-e90f-d262-75b4-ca09.ngrok-free.app/redact/", {
        text: text,
        filters: selectedFilters
      })
      const data = r.data;
      setRedactedText(data.redacted_text[0].processed_text);
    } catch (error) {
      console.error("Error redacting text:", error);
      setRedactedText("An error occurred while redacting the text.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(redactedText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">Try PIReT Now</h2>
        <div className="flex flex-col space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
            rows={4}
            placeholder="Enter your text here..."
          />
          <div className="relative">
            {isFilterOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" onClick={toggleFilter}></div>
            )}
            <button className="px-4 py-2 bg-blend-normal text-white rounded z-20 relative float-right" onClick={toggleFilter}>
              Filters
            </button>
            {isFilterOpen && (
              <div className="absolute -top-80 -left-40 flex max-h-80 overflow-y-auto border bg-black p-6 rounded shadow-lg z-30 bg-opacity-50 space-x-10">
                {Object.keys(filters).map((category) => {
                  const isAllSelected = filters[category].every((option) =>selectedFilters.includes(option))
                  return (
                    <div key={category} className="mb-4">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`${category}-select-all`}
                          className="mr-2"
                          checked={isAllSelected}
                          onChange={() => handleSelectAll(category)}
                        />
                        <h3 className="font-semibold text-lg">{category}</h3>
                      </div>
                      {filters[category].map((option) => (
                        <div key={option} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={option}
                            className="mr-2"
                            checked={selectedFilters.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                          />
                          <label htmlFor={option} className="text-gray-400">{option}</label>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button
            onClick={redact}
            className="w-full bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 disabled:opacity-50"
            disabled={isLoading || !text}
          >
            {isLoading ? 'Redacting...' : 'Redact Text'}
          </button>
          <div className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg relative">
            <p className="text-white font-mono break-all">{redactedText || 'Redacted text will appear here...'}</p>
            {redactedText && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label="Copy redacted text"
              >
                {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedactionComponent;




