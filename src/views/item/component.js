import React from 'react';

export default function(props) {
    const itemStyle = props.isBeingReordered ? {background: '#182251'} : {};

    return (
        <div className="list-item"
            draggable
            style={itemStyle}
            onDragStart={(e) => {
                props.triggerEvent({
                    name: 'reorderStarted',
                    data: {
                        sourceIndex: props.index
                    }
                });
            }}
            onDragEnd={(e) => {
                e.preventDefault();
                props.triggerEvent({
                    name: 'reorderEnded'
                });
            }}
            onDrop={(e) => {
                e.preventDefault();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.triggerEvent({
                    name: 'reorderTargetUpdated',
                    data: {
                        targetIndex: props.index
                    }
                });
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