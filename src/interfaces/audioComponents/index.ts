import React from "react";

export interface IAudioVisualizerComponentProps {
  mediaURL: string | null;
  isPlaying: boolean;
  analyser?: AnalyserNode | null;
}

export interface IAudioControlComponentProps {
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  aiAudio: HTMLAudioElement | null;
  setAiAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}
