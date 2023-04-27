import { FC, useState } from "react";
import { ITask } from "../types/Models";
import Modal from "react-modal"
import { handleColor } from "../hooks/setColor";

Modal.setAppElement('#root');

interface ModalProps{
  task?: ITask
  onSubmit: (task: ITask) => void
  isOpen: boolean
  onClose: () => void
}

export const MyModal: FC<ModalProps> = ({ task, onSubmit, isOpen, onClose }) => {
  const [id, setId] = useState(task?.id || Math.floor(Math.random() * 1000))
  const [title, setTitle] = useState(task?.title || '')
  const [content, setContent] = useState(task?.content || '')
  const [bgColor, setBgColor] = useState(task?.color || 0)

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBgColor(Number(e.target.value));
    console.log(bgColor)
  }
  const {color} = handleColor({colorIndex: bgColor})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask: ITask = {id, title, content, color: bgColor}
    onSubmit?.(newTask)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      className="bg-gray-900 max-w-2xl m-auto mt-20 rounded"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-gray-900 p-4 flex flex-col gap-4 rounded">
        <div className="w-full bg-slate-200 p-4 rounded flex flex-col gap-2">
          <div> 
            <label htmlFor="title" className="text-xl mr-2 font-bold text-gray-900">Tittulo: </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded bg-slate-400 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-xl mr-2 font-bold text-gray-900">Descrição: </label>
            <input
              type="text" 
              name="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="rounded bg-slate-400 p-1"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-full bg-slate-200 p-4 rounded max-w-xs flex mr-3 gap-2">
            <label htmlFor="color">Cor: </label>
            <select 
              name="color" 
              value={bgColor} 
              onChange={handleColorChange}
              className={`w-full p-1 rounded ${color}`}
            >
              <option value={0} className="bg-blue-600"></option>
              <option value={1} className="bg-green-600"></option>
              <option value={2} className="bg-red-600"></option>
              <option value={3} className="bg-yellow-600"></option>
            </select>
          </div>
          <button 
            type="submit" 
            className="bg-amber-400 text-gray-900 p-2 text-2xl font-semibold hover:bg-amber-600 rounded"
          >
            Enviar
          </button>
        </div>
      </form>
    </Modal>
  )
}
