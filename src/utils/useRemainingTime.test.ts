import { renderHook, act } from "@testing-library/react-hooks";
import { DateTime, Duration } from "luxon";
import useRemainingTime from "./useRemainingTime";
import { Settings } from "luxon";
import { waitFor } from '@testing-library/react';
Settings.defaultLocale = "en-US";

describe("useRemainingTime", () => {
  // it("returns null if startDate is not provided", () => {
  //   const { result } = renderHook(() => useRemainingTime());

  //   expect(result.current).toBeNull(); // If startDate is not provided, remainingTime should be null
  // });

  it("returns remaining time based on the startDate", () => {
    jest.useFakeTimers();

    const startDate = new Date("2023-12-31T00:00:00.000Z");
    const now = new Date("2023-12-30T00:00:00.000Z"); // Set current time to one day before startDate

    const { result } = createRoot(() => useRemainingTime(startDate, now));

    expect(result.current).toEqual(
      Duration.fromObject({
        days: 1,
        hours: 0,
        milliseconds: 0,
        minutes: 0,
        seconds: 0,
      })
    ); // Initially, 1 day should be remaining

    // act(() => {
    //   jest.advanceTimersByTime(1000 * 60 * 60 * 24); // Advance time by one day
    // });

    // expect(result.current).toEqual(Duration.fromObject({})); // After one day, no time should be remaining
  });

  // it("returns null if startDate is in the past", () => {
  //   const startDate = new Date("2020-01-01T00:00:00.000Z");
  //   const now = new Date("2023-12-31T00:00:00.000Z"); // Set current time to one day before startDate

  //   const { result } = renderHook(() => useRemainingTime(startDate, now));

  //   expect(result.current).toBeNull(); // If startDate is in the past, remainingTime should be null
  // });

  // it("returns null if startDate is in the future but now is not provided", () => {
  //   const startDate = new Date("2023-12-31T00:00:00.000Z");

  //   const { result } = renderHook(() => useRemainingTime(startDate));

  //   expect(result.current).toBeNull(); // If now is not provided and startDate is in the future, remainingTime should be null
  // });

  // it("updates remaining time every second", () => {
  //   jest.useFakeTimers();

  //   const startDate = new Date("2023-12-31T00:00:00.000Z");
  //   const now = new Date("2023-12-30T00:00:00.000Z"); // Set current time to one day before startDate
  //   jest.spyOn(global.Date, "now").mockImplementation(() => now.getTime()); // Mock Date.now() to return the current time

  //   const { result } = renderHook(() => useRemainingTime(startDate, now));

  //   expect(result.current).toEqual(Duration.fromObject({ days: 1 })); // Initially, 1 day should be remaining

  //   act(() => {
  //     jest.advanceTimersByTime(1000); // Advance time by one second
  //   });

  //   expect(result.current).toEqual(Duration.fromObject({ days: 1, seconds: -1 })); // After one second, 1 day and 1 second should be remaining
  // });

  // it("clears interval when component unmounts", () => {
  //   jest.useFakeTimers();

  //   const startDate = new Date("2023-12-31T00:00:00.000Z");
  //   const now = new Date("2023-12-30T00:00:00.000Z"); // Set current time to one day before startDate
  //   jest.spyOn(global.Date, "now").mockImplementation(() => now.getTime()); // Mock Date.now() to return the current time

  //   const { result, unmount } = renderHook(() => useRemainingTime(startDate, now));

  //   expect(result.current).toEqual(Duration.fromObject({ days: 1 })); // Initially, 1 day should be remaining

  //   unmount();

  //   act(() => {
  //     jest.advanceTimersByTime(1000); // Advance time by one second
  //   });

  //   expect(result.current).toEqual(Duration.fromObject({ days: 1 })); // After unmounting, remainingTime should not update
  // });
});


