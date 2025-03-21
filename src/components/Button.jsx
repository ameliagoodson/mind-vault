const Button = ({ btntext, icon, onClick, cssClasses, disabled }) => {
  return (
    <button onClick={onClick} className={cssClasses} disabled={disabled}>
      {icon && icon}
      {btntext && btntext}
    </button>
  );
};

export default Button;
