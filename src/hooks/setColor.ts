import { Color } from "../types/Enum"
import { ITask } from "../types/Models"

interface taskProps{
  colorIndex: number
}

export function handleColor({ colorIndex }: taskProps){
  let color = ""
  let colorContent = ''
  if(colorIndex === 0) {
    color = "bg-blue-600"
    colorContent = "bg-blue-800"
  } else if (colorIndex === 1) {
    color = "bg-green-600"
    colorContent = "bg-green-800"
  } else if (colorIndex === 2) {
    color = "bg-red-600"
    colorContent = "bg-red-800"
  } else if (colorIndex === 3) {
    color = "bg-yellow-600"
    colorContent = "bg-yellow-800"
  }
  return {color, colorContent}
}
