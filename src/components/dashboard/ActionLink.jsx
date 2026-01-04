export default function ActionLink({ text, className = "" }) {
  return (
    <a
      className={`
        inline-flex items-center
        text-primary hover:text-red-700
        font-semibold text-sm
        transition-colors
        group-hover:translate-x-1 duration-200
        cursor-pointer
        ${className}
      `}
    >
      {text}
      <span className="material-icons-round text-sm ml-1">
        arrow_forward
      </span>
    </a>
  );
}
