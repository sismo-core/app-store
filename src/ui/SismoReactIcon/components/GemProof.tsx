type Props = {
  size: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function GemProof({
  size = 19,
  color = "#E9ECFF",
  className,
  style,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M28.9998 55.2812L56.6349 35.2041L46.0786 2.71875H11.9211L1.36475 35.2041L28.9998 55.2812Z"
        fill={color}
      />
      <path
        d="M28.9998 55.2812L56.6349 35.2041M28.9998 55.2812L1.36475 35.2041M28.9998 55.2812L48.607 34.0441M28.9998 55.2812L9.55085 34.0441M56.6349 35.2041L46.0786 2.71875M56.6349 35.2041L48.607 34.0441M46.0786 2.71875H11.9211M46.0786 2.71875L48.607 34.0441M11.9211 2.71875L1.36475 35.2041M11.9211 2.71875L48.607 34.0441M11.9211 2.71875L9.55085 34.0441M1.36475 35.2041L9.55085 34.0441"
        stroke="#13203D"
        strokeWidth={(1.35939 / 58) * size}
        strokeMiterlimit="10"
      />
    </svg>
  );
}
