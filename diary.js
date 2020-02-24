/*
Ohjelma toimii full stackina, mutta kömpelösti eikä mitenkään loogisesti!!
 */

const list = document.getElementById("list"); //se mihin koko roska tulostetaan
const side = document.getElementById("side"); //pikkuinfo -tulostus

const topic = document.getElementById("topi");
const description = document.getElementById("desc");
const link = document.getElementById("link");
const done = document.getElementById("stat");
let diary = {}; //yhden topicin tiedot
let allTopics = []; //kaikkien topicien tiedot

let req = new XMLHttpRequest();

//tallentaa käyttäjän antamat tiedot tietokantaan. Topicien päivitetty lista ei tulostu ennenkuin selain päivitetään.
document.getElementById("save").onclick = function() {
    diary = {title: topic.value, description: description.value, additionalsource: link.value, complete: done.value};
    side.innerHTML = "<code>" + " tallennettu"; //jotenkin vain 1 sek näkyy??

    req.open('POST', "http://localhost:8080/api");
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(diary));
};


//hakee tietokannasta topicit ja tulostaa listana, tulostaa onclickista putkeen listat niin monta kertaa kun klikataan
//näyttää päivitetyn listan vasta kun selain päivitetään
let put = new XMLHttpRequest();
document.getElementById("show").onclick = function() {

    list.innerHTML = "";
    let jason = JSON.parse(put.response);
    jason.forEach(h => {
        allTopics.push(h)
        console.log(h)
    })
    for (let i = 0; i < allTopics.length; i++) {
        list.innerHTML += "<li>" + "id: " + allTopics[i].id + " topic: " + allTopics[i].title + " description: " + allTopics[i].description;
    }
}
put.open("GET", "http://localhost:8080/api", true);
put.send(null);


