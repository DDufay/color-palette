import React, {useState} from "react";
import {Link} from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import {withStyles} from "@material-ui/styles";

import styles from './style/ColorBoxStyles';


const ColorBox = ({ background, name, paletteId, colorId, showMore, classes }) => {
    const [copied, setCopied] = useState(false);

    const onCopyChange = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <CopyToClipboard text={background} onCopy={onCopyChange}>
            <div className={classes.colorBox} style={{ background }}>
                <div style={{ background }} className={classNames(classes.copyOverlay, {[classes.showOverlay]: copied})} />
                <div className={classNames(classes.copyMessage, {[classes.copyMessageShow]: copied})}>
                    <h1>Copied !</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div className="copy-container">
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                </div>
                {showMore && <Link to={`/palette/${paletteId}/${colorId}`} onClick={(e) => e.stopPropagation()}>
                    <span className={classes.seeMore}>More</span>
                </Link>}
            </div>
        </CopyToClipboard>
    );
};

export default withStyles(styles)(ColorBox);

ColorBox.defaultProps = {
    showMore: true
}
