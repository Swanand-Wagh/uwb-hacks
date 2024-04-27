export enum RecordingState {
  IDLE = "idle",
  RECORDING = "recording",
  STOPPED = "stopped",
}

export interface IUseMediaRecorderReturn {
  mediaURL: string | null;
  recordingState: RecordingState;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  deleteRecording: () => void;
  error: string | null;
  analyser: AnalyserNode | null;
}
