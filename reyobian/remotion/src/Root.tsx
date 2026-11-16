import React from 'react';
import { Composition } from 'remotion';
import { HookTest } from './HookTest';
import { Video3, V3_FRAMES } from './v3/Video3';
import { AppleHistory, APPLE_FRAMES } from './v3/AppleHistory';
import { NokiaHistory, NOKIA_FRAMES } from './v4/Nokia';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Video4Nokia" component={NokiaHistory} durationInFrames={NOKIA_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video3Apple" component={AppleHistory} durationInFrames={APPLE_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video3" component={Video3} durationInFrames={V3_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="HookTest" component={HookTest} durationInFrames={210} fps={30} width={1080} height={1920} />
  </>
);
