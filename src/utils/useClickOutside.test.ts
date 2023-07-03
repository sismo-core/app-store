import { act, renderHook } from "@testing-library/react";
import useOnClickOutside from "./useClickOutside";

describe("useOnClickOutside", () => {
  it("calls the callback when clicking outside the ref element", () => {
    const outsideClickCallback = jest.fn();
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() =>
    useOnClickOutside(ref, outsideClickCallback)
  );

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(outsideClickCallback).toHaveBeenCalled();
  });

  it("does not call the callback when clicking inside the ref element", () => {
    const outsideClickCallback = jest.fn();
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() =>
      useOnClickOutside(ref, outsideClickCallback)
    );

    act(() => {
      ref.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(outsideClickCallback).not.toHaveBeenCalled();
  });

  it("calls the callback when pressing the Escape key", () => {
    const outsideClickCallback = jest.fn();
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() =>
      useOnClickOutside(ref, outsideClickCallback)
    );

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));
    });

    expect(outsideClickCallback).toHaveBeenCalled();
  });

  it("does not call the callback when pressing a different key", () => {
    const outsideClickCallback = jest.fn();
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() =>
      useOnClickOutside(ref, outsideClickCallback)
    );

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { code: "Enter" }));
    });

    expect(outsideClickCallback).not.toHaveBeenCalled();
  });
});