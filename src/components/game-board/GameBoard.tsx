import { getDefaultCategories } from "../../lib/actions";
import Category from "../category/Categories";
import "./GameBoard.css";

interface GameboardProps {
  gameboardText: string;
}

export default function GameBoard(props: GameboardProps) {
    const questions = getDefaultCategories();
    console.log("Defualt Questions -->\n" + questions.toString());
  return <div className={`gameBoard`}>{questions.map((e, i) => <Category key={i} title={e}/>)}</div>;
}
