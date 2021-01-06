import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 3,
        marginTop: theme.spacing(5),
        padding: theme.spacing(3),
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('https://www.secretsantaorganizer.com/bundles/intractosecretsanta/img/ico/social.jpg')"
      },
}));

export default function HomePage() {
    const classes = useStyles();
    return (
    <main className={classes.content}>
    </main>
    );
}