angular.module('starter.controllers', ['masonry'])

    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, $timeout, Chats) {
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
	    // timeout here, because masonry and ionic's infinite-scroll get into competition over who can refresh the screen faster, so that all the pages render immediately. Slow it down a bit. Infinite scroll is checking screen high as soon as the items are added to the list, but masonry hasn't gotten to updating the layout, so the height is incorrect or zero, causing another infinite scroll repaint.
	    //In a real life situation with a web call, there'll be latency.

	    $timeout(function () {
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
	    }, 500);
	}
	
	$scope.canWeLoadMoreContent = function() {
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
