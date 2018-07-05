import React from "react";
import {List} from 'react-virtualized';

export const VirtualList = (height, width, rows, rowRenderer) => {

  return (
    <List
      height={height}
      width={width}
      rowCount={rows.length}
      rowHeight={60}
      rowRenderer={rowRenderer}
    />);
};
