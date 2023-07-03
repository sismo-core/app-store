import { Duration } from "luxon";

export function getHumanReadableRemainingTimeTag({
  startDuration,
  endDuration,
}: {
  startDuration?: Duration;
  endDuration?: Duration;
}) {

  if (startDuration && endDuration)
    throw new Error("startDuration and endDuration cannot be both defined");


  if (startDuration) {
    if (startDuration?.months > 0) {
      return `Available in ${startDuration.months} month${
        startDuration.months > 1 ? "s" : ""
      }`;
    }
    if (startDuration?.days > 0) {
      return `Available in ${startDuration.days} day${
        startDuration.days > 1 ? "s" : ""
      }`;
    }
    if (startDuration?.hours > 0) {
      return `Available in ${startDuration.hours} hour${
        startDuration.hours > 1 ? "s" : ""
      }`;
    }
    if (startDuration?.minutes > 0) {
      return `Available in ${startDuration.minutes} minute${
        startDuration.minutes > 1 ? "s" : ""
      }`;
    }
    if (startDuration?.seconds >= 0) {
      return `Available in ${startDuration.seconds.toFixed(0)} second${
        startDuration.seconds > 1 ? "s" : ""
      }`;
    }
  }



  if (endDuration) {
    if (endDuration?.months > 0) {
      return `Available in ${endDuration.months} month${
        endDuration.months > 1 ? "s" : ""
      }`;
    }
    if (endDuration?.days > 0) {
      return `Ends in ${endDuration.days} day${endDuration.days > 1 ? "s" : ""}`;
    }
    if (endDuration?.hours > 0) {
      return `Ends in ${endDuration.hours} hour${endDuration.hours > 1 ? "s" : ""}`;
    }
    if (endDuration?.minutes > 0) {
      return `Ends in ${endDuration.minutes} minute${
        endDuration.minutes > 1 ? "s" : ""
      }`;
    }
    if (endDuration?.seconds >= 0) {
      return `Ends in ${endDuration.seconds.toFixed(0)} second${
        endDuration.seconds > 1 ? "s" : ""
      }`;
    }
  }
}
