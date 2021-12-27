var userDao = require('../daos/userDao');
var mongodb = require('../daos/MongodDbUtil');
function getAllstudentDetails(callback) {     //read
    userDao.getAll(callback);
}
function addstudent(data, callback) {         //create
    userDao.create(data, callback);
}
function deletestudent(query, callback) {      //delete
    var studentId = {
        StudentId: query.StudentId
    }
    userDao.removeByQuery(studentId, callback);
}

function editstudent(data, callback) {           //update

    var query = {
        _id: mongodb.ObjectID(data._id)
    };
    var detailsToUpdate = {
        StudentId: data.StudentId,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        MobileNo: data.mobileNo,
        emailID: data.emailId,
        sslcMark: data.sslcMark,
        hscMark: data.hscMark,
        Cutoff: data.Cutoff,
        Board: data.Board,
        SchoolName: data.SchoolName
    };
    userDao.update(query, detailsToUpdate, callback);
}

function filterstudent(data,callback) {
    var students= [];
     students.push(
         { 
             $match : { Board: data.userSelect } },{ $project : { StudentId: 1, firstName: 1 , Cutoff: 1, Board: 1 } } );
    userDao.getfilter(students, callback);
}
function filterBoard(callback) {
    var Board= [];
     Board.push(
         { 
            $group:{
                _id:{Board:"$Board"},
                count:{$sum:1}
            }
        })
    userDao.getfilter(Board, callback);
}

function distinct(callback) {
    const dist = "Board";
    userDao.distinctByQuery(dist, callback);
}

module.exports.getAllstudentDetails = getAllstudentDetails;
module.exports.addstudent = addstudent;
module.exports.deletestudent = deletestudent;
module.exports.editstudent = editstudent;
module.exports.filterstudent = filterstudent;
module.exports.filterBoard = filterBoard;
module.exports.distinct = distinct;

