type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
};

export function ShardGroup({
  size,
  color,
  className,
  style,
  strokeWidth = 1.92308,
}: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M14.9983 25.5011L24.8916 17.7782L34.7863 25.5011L24.8917 37.5709L14.9983 25.5011Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M30.6816 16.8309L36.3403 12.4142L47.6561 21.2476L36.3403 35.0531L34.0362 32.2701"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M19.3184 16.8309L13.6597 12.4142L2.34391 21.2476L13.6597 35.0531L15.9838 32.2701"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
