const db = require("../models");

shuffle = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

generatePermutationsShuffle = (num) => {
    let people = [...Array(num).keys()];
    let peopleArr = JSON.parse(JSON.stringify(shuffle(people)));
    let chosen = JSON.parse(JSON.stringify(shuffle(people)));
    let firstEqual = -1;
    for (let i = 0; i < peopleArr.length; i++) {
        if (peopleArr[i] == chosen[i]) {
            if (firstEqual == -1)
                firstEqual = i;
            else {
                let tmp = chosen[firstEqual];
                chosen[firstEqual] = chosen[i];
                chosen[i] = tmp;
                firstEqual = -1;
            }
        }
    }
    if (firstEqual != -1)
        chosen[firstEqual] = -1;
    return [peopleArr, chosen];
}

exports.generatePermutationFromFromDatabase = (req, res) => {
    db.user.count()
        .then(function (count) {
            let paroviBiraju = [];
            let paroviIzabrani = [];
            [peopleArr, chosen] = generatePermutationsShuffle(count);
            console.log(peopleArr, chosen);
            db.user.findAll().then(users => {
                console.log(users.length);
                for (let i = 0; i < peopleArr.length; i++) {
                    console.log(users[i].id);
                    console.log(peopleArr[i], chosen[i]);
                    if (chosen[i] != -1) {
                        users[peopleArr[i]].setConnections(users[chosen[i]].id);
                        paroviBiraju.push(users[peopleArr[i]].name + " " + users[peopleArr[i]].surname);
                        paroviIzabrani.push(users[chosen[i]].name + " " + users[chosen[i]].surname);
                    } else {
                        users[peopleArr[i]].setConnections(users[peopleArr[i]].id);
                        paroviBiraju.push(users[peopleArr[i]].name + " " + users[peopleArr[i]].surname);
                        paroviIzabrani.push("No pair to choose");
                    }
                    console.log("proslo");
                }
                res.writeHead(200, {
                    'Content-Type': "application/json"
                });
                res.end(JSON.stringify({
                    "people": paroviBiraju,
                    "chosen": paroviIzabrani
                }));
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });;
};

exports.generatePermutationFromNumber = (req, res) => {
    [peopleArr, chosen] = generatePermutationsShuffle(req.body.userNumber);
    res.writeHead(200, {
        'Content-Type': "application/json"
    });
    res.end(JSON.stringify({
        "people": peopleArr,
        "chosen": chosen
    }));
};

exports.getUserMatch = (req, res) => {
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        user.getConnections().then((connections) => {
            if (connections)
                res.send({
                    connectedPerson: connections
                });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.getAllMatches = (req, res) => {
      db.user.findAll({
        include: [{ 
            model: db.user,
            as: 'connections',
            attributes: ['name', 'surname']
          }]
      }).then(users => {
          let useri = [];
          let konekcije = [];
          for(let i = 0; i < users.length; i++){
              useri.push(users[i].name + " " + users[i].surname);
              konekcije.push(users[i].connections[0].name + " " + users[i].connections[0].surname);
          }
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify({users: useri, connections: konekcije}));
      });
};