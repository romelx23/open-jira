import React, { FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';

interface Props{
    entry:Entry;
}

export const EntryCard:FC<Props> = ({entry}) => {

    const {startDragging,endDragging}=useContext(UIContext)

    const onDragStart = (event:React.DragEvent<HTMLDivElement>) => {
        console.log(event)
        // todo hacer el draggable
        event.dataTransfer.setData('text/plain', entry._id)
        startDragging();
    }
    const onDragEnd=()=>{
        console.log('drag end')
        endDragging();
    }

    return (
        <Card
            sx={{ marginTop: 1 }}
        // Eventor de drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{display:'flex',justifyContent:'end',paddingRight:2}}>
                    <Typography variant='body2'>Hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
