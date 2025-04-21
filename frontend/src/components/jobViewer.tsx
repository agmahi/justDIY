import React, { useState } from 'react';
import axios from 'axios';
import ClauseCard from "./clauseCard";


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
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">View a Job</h2>
            <input
                type="text"
                placeholder="Enter Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={fetchJob}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
                Fetch Job
            </button>
            
            {status && (
                <div>
                    <p className="font-medium text-gray-700">
                        Status:{" "}
                        <span 
                            className={`inline-block px-2 py-1 rounded text-sm ${
                                status === "images_generated"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {status}
                        </span>
                    </p>
                </div>
            )}
            {steps.length > 0 && (
                <div className="space-y-4 mt-4">
                    {/* {steps.map((step, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                            <p className="font-semibold mb-1 text-gray-800">Step {step.step}</p> 
                            <p className="font-semibold mb-1 text-gray-800">{step.title}</p>
                            <p className="mb-1 text-black-500">Summary: {step.summary}</p>
                            <p className="text-gray-700">{step.icon_prompt}</p>
                            {step.image_url && (
                                <img
                                    src={step.image_url}
                                    alt={`Step ${step.step}`}
                                    className="mt-3 rounded border"
                                />
                                )}
                        </div>
                    ))} */}
                    {steps.map((clause, idx) => (
                        <ClauseCard 
                            key={idx}
                            title={clause.title}
                            summary={clause.summary}
                            raw_text={clause.raw_text}
                            icon_prompt={clause.icon_prompt}
                            image_url={clause.image_url}
                        />
                    ))}
                </div>
            )}
            {error && <p className="text-red-600 font-medium">{error}</p>}
            </div>
        );
};

export default JobViewer;
