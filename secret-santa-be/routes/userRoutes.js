const {
    authJwt
} = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
 
    app.post(
        "/api/generatePermutationFromNumber",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.generatePermutationFromNumber
    );

    app.get(
        "/api/generatePermutationFromDatabase",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.generatePermutationFromFromDatabase
    );

    app.post(
        "/api/getUserMatch",
        [authJwt.verifyToken],
        controller.getUserMatch
    );

};