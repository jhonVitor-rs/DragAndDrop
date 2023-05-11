import columnDrop from "../hooks/columnDrop"
import { ColumnType } from "../types/Enum"
import { IColumn } from "../types/Models"
import Task from "./Tasks"

interface ColumnProps{
  column: IColumn
  index: number
}

function Column({column, index: columnIndex}: ColumnProps) {
  const {ref} = columnDrop<HTMLDivElement>({column, columnIndex})

  const opacity = column.title === ColumnType.COMPLETED ? 'opacity-50' : ''

  return (
    <div 
      className={`bg-gray-200 ${opacity} p-4 max-w-2xl w-full m-3 text-center items-center rounded-lg flex flex-col gap-4`} 
      ref={ref}
    >
      <h2 className="text-lg font-bold mb-4 bg-gray-400 w-full text-center rounded-md">{column.title}</h2>
      {column.tasks?.map((task, index) => (
        <Task
          key={task.id}
          columnId={column.id}
          index={index}
          task={task}
        />
      ))}
    </div>
  )
}

export default Column
