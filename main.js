const API = "https://api.thedogapi.com/v1/images/search?limit=4";
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
        console.log(result);
        const img = document.querySelector('#dog-image');
        const img1 = document.querySelector('#dog-image1');
        const img2 = document.querySelector('#dog-image2');
        const img3 = document.querySelector('#dog-image3');


        img.setAttribute("src", result[0].url);
        img1.setAttribute("src", result[1].url);
        img2.setAttribute("src", result[2].url);
        img3.setAttribute("src", result[3].url);

    } catch(error){
        console.error(error);
    }
}


button.addEventListener('click', newDog);

function newDog(){
    button.onclick= setImage(API);
}

newDog();