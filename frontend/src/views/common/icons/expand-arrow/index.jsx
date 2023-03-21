import "./expand-arrow-style.css";

function ExpandArrowIcon({ width = '24', height = '24', show }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={`expand-arrow ${show}`}
    >
      <path
        fill="none"
        d="M24 0H0v24h24z"
        data-name="Caminho 7416"
        opacity="0.87"
      ></path>
      <path
        fill="#fb637e"
        d="M15.88 15.29L12 11.41l-3.88 3.88a1 1 0 01-1.41-1.41l4.59-4.59a1 1 0 011.41 0l4.59 4.59a1 1 0 010 1.41 1.017 1.017 0 01-1.42 0z"
        data-name="Caminho 7417"
        transform="translate(0 -.58)"
      ></path>
    </svg>
  );
}

export default ExpandArrowIcon;
