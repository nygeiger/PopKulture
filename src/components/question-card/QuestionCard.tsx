import { useState } from "react";
import type { Question } from "../../lib/definitions";
import "./QuestionCard.css";

type QuestionCardProps = {
  question: Question;
  nextQuestion: () => void;
};

type CorrectAnswerType = "AnswerA" | "AnswerB" | "AnswerC" | "AnswerD";

function letterToIndex(answerLetter: CorrectAnswerType): number {
  switch (answerLetter) {
    case "AnswerA":
      return 0;
    case "AnswerB":
      return 1;
    case "AnswerC":
      return 2;
    case "AnswerD":
      return 3;
  }
}

export default function QuestionCard(props: QuestionCardProps) {
  const [correctAnserSelected, setCorrectAnserSelected] = useState(false);
  console.log(JSON.stringify(props))
  const answers = [
    props.question.AnswerA,
    props.question.AnswerB,
    props.question.AnswerC,
    props.question.AnswerD,
  ];
  const correctAnswer = letterToIndex(
    props.question.CorrectAnswer as CorrectAnswerType
  );
  console.log(
    "Correct answer is " +
      props.question.CorrectAnswer +
      " aka " +
      correctAnswer
  );

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === correctAnswer) {
      setCorrectAnserSelected(true);
    } else {
      console.log("Incorrect Answer Selected :(");
    }
  };

  const getNextQuestion = () => {
    setCorrectAnserSelected(false); //TODO: Is this the correct way to "reload" component or should we get a completely new instance
    props.nextQuestion();

  }

  const tempVari = props.question.AnswerA;
  return (
    <div className="questionCard">
      <span className="questionSection">{props.question.Question}</span>
        {/* <button className="answerElement answerA">answerA</button>
        <button className="answerElement answerB">answerB</button>
        <button className="answerElement answerC">answerC</button>
        <button className="answerElement answerD">answerD</button> */}
        {correctAnserSelected ? (
          <div className="correctAnswerDisplay">
          <span>{`${answers[correctAnswer]} Correct Answer !`}</span>
          <button className="newQuesButton" onClick={() => getNextQuestion()}>Get New Question</button>
          </div>
        ) : (<div className="answerSection">
          {answers.map((e, i) => {
            const elClassName = correctAnswer === i ? "answerElement" : "answerElement correct";
            return (<button className={elClassName} key={i} onClick={() => handleAnswerClick(i)}>{`${e}${correctAnswer === i ? "correct answer" : ""}`}</button>);
          })}
        </div>)}
    </div>
  );
}
