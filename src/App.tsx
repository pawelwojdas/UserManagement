import React from 'react';
import './App.css';
import UserTable from './components/UserTable';
import UserContextProvider from './context/users-context';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <UserTable/>
      </UserContextProvider>
    </div>
  );
}

export default App;
