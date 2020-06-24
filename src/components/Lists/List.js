import React from 'react';
import ListItem from '../Lists/ListItem';

const List = props => (
  <ul className="list-unstyled">
    {props.children.slice(0, 10).map(item => (
      <ListItem key={item.id}>{item}</ListItem>
    ))}
  </ul>
);

export default List;
