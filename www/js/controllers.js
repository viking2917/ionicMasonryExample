angular.module('starter.controllers', ['masonry'])

    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, $rootScope, $timeout, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();

	$scope.remove = function(chat) {
	    Chats.remove(chat);
	};

	$scope._list = [];  
	$scope.bookid = 1;
	$scope.populateList = function() {
	    // make up some fake data with faker.js
	    for (var i = 0; i <= 9; i++) {
		var book = {
		    title: faker.lorem.words(),
		    bookid: $scope.bookid++,
		    booklink: faker.internet.url(),
		    authorstring: faker.name.findName(),
		    authorlink: faker.internet.url(),
		    coverarturl: faker.image.abstract(),
		    pubdate: faker.date.recent(),
		    feedicon: faker.internet.avatar(),
		    feedname: faker.lorem.words(),
		    feedurl: faker.internet.url(),
		    storytitle: faker.lorem.words(),
		    storydate: faker.date.recent(),
		    description: faker.lorem.paragraph()
		}
		$scope._list.push(book); 
	    }  
	    
	    console.log($scope._list.length);
	    $scope.$broadcast('scroll.infiniteScrollComplete');    
	}
	
	$scope.canWeLoadMoreContent = function() {
	    console.log('checking for more');
	    return ($scope._list.length > 249) ? false : true;
	}  
	
	$scope.populateList();
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
	$scope.settings = {
	    enableFriends: true
	};
    });
