import React, { useState, useEffect, Suspense, lazy } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, CircularProgress } from '@mui/material'
import Fade from '@mui/material/Fade'

const VideoCard = lazy(() => import('../components/VideoCard'))

const Home = () => {
    const [videos, setVideos] = useState([])
    const [fadeIn, setFadeIn] = useState(false)
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const navigate = useNavigate()
    const userId = sessionStorage.getItem('user_id')

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        } else {
            axios.get(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${userId}`)
                .then((response) => {
                    setVideos(response.data.videos)
                    setFadeIn(true)
                })
                .catch((err) => {
                    console.error(`Error fetching videos for user ${userId}`, err)
                })

            const userName = userId.split('_')[0]
            setWelcomeMessage(`Welcome, ${userName}!`)
        }
    }, [userId, navigate])

    return (
        <div>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h3" sx={{ mb: 4, px: 3 }}>{welcomeMessage}</Typography>
                <Typography variant="h5" sx={{ mb: 2, px: 4 }}>Your Videos</Typography>
                {videos.length > 0 ? (
                    <Grid container spacing={4} sx={{ px: 2 }}>
                        <Suspense fallback={<CircularProgress />}>
                            {videos.map((video, idx) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                                    <Fade in={fadeIn} timeout={(idx + 1) * 300}>
                                        <div>
                                            <VideoCard
                                                video={video}
                                                onWatch={() => navigate(`/video/${video.id}`)}
                                                onEdit={() => navigate(`/edit-video/${video.id}`)}
                                            />
                                        </div>
                                    </Fade>
                                </Grid>
                            ))}
                        </Suspense>
                    </Grid>
                ) : (
                    <Typography variant="body1" sx={{ mb: 2, px: 4 }}>No videos available. Start by uploading one!</Typography>
                )}
            </Box>
        </div>
    )
}

export default Home