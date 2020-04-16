import {v4 as uuid} from 'uuid';

export function createInitialState() {
    return {
        items: [{
            id: 1,
            title: 'Learn about drag and drop',
            done: false
        }, {
            id: 2,
            title: 'Drink coffee',
            done: false
        }, {
            id: 3,
            title: 'Drink more coffee',
            done: false
        }, {
            id: 4,
            title: 'Another Learn about drag and drop',
            done: false
        }, {
            id: 5,
            title: 'Another Drink coffee',
            done: false
        }, {
            id: 6,
            title: 'Another Drink more coffee',
            done: false
        }],
        itemBeingReorderedId: null,
        reorderSourceIndex: null,
        reorderTargetIndex: null,
        itemToEditId: null
    }
}

export function createItem({title} = {}) {
    return {
        id: uuid(),
        title: title || '',
        done: false
    };
}

export function addItem(state, item) {
    return {
        ...state,
        items: [...state.items, item]
    };
}

export function getItems(state) {
    return state.items;
}

export function setIsReorderingItem(state, sourceIndex) {
    state.reorderSourceIndex = sourceIndex;
    state.itemBeingReorderedId = state.items[sourceIndex].id;

    return {...state};
}

export function setReorderingTarget(state, targetIndex) {
    state.reorderTargetIndex = targetIndex;
    return {...state};
}

export function isReorderingList(state) {
    return state.reorderSourceIndex || state.reorderSourceIndex === 0;
}

export function clearReordering(state) {
    return {
        ...state,
        ...{
            itemBeingReorderedId: null,
            reorderSourceIndex: null,
            reorderTargetIndex: null
        }
    };
}

export function getReorderSourceIndex(state) {
    return state.reorderSourceIndex;
}

export function getReorderTargetIndex(state) {
    return state.reorderTargetIndex;
}

export function reorderSourceAndTarget(state) {
    if (!state.reorderTargetIndex && state.reorderTargetIndex !== 0) {
        return state;
    }
    const itemBeingReordered = state.items.filter(item => item.id === state.itemBeingReorderedId)[0];
    const itemList = state.items.filter(item => item.id !== state.itemBeingReorderedId);
    
    return {
        ...state,
        ...{
            items: [
                ...itemList.slice(0, state.reorderTargetIndex),
                itemBeingReordered,
                ...itemList.slice(state.reorderTargetIndex)
            ]
        },
    }
}

export function getListToDisplay(state) {
    return isReorderingList(state) ? reorderSourceAndTarget(state).items : getItems(state);
}

export function setItemDone(state, {id, done}) {
    return {
        ...state,
        items: state.items.reduce((prev, curr) => {
            return [...prev, curr.id === id ? {...curr, done} : curr];
        }, [])
    }
}

export function getItemToEditId(state) {
    return state.itemToEditId;
}

export function setItemToEditId(state, id) {
    return {
        ...state,
        ...{
            itemToEditId: id
        }
    }
}

export function setItemTitle(state, {id, value}) {
    return {
        ...state,
        ...{
            items: state.items.reduce((prev, curr) => {
                return [...prev, curr.id === id ? {...curr, title: value} : curr];
            }, [])
        }
    };
}

export function removeItem(state, id) {
    return {
        ...state,
        ...{
            items: state.items.filter(item => item.id !== id)
        }
    };
}