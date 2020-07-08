import React from "react";
import { withStyles } from "@material-ui/styles";

import styles from './style/PaletteStyles';

const Footer = ({ name, emoji, classes }) => {
    return (
        <footer className={classes.paletteFooter}>
            {name}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    );
};

export default withStyles(styles)(Footer);
