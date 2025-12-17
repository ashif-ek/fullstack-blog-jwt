import ProtectedRoute from "./components/ProtectedRoute"
import React, { Suspense, lazy } from 'react';
import LoadingFallback from "./components/LoadingFallback";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}

const PageWrapper = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </PageWrapper>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PageWrapper>
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </PageWrapper>
          }
        />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/logout" element={<PageWrapper><Logout /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><RegisterAndLogout /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
