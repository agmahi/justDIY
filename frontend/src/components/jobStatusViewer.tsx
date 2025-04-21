import { useEffect, useState } from "react";
import axios from "axios";
import ClauseCard from "./clauseCard";

const JobStatusViewer = ({ jobId }: { jobId: string }) => {
  const [status, setStatus] = useState("");
  const [steps, setSteps] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:8000/jobs/${jobId}`);
        setStatus(res.data.status);
        setSteps(res.data.steps);

        if (res.data.status === "Completed - Clauses Extracted") {
          clearInterval(interval); // Stop polling when done
        }
      } catch (err) {
        clearInterval(interval);
        setError("Error fetching job status.");
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup
  }, [jobId]);

  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-gray-600">
        <strong>Job ID:</strong> {jobId}
      </p>
      <p className="font-medium text-gray-700">
        Status:{" "}
        <span
          className={`inline-block px-2 py-1 rounded text-sm ${
            status === "Completed - Clauses Extracted"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status || "waiting..."}
        </span>
      </p>

      {steps.length > 0 && (
        <div className="space-y-4">
          {/* {steps.map((step, idx) => (
            <div key={idx} className="p-4 bg-gray-50 border rounded shadow-sm">
              <p className="font-semibold mb-1 text-gray-800">Step {step.step}</p>
              <p className="text-gray-700">{step.instruction}</p>
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
            <ClauseCard key={idx}
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

export default JobStatusViewer;
