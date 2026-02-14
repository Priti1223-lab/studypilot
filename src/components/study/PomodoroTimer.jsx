import { useEffect, useRef, useState } from "react";

export default function PomodoroTimer() {
  const STUDY = 25 * 60;
  const BREAK = 5 * 60;

  const [seconds, setSeconds] = useState(STUDY);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);

  const intervalRef = useRef(null);

  // sound
  const playSound = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );
    audio.play();
  };

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          playSound();

          if (isBreak) {
            setIsBreak(false);
            return STUDY;
          } else {
            setIsBreak(true);
            setCycles((c) => c + 1);
            return BREAK;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, isBreak]);

  const format = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setIsBreak(false);
    setSeconds(STUDY);
    setCycles(0);
  };

  return (
    <div className="card max-w-xl mx-auto text-center space-y-6">

      <h2 className="text-2xl font-semibold text-accent">
        Pomodoro Timer
      </h2>

      <p className="text-soft">
        {isBreak ? "Break Time ☕" : "Focus Time 📚"}
      </p>

      <div className="text-6xl font-bold tracking-widest text-textc">
        {format(seconds)}
      </div>

      <p className="text-soft">
        Completed Cycles: {cycles}
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={() => setRunning(true)}
          className="px-5 py-2 rounded-lg bg-secondary hover:bg-accent"
        >
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
          className="px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500"
        >
          Pause
        </button>

        <button
          onClick={reset}
          className="px-5 py-2 rounded-lg bg-danger hover:bg-red-600"
        >
          Reset
        </button>

      </div>
    </div>
  );
}
