//La ruta que vamos a cargar
//Queryparameter de limite de 2 imagenes
//Api-key: live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF

//!------RECARGA API
// API: https://documenter.getpostman.com/view/5578104/RWgqUxxh#intro

const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF";

const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF";

const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_4LB7tl6CsWZePrGsWmN5G5TCtQrRegwvqSHsb6yy8zpEpwGJqWhKUvkpooI4X9AF`;
//Se puede utilizar template para introducir contenido dinamico, en este caso el id.

//!------FUNCION GENERAR IMAGENES ALEATORIAS DE GATITOS
const botonRecarga = document.querySelector(".imgRandom");
botonRecarga.addEventListener("click", reloadImgRandom);

async function reloadImgRandom() {
  const res = await fetch(API_URL_RANDOM); //llamo la API
  const data = await res.json(); //Convierto en sintaxis que JS pueda entender

  console.log("random");
  console.log(data);

  //Condicional de status solicitud

  if (res.status !== 200) {
    //mensaje de error
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error" + res.status,
    });
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    //cada boton tendra su evento para extraer el id de cada imagen.
    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
  }
}

//!----- API IMG FAVORITES
//Donde se almacenaran las imagenes guardadas como favoritos.

async function loadFavorites() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("favorites");
  console.log(data);

  if (res.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error",
    });
  } else {
    data.forEach((michi) => {
      const section = document.getElementById("favoriteMichis");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar el michi de favoritos");

      img.src = michi.image.url;
      img.width = 150; //Ancho fijo de las imagenes. 
      btn.appendChild(btnText);

      btn.onclick = () => deleteFavoriteMichi(michi.id);

      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

//? ERROR

const pageError = document.getElementById("error");

//!-----FUNCION GUARDAR IMAGEN DE GATITO FAVORITO

async function saveFavoriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json();
  console.log("Save");
  console.log(data);

  if (res.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error" + res.status + data.message,
    });
  } else {
    console.log("Michi guardado de favoritos");
  }
}

//! FUNCION PARA ELIMINAR IMAGENES DE FAVORITOS.

async function deleteFavoriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method:'DELETE',
  });
  const data = await res.json();
  console.warn("Delete");
  console.log(data);

  if (res.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hubo un error" + res.status + data.message,
    });
  } else {
    console.log("Michi eliminado de favoritos");
  }
}

loadFavorites();
reloadImgRandom();
