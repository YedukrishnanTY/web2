import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/Home';
import MainLayout from './Layout/Main';

const routes = [
    <Route key="/" path="/"
        element={
            <MainLayout>
                <Home />
            </MainLayout>
        }
    />,
];

export default routes;
