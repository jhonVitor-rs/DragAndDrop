import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColumn, ITask } from "../types/Models";
import { RootState } from "./store";
import { ColumnType } from "../types/Enum";
import { Color } from "../types/Enum";

//--------------------------------- COLUMNS ----------------------------//
const initialState: IColumn[] = 
  [
    {
      id: 1,
      title: ColumnType.TO_DO,
      tasks: [
        {
          id: 1,
          title: "ReactDnD",
          content: "Terminar o React Dnd.",
          color: Color.BLUE
        },
        {
          id: 2,
          title: "Reunião",
          content: "Reunião com o time de desenvolvimento para discutir o cronograma do projeto.",
          color: Color.RED
        }
      ]
    },
    {
      id: 2,
      title: ColumnType.IN_PROGRESS,
      tasks: [
        {
          id: 3,
          title: "Pesquisa",
          content: "Fazer pesquisa de mercado para identificar os concorrentes.",
          color: Color.RED
        }
      ]
    },
    {
      id: 3,
      title: ColumnType.BLOCKED,
      tasks: []
    },
    {
      id: 4,
      title: ColumnType.COMPLETED,
      tasks: []
    }
  ]

//---------------------------- CRIANDO O REDUCER -----------------------------//
const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //incluir task
    addTask: (state, action: PayloadAction<{task: ITask}>) => {
      const {task} = action.payload
      const column = state.findIndex((col) => col.title === ColumnType.TO_DO)
      if (column !== -1) {
        const tasks = state[column].tasks as ITask[]
        tasks.push(task)
      }
    },
    editTask: (state, action: PayloadAction<{columnId: number, task: ITask}>) => {
      const {columnId, task} = action.payload
      const column = state.findIndex((col) => col.id === columnId)
      if(column !== -1){
        const taskIndex = state[column].tasks.findIndex((t) => t.id === task.id)
        if(taskIndex !== -1){
          state[column].tasks[taskIndex] = {...task}
        }else{
          throw new Error(`Task with ID ${task.id} not found`);
        }
      }else{
        throw new Error(`Column with ID ${columnId} not found`);
      }
    },
    deleteTask: (state, action: PayloadAction<{columnId: number, task: ITask}>) => {
      const {columnId, task} = action.payload
      const column = state.findIndex((col) => col.id === columnId)
      if(column !== -1){
        const taskIndex = state[column].tasks.findIndex((t) => t.id === task.id)
        if(taskIndex !== -1){
          state[column].tasks.splice(taskIndex, 1)
        }else{
          throw new Error(`Task with ID ${task.id} not found`);
        }
      }else{
        throw new Error(`Column with ID ${columnId} not found`);
      }
    },
    moveTask: (state, action: PayloadAction<{
      oldIndex: number, oldColumnId: number, 
      newIndex: number, newColumnId: number, taskId: number}>) => {
        const {oldIndex, oldColumnId, newIndex, newColumnId, taskId} = action.payload
        const oldColumn = state.find((col) => col.id === oldColumnId)
        const newColumn = state.find((col) => col.id === newColumnId)
        if(oldColumn !== undefined && newColumn !== undefined){
          const task = oldColumn.tasks.find((t) => t.id === taskId) as ITask
          if(oldIndex !== -1 && newIndex !== -1){
            oldColumn.tasks.splice(oldIndex, 1)
            newColumn.tasks.splice(newIndex, 0 , task)
          }
        }else{
          throw new Error(`Column with ID ${oldColumn} and ${newColumn} not found`);

        }
      }
  }
})
    
//----------------------------- EXPORTANDO AS FUNÇOES ------------------------//

export const { addTask, editTask, deleteTask, moveTask } = AppSlice.actions
export const reducer = AppSlice.reducer

export const AppReducer = (state: RootState) => {
  return state.reducer
}
