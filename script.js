var DateTime = luxon.DateTime;

function testingtime ()
{
    $("#currentDay").text(DateTime.local().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));
}

testingtime();