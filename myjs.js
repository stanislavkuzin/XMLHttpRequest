'use strict';

//https://pxstudio.pw/blog/15-besplatnyh-api-dlya-napisaniya-testovyh-prilozhenij

const urlUser = 'https://randomuser.me/api/';

//2
function localSetUser(obj) {
    localStorage.setItem('photo', (JSON.stringify(obj.picture.large)).replace(/\"/g, ''));
    localStorage.setItem('phone', (JSON.stringify(obj.phone)).replace(/\"/g, ''));
    localStorage.setItem('names', (JSON.stringify(obj.name.first)).replace(/\"/g, '') + ' ' + (JSON.stringify(obj.name.last)).replace(/\"/g, ''));
    localStorage.setItem('country', (JSON.stringify(obj.location.country)).replace(/\"/g, ''));
    localStorage.setItem('city', (JSON.stringify(obj.location.city)).replace(/\"/g, ''));
    localStorage.setItem('mail', (JSON.stringify(obj.email)).replace(/\"/g, ''));
}

//1
function drawSection1(obj) {
    photo.src = `${obj.picture.large}`;
    phone.textContent = `${obj.phone}`;
    names.textContent = `${obj.name.first} ${obj.name.last}`;
    country.textContent = `${obj.location.country}`;
    city.textContent = `${obj.location.city}`;
    mail.textContent = `${obj.email}`;
}

function genUserAjax() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', urlUser);
    xhr.onload = () => {
        let obj = (JSON.parse(xhr.response)).results[0];
        drawSection1(obj);
        localSetUser(obj);
    }
    xhr.send();
}

button.addEventListener('click', genUserAjax);

//fetch
function drawSection2(obj) {
    photo2.src = `${obj.picture.large}`;
    phone2.textContent = `${obj.phone}`;
    names2.textContent = `${obj.name.first} ${obj.name.last}`;
    country2.textContent = `${obj.location.country}`;
    city2.textContent = `${obj.location.city}`;
    mail2.textContent = `${obj.email}`;
}

function genUserFetch() {
    fetch(urlUser)
        .then((data) => data.json())
        .then((obj) => obj.results[0])
        .then((obj) => { drawSection2(obj); return obj; })
        .then((obj) => localSetUser(obj));
}

button2.addEventListener('click', genUserFetch);

//3 API

let urlApi = 'https://api.publicapis.org/entries';
let arrApi;
let arrApiKeys = [api, auth, categoty, cors, desc, https, link];

function drawSection3() {
    for (let i = 0; i < arrApi.length; i += 1) {
        arrApiKeys[i].textContent = arrApi[i].join().replace(/,/, ' : ');
    }
}

function genNewApi() {
    fetch(urlApi)
        .then((data) => data.json())
        .then((obj) => obj.entries[Math.floor(Math.random() * 1425)])
        .then((obj) => arrApi = Object.entries(obj))
        .then(() => drawSection3() )
}

button3.addEventListener('click', genNewApi);

//3 IP
let urlGetIp = 'https://api.ipify.org?format=json';
let urlInfoIp = 'https://ipinfo.io/161.185.160.93/geo';
let arrGeoData;
let arrGeoKeys = [ip, hostname, city3, region, country3, loc, org, postal, timezone];

function drawSection4() {
    for (let i = 0; i < arrGeoKeys.length; i += 1) {
        arrGeoKeys[i].textContent = arrGeoData[i].join().replace(/,/, ' : ');
    }
}

function infoMyIp(ip) {
    urlInfoIp = urlInfoIp.replace(/\d.+\d/g, ip);
    fetch(urlInfoIp)
        .then((data) => data.json())
        .then((obj) => arrGeoData = Object.entries(obj))
        .then(() => drawSection4() )
}

function getMyIp() {
    fetch(urlGetIp)
        .then((data) => data.json())
        .then((obj) => obj.ip)
        .then((ip) => infoMyIp(ip))
}

button4.addEventListener('click', getMyIp);



















































































































