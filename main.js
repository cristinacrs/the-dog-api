const API = "https://api.thedogapi.com/v1/images/search";
const button = document.querySelector('#new-dog');

/* 
fetch(API)
    .then(answer => answer.json())
    .then(data =>{
        const img = document.querySelector('#dog-image');
        img.setAttribute("src", data[0].url);
    });

 */

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

const setImage = async (urlApi) =>{
    try{
        const result = await fetchData(urlApi);
        const img = document.querySelector('#dog-image');
        img.setAttribute("src", result[0].url);
    } catch(error){
        console.error(error);
    }
}


button.addEventListener('click', newDog);

function newDog(){
    button.onclick= setImage(API);
}