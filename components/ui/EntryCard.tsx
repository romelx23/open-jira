import React, { FC, useContext, useRef } from 'react'
import { Box, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props{
    entry:Entry;
}

export const EntryCard:FC<Props> = ({entry}) => {
    const router=useRouter();
    const badge = useRef<HTMLDivElement>(null);

    const {startDragging,endDragging}=useContext(UIContext)

    const onDragStart = (event:React.DragEvent<HTMLDivElement>) => {
        // console.log(event)
        // todo hacer el draggable
        event.dataTransfer.setData('text/plain', entry._id)
        startDragging();
    }
    const onDragEnd=()=>{
        // console.log('drag end')
        endDragging();
    }

    const statusColor=()=>{
        switch(entry.status){
            case 'pending':
                return '#ffc107'
            case 'in-progress':
                return '#4caf50'
            case 'finished':
                return '#2196f3'
            default:
                return '#fff'
        }
    }
    const onCLick=()=>{
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{ marginTop: 1 }}
        // Eventor de drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onCLick}
        >
            <CardActionArea>
                    <Box sx={{background:statusColor,width:10,height:10,borderRadius:'50%',position:'absolute',right:20,top:20}} ref={badge}></Box>
                <CardContent>
                    <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{display:'flex',justifyContent:'end',paddingRight:2}}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createAt)}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
