import React, { useState } from 'react';
import axios from 'axios';

const JobViewer: React.FC = () => {
    const [jobId, setJobId] = useState('');
    const [status, setStatus] = useState('');
    const [steps, setSteps] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchJob = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/jobs/${jobId}`);
            setStatus(response.data.status);
            setSteps(response.data.steps);
            setError(null);
        } catch (err) {
            setError("Job not found or error fetching job.");
            setSteps([]);
            setStatus('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">View Job Status</h2>
            <input
                type="text"
                placeholder="Enter Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={fetchJob}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow-sm transition"
            >
                Fetch Job
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {status && (
                <div className="mt-6">
                    <p className="text-gray-700">
                        <span className="font-medium">Status:</span>{" "}
                        <span className={`inline-block px-2 py-1 text-sm rounded ${
                            status === 'images_generated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {status}
                            </span>
                    </p>
                </div>
            )}
            {steps.length > 0 && (
                <div className="mt-6 space-y-4">    
                    {steps.map((step, idx) => (
                        <div key={idx} className="border p-4 rounded-md shadow-sm bg-gray-50">
                            <p className="font-semibold text-gray-800 mb-1">Step {step.step}</p>
                            <p className="text-gray-700">{step.instruction}</p>
                            {step.image_url && (
                                <img src={step.image_url} alt={`Step ${step.step}`} className="mt-3 rounded border" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobViewer;
