import type { Question } from "../../lib/definitions";
import "./QuestionCard.css";

type QuestionCardProps = {
  question: Question;
};

export default function QuestionCard(props: QuestionCardProps) {
  return (
    <div className="questionCard">
      <span className="questionSection">{props.question.Question}</span>
      <div className="answerSection">
        <span className="answerElement answerA">answerA</span>
        <span className="answerElement answerB">answerB</span>
        <span className="answerElement answerC">answerC</span>
        <span className="answerElement answerD">answerD</span>
      </div>
    </div>
  );
}
