
(function () {
    'use strict';
    var myApp = angular.module('ies');
    myApp.controller('userCtrl', userCtrl);
    userCtrl.$inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', 'userServices', 'bootstrapError'];
    function userCtrl($scope, $rootScope, $state, $window, $filter, $timeout, userServices, bootstrapError) {
        $scope.Math = window.Math;
        $scope.page = {};
        $scope.page.currentPage = 0;
        $scope.page.pageSize = 10;
        $scope.page.searchBox = '';
        $scope.hideErrors = function (id) {
            $scope.incharge = {};
            bootstrapError.hideErrors(id);
        }
        $scope.closeModal = function (model, form) {
            $scope.hideErrors(form);
            $('#' + model).modal('hide');
        }
        function getAll() {
            userServices.getAllstudentDetails(function (err, res) {
                if (!err) {
                    $scope.users = res.sort(function (a, b) {
                        return (a.StudentId > b.StudentId) ? 1 : ((b.StudentId > a.StudentId) ? -1 : 0);
                    });
                    console.log($scope.users);

                }
            });
        }
        getAll();
        $scope.getBoardcount=function() {
            userServices.filterBoard(function (err, res) {
                if (!err) {
                    $scope.Board = res;

                }
            });
        }
        $scope.getData = function () {
            var filterData = $filter('filter')($scope.student, $scope.page.q);
            return filterData
        }
        $scope.numberOfPages = function () {
            var data = $scope.getData();
            return Math.ceil(data.length / $scope.page.pageSize);
        }
        $scope.$watch('page.searchBox', function (newValue, oldValue) {
            if (oldValue != newValue) {
                $scope.page.currentPage = 0;
            }
        }, true);

        $scope.nextPage = function () {
            $scope.page.currentPage = $scope.page.currentPage + 1;
        }
        $scope.previousPage = function () {
            $scope.page.currentPage = $scope.page.currentPage - 1;
        }
        $scope.lastPage = function () {
            $scope.page.currentPage = Math.ceil($scope.getData().length / $scope.page.pageSize) - 1;
        }
        $scope.firstPage = function () {
            $scope.page.currentPage = 0;
        }
        // $scope.loadInfo=function(info){
        //     $scope.update=JSON.parse(JSON.stringify(info));
        //     $scope.StudentId=info.StudentId;
        // };
        $scope.add = function () {
            var form = document.getElementById('addstudent');
            var check = form.checkValidity();
            if (check === true) {
            //    $scope.incharge.StudentId=($scope.incharge.StudentId).tonumber();
            //     $scope.incharge.firstName=($scope.incharge.firstName).toUpperCase();
            //     $scope.incharge.lastName=($scope.incharge.lastName).toUpperCase();
            //     $scope.incharge.dateOfBirth=($scope.incharge.dateOfBirth).todate ();
            //     $scope.incharge.emailId=($scope.incharge.emailId).toemail();
            //     $scope.incharge.mobileNo=($scope.incharge.mobileNo).tonumber();
            //     $scope.incharge.sslcMark=($scope.incharge.sslcMark).tonumber();
            //     $scope.incharge.hscMark=($scope.incharge.hscMark).tonumber();
            //     $scope.incharge.Cutoff=($scope.incharge.Cutoff).tonumber();
            //     $scope.incharge.Board=($scope.incharge.Board).toUppercase();
            //     $scope.incharge.SchoolName=($scope.incharge.SchoolName).toUpperCase(); 
                userServices.addstudent($scope.incharge,function (err, res) {
                    if (!err) {
                        getAll();
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.success = true;
                        $scope.successMsg = "Successfully added the user infomation";
                        $scope.users.push($scope.incharge);
                        $('#add_student').modal("hide");
                        $timeout(function () {
                            $scope.success = false;
                            $scope.successMsg = "";
                        }, 2000);
                    }
                    else {
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.error = true;
                        $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                        $timeout(function () {
                            $scope.error = false;
                            $scope.errorMsg = "";
                        }, 2000);
                    }
                });
            }
            else {
                bootstrapError.showErrors('addstudent')
            }
        };
        $scope.load=function(user)
        {
            $scope.incharge={};
            $scope.incharge._id=user._id;
            $scope.incharge.StudentId=user.StudentId;
            $scope.incharge.firstName=user.firstName;
            $scope.incharge.lastName=user.lastName;
            $scope.incharge.dateOfBirth=new Date(user.dateOfBirth);
            $scope.incharge.MobileNo=user.mobileNo;
            $scope.incharge.emailID=user.emailId;
            $scope.incharge.sslcMark=user.sslcMark;
            $scope.incharge.hscMark=user.hscMark;
            $scope.incharge.Cutoff=user.Cutoff;
            $scope.incharge.Board=user.Board;
            $scope.incharge.SchoolName=user.SchoolName;
         

        }
       $scope.delete=function(user){
           userServices.deletestudent(user,function(err,res){
            if (!err) {
                $("html").stop().animate({ scrollTop: 0 }, 200);
                $scope.success = true;
                $scope.successMsg = "Successfully deleted the student information";
                getAll();
           }
           else {
            $("html").stop().animate({ scrollTop: 0 }, 200);
            $scope.error = true;
            $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
            $timeout(function () {
                $scope.error = false;
                $scope.errorMsg = "";
            }, 2000);
        }
    });
}
$scope.filter = function () {
    userServices.filterstudent($scope.filters,function (err, res) {
        if (!err) {
            $("html").stop().animate({ scrollTop: 0 }, 200);
            $('#filter_student').modal("hide");            
            $scope.users = res;
            
        }
        else {
            $("html").stop().animate({ scrollTop: 0 }, 200);
            $scope.error = true;
            $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
            
        }
    });
};

$scope.distinct=function(){

    userServices.distinct(function(err,res){
        if(!err){
            console.log(res);
            $scope.distinctboard= res;
            
        }
    })
}
        
        $scope.update = function () {
            userServices.editstudent($scope.incharge, function (err, res) {
                if (!err) {
                    getAll();
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.success = true;
                    $scope.successMsg = "Successfully updated the student information";
                    
                }
                else {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.error = true;
                    $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                    $timeout(function () {
                        $scope.error = false;
                        $scope.errorMsg = "";
                    }, 2000);
                }
            })
        }
    }
    
    
    
    myApp.service('userServices', userServices);
    userServices.$inject = ['$http'];
    function userServices($http) {
        this.getAllstudentDetails = function (callback) {
            var request = {
                url: "user/getStudentDetails",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.addstudent = function (details, callback) {
            var request = {
                url: "user/addstudent",
                method: 'POST',
                data: details, 
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.editstudent = function(details, callback) {
            var request={
                url: "user/update",
                method:'PUT',
                data: details, 
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.filterstudent = function (details, callback) {
            var request = {
                url: "user/filterstudent",
                method: 'GET',
                params: details, 
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.filterBoard = function (callback) {
            var request = {
                url: "user/filterBoard",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        this.distinct = function (callback) {
            var request = {
                url: "user/distinct",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response.data);
            }, function (error) {
                callback(error, null);
            });
        };
        

        this.deletestudent=function(query,callback){
            var request={
                url:"user/deletestudent",
                method:"DELETE",
                data:query,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function(response){
                callback(null,response.data);
            },function(error){
                callback(error,null);
            });

        };
    }

})();