import {BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login/LoginPage'
import SignupPage from '../pages/Signup/SignupPage'
import FeedPage from '../pages/Feed/FeedPage'
import ProfilePage from '../pages/Profile/ProfilePage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
