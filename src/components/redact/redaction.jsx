import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import axios from 'axios';

const RedactionComponent = () => {
  const [text, setText] = useState('');
  const [redactedText, setRedactedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const redact = async () => {
    setIsLoading(true);
    try {
      const r = await axios.post("https://8e97-2406-b400-71-d2dc-f0fe-7e75-cd1d-eed1.ngrok-free.app/redact/", {
        text : text
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