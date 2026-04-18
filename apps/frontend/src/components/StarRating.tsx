import React, { useState } from "react";

type StarRatingProps = {
    value?: number; // current rating (0–5, step 0.5)
    onChange?: (value: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ value = 0, onChange }) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const displayValue = hoverValue ?? value;

    const handleClick = (
        e: React.MouseEvent<HTMLSpanElement>,
        index: number
    ) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - left;

        const isHalf = clickX < width / 2;
        const newValue = isHalf ? index + 0.5 : index + 1;

        onChange?.(newValue);
    };

    const handleMouseMove = (
        e: React.MouseEvent<HTMLSpanElement>,
        index: number
    ) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const hoverX = e.clientX - left;

        const isHalf = hoverX < width / 2;
        const newHover = isHalf ? index + 0.5 : index + 1;

        setHoverValue(newHover);
    };

    const handleMouseLeave = () => {
        setHoverValue(null);
    };

    const renderStar = (index: number) => {
        let fill = 0;

        if (displayValue >= index + 1) {
            fill = 100;
        } else if (displayValue >= index + 0.5) {
            fill = 50;
        }

        return (
            <span
                key={index}
                onClick={(e) => handleClick(e, index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                style={{
                cursor: "pointer",
                display: "inline-block",
                width: 32,
                height: 32,
                }}
            >
                <svg viewBox="0 0 24 24" width="100%" height="100%">
                {/* background (gray star) */}
                    <path
                        d="M12 17.27L18.18 21 16.54 13.97 
                        22 9.24 14.81 8.63 12 2 
                        9.19 8.63 2 9.24 7.46 13.97 
                        5.82 21z"
                        fill="#ddd"
                    />
                    {/* filled portion */}
                    <defs>
                        <clipPath id={`clip-${index}`}>
                            <rect x="0" y="0" width={`${fill}%`} height="100%" />
                        </clipPath>
                    </defs>
                    <path
                        d="M12 17.27L18.18 21 16.54 13.97 
                        22 9.24 14.81 8.63 12 2 
                        9.19 8.63 2 9.24 7.46 13.97 
                        5.82 21z"
                        fill="#f5a623"
                        clipPath={`url(#clip-${index})`}
                    />
                </svg>
            </span>
        );
    };

    return <div>{[0, 1, 2, 3, 4].map(renderStar)}</div>;
};

export default StarRating;