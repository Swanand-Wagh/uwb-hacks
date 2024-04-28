import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ResponseData {
  questionId: number;
  questionText: string;
  responseText: string;
  grades: {
    [category: string]: {
      analysis: string;
      grade: number;
    };
  };
  feedback: string;
}

const MyReport: React.FC = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<ResponseData[]>([]);

  useEffect(() => {
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
      }
    };

    fetchReport();
  }, [navigate]);

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {responses.map((response, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "16px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
              {response.questionText}
            </h2>
            <p style={{ marginBottom: "12px" }}>{response.responseText}</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {Object.entries(response.grades).map(
                ([category, { analysis, grade }], idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "8px",
                      margin: "4px",
                      minWidth: "200px",
                      display: "inline-block",
                    }}
                  >
                    <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
                      {category}
                    </h3>
                    <p style={{ marginBottom: "4px" }}>{analysis}</p>
                    <p style={{ marginBottom: "4px" }}>Grade: {grade}</p>
                  </div>
                )
              )}
            </div>
            <p style={{ fontStyle: "italic" }}>{response.feedback}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default MyReport;
