var app = angular.module('app', []);

app.controller('BookmarksCtrl', ['$scope', '$http', function($scope, $http, canvasDraw) {
    $scope.bookmarks = [
        {text:'learn angular', done:true, url: 'http://habrahabr.ru', src: '/images/404.png'},
        {text:'build an angular app', done:false, url: 'http://tut.by', src: '/images/404.png'}];

    $scope.addBookmarks = function() {
        $http.get('/api/screenshots', {
            params: {url: $scope.todoText}
        })
        .success(function(data, satus, headers, config) {
            $scope.bookmarks.push({
                text:$scope.todoText,
                done:false,
                url: $scope.todoText,
                src: data
            });
            $scope.todoText = '';
        })
        .error(function(data, satus, headers, config) {
            console.log('error')
        })
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.bookmarks, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.preview = function() {
        console.log('preview')
    }

    $scope.archive = function() {
        var oldTodos = $scope.bookmarks;
        $scope.bookmarks = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.bookmarks.push(todo);
        });
    };
}]);