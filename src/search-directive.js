/**
* Angularjs Search Directive
* https://github.com/DevTeamHub/search-directive
* (c) 2016 Dev Team Inc. http://dev-team.com
* License: MIT
*/

var searchModule = angular.module('dev-team-search', []);

searchModule.directive("dtSearch", dtSearchDirective);

function dtSearchController($scope) {   

    this.cancel = function () {
        $scope.searchString = "";
        this.search();
    };

    this.search = function() {
        $scope.search({searchString: $scope.searchString});
    }   
}

function dtSearchDirective() {
    return {
         scope: {
            searchString: "=",
            search: "&"
        },
        restrict: "E",
        replace: true,
        templateUrl: templateSelector,
        controller: ['$scope', dtSearchController],
        controllerAs: "ctrl"
    };

    function templateSelector(element, attrs) {
        if (attrs.templateUrl) {
            return attrs.templateUrl;
        }
        return "dt-search.tmpl.html";
    }
}

searchModule.run(["$templateCache", function ($templateCache) {
    $templateCache.put("dt-search.tmpl.html",
	"<div class=\"search-form\"><div class=\"input-group\"><input type=\"text\" class=\"form-control input-sm\"ng-model=\"searchString\"ng-model-options=\"{ debounce: 300 }\"ng-change=\"ctrl.search()\"><div class=\"input-group-btn\"><button class=\"btn btn-sm btn-primary\" type=\"button\" ng-click=\"ctrl.cancel()\"><i class=\"glyphicon\" ng-class=\"{ 'glyphicon-search': !searchString, 'glyphicon-remove': searchString }\"><\/i><\/button><\/div><\/div><\/div>");
}]);