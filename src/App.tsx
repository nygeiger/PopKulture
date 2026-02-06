import "./Global.css"
import GameEngine from "./components/game-engine/GameEngine";

function App() {
  // ************** General Note taking ************** //
  // ?: Add leaderboard?

  // ?: theming? check here for color scheming --> https://www.yahoo.com/news/why-traditional-black-history-month-222436126.html
  // ?------  color scheme tool --> https://paletton.com/#uid=73i0u0kqLqMgfyilasJsIlbyfgg

  // TODO: Design question by category fetching.
  // TODO----   Most likely configure database api to take in parameter and return questions by category

  //TODO: Add pagination to get call to prevent too many questions being returned
  // *********************** *************************** //

  return (
    <div className="App">
      <GameEngine />
    </div>
  );
}

export default App;
