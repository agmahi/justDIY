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
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Upload Instructions</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-semibold">Paste Instructions (optional)</label>
                    <textarea
                        className="w-full border rounded-lg p-2 resize-none"
                        rows={5}
                        value={text}
                        placeholder="Paste your instructions here..."
                        onChange={(e) => setText(e.target.value)}
                        disabled={loading}
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Upload File (.txt or .pdf)</label>
                    <input
                        type="file"
                        accept=".txt,.pdf"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        disabled={loading}
                        className="block w-full"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg font-semibold transition ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {status && <p className="mt-3 text-center text-sm">{status}</p>}
            </form>
        </div>
    );
};

export default UploadForm;
