var app = angular.module('app', []);

app.controller('BookmarksCtrl', ['$scope', '$http', function($scope, $http, canvasDraw) {
    $scope.bookmarks = [
        {text:'learn angular', done:true, url: 'http://habrahabr.ru', src: '/images/404.png', tags: ['one', 'two']},
        {text:'build an angular app', done:false, url: 'http://tut.by', src: '/images/404.png', tags: ['three', 'four']}];

    $scope.addBookmarks = function() {
        if (!$scope.bookmarkUrl || !$scope.bookmarkTags) return;

        $http.get('/api/screenshots', {
            params: {url: $scope.bookmarkUrl}
        })
        .success(function(data, satus, headers, config) {
            $scope.bookmarks.push({
                text:$scope.bookmarkUrl,
                done:false,
                url: $scope.bookmarkUrl,
                src: data,
                tags: $scope.bookmarkTags ? $scope.bookmarkTags.split(', ') : []
            });
            $scope.bookmarkUrl = '';
        })
    };

    $scope.searchFilter = '';

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.bookmarks, function(todo) {
            count += todo.done ? 1 : 0;
        });
        return count;
    };

    $scope.tagFilter = function(req) {
        $scope.searchFilter = $scope.searchFilter === req ? '' : req
    }

    $scope.archive = function() {
        var oldTodos = $scope.bookmarks;
        $scope.bookmarks = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.bookmarks.push(todo);
        });
    };
}]);