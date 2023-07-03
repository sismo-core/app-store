type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function ZkProof({ size, color, className, style }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={(47.44 / 56.46) * size}
      viewBox="0 0 56.46 47.44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M56.46,28.23h-5.61c0-12.47-10.15-22.62-22.62-22.62S5.61,15.76,5.61,28.23H0C0,12.66,12.66,0,28.23,0s28.23,12.66,28.23,28.23Z"
        fill={color}
      />
      <path
        d="M28.23,47.44c-10.62,0-19.26-8.64-19.26-19.26S17.61,8.92,28.23,8.92s19.26,8.64,19.26,19.26-8.64,19.26-19.26,19.26Zm0-32.91c-7.53,0-13.65,6.12-13.65,13.65s6.12,13.65,13.65,13.65,13.65-6.12,13.65-13.65-6.12-13.65-13.65-13.65Z"
        fill={color}
      />
    </svg>
  );
}
