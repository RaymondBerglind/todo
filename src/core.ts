import { v4 as uuid } from 'uuid';

export interface item {
    id: string;
    title: string;
    done: boolean;
}

interface state {
    items: item[],
    itemBeingReorderedId: string | null,
    reorderSourceIndex?: number,
    reorderTargetIndex?: number,
    itemToEditId: string,
    itemEditPlaceholder: string,
    isUserEditingNewItem: boolean,
    shouldFetchItems: boolean
}

export function createInitialState() {
    let state: state = {
        items: [],
        itemBeingReorderedId: null,
        // reorderSourceIndex: null, -> These were previously initialized with null, now moved to the state interface.
        // reorderTargetIndex: null, -> These were previously initialized with null, now moved to the state interface.
        itemToEditId: '',
        itemEditPlaceholder: '',
        isUserEditingNewItem: false,
        shouldFetchItems: true
    }

    return state;
}

export function createItem(title?: string): item {
    return {
        id: uuid(),
        title: title || '',
        done: false
    };
}

export function addItem(state: state, item: item) {
    return {
        ...state,
        items: [...state.items, item]
    };
}

export function getItems(state: state) {
    return state.items;
}

export function getItemById(state: state, id: string) {
    return state.items.filter(item => item.id === id)[0];
}

export function setIsReorderingItem(state: state, sourceIndex: number) {
    state.reorderSourceIndex = sourceIndex;
    state.itemBeingReorderedId = state.items[sourceIndex].id;

    return { ...state };
}

export function setReorderingTarget(state: state, targetIndex: number) {
    state.reorderTargetIndex = targetIndex;
    return { ...state };
}

export function isReorderingList(state: state) {
    return state.reorderSourceIndex || state.reorderSourceIndex === 0;
}

export function clearReordering(state: state) {
    return {
        ...state,
        ...{
            itemBeingReorderedId: null,
            reorderSourceIndex: null,
            reorderTargetIndex: null
        }
    };
}

export function getReorderSourceIndex(state: state) {
    return state.reorderSourceIndex;
}

export function getReorderTargetIndex(state: state) {
    return state.reorderTargetIndex;
}

export function reorderSourceAndTarget(state: state) {
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

export function getListToDisplay(state: state) {
    return isReorderingList(state) ? reorderSourceAndTarget(state).items : getItems(state);
}

export function setItemDone(
    state: state,
    { id, done }: { id: string, done: boolean } // Is there a nicer way to do this?
) {
    return {
        ...state,
        items: state.items.reduce<item[]>((prev, curr) => {
            return [...prev, curr.id === id ? { ...curr, done } : curr];
        }, [])
    }
}

export function getItemToEditId(state: state) {
    return state.itemToEditId;
}

export function getItemEditPlaceholder(state: state) {
    return state.itemEditPlaceholder;
}

export function setItemEditPlaceholder(state: state, value: string) {
    return {
        ...state,
        itemEditPlaceholder: value
    };
}

export function setItemToEditId(state: state, id: string) {
    return {
        ...state,
        ...{
            itemToEditId: id
        }
    }
}

export function setItemTitle(
    state: state,
    { id, value }: { id: string, value: string }
) {
    return {
        ...state,
        ...{
            items: state.items.reduce<item[]>((prev, curr) => {
                return [...prev, curr.id === id ? { ...curr, title: value } : curr];
            }, [])
        }
    };
}

export function removeItem(state: state, id: string) {
    return {
        ...state,
        ...{
            items: state.items.filter(item => item.id !== id)
        }
    };
}

export function handleAddItemChosen(state: state) {
    const item = createItem();

    return {
        ...state,
        ...{
            items: addItem(state, item).items,
            itemToEditId: item.id,
            isUserEditingNewItem: true
        }
    };
}

export function handleItemEditConfirmChosen(state: state) {
    if (!state.itemEditPlaceholder) {
        return state;
    }

    return {
        ...state,
        items: setItemTitle(state, {
            id: state.itemToEditId,
            value: state.itemEditPlaceholder
        }).items,
        itemEditPlaceholder: '',
        itemToEditId: null,
        isUserEditingNewItem: false
    };
}

export function handleItemEditChosen(state: state, id: string) {
    return {
        ...state,
        itemToEditId: id,
        itemEditPlaceholder: getItemById(state, id).title
    };
}

export function handleItemsResponse(state: state, response: { items: item[] }) {
    return {
        ...state,
        items: response.items,
        shouldFetchItems: false
    };
}