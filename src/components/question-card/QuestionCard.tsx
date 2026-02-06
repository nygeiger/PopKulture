import { useState, type BaseSyntheticEvent } from "react";
import type { Question } from "../../lib/definitions";
import "./QuestionCard.css";

type CorrectAnswerType = "Answer A" | "Answer B" | "Answer C" | "Answer D";

function letterToIndex(answerLetter: CorrectAnswerType): number {
  switch (answerLetter) {
    case "Answer A":
      return 0;
    case "Answer B":
      return 1;
    case "Answer C":
      return 2;
    case "Answer D":
      return 3;
  }
}

export type QuestionCardProps = {
  question: Question;
  variant: "classic" | "challenge";
  nextQuestion: () => void;
  handleAnswerClick?: (isCorrectAnswer: boolean) => void;
};

export default function QuestionCard(props: QuestionCardProps) {
  const [correctAnserSelected, setCorrectAnserSelected] = useState(false);

  const answers = [
    props.question.AnswerA,
    props.question.AnswerB,
    props.question.AnswerC,
    props.question.AnswerD,
  ];

  const correctAnswer = letterToIndex(
    props.question.CorrectAnswer as CorrectAnswerType
  ) ?? 0;

  console.log("Correct answer is " + props.question.CorrectAnswer + " aka " + correctAnswer);

  const handleAnswerClick = (isCorrectAnswer: boolean, e: BaseSyntheticEvent) => {
    const answerChoiceButton: HTMLButtonElement = e.target;
    if (isCorrectAnswer) {
      setCorrectAnserSelected(true);
    } else {
      answerChoiceButton.className = answerChoiceButton.className + " incorrect noHover";
      answerChoiceButton.disabled = true;
    }
    if (props.handleAnswerClick) props.handleAnswerClick(isCorrectAnswer)
  };

  const getNextQuestion = () => {
    setCorrectAnserSelected(false); //?: Is this the correct way to "reload" component? Should we get a completely new instance?
    props.nextQuestion();
  }

  return (
    <div className={`questionCard ${props.variant ?? "classic"}Variant`}>
      <span className="questionSection">{props.question.Question}</span>
      {correctAnserSelected ? (
        <div className="correctAnswerDisplay">
          <span><b>{`${answers[correctAnswer].replaceAll('*', "")} `}</b><span>Correct Answer!</span></span>
          <button className="newQuesButton" onClick={() => getNextQuestion()}>Get New Question</button>
        </div>
      ) : (<div className="answerSection">
        {answers.map((e, i) => {
          const elClassName = correctAnswer === i ? "answerElement correct" : "answerElement";
          return (<button className={elClassName} key={i} onClick={(e) => handleAnswerClick(i === correctAnswer, e)}>{`${e.replaceAll("*", "")}`}</button>);
        })}
      </div>)}
    </div>
  );
}
