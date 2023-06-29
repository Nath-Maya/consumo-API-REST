console.log('Hello, world');


//La ruta que vamos a cargar
//Queryparameter de limite de 3 imagenes
//Api-key: live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF';

async function reload() {
   const res = await fetch(API_URL); //llamo la API
   const data = await res.json(); //Convierto en sintaxis que JS pueda entender


   console.log(data);
   const img1 = document.getElementById('img1');
   img1.src = data[0].url;

   const img2 = document.getElementById('img2');
   img2.src = data[1].url;

   const img3 = document.getElementById('img3');
   img3.src = data[2].url;
};

reload();