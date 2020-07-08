import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {ValidatorForm} from 'react-material-ui-form-validator';
import {arrayMove} from "react-sortable-hoc";
import {useHistory} from "react-router-dom";

import {SideDrawer} from "./SideDrawer";
import {DraggableColorList} from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import seedColors from './seedColors';

export const PaletteForm = ({ savePalette, palettes, maxColors = 20 }) => {
    const [color, setColor] = useState('teal');
    const [colors, setColors] = useState(seedColors[0].colors);
    const [colorName, setColorName] = useState('');
    const [paletteName, setPaletteName] = useState('');
    const isPaletteFull = colors.length >= maxColors;
    const history = useHistory();

    const addColors = () => {
        const newColor = { color, name: colorName };
        setColors([ ...colors, newColor ]);
        setColorName('');
    }

    const addRandomColor = () => {
        const allColors = palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while(isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = colors.some(color => color.name === randomColor.name);
        }
        setColors([...colors, randomColor]);
    };

    const onSavePalette = (emoji) => {
        const newPalette = {
            paletteName,
            id: paletteName.toLowerCase().replace(/ /g, '-'),
            emoji,
            colors
        };
        savePalette(newPalette);

        history.push('/');
    }

    const onDeleteColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName));
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex));
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()))
    }, [paletteName]);


    return (
        <div>
            <SideDrawer
                savePalette={onSavePalette}
                paletteName={paletteName}
                onSetPaletteName={setPaletteName}
                drawerContent={
                    <div>
                        <Typography variant="h4" align='center'>Design your palette</Typography>
                        <ColorPickerForm
                            color={color}
                            colors={colors}
                            addColors={addColors}
                            addRandomColor={addRandomColor}
                            colorName={colorName}
                            isPaletteFull={isPaletteFull}
                            setColor={setColor}
                            setColorName={setColorName}
                            setColors={setColors}
                        />
                    </div>
                }
                mainContent={
                    <div style={{ height: "100%" }}>
                        <ul style={{height: "100%"}}>
                            <DraggableColorList colors={colors} onDeleteColor={onDeleteColor} axis="xy" onSortEnd={onSortEnd} distance={20} />
                        </ul>
                    </div>
                }
            />
        </div>
    )
};
