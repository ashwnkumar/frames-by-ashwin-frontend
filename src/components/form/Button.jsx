import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  navTo,
  variant = "primary",
  icon: Icon,
  label,
  type = "button",
}) => {
  const variants = {
    primary: "bg-dark text-light ",
    danger: " bg-red-600 text-white",
    secondary: "hover:bg-dark/10",
  };

  const commonClasses = `w-fit px-4 py-2 hover:rounded-lg cursor-pointer transition-all duration-300 active:translate-y-1 disabled:bg-dark/60 disabled:pointer-events-none flex items-center justify-center gap-2 ${
    variants[variant] || variants["primary"]
  } ${className}`;

  if (navTo) {
    return (
      <Link to={navTo} className={commonClasses}>
        {label && <span>{label}</span>}
        {Icon && <Icon />}
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={commonClasses}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : (
        <>
          {label && !children && <span>{label}</span>}
          {Icon && <Icon />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
