AngWebApp.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Hello',
    FOO: 'This is a paragraph.',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german',
    HOME_SUMMARY_SCREEN: 'Home Summary',
	USER_SUMMARY_SCREEN: 'Users Summary',
	WELCOME_MESSAGE: 'Welcome to the demo app.',
	WELCOME_CONTROLLER: 'A new and shiny controller has been made!',
	WELCOME_CONTROLLER_FOLLOWUP: 'This is the default view for your controlller. Change it (if you want, of course)!'
  });
  
  $translateProvider.translations('de', {
    TITLE: 'Hallo',
    FOO: 'Dies ist ein Paragraph.',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch'
  });
  $translateProvider.preferredLanguage('en');
});

AngWebApp.controller('Ctrl', function ($scope, $translate) {
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };
});