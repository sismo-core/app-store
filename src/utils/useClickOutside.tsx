import React, { useEffect } from "react";

export default function useOnClickOutside(
  ref: React.MutableRefObject<HTMLElement>,
  outsideClickCallback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        event.type === "mousedown" &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        outsideClickCallback();
      }
      if (event.type === "keydown" && event.code === "Escape") {
        outsideClickCallback();
      }
    }
    document.addEventListener("keydown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, outsideClickCallback]);
}
