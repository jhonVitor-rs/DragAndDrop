import { ItemType } from './../types/Enum';
import { useRef } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { ITask, dragTask } from "../types/Models";
import { useDispatch } from 'react-redux';
import { moveTask } from '../redux/reducer';

interface dragAndDropProps{
  task: ITask
  taskIndex: number
  columnId: number
}

export function taskDragAndDrop<T extends HTMLElement>({task, taskIndex, columnId}: dragAndDropProps){
  const ref = useRef<T>(null)
  const dispatch = useDispatch()

  const [{isDragging}, dragRef] = useDrag<dragTask, void, {isDragging: boolean}>({
    item: {index: taskIndex, task: task.id, from: columnId},
    type: ItemType.TASK,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [_, dropRef] = useDrop<dragTask, void, unknown>({
    accept: ItemType.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
  
      const draggedIndex = item.index
      const targetIndex = taskIndex

      const draggedListId = item.from
      const targetListId = columnId
  
      if(draggedIndex === targetIndex && draggedListId === targetListId){
        return
      }
  
      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2
  
      const { y: mouseY } = monitor.getClientOffset() as XYCoord;
      const draggedTop = mouseY - targetSize.top
  
      if(draggedIndex < targetIndex && draggedTop < targetCenter)
        return
  
      if(draggedIndex > targetIndex && draggedTop > targetCenter)
        return
  
      const oldIndex = draggedIndex
      const oldColumnId = draggedListId
      const newIndex = taskIndex
      const newColumnId = targetListId
      const taskId = item.task
      dispatch(moveTask({
        oldIndex,
        oldColumnId,
        newIndex,
        newColumnId,
        taskId
      }))
      
      item.index = targetIndex
      item.from = targetListId
    }
  })

  dragRef(dropRef(ref))

  return {
    ref,
  }
}
