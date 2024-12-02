import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './routes/login/login';
import Dashboard from './routes/dashboard/dashboard';
import NavBar from './app-modules/reusableComponents/navbar/nav';
import AddStaff from './app-modules/staff/add-staff';
import DocumentList from './routes/documents/document-list';
import StaffList from './routes/staff/staff-list';
import Footer from './app-modules/reusableComponents/footer/footer';
import AddDocument from './routes/documents/add-document';
import ViewDoc from './routes/documents/view-document';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
     <NavBar/>
      <div style = {{minHeight: '100vh'}} className="py-4 App">
        <NotificationContainer/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add/staff"
              element={
                <ProtectedRoute>
                  <AddStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/document/list"
              element={
                <ProtectedRoute>
                  <DocumentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/list"
              element={
                <ProtectedRoute>
                  <StaffList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add/document"
              element={
                <ProtectedRoute>
                  <AddDocument />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view/document"
              element={
                <ProtectedRoute>
                  <ViewDoc />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
