import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Divider, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  text1: {
    padding: theme.spacing(2, 2, 0),
    textAlign: "center",
    color: "red"
  },
  text: {
    padding: theme.spacing(2, 2, 0),
    textAlign: "center",
  },
  listText: {
    padding: theme.spacing(0, 7, 0),
    textAlign: "left",
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(5, 5, 5),
    color: "#2E3B55",
  },
  head: {
    fontWeight: "bold"
  },
  tableContainer: {
  }
}));

export default function AllUsersPage(props) {
  const [people, setPeople] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [noMatch, setNoMatch] = useState("");

  const classes = useStyles();
  useEffect(() => {
  }, [props.data]);

  const GeneratePairs = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let header = "";
    if (user && user.accessToken)
      header = { "x-access-token": user.accessToken };

    axios
      .get("http://localhost:8081/api/generatePermutationFromDatabase", {
        headers: header,
      })
      .then((response) => {
        let peopleNew = [];
        let chosenNew = [];
        console.log(response.data);
        response.data.chosen.map((value, i) => {
            if(value != "No pair to choose"){
                peopleNew.push(response.data.people[i]);
                chosenNew.push(value)
            }
            else{
                setNoMatch(response.data.people[i]);
            }
        });
        if(peopleNew.length == response.data.people.length)
            setNoMatch("");
        setPeople(peopleNew);
        setChosen(chosenNew);
        return response.data;
      })
      .catch((error) => {
        console.log("Greska u generate pairs!");
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Toolbar />
        <Typography className={classes.text} variant={"h6"} gutterBottom>
        Secret Santa Pair Generating
        </Typography>
        <Divider />
        <Button
          variant={"outlined"}
          color="primary"
          className={classes.button}
          onClick={() => GeneratePairs()}
        >
            Generate
        </Button>
        <TableContainer component={Paper}  className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.head}>Choses</TableCell>
                <TableCell align="center" className={classes.head}>Chosen person</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {people.map((value, i) => (
                <TableRow>
                  <TableCell align="center">{value}</TableCell>
                  <TableCell align="center">{chosen[i]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Toolbar />
        <Typography className={classes.text} variant={`h6`} gutterBottom>
            People without match
        </Typography>
        <Divider />
        <Typography className={classes.text1} variant={`h6`} gutterBottom>
            {noMatch}
        </Typography>
      </main>
    </div>
  );
}
