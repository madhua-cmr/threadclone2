import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isBase64Img(image:string){
  const regex=/^data:image\/(png|jpe?g|gif|webp);base64,/;
  return regex.test(image);
}
