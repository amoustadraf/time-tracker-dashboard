'use client';

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Timer {
  id: number;
  name: string;
  elapsed: number;        // seconds
  running: boolean;
  nextNotifyAt: number;   // seconds threshold for the next 1h notification
}

interface TimerCardProps {
  timer: Timer;
  onToggle: (id: number) => void;
  onReset: (id: number) => void;
  onRename: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}


// Decide the color based on elapsed time thresholds
function colorClass(seconds: number) {
  if (seconds < 2 * 3600) return "border-green-400";
  if (seconds < 4 * 3600) return "border-yellow-400";
  if (seconds < 6 * 3600) return "border-orange-400";
  return "border-red-500";
}

// Format seconds -> hh:mm:ss
function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function TimerCard({
  timer,
  onToggle,
  onReset,
  onRename,
  onDelete,
}: TimerCardProps) {

  // Ask for notification permission once per mount (safe guard if parent didn't)
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Card className={`w-[320px] border-2 ${colorClass(timer.elapsed)} bg-neutral-900`}>
      <CardHeader className="space-y-3">
        {/* Rename field */}
        <Input
          value={timer.name}
          onChange={(e) => onRename(timer.id, e.target.value)}
          className="text-xl font-semibold bg-neutral-800 border-neutral-700"
        />

        <CardTitle className="text-xs text-neutral-500 font-normal">
          {timer.running ? "Running..." : "Paused"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-3xl font-mono text-white">{formatTime(timer.elapsed)}</div>

        <div className="flex gap-2">
          <Button
            onClick={() => onToggle(timer.id)}
            className="bg-white text-black hover:bg-gray-200"
          >
            {timer.running ? "Stop" : "Start"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => onReset(timer.id)}
            className="bg-neutral-700 text-white hover:bg-neutral-600"
          >
            Reset
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete(timer.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}