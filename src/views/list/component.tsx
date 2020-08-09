import React from 'react';
import { item } from '../../core';
import ListItem from '../item/component';

interface props {
    items: item[];
    itemToEditId: string,
    itemEditPlaceholder: string;
    triggerEvent: (event: { name: string }) => void;
    itemBeingReordered: number;
}

export default function(props: props) {
    return (
        <div className="list">
            {props.items.map((item: item, index: number) => {
                return <ListItem item={item}
                    id={item.id}
                    title={item.title}
                    itemEditActive={props.itemToEditId === item.id}
                    itemEditPlaceholder={props.itemEditPlaceholder}
                    index={index}
                    triggerEvent={props.triggerEvent}
                    done={item.done}
                    isBeingReordered={index === props.itemBeingReordered}
                    key={index} />
            })}
        </div>
    );
}