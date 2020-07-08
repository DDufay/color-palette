import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

import {PaletteMetaForm} from "./PaletteMetaForm";
import sizes from './style/sizes';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center',

        "& h6": {
            [sizes.down('xs')]: {
                display: 'none'
            }
        }
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        display: 'flex',
        alignItems: 'center'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        minHeight: '50px !important',
    },
    content: {
        height: "calc(100vh - 64px)",
        flexGrow: 1,
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        "& ul": {
            padding: '0'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    navActions: {
        marginRight: '0.5rem',
        "& button": {
            margin: "0 5px",
            [sizes.down('xs')]: {
                margin: '0',
                padding: '5px'
            }
        },
        "& a": {
            textDecoration: "none"
        },
        [sizes.down('xs')]: {
            marginRight: '0',
        }
    }
}));

export const SideDrawer = ({ drawerContent, mainContent, savePalette, paletteName, onSetPaletteName }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [showDialog, setShowDialog] = useState('palette');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create a palette
                    </Typography>
                </Toolbar>
                <div className={classes.navActions}>
                    <Link to='/'><Button variant='contained' color='secondary'>Go Back</Button></Link>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: '#0E1F50' }}
                        onClick={() => setShowDialog('form')}
                    >
                        Save
                    </Button>
                </div>
            </AppBar>

            {showDialog !== 'palette' && <PaletteMetaForm
                paletteName={paletteName}
                onSetPaletteName={onSetPaletteName}
                savePalette={savePalette}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{paper: classes.drawerPaper}}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {drawerContent}
            </Drawer>
            <main className={clsx(classes.content, {[classes.contentShift]: open})}>
                <div className={classes.drawerHeader}/>
                {mainContent}
            </main>
        </div>
    );
};
