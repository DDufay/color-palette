import React, {useState} from "react";
import {withStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import MiniPalette from "./MiniPalette";
import styles from './style/PaletteListStyles';

const PaletteList = ({ classes, palettes, deletePalette }) => {
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const onShowDialog = id => {
        setOpen(true);
        setDeleteId(id);
    };

    const onDeletePalette = () => {
        deletePalette(deleteId);
        setOpen(false);
    };
    
    return <div className={classes.root}>
        <div className={classes.container}>
            <nav className={classes.nav}>
                <h1 className={classes.title}>Color palette</h1>
                <Link to="/palette/new">Create palette</Link>
            </nav>
            <TransitionGroup className={classes.palettes}>
                {palettes.map(palette => (
                    <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                        <MiniPalette palette={palette} deletePalette={deletePalette} onOpenDialog={onShowDialog} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
        <Dialog open={open} aria-labelledby="delete-dialog-title" onClose={() => setOpen(false)}>
            <DialogTitle id="delete-dialog-title">Delete this Palette</DialogTitle>
            <List>
                <ListItem button onClick={onDeletePalette}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}><CheckIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText>Delete</ListItemText>
                </ListItem>
                <ListItem button onClick={() => setOpen(false)}>
                    <ListItemAvatar>
                        <Avatar style={{ backgroundColor: red[100], color: red[600] }}><CloseIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText>Cancel</ListItemText>
                </ListItem>
            </List>
        </Dialog>
    </div>
};

export default withStyles(styles)(PaletteList);
