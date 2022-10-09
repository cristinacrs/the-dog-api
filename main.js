const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_bNjfPgUbNaeqBZJKTBOxgdjE8lJQGWS45tZQXYUsa60wvdkpWLPPjrTQXJ0jIRAk";

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?api_key=live_bNjfPgUbNaeqBZJKTBOxgdjE8lJQGWS45tZQXYUsa60wvdkpWLPPjrTQXJ0jIRAk"

const button = document.querySelector('#new-dog');
const spanError = document.getElementById('error');

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

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error:" + response.status;
    }else{
        const data = await response.json();
        return data;
    }
}

const loadRandomDogs = async (urlApi) =>{
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

const loadFavoriteDogs = async (urlApi)=>{
    try{
        const result = await fetchData(urlApi);
        console.log(result);

    }catch(error){
        console.error(error);
    }

}

async function saveFavoriteDogs(){
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'GFVvIZ0B3'
        }),
    });

    console.log('Save')
    console.log(response)

    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    }
}

button.addEventListener('click', newDog);

function newDog(){
    button.onclick= loadRandomDogs(API_URL_RANDOM);
}

newDog();

loadFavoriteDogs(API_URL_FAVORITES);