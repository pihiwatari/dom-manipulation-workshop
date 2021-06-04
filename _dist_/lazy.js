//intersection observer

//counters for logs
let reqImage = 0;
let loadedImage = 0;

//Esta funcion recibe una entrada en la que revisa si el elemento se encuantra dentro del viewport o no
const isIntersecting = (entry) => {
  //retornamos falso o verdadero para aplicar en el filtro
  return entry.isIntersecting;
};

export const log = () => {
  console.log(`
    Requested images: ${reqImage},
    Loaded images: ${loadedImage},
  `);
};

//Instanciamos a un IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  //Filtramos las entradas que sean visibles y por cada una
  //ejecutamos una funcion
  entries.filter(isIntersecting).forEach((entry) => {
    loadedImage++;
    log();
    //aqui ejecutamos las acciones una vez que se intersecta el elemento

    //referimos el nodo (DIV) que esta disparando el efecto usando entry como referencia
    //entry = imagen que cargamos
    const node = entry.target;

    //referenciamos a la imagen dentro del elemento div
    const image = node.firstChild;

    //le asignamos al atributo src el valor del dataset que creamos junto con la imagen
    // cambiamos las propiedades
    image.src = image.dataset.src;
    image.style.height = "auto";

    //le decimos al observer que deje de observar al nodo que dispara el evento
    observer.unobserve(node);
  });
});

//registramos una imagen cuando aparezca en el viewport
export const registerImage = (image) => {
  //suscribimos las imagenes
  reqImage++;
  observer.observe(image);
};
