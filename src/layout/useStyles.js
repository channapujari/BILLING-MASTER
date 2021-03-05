import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>({
    title:{
        display:"none",
        [theme.breakpoints.up("sm")]:{
            display:"block"
        },
        textDecoration: "none"
    },
    link:{
        textDecoration:"none",
        color:"black",
        flexGrow:1
    },
    btn:{
        textDecoration:"none",
        color:"black"
    }
}))

export default useStyles;