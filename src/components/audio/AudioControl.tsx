import React, { useState, useEffect, useRef } from "react";
import AudioControlStyles from "@/styles/components/audio/audioControl.module.css";
import { useMediaRecorder } from "@/hooks/useAudioRecorder";
import {
  FiMic,
  FiSquare,
  FiPlay,
  FiPause,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import { AudioVisualizer } from "./AudioVisualizer";
import { IAudioControlComponentProps } from "@/interfaces/audioComponents";

export const AudioControl: React.FC<IAudioControlComponentProps> = ({
  transcript,
  setTranscript,
  aiAudio,
  setAiAudio,
}): JSX.Element => {
  const {
    mediaURL,
    startRecording,
    stopRecording,
    deleteRecording,
    recordingState,
    analyser,
  } = useMediaRecorder();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAiAnimation, setShowAiAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    if (mediaURL) {
      const audioElement = new Audio(mediaURL);
      audioElement.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current = audioElement;

      return () => {
        audioElement.pause();
        audioElement.removeEventListener("ended", () => setIsPlaying(false));
        audioElement.src = "";
      };
    }
  }, [mediaURL]);

  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
  };

  const handleDeleteConfirm = () => {
    deleteRecording();
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    });

    return () => {
      document.removeEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setShowModal(false);
        }
      });
    };
  });

  useEffect(() => {
    if (aiAudio) {
      setShowAiAnimation(true);
      aiAudio.play();

      aiAudio.addEventListener("ended", () => {
        setShowAiAnimation(false);
        setAiAudio(null);
      });
    } else {
      setShowAiAnimation(false);
      setAiAudio(null);
    }

    return () => {
      if (aiAudio) {
        aiAudio.removeEventListener("ended", () => {
          setShowAiAnimation(false);
          setAiAudio(null);
        });
      }
    };
  }, [aiAudio, setAiAudio]);

  return (
    <React.Fragment>
      <div className={AudioControlStyles.audioControlMain}>
        <section
          className={`${AudioControlStyles.audioSections} ${AudioControlStyles.aiAudioSection}`}
        >
          <div className={AudioControlStyles.aiTalkContainer}>
            <div className={AudioControlStyles.audioBarsContainer}>
              <div
                className={`${AudioControlStyles.audioBars} ${
                  showAiAnimation && AudioControlStyles.animate
                } ${AudioControlStyles.audioBar_1}`}
              ></div>
              <div
                className={`${AudioControlStyles.audioBars} ${
                  showAiAnimation && AudioControlStyles.animate
                } ${AudioControlStyles.audioBar_2}`}
              ></div>
              <div
                className={`${AudioControlStyles.audioBars} ${
                  showAiAnimation && AudioControlStyles.animate
                } ${AudioControlStyles.audioBar_3}`}
              ></div>
              <div
                className={`${AudioControlStyles.audioBars} ${
                  showAiAnimation && AudioControlStyles.animate
                } ${AudioControlStyles.audioBar_4}`}
              ></div>
              <div
                className={`${AudioControlStyles.audioBars} ${
                  showAiAnimation && AudioControlStyles.animate
                } ${AudioControlStyles.audioBar_5}`}
              ></div>
            </div>
          </div>
          <p className={AudioControlStyles.transcriptContainer}>{transcript}</p>
        </section>

        <section
          aria-labelledby="audioControlHeading"
          className={`${AudioControlStyles.audioSections} ${AudioControlStyles.audioControlSection}`}
        >
          <h1
            id="audioControlHeading"
            className={AudioControlStyles.audioControlHeading}
          >
            Press the microphone to begin recording
          </h1>
          <div className={AudioControlStyles.audioVisualContainer}>
            {recordingState === "idle" && (
              <button
                id="start-recording"
                className={`${AudioControlStyles.audioControlBtns} ${AudioControlStyles.audioRecordingBtn}`}
                onClick={startRecording}
                aria-label="Start recording"
              >
                <FiMic />
              </button>
            )}
            {recordingState === "recording" && (
              <button
                id="stop-recording"
                className={`${AudioControlStyles.audioControlBtns} ${AudioControlStyles.audioRecordingBtn}`}
                onClick={stopRecording}
                aria-label="Stop recording"
              >
                <FiSquare />
              </button>
            )}
            {mediaURL && (
              <div className={AudioControlStyles.audioControlBtnsContainer}>
                <button
                  id="play-audio"
                  className={`${AudioControlStyles.audioControlBtns} ${AudioControlStyles.audioRecordingBtn}`}
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Pause playback" : "Play recording"}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}
                </button>
                <button
                  id="delete-audio"
                  className={`${AudioControlStyles.audioControlBtns} ${AudioControlStyles.audioDeleteBtn}`}
                  onClick={() => setShowModal(true)}
                  aria-label="Delete recording"
                >
                  <FiTrash2 />
                </button>
                <button
                  id="send-audio"
                  className={`${AudioControlStyles.audioControlBtns} ${AudioControlStyles.audioSendBtn}`}
                  aria-label="Send recording"
                >
                  <FiSend />
                </button>
              </div>
            )}
          </div>
          {!analyser && !mediaURL && recordingState === "idle" && (
            <p className={AudioControlStyles.audioWavesVisualizer}></p>
          )}
          {recordingState === "recording" && analyser && (
            <AudioVisualizer
              analyser={analyser}
              isPlaying={false}
              mediaURL={null}
            />
          )}
          {mediaURL && (
            <AudioVisualizer mediaURL={mediaURL} isPlaying={isPlaying} />
          )}
        </section>
      </div>
      {showModal && (
        <dialog
          aria-labelledby="deleteConfirmation"
          className={AudioControlStyles.deleteDialog}
          onClick={() => setShowModal(false)}
        >
          <div className={AudioControlStyles.deleDialogContentContainer}>
            <span className={AudioControlStyles.deleteDialogHeading}>
              Delete Recording
            </span>
            <p className={AudioControlStyles.deleteDialogMsg}>
              Are you sure you want to delete this recording?
            </p>
            <div className={AudioControlStyles.dialogActionBtnsContainer}>
              <button
                onClick={() => setShowModal(false)}
                className={`${AudioControlStyles.dialogActionBtns} ${AudioControlStyles.cancelBtn}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className={`${AudioControlStyles.dialogActionBtns} ${AudioControlStyles.deleteBtn}`}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </React.Fragment>
  );
};
