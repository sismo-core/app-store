import { DateTime, Duration } from "luxon";
import { useEffect, useRef, useState } from "react";

export default function useRemainingTime(startDate: Date){
  const [remainingTime, setRemainingTime] = useState<Duration>(null);
  const interval = useRef(null);
  useEffect(() => {
    if (!startDate) return;

    clearInterval(interval.current);
    
    function getDuration() {
      const now = DateTime.now().toUTC();
      const luxonUTCStartDate = startDate && DateTime.fromJSDate(startDate);
      if (!luxonUTCStartDate) return;

      const remainingTimeForStartDate = luxonUTCStartDate.diff(now, [
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ]);
     setRemainingTime(remainingTimeForStartDate);
    }

    interval.current = setInterval(() => {
      getDuration();
    }, 1000);

    getDuration();

    return () => {
      clearInterval(interval.current);
    };
  }, [startDate]);

  return remainingTime;
}