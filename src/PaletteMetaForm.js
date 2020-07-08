import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Picker} from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css';

export const PaletteMetaForm = ({ savePalette, paletteName, onSetPaletteName, showDialog, setShowDialog }) => {

    const onSavePalette = (emoji) => {
        savePalette(emoji.native);
        setShowDialog('palette');
    }

    return (
        <div>
            <Dialog open={showDialog === 'emoji'} onClose={() => setShowDialog('palette')}>
                <Picker onSelect={onSavePalette} title="Pick a Palette Emoji" />
            </Dialog>
            <Dialog open={showDialog === 'form'} onClose={() => setShowDialog('palette')} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => setShowDialog('emoji')}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new palette. Make sur it's unique !
                        </DialogContentText>
                            <TextValidator
                                label="Palette Name"
                                value={paletteName}
                                fullWidth
                                margin="normal"
                                onChange={({target: {value}}) => onSetPaletteName(value)}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter palette name', 'Name already used']}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDialog('palette')} color="primary">
                            Cancel
                        </Button>

                        <Button variant="contained" color="secondary" type="submit">Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
