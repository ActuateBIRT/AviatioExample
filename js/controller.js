



    var mainApp = angular.module('flightApp', ['mainApp', 'myApp.services', 'MyFactory']);


    mainApp.controller('loginCtrl', ['API','$scope', '$http', '$location', '$rootScope', 'dataService', 'mainAppCtrl', '$interval','$filter',


        function (API,$scope, $http, $location, $rootScope, dataService, mainAppCtrl,$interval, $filter) {

            var headers = {
                "Content-Type": "application/json; charset=utf-8"
            };
            
            $rootScope.idleTime = new Date();

            $scope.error = {};

            $scope.done = [];

            $scope.button_clicked = false;

            $scope.selectedRegion = "";

            $scope.regions = ["West", "Midwest","South", "Northeast"];

            $scope.statePopOverClass = "hide";

            $scope.currentRegion = "";

            $scope.currentState = "";

            $scope.leftState = "";

            $scope.rightState = "";

            $scope.title = "WestTitle";

            $scope.leftNavigationText  =  "WestTitle";

            $scope.rightNavigationText  =  "WestTitle";

            $scope.contentClass = "hide";

            $scope.viewerInitialized = false;

            $interval(function() {

               if((new Date().getTime() - $rootScope.idleTime.getTime()) > mainAppCtrl.idle_time * 60 * 1000 ) {

                    console.log("Reloading app after the idle time of " + $rootScope.idleTime + " mins");

                    window.location.reload();   

                }

            }, 100);

            

            $scope.initViewer = function (region, state) {   

                if ($scope.viewerInitialized) {

                    return;

                }             
                

                var reqOps = new actuate.RequestOptions( );

                reqOps.setVolumeProfile( "default volume" );

                reqOps.setVolume( "default volume" );

                actuate.load("viewer");

                $rootScope.idleTime = new Date();

                actuate.initialize(

                    mainAppCtrl.iportalUrl,

                    reqOps,

                    mainAppCtrl.username,

                    mainAppCtrl.password,

                    function () {

                        $scope.viewerInitialized = true;

                        $scope.reportNeedsReRun(region, state);

                    }

                );                

            }



            $scope.loadBookmark = function (fileName, bookmark, divId, width, height) {

                var viewer = new actuate.Viewer( divId);

                viewer.setReportName( fileName ); 

                viewer.setSize(width, height);               

                var options = new actuate.viewer.UIOptions( );

                options.enableToolBar(false);

                options.enableToolbarContextMenu(false);

                viewer.setUIOptions( options );

                viewer.setReportletBookmark(bookmark);

                viewer.registerEventHandler(actuate.viewer.impl.EventConstants.ON_EXCEPTION,  

                    function() {

                        console.log(divId + " render error");

                        $scope.done.push(divId);

                    }

                );



                viewer.registerEventHandler(actuate.viewer.impl.EventConstants.ON_SESSION_TIMEOUT,  

                    function() {

                        console.log("Session timed out. Reauthenticate");

                        window.location.reload();                            

                    }

                );
                $rootScope.idleTime = new Date();
                viewer.submit( 
                    function () {

                        $(".floatPanel").children().removeAttr('style');
                        $scope.done.push(divId);

                    }

                );

            }



            $scope.login = function() {

                var params= {

                    'username': mainAppCtrl.username,

                    'password': mainAppCtrl.password

                };



                API.Login.post(params,

                    function(dataResponse) {

                        $scope.response = dataResponse;

                        if (dataResponse.authToken) {

                            $rootScope.userData = dataResponse;

                            $rootScope.AuthId = dataResponse.authToken;
                            
                            authTokenValue = dataResponse.authToken;
                            
                            $http.defaults.headers.common['AuthToken'] = authTokenValue;
 
                            params = {           

                                search :"/Resources/Data Objects/flight delay.DATA"

                            }; 


                                   
                            API.DownloadReport.query(params,

                                function (dataResponse) {

                                    if (dataResponse.totalCount > 0){

                                        params = {

                                          dataObjectId : dataResponse.itemList.file[0].id,

                                          dataobjectElement : "geographic"

                                        }; 


                                        API.DownloadDataObjectElement.query(params, 

                                            function (dataResponse) {

                                                var regions={};

                                                

                                                console.log(dataResponse);

                                                angular.forEach(dataResponse.data, function(value) {

                                                   if (!regions[value.region]) {

                                                        var state = regions[value.region];

                                                        if (!state) {

                                                            state = [value.state + "|" + value.full_state + "|" + value.region];

                                                        } else {

                                                            state.push(value.state + "|" + value.full_state + "|" + value.region);

                                                        }

                                                        regions[value.region] = state;

                                                   } else {

                                                        regions[value.region].push(value.state + "|" + value.full_state + "|" + value.region);

                                                   }



                                                });



                                                Array.prototype.add = function (items) {

                                                    var length = this.length;

                                                    for (var i = 0; i < items.length ; i++) {

                                                        this[length  + i ] = items[i];

                                                    }

                                                };

                                                var states=[];

                                                states.add(regions["West"].sort());

                                                states.add(regions["Midwest"].sort());

                                                states.add(regions["South"].sort());

                                                states.add(regions["Northeast"].sort());

                                                

                                                

                                                $scope.states = states;                                               

                                                $rootScope.leftIndex=0;

                                                $rootScope.rightIndex=2;



                                                $.getScript(  mainAppCtrl.jsapiUrl )

                                                  .done(function( script, textStatus ) {

                                                    console.log( textStatus );                                                   

                                                  })

                                                  .fail(function( jqxhr, settings, exception ) {

                                                     console.log( textStatus );

                                                });

                                               

                                            }, 

                                            function (errorResponse) {

                                                if (errorResponse.data.code == "25018") {

                                                    $scope.login();

                                                }

                                            }

                                        );      

                                    }    

                                },

                                function(errorResponse) {



                                }

                            );

                        }  else if (dataResponse.error) {

                            

                        }



                    },

                    function(errorResponse) {



                    }

                );

            }





            $scope.reportNeedsReRun = function(region, state) {  

                $("#overlay").css("display", "block");

                $scope.button_clicked = true;

                $scope.currentRegion = region;

                $scope.statePopOverClass = "hide";

                $scope.selectedRegion = ""; 

                $scope.highlightRegion(region);

                $scope.title = region + "Title";

                $("#nextButton" ).css("color", "");

                $("#backButton" ).css("color", "");

                var that = actuate.viewer.impl.Viewer;

                if ( that._viewersMap )

                {

                    that._viewersMap.remove( "percentage" );

                    that._viewersMap.remove( "average" );

                    that._viewersMap.remove( "causes" );

                    that._viewersMap.remove( "busiest_worst" );

                    $("busiest_worst").html('');;

                    $("#percentage").html('');

                    $("#average").html('');

                    $("#causes").html('');

                }              

                var fileName = "/Home/" + region + "/" + state + ".rptdocument";

                console.log("region " + "= " +  region);

                console.log("state " + "= " +  state);

                params = {           

                    search : fileName,


                };



                API.DownloadReport.query(params,

                     function (dataResponse) {                       



                        if (dataResponse.totalCount > 0) {

                            params = {           

                                fileId : dataResponse.itemList.file[dataResponse.itemList.file.length - 1].id,


                            };

                            API.ReportMetadata.query(params,

                                function (dataResponse) {

                                   var ts = dataResponse.timeStamp;

                                   $scope.timestamp = "Generated " + $filter('date')(new Date(ts), "MM/dd/yyyy 'at' h:mma");

                                   if((new Date().getTime() - new Date(ts).getTime()) > mainAppCtrl.report_refresh_Time * 60 * 1000 ) {

                                        $scope.executeReport(fileName,region, state);

                                    } else {

                                       $scope.loadBookmarks(fileName);

                                    }

                                },

                                function (errorResponse) {

                                    if (errorResponse.data.code == "25018") {

                                        $scope.login();

                                    }

                                }

                            );

                        } else {

                            $scope.executeReport(fileName, region, state);

                        }

                     },

                     function (errorResponse) {

                        if (errorResponse.data.code == "25018") {

                            $scope.login();

                        } else  if(errorResponse.data.code == "3072"){

                            $scope.executeReport(fileName, region, state);

                        }

                     }

                );

            }



            $scope.executeReport = function(fileName, region, state) {

                console.log("fileName = " + fileName);

                var params = {

                    search : '/Home/Flight Delay App/Flight Performance.rptdesign',


                };

                



                if (!$rootScope.reportId )  {  

                    API.DownloadReport.query(params,

                        function (dataResponse) {

                            $rootScope.reportId = dataResponse.itemList.file[0].id;



                            var paramValues = {"ParameterValue" :

                                                 [

                                                    {"Name" : "Region","Value": region},

                                                    {"Name" : "State", "Value": state}

                                                 ]

                                              };



                            params = {

                                reportId : dataResponse.itemList.file[0].id,    

                                paramValues : angular.toJson(paramValues, false),               

                                saveOutputFile : true,

                                replaceExisting : true,

                                requestedOutputFile : fileName,


                            };

                            $scope.timestamp = "Generated " + $filter('date')(new Date(), "MM/dd/yyyy 'at' h:mm a");

                            API.ExecuteReports.post(params,

                                function (dataResponse) {

                                    $scope.loadBookmarks(fileName);

                                },

                                function (errorResponse) {

                                    console.log(errorResponse);

                                }

                            );

                        },

                        function (errorResponse) {

                            if (errorResponse.data.code == "25018") {

                                $scope.login();

                            }

                        }

                    );

                } else {

                    var paramValues = {"ParameterValue" :

                                         [

                                            {"Name" : "Region","Value": region},

                                            {"Name" : "State", "Value": state}

                                         ]

                                      };



                    params = {

                        reportId : $rootScope.reportId,    

                        paramValues : angular.toJson(paramValues, false),                

                        saveOutputFile : true,

                        replaceExisting : true,

                        requestedOutputFile : fileName,


                    };

                    $scope.timestamp = "Generated " + $filter('date')(new Date(), "MM/dd/yyyy 'at' h:mm a");

                    API.ExecuteReports.post (params,

                        function (dataResponse) {

                            $scope.loadBookmarks(fileName);

                        },

                        function (errorResponse) {

                           if (errorResponse.data.code == "25018") {

                                $scope.login();

                            }

                        }

                    );

                }

            }



            $scope.loadBookmarks = function (fileName) {

                $scope.loadBookmark(fileName, "percentage", "percentage", 575, 245);

                $scope.loadBookmark(fileName, "average", "average", 575, 250);

                $scope.loadBookmark(fileName, "causes", "causes", 130, 515);

                $scope.loadBookmark(fileName, "busiest_worst", "busiest_worst", 732, 70);

                

                $interval(function() {

                    if ($scope.done.length == 4) {

                        $("#overlay").css("display", "none");

                        $scope.done = [];

                        $scope.button_clicked = false;

                        console.log('Cleared div mask');

                    }

                }, 100);

                

            }



            $scope.previousState = function() {
                var leftSt = "";

                var rightSt = "";



                var actualSt = $scope.states[$rootScope.leftIndex].split("|");

                $scope.currentState = actualSt[1].toUpperCase();

                if ($rootScope.leftIndex == $scope.states.length - 1) {

                   $rootScope.leftIndex = $scope.states.length - 2;

                   $rootScope.rightIndex = 0;

                } else if ($rootScope.leftIndex == 0) {

                   $rootScope.leftIndex = $scope.states.length - 1;

                   $rootScope.rightIndex = 1;

                } else {

                    $rootScope.leftIndex = $rootScope.leftIndex - 1;

                    $rootScope.rightIndex = $rootScope.leftIndex  + 2; 

                                   

                }

                leftSt = $scope.states[$rootScope.leftIndex].split("|");

                rightSt = $scope.states[$rootScope.rightIndex].split("|");   



                $scope.leftNavigationText  = leftSt[2] + "Title";

                $scope.rightNavigationText  = rightSt[2] + "Title";

                $scope.chooseColor(rightSt[2], "nextButton", "next");

                $scope.chooseColor(leftSt[2], "backButton", "prev");

                $scope.leftState = leftSt[1];

                $scope.rightState = rightSt[1];

                $scope.reportNeedsReRun(actualSt[2], actualSt[0]);

            }



            $scope.nextState = function () {
                var leftSt = "";

                var rightSt = "";

                var actualSt = $scope.states[$rootScope.rightIndex].split("|");

                $scope.currentState = actualSt[1].toUpperCase();



                if ( $rootScope.rightIndex == 0) {

                    $rootScope.leftIndex = $scope.states.length - 1;

                    $rootScope.rightIndex = 1 ;

                } else if ($rootScope.rightIndex == $scope.states.length - 1) { 

                    $rootScope.leftIndex = $scope.states.length - 2;

                    $rootScope.rightIndex = 0 ;

                } else {                    

                    $rootScope.rightIndex = $rootScope.rightIndex  + 1;

                    $rootScope.leftIndex = $rootScope.rightIndex - 2;                   

                }

                               

                leftSt = $scope.states[$rootScope.leftIndex].split("|");

                rightSt = $scope.states[$rootScope.rightIndex].split("|");

                $scope.leftNavigationText  = leftSt[2] + "Title";

                $scope.rightNavigationText  = rightSt[2] + "Title";



                $scope.chooseColor(rightSt[2], "nextButton", "next");

                $scope.chooseColor(leftSt[2], "backButton", "prev");               

                $scope.leftState = leftSt[1];

                $scope.rightState = rightSt[1];

                $scope.reportNeedsReRun(actualSt[2], actualSt[0]);

            }



            $scope.chooseColor = function (region, objectid, type) {                            

                if (region == "West") {

                    $("#" + objectid).css("background-image", "url(images/btn_w_unselected_" + type + ".png)");

                } else if (region == "Midwest") {

                    $("#" + objectid).css("background-image", "url(images/btn_mw_unselected_" + type + ".png)");

                } else if (region == "South") {

                    $("#" + objectid).css("background-image", "url(images/btn_s_unselected_" + type + ".png)");

                } else if (region == "Northeast") {

                    $("#" + objectid).css("background-image", "url(images/btn_ne_unselected_" + type + ".png)");

                }

            }



            $scope.chooseHoverColor = function (regionIndex, objectid, type, highlight) {

                var region = $scope.states[regionIndex].split("|")[2];

                if (region == "West") {

                    if (highlight) {

                        $("#" + objectid).css("background-image", "url(images/btn_w_selected_" + type + ".png)");                        

                    } else {

                        $("#" + objectid).css("background-image", "url(images/btn_w_unselected_" + type + ".png)");

                    }

                    

                } else if (region == "Midwest") {

                    if (highlight) {

                        $("#" + objectid).css("background-image", "url(images/btn_mw_selected_" + type + ".png)");

                    } else {

                        $("#" + objectid).css("background-image", "url(images/btn_mw_unselected_" + type + ".png)");

                    }

                    

                } else if (region == "South") {

                    if (highlight) {

                        $("#" + objectid).css("background-image", "url(images/btn_s_selected_" + type + ".png)");

                    } else {

                       $("#" + objectid).css("background-image", "url(images/btn_s_unselected_" + type + ".png)"); 

                    }

                    

                } else if (region == "Northeast") {

                    if (highlight) {

                        $("#" + objectid).css("background-image", "url(images/btn_ne_selected_" + type + ".png)");

                    } else {

                       $("#" + objectid).css("background-image", "url(images/btn_ne_unselected_" + type + ".png)"); 

                    }

                    

                }

                if (highlight) {

                    $("#" + objectid).css("color", "white");

                } else {

                    $("#" + objectid).css("color", "");

                }

            }



            $scope.selectState = function(region, state) {

                $("#overlay").css("display", "block");

                $scope.statePopOverClass = "hide";

                $scope.startClass = "hide";

                $scope.contentClass = "";  

                angular.forEach($scope.states, function(value, index) {

                    var value = $scope.states[index];

                    if (value.indexOf(region)  != -1 && value.indexOf(state)  != -1) {

                       if ( index == 0) {

                            $rootScope.leftIndex = $scope.states.length - 1;

                            $rootScope.rightIndex = 1 ;

                        } else if (index == $scope.states.length - 1) { 

                            $rootScope.leftIndex = $scope.states.length - 2;

                            $rootScope.rightIndex = 0 ;

                        } else {                    

                            $rootScope.rightIndex = index  + 1;

                            $rootScope.leftIndex = index - 1;                   

                        }

                        var leftSt = $scope.states[$rootScope.leftIndex].split("|");

                        var rightSt = $scope.states[$rootScope.rightIndex].split("|");

                        var actualSt = $scope.states[index].split("|");

                        $scope.chooseColor(rightSt[2], "nextButton", "next");

                        $scope.chooseColor(leftSt[2], "backButton", "prev");

                        $scope.currentState = actualSt[1];

                        $scope.leftState = leftSt[1];

                        $scope.rightState = rightSt[1];

                        $scope.leftNavigationText  = leftSt[2] + "Title";

                        $scope.rightNavigationText  = rightSt[2] + "Title";

                        if (!$scope.viewerInitialized) {

                            $scope.initViewer(actualSt[2], actualSt[0]);    

                        } else {

                            $scope.reportNeedsReRun(actualSt[2], actualSt[0]);    

                        }

                        return false;

                    }

                });

                

            }



            $scope.showState = function(region, page) {                              
                $scope.statePopOverClass = "hide";

                if ($scope.selectedRegion != region) {

                    $scope.highlightRegion(region, page);

                    $scope.selectedRegion = region;

                    $scope.statePopOverClass = region + "Class";

                } else {

                    $scope.highlightRegion($scope.currentRegion, page);

                    $scope.selectedRegion = "";

                }

            }



            $scope.highlightRegion = function (region, page) {

                angular.forEach($scope.regions, 

                    function(value) {

                        if (value == region) {

                            if (page) {

                                $("#" + page + region).css("background-image", "url(images/" + value.toLowerCase() + "_" + page +"_selected.png)");                           

                            } else {

                                $("#" + region).css("background-image", "url(images/" + value.toLowerCase() + "_selected.png)");                               

                            }

                            

                        } else {

                            if (page) {

                                $("#" + page + value).removeAttr('style');

                            } else {

                                $("#" + value).removeAttr('style');

                            }

                        }

                    }

                );

            }



            $scope.bodyClick = function() {

                $scope.statePopOverClass = "hide";

                $scope.highlightRegion($scope.currentRegion);

                $scope.selectedRegion = "";

            }



        }



    ]);

