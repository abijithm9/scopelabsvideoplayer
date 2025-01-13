import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material'
import CommentBox from '../components/CommentBox'
function Video() {
    const navigate = useNavigate()
    const userId = sessionStorage.getItem('user_id')
    const { id } = useParams()
    const [video, setVideo] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        if (!userId) {
            navigate('/login')
        } else {
            axios.get(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/single?video_id=${id}`)
            .then((response) => {
                setVideo(response.data.video)
                setLoading(false)
            })
            .catch((err) => {
                console.error(`Error fetching video: ${id}`,err)
                setError('Error loading video')
                setLoading(false)
            })
        }

        axios.get(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${id}`)
        .then((response)=> {
            setComments(response.data.comments)
            setLoading(false)
        })
        .catch((err)=> {
            console.error(`Error fetching comments for video: ${id}`, err)
            setError('Error loading comments')
            setLoading(false)
        })
    }, [id, userId, navigate])

    const handleAddComment = () => {
        if (comment.trim() === '') {
            return
        }

        axios.post(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments`,
            {
                video_id: id,
                content: comment,
                user_id: userId
            }
        )
        .then(()=> {
            setComments((oldComments) => [
                { content: comment, user_id: userId, created_at: new Date().toISOString() },
                ...oldComments,
            ])
            setComment("")
        })
        .catch((err) => {
            console.error('Error adding comment', err)
        })
    }

    if (loading) return <CircularProgress />
    if (error) return <Typography color='error'>{error}</Typography>

    return (
        <div>
            <Box sx={{ 
                maxWidth: '1200px', 
                width: '100%', 
                margin: '0 auto',
                padding: '20px'
            }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/home')} 
                    sx={{ marginBottom: '20px' }}
                >
                    Back to Home
                </Button>
                <Box sx={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    width: '100%',
                    marginBottom: '20px'
                }}>
                    {video && video.video_url && (
                        <iframe
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            src={video.video_url.replace("watch?v=", "embed/")}
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            title={video.title}
                        />
                    )}
                </Box>

                <Box sx={{ marginBottom: '24px' }}>
                    {video && (
                        <>
                            <Typography variant='h4' gutterBottom>
                                {video.title}
                            </Typography>
                            <Typography variant='body1' gutterBottom>
                                {video.description}
                            </Typography>
                        </>
                    )}
                </Box>

                <Box sx={{ 
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '20px',
                }}>
                    <Typography variant='h5' gutterBottom>
                        Comments
                    </Typography>
                    {comments.length > 0 ? (
                        <Box sx={{ 
                            marginBottom: 2, 
                            maxHeight: '300px',
                            overflowY: 'auto' 
                        }}>
                            {comments.map((comment, idx) => (
                                <CommentBox comment={comment} idx={idx} />
                            ))}
                        </Box>
                    ) : (
                        <Typography>No Comments yet. Be the first to add a comment</Typography>
                    )}

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        marginTop: 3
                    }}>
                        <TextField
                            label='Add a comment'
                            variant='outlined'
                            fullWidth
                            value={comment}
                            onChange={(e)=> setComment(e.target.value)}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleAddComment}
                            sx={{ minWidth: '120px' }}
                        >
                            Comment
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div> 
    )
}

export default Video