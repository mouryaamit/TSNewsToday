/**
 * Created by Amit Mourya on 5/3/15.
 */
angular.module('starter.services', [])
    .service('loadingService',function($ionicLoading){
        this.show = function() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        this.hide = function(){
            $ionicLoading.hide();
        };
    })