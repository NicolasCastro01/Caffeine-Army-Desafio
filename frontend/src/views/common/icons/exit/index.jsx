function ExitIcon({ width = '24', height = '24', fill = "#271718" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <defs>
        <clipPath id="clip-path">
          <path
            fill={fill}
            d="M0 0H24V24H0z"
            data-name="Retângulo 4159"
          ></path>
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)" data-name="Grupo 22813">
        <g data-name="Grupo 22812">
          <g fill={fill} clipPath="url(#clip-path)" data-name="Grupo 22811">
            <path
              d="M19.2 4H12a.8.8 0 000 1.6h6.4v12.8H12a.8.8 0 100 1.6h7.2a.8.8 0 00.8-.8V4.8a.8.8 0 00-.8-.8"
              data-name="Caminho 7199"
            ></path>
            <path
              d="M8.965 8.965a.8.8 0 00-1.131-1.131l-3.591 3.59a.811.811 0 00-.182.268.893.893 0 00-.026.127A.8.8 0 004 12a.8.8 0 00.234.566l3.6 3.6a.8.8 0 001.131-1.131L6.728 12.8H15.2a.8.8 0 100-1.6H6.734z"
              data-name="Caminho 7200"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ExitIcon;
