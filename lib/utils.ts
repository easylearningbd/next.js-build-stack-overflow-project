import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techMap[normalizedTechName]
  ? `${techMap[normalizedTechName]} colored`
  : "devicon-devicon-plain";
}
