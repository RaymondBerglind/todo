import React, { useState, useEffect } from 'react';
import './App.css';
import serviceEndpoints from './serviceEndpoints.json';
import Search from './views/search/component';
import TodoList from './views/list/component';
import AddButton from './views/add/component';
import * as core from './core';

function App() {
  interface event {
    name: string;
    id?: string;
    value?: string;
    data?: {
      done: any, 
      itemId: string,
      sourceIndex: number,
      targetIndex: number,
      id: string
    };
  }


  const [state, setState] = useState(core.createInitialState());

  function triggerEvent(event: event) {
    if (event.name === 'reorderStarted') {
      setState(core.setIsReorderingItem(state, event.data!.sourceIndex!));
    } else if (event.name === 'reorderTargetUpdated') {
      setState(core.setReorderingTarget(state, event.data!.targetIndex!));
    } else if (event.name === 'reorderEnded') {
      setState(core.clearReordering(
        core.reorderSourceAndTarget(state))
      );
    } else if (event.name === 'itemDoneToggled' && event.data) {
      setState(core.setItemDone(state, {
        id: event.data.itemId!,
        done: event.data.done
      }));
    } else if (event.name === 'itemEditChosen') {
      setState(core.handleItemEditChosen(state, event.id!)); // TODO: Move to event.data
    } else if (event.name === 'itemTitleChanged') {
      setState(core.setItemEditPlaceholder(state, event.value!)); // TODO: Move to event.data
    } else if (event.name === 'addItemChosen') {
      setState(core.handleAddItemChosen(state));
    } else if (event.name === 'itemEditConfirmed') {
      setState(core.handleItemEditConfirmChosen(state));
    } else if (event.name === 'removeItemChosen') {
      setState(core.removeItem(state, event.data!.id));
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      triggerEvent({
        name: 'itemEditConfirmed',
      });
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    if (state.shouldFetchItems) {
      fetch(serviceEndpoints.todoBaseURL + '/items')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setState(core.handleItemsResponse(state, data));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    }
  });

  return (
    <div className="main-container">
      <Search />
      <TodoList triggerEvent={triggerEvent}
        items={core.getListToDisplay(state)}
        itemToEditId={core.getItemToEditId(state)}
        itemEditPlaceholder={core.getItemEditPlaceholder(state)}
        itemBeingReordered={core.getReorderTargetIndex(state)!} />
      <AddButton triggerEvent={triggerEvent} />
    </div>
  );
}

export default App;
