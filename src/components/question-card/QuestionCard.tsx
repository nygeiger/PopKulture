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
  nextQuestion: () => void;
  // addTeamPoints: (addPoints: number) => void;
  // incrementCurrTeam: () => void;
  // type: string;
  handleAnswerClick?: (isCorrectAnswer: boolean) => void;
  // getNextQuestion?: () => void;

};

export default function QuestionCard(props: QuestionCardProps) {
  const [correctAnserSelected, setCorrectAnserSelected] = useState(false);
  // const [answerAward, setAnswerAward] = useState(QUESTIONS_INITIAL_POINTS);

  const answers = [
    props.question.AnswerA,
    props.question.AnswerB,
    props.question.AnswerC,
    props.question.AnswerD,
  ];

  const correctAnswer = letterToIndex(
    props.question.CorrectAnswer as CorrectAnswerType
  );

  console.log("Correct answer is " + props.question.CorrectAnswer + " aka " + correctAnswer);

  const handleAnswerClick = (isCorrectAnswer: boolean, e: BaseSyntheticEvent) => {
    const answerChoiceButton: HTMLButtonElement = e.target;
    if (isCorrectAnswer) {
      // props.addTeamPoints(answerAward)
      setCorrectAnserSelected(true);
    } else {
      answerChoiceButton.className = answerChoiceButton.className + " incorrect";
      answerChoiceButton.disabled = true;
      // setAnswerAward(answerAward - WRONG_ANSWER_PENALTY);
    }
    if (props.handleAnswerClick) props.handleAnswerClick(isCorrectAnswer)
  };

  const getNextQuestion = () => {
    setCorrectAnserSelected(false); //TODO: Is this the correct way to "reload" component? Should we get a completely new instance?
    props.nextQuestion();
  }

  return (
    <div className="questionCard">
      <span className="questionSection">{props.question.Question}</span>
      {correctAnserSelected ? (
        <div className="correctAnswerDisplay">
          <span>{`${answers[correctAnswer]} Correct Answer !`}</span>
          {/* {props.type === "classicMode" && <div className="qCardEarnedPoints">{`+${answerAward} points`}</div>} */}
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
