var express = require('express');
var router = express.Router();
var userServices = require('../services/userService');
var appLogger = require('../logging/appLogger');

//routes

router.get('/getstudentDetails', function (req, res, next) {
    userServices.getAllstudentDetails(function (err, details) {
        if (!err) {
            appLogger.info("user details retrived");
            res.send(details);
        }
        else {
            appLogger.error({ err: err }, "Error while trying to retrieve student details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});
router.delete('/deletestudent', function (req, res) {
    userServices.deletestudent(req.body,function (err, document) {
        if (!err) {
            appLogger.info("user details deleted successfully");
            res.send(document);
        }
        else {
            appLogger.error({ err: err }, "Error while deleting user details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});


router.post('/addstudent', function (req, res, next) {
    userServices.addstudent(req.body,function (err, response) {
        if (!err) {
            appLogger.info("student details successfully saved");
            res.send(response);
        }
        else {
            appLogger.error({ err: err }, "Error while saving student details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});
router.put('/update', function (req, res, next) {
    userServices.editstudent(req.body,function (err, response) {
        if (!err) {
            appLogger.info("student details updated ");
            res.send(response);
        }
        else {
            console.log(err)
            appLogger.error({ err: err }, "Error while saving student details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});

router.get('/filterstudent', function (req, res, next) {
    userServices.filterstudent(req.query,function (err, details) {
        if (!err) {
            appLogger.info("user details filtered");
            res.send(details);
        }
        else {
            appLogger.error({ err: err }, "Error while trying to filter student details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});
router.get('/filterBoard', function (req, res, next) {
    userServices.filterBoard(function (err, details) {
        if (!err) {
            appLogger.info("user details filtered");
            res.send(details);
        }
        else {
            appLogger.error({ err: err }, "Error while trying to filter student details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});

router.get('/distinct', function (req, res, next) {
    userServices.distinct(function (err, details) {
        if (!err) {
            appLogger.info("student board details fetched");
            res.send(details);
        }
        else {
            appLogger.error({ err: err }, "Error while fetching  student board details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});


module.exports = router;