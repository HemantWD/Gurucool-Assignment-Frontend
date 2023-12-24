import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className=" bg-stone-400 container mx-auto p-4 h-screen">
      <Header />
      <KanbanBoard />
    </div>
  );
}

export default App;
