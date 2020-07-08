import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {ChromePicker} from "react-color";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core";

import styles from './style/ColorPickerStyles';

const ColorPickerForm = ({ classes, color, colors, setColors, addRandomColor, isPaletteFull, setColor, colorName, setColorName, addColors }) => {

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => colors.every(({name}) => name.toLowerCase() !== value.toLowerCase()))
    }, [colors, color]);

    return (
        <div className={classes.container}>
            <div>
                <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" onClick={() => setColors([])}>Clear</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addRandomColor}
                        disabled={isPaletteFull}
                    >
                        Random color
                    </Button>
                </div>
                <ChromePicker
                    color={color}
                    onChangeComplete={(newColor) => setColor(newColor.hex)}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={addColors} instantValidate={false}>
                    <TextValidator
                        className={classes.colorName}
                        variant='filled'
                        margin='normal'
                        placeholder="Color name"
                        value={colorName}
                        onChange={({target: {value}}) => setColorName(value)}
                        validators={["required", "isColorNameUnique"]}
                        errorMessages={[
                            "This input is required",
                            "Color name must be unique",
                            "Color already used"
                        ]}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isPaletteFull}
                        className={classes.addColor}
                        style={{backgroundColor: isPaletteFull ? 'grey' : color}}
                    >
                        {isPaletteFull ? 'Palette Full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </div>
        </div>
    );
};

export default withStyles(styles)(ColorPickerForm);
