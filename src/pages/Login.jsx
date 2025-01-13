import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'

function Login() {
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userId.trim() && userId.includes('_') && userId.split('_').length - 1 === 1) {
            sessionStorage.setItem('user_id', userId)
            navigate('/home')
        } else {
            console.log("Validation failed")
            alert('Please enter a valid user ID')
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <div>
                    <Typography variant='h2' sx={{justifyContent: 'center', alignContent: 'center', display: 'flex', mb: 2}}>Login</Typography>
                    <Typography variant='h5' sx={{mb: 1}}>Enter User ID</Typography>
                    <Typography variant='body2' sx={{mb: 1}} className="format-instruction">Format: firstname_lastname (e.g., john_smith)</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField 
                                label='Enter your user ID'
                                variant='outlined'
                                value={userId} 
                                onChange={(e) => setUserId(e.target.value)} 
                                required
                                fullWidth
                            />
                        </Box>
                        <Button 
                            type='submit' 
                            variant='contained'
                            fullWidth
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </Box>
        </Box>
    )
}

export default Login
