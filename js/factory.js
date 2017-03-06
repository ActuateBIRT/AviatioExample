'use strict';


var myFactory = angular.module('MyFactory', [
    'ngResource',
    'mainApp'
]);
myFactory.factory('API', ['$resource', 'mainAppCtrl',
    function($resource, mainAppCtrl) {
        return {
            Login: $resource(mainAppCtrl.login, {}, {
                'post': {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data, headersGetter) {
                       var str = [];
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
                   },
                    isArray: false
                },
            }),
            Folders: $resource(mainAppCtrl.folders, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                    
                },
                'post': {
                    method: 'POST',
                }
            }),
            Files: $resource(mainAppCtrl.files, {
                fileId: '@fileId'
            }, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                'post': {
                    method: 'POST',
                },
                'delete': {
                    method: 'DELETE',
                    isArray: false
                },
                'update': {
                    method: 'PUT'
                }
            }),
            Reports: $resource(mainAppCtrl.reports, {
                reportsId: '@reportsId',
                outputFormat: '@outputFormat'
            }, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST'
                }
            }),
            ReportComments: $resource(mainAppCtrl.reportComments, {}, {
                'query': {
                    method: 'GET',
                    isArray: true
                },
                post: {
                    method: 'POST'
                }
            }),

            ReportData: $resource(mainAppCtrl.reportData, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST'
                }
            }),
            ReportBookmarks: $resource(mainAppCtrl.reportBookmarks, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST'
                }
            }),
            ReportMetadata: $resource(mainAppCtrl.reportMetadata, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST'
                }
            }),
            ReportBookmarksData: $resource(mainAppCtrl.reportBookmarksData, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                }
            }),
            ReportMetadataData: $resource(mainAppCtrl.reportMetadataData, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                }
            }),
            DownloadFile: $resource(mainAppCtrl.downloadFile, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST'
                }
            }),
            DownloadReport: $resource(mainAppCtrl.downloadReport, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                }                
            }),
            DownloadDataObject: $resource(mainAppCtrl.dataObject, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST',
                }
            }),
            DownloadDataObjectElement: $resource(mainAppCtrl.dataObjectElement, {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST'
                }
            }),
            ExecuteReports: $resource(mainAppCtrl.executeReport, {
                reportsId: '@reportsId'
            }, {
                'query': {
                    method: 'GET',
                    isArray: false
                },
                post: {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data, headersGetter) {
                       var str = [];
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
                   },
                }
            })
        }
    }
]);