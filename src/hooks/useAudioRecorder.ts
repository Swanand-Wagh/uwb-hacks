import { useState, useEffect, useCallback } from "react";
import { IUseMediaRecorderReturn, RecordingState } from "@/interfaces/hooks";

export const useMediaRecorder = (): IUseMediaRecorderReturn => {
  const [mediaURL, setMediaURL] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.IDLE);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    return () => {
      mediaRecorder?.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    };
  }, [mediaRecorder]);

  const createMediaBlob = useCallback((chunks: Blob[], stream: MediaStream) => {
    const mediaBlob = new Blob(chunks, { type: "audio/webm" });
    const mediaURL = URL.createObjectURL(mediaBlob);

    setMediaURL(mediaURL);
    setRecordingState(RecordingState.STOPPED);

    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
  }, []);

  const startRecording = useCallback(async () => {
    if (recordingState !== "idle") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();

      mediaStreamSource.connect(analyserNode);
      setAnalyser(analyserNode);

      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
      recorder.onstop = () => createMediaBlob(chunks, stream);

      setMediaRecorder(recorder);
      recorder.start();
      setRecordingState(RecordingState.RECORDING);
    } catch (err) {
      setError("Failed to start recording. Please ensure you have granted access.");
    }
  }, [recordingState, createMediaBlob]);

  const stopRecording = useCallback(() => {
    if (recordingState === "recording" && mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [recordingState, mediaRecorder]);

  const deleteRecording = useCallback(() => {
    if (mediaURL) {
      URL.revokeObjectURL(mediaURL);
      setMediaURL(null);
      setRecordingState(RecordingState.IDLE);
    }
  }, [mediaURL]);

  return {
    mediaURL,
    recordingState,
    startRecording,
    stopRecording,
    deleteRecording,
    error,
    analyser,
  } as const;
};
