import { registerImage, log } from "./lazy";
// const url = "https://source.unsplash.com/random/photos/";
const url = "https://randomuser.me/api/";
// const url = "https://randomuser.me/api/?results=10";

//get app
const app = document.getElementById("app");

const addImageButton = document.getElementById("button");
const removeImageButton = document.getElementById("remove");

//add listener to addButton
addImageButton.addEventListener("click", async () => {
  //crear plantilla
  log();
  const images = createTemplate();
  app.append(images);

  //con esta funcion solicitamos los datos a la API
  //y creamos el dataset src para pasar al observer
  const addUrl = async () => {
    //conseguir la informacion
    const imageUrl = await getData(url);

    //agregar el atributo dataset.src al nodo image
    images.firstChild.dataset.src = await imageUrl;
  };

  await addUrl();

  registerImage(images);
});

//listener for removeButton
removeImageButton.addEventListener("click", () => {
  //Seleccionamos #app y le decimos que por cada nodo dentro de app, lo remueva
  app.querySelectorAll("div").forEach((child) => {
    child.remove();
  });
});

//----functions----//

//fetch data function
async function getData(url) {
  const request = await fetch(url);
  const response = await request.json();
  const data = await response.results;

  //return a string
  return data[0].picture.large;
}

//create template function
function createTemplate() {
  //create parent div
  const div = document.createElement("div");

  //format div
  div.className = "p-4";

  //create image node
  const img = document.createElement("img");

  //style img node
  img.style.width = "320px";
  img.style.height = "400px";
  img.className = "mx-auto bg-gray-200";

  //append node
  div.appendChild(img);

  return div;
}
