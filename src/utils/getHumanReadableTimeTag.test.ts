import { Duration } from "luxon";
import { getHumanReadableRemainingTimeTag } from "./getHumanReadableTimeTag";

describe("getHumanReadableRemainingTimeTag", () => {
  describe("when startDuration is defined", () => {
    it("returns the correct string for months", () => {
      const startDuration = Duration.fromObject({ months: 2 });
      const result = getHumanReadableRemainingTimeTag({ startDuration });
      expect(result).toEqual("Available in 2 months");
    });

    it("returns the correct string for days", () => {
      const startDuration = Duration.fromObject({ days: 5 });
      const result = getHumanReadableRemainingTimeTag({ startDuration });
      expect(result).toEqual("Available in 5 days");
    });

    it("returns the correct string for hours", () => {
      const startDuration = Duration.fromObject({ hours: 3 });
      const result = getHumanReadableRemainingTimeTag({ startDuration });
      expect(result).toEqual("Available in 3 hours");
    });

    it("returns the correct string for minutes", () => {
      const startDuration = Duration.fromObject({ minutes: 10 });
      const result = getHumanReadableRemainingTimeTag({ startDuration });
      expect(result).toEqual("Available in 10 minutes");
    });

    it("returns the correct string for seconds", () => {
      const startDuration = Duration.fromObject({ seconds: 30 });
      const result = getHumanReadableRemainingTimeTag({ startDuration });
      expect(result).toEqual("Available in 30 seconds");
    });

    it("throws an error if both startDuration and endDuration are defined", () => {
      const startDuration = Duration.fromObject({ days: 1 });
      const endDuration = Duration.fromObject({ hours: 2 });
      expect(() => getHumanReadableRemainingTimeTag({ startDuration, endDuration })).toThrowError(
        "startDuration and endDuration cannot be both defined"
      );
    });
  });

  describe("when endDuration is defined", () => {
    it("returns the correct string for months", () => {
      const endDuration = Duration.fromObject({ months: 2 });
      const result = getHumanReadableRemainingTimeTag({ endDuration });
      expect(result).toEqual("Available in 2 months");
    });

    it("returns the correct string for days", () => {
      const endDuration = Duration.fromObject({ days: 5 });
      const result = getHumanReadableRemainingTimeTag({ endDuration });
      expect(result).toEqual("Ends in 5 days");
    });

    it("returns the correct string for hours", () => {
      const endDuration = Duration.fromObject({ hours: 3 });
      const result = getHumanReadableRemainingTimeTag({ endDuration });
      expect(result).toEqual("Ends in 3 hours");
    });

    it("returns the correct string for minutes", () => {
      const endDuration = Duration.fromObject({ minutes: 10 });
      const result = getHumanReadableRemainingTimeTag({ endDuration });
      expect(result).toEqual("Ends in 10 minutes");
    });

    it("returns the correct string for seconds", () => {
      const endDuration = Duration.fromObject({ seconds: 30 });
      const result = getHumanReadableRemainingTimeTag({ endDuration });
      expect(result).toEqual("Ends in 30 seconds");
    });
  });
});
