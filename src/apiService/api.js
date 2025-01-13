import axios from 'axios'

const BASE_URL = `https://take-home-assessment-423502.uc.r.appspot.com/api`

// Get all videos for a specific user
export const getUserVideos = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/videos`, {
            params: {user_id: userId},
        })
        return response.data.videos
    } catch (err) {
        console.error(`Error fetching user ${userId}'s videos`,err)
        throw err
    }
}

// Create a video
export const createVideo = async (userId, title, description, videoUrl) => {
    try {
        const response = await axios.post(`${BASE_URL}/videos`, {
            user_id: userId,
            title,
            description,
            video_url: videoUrl,
        })
        return response.data.success
    } catch (err) {
        console.error("Error creating video:", err)
        throw err
    }
}

// Edit an existing video
export const editVideo = async (videoId, title, description) => {
    try {
        const response = await axios.put(`${BASE_URL}/videos`, {
            video_id: videoId,
            title,
            description,
        })
        return response.data.success
    } catch (error) {
        console.error("Error editing video:", error)
        throw error
    }
}

// Get a single video
export const getSingleVideo = async (videoId) => {
    try {
        const response = await axios.get(`${BASE_URL}/videos/single`, {
            params: { video_id: videoId },
        })
        return response.data.video
    } catch (error) {
        console.error(`Error fetching video: ${videoId}`, error)
        throw error
    }
}

// Add comment on a video
export const createComment = async (videoId, userId, content) => {
    try {
        const response = await axios.post(`${BASE_URL}/videos/comments`, {
            video_id: videoId,
            user_id: userId,
            content,
        })
        return response.data.success
    } catch (error) {
        console.error("Error creating comment:", error)
        throw error
    }
}

// Get comments for a video
export const getVideoComments = async (videoId) => {
    try {
        const response = await axios.get(`${BASE_URL}/videos/comments`, {
            params: { video_id: videoId },
        })
        return response.data.comments
    } catch (error) {
        console.error(`Error fetching video comments for: ${videoId}`, error)
        throw error
    }
}