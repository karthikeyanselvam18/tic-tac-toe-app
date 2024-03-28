import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
export default function App() {
  return (
    <div className="container">
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}
