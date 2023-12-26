import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" bg-stone-400 container mx-auto p-4 h-screen">
        <Header />
        <KanbanBoard />
        <Toaster />
      </div>
    </DndProvider>
  );
}

export default App;
