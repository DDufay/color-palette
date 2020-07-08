import React, {useState} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from './style/PaletteStyles';

const SingleColorPalette = ({ palette, colorId, classes }) => {
    const [format, setFormat] = useState("hex");

    const onSelectChange = value => {
        setFormat(value);
    };

    const gatherShades = () => {
        let shades = [];
        const allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorId)
            )
        }
        return shades.slice(1);
    };

    const shades = gatherShades();
    const colorBoxes = shades.map(color => (
        <ColorBox key={color.name} name={color.name} background={color[format]} showMore={false} />)
    );

    return (
        <div className={`${classes.palette}`}>
            <Navbar format={format} onSelectChange={onSelectChange} showSlider={false} />
            <div className={classes.paletteColors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${palette.id}`}>Go back</Link>
                </div>
            </div>
            <Footer emoji={palette.emoji} name={palette.paletteName} />
        </div>
    );
};

export default withStyles(styles)(SingleColorPalette);
