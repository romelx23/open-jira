import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, EntriesReducer } from '.'
import { Entry } from '../../interfaces/entry';

export interface EntriesState {
    entries:Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
    entries:[
        {
            _id:uuidv4(),
            description:'Pendiente: lorem10asfdsfds fdsfdsf',
            status:'pending',
            createAt:Date.now(),
        },
        {
            _id:uuidv4(),
            description:'En Progreso: lorem10asfdsfds fdsfdsf',
            status:'in-progress',
            createAt:Date.now()-100000,
        },
        {
            _id:uuidv4(),
            description:'Terminadas: lorem10asfdsfds fdsfdsf',
            status:'finished',
            createAt:Date.now()-100000000,
        },
    ]
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE)

  const addNewEntry=(description:string)=>{
    const newEntry:Entry={
      _id: uuidv4(),
      description,
      createAt: Date.now(),
      status: 'pending'
    }
    dispatch({type:'[Entry] - Add-Entry',payload:newEntry})
  }

  const updateEntry=(entry:Entry)=>{
    dispatch({type:'[Entry] - Entry-Updated',payload:entry})
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // Methods
        addNewEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
