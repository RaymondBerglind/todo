import React from 'react';
import ListItem from '../item/component';

export default function(props) {
    return (
        <div className="list">
            {props.items.map((item, index) => {
                return <ListItem item={item}
                    index={index}
                    triggerEvent={props.triggerEvent}
                    isBeingReordered={index === props.itemBeingReordered}
                    key={index}
                    done={item.done} />
            })}
        </div>
    );
}