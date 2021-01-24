//Variables

var dt = luxon.DateTime.local();//The DateTime object that we get from Luxon.
var currentHour, startingtime = 10;

//Main functions

function initialize()//Sets up everything when the application is launched.
{
    currentHour = dt.hour;
    setDate();
    //Build 12ish time blocks
    createTimeBlocks();
    //Each time block will be assigned an hour, and from that the color it needs to be.
    //Add listeners to the buttons that
        //Get the text from the assosiated textarea
}

function createTimeBlocks()
{
    var timeblockcontainer = $(".container");
    for (var i = startingtime; i < startingtime + 12; i++)
    {
        //Creates the row div.
        var newrow = $("<div class=\"row time-block\"></div>");

        //Assigns the row a color depending on current time.
        if (i < currentHour)
        {
            newrow.addClass("past");
        }
        else if (i === currentHour)
        {
            newrow.addClass("present");
        }
        else
        {
            newrow.addClass("future");
        }

        //Creates the time marker on the left of the block.
        var newhour = $("<div class=\"hour\"></div>").text(i + ":00");
        newrow.append(newhour);

        //Creates the textarea.
        var newtextarea = $("<textarea name=\"textarea\" class=\"flex-grow-1\" id=\"textarea\"></textarea>");

        newrow.append(newtextarea);

        //Creates the save button.
        var newsavebutton = $("<button class=\"saveBtn\"><i class=\"fas fa-save\"></i></button>");
        newrow.append(newsavebutton);

        //Adds the new row to the container.
        timeblockcontainer.append(newrow);
    }
}

//Helper functions

function setDate ()//Sets the current date in the jumbotron.
{
    $("#currentDay").text(dt.toLocaleString(dt.DATE_MED_WITH_WEEKDAY));
}

//Listeners

//Calling functions

initialize();//Get the ball rolling.

//Testing

console.log(currentHour);