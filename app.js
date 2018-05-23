var Greeter = /** @class */ (function () {
    function Greeter() {
        this.button = document.getElementById("findWeather");
        this.button.onclick = this.onButtonClick;
    }
    Greeter.prototype.onButtonClick = function (evg) {
        var input = document.getElementById("pincode");
        var table = document.getElementById("table");
        var titleLocation = document.getElementById("location");
        // begin get request to api
        var request = new XMLHttpRequest();
        request.open("GET", "http://localhost:52854/api/weather/zip/" + input.value, true);
        request.onreadystatechange = function (event) {
            if (request.readyState == 4 && request.status === 200) {
                var details = JSON.parse(request.responseText);
                // set title and description information
                titleLocation.innerText = details.Name;
                // add header row
                var tr = document.createElement("tr");
                addHeader(tr);
                table.appendChild(tr);
                // add table rows
                details.Forecasts.forEach(function (weather) {
                    addRow(weather, table);
                });
            }
        };
        request.send('');
    };
    return Greeter;
}());
function addHeader(tr) {
    var th = document.createElement("th");
    var txt = document.createTextNode("Date");
    th.appendChild(txt);
    tr.appendChild(th);
    th = document.createElement("th");
    txt = document.createTextNode("Temp");
    th.appendChild(txt);
    tr.appendChild(th);
    th = document.createElement("th");
    txt = document.createTextNode("Humidity");
    th.appendChild(txt);
    tr.appendChild(th);
    th = document.createElement("th");
    txt = document.createTextNode("Description");
    th.appendChild(txt);
    tr.appendChild(th);
    th = document.createElement("th");
    txt = document.createTextNode("");
    th.appendChild(txt);
    tr.appendChild(th);
}
function addRow(weather, table) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var txt = document.createTextNode("" + weather.date);
    td.appendChild(txt);
    tr.appendChild(td);
    td = document.createElement("td");
    txt = document.createTextNode("" + weather.Temp);
    td.appendChild(txt);
    tr.appendChild(td);
    td = document.createElement("td");
    txt = document.createTextNode("" + weather.Humidity);
    td.appendChild(txt);
    tr.appendChild(td);
    td = document.createElement("td");
    txt = document.createTextNode("" + weather.Description);
    td.appendChild(txt);
    tr.appendChild(td);
    td = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute('src', "http://openweathermap.org/img/w/" + weather.Icon + ".png");
    td.appendChild(img);
    tr.appendChild(td);
    table.appendChild(tr);
}
window.onload = function () {
    var greeter = new Greeter();
};
//# sourceMappingURL=app.js.map