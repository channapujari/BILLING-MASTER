import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>({
    paper: {
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      avatar: {
        margin: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: "100%",
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(1, 0, 1),
      },
}))

export default useStyles;
