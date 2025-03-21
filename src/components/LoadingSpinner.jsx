const LoadingSpinner = ({
  className = "",
  size = "3rem", // Keep size separate as it's used for dimensions
  style = {}, // Allow additional style customization
}) => {
  // Ensure size has proper units
  const sizeValue =
    typeof size === "string" &&
    !size.endsWith("px") &&
    !size.endsWith("rem") &&
    !size.endsWith("%")
      ? `${size}px`
      : size;

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        fill: "none",
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.25"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
export default LoadingSpinner;
