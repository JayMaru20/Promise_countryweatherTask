function creation(elem, parent, content = "", attributes = []){
    let element = document.createElement(elem);
    attributes.forEach((value) => {
        element.setAttribute(value[0], value[1]);
    });
    element.textContent = content;
    parent.append(element);
    return element;
}

fetch('https://restcountries.eu/rest/v2/all')
    .then((resp) => {
    return resp.json();
    }).then((resp) => {
        let container = creation('div',document.body,"",[['class', 'container pt-5']]);
        let row = creation('div',container,"",[['class', 'row'],['style','margin:10px;']]);
        Country(resp,row);
    }).catch((error) => {
    console.log(error);
});

function Country(resp,row){
    resp.forEach((value) => {
        let col = creation('div',row,'',[['class','col-lg-4 card p-3'],['style', 'background:skyblue;']]);

        let header = creation('div',col , value.name ,[['class','card-header'],['style','color:white; text-align:center; background:black;']]);

        let mainBody = creation('div',col,'',[['class','card-body'],['style','text-align:center; color:white; background:linear-gradient(to right,black,gray);']]);

        let flag = creation ('img',mainBody,'',[['src',value.flag],['class','card-img-top']]);

        let text1 = 'Capital:'+value.capital;
        let text2 = 'Region:'+ value.region;
        let text3 = 'Country Code:'+value.alpha3Code;
       
        let bodyText1 = creation("p",mainBody,text1,[['class','card-text']]);
        let bodyText2 = creation("p",mainBody,text2,[['class','card-text']]);
        let bodyText3 = creation("p",mainBody,text3,[['class','card-text']]);

        let button = creation('button',mainBody,"Click for Weather",[['class','btn btn-primary']]);
        button.onclick = () => {
            setTimeout(() => {
                weather(value, mainBody);
            },2000);
        };
    });
}

function weather(value, mainBody)
{
    let latitude = value.latlng[0];
    let longitude = value.latlng[1];
    url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=556c649edded81a803d594e6af04f548';
    fetch(url)
    .then((resp) => {
        return resp.json();
    }).then((tempdata) => {
        let text1 = tempdata.main.temp;
        alert("Temperature = " +parseFloat(text1-273.15)+'celcius');
    }).catch((error) => {
        console.log("error");
    })
}

