import React from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

function Header({ userId }) {
    const navigate = useNavigate()

    const handleCreateVideoClick = () => {
        navigate('/upload-video')
    }

    const handleLogout = () => {
        sessionStorage.removeItem('user_id')
        navigate('/login')
    }

    const getInitials = (name) => {
        if (!name) return ''
        const parts = name.split('_')
        return [parts[0][0].toUpperCase(),parts[1][0].toUpperCase()].join('')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <CastForEducationIcon />
                <Typography 
                    variant="h6" 
                    sx={{ 
                        flexGrow: 1,
                        cursor: 'pointer' 
                    }}
                    onClick={()=> navigate('/home')}
                >
                    Educational Video Player
                </Typography>
                
                {userId && (
                <>
                    <Button color="inherit" onClick={handleCreateVideoClick}>
                        Create Video
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                        <Avatar>{getInitials(userId)}</Avatar>
                    </Box>
                    <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
                        Logout
                    </Button>
                </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
