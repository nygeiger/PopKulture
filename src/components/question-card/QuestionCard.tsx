import { useState, type BaseSyntheticEvent } from "react";
import type { Question } from "../../lib/definitions";
import "./QuestionCard.css";
import { QUESTIONS_INITIAL_POINTS, WRONG_ANSWER_PENALTY } from "../../lib/utils";

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

type QuestionCardProps = {
  question: Question;
  nextQuestion: () => void;
  addTeamPoints: (addPoints: number) => void;
  incrementCurrTeam: () => void;
};

export default function QuestionCard(props: QuestionCardProps) {
  const [correctAnserSelected, setCorrectAnserSelected] = useState(false);
  const [answerAward, setAnswerAward] = useState(QUESTIONS_INITIAL_POINTS);

  const answers = [
    props.question.AnswerA,
    props.question.AnswerB,
    props.question.AnswerC,
    props.question.AnswerD,
  ];

  const correctAnswer = letterToIndex(
    props.question.CorrectAnswer as CorrectAnswerType
  );

  // console.log("Correct answer is " + props.question.CorrectAnswer + " aka " + correctAnswer);

  const handleAnswerClick = (selectedAnswer: number, e: BaseSyntheticEvent) => {
    const answerChoiceButton: HTMLButtonElement = e.target;
    if (selectedAnswer === correctAnswer) {
      props.addTeamPoints(answerAward)
      setCorrectAnserSelected(true);
    } else {
      answerChoiceButton.className = answerChoiceButton.className + " incorrect";
      answerChoiceButton.disabled = true;
      setAnswerAward(answerAward - WRONG_ANSWER_PENALTY);
    }
  };

  const getNextQuestion = () => {
    setCorrectAnserSelected(false); //TODO: Is this the correct way to "reload" component? Should we get a completely new instance?
    setAnswerAward(QUESTIONS_INITIAL_POINTS)
    props.nextQuestion();
    props.incrementCurrTeam();
  }

  return (
    <div className="questionCard">
      <span className="questionSection">{props.question.Question}</span>
      {correctAnserSelected ? (
        <div className="correctAnswerDisplay">
          <span>{`${answers[correctAnswer]} Correct Answer !`}</span>
          <div className="qCardEarnedPoints">{`+${answerAward} points`}</div>
          <button className="newQuesButton" onClick={() => getNextQuestion()}>Get New Question</button>
        </div>
      ) : (<div className="answerSection">
        {answers.map((e, i) => {
          const elClassName = correctAnswer === i ? "answerElement correct" : "answerElement";
          return (<button className={elClassName} key={i} onClick={(e) => handleAnswerClick(i, e)}>{`${e.replaceAll("*", "")}`}</button>);
        })}
      </div>)}
    </div>
  );
}
