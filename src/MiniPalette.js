import React from "react";
import { withStyles } from "@material-ui/styles";
import {useHistory} from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './style/MiniPaletteStyles';

const MiniPalette = ({ classes, palette, onOpenDialog }) => {
    const history = useHistory();

    const miniColorBoxes = palette.colors.map(color => (
        <div
            key={color.name}
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
        />)
    );

    const onDeletePalette = (e) => {
        e.stopPropagation();
        onOpenDialog(palette.id);
    }

    return (
        <div className={classes.root} onClick={() => history.push(`/palette/${palette.id}`)}>
            <DeleteIcon className={classes.deleteIcon} onClick={onDeletePalette} />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {palette.paletteName} <span className={classes.emoji}>{palette.emoji}</span>
            </h5>
        </div>
    )
};

export default withStyles(styles)(MiniPalette);
