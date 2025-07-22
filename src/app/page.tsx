'use client';

import { useEffect, useState } from "react";
import { TimerCard, Timer } from "@/components/TimerCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: 1,
      name: "Timer 1",
      elapsed: 0,
      running: false,
      nextNotifyAt: 3600,
    },
  ]);

  // GLOBAL TICKER: every 1s, increment elapsed for running timers + fire notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const canNotify =
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted";

      setTimers((prev) =>
        prev.map((t) => {
          if (!t.running) return t;

          const newElapsed = t.elapsed + 1;
          let nextNotifyAt = t.nextNotifyAt;

          // Time to notify?
          if (canNotify && newElapsed >= t.nextNotifyAt) {
            new Notification(`1 hour passed: ${t.name} is still running!`, {
              body: "Still good? Need a break?",
            });
            nextNotifyAt = t.nextNotifyAt + 3600;
          }

          return { ...t, elapsed: newElapsed, nextNotifyAt };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Ask for notification permission once
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, []);

  // === Handlers ===

  const toggleTimer = (id: number) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, running: !t.running } : t
      )
    );
  };

  const resetTimer = (id: number) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, elapsed: 0, nextNotifyAt: 3600 } : t
      )
    );
  };

  const renameTimer = (id: number, newName: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: newName } : t))
    );
  };

  const deleteTimer = (id: number) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const addTimer = () => {
    const id = Date.now();
    setTimers((prev) => [
      ...prev,
      {
        id,
        name: `Timer ${prev.length + 1}`,
        elapsed: 0,
        running: false,
        nextNotifyAt: 3600,
      },
    ]);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-8 bg-black text-gray-100">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {timers.map((timer) => (
          <TimerCard
            key={timer.id}
            timer={timer}
            onToggle={toggleTimer}
            onReset={resetTimer}
            onRename={renameTimer}
            onDelete={deleteTimer}
          />
        ))}
      </section>

      <Button
        onClick={addTimer}
        className="bg-white text-black hover:bg-gray-200"
      >
        Add Timer
      </Button>
    </main>
  );
}