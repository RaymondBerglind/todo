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
    } else if (event.name === 'reorderTargetUpdated') {
      setState(core.setReorderingTarget(state, event.data.targetIndex));
    } else if (event.name === 'reorderEnded') {
      setState(core.clearReordering(
        core.reorderSourceAndTarget(state))
      );
    } else if (event.name === 'itemDoneToggled') {
      setState(core.setItemDone(state, {
        id: event.data.itemId,
        done: event.data.done
      }));
    }
  }
  
  return (
    <div className="main-container">
      <Search />
      <TodoList triggerEvent={triggerEvent}
        items={core.getListToDisplay(state)}
        itemBeingReordered={core.getReorderTargetIndex(state)} />
    </div>
  );
}

export default App;
