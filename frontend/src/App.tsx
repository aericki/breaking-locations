import React from 'react';
import  { ThemeProvider } from 'styled-components';



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
        
    </ThemeProvider>
  );
};

export default App;
