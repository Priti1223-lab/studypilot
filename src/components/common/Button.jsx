
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-secondary hover:bg-accent text-textc",
    danger:
      "bg-danger hover:bg-red-600 shadow-redglow text-textc",
    ghost:
      "bg-transparent border border-borderc hover:border-accent text-gray-200"
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
