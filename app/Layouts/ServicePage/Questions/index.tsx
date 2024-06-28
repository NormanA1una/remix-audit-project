import "./stye.css";

import Title from "~/components/Typography/Title";
import H6Styling from "~/components/Typography/H6";
import Button from "~/components/Button";
import Paragraph from "~/components/Typography/Paragraph";
import { useState } from "react";

const frequentlyAskedData = [
  {
    button: "Lorem ipsum 1?",
    question:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    button: "Lorem ipsum 2?",
    question:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    button: "Lorem ipsum 3?",
    question:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
  {
    button: "Lorem ipsum 4?",
    question:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  },
];

const FrequentQuestions = ({
  dataStrapi,
}: {
  dataStrapi: FrequentlyQuestionList;
}) => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );

  const toggleQuestion = (index: number) => {
    if (openQuestionIndex === index) {
      setOpenQuestionIndex(null);
    } else {
      setOpenQuestionIndex(index);
    }
  };

  return (
    <div className="questions-principal-div-container">
      <div className="principal-div-text-questions">
        <Title style={{ textAlign: "center", color: "#000000" }}>
          {dataStrapi
            ? dataStrapi.FrequentlyHeader.Title
            : "Frequently asked questions"}
        </Title>
      </div>

      <div>
        {dataStrapi
          ? dataStrapi.Question.map((question, i) => {
              const isOpen = openQuestionIndex === i;

              return (
                <div key={i}>
                  <div
                    className={`container-question-box ${
                      isOpen ? "dynamic-gap-open" : "dynamic-gap-closed"
                    }`}
                  >
                    <div
                      className={`question-container-icon ${
                        isOpen ? "question-container-icon-open" : null
                      }`}
                    >
                      <div className="relative h-full">
                        <div className="line-horizontal-static"></div>
                        <div
                          className={`line-vertical-inactive ${
                            isOpen ? "line-vertical-active" : null
                          }`}
                        ></div>
                      </div>
                    </div>

                    <H6Styling variant="primary">
                      <Button
                        variant="question"
                        className="question-button-custom"
                        onClick={() => toggleQuestion(i)}
                      >
                        <div className="spacing-content-question">
                          {question.QuestionButton.Title}
                        </div>
                      </Button>
                    </H6Styling>

                    <div
                      className={`content-question ${
                        isOpen ? "question-open" : null
                      }`}
                    >
                      <div>
                        <Paragraph style={{ color: "#475467" }}>
                          {question.Content}
                        </Paragraph>
                      </div>
                    </div>
                  </div>

                  <hr
                    className={`separator-questions ${
                      i === frequentlyAskedData.length - 1 ? "invisible" : null
                    }`}
                  />
                </div>
              );
            })
          : frequentlyAskedData.map((question, i) => {
              const isOpen = openQuestionIndex === i;

              return (
                <div key={i}>
                  <div
                    className={`container-question-box ${
                      isOpen ? "dynamic-gap-open" : "dynamic-gap-closed"
                    }`}
                  >
                    <div
                      className={`question-container-icon ${
                        isOpen ? "question-container-icon-open" : null
                      }`}
                    >
                      <div className="relative h-full">
                        <div className="line-horizontal-static"></div>
                        <div
                          className={`line-vertical-inactive ${
                            isOpen ? "line-vertical-active" : null
                          }`}
                        ></div>
                      </div>
                    </div>

                    <H6Styling variant="primary">
                      <Button
                        variant="question"
                        className="question-button-custom"
                        onClick={() => toggleQuestion(i)}
                      >
                        {question.button}
                      </Button>
                    </H6Styling>

                    <div
                      className={`content-question ${
                        isOpen ? "question-open" : null
                      }`}
                    >
                      <div>
                        <Paragraph style={{ color: "#475467" }}>
                          {question.question}
                        </Paragraph>
                      </div>
                    </div>
                  </div>

                  <hr
                    className={`separator-questions ${
                      i === frequentlyAskedData.length - 1 ? "invisible" : null
                    }`}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default FrequentQuestions;
