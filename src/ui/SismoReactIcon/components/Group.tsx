type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
};

export function Group({
  size,
  color,
  className,
  style,
  strokeWidth = 2,
}: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      className={className}
      style={style}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <circle cx="25.0235" cy="23.1361" r="6.35556" />
      <path d="M15.0918 39.3157C15.0918 39.3157 15.3479 29.4875 25.1809 29.4916C35.0139 29.4958 34.9522 39.3168 34.9522 39.3168" />
      <path d="M29.753 13.8341C32.5449 10.8332 38.4285 10.8892 40.5389 15.646C42.6493 20.4028 38.0104 24.8965 34.9525 24.8966" />
      <path d="M34.9512 24.9155C45.5417 24.9197 45.4752 34.7406 45.4752 34.7406" />
      <path d="M20.247 13.8341C17.4551 10.8332 11.5715 10.8892 9.46114 15.646C7.35074 20.4028 11.9896 24.8965 15.0475 24.8966" />
      <path d="M15.0488 24.9155C4.45833 24.9197 4.52483 34.7406 4.52483 34.7406" />
    </svg>
  );
}
