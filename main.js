const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=4";

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites"

const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = "https://api.thedogapi.com/v1/images/upload";

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

        const btn = document.querySelector('#btn');
        const btn1 = document.querySelector('#btn1');
        const btn2 = document.querySelector('#btn2');
        const btn3 = document.querySelector('#btn3');


        img.setAttribute("src", result[0].url);
        img1.setAttribute("src", result[1].url);
        img2.setAttribute("src", result[2].url);
        img3.setAttribute("src", result[3].url);

        btn.onclick = ()=> saveFavoriteDog(result[0].id);
        btn1.onclick = ()=> saveFavoriteDog(result[1].id);
        btn2.onclick = ()=> saveFavoriteDog(result[2].id);
        btn3.onclick = ()=> saveFavoriteDog(result[3].id);

    } catch(error){
        console.error(error);
    }
}

const loadFavoriteDogs = async (urlApi)=>{
    try{
        const response = await fetch(API_URL_FAVORITES, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'live_bNjfPgUbNaeqBZJKTBOxgdjE8lJQGWS45tZQXYUsa60wvdkpWLPPjrTQXJ0jIRAk',
            },
        });
        const result = await response.json();

        console.log('Favorites');
        console.log(result);

        const section = document.getElementById('favorites')
        section.innerHTML = "";
    
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favorites ❤️');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        result.forEach(dog => {
            const section = document.getElementById('favorites');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Remove');

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteDog(dog.id);
            img.src = dog.image.url;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });

    }catch(error){
        console.error(error);
    }

}

async function saveFavoriteDog(id){
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'live_bNjfPgUbNaeqBZJKTBOxgdjE8lJQGWS45tZQXYUsa60wvdkpWLPPjrTQXJ0jIRAk',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    console.log('Save')
    console.log(response)

    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    }else{
        console.log("Dog saved in favorites");
        loadFavoriteDogs(API_URL_FAVORITES);
    }
}

async function deleteFavoriteDog(id){
    const response = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers:{
            'X-API-KEY': 'live_bNjfPgUbNaeqBZJKTBOxgdjE8lJQGWS45tZQXYUsa60wvdkpWLPPjrTQXJ0jIRAk',
        }
    });

    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    }else{
        console.log("Dog removed from favorites");
        loadFavoriteDogs(API_URL_FAVORITES);

    }
}

button.addEventListener('click', loadDogs);

function loadDogs(){
    button.onclick= loadRandomDogs(API_URL_RANDOM);
}

async function uploadDogPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers:{
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_bNjfPgUbNaeqBZJKTBOxgdjE8lJQGWS45tZQXYUsa60wvdkpWLPPjrTQXJ0jIRAk',
        },
        body: formData,
    })

    const data = await res.json()

    if (res.status !== 201) {
        spanError.innerHTML = `Error: ${res.status} ${data.message}`
    }
    else {
        console.log("Photo uploaded:");
        console.log({ data });
        console.log(data.url);
        saveFavoriteDog(data.id);
    }

}

loadDogs();

loadFavoriteDogs(API_URL_FAVORITES);