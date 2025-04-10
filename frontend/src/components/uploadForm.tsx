// This component allows users to upload instructions either by pasting text or uploading a file.
// It uses Axios to send the data to a backend endpoint for processing.
// The component maintains local state for the text, file, and status messages.
// The form submission is handled asynchronously, and feedback is provided to the user based on the response from the server.
// The component is styled using Tailwind CSS for a clean and modern look.
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm: React.FC = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!text && !file) {
            setStatus("❌ Please provide either text instructions or upload a file.");
            return;
        }

        const formData = new FormData();
        if (text) formData.append('text', text);
        if (file) formData.append('file', file);

        try {
            setLoading(true);
            setStatus(null); // Reset status before submission
            // simulate backedend call for now
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
            const response = await axios.post('http://localhost:8000/instructions/submit', formData);
            setStatus(`✅ Successfully submitted!`);
        } catch (error) {
            setStatus('❌ Error submitting instructions.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
          <h1 className="text-2xl text-gray-600 font-bold mb-6">Upload Instructions</h1>
    
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Paste Instructions (optional)
              </label>
              <textarea
                placeholder="Paste your instructions here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Upload File (.txt or .pdf)
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
    
            {status && (
              <p className="mt-4 text-green-600 font-medium">✅ Successfully submitted!</p>
            )}
          </form>
        </div>
      );
};

export default UploadForm;
