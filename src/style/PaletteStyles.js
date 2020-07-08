import sizes from './sizes';

export default {
    palette: {
        height: "100vh"
    },
    paletteColors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        opacity: 1,
        backgroundColor: "black",
        "& a": {
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            color: "white",
            textTransform: "uppercase",
            border: "none",
            textDecoration: "none",
        },
        [sizes.down('md')]: {
            width: '50%',
            height: '20%'
        },
        [sizes.down('xs')]: {
            width: '100%',
            height: '10%'
        }
    },
    paletteFooter: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold",
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem",
    }
};
