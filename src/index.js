import { registerImage } from "./lazy";
// const url = "https://source.unsplash.com/random/photos/";
const url = "https://randomuser.me/api/";
// const url = "https://randomuser.me/api/?results=10";

//fetch data function
async function getData(url) {
  const request = await fetch(url);
  const response = await request.json();
  const data = await response.results;

  const mappedData = data.map((item) => {
    return item.picture.large;
  });

  //return array of strings (urls)
  return mappedData[0];
}

//create template function
function createTemplate(src) {
  //create parent div
  const div = document.createElement("div");

  //format div
  div.className = "p-4";

  //create image node
  const img = document.createElement("img");

  //style img node
  img.style.width = "320px";
  img.style.height = "auto";
  img.className = "mx-auto bg-gray-200";

  //load source
  //update: cambiamos la propiedad src a dataset src, para despues con lazy loading
  //acceder al dataset y setear la propiedad src
  img.dataset.src = src;

  //append node
  div.appendChild(img);

  return div;
}

//we create an array of images using the data and the templating function
async function createImages() {
  //get array of strings
  const imagesUrl = await getData(url);
  const renderedImage = createTemplate(imagesUrl);

  return renderedImage;
}

//get app
const app = document.getElementById("app");

//create button
const addImageButton = document.createElement("button");
addImageButton.className =
  "w-40 mx-auto my-8 p-2 text-center text-white bg-purple-400 hover:bg-purple-600 rounded-lg";
addImageButton.innerText = "Add image";

//add listener to button
addImageButton.addEventListener("click", async () => {
  //we fetch api images
  const getImages = await createImages();
  //we append the images to the app
  app.append(getImages);
  registerImage(getImages);
});

//append button, images to app
app.append(addImageButton);
