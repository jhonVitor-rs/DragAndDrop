import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useDispatch, useSelector } from "react-redux"
import { AppReducer, addTask } from "./redux/reducer"
import Column from "./components/Column"
import { MdAdd } from "react-icons/md"
import { useState } from "react"
import { MyModal } from "./components/Modal"
import { ITask } from "./types/Models"

function App() {
  const columns = useSelector(AppReducer)
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (task: ITask) => {
    dispatch(addTask({task}))
  }

  return (
    <body className="bg-gray-900 min-h-screen p-0">
      {isModalOpen && (
        <MyModal
          onSubmit={handleFormSubmit}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Drag and Drop</h1>
        <button
          className="bg-amber-400 text-gray-800 p-2 rounded hover:bg-amber-600"
          onClick={handleOpenModal}
        >
          <MdAdd/>
        </button>
      </header>
      <div className="flex justify-between p-4">
        {columns.map((column, index) => (
          <Column
            key={column.id}
            index={index}
            column={column}
          />
        ))}
      </div>
    </body>
  )
}

export default App
