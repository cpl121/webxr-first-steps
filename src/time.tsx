/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text } from '@react-three/drei';
import { useEffect } from 'react';
/* import { useControls } from 'leva'; */

import { create } from 'zustand';

type TimeStore = {
    time: number;
    isStarted: boolean;
    startTime: () => void;
    addTime: () => void;
    subTime: () => void;
    resetTime: () => void;
};

export const useTimeStore = create<TimeStore>((set) => ({
    time: 1000 * 15,
    isStarted: false,
    startTime: () => set(() => ({ isStarted: true })),
    addTime: () => set((state) => ({ time: state.time + 500 })), // 500ms
    subTime: () => set((state) => ({ time: state.time - 1000 })), // 1s
    resetTime: () => set(() => ({ time: 1000 * 15 })), // 15s
}));

export const Time = () => {
    /* const positionTime = useControls('Time', {
        positionX: { value: -2.36, min: -2.5, max: 2, step: 0.01 },
        positionY: { value: 0.77, min: -2.5, max: 2, step: 0.01 },
        positionZ: { value: -1.03, min: -2.5, max: 2, step: 0.01 },
        rotationX: { value: -2.33, min: -2.5, max: 2, step: 0.01 },
        rotationY: { value: 1.32, min: -2.5, max: 2, step: 0.01 },
        rotationZ: { value: -0.84, min: -2.5, max: 2, step: 0.01 },
        scaleX: { value: -0.84, min: -2.5, max: 2, step: 0.01 },
        scaleY: { value: -0.87, min: -2.5, max: 2, step: 0.01 },
        scaleZ: { value: 0, min: -2.5, max: 2, step: 0.01 },
    }) */
    const formatTimeText = (time: number) => {
        return time > 0 ? Math.floor(time / 1000).toString().padStart(3, '0') : 'END';
    };

    const time = useTimeStore((state) => state.time);
    const isStarted = useTimeStore((state) => state.isStarted);

    useEffect(() => {
            if (time > 0 && isStarted) {
                const interval = setInterval(() => {
                    useTimeStore.getState().subTime();
                }
                , 1000);
                return () => clearInterval(interval);
            }
        }, [time, isStarted])

    return (
        <Text
            color={0xffa276}
            font="assets/SpaceMono-Bold.ttf"
            fontSize={0.7}
            anchorX="center"
            anchorY="middle"
            position={[-2.36, 0.77, -1.03]}
            rotation={[-2.33, 1.32, -0.84]}
            scale={[-0.84, -0.87, 0]}
            >
            {formatTimeText(time)}
        </Text>
    );
};
