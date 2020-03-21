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
        reorderSourceIndex: null
    }
}

describe('reorderSourceAndTarget', function () {
    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, with the target index being lower than the source.', function () {
        const state = createTestState();
        state.reorderSourceIndex = 4;

        expect(core.reorderSourceAndTarget(state, {targetIndex: 2})).toEqual({
            items: [{
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
            }],
            reorderSourceIndex: null
        });
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, with the target index being lower than the source.', function () {
        const state = createTestState();
        state.reorderSourceIndex = 2;

        expect(core.reorderSourceAndTarget(state, {targetIndex: 4})).toEqual({
            items: [{
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
            }],
            reorderSourceIndex: null
        });
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, from index 0.', function () {
        const state = createTestState();
        state.reorderSourceIndex = 0;

        expect(core.reorderSourceAndTarget(state, {targetIndex: 4})).toEqual({
            items: [{
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
            }],
            reorderSourceIndex: null
        });
    });

    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, from the last index.', function () {
        const state = createTestState();
        state.reorderSourceIndex = 5;

        expect(core.reorderSourceAndTarget(state, {targetIndex: 2})).toEqual({
            items: [{
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
            }],
            reorderSourceIndex: null
        });
    });
    
    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, between adjacent indices.', function () {
        const state = createTestState();
        state.reorderSourceIndex = 4;

        expect(core.reorderSourceAndTarget(state, {targetIndex: 3})).toEqual({
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
            }],
            reorderSourceIndex: null
        });
    });
    
    it('Should reorder the list of items in the state according to reorderSourceIndex and reorderTargetIndex, between adjacent indices.', function () {
        const state = createTestState();
        state.reorderSourceIndex = 3;

        expect(core.reorderSourceAndTarget(state, {targetIndex: 4})).toEqual({
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
            }],
            reorderSourceIndex: null
        });
    });
    
});