import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/Home';
import MainLayout from './Layout/Main';
import NotFound from './views/404';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

const routes = [
    <Route key="/" path="/" element={
        <MainLayout>
            <Home />
        </MainLayout>
    } />,
    <Route key="/login" path="/login" element={
        <MainLayout>
            <Login />
        </MainLayout>
    } />,
    <Route key="/dashboard" path="/dashboard" element={
        <MainLayout>
            <Dashboard />
        </MainLayout>
    } />,
    // Catch-all route for undefined paths
    <Route key="notfound" path="*" element={
        <MainLayout>
            <NotFound />
        </MainLayout>
    } />
];

export default routes;
