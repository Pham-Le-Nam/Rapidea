import React, { useId, useState } from "react";

type StarRatingProps = {
    value?: number;
    onChange?: (value: number) => void;
    size?: number;
    disabled?: boolean;
    className?: string;
};

const StarRating: React.FC<StarRatingProps> = ({
    value = 0,
    onChange,
    size = 32,
    disabled = false,
    className,
}) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const clipId = useId();
    const displayValue = hoverValue ?? value;

    const handleClick = (
        e: React.MouseEvent<HTMLSpanElement>,
        index: number
    ) => {
        if (disabled) return;

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
        if (disabled) return;

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
                    cursor: disabled ? "default" : "pointer",
                    display: "inline-block",
                    width: size,
                    height: size,
                }}
            >
                <svg viewBox="0 0 24 24" width="100%" height="100%">
                    <path
                        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
                        fill="#ddd"
                    />
                    <defs>
                        <clipPath id={`${clipId}-clip-${index}`}>
                            <rect x="0" y="0" width={`${fill}%`} height="100%" />
                        </clipPath>
                    </defs>
                    <path
                        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
                        fill="#f5a623"
                        clipPath={`url(#${clipId}-clip-${index})`}
                    />
                </svg>
            </span>
        );
    };

    return <div className={className}>{[0, 1, 2, 3, 4].map(renderStar)}</div>;
};

export default StarRating;
