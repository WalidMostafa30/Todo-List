import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./store/store";
import EditTaskModal from "./components/EditTaskModal/EditTaskModal";
import Home from "./pages/Home/Home";

function App() {
  const { editForm } = useAppSelector((state) => state.todo);

  return (
    <main>
      <Toaster />
      <Home />
      {editForm.status && <EditTaskModal />}
    </main>
  );
}

export default App;
