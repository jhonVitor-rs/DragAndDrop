import { Color, ColumnType } from "./Enum"

export interface ITask {
  id: number,
  title: string,
  content: string,
  color: Color,
  createdAt?: string,
}

export interface IColumn{
  id: number
  title: ColumnType
  tasks: ITask[] | []
}

export interface dragTask{
  index: number
  task: ITask['id']
  from: IColumn['id']
}
