import React from "react";
import { SortableElement } from "react-sortable-hoc";
import {withStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import styles from "./style/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(({ color, classes, onDeleteColor }) => {
    return (
        <div className={classes.root} style={{ backgroundColor: color.color }}>
            <div className={classes.boxContent}>
                <span>{color.name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={() => onDeleteColor(color.name)} />
            </div>
        </div>
    )
});

export default withStyles(styles)(DraggableColorBox);
