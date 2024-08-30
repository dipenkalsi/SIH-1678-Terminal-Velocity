import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const RedactionComponent = () => {
  const [text, setText] = useState('');
  const [redactedText, setRedactedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const redact = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(process.env.NEXT_PUBLIC_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY  // Replace with your actual API key
        },
        body: JSON.stringify({
          text: [text],
          link_batch: false,
          entity_detection: {
            "entity_types": [
              {
                "type": "ENABLE",
                "value": ["ACCOUNT_NUMBER","AGE","DATE","DATE_INTERVAL","DOB","DRIVER_LICENSE","DURATION","EMAIL_ADDRESS","EVENT","FILENAME","GENDER_SEXUALITY","HEALTHCARE_NUMBER","IP_ADDRESS","LANGUAGE","LOCATION","LOCATION_ADDRESS","LOCATION_ADDRESS_STREET","LOCATION_CITY","LOCATION_COORDINATE","LOCATION_COUNTRY","LOCATION_STATE","LOCATION_ZIP","MARITAL_STATUS","MONEY","NAME","NAME_FAMILY","NAME_GIVEN","NAME_MEDICAL_PROFESSIONAL","NUMERICAL_PII","ORGANIZATION","ORGANIZATION_MEDICAL_FACILITY","OCCUPATION","ORIGIN","PASSPORT_NUMBER","PASSWORD","PHONE_NUMBER","PHYSICAL_ATTRIBUTE","POLITICAL_AFFILIATION","RELIGION","SSN","TIME","URL","USERNAME","VEHICLE_ID","ZODIAC_SIGN","BLOOD_TYPE","CONDITION","DOSE","DRUG","INJURY","MEDICAL_PROCESS","STATISTICS","BANK_ACCOUNT","CREDIT_CARD","CREDIT_CARD_EXPIRATION","CVV","ROUTING_NUMBER"]
              }
            ],
            return_entity: true
          },
          processed_text: {
            type: "MARKER",
            pattern: "[UNIQUE_NUMBERED_ENTITY_TYPE]"
          }
        })
      });
      
      const data = await resp.json();
      setRedactedText(data.processed_text[0]);
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