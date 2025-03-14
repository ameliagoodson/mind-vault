const Button = ({ btntext, onClick, cssClasses }) => {
  return (
    <button onClick={onClick} className={cssClasses}>
      {btntext}
    </button>
  );
};

export default Button;
