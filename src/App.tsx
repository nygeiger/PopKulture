// import "./App.css";
import "./Global.css"
import GameEngine from "./components/game-engine/GameEngine";

function App() {
  // ************** General Note taking ************** //
  // ?: Add leaderboard?

  // ?: theming? check here for color scheming --> https://www.yahoo.com/news/why-traditional-black-history-month-222436126.html
  // *********************** *************************** //

  return (
    <div className="App">
      {/* <GameBoard gameboardText="GB TEXT" /> */}
      <GameEngine />
    </div>
  );
}

export default App;
