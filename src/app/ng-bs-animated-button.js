"use strict";angular.module("jp.ng-bs-animated-button",[]).directive("jpNgBsAnimatedButton",["$timeout",function(a){return{restrict:"AE",replace:!0,scope:{isSubmitting:"=",result:"=",options:"=?"},controller:["$scope",function(a){a.options=a.options||{},a.options={buttonDefaultClass:a.options.buttonDefaultClass||"btn-primary",buttonSubmittingClass:a.options.buttonSubmittingClass||"btn-primary",buttonSuccessClass:a.options.buttonSuccessClass||"btn-primary",buttonErrorClass:a.options.buttonErrorClass||"btn-danger",buttonSizeClass:a.options.buttonSizeClass||null,buttonDefaultText:a.options.buttonDefaultText||"Submit",buttonSubmittingText:a.options.buttonSubmittingText||"Submitting...",buttonSuccessText:a.options.buttonSuccessText||"Completed",buttonErrorText:a.options.buttonErrorText||"There was an error",buttonSubmittingIcon:a.options.buttonSubmittingIcon||"glyphicon glyphicon-refresh",buttonSuccessIcon:a.options.buttonSuccessIcon||"glyphicon glyphicon-ok",buttonErrorIcon:a.options.buttonErrorIcon||"glyphicon glyphicon-remove",formIsInvalid:a.options.formIsInvalid||"",animationCompleteTime:a.options.animationCompleteTime||"2000",iconsPosition:a.options.iconsPosition||"left"}}],template:'<button type="submit" class="btn {{buttonClass}} {{buttonSize}} btn-ng-bs-animated clearfix" ng-disabled="{{formIsInvalid}}"><div class="icons pull-{{iconsPosition}}"><span class="{{buttonSubmittingIcon}} icon-spinner icon-submit hidden"></span><span class="{{buttonSuccessIcon}} icon-result icon-success hidden"></span><span class="{{buttonErrorIcon}} icon-result icon-error hidden"></span></div><div class="text {{buttonTextFloatClass}}">{{buttonText}}</div></button>',link:function(b,c){var d=c,e={submitting:angular.element(d[0].querySelector(".icon-submit")),result:angular.element(d[0].querySelectorAll(".icon-result")),success:angular.element(d[0].querySelector(".icon-success")),error:angular.element(d[0].querySelector(".icon-error"))},f=function(){b.result=null,b.buttonClass=b.options.buttonDefaultClass,b.buttonText=b.options.buttonDefaultText,d.removeClass("is-active").attr("disabled",!1),e.result.addClass("hidden")},g=function(){return"left"===b.iconsPosition?"pull-right":"pull-left"};b.buttonClass=b.options.buttonDefaultClass,b.buttonSize=b.options.buttonSizeClass,b.formIsInvalid=b.options.formIsInvalid,b.iconsPosition=b.options.iconsPosition,b.buttonSubmittingIcon=b.options.buttonSubmittingIcon,b.buttonSuccessIcon=b.options.buttonSuccessIcon,b.buttonErrorIcon=b.options.buttonErrorIcon,b.iconsPosition=b.options.iconsPosition,b.buttonText=b.options.buttonDefaultText,b.buttonTextFloatClass=g(),b.$watch("isSubmitting",function(a){a&&(b.buttonClass=b.options.buttonSubmittingClass,b.buttonText=b.options.buttonSubmittingText,d.attr("disabled",!0).addClass("is-active"),e.submitting.removeClass("hidden"))},!0).bind(this),b.$watch("result",function(c){b.isSubmitting=null,"success"===c&&(b.buttonClass=b.options.buttonSuccessClass,b.buttonText=b.options.buttonSuccessText,e.submitting.addClass("hidden"),e.success.removeClass("hidden"),a(f,b.options.animationCompleteTime)),"error"===c&&(b.buttonClass=b.options.buttonErrorClass,b.buttonText=b.options.buttonErrorText,e.submitting.addClass("hidden"),e.error.removeClass("hidden"),a(f,b.options.animationCompleteTime))},!0).bind(this)}}}]);