let levelAmount = 9;
window.onload = function() 
{
   /* $.ajax({
        url: 'startPage.php',
        method: 'GET',
        success: function(data) {
            // Assuming the returned data is a string, you can save it to the session storage like this:
            console.log(data);
            window.sessionStorage.setItem('lygis', data);
        },
        error: function() {
            console.log('Error retrieving data from the server');
        }
    });*/
    if (window.sessionStorage.getItem("isExample") === null) window.sessionStorage.setItem("isExample", true);
    document.body.style.backgroundColor = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6);
    for (let i = 1; i < levelAmount; i++)
    {
        if (window.sessionStorage.getItem("lygis") == "Lygis " + i + ".2")
        {
            window.sessionStorage.setItem("level" + (i + 1), "unlocked");
            document.getElementById("level" + (i + 1)).style.visibility = "visible";
        }
    }
    for (let i = 2; i <= levelAmount; i++)
    {
        if (window.sessionStorage.getItem("level" + i) != "locked") document.getElementById("level" + i).style.visibility = "visible";
    }
}
function goToLevel(path, level, graphNumber)
{
    window.sessionStorage.setItem("lygis", level);
    window.sessionStorage.setItem("graphNumber", graphNumber);
    window.sessionStorage.setItem("isExample", true);
    window.location.href = path;
}
function clearProgress()
{
    window.sessionStorage.setItem("lygis", null);
    window.sessionStorage.setItem("graphNumber", null);
    for (let i = 2; i <= levelAmount; i++) window.sessionStorage.setItem("level" + i, "locked");
    window.location.href = "../startPageCode/startPage.php";
}