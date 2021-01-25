$(document).ready(function()
{
    //Object constructor

function eventEntry(hour, text)
{
    $(this).eventHour = hour;
    $(this).eventText = text;
}

//Variables

var dt = luxon.DateTime.local();//The DateTime object that we get from Luxon.
var currentHour, startingtime = 10;
var eventArray;

//Main functions

function initialize()//Sets up everything when the application is launched.
{
    //Saves the current hour.
    currentHour = dt.hour;
    //Sets the current date.
    setDate();
    //Build 12ish time blocks. Each time block will be assigned an hour, and from that the color it needs to be.
    createTimeBlocks();
    //Check for local storage. If present, set array to saved values.
    if (localStorage.getItem("eventArray" !== null))
    {
        eventArray = JSON.parse(localStorage.getItem("eventArray"));
        restoreEvents();//TODO need to write.
    }
    else//Else instantiate an empty array.
    {
        eventArray = [];
    }
    //Add listeners to the buttons that
        //Get the text from the assosiated textarea
        //Save that to local storage.
}

function createTimeBlocks()//Builds the time block elements.
{
    var timeblockcontainer = $(".container");
    for (var i = startingtime; i < startingtime + 12; i++)
    {
        //Creates the row div.
        var newrow = $("<div class=\"row time-block\"></div>");

        //Creates the time marker on the left of the block.
        var newhour = $("<div class=\"hour\"></div>").text(i + ":00");
        newrow.append(newhour);

        //Creates the textarea.
        var newtextarea = $("<textarea name=\"textarea\" class=\"flex-grow-1\" id=\"textarea\" data-hour=" + i + "></textarea>");

        newrow.append(newtextarea.text("This is the text area for " + i));//TODO delete text.

        //Creates the save button.
        var newsavebutton = $("<button class=\"saveBtn\"><i class=\"fas fa-save\"></i></button>");
        newrow.append(newsavebutton);
        
        //Assigns the row a color depending on current time.
        if (i < currentHour)
        {
            newrow.addClass("past");
            newtextarea.attr("disabled", "true");
            newsavebutton.attr("disabled", "true");
        }
        else if (i === currentHour)
        {
            newrow.addClass("present");
        }
        else
        {
            newrow.addClass("future");
        }

        //Adds the new row to the container.
        timeblockcontainer.append(newrow);
    }
}

//Helper functions

function setDate ()//Sets the current date in the jumbotron.
{
    $("#currentDay").text(dt.toLocaleString(dt.DATE_MED_WITH_WEEKDAY));
}

function restoreEvents()//Function to take saved events and write them back to the text areas.
{
    //TODO write this shit.
}

//Listeners

$(".saveBtn").on("click", function(){//Testing.
  alert("The save button was clicked.");
});

// $(".saveBtn").on("click", function()
// {
//     console.log("Clicking a save button.");
//     //Get assosiated textarea.
//     var textarea = $(this).siblings("textarea");
//     console.log(textarea.text());
//     //create a new eventEntry object.
//     var entry = new eventEntry(textarea.data.hour, textarea.text());
//     //Add the object to the event array.
//     eventArray.push(entry);
//     //Save the updated array to local storage.
//     localStorage.setItem("eventArray", JSON.stringify(eventArray));
// });

//Calling functions

initialize();//Get the ball rolling.

//Testing

console.log($("textarea[data-hour=18]").text());
});