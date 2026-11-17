import React from 'react';
import { Composition } from 'remotion';
import { HookTest } from './HookTest';
import { Video3, V3_FRAMES } from './v3/Video3';
import { AppleHistory, APPLE_FRAMES } from './v3/AppleHistory';
import { NokiaHistory, NOKIA_FRAMES } from './v4/Nokia';
import { WhatsAppHistory, WA_FRAMES } from './v5/WhatsApp';
import { GoogleHistory, GOOGLE_FRAMES } from './v6/Google';
import { SamsungHistory, SAMSUNG_FRAMES } from './v7/Samsung';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Video7Samsung" component={SamsungHistory} durationInFrames={SAMSUNG_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video6Google" component={GoogleHistory} durationInFrames={GOOGLE_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video5WhatsApp" component={WhatsAppHistory} durationInFrames={WA_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video4Nokia" component={NokiaHistory} durationInFrames={NOKIA_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video3Apple" component={AppleHistory} durationInFrames={APPLE_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Video3" component={Video3} durationInFrames={V3_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="HookTest" component={HookTest} durationInFrames={210} fps={30} width={1080} height={1920} />
  </>
);
