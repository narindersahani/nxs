import clsx from "clsx";

const Button = ({
  as = "button", // Can be "button" or "a"
  variant = "primary",
  size = "md",
  href,
  onClick, // Click event handler
  className,
  children,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-semibold transition duration-300";

  const variants = {
    primary: "shadow-[0px_4px_0px_0px_#3D5684] bg-primary leading-[normal] py-[13px] px-[22px] text-[16px] text-white border-1 rounded-[12px] border-[#3D5684] hover:bg-primary hover:text-white hover:border-primary",
    secondary: "shadow-[0px_4px_0px_0px_#A9ADB9] bg-gray-50 leading-[normal] py-[13px] px-[20px] text-[16px] text-gray-300 border-1 rounded-[12px] border-gray-200 hover:bg-primary hover:text-white hover:border-primary",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Determine whether the element is a <button> or <a>
  const Component = as === "a" ? "a" : "button";

  return (
    <Component
      className={clsx(base, variants[variant], sizes[size], className)}
      href={as === "a" ? href : undefined}
      onClick={onClick} // Handle click event
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
