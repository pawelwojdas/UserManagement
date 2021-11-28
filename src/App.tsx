import React from 'react';
import './App.css';
import UserTable from './views/UserTable/UserTable';
import UserContextProvider from './shared/context/users-context';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <UserTable />
      </UserContextProvider>
    </div>
  );
}

export default App;
