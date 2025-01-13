import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import UploadVideo from './pages/UploadVideo'
import Video from './pages/Video'
import Edit from './pages/Edit'
import Header from './components/Header'

function App() {
	const userId = sessionStorage.getItem('user_id')
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/home" element={
						<>
							<Header userId={userId} /> 
							<Home />
						</>
					} />
					<Route path="/upload-video" element={
						<>
							<Header userId={userId} /> 
							<UploadVideo />
						</>
					} />
					<Route path="/video/:id" element={
						<>
							<Header userId={userId} /> 
							<Video />
						</>
					} />
					<Route path="/edit-video/:id" element={
						<>
							<Header userId={userId} /> 
							<Edit />
						</>
					} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
