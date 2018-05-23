class Greeter {
    button: HTMLElement;

    constructor() {
        this.button = document.getElementById("findWeather");
        this.button.onclick = this.onButtonClick;
    }

    onButtonClick(evg) {
        let input: any = document.getElementById("pincode");
        let table: any = document.getElementById("table");
        let titleLocation: any = document.getElementById("location");

        // begin get request to api
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:52854/api/weather/zip/" + input.value, true);
        request.onreadystatechange = (event) => {
            if (request.readyState == 4 && request.status === 200) {
                var details: any = JSON.parse(request.responseText);
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
    }
}

function addHeader(tr: any) {
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

function addRow(weather: any, table: any) {
    var tr = document.createElement("tr");

    var td = document.createElement("td");
    var txt = document.createTextNode(`${weather.date}`);
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    txt = document.createTextNode(`${weather.Temp}`);
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    txt = document.createTextNode(`${weather.Humidity}`);
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    txt = document.createTextNode(`${weather.Description}`);
    td.appendChild(txt);
    tr.appendChild(td);

    td = document.createElement("td");
    var img = document.createElement("img");
    img.setAttribute('src', `http://openweathermap.org/img/w/` + weather.Icon + `.png`);
    td.appendChild(img);
    tr.appendChild(td);

    table.appendChild(tr);
}

window.onload = () => {
    var greeter = new Greeter();
};