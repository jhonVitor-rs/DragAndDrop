import { MdDelete, MdEdit } from "react-icons/md"
import { useDispatch } from "react-redux";
import { ITask } from "../types/Models";
import { handleColor } from "../hooks/setColor";
import { deleteTask, editTask } from "../redux/reducer";
import { useState } from "react";
import { MyModal } from "./Modal";
import { taskDragAndDrop } from "../hooks/taskDragAndDrop";

interface TaskProps {
  task: ITask
  index: number
  columnId: number
}

function Task({task, index, columnId}: TaskProps) {
  const dispatch = useDispatch()

  const {ref} = taskDragAndDrop<HTMLDivElement>({
    task,
    taskIndex: index,
    columnId
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  const colorIndex = task.color
  const {color, colorContent} = handleColor({colorIndex})

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (task: ITask) => {
    dispatch(editTask({columnId, task}))
  }

  const handleDelete = () => {
    dispatch(deleteTask({columnId, task}))
  }

  return (
    <>
      {isModalOpen && (
        <MyModal
          task={task}
          onSubmit={handleFormSubmit}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className={`${color} w-full px-4 py-2 rounded-lg cursor-grab relative `} ref={ref}>
        <h2 className="text-1xl font-bold mb-2">{task.title}</h2>
        <button 
          type="button" 
          className={`${colorContent} absolute top-2 right-10 border border-black p-1 rounded hover:opacity-70`}
          onClick={handleOpenModal}
        >
          <MdEdit/>
        </button>
        <button 
          type="button" 
          className={`${colorContent} absolute top-2 right-2 border border-black p-1 rounded hover:opacity-70`}
          onClick={handleDelete}
        >
          <MdDelete/>
        </button>
        <div className={`${colorContent} px-2 py-1 rounded text-white font-bold text-xs text-left`}>
          {task.content}
        </div>
      </div>
    </>
  );
}

export default Task;
