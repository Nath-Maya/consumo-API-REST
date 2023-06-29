
//La ruta que vamos a cargar
//Queryparameter de limite de 2 imagenes
//Api-key: live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF

//!------RECARGA API
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF';

//!------FUNCION BOTON RECARGA
const botonRecarga = document.querySelector('.imgRandom');
botonRecarga.addEventListener('click', reloadImgRandom);

async function reloadImgRandom() {
   const res = await fetch(API_URL_RANDOM); //llamo la API
   const data = await res.json(); //Convierto en sintaxis que JS pueda entender

   console.log(data);
   const img1 = document.getElementById('img1');
   img1.src = data[0].url;

   const img2 = document.getElementById('img2');
   img2.src = data[1].url;

};

reloadImgRandom();

//* API IMG FAVORITES
//Donde se almacenaran las imagenes guardadas como favoritos.

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF';

async function loadFavorites() {
   const res = await fetch(API_URL_RANDOM);
   const data = await res.json(); 

};