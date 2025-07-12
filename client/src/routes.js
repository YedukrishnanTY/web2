import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/Home';
import MainLayout from './Layout/Main';
import NotFound from './views/404';

const routes = [
    <Route key="/" path="/" element={
        <MainLayout>
            <Home />
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
