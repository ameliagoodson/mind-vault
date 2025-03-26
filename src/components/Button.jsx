import { Link } from "react-router";

const Button = ({ btntext, icon, onClick, cssClasses, disabled, to }) => {
  return to ? (
    <Link to={to} className={cssClasses}>
      {icon && icon}
      {btntext && btntext}
    </Link>
  ) : (
    <button onClick={onClick} className={cssClasses} disabled={disabled}>
      {icon && icon}
      {btntext && btntext}
    </button>
  );
};

export default Button;
