import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'

const VideoCard = ({ video, onWatch, onEdit }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxHeight: '400px' }}>
        <Box 
                sx={{ 
                    height: '200px', 
                    width: '100%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#f0f0f0'
                }}
            >
                <OndemandVideoIcon sx={{ fontSize: '100px', color: '#1976d2' }} />
            </Box>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ maxHeight: '24px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} gutterBottom>
                    {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ height: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {video.description}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button onClick={onWatch} variant='contained'>
                        Watch Video
                    </Button>
                    <Button onClick={onEdit} variant='contained'>
                        Edit Video
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default VideoCard