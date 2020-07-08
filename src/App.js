import React, {useState, useEffect} from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import {generatePalette} from "./colorHelpers";
import {Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './style/App.css';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import {PaletteForm} from "./PaletteForm";
import Page from './Page';


export const App = () => {
    const savedPalettes = JSON.parse(localStorage.getItem('palettes'));

    const [palettes, setPalettes] = useState(savedPalettes || seedColors);
    const findPalette = id => palettes.find(palette => palette.id === id);

    const syncLocalStorage = () => {
        localStorage.setItem('palettes', JSON.stringify(palettes));
    };

    useEffect(() => {
        syncLocalStorage();
    }, [palettes])

    const savePalette = newPalette => {
        setPalettes([...palettes, newPalette]);
    };

    const deletePalette = id => {
        setPalettes(palettes.filter(pal => pal.id !== id));
    };

    return (
        <Route render={({ location }) => (
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={500}>
                    <Switch location={location}>
                        <Route exact path="/" render={() => <Page><PaletteList palettes={palettes} deletePalette={deletePalette} /></Page>} />
                        <Route exact path="/palette/new" render={() => <Page><PaletteForm savePalette={savePalette} palettes={palettes} /></Page>} />
                        <Route
                            exact
                            path="/palette/:id"
                            render={routeProps => <Page><Palette palette={generatePalette(findPalette(routeProps.match.params.id))} /></Page>}
                        />
                        <Route
                            exact
                            path="/palette/:paletteId/:colorId"
                            render={routeProps => (
                                <Page>
                                    <SingleColorPalette
                                        palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                                        colorId={routeProps.match.params.colorId}
                                    />
                                </Page>
                            )}
                        />
                        
                        <Route render={() => <Page><PaletteList palettes={palettes} deletePalette={deletePalette} /></Page>} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
           
        )} />
    );
};
