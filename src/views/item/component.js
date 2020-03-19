import React from 'react';

export default function(props) {
    return (
        <div className="list-item"
            draggable
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={(e) => {
                e.preventDefault();
            }}>
            <span className="todo-title">{`${props.item.title}: ${props.item.done ? 'Done' : 'Do'}`}</span>
            <input type="checkbox"
                checked={props.done}
                onChange={checked => {
                    // TODO
                }} />
        </div>
    );
}