import React from 'react';

export default function(props) {
    const itemStyle = props.isBeingReordered ? {opacity: '0.2'} : {};

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
                console.log("Endin' fools.")
                e.preventDefault();
                // props.triggerEvent({
                //     name: 'reorderEnded',
                //     data: {
                //         itemId: props.item.id
                //     }
                // });
            }}
            onDrop={(e) => {
                console.log("Droppin' fools.")
                e.preventDefault();
                props.triggerEvent({
                    name: 'reorderEnded',
                    data: {
                        targetIndex: props.index
                    }
                });
            }}
            onDragOver={(e) => {
                e.preventDefault();
                console.log('On drag over');
            }}
            onDragEnter={(e) => {
                e.preventDefault();
                console.log('On drag Enter');
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