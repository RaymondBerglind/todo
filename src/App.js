import React, {useState} from 'react';
import './App.css';
import Search from './views/search/component';
import TodoList from './views/list/component';
import AddButton from './views/add/component';
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
    } else if (event.name === 'itemEditChosen') {
      setState(core.setItemToEditId(state, event.id));
    } else if (event.name === 'itemTitleChanged') {
      setState(core.setItemTitle(state, {
        id: event.id,
        value: event.value
      }));
    } else if (event.name === 'addItemChosen') {
      const item = core.createItem({});
      setState(core.setItemToEditId(
        core.addItem(state, item),
        item.id));
    } else if (event.name === 'itemEditConfirmed') {
      setState(core.setItemToEditId(state, null));
    } else if (event.name === 'removeItemChosen') {
      setState(core.removeItem(state, event.data.id));
    }
  }
  
  return (
    <div className="main-container">
      <Search />
      <TodoList triggerEvent={triggerEvent}
        items={core.getListToDisplay(state)}
        itemToEditId={core.getItemToEditId(state)}
        itemBeingReordered={core.getReorderTargetIndex(state)} />
      <AddButton triggerEvent={triggerEvent} />
    </div>
  );
}

export default App;
