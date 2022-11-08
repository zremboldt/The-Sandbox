export default function Button({ children, className }) {
  return (
    <div className={className}>
      {children}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="squircle"
      >
        <path
          d="M0 32C0 4.16 4.16 0 32 0C59.84 0 64 4.16 64 32C64 59.84 59.84 64 32 64C4.16 64 0 59.84 0 32Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
