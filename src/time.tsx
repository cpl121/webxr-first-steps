/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text } from '@react-three/drei';
import { useEffect } from 'react';

import { create } from 'zustand';

type TimeStore = {
    time: number;
    addTime: () => void;
};
export const useTimeStore = create<TimeStore>((set) => ({
    time: 1000 * 15,
    isStarted: false,
    startTime: () => set(() => ({ isStarted: true })),
    addtime: () => set((state) => ({ time: state.time + 500 })), // 500ms
    subTime: () => set((state) => ({ time: state.time - 1000 })), // 1s
    resetTime: () => set(() => ({ time: 1000 * 15 })), // 15s
}));

export const Time = () => {
    const formatTimeText = (time: number) => {
        return Math.floor(time / 1000).toString().padStart(3, '0');
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
            position={[-2.2, 0.8, -0.9]}
            quaternion={[-0.15, 0.55, 0.4, 0.25]}
        >
            {formatTimeText(time)}
        </Text>
    );
};
