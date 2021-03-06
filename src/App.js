import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';



function App() {
  const [{user},dispatch]=useStateValue();
  
  return (
    <div className="app">
      {!user ? (<Login />) :(
        <div className="appBody"> 
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>  
      )
      }
      
    </div>
  );
}

export default App;
