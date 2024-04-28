import React, { useState, useEffect } from "react";
import AudioControlStyles from "@/styles/components/audio/audioControl.module.css";
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
  const [data, setData] = useState<ResponseData[]>();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/gradingReport");

        if (!response.ok) {
          navigate("/get-demo");
          return;
        }

        const data = (await response.json()) as ResponseData[];
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReport();
  }, [navigate]);

  return (
    <>
      <section className={AudioControlStyles.reportContainer}>
        {data?.map((response, index) => (
          <div className={AudioControlStyles.reportCard} key={index}>
            <h2 className={AudioControlStyles.question}>
              {response.questionText}
            </h2>
            <p className={AudioControlStyles.responseText}>
              {response.responseText}
            </p>
            <div className={AudioControlStyles.grades}>
              {Object.entries(response.grades).map(
                ([category, { analysis, grade }], idx) => (
                  <div className={AudioControlStyles.gradeItem} key={idx}>
                    <h3 className={AudioControlStyles.gradeCategory}>
                      {category}
                    </h3>
                    <p className={AudioControlStyles.gradeAnalysis}>
                      {analysis}
                    </p>
                    <p
                      className={AudioControlStyles.grade}
                    >{`Grade: ${grade}`}</p>
                  </div>
                )
              )}
            </div>
            <p className={AudioControlStyles.feedback}>{response.feedback}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default MyReport;
