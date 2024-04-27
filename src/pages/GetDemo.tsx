import React, { useState } from "react";
import GetDemoStyles from "@/styles/pages/getDemo.module.css";
import { AudioControl } from "@/components/audio";
import { ICurrentFormProperties, IFormControlErrors } from "@/interfaces/form";
import { PurpleButton } from "@/components/ui";

export const GetDemo: React.FC = (): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [controlErrors, setControlErrors] = useState<IFormControlErrors>(
    {} as IFormControlErrors
  );
  const [transcript, setTranscript] = useState<string>("");
  const [aiAudio, setAiAudio] = useState<HTMLAudioElement | null>(null);

  const validateContent = (content: string): boolean => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setControlErrors((prev) => ({
        ...prev,
        content: { message: "Content is required." },
      }));
      return false;
    }

    if (trimmedContent.length < 10) {
      setControlErrors((prev) => ({
        ...prev,
        content: { message: "Content must be atleast 10 characters long." },
      }));
      return false;
    }

    setControlErrors((prev) => {
      if (prev.content) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content, ...rest } = prev;
        return rest;
      }

      return prev;
    });

    return true;
  };

  const validateTutor = (tutor: string): boolean => {
    const trimmedTutor = tutor.trim();

    if (!trimmedTutor) {
      setControlErrors((prev) => ({
        ...prev,
        tutor: { message: "Tutor is required." },
      }));
      return false;
    }

    setControlErrors((prev) => {
      if (prev.tutor) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { tutor, ...rest } = prev;
        return rest;
      }

      return prev;
    });

    return true;
  };

  const validateForm = (content: string, tutor: string): boolean => {
    const isValidContent = validateContent(content);
    const isValidTutor = validateTutor(tutor);

    return isValidContent && isValidTutor;
  };

  const getAudioFile = async (content: string, tutor: string) => {
    const response = await fetch("http://localhost:8080/api/startTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        tutor,
      }),
    });

    const wavFile = await response.blob();
    const audioURL = URL.createObjectURL(wavFile);

    const audio = new Audio(audioURL);
    return audio;
  };

  const getTranscript = async () => {
    const response = await fetch("http://localhost:8080/api/tutorTranscript", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    return data;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentForm = event.currentTarget as typeof event.currentTarget &
      ICurrentFormProperties;

    const content = currentForm.content.value;
    const tutor = currentForm.tutor.value;

    const isValid = validateForm(content, tutor);
    if (!isValid) return;

    try {
      const audio = await getAudioFile(content, tutor);
      const transcript = await getTranscript();

      console.log(transcript);
      setTranscript(transcript);
      setAiAudio(audio);

      currentForm.reset();
      setControlErrors({} as IFormControlErrors);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={GetDemoStyles.getDemoMain}>
      {formSubmitted ? (
        <AudioControl
          aiAudio={aiAudio}
          transcript={transcript}
          setAiAudio={setAiAudio}
          setTranscript={setTranscript}
        />
      ) : (
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
          className={GetDemoStyles.formBody}
        >
          <div className={GetDemoStyles.formControlContainer}>
            <label htmlFor="content" className={GetDemoStyles.formControlLabel}>
              Enter Content
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Enter content..."
              required
              className={`${GetDemoStyles.formControl} ${
                controlErrors.content && GetDemoStyles.controlError
              }`}
              onInput={(event) => validateContent(event.currentTarget.value)}
            />
            {controlErrors.content && (
              <p className={GetDemoStyles.controlErrorMsg}>
                {controlErrors.content.message}
              </p>
            )}
          </div>
          <div className={GetDemoStyles.formControlContainer}>
            <label htmlFor="content" className={GetDemoStyles.formControlLabel}>
              Enter Tutor Type
            </label>
            <input
              type="text"
              name="tutor"
              id="tutor"
              placeholder="Enter Tutor Type"
              required
              className={`${GetDemoStyles.formControl} ${
                controlErrors.tutor && GetDemoStyles.controlError
              }`}
              onInput={(event) => validateTutor(event.currentTarget.value)}
            />
            {controlErrors.tutor && (
              <p className={GetDemoStyles.controlErrorMsg}>
                {controlErrors.tutor.message}
              </p>
            )}
          </div>
          <PurpleButton type="submit" className={GetDemoStyles.formSubmitBtn}>
            Submit
          </PurpleButton>
        </form>
      )}
    </main>
  );
};
