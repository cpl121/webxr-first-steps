/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PositionalAudio as PAudio, Quaternion, Vector3 } from 'three';
import { PositionalAudio, useGLTF } from '@react-three/drei';
import { useXRControllerButtonEvent, useXRInputSourceStateContext, type XRHandedness } from '@react-three/xr';

import { useTimeStore } from './time';
import { useBulletStore } from './bullets';
import { useRef, useMemo } from 'react';

export const Gun = ({ hand }: XRHandedness) => {
    const state = useXRInputSourceStateContext('controller', hand);    
    const gamepad = state.inputSource.gamepad;
    const original = useGLTF('assets/blaster.glb').scene;
    const scene = useMemo(() => original.clone(true), []);
    const bulletPrototype = scene.getObjectByName('bullet')!;
    const soundRef = useRef<PAudio>(null);
    useXRControllerButtonEvent(state, 'xr-standard-trigger', (state) => {
        if (state === 'pressed' && useTimeStore.getState().time > 0) {
            useBulletStore
                .getState()
                .addBullet(
                    bulletPrototype.getWorldPosition(new Vector3()),
                    bulletPrototype.getWorldQuaternion(new Quaternion()),
                );
            const laserSound = soundRef.current!;
            if (laserSound.isPlaying) laserSound.stop();
            laserSound.play();
            gamepad.hapticActuators?.[0]?.pulse(0.6, 100);
        }
    });

    return (
        <>
            <primitive object={scene} />
            <PositionalAudio ref={soundRef} url="assets/laser.ogg" loop={false} />
        </>
    );
};

useGLTF.preload('assets/blaster.glb');