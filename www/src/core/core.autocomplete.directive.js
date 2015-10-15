(function() {
    "use strict";
    angular
        .module("core")
        .directive("autoComplete", autoComplete);

    function autoComplete($ionicTemplateLoader, $ionicBackdrop, $ionicPlatform, $q, $timeout, $rootScope, $document) {
            var x = null;
            return {
                require: '?ngModel',
                restrict: 'E',
                template: '<input type="text" readonly="readonly" class="auto-complete" autocomplete="off" required>',
                replace: true,
                scope: {
                    ngModel: '=?',
                },
                link: function(scope, element, attrs, ngModel) {
                    var unbindBackButtonAction;
                
                    var searchEventTimeout = undefined;
    

                    var POPUP_TPL = [
                        '<div class="auto-complete-container modal">',
                            '<div class="bar bar-header item-input-inset">',
                                '<label class="item-input-wrapper">',
                                    '<i class="icon ion-ios7-search placeholder-icon"></i>',
                                    '<input class="google-place-search" type="search" ng-model="searchQuery" placeholder="' + (attrs.searchPlaceholder || 'Search') + '">',
                                '</label>',
                                '<button class="button button-clear">',
                                    attrs.labelCancel || 'Cancel',
                                '</button>',
                            '</div>',
                            '<ion-content class="has-header has-header">',
                                '<ion-list ng-if="' + attrs.locales +'">',
                                    '<ion-item ng-repeat="location in localities track by [$index] |  filter:searchQuery:strict" type="item-text-wrap" ng-click="selectLocation(location)" class="item item-icon-left" id="autocomplete-list">',
                                        '<i class="icon  '+ attrs.icon + '"></i>',
                                        '<h2>{{location}}</h2>',

                                    '</ion-item>',
                                '</ion-list>',
                                '<ion-list>',
                                    '<ion-item ng-repeat="location in locations |  filter:searchQuery:strict" type="item-text-wrap" ng-click="selectLocation(location)" class="item item-icon-left" id="autocomplete-list">',
                                        '<i class="icon  '+ attrs.icon + '"></i>',
                                        '<h2>{{location}}</h2>',

                                    '</ion-item>',
                                '</ion-list>',
                            '</ion-content>',
                        '</div>'
                    ].join('');

                    var popupPromise = $ionicTemplateLoader.compile({
                        template: POPUP_TPL,
                        scope: scope,
                        appendTo: $document[0].body
                    });

                    scope.locations = JSON.parse(attrs.data);

                    popupPromise.then(function(el){
                        var searchInputElement = angular.element(el.element.find('input'));

                        scope.selectLocation = function(location){
                            ngModel.$setViewValue(location);
                            ngModel.$render();

                            el.element.css('display', 'none');
                            $ionicBackdrop.release();

                            if (unbindBackButtonAction) {
                                unbindBackButtonAction();
                                unbindBackButtonAction = null;
                            }
                            
                        };  

                        scope.$on("updateLocalities", function(e, data) {
                            scope.localities = (data.localities);
                        }) ;


                        var closeOnBackButton = function(e){
                            e.preventDefault();

                            el.element.css('display', 'none');
                            $ionicBackdrop.release();

                            if (unbindBackButtonAction){
                                unbindBackButtonAction();
                                unbindBackButtonAction = null;
                            }
                        }


                        var onClick = function(e){
                            e.preventDefault();
                            e.stopPropagation();

                            $ionicBackdrop.retain();
                            unbindBackButtonAction = $ionicPlatform.registerBackButtonAction(closeOnBackButton, 250);

                            el.element.css('display', 'block');
                            searchInputElement[0].focus();
                            setTimeout(function(){
                                searchInputElement[0].focus();
                            },0);
                        };

                        var onCancel = function(e){
                            scope.searchQuery = '';
                            $ionicBackdrop.release();
                            el.element.css('display', 'none');

                            if (unbindBackButtonAction){
                                unbindBackButtonAction();
                                unbindBackButtonAction = null;
                            }
                        };

                        element.bind('click', onClick);
                        element.bind('touchend', onClick);

                        el.element.find('button').bind('click', onCancel);
                    });

                    if(attrs.placeholder){
                        element.attr('placeholder', attrs.placeholder);
                    }


                    ngModel.$formatters.unshift(function (modelValue) {
                        if (!modelValue) return '';
                        return modelValue;
                    });

                    ngModel.$parsers.unshift(function (viewValue) {
                        return viewValue;
                    });

                    ngModel.$render = function(){
                        if(!ngModel.$viewValue){
                            element.val('');
                        } else {

                            element.val(ngModel.$viewValue || '');
                        }
                    };

                    scope.$on("$destroy", function(){
                        if (unbindBackButtonAction){
                            unbindBackButtonAction();
                            unbindBackButtonAction = null;
                        }
                    });
                }
            };
        }
})();
