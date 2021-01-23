//Variables

var DateTime = luxon.DateTime;//The DateTime object that we get from Luxon.

//Main functions

function initialize()//Sets up everything when the application is launched.
{
    setDate();
}

//Helper functions

function setDate ()//Sets the current date in the jumbotron.
{
    $("#currentDay").text(DateTime.local().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));
}

//Listeners

//Calling functions

initialize();//Get the ball rolling.