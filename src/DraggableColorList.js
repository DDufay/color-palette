import React from 'react';
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

export const DraggableColorList = SortableContainer(({ colors, onDeleteColor }) => {
    return (
        <div style={{ height: '100%'}}>
            {colors.map((col, i) => <DraggableColorBox index={i} key={col.name} color={col} onDeleteColor={onDeleteColor}/>)}
        </div>
    )
});
