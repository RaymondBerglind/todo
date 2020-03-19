import React from 'react';
import ListItem from '../item/component';

export default function(props) {
    return (
        <div className="list">
            {props.items.map((item, index) => {
                return <ListItem item={item}
                    key={index}
                    done={item.done} />
            })}
        </div>
    );
}