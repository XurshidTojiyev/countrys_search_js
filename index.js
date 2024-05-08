document.getElementById("img_1").src = `${localStorage.getItem('theme_icon')}`
document.getElementById("country_text_h1").style.color =localStorage.getItem("text_color")
document.body.classList.add(`bg-${localStorage.getItem('theme')}`)
var bodyCountrys = document.getElementById("searchResults");
function getAllCountrys() {
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(response => response.forEach(element => {
        bodyCountrys.innerHTML +=
        `
        <li class="list-group-item mt-3 country border list-group-item-action ${element.name.common}">${element.flag} ${element.name.common}<br>👥 Population: ${element.population}<br>🏙️ Capital: ${element.capital}<br>🗺️Region: ${element.region}</li>
      
        `
    }) )
}


getAllCountrys()

function getCountry(cName) {
    fetch("https://restcountries.com/v3.1/name/"+cName)
    .then(response => response.json())
    .then(response => {
        bodyCountrys.innerHTML = ""
        bodyCountrys.innerHTML =
        `
        <li class="list-group-item country mt-3 border list-group-item-action ${response[0].name.common}">${response[0].flag} ${response[0].name.common}<br>👥 Population: ${response[0].population}<br>🏙️ Capital: ${response[0].capital}<br>🗺️Region: ${response[0].region}</li>
      
        `
    })
    .catch(error => {
        bodyCountrys.innerHTML +=
        `
            <center>
                <h1>country could not be found</h1>
            </center>
        `
    })
} 


document.getElementById("searchButton").onclick = () => {
    var text = document.getElementById("searchInput").value;
    getCountry(text)
}

// .onkeyup = (e) => {
// }

document.getElementById("searchInput").addEventListener('keyup', (e) => {
    bodyCountrys.innerHTML = ""
        if(e.target.value.length == 0) {
        getAllCountrys()
    }
})
var tog = document.getElementById("btn-toggle")
tog.addEventListener('click', (e) => {
    if(localStorage.getItem('theme') == "dark") {
        localStorage.setItem('theme', 'light')
        document.body.classList.add(`bg-${localStorage.getItem('theme')}`)
        localStorage.setItem("text_color", "black");
        localStorage.setItem('theme_icon', "https://www.freesvgdownload.com/wp-content/uploads/2021/04/Moonandstar.jpg")
        document.getElementById("country_text_h1").style.color =localStorage.getItem("text_color")
        window.location.reload()
    }
    else if(localStorage.getItem('theme') == "light") {
        localStorage.setItem('theme', 'dark')
        localStorage.setItem('text_color', "white")
        localStorage.setItem('theme_icon',"https://simpleicon.com/wp-content/uploads/light.svg");
        document.body.classList.add(`bg-${localStorage.getItem('theme')}`)
        window.location.reload()
    }
})