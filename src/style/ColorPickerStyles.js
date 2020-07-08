export default {
    container: {
        padding: '0 5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        "& button" : {
            width: '50%'
        }
    },
    picker: {
        width: '100% !important',
        marginTop: '2rem',
    },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '2rem'
    },
    colorName: {
        width: '100%',
        height: '70px'
    }
}
