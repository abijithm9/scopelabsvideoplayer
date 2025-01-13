import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UploadVideo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const navigate = useNavigate()
    const userId = sessionStorage.getItem('user_id')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !description || !videoUrl) {
            alert('All fields are required')
            return
        }

        axios
            .post('https://take-home-assessment-423502.uc.r.appspot.com/api/videos', {
                user_id: userId,
                title,
                description,
                video_url: videoUrl,
            })
            .then(() => {
                alert('Video created successfully!')
                navigate('/home')
            })
            .catch((error) => {
                console.error('Error creating video:', error)
                alert('There was an error creating the video')
            })
    }

    return (
        <div>
            <Box sx={{ padding: 6, mb: 2 }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/home')}
                    sx={{ marginBottom: '20px' }}
                >
                    Back to Home
                </Button>
                <Typography variant="h4" sx={{mb: 2}}>Create a New Video</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Video URL"
                            variant="outlined"
                            fullWidth
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                    </Box>
                    <Button type='submit' variant='contained'>
                        Upload Video
                    </Button>
                </form>
            </Box>
        </div>
    )
}

export default UploadVideo
