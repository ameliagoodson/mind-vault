const Button = ({ btntext, icon, onClick, cssClasses }) => {
  return (
    <button onClick={onClick} className={cssClasses}>
      {btntext && btntext}
      {icon && icon}
    </button>
  );
};

export default Button;
