import React from 'react';

export default function (props) {
    return (
        <button className="add"
            value="Add"
            onClick={() => {
                props.triggerEvent({
                    name: 'addItemChosen'
                });
            }}>
            Add
        </button>
    );
}