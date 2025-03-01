const Button = ({ btntext, onClick, cssClasses }) => {
  return (
    <div>
      <button onClick={onClick} className={cssClasses}>
        {btntext}
      </button>
    </div>
  );
};

export default Button;
