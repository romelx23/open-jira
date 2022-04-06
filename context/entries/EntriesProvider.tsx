import { FC, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, EntriesReducer } from '.'
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces/entry';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    // const newEntry:Entry={
    //   _id: uuidv4(),
    //   description,
    //   createAt: Date.now(),
    //   status: 'pending'
    // }

    const { data } = await entriesApi.post<Entry>('/entries', { description })

    dispatch({ type: '[Entry] - Add-Entry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry,showSnackbar=false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entry] - Entry-Updated', payload: data })
      if(showSnackbar){
        enqueueSnackbar('Entrada actualizada',
          {
            variant: 'success',
            autoHideDuration:1500,
            anchorOrigin:{
              vertical:'top',
              horizontal:'right'
            }
          })
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] - Refresh-Data', payload: data })
  }

  useEffect(() => {
    refreshEntries();
  }, [])


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
