import React from 'react';
import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import theme from "./theme";
import { BrowserRouter, Routes } from "react-router-dom";
import routes from './routes';
import { AppProvider } from './context/AppContext.js'; 

const cache = createCache({ key: 'css', prepend: true });

function App() {
  return (
    <CacheProvider value={cache}>
      <AppProvider> 
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter basename="/">
            <Routes>
              {routes}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </CacheProvider>
  );
}

export default App;
