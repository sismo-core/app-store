type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
};

export function Message({
  size,
  color,
  className,
  style,
  strokeWidth,
}: Props): JSX.Element {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M5.48329 14.157L3.17446 16.0979C3.09246 16.1668 2.99249 16.2109 2.8863 16.2249C2.78011 16.239 2.67211 16.2224 2.57501 16.1772C2.47791 16.132 2.39574 16.06 2.33816 15.9696C2.28059 15.8793 2.25 15.7744 2.25 15.6673V4.5C2.25 4.35082 2.30926 4.20774 2.41475 4.10225C2.52024 3.99676 2.66332 3.9375 2.8125 3.9375H15.1875C15.3367 3.9375 15.4798 3.99676 15.5852 4.10225C15.6907 4.20774 15.75 4.35082 15.75 4.5V13.5C15.75 13.6492 15.6907 13.7923 15.5852 13.8977C15.4798 14.0032 15.3367 14.0625 15.1875 14.0625H5.74249L5.48329 14.157Z"
        stroke={color}
        strokeWidth={strokeWidth ? strokeWidth : (size * 1.13) / 18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 7.875H11.25"
        stroke={color}
        strokeWidth={strokeWidth ? strokeWidth : (size * 1.13) / 18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 10.125H11.25"
        stroke={color}
        strokeWidth={strokeWidth ? strokeWidth : (size * 1.13) / 18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
