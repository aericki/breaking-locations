import React from 'react';
import  { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from './pages/Home';
import Cadastrar from './pages/Cadastro';



const App: React.FC = () => {

  const theme = {
    primary: '#322153',
    secondary: '#6C63FF',
    background: '#F0F0F5',
    text : '#6C6C80',
    white: '#FFF',
  }
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastrar/>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
