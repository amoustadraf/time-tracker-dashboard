'use client';
import { useState, useEffect } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

export function TimerCard() {
    const [running, setRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    useEffect(() => {
        let timer:NodeJS.Timeout;
        if (running) {
            timer = setInterval(() => setElapsed(prev => prev + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [running]);
    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>Timer</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-mono mb-4">{formatTime(elapsed)}</div>
                <Button onClick={() => setRunning(!running)}>
                    {running ? 'Stop' : 'Start'}
                </Button>
            </CardContent>
        </Card>
    );
}