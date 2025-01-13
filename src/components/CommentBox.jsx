import React from 'react'
import { Typography, Box } from '@mui/material'

const formatCommentTime = (dt) => {
    const now = new Date()
    const seconds = Math.floor((now-dt)/1000)
    const minutes = Math.floor(seconds/60)
    const hours = Math.floor(minutes/60)
    const days = Math.floor(hours/24)
    const weeks = Math.floor(days/7)
    const months = Math.floor(weeks/30)
    const years = Math.floor(months/365)

    if (seconds < 60) return `${seconds} second(s) ago`
    if (minutes < 60) return `${minutes} minute(s) ago`
    if (hours < 24) return `${hours} hour(s) ago`
    if (days < 7) return `${days} day(s) ago`
    if (weeks < 52) return `${weeks} week(s) ago`
    if (months < 60) return `${months} month(s) ago`
    return `${years} year(s) ago`
}
const CommentBox = ({comment, idx}) => {
    return (
        <Box key={idx} sx={{ 
            marginBottom: 2,
            padding: '12px',
            backgroundColor: '#fff',
            borderRadius: '4px'
        }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {comment.user_id}
            </Typography>
            <Typography variant="body2" sx={{ margin: '8px 0' }}>
                {comment.content}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                {formatCommentTime(new Date(comment.created_at))}
            </Typography>
        </Box>
    )
}

export default CommentBox