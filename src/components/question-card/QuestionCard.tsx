import { useState, type BaseSyntheticEvent } from "react";
import type { Question } from "../../lib/definitions";
// import "./QuestionCard.css";
import qcStyles from "./QuestionCard.module.css"
import { IS_DEBUG } from "../../lib/utils";

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
    default:
      return 0;
  }
}

export type QuestionCardProps = {
  question: Question;
  variant: "classic" | "challenge";
  nextQuestion: () => void;
  handleAnswerClick?: (isCorrectAnswer: boolean) => void;
};

export default function QuestionCard(props: QuestionCardProps) {
  const { question, variant, nextQuestion } = props
  const [correctAnserSelected, setCorrectAnserSelected] = useState(false);

  const answers = [
    question.AnswerA,
    question.AnswerB,
    question.AnswerC,
    question.AnswerD,
  ];

  const correctAnswer = letterToIndex(
    question.CorrectAnswer as CorrectAnswerType
  );

  IS_DEBUG && console.log("Correct answer is " + question.CorrectAnswer + " aka " + correctAnswer);

  const handleAnswerClick = (isCorrectAnswer: boolean, e: BaseSyntheticEvent) => {
    const answerChoiceButton: HTMLButtonElement = e.target;
    if (isCorrectAnswer) {
      setCorrectAnserSelected(true);
    } else {
      answerChoiceButton.className = answerChoiceButton.className + " " + qcStyles.incorrect + " noHover";
      answerChoiceButton.disabled = true;
    }
    if (props.handleAnswerClick) props.handleAnswerClick(isCorrectAnswer)
  };

  const getNextQuestion = () => {
    setCorrectAnserSelected(false); //?: Is this the correct way to "reload" component? Should we get a completely new instance?
    nextQuestion();
  }

  return (
    <div className={`${qcStyles.questionCard} ${variant === "challenge" ? qcStyles.challengeVariant : qcStyles.classicVariant}`}>
      <span className={qcStyles.questionSection}>{question.Question}</span>
      {correctAnserSelected ? (
        <div className={qcStyles.correctAnswerDisplay}>
          <span><b>{`${answers[correctAnswer].replaceAll('*', "")} `}</b><span>Correct Answer!</span></span>
          <button className={qcStyles.newQuesButton} onClick={() => getNextQuestion()}>Get New Question</button>
        </div>
      ) : (<div className={qcStyles.answerSection}>
        {answers.map((e, i) => {
          const elClassName = correctAnswer === i ? `${qcStyles.answerElement} ${qcStyles.correct}` : qcStyles.answerElement;
          return (<button className={elClassName} key={i} onClick={(e) => handleAnswerClick(i === correctAnswer, e)}>{`${e.replaceAll("*", "")}`}</button>);
        })}
      </div>)}
    </div>
  );
}
