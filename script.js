$(document).ready(function()//Runs once the document is ready.
{
//Object constructor

function eventEntry(hour, text)//An entry holding the hour of and the text for the given event.
{
    this.eventHour = hour;
    this.eventText = text;
}

//Variables

var dt = luxon.DateTime.local();//The DateTime object that we get from Luxon.
var currentHour, startingtime = 10;//Starting time is the first hour that will be put in a time block.
var eventArray;//Holds all the events.

//Main functions

function initialize()//Sets up everything when the application is launched.
{
    //Saves the current hour.
    currentHour = dt.hour;
    //Sets the current date.
    setDate();
    //Build 12ish time blocks. Each time block will be assigned an hour, and from that the color it needs to be.
    createTimeBlocks();
    //Attach a function to the buttons.
    createSaveButtonListeners();
    //Check for local storage. If present, set array to saved values.
    if (localStorage.getItem("eventArray") !== null)
    {
        eventArray = JSON.parse(localStorage.getItem("eventArray"));
        restoreEvents();
    }
    else//Else instantiate an empty array.
    {
        eventArray = [];
    }
}

function createTimeBlocks()//Builds the time block elements.
{
    var timeblockcontainer = $(".container");//Grabbing the big div that houses the time blocks.
    for (var i = startingtime; i < startingtime + 12; i++)//It currently makes 12 blocks, starting at a predifined time.
    {
        //Creates the row div.
        var newrow = $("<div class=\"row time-block\"></div>");

        //Creates the time marker on the left of the block.
        var newhour = $("<div class=\"hour\"></div>").text(i + ":00");
        newrow.append(newhour);

        //Creates the textarea.
        var newtextarea = $("<textarea name=\"textarea\" class=\"flex-grow-1\" id=\"textarea\" data-hour=" + i + "></textarea>");
        newrow.append(newtextarea);

        //Creates the save button.
        var newsavebutton = $("<button class=\"saveBtn\"><i class=\"fas fa-save\"></i></button>");
        newrow.append(newsavebutton);
        
        //Assigns the row a color depending on current time.
        if (i < currentHour)
        {
            newrow.addClass("past");
            newtextarea.attr("disabled", "true");//Also disables the textarea and button if it's past time.
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

function createSaveButtonListeners()//Adds a function to the save buttons.
{
    $(".saveBtn").on("click", function()
    {
        //Get assosiated textarea.
        var textarea = $(this).siblings("textarea");
        //create a new eventEntry object.
        var entry = new eventEntry(textarea.data("hour"), textarea.val());
        //Add the object to the event array.
        var entryAlreadyExsists = false;//A toggle if the entry is new or replacing an old one.
        eventArray.forEach(function (event, index)//Check the array for a matching element.
        {
            if (event.eventHour === textarea.data("hour"))//If this event already exsists in the array.
            {
                entryAlreadyExsists = true;//Set the toggle.
                eventArray[index] = entry;//Overwrite the old one.
            }
        });
        if (!entryAlreadyExsists)//If it doesn't exsist, push the entry.
            eventArray.push(entry);
        //Save the updated array to local storage.
        localStorage.setItem("eventArray", JSON.stringify(eventArray));
    });
}

//Helper functions

function setDate ()//Sets the current date in the jumbotron.
{
    $("#currentDay").text(dt.toLocaleString(dt.DATE_MED_WITH_WEEKDAY));
}

function restoreEvents()//Function to take saved events and write them back to the text areas.
{
    eventArray.forEach(function(entry)//For every event saved in the array.
    {
        var hourofevent = entry.eventHour;//Get the hour of the event.
        var assosiatedtextarea = $("textarea[data-hour=\"" + hourofevent + "\"]");//Get the textarea that matches.
        assosiatedtextarea.val(entry.eventText);//Set the value of the textarea to the event text.
    });
}

//Calling functions

initialize();//Get the ball rolling.

});