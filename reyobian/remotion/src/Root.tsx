import React from 'react';
import { Composition } from 'remotion';
import { HookTest } from './HookTest';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="HookTest" component={HookTest} durationInFrames={210} fps={30} width={1080} height={1920} />
  </>
);
