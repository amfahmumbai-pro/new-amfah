import Link from "@/components/ui/AppLink";

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon: Icon,
  iconPosition = "right",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-display font-medium rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 transform hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary:
      "bg-brand-navy text-white hover:bg-brand-navy-light shadow-md shadow-brand-navy/10 hover:shadow-lg hover:shadow-brand-navy/15",
    secondary:
      "bg-brand-accent text-white hover:bg-brand-navy shadow-md shadow-brand-accent/10 hover:shadow-lg hover:shadow-brand-accent/15",
    outline:
      "border border-brand-border bg-transparent text-brand-navy hover:border-brand-navy hover:bg-brand-gray-light",
    white:
      "bg-white text-brand-navy hover:bg-brand-gray-light shadow-md shadow-black/5 hover:shadow-lg",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonContent = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} group ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
