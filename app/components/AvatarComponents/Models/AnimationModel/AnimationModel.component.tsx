import React, { useRef, FC, useMemo, useState } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { AnimationMixer, Group } from "three";

import { Model } from "@/components/AvatarComponents/Models/Model";
import {
  useHeadMovement,
  useGltfLoader,
  useFallback,
  useIdleExpression,
  useEmotion,
} from "@/services/avatar/index";
import { BaseModelProps } from "@/types/avatar";
import { loadAnimationClip } from "@/services/avatar/Animation.service";
import { Emotion } from "@/components/Avatar/Avatar.component";

export interface AnimationModelProps extends BaseModelProps {
  modelSrc: string | Blob;
  animationSrc: string | Blob;
  rotation?: number;
  scale?: number;
  idleRotation?: boolean;
  headMovement?: boolean;
  emotion?: Emotion;
}

let currentRotation = 0;

export const AnimationModel: FC<AnimationModelProps> = ({
  modelSrc,
  animationSrc,
  // rotation = 1 * (Math.PI / 180),
  rotation = 0, // Start rotation at 0
  scale = 1,
  idleRotation = false,
  setModelFallback,
  onLoaded,
  headMovement = false,
  emotion,
  bloom,
}) => {
  const ref = useRef<Group>(null);
  const [animationRunning, setAnimationRunning] = useState(true);
  const onSpawnAnimationFinish = () => {
    setAnimationRunning(false);
  };

  const { scene } = useGltfLoader(modelSrc);
  const { nodes } = useGraph(scene);

  const animationClip = useMemo(
    async () => loadAnimationClip(animationSrc),
    [animationSrc]
  );

  const animationMixer = useMemo(async () => {
    const mixer = new AnimationMixer(nodes.Armature);
    if (animationRunning) {
      return mixer;
    }

    const animation = mixer.clipAction(await animationClip);
    animation.fadeIn(0);
    animation.play();

    mixer.update(0);

    return mixer;
  }, [animationRunning, animationClip, nodes.Armature]);

  useFrame(async (state, delta) => {
    (await animationMixer)?.update(delta);

    if (!idleRotation) {
      return;
    }

    if (ref?.current) {
      currentRotation += delta * 0.4;
      // Rotate 30 degrees left and right
      ref.current.rotation.y =
        rotation + Math.sin(currentRotation) * (Math.PI / 6);
    }
  });

  useHeadMovement({ nodes, enabled: headMovement });
  useEmotion(nodes, emotion);
  useIdleExpression("blink", nodes);
  useFallback(nodes, setModelFallback);

  return (
    <Model
      modelRef={ref}
      scene={scene}
      scale={scale}
      onLoaded={onLoaded}
      onSpawnAnimationFinish={onSpawnAnimationFinish}
      bloom={bloom}
    />
  );
};
