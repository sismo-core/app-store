"use client";

import { ReactNode, useState } from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import colors from "@/src/themes/colors";

const Container = styled.span`
  position: relative;
  height: fit-content;
  width: fit-content;
  display: inline-flex;
  justify-content: center;
`;

const TipContent = styled.div<{ $width?: number }>`
  position: relative;
  padding: 10px;
  border-radius: 5px;

  width: ${(props) => (props.$width ? props.$width + "px" : "fit-content")};
  white-space: ${(props) => (props.$width ? "normal" : "nowrap")};

  background-color: ${colors.blue9};
  font-size: 14px;
  line-height: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.neutral1};
  z-index: 30;

  box-sizing: border-box;
`;

const Arrow = styled.div<{ $direction: string }>`
  width: 16.15px;
  height: 16.15px;
  background-color: ${(props) => props.theme.colors.blue9};
  border-radius: 1px;
  rotate: 45deg;

  ${(props) =>
    props.$direction === "top"
      ? `margin-top: -10px;
      order: 1;
      `
      : props.$direction === "bottom"
      ? `margin-bottom: -9.5px;
      order: -1;
      `
      : props.$direction === "right"
      ? `margin-right: -9.5px;
      order: -1;
      `
      : props.$direction === "left"
      ? `margin-left: -9.5px;
      order: 1;
      `
      : null}

  z-index: 29;
`;

const Tip = styled.span<{
  $isHover: boolean;
  $tooltipPosition;
}>`
  position: fixed;
  display: flex;

  top: ${(props) => props.$tooltipPosition.top}px;
  left: ${(props) => props.$tooltipPosition.left}px;

  flex-direction: ${(props) =>
    props.$tooltipPosition.tipDirection === "top" ||
    props.$tooltipPosition.tipDirection === "bottom"
      ? "column"
      : "row"};

  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.$isHover ? 1 : 0)};
  visibility: ${(props) => (props.$isHover ? "visible" : "hidden")};

  z-index: 30;

  transition: opacity 0.15s;
`;

type InfoProps = {
  children: ReactNode;
  text: string | ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  forcedDirection?: "top" | "bottom" | "left" | "right";
  className?: string;
  width?: number;
};

export default function HoverTooltip({
  children,
  text,
  disabled,
  style,
  className,
  width,
  forcedDirection,
}: InfoProps): JSX.Element {
  const [isHover, setIsHover] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  const infoRef = useRef(null);

  const [tooltipPosition, setTooltipPosition] = useState({
    tipDirection: "top",
    top: 0,
    left: 0,
  });

  const TOOLTIP_PADDING = 30;

  function handleResize() {
    const infoRefSize = infoRef?.current?.getBoundingClientRect();
    const tooltipRefSize = ref?.current?.getBoundingClientRect();

    const tooltipSize = {
      width: tooltipRefSize?.width || ref?.current?.offsetWidth,
      height: tooltipRefSize?.height || ref?.current?.offsetHeight,
    };

    const infoSize = {
      width: infoRefSize?.width || infoRef?.current?.offsetWidth,
      height: infoRefSize?.height || infoRef?.current?.offsetHeight,
    };

    const infoOffset = {
      left: infoRefSize?.left || infoRef?.current?.offsetLeft,
      top: infoRefSize?.top || infoRef?.current?.offsetTop,
    };

    const windowSize = {
      width: window?.innerWidth,
      height: window?.innerHeight,
    };

    function setTooltipTop() {
      setTooltipPosition({
        tipDirection: "top",
        top: infoOffset.top - tooltipSize.height - 10,
        left: infoOffset.left - tooltipSize.width / 2 + infoSize.width / 2,
      });
    }

    function setTooltipBottom() {
      setTooltipPosition({
        tipDirection: "bottom",
        top: infoOffset.top + infoSize.height + 10,
        left: infoOffset.left - tooltipSize.width / 2 + infoSize.width / 2,
      });
    }

    function setTooltipLeft() {
      setTooltipPosition({
        tipDirection: "left",
        top: infoOffset.top - tooltipSize.height / 2 + infoSize.height / 2,
        left: infoOffset.left - tooltipSize.width - 10,
      });
    }

    function setTooltipRight() {
      setTooltipPosition({
        tipDirection: "right",
        top: infoOffset.top - tooltipSize.height / 2 + infoSize.height / 2,
        left: infoOffset.left + infoSize.width + 10,
      });
    }

    if (forcedDirection === "top") {
      setTooltipTop();
      return;
    }

    if (forcedDirection === "bottom") {
      setTooltipBottom();
      return;
    }

    if (forcedDirection === "left") {
      setTooltipLeft();
      return;
    }

    if (forcedDirection === "right") {
      setTooltipRight();
      return;
    }

    // TOOLTIP ABOVE CENTERED
    if (
      (tooltipSize.height < infoOffset.top - TOOLTIP_PADDING &&
        tooltipSize.width / 2 <
          windowSize.width - infoOffset.left - TOOLTIP_PADDING &&
        tooltipSize.width / 2 < infoOffset.left - TOOLTIP_PADDING) ||
      forcedDirection === "top"
    ) {
      setTooltipTop();
      return;
    }

    // TOOLTIP BELOW CENTERED
    if (
      (tooltipSize.height > infoOffset.top - TOOLTIP_PADDING &&
        tooltipSize.height <
          windowSize.height - infoOffset.top - TOOLTIP_PADDING &&
        tooltipSize.width / 2 <
          windowSize.width - infoOffset.left - TOOLTIP_PADDING &&
        tooltipSize.width / 2 < infoOffset.left - TOOLTIP_PADDING) ||
      forcedDirection === "bottom"
    ) {
      setTooltipBottom();
      return;
    }

    // TOOLTIP ON THE RIGHT CENTERED
    if (infoOffset.left < windowSize.width / 2 || forcedDirection === "right") {
      setTooltipRight();
      return;
    }

    if (infoOffset.left > windowSize.width / 2 || forcedDirection === "left") {
      setTooltipLeft();
      return;
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", () => setIsHover(false));

    return () => {
      document.removeEventListener("scroll", () => setIsHover(false));
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Container
      ref={infoRef}
      className={className}
      style={style}
      onMouseEnter={() => {
        handleResize();
        setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
      {isMounted && ReactDOM.createPortal(
        <Tip ref={ref} $isHover={isHover} $tooltipPosition={tooltipPosition}>
          <TipContent $width={width}>{text}</TipContent>

          <Arrow $direction={tooltipPosition.tipDirection} />
        </Tip>,
        document.getElementById("tooltip-root") as HTMLElement
      )}
    </Container>
  );
}
