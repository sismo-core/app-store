type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
};

export function Telegram({
  size,
  color,
  className,
  style,
  strokeWidth,
}: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M6.18734 9.4832L12.5097 15.0468C12.5828 15.1112 12.6714 15.1555 12.7668 15.1753C12.8622 15.1951 12.9611 15.1898 13.0539 15.1599C13.1466 15.13 13.23 15.0765 13.2959 15.0047C13.3617 14.9329 13.4078 14.8452 13.4295 14.7502L16.0743 3.20963C16.0971 3.10985 16.0923 3.00572 16.0604 2.90847C16.0284 2.81121 15.9706 2.72452 15.893 2.65772C15.8154 2.59093 15.7211 2.54657 15.6202 2.52943C15.5193 2.51229 15.4156 2.52301 15.3203 2.56044L2.34364 7.65841C2.23054 7.70284 2.13488 7.78269 2.07095 7.88603C2.00703 7.98936 1.97828 8.11062 1.98902 8.23165C1.99975 8.35269 2.04939 8.46699 2.13051 8.55746C2.21162 8.64793 2.31985 8.7097 2.439 8.73353L6.18734 9.4832Z"
        stroke={color}
        strokeWidth={strokeWidth ? strokeWidth : (size * 1.13) / 18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.1875 9.48324L15.7579 2.57129"
        stroke={color}
        strokeWidth={strokeWidth ? strokeWidth : (size * 1.13) / 18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.34503 12.2619L7.14775 14.4592C7.06908 14.5378 6.96885 14.5914 6.85974 14.6131C6.75062 14.6348 6.63752 14.6237 6.53474 14.5811C6.43196 14.5385 6.34411 14.4664 6.2823 14.3739C6.22049 14.2814 6.1875 14.1727 6.1875 14.0614V9.48328"
        stroke={color}
        strokeWidth={strokeWidth ? strokeWidth : (size * 1.13) / 18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
