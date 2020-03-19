export function createInitialState() {
    return {
        items: [{
            title: 'Learn about drag and drop',
            done: false
        }, {
            title: 'Drink coffee',
            done: false
        }, {
            title: 'Drink more coffee',
            done: false
        }, {
            title: 'Another Learn about drag and drop',
            done: false
        }, {
            title: 'Another Drink coffee',
            done: false
        }, {
            title: 'Another Drink more coffee',
            done: false
        }]
    }
}

export function getItems(state) {
    return state.items;
}