import "./GameBoard.css"

interface GameboardProps {
    gameboardText: string
}

export default function GameBoard(props: GameboardProps) {
    return (
    <div className={`gameBoard`}>
    {props.gameboardText}
    </div>
    )
}