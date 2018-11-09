"use strict";

var $ = function (id) {
    return document.getElementById(id);
};

function getHTTPObject() {
    var xhr = false;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = false;
            }
        }
    }
    return xhr;
}


function search() {
    var request = getHTTPObject();
    var city = $("city").value;
    if (request) {
        request.onreadystatechange = function () {
            parseResponse(request);
        };
        request.open("GET", 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&mode=xml" + "&units=metric" +
            "&APPID=a335b6a584a85d950d69fb82203d5d58&cnt=9", true);
        request.send(null);
    }
}

function parseResponse(request) {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 304) {


            var data = request.responseXML;

            console.log(data);
          
            show(data);

        }
    }
}

function show(data) {
    var forecast1 = [];
    var wind1 = [];
    var dates = [];
    var details = "";
    var details2 = "";
    var name = data.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var location1 = data.getElementsByTagName("location")[1].getAttribute('latitude');
    var location2 = data.getElementsByTagName("location")[1].getAttribute('longitude');
    var cname = data.getElementsByTagName("country")[0].childNodes[0].nodeValue;
    var forecast = data.getElementsByTagName("time");
    details2 += "<div class='row'>";
    for (var i = 0; i < forecast.length; i++) {
        var time1 = data.getElementsByTagName("time")[i].getAttribute('from');
        dates.push(time1);
        var res1 = time1.split("T");
        var time2 = data.getElementsByTagName("time")[i].getAttribute('to');
        var res2 = time2.split("T");
        var sym = data.getElementsByTagName("symbol")[i].getAttribute('var');
        var temp = data.getElementsByTagName("temperature")[i].getAttribute('value');
        var min = data.getElementsByTagName("temperature")[i].getAttribute('min');
        var max = data.getElementsByTagName("temperature")[i].getAttribute('max');
        var wspeed = data.getElementsByTagName("windSpeed")[i].getAttribute('mps');
        var cloud = data.getElementsByTagName("clouds")[i].getAttribute('value');
        //data.getElementsByTagName("name")[0].childNodes[0].nodeValue
        //console.log(Forecast1);
        forecast1.push(temp);
        wind1.push(wspeed);
        details2 += "<div class='col-sm-4'> <div class='weather-card one'><div class='top'><div class='pic'><img src='http://openweathermap.org/img/w/" + sym + ".png'></div><div class='wrapper'><h1 class='heading'>" + cloud + "      </h1><h3 class='location'>" + name + " , " + cname + "</h3> <p class='temp'><span class='temp-value'>" + temp + "</span><span class='deg'>0</span><span class='temp-type'>C</span></p><p class='dates'><span class='dates-value'>" + res1[0] + "<br>" + res1[1] + " - " + res2[1] + "</span> </p></div></div><div class='bottom'><div class='wrapper'><ul class='forecast'><li class='active'>	<span class='date'>Minimum : </span><span class='temp'>" + min + "</span></li><li class='active'>	<span class='date'>Maximum : </span><span class='temp'>" + max + "</span></li><li class='active'>	<span class='date'>WindSpeed : </span><span class='temp'>" + wspeed + "</span></li></ul></div></div></div></div>";

    }
    details2 += "</div>";
    details += "<div id='info'><br><h3>" + name + " , " + cname + "</h3>" + "<h3>" + location1 + " , " + location2 + "</h3></div>";
    $('details').innerHTML = details;
    $('details').innerHTML += details2;


    /*Graphs*/

    $('myChart').style.display = "block";
	$('myChartBar').style.display = "block";
    var ctx = document.getElementById('myChart').getContext('2d');
	var ctx1 = document.getElementById('myChartBar').getContext('2d');
    
	var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: dates,
            datasets: [{
                    label: "Wind Speed",
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 132)',
                    fill: false,
                    data: wind1,
        },
                {
                    label: "Temperature",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: forecast1,
        },


         ]
        },

        // Configuration options go here
        options: {
            maintainAspectRatio: false,
            responsive: false
        }
    });
	var chartBar = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: dates,
            datasets: [{
                    label: "Wind Speed",
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 132)',
                    fill: false,
                    data: wind1,
        },
                {
                    label: "Temperature",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: forecast1,
        },


         ]
        },

        // Configuration options go here
        options: {
            maintainAspectRatio: false,
            responsive: false
        }
    });

}

window.onload = function () {
    $("find").onclick = search;
};
