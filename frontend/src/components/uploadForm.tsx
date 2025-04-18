// This component allows users to upload instructions either by pasting text or uploading a file.
// It uses Axios to send the data to a backend endpoint for processing.
// The component maintains local state for the text, file, and status messages.
// The form submission is handled asynchronously, and feedback is provided to the user based on the response from the server.
// The component is styled using Tailwind CSS for a clean and modern look.
import React, { useState } from 'react';
import axios from 'axios';
import JobStatusViewer from "./jobStatusViewer";

const UploadForm: React.FC = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [jobId, setJobId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!text && !file) {
            setStatus("❌ Please provide either text instructions or upload a file.");
            return;
        }

        const formData = new FormData();
        if (text) formData.append('text', text);
        if (file) formData.append('file', file);

        // try {
        //     setLoading(true);
        //     setStatus(null); // Reset status before submission
        //     // simulate backedend call for now
        //     await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
        //     const response = await axios.post('http://localhost:8000/instructions/submit', formData);
        //     setStatus(`✅ Successfully submitted!`);
        // } catch (error) {
        //     setStatus('❌ Error submitting instructions.');
        // } finally {
        //     setLoading(false);
        // }
        try {
          const response = await axios.post('http://localhost:8000/instructions/submit', formData);
          setJobId(response.data.job_id);
    } catch (error) {
          console.error('Error submitting instructions:', error);
        }
    };

    return (
        <div >
            {/* <div className="bg-blue-600 text-white p-4 rounded mb-4 text-center">  
                Tailwind is working ✅
            </div> */}
            <div className="hidden bg-blue-600 text-white"></div>
          <h1 className="text-2xl text-gray-800 font-bold mb-6">Upload Instructions</h1>
    
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
              <input type="file"
                     onChange={(e) => setFile(e.target.files?.[0] || null)}
                     className="block w-full border border-gray-300 rounded-md p-2"/>
            </div>
    
            <button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Submit
            </button>
    
            {status && (
              <p className="mt-4 text-green-600 font-medium">✅ Successfully submitted!</p>
            )}
            
            {jobId && <JobStatusViewer jobId={jobId} />}
          </form>
        </div>
      );
};

export default UploadForm;
