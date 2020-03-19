import React, {useState} from 'react';
import './App.css';
import Search from './views/search/component';
import TodoList from './views/list/component';
import * as core from './core';

function App() {
  const [state, setState] = useState(core.createInitialState());

  return (
    <div className="main-container">
      <Search />
      <TodoList items={core.getItems(state)}/>
    </div>
  );
}

export default App;
