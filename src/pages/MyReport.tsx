import { Loader } from "@/components/common";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type TGradesCategory =
  | "understandingAndClarity"
  | "useOfRelevantTerms"
  | "relevanceOfResponse"
  | "engagementAndThoughtfulness";

interface IGradedAnalysisResponse {
  analysis: string;
  grade: number;
}

interface IReportResponseData {
  questionId: number;
  questionText: string;
  responseText: string;
  grades: Record<TGradesCategory, IGradedAnalysisResponse>;
  feedback: string;
}

const gradesCategoriesValues: Record<TGradesCategory, string> = {
  understandingAndClarity: "Understanding and Clarity",
  useOfRelevantTerms: "Use of Relevant Terms",
  relevanceOfResponse: "Relevance of Response",
  engagementAndThoughtfulness: "Engagement and Thoughtfulness",
};

export const MyReport: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Array<IReportResponseData>>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setIsSubmitting(true);
    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/gradingReport");

        if (!response.ok) {
          navigate("/get-demo");
          return;
        }

        const data = await response.json();
        setResponses(data.responses);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };

    fetchReport();
  }, [navigate]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isSubmitting && <Loader />}
      {responses.map((response) => (
        <div
          key={`report-response-${response.questionId}`}
          style={{
            background: "rgb(239, 237, 252)",
            borderRadius: "0.5rem",
            padding: "1.5rem 2rem",
            margin: "1rem",
            maxWidth: "50rem",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
              color: "#2b2d2f",
            }}
          >
            Q{response.questionId}. {response.questionText}
          </h2>
          <p style={{ marginTop: "1rem" }}>{response.responseText}</p>
          <p
            style={{
              width: "100%",
              background: "#bcbcbc",
              height: "1px",
              margin: "1.5rem 0",
            }}
          ></p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {Object.entries(response.grades).map(
              ([category, { analysis, grade }]) => (
                <div
                  key={`response-${response.questionId}--analysis-${category}`}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.35rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        color: "#2b2d2f",
                      }}
                    >
                      {gradesCategoriesValues[category as TGradesCategory]}
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#806af6",
                      }}
                    >
                      Grade: {grade}
                    </span>
                  </div>
                  <p
                    style={{
                      marginBottom: "0.25rem",
                      color: "#2b2d2f",
                      fontSize: "0.95rem",
                    }}
                  >
                    {analysis}
                  </p>
                </div>
              )
            )}
          </div>
          <p
            style={{
              width: "100%",
              background: "#bcbcbc",
              height: "1px",
              margin: "1.5rem 0",
            }}
          ></p>
          <span
            style={{
              fontSize: "1.125rem",
              color: "#2b2d2f",
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            Feedback
          </span>
          <p style={{ fontStyle: "italic" }}>{response.feedback}</p>
        </div>
      ))}
    </section>
  );
};
