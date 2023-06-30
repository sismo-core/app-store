type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function EthRounded({
  size,
  color,
  className,
  style,
}: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM8.6875 16.0776L16.131 3.8125L23.627 16.0776L16.131 20.58L8.6875 16.0776ZM8.6875 17.7337L16.131 28.1875L23.627 17.7337L16.131 21.9773L8.6875 17.7337Z"
        fill={color}
      />
    </svg>
  );
}
