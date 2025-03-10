import Game from "./components/Game";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Game />
    </div>
  );
}
