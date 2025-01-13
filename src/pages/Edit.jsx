import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditVideo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [newDescription, setNewDescription] = useState('')
    const [newTitle, setNewTitle] = useState('')

    useEffect(() => {
        axios.get(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/single?video_id=${id}`)
            .then((response) => {
                const video = response.data.video
                setNewTitle(video.title)
                setNewDescription(video.description)
            })
            .catch((error) => {
                console.error('Error fetching video details:', error)
                alert('Error loading video details')
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .put('https://take-home-assessment-423502.uc.r.appspot.com/api/videos', {
                video_id: id,
                title: newTitle,
                description: newDescription,
            })
            .then(() => {
                alert('Video edited successfully!')
                navigate('/home')
            })
            .catch((error) => {
                console.error('Error editing video:', error)
                alert('There was an error editing the video')
            })
    }

    return (
        <div>
            <Box sx={{ padding: 6, justifyContent: 'center' }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/home')}
                    sx={{ marginBottom: '20px' }}
                >
                    Back to Home
                </Button>
                <Typography variant="h4" sx={{mb: 2}}>Edit Video</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ marginBottom: 2, width: '75%' }}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2, width: '75%' }}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                    </Box>
                    <Button type='submit' variant='contained'>
                        Edit Video
                    </Button>
                </form>
            </Box>
        </div>
    )
}

export default EditVideo
