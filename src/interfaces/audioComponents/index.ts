import React from "react";

export interface IAudioVisualizerComponentProps {
  mediaURL: string | null;
  isPlaying: boolean;
  analyser?: AnalyserNode | null;
}

export interface IAudioControlComponentProps {
  tutorTranscript: string;
  isSubmitting: boolean;
  setTutorTranscript: React.Dispatch<React.SetStateAction<string>>;
  aiAudio: HTMLAudioElement | null;
  setAiAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  isGradingTime: boolean;
  setIsGradingTime: React.Dispatch<React.SetStateAction<boolean>>;
}
