import { DateTime, Duration } from "luxon";
import { useEffect, useRef, useState } from "react";

export default function useRemainingTime(time: { startDate?: Date; endDate?: Date }) {
  const [remainingStartTime, setRemainingStartTime] = useState<Duration>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(true);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [remainingEndTime, setRemainingEndTime] = useState<Duration>(null);
  const interval = useRef(null);
  useEffect(() => {
    clearInterval(interval.current);

    function getDuration() {
      const now = DateTime.now().toUTC();
      const luxonUTCStartDate = time?.startDate && DateTime.fromJSDate(time?.startDate);
      const luxonUTCEndDate = time?.endDate && DateTime.fromJSDate(time?.endDate);

      if (luxonUTCStartDate) {
        const remainingTimeForStartDate = luxonUTCStartDate.diff(now, [
          "months",
          "days",
          "hours",
          "minutes",
          "seconds",
          "milliseconds",
        ]);
        if (remainingTimeForStartDate.milliseconds < 0) {
          setRemainingStartTime(null);
          setHasStarted(true);
        } else {
          setRemainingStartTime(remainingTimeForStartDate);
          setHasStarted(false);
        }
      } else {
        // by default we assume that the app has started
        setHasStarted(true);
        setRemainingStartTime(null);
      }

      if (luxonUTCEndDate) {
        const remainingTimeForEndDate = luxonUTCEndDate.diff(now, [
          "days",
          "hours",
          "minutes",
          "seconds",
          "milliseconds",
        ]);
        if (remainingTimeForEndDate.milliseconds < 0) {
          setRemainingEndTime(null);
          setHasEnded(true);
        } else {
          setRemainingEndTime(remainingTimeForEndDate);
          setHasEnded(false);
        }
      } else {
        // by default we assume that the app has not ended
        setHasEnded(false);
        setRemainingEndTime(null);
      }
    }

    interval.current = setInterval(() => {
      getDuration();
    }, 1000);

    getDuration();

    return () => {
      clearInterval(interval.current);
    };
  }, [time?.startDate, time?.endDate]);

  return {
    hasStarted,
    hasEnded,
    remainingStartTime,
    remainingEndTime,
  };
}
