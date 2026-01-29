import { getDefaultCategories } from "../../lib/actions";
import type { Question } from "../../lib/definitions";
import Category from "../category/Categories";
import "./GameBoard.css";

interface GameboardProps {
  gameboardText: string;
  questions: Question[] | null;
}

export default function GameBoard(props: GameboardProps) {
  const questions = getDefaultCategories();
  if (props.questions) {
    questions.push(...props.questions.map((e) => e.Question));
  }
  // console.log("Default Questions -->\n" + questions.toString());
  return (
    <div className="gameBoard">
      {questions.map((e, i) => (
        <Category key={i} title={e}/>
      ))}
    </div>
  );
}
