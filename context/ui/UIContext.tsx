import { createContext } from "react";

interface ContextProps{
    sidemenuOpen:boolean;
    isAdding:boolean;
    openSideMenu:()=>void;
    closeSideMenu:()=>void;
    setIsAddingEntry:(isAdding:boolean)=>void;
    isDragging:boolean;
    startDragging:()=>void;
    endDragging:()=>void;
}

export const UIContext=createContext({} as ContextProps)
