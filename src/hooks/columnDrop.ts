import { useRef } from "react"
import { ItemType } from "../types/Enum"
import { IColumn, dragTask } from "../types/Models"
import { useDrop } from "react-dnd"
import { useDispatch } from "react-redux"
import { moveTask } from "../redux/reducer"

interface columnDropProps{
  column: IColumn
  columnIndex: number
}

function columnDrop<T extends HTMLElement>({column, columnIndex}: columnDropProps){
  const dispatch = useDispatch()
  const ref = useRef<T>(null)

  const [{canDrop}, dropRef] = useDrop<dragTask, void, {canDrop: boolean}>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if(!item || item.from === column.id)
        return

      const {task, from} = item
      const oldIndex = item.index
      const oldColumnId = from
      const newIndex = column.tasks.length > 0 ? column.tasks.length : 0
      const newColumnId = column.id
      dispatch(moveTask({oldIndex, oldColumnId, newIndex, newColumnId, taskId: task}))

      item.index = newIndex
      item.from = newColumnId
    },
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop()      
    }),
  })

  dropRef(ref)

  return {
    ref,
    canDrop
  }
}

export default columnDrop
