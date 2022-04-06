import { Box } from '@mui/system'
import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui'
interface Props {
    title?: string
}
export const Layout: FC<Props> = ({ title = 'OpenJira',children }) => {
    return (
        <Box sx={{ flexFlow: 1,minHeight:'100vh' }}>
            <Head>
                <title>{title}</title>
            </Head>
            {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
            <Box sx={{ padding: '10px' }}>
                {children}
            </Box>
        </Box>
    )
}
