import { useEffect, useState } from "react";

const Timer = () => {
  const [hours, setHours] = useState(5);
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(0);

  const [totalDuration, setTotalDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const formatTime = (value) => String(value).padStart(2, "0");

  const handleStart = () => {
    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    if (totalSeconds <= 0) return;

    setTotalDuration(totalSeconds);
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(0);
    setTotalDuration(0);
  };

  const adjustValue = (setter, value, delta, max) => {
    let next = Number(value) + delta;
    if (next < 0) next = 0;
    if (max !== undefined && next > max) next = max;
    setter(next);
  };

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsRunning(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const displayHours = formatTime(Math.floor(timeLeft / 3600));
  const displayMinutes = formatTime(Math.floor((timeLeft % 3600) / 60));
  const displaySeconds = formatTime(timeLeft % 60);

  // Circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = totalDuration > 0 ? timeLeft / totalDuration : 1;
  const dashOffset = circumference * (1 - progress);

  const displayTime = hasStarted
    ? `${displayHours}:${displayMinutes}:${displaySeconds}`
    : `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

  return (
    <div className="bg-[#101744] rounded-[20px] p-4 sm:p-6 h-full flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8">
      {/* Circular progress timer */}
      <div className="flex items-center justify-center shrink-0">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-35 md:h-35">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#2A3164"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#FF6A6A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-sm sm:text-base md:text-lg font-semibold tracking-wide">
              {displayTime}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs + Start button */}
      <div className="w-full flex-1 flex flex-col gap-4 sm:gap-5">
        <div className="flex justify-around text-center text-white">
          {[
            {
              label: "Hours",
              value: hours,
              setter: setHours,
              max: 99,
            },
            {
              label: "Minutes",
              value: minutes,
              setter: setMinutes,
              max: 59,
            },
            {
              label: "Seconds",
              value: seconds,
              setter: setSeconds,
              max: 59,
            },
          ].map((field, idx) => (
            <div key={field.label} className="flex items-center gap-1 sm:gap-3">
              <div className="flex flex-col items-center">
                <p className="text-gray-400 text-[10px] sm:text-xs mb-1">
                  {field.label}
                </p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <input
                    type="number"
                    min="0"
                    value={formatTime(field.value)}
                    onChange={(e) => field.setter(e.target.value)}
                    disabled={hasStarted}
                    className="bg-transparent text-center text-xl sm:text-2xl md:text-3xl font-semibold w-10 sm:w-12 md:w-14 outline-none disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={hasStarted}
                      onClick={() =>
                        adjustValue(field.setter, field.value, 1, field.max)
                      }
                      className="text-gray-400 hover:text-white leading-none text-xs disabled:opacity-40 disabled:hover:text-gray-400"
                      aria-label={`Increase ${field.label}`}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={hasStarted}
                      onClick={() =>
                        adjustValue(field.setter, field.value, -1, field.max)
                      }
                      className="text-gray-400 hover:text-white leading-none text-xs disabled:opacity-40 disabled:hover:text-gray-400"
                      aria-label={`Decrease ${field.label}`}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
              {idx < 2 && (
                <span className="text-gray-500 text-lg sm:text-2xl pb-4 sm:pb-5">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {!hasStarted ? (
          <button
            onClick={handleStart}
            className="w-full bg-[#FF6A6A] py-2.5 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium cursor-pointer hover:bg-[#ff5757] transition-colors"
          >
            Start
          </button>
        ) : (
          <div className="flex gap-2 sm:gap-3">
            {isRunning ? (
              <button
                onClick={handlePause}
                className="flex-1 bg-[#F1C75B] py-2.5 sm:py-3 rounded-full text-[#101744] text-sm sm:text-base font-medium cursor-pointer hover:bg-[#e0b84a] transition-colors"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={handleResume}
                disabled={timeLeft <= 0}
                className="flex-1 bg-[#4ADE80] py-2.5 sm:py-3 rounded-full text-[#101744] text-sm sm:text-base font-medium cursor-pointer hover:bg-[#3ec96f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Resume
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex-1 bg-transparent border-2 border-[#FF6A6A] py-2.5 sm:py-3 rounded-full text-[#FF6A6A] text-sm sm:text-base font-medium cursor-pointer hover:bg-[#FF6A6A] hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
