import React from 'react';
import dragIcon from '../../assets/drag_handle-white.svg';
import editIcon from '../../assets/edit-white.svg';
import deleteIcon from '../../assets/delete-white.svg';

export default function(props) {
    const itemStyle = props.isBeingReordered ? {background: '#182251'} : {};

    return (
        <div className="list-item grab"
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
            <input type="checkbox"
                className="item-check"
                checked={props.done}
                onChange={(e) => {
                    props.triggerEvent({
                        name: 'itemDoneToggled',
                        data: {
                            itemId: props.id,
                            done: !props.done
                        }
                    });
                }} />
            {props.itemEditActive ? (
                <input type="text"
                    className="item-edit"
                    autoFocus
                    placeholder='Enter an item title...'
                    value={props.itemEditPlaceholder}
                    onChange={(e) => {
                        props.triggerEvent({
                            name: 'itemTitleChanged',
                            id: props.id,
                            value: e.target.value
                        });
                    }}
                    onBlur={() => {
                        props.triggerEvent({
                            name: 'itemEditConfirmed',
                            data: {
                                id: props.id
                            }
                        });
                    }} 
                    />
            ) : <span className="todo-title">{props.title}</span>}
            <button className="list-item-action-button grab"
                onClick={() => {}}>
                <img
                    draggable={false}
                    src={dragIcon}
                    alt="drag icon" />
            </button>
            <button className="list-item-action-button"
                onClick={() => {
                    props.triggerEvent({
                        name: 'itemEditChosen',
                        id: props.id
                    });
                }}>
                <img src={editIcon} alt="edit icon" />
            </button>
            <button className="list-item-action-button"
                onClick={() => {
                    props.triggerEvent({
                        name: 'removeItemChosen',
                        data: {
                            id: props.id
                        }
                    });
                }}>
                <img src={deleteIcon} alt="delete icon" />
            </button>
        </div>
    );
}