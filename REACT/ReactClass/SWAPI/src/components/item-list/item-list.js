// HOC higher order component

import React from 'react';

import './item-list.css';

const ItemList = (props) => {

    const {data, onItemSelected, children: renderLabel} = props;
    const items = data.map((item) => {
        const {id} = item
        //children propsi methoda ete componentin or <app>{blabla}</app> sench enq props tali childrnov enq verdnum
        const label = renderLabel(item)
        return (
            <li className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        );
    });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );

};

export default ItemList;
