import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css';
interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries,updateEntry } = useContext(EntriesContext);
  const {isDragging,endDragging}=useContext(UIContext)
  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])
  // console.log(entriesByStatus)

  const onDropEntry=(event:DragEvent<HTMLElement>)=>{
    // console.log(event)
    const entryId = event.dataTransfer.getData('text/plain');
    // console.log(entryId)
    const entry = entries.find(entry => entry._id === entryId)!;
    // entry.status=status;
    updateEntry({...entry,status})
    // {
    //     ...entry,
    //     status:status,
    // }
    console.log('ondrop')
    endDragging();
  }

  const allowDrop=(event:DragEvent<HTMLElement>)=>{
    event.preventDefault()
  }

  return (
    //   todo aqui haremos drop
    <div 
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '1px 5px',
        overflowX:'hidden'
      }}>
        <List sx={{ opacity: isDragging? 0.3 : 1,transition:'all .3s' }}>
          {
            entriesByStatus.map(entry =>
              <EntryCard key={entry._id} entry={entry} />
            )
          }
        </List>
      </Paper>
    </div>
  )
}
