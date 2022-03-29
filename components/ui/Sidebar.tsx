import { Box, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import React, { useContext } from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { UIContext } from '../../context/ui/UIContext';

const menuItems: string[] = ['Inbox', 'Started', 'Send Email', 'Gifts']

export const Sidebar = () => {

    const {sidemenuOpen,closeSideMenu} = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant='h4'>Menú</Typography>
            </Box>
            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    )
}
