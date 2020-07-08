import React, {useState} from "react";
import Slider from "rc-slider";
import {Link} from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/styles";

import 'rc-slider/assets/index.css';
import styles from './style/NavbarStyles';

const Navbar = ({ level, format, setLevel, onSelectChange, showSlider, classes }) => {
    const [open, setOpen] = useState(false);

    const onFormatChange = ({ target : { value } }) => {
        onSelectChange(value);
        setOpen(true);
    };

    return (
        <header className={classes.navbar}>
            <div className={classes.logo}>
                <Link to="/">Color palette</Link>
            </div>
            {showSlider && <div className="slider-container">
                <span>Level: {level}</span>
                <div className={classes.slider}>
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        onAfterChange={(level) => setLevel(level)}
                        step={100}
                    />
                </div>
            </div>}
            <div className={classes.selectContainer}>
                <Select onChange={onFormatChange} value={format}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rbg(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rbga(255,255,255, 1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                onClose={() => setOpen(false)}
                action={
                    [<IconButton onClick={() => setOpen(false)} color="inherit" key="close" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    ]}
            />
        </header>
    )
};

Navbar.defautProps = {
    showSlider: true
};

export default withStyles(styles)(Navbar);
