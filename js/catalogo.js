const productos = [
  {
    id: "GA001",
    nombre: "Guitarra Acústica Folk Yamaha F310",
    categoria: "guitarras-acusticas",
    precio: 129990,
    descripcion:
      "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GA002",
    nombre: "Guitarra Acústica Dreadnought Fender CD-60S",
    categoria: "guitarras-acusticas",
    precio: 189990,
    descripcion:
      "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GA003",
    nombre: "Guitarra Acústica Clásica 4/4 Yamaha C40",
    categoria: "guitarras-acusticas",
    precio: 89990,
    descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GA004",
    nombre: "Guitarra Electroacústica Takamine GN20CE",
    categoria: "guitarras-acusticas",
    precio: 349990,
    descripcion: "Pickup integrado, afinador incorporado.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GA005",
    nombre: "Guitarra 3/4 Niños Yamaha JR1",
    categoria: "guitarras-acusticas",
    precio: 79990,
    descripcion: "Tamaño reducido para niños de 6 a 10 años.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GE001",
    nombre: "Guitarra Eléctrica Stratocaster Squier Affinity Strat",
    categoria: "guitarras-electricas",
    precio: 249990,
    descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GE002",
    nombre: "Guitarra Eléctrica Les Paul Epiphone Les Paul Std",
    categoria: "guitarras-electricas",
    precio: 329990,
    descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GE003",
    nombre: "Guitarra Eléctrica SG Epiphone SG Standard",
    categoria: "guitarras-electricas",
    precio: 319990,
    descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GE004",
    nombre: "Guitarra Eléctrica Telecaster Squier Affinity Tele",
    categoria: "guitarras-electricas",
    precio: 239990,
    descripcion: "Cuerpo álamo, clavijero vintage, 2 pastillas single.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "GE005",
    nombre: "Guitarra Eléctrica Semi-hollow Epiphone ES-335",
    categoria: "guitarras-electricas",
    precio: 549990,
    descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BA001",
    nombre: "Bajo Eléctrico 4 Cuerdas Squier Affinity PJ",
    categoria: "bajos-electricos",
    precio: 299990,
    descripcion: "Pickup PJ, cuerpo álamo, mástil arce.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BA002",
    nombre: "Bajo Eléctrico Jazz Bass Fender Player Jazz",
    categoria: "bajos-electricos",
    precio: 699990,
    descripcion: "Alder body, 2 Alnico V Jazz single-coil.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BA003",
    nombre: "Bajo Acústico 4 Cuerdas Yamaha APX700II",
    categoria: "bajos-electricos",
    precio: 429990,
    descripcion: "Electroacústico, afinador incorporado.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BT001",
    nombre: "Batería Acústica 5 piezas Pearl Roadshow",
    categoria: "baterias",
    precio: 599990,
    descripcion: "Incluye stands, platillos y pedal de bombo.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BT002",
    nombre: "Batería Electrónica 8 pads Roland TD-02KV",
    categoria: "baterias",
    precio: 799990,
    descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BT003",
    nombre: 'Caja Snare 14" Pearl STE1450',
    categoria: "baterias",
    precio: 89990,
    descripcion: 'Acero, 14x5", 10 tensores.',
    img: "ruta-imagen.jpg",
  },
  {
    id: "BT004",
    nombre: 'Platillo Hi-Hat 14" Zildjian A Series',
    categoria: "baterias",
    precio: 149990,
    descripcion: "Latón B20, sonido brillante y claro.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "BT005",
    nombre: 'Platillo Crash 16" Zildjian A Series',
    categoria: "baterias",
    precio: 129990,
    descripcion: "Latón B20, ataque rápido.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "TC001",
    nombre: "Teclado Digital 61 teclas Yamaha PSR-E373",
    categoria: "teclados-y-pianos",
    precio: 249990,
    descripcion: "61 teclas sensibles al tacto, 622 voces.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "TC002",
    nombre: "Piano Digital 88 teclas Yamaha P-45",
    categoria: "teclados-y-pianos",
    precio: 499990,
    descripcion: "88 teclas pesadas, 10 voces, pedal sustain incluido.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "TC003",
    nombre: "Sintetizador 49 teclas Arturia MiniLab MKII",
    categoria: "teclados-y-pianos",
    precio: 129990,
    descripcion: "MIDI controller, 49 mini teclas.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "TC004",
    nombre: "Teclado MIDI 88 teclas M-Audio Hammer 88",
    categoria: "teclados-y-pianos",
    precio: 399990,
    descripcion: "88 teclas martillo, sin sonidos propios.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AM001",
    nombre: "Amplificador Guitarra 15W Fender Frontman 15G",
    categoria: "amplificadores",
    precio: 99990,
    descripcion: "15W, distorsión incorporada, entrada auxiliar.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AM002",
    nombre: "Amplificador Guitarra 40W Marshall MG40GFX",
    categoria: "amplificadores",
    precio: 299990,
    descripcion: "40W, 4 canales, efectos digitales integrados.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AM003",
    nombre: "Amplificador Bajo 100W Hartke HD100",
    categoria: "amplificadores",
    precio: 449990,
    descripcion: "100W, tweeter integrado, ecualizador de 4 bandas.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AM004",
    nombre: "Amplificador Acústico 40W Fishman Loudbox Mini",
    categoria: "amplificadores",
    precio: 499990,
    descripcion: "60W, 2 canales, reverb y chorus incorporados.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "MI001",
    nombre: "Micrófono Dinámico Cardioide Shure SM58",
    categoria: "microfonos",
    precio: 149990,
    descripcion: "Estándar industria para voz en vivo.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "MI002",
    nombre: "Micrófono Dinámico Instrumento Shure SM57",
    categoria: "microfonos",
    precio: 139990,
    descripcion: "Ideal para captura de instrumentos y amplificadores.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "MI003",
    nombre: "Micrófono Condensador Audio-Tech. AT2020",
    categoria: "microfonos",
    precio: 199990,
    descripcion: "Cardioide, XLR, ideal para grabación en estudio.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "MI004",
    nombre: "Micrófono USB de Condensador Blue Yeti",
    categoria: "microfonos",
    precio: 299990,
    descripcion: "USB, 4 patrones polares, ideal para streaming y podcast.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "PE001",
    nombre: "Pedal Distorsión Boss DS-1",
    categoria: "pedales-de-efectos",
    precio: 79990,
    descripcion: "Clásico pedal de distorsión, 3 controles.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "PE002",
    nombre: "Pedal Reverb Boss RV-6",
    categoria: "pedales-de-efectos",
    precio: 179990,
    descripcion: "8 modos de reverb, control de shimmer.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "PE003",
    nombre: "Pedal Multi-efectos Boss ME-80",
    categoria: "pedales-de-efectos",
    precio: 349990,
    descripcion: "Diseño tipo pedalboard, 8 efectos simultáneos.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "PE004",
    nombre: "Pedal Tuner Cromático Boss TU-3",
    categoria: "pedales-de-efectos",
    precio: 89990,
    descripcion: "Afinador cromático, indicador de tono.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "PE005",
    nombre: "Pedal Delay MXR Carbon Copy",
    categoria: "pedales-de-efectos",
    precio: 179990,
    descripcion: "Delay analógico cálido, tiempo 600ms.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "PE006",
    nombre: "Pedal Overdrive Ibanez TS9",
    categoria: "pedales-de-efectos",
    precio: 99990,
    descripcion: "Tube Screamer clásico, sonido suave y orgánico.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC001",
    nombre: "Cuerdas Guitarra Eléctrica 09-42 Ernie Ball Super Slinky",
    categoria: "accesorios",
    precio: 8990,
    descripcion: "Juego 6 cuerdas, calibre ligero.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC002",
    nombre: "Cuerdas Guitarra Acústica 12-53 Ernie Ball Earthwood",
    categoria: "accesorios",
    precio: 10990,
    descripcion: "Bronce fósforo, sonido cálido.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC003",
    nombre: "Cuerdas Bajo 45-105 Ernie Ball Regular Slinky",
    categoria: "accesorios",
    precio: 14990,
    descripcion: "Cuerdas de níquel enrollado, set 4 cuerdas.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC004",
    nombre: "Púas de Guitarra x10 (0.73mm) Fender 351",
    categoria: "accesorios",
    precio: 3990,
    descripcion: "Celulosa, grosor medio.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC005",
    nombre: "Capotraste Guitarra Dunlop Trigger",
    categoria: "accesorios",
    precio: 12990,
    descripcion: "Capotraste de resorte, compatible 6 cuerdas.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC006",
    nombre: "Afinador de Clip Snark SN-5",
    categoria: "accesorios",
    precio: 8990,
    descripcion: "Afinador cromático de clip, pantalla giratoria.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC007",
    nombre: "Cable Instrumento 3m Monster S100-I-3",
    categoria: "accesorios",
    precio: 12990,
    descripcion: "Cable trenzado, conectores dorados, 3 metros.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC008",
    nombre: "Cable Instrumento 6m Monster S100-I-6",
    categoria: "accesorios",
    precio: 17990,
    descripcion: "Cable trenzado, conectores dorados, 6 metros.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC009",
    nombre: "Soporte Guitarra de Piso Hercules GS302B",
    categoria: "accesorios",
    precio: 22990,
    descripcion: "Soporte plegable con enganche automático.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "AC010",
    nombre: "Soporte Guitarra de Pared Hercules WAH-202",
    categoria: "accesorios",
    precio: 18990,
    descripcion: "Montaje a pared, enganche automático.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "ES001",
    nombre: "Interfaz de Audio 2x2 USB Focusrite Scarlett Solo",
    categoria: "estudio-y-grabacion",
    precio: 149990,
    descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "ES002",
    nombre: "Auriculares de Estudio Audio-Tech. ATH-M20x",
    categoria: "estudio-y-grabacion",
    precio: 79990,
    descripcion: "Circumaurales, respuesta 15Hz-20kHz.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "ES003",
    nombre: "Auriculares de Estudio Pro Audio-Tech. ATH-M50x",
    categoria: "estudio-y-grabacion",
    precio: 219990,
    descripcion: "Referencia de industria, sonido neutro y detallado.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "ES004",
    nombre: 'Monitor de Estudio 5" Yamaha HS5',
    categoria: "estudio-y-grabacion",
    precio: 349990,
    descripcion: "Altavoz activo, respuesta plana, ideal mezcla.",
    img: "ruta-imagen.jpg",
  },
  {
    id: "ES005",
    nombre: "Pop Filter para Micrófono Sennheiser MZP 40",
    categoria: "estudio-y-grabacion",
    precio: 14990,
    descripcion: "Doble malla, brazo flexible con clip.",
    img: "ruta-imagen.jpg",
  },
];

