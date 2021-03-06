angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, newsFactory, loadingService, $rootScope) {
        $scope.exit = function () {
            ionic.Platform.exitApp();
        }
    })

    .controller('DashboardCtrl', function ($scope, $stateParams, newsFactory, loadingService, $rootScope, $ionicSlideBoxDelegate,$interval) {
        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }
        $scope.previousSlide = function() {
            $ionicSlideBoxDelegate.previous();
        }

        $scope.doRefresh = function () {
            loadingService.show();
            $rootScope.engCategories = null || []
            $scope.aImages = null || [];
            newsFactory.GetAllCategory().$promise.then(function (data) {
                $rootScope.engCategories = null || [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent == null && data[i].slug != 'uncategorized' && data[i].slug != 'headline' && data[i].slug != 'photo-gallery') {
                        $rootScope.engCategories.push(data[i]);
                    }
                }
                newsFactory.GetPosts({
                    'filter[posts_per_page]': 8,
                    'fields': 'ID,title'
                }).$promise.then(function (data) {
                        $scope.posts = data;
                        $scope.$broadcast('scroll.refreshComplete');
                        loadingService.hide();
                    }, function (error) {
                        $scope.$broadcast('scroll.refreshComplete');
                        loadingService.hide();
                    })
            }, function (error) {
                $scope.$broadcast('scroll.refreshComplete');
                loadingService.hide();
            })

            newsFactory.GetPosts({
                'filter[category_name]': 'photo-gallery'
            }).$promise.then(function (data) {
                    $scope.aImages = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicSlideBoxDelegate.slide(0);
                    loadingService.hide();
                    $interval(function(){
                        if($ionicSlideBoxDelegate.currentIndex() == ($ionicSlideBoxDelegate.slidesCount()-1)){
                            $ionicSlideBoxDelegate.slide(0)
                        }else{
                            $scope.nextSlide();
                        }
                    }, 5000);
                }, function (error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                })
        }
        $scope.doRefresh();
    })

    .controller('CategoryCtrl', function ($scope, $stateParams, newsFactory, loadingService) {
        $scope.loadMore = function () {
            loadingService.show();
            newsFactory.GetPosts({
                'filter[order]': 'DESC',
                'filter[category_name]': $stateParams.slug,
                'filter[posts_per_page]': 5,
                'page': $scope.page_id,
                'fields': 'ID,title'
            }).$promise.then(function (data) {
                    if (data.length == 0) {
                        $scope.loadMoreStatus = false;
                    }
                    $scope.posts = $scope.posts.concat(data);
                    $scope.page_id++;
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.loaded = true;
                    loadingService.hide();
                }, function (error) {
                    $scope.loaded = true;
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                })
        }
        $scope.doRefresh = function () {
            $scope.posts = null || []
            $scope.title = $stateParams.categoryName;
            $scope.page_id = 1;
            $scope.loadMoreStatus = true;
            $scope.loaded = false;
            $scope.loadMore();
        }
        $scope.doRefresh();
    })

    .controller('StoryCtrl', function ($scope, $stateParams, newsFactory, loadingService) {
        $scope.doRefresh = function () {
            loadingService.show();
            $scope.story = null || {}
            newsFactory.GetStory({
                'ID': $stateParams.storyId
            }).$promise.then(function (data) {
                    $scope.story = null || {};
                    $scope.story = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                }, function (error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                })
        }
        $scope.doRefresh();
    })

    .controller('GalleryCtrl', function ($scope, $stateParams, newsFactory, loadingService) {
        $scope.doRefresh = function () {
            loadingService.show();
            $scope.MediaList = null || {}
            $scope.storyTitle = $stateParams.storyTitle;
            newsFactory.GetMedia({
                'filter[post_parent]': $stateParams.storyId
            }).$promise.then(function (data) {
                    $scope.MediaList = null || {};
                    $scope.MediaList = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                }, function (error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                })
        }
        $scope.doRefresh();
    })

    .controller('teluguAppCtrl', function ($scope, teluguNewsFactory, loadingService, $rootScope) {
        $scope.exit = function () {
            ionic.Platform.exitApp();
        }
    })

    .controller('teluguDashboardCtrl', function ($scope, $stateParams, teluguNewsFactory, loadingService, $rootScope) {
        $scope.doRefresh = function () {
            loadingService.show();
            $rootScope.telCategories = null || []
            teluguNewsFactory.GetAllCategory({'filter[order]': 'DESC'}).$promise.then(function (data) {
                $rootScope.telCategories = null || [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent == null && data[i].slug != 'uncategorized' && data[i].slug != 'headline') {
                        $rootScope.telCategories.push(data[i]);
                    }
                }
                teluguNewsFactory.GetPosts({
                    'filter[posts_per_page]': 8,
                    'fields': 'ID,title'
                }).$promise.then(function (data) {
                        $scope.posts = data;
                        $scope.$broadcast('scroll.refreshComplete');
                        loadingService.hide();
                    }, function (error) {
                        $scope.$broadcast('scroll.refreshComplete');
                        loadingService.hide();
                    })
            }, function (error) {
                $scope.$broadcast('scroll.refreshComplete');
                loadingService.hide();
            })
        }
        $scope.doRefresh();
    })

    .controller('teluguCategoryCtrl', function ($scope, $stateParams, teluguNewsFactory, loadingService) {
        $scope.loadMore = function () {
            loadingService.show();
            teluguNewsFactory.GetPosts({
                'filter[order]': 'DESC',
                'filter[category_name]': $stateParams.slug,
                'filter[posts_per_page]': 5,
                'page': $scope.page_id,
                'fields': 'ID,title'
            }).$promise.then(function (data) {
                    if (data.length == 0) {
                        $scope.loadMoreStatus = false;
                    }
                    $scope.posts = $scope.posts.concat(data);
                    $scope.page_id++;
                    $scope.loaded = true;
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                }, function (error) {
                    $scope.loaded = true;
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                })
        }
        $scope.doRefresh = function () {
            $scope.posts = null || []
            $scope.title = $stateParams.categoryName;
            $scope.page_id = 1;
            $scope.loadMoreStatus = true;
            $scope.loaded = false;
            $scope.loadMore();
        }
        $scope.doRefresh();
    })

    .controller('teluguStoryCtrl', function ($scope, $stateParams, teluguNewsFactory, loadingService) {
        $scope.doRefresh = function () {
            loadingService.show();
            $scope.story = null || {}
            teluguNewsFactory.GetStory({
                'ID': $stateParams.storyId
            }).$promise.then(function (data) {
                    $scope.story = null || {};
                    $scope.story = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                }, function (error) {
                    $scope.$broadcast('scroll.refreshComplete');
                    loadingService.hide();
                })
        }
        $scope.doRefresh();
    })


