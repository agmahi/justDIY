import React, { useState } from "react";
import { getIconsFromPrompt } from "../utils/getIconsFromPrompt";

type ClauseProps = {
  title: string;
  summary: string;
  raw_text: string;
  icon_prompt?: string;
};

const ClauseCard: React.FC<ClauseProps> = ({
  title,
  summary,
  raw_text,
  icon_prompt,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const icons = getIconsFromPrompt(icon_prompt);

  return (
    <div className="rounded-xl bg-white shadow-md p-6 border border-gray-200 space-y-4 transition hover:shadow-lg">
      {/* Icons */}
      <div className="flex justify-center gap-3">
        {icons.map((Icon, index) => (
          <Icon key={index} className="w-6 h-6 text-blue-600" />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-center text-gray-800">{title}</h3>

      {/* Summary */}
      <p className="text-sm text-gray-700 text-center">{summary}</p>

      {/* Toggle raw clause */}
      <div className="text-center">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide original clause" : "Show original clause"}
        </button>
      </div>

      {/* Raw text */}
      {showDetails && (
        <div className="bg-gray-50 p-3 text-sm text-gray-600 rounded border border-gray-100">
          {raw_text}
        </div>
      )}
    </div>
  );
};

export default ClauseCard;
// This component displays a card for each clause with its title, summary, and an optional image.
// It also includes a button to toggle the visibility of the raw text of the clause.
