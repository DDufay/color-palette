import React, {useState} from "react";
import {withStyles} from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from './style/PaletteStyles';

const Palette = ({ palette, classes }) => {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");

    const onSelectChange = value => {
        setFormat(value);
    }

    return (<div className={classes.palette}>
        <Navbar level={level} format={format} setLevel={setLevel} onSelectChange={onSelectChange} showSlider={true} />
        <div className={classes.paletteColors}>
            {palette.colors[level].map(color =>
                <ColorBox key={color.name} background={color[format]} name={color.name} paletteId={palette.id} colorId={color.id} />
            )}
        </div>
       <Footer emoji={palette.emoji} name={palette.paletteName} />
    </div>);
};

export default withStyles(styles)(Palette);
