import React, { useState } from "react";
import { getIconsFromPrompt } from "../utils/getIconsFromPrompt";

type ClauseProps = {
    title: string;
    summary: string;
    raw_text: string;
    image_url?: string;
    icon_prompt?: string;
};

const emojiMap: Record<string, string> = {
    subscription: "💳",
    privacy: "🔒",
    family: "👨‍👩‍👧‍👦",
    device: "📱",
    trial: "⏳",
    cancel: "❌",
    data: "📊",
    default: "📄"
  };

const ClauseCard: React.FC<ClauseProps> = ({
    title,
    summary,
    raw_text,
    image_url,
    icon_prompt,
}) => {
    const [showDetails, setShowDetails] = useState(false);

    type IconType = {
        component: React.FC<React.SVGProps<SVGSVGElement>>;
        name: string;
    };

    const icons: IconType[] = getIconsFromPrompt(icon_prompt);

    // const getEmoji = (prompt: string | undefined): string => {
    //     if (!prompt) return emojiMap.default;
    //     const key = prompt.toLowerCase();
    //     for (const term in emojiMap) {
    //         if (key.includes(term)) return emojiMap[term];
    //     }
    //     return emojiMap.default;
    // };

    return (
        <div className="border bg-white rounded-xl p-4 shadow-sm space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-700">{summary}</p>

            {/* {image_url ? (
                <img src={image_url} alt={icon_prompt || title} className="w-full rounded mt-2" />
            ) : (
            <div className="bg-gray-100 text-gray-500 p-4 rounded text-sm text-center">
                {icon_prompt || "Visual placeholder"}
            </div>
            )} */}
            
            {/* <div className="text-4xl text-center">
                {getEmoji(icon_prompt)}
            </div>
             */}
            
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                {icons.map(({ component: Icon, name }) => (
                    <Icon key={name} className="w-6 h-6 text-blue-600" title={name} />
                    ))}
            </div>

            <div className="text-xs text-center text-gray-500">
                {icon_prompt}
            </div>
            
            <button className="text-sm text-blue-600 hover:underline"
                    onClick={() => setShowDetails(!showDetails)}
            >
                        {showDetails ? "Hide original clause" : "Show original clause"}
            </button>

            {showDetails && (
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded border">
                    {raw_text}
                </p>
            )}
            
        </div>
    );
};

export default ClauseCard;
// This component displays a card for each clause with its title, summary, and an optional image.
// It also includes a button to toggle the visibility of the raw text of the clause.
