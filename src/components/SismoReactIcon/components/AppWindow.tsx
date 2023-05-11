type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
};

export function AppWindow({
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
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M42.5205 9.37622H8.14551C7.28256 9.37622 6.58301 10.0758 6.58301 10.9387V39.0637C6.58301 39.9267 7.28256 40.6262 8.14551 40.6262H42.5205C43.3835 40.6262 44.083 39.9267 44.083 39.0637V10.9387C44.083 10.0758 43.3835 9.37622 42.5205 9.37622Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6143 18.7512C14.9087 18.7512 15.958 17.7019 15.958 16.4075C15.958 15.1131 14.9087 14.0637 13.6143 14.0637C12.3198 14.0637 11.2705 15.1131 11.2705 16.4075C11.2705 17.7019 12.3198 18.7512 13.6143 18.7512Z"
        fill={color}
      />
      <path
        d="M21.4268 18.7512C22.7212 18.7512 23.7705 17.7019 23.7705 16.4075C23.7705 15.1131 22.7212 14.0637 21.4268 14.0637C20.1323 14.0637 19.083 15.1131 19.083 16.4075C19.083 17.7019 20.1323 18.7512 21.4268 18.7512Z"
        fill={color}
      />
    </svg>
  );
}
