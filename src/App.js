import React, {useState} from 'react';
import './App.css';
import Search from './views/search/component';
import TodoList from './views/list/component';
import * as core from './core';

function App() {
  const [state, setState] = useState(core.createInitialState());

  function triggerEvent(event) {
    if (event.name === 'reorderStarted') {
      setState(core.setIsReorderingItem(state, event.data.sourceIndex));
    } else if (event.name === 'reorderEnded') {
      setState(core.reorderSourceAndTarget(state, {
        targetIndex: event.data.targetIndex
      }));
    }
  }

  return (
    <div className="main-container">
      <Search />
      <TodoList triggerEvent={triggerEvent}
        items={core.getItems(state)}
        itemBeingReordered={core.getReorderSourceIndex(state)}
         />
    </div>
  );
}

export default App;