/*use estos gets para atrapar las etiquetas y controlarlas por el js*/

/* captura el <section id="grilla"> para saber donde meter las tarjetas visuales*/
const cajaProductos = document.getElementById("grilla");
/* captura el <select id="filtro-categoria"> para saber que hace el usuario*/
const seleccionarCategoria = document.getElementById("filtro-categoria");


/* esta funcion recibe la lista de productos y los dibuja en la pantlla*/
function mostrar(listaProductos) {
    /* aca vacia la grilla por completo. si no lo hiciera al filtrar se acumularia uno encima de otros*/
  cajaProductos.innerHTML = "";


  /*itera la lista*/ 
  listaProductos.forEach((producto) => {
    /*por cada producto que encuentre, crea una etiqueta article nueva */
    const articulo = document.createElement("article");
    articulo.className = "col-12 col-md-6 col-lg-4";

    /* aca trabaja bootstrap y inserta los datos que estan en {} */
    articulo.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.img}" class="card-img-top producto-img" alt="${producto.nombre}" >
                <div class="card-body d-flex flex-column">
                    <h2 class="card-title h5">${producto.nombre}</h2>
                    <p class="card-text text-muted mb-2">${producto.descripcion}</p>
                    <p class="card-text fs-4 fw-bold text-primary mt-auto">$${producto.precio.toLocaleString("es-CL")}</p>
                    <button class="btn btn-primary w-100 mt-2">Añadir al carrito</button>
                </div>
            </div>
        `;

        /* aqui pega la tarjeta que agarro y la pone en el html para que el usuario la vea */
        cajaProductos.appendChild(articulo)
  });
}

/* este es el escuchador, se activa cuando el usuario usa el filtrador*/
seleccionarCategoria.addEventListener("change", function(evento){
    /* Extrae el valor del clickeo del usuario */
    const categoriaElegida = evento.target.value

    
    if(categoriaElegida === "todos"){
        mostrar(productos)

    }else{
        const filtrados = productos.filter(prod => prod.categoria == categoriaElegida)
        mostrar(filtrados)
    }
})

mostrar(productos)
