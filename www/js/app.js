angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories', 'starter.services', 'ngCordova'])
    .run(function ($ionicPlatform, $ionicPopup, $rootScope, $cordovaNetwork, $state,$timeout) {
        $ionicPlatform.ready(function () {
            $timeout(function(){
                navigator.splashscreen.hide();
            },100);
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $state.reload($state.current);
            })
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                $ionicPopup.confirm({
                    title: 'No Internet Connection',
                    content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                }).then(function (result) {
                        if (!result) {
                            ionic.Platform.exitApp();
                        }
                    });
            })
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if($cordovaNetwork.isOffline()){
                        $ionicPopup.alert({
                            title: 'No Internet Connection'
                        })
                        event.preventDefault();
                    }
                })
        });
        $ionicPlatform.registerBackButtonAction(function (event) {
            if ($state.current.name == "app.dashboard") {
                ionic.Platform.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);
    })
    .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider,$ionicConfigProvider) {
        $ionicConfigProvider.backButton.text("")
        $ionicConfigProvider.backButton.previousTitleText(false).text(' ')
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.dashboard', {
                cache: true,
                url: "/dashboard",
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard.html",
                        controller: 'DashboardCtrl'
                    }
                }
            })

            .state('app.category', {
                cache: false,
                url: "/category/:categoryName/:slug",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category.html",
                        controller: 'CategoryCtrl'
                    }
                }
            })

            .state('app.story', {
                cache: false,
                url: "/story/:storyId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/story.html",
                        controller: 'StoryCtrl'
                    }
                }
            })

            .state('app.gallery', {
                cache: false,
                url: "/gallery/:storyId/:storyTitle",
                views: {
                    'menuContent': {
                        templateUrl: "templates/gallery.html",
                        controller: 'GalleryCtrl'
                    }
                }
            })

            .state('telugu', {
                url: "/telugu",
                abstract: true,
                templateUrl: "templates/telugu/menu.html",
                controller: 'teluguAppCtrl'
            })

            .state('telugu.dashboard', {
                cache: true,
                url: "/dashboard",
                views: {
                    'menuContent': {
                        templateUrl: "templates/telugu/dashboard.html",
                        controller: 'teluguDashboardCtrl'
                    }
                }
            })

            .state('telugu.category', {
                cache: false,
                url: "/category/:categoryName/:slug",
                views: {
                    'menuContent': {
                        templateUrl: "templates/telugu/category.html",
                        controller: 'teluguCategoryCtrl'
                    }
                }
            })


            .state('telugu.story', {
                cache: false,
                url: "/story/:storyId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/telugu/story.html",
                        controller: 'teluguStoryCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/dashboard');
    });
