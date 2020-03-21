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
        reorderSourceIndex: null
    }
}

export function getItems(state) {
    return state.items;
}

export function setIsReorderingItem(state, id) {
    state.reorderSourceIndex = id;
    return {...state};
}

export function clearReordering(state) {
    state.reorderSourceIndex = null;
    return {...state};
}

export function getReorderSourceIndex(state) {
    return state.reorderSourceIndex;
}

export function reorderSourceAndTarget(state, {targetIndex}) {
    const shouldShiftForward = state.reorderSourceIndex > targetIndex;
    
    state.items = shouldShiftForward ? [
        ...state.items.slice(0, targetIndex),
        state.items[state.reorderSourceIndex],
        ...state.items.slice(targetIndex, state.reorderSourceIndex),
        ...state.items.slice(state.reorderSourceIndex + 1)
    ] : [
        ...state.items.slice(0, state.reorderSourceIndex),
        ...state.items.slice(state.reorderSourceIndex + 1, targetIndex + 1),
        state.items[state.reorderSourceIndex],
        ...state.items.slice(targetIndex + 1)
    ];
    state = clearReordering(state);

    return state;
}
