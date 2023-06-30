type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Gem({ size = 19, color = "#E9ECFF", className, style }: Props) {
  return (
    <svg
      version="1.1"
      id="Calque_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 19 19"
      width={size}
      height={size}
      xmlSpace="preserve"
      className={className}
      style={style}
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth={(1.4062 / 19) * size}
        strokeMiterlimit={10}
        d="M14.8,1.2l3.3,10.2l-8.6,6.2l-8.6-6.3L4.2,1.2H14.8z"
      />
    </svg>
  );
}
