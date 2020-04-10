import React from 'react';
import ListItem from '../item/component';

export default function(props) {
    return (
        <div className="list">
            {props.items.map((item, index) => {
                return <ListItem item={item}
                    id={item.id}
                    title={item.title}
                    index={index}
                    triggerEvent={props.triggerEvent}
                    done={item.done}
                    isBeingReordered={index === props.itemBeingReordered}
                    key={index} />
            })}
        </div>
    );
}