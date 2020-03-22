import * as core from '../core';

function createTestState() {
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
        reorderTargetIndex: null
    }
}

describe('reorderSourceAndTarget', function () {
    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, with the target index being lower than the source.', function () {
        const state = createTestState();
        state.itemBeingReorderedId = 5;
        state.reorderSourceIndex = 4;
        state.reorderTargetIndex = 2;

        expect(core.reorderSourceAndTarget(state).items).toEqual([{
            id: 1,
            title: 'Learn about drag and drop',
            done: false
        }, {
            id: 2,
            title: 'Drink coffee',
            done: false
        }, {
            id: 5,
            title: 'Another Drink coffee',
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
            id: 6,
            title: 'Another Drink more coffee',
            done: false
        }]);
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, with the target index being lower than the source.', function () {
        const state = createTestState();
        state.itemBeingReorderedId = 3;
        state.reorderSourceIndex = 2;
        state.reorderTargetIndex = 4;

        expect(core.reorderSourceAndTarget(state).items).toEqual([{
            id: 1,
            title: 'Learn about drag and drop',
            done: false
        }, {
            id: 2,
            title: 'Drink coffee',
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
            id: 3,
            title: 'Drink more coffee',
            done: false
        }, {
            id: 6,
            title: 'Another Drink more coffee',
            done: false
        }]);
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, from index 0.', function () {
        const state = createTestState();
        state.itemBeingReorderedId = 1;
        state.reorderSourceIndex = 0;
        state.reorderTargetIndex = 4;

        expect(core.reorderSourceAndTarget(state).items).toEqual([{
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
            id: 1,
            title: 'Learn about drag and drop',
            done: false
        }, {
            id: 6,
            title: 'Another Drink more coffee',
            done: false
        }]);
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, from the last index.', function () {
        const state = createTestState();
        state.itemBeingReorderedId = 6;
        state.reorderSourceIndex = 5;
        state.reorderTargetIndex = 2;

        expect(core.reorderSourceAndTarget(state).items).toEqual([{
            id: 1,
            title: 'Learn about drag and drop',
            done: false
        }, {
            id: 2,
            title: 'Drink coffee',
            done: false
        }, {
            id: 6,
            title: 'Another Drink more coffee',
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
        }]);
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, between adjacent indices.', function () {
        const state = createTestState();
        state.itemBeingReorderedId = 5;
        state.reorderSourceIndex = 4;
        state.reorderTargetIndex = 3;

        expect(core.reorderSourceAndTarget(state).items).toEqual([{
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
            id: 5,
            title: 'Another Drink coffee',
            done: false
        }, {
            id: 4,
            title: 'Another Learn about drag and drop',
            done: false
        }, {
            id: 6,
            title: 'Another Drink more coffee',
            done: false
        }]);
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, between adjacent indices.', function () {
        const state = createTestState();
        state.itemBeingReorderedId = 4;
        state.reorderSourceIndex = 3;
        state.reorderTargetIndex = 4;

        expect(core.reorderSourceAndTarget(state).items).toEqual([{
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
            id: 5,
            title: 'Another Drink coffee',
            done: false
        }, {
            id: 4,
            title: 'Another Learn about drag and drop',
            done: false
        }, {
            id: 6,
            title: 'Another Drink more coffee',
            done: false
        }]);
    });
});
