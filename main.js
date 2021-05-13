function creation(elem, parent, content = "", attributes = []){
    let element = document.createElement(elem);
    attributes.forEach((value) => {
        element.setAttribute(value[0],value[1]);
    });
    element.textContent = content;
    parent.append(element);
    return element;
}

fetch('https://restcountries.eu/rest/v2/all')
    .then((resp) => {
    return resp.json();
    }).then((data) => {
        let container = creation('div',document.body,"",[['class','container pt-5']]);
        let row = creation('div',container,"",['class','row']);
        Country(data,row);
    }).catch((error) => {
    console.log(error);
    });

function Country(data,row){
    data.forEach((value) => {
        let column = creation('div',row,"",[
            ['class','col-lg-4 card'],
            ["style", "background:skyblue; margin-collapse:collapse; margin-radius:0%; margin:5px;"]]);

        let cardHeader = creation('div',column,value.name,[
            ['class','card-header'],
        ["style","color:white; text-align:center; background:black;"]]);

        let cardBody = creation('div',column,"",[
            ['class','card-body'],
            ['style','text-align:center; color:white; background:linear-gradient(to right,black,gray);']]);

        let flag = creation ('img',cardBody,"",[
            ['src',value.flag],
            ['class','card-img-top']]);

        let text1 = 'Capital:'+value.capital;
        let text2 = 'Region:'+ value.region;
        let text3 = 'Country Code:'+value.alpha3Code;
       
        let bodyText1 = creation("div",cardBody,text1,[['class','card-text']]);
        let bodyText2 = creation("div",cardBody,text2,[['class','card-text']]);
        let bodyText3 = creation("div",cardBody,text3,[['class','card-text']]);

        let button = creation('button',cardBody,"Click for Weather",[['class','btn btn-primary']]);
        button.onclick = () => {
            setTimeout(() => {
                weather(value);
            },2000);
        };
    });
}

function weather(value)
{
    let latitude = value.latlng[0];
    let longitude = value.latlng[1];
    url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=556c649edded81a803d594e6af04f548';
    fetch(url)
    .then((resp) => {
        return resp.json();
    }).then((data) => {
        let text1 = data.main.temp;
        alert("Temperature = " +parseFloat(text1-273.15)+'celcius');
    }).catch((error) => {
        console.log("error");
    })
}

