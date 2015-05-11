/**
 * Created by VSOFT on 4/30/15.
 */
angular.module('starter.factories', ['ngResource'])
    .constant('API', {
        API: "http://tsnewstoday.com/wp-json/",
        teluguAPI: "http://telugu.tsnewstoday.com/wp-json/"
    })

    .factory('newsFactory',
    function($resource, API) {
        return $resource(API.API, {}, {
            GetAllCategory: {
                method : 'GET',
                isArray : true,
                cache : false,
                url: 'json/english.json'
//                url : API.API + 'taxonomies/category/terms'
            },
            GetPosts : {
                method : 'GET',
                isArray : true,
                cache : false,
                url : API.API + 'posts'
            },
            GetStory : {
                method : 'GET',
                isArray : false,
                cache : false,
                url : API.API + 'posts/:ID',
                data : {
                    ID:'@ID'
                }
            }
        })
    })

    .factory('teluguNewsFactory',
    function($resource, API) {
        return $resource(API.API, {}, {
            GetAllCategory: {
                method : 'GET',
                isArray : true,
                cache : false,
                url: 'json/telugu.json'
//                url : API.teluguAPI + 'taxonomies/category/terms'
            },
            GetPosts : {
                method : 'GET',
                isArray : true,
                cache : false,
                url : API.teluguAPI + 'posts'
            },
            GetStory : {
                method : 'GET',
                isArray : false,
                cache : false,
                url : API.teluguAPI + 'posts/:ID',
                data : {
                    ID:'@ID'
                }
            }
        })
    });

