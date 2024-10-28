import React from 'react';
import HomePage from './pages/HomePage';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 space-y-4" >
      <HomePage />
    </div>
  );
};

export default App;
