const LoadingSpinnerLarge = ({
  color = "text-primary",
  size = "10rem", // Direct pixel value instead of Tailwind class
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        display: "block", // Prevent inline spacing issues
        padding: 0,
        margin: 0,
      }}
      className={color}>
      {[...Array(12)].map((_, i) => {
        const angle = i * 30;
        const delay = -((11 - i) / 12);
        return (
          <g transform={`rotate(${angle} 50 50)`} key={i}>
            <rect
              fill="currentColor"
              height="12"
              width="6"
              ry="6"
              rx="3"
              y="24"
              x="47">
              <animate
                repeatCount="indefinite"
                begin={`${delay}s`}
                dur="1s"
                keyTimes="0;1"
                values="1;0"
                attributeName="opacity"
              />
            </rect>
          </g>
        );
      })}
    </svg>
  );
};

export default LoadingSpinnerLarge;
