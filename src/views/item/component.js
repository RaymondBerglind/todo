import React, {useEffect} from 'react';
import dragIcon from '../../assets/drag_handle-white.svg';
import editIcon from '../../assets/edit-white.svg';
import deleteIcon from '../../assets/delete-white.svg';

export default function(props) {
    const itemStyle = props.isBeingReordered ? {background: '#182251'} : {};
    
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            props.triggerEvent({name: 'itemEditConfirmed'});
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        }
    });

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
                    })
                }} />
            {props.itemEditActive ? (
                <input type="text"
                    className="item-edit"
                    autoFocus
                    value={props.title}
                    onChange={(e) => {
                        props.triggerEvent({
                            name: 'itemTitleChanged',
                            id: props.id,
                            value: e.target.value
                        })
                    }} />
            ) : <span className="todo-title">{`${props.title}: ${props.done ? 'Done' : 'Do'}`}</span>}
            <button className="list-item-action-button"
                onClick={() => {

                }}>
                <img src={dragIcon} alt="drag icon" />
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

                }}>
                <img src={deleteIcon} alt="pen icon" />
            </button>
            
        </div>
    );
}