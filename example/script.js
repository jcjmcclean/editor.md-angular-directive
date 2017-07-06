var app = angular.module("editor", []); 
app.controller("editorCtrl", function($scope) {
  // Add your markdown to the scope
  $scope.markdown = "**0** editor here";
  $scope.markdown2 = "**1** editor boom";

  $scope.submit = function() {
    console.log('Form submitted!');
    console.log('Editor 1: ' + $scope.markdown);
    console.log('Editor 2: ' + $scope.markdown2);
  };
});
app.directive('editor', [function () {
  return {
      restrict: 'E',
      scope:{
          name: '@',
          ngModel: '=ngModel'
      },
  		controller: function($scope, $timeout) {
  		  $scope.editorID = 'editor-' + $scope.$id;
  		  
  		  $timeout(function() {
    		  var testEditor = editormd($scope.editorID, {
              width  : "100%",
              height : 250,
              path    : "https://pandao.github.io/editor.md/lib/",
              watch   : true,
              onchange : function() {
                // Hack to get ng-model to update properly
                angular.element(jQuery('#' + this.id + ' textarea')).triggerHandler('input');
              }
          });
  		  }, 10)
  		},
      template:''
        +'<div class="sub-editor">'
          +'<div id="{{editorID}}">'
            +'<textarea ng-model="ngModel"></textarea>'
          +'</div>'
        +'<div>'
  };
}]);
