/* ==========================================================
   BOB ESPONJA · Fondo de Bikini
   Índice:
   1. Datos (amigos y frases)
   2. Utilidades
   3. Amigos: tarjetas y buscador
   4. Burbujas
   5. Saludo y frases
   6. Pedido de cangreburgers
   7. Formulario de contacto
   8. Modo día / noche
   ========================================================== */


/* ---------- 1. DATOS ---------- */
const amigos = [
  {
    n: "Patricio Estrella",
    img: "images/patricio.jpg",
    pos: "50% 55%",
    d: "El mejor amigo de Bob. Vive bajo una roca y su cerebro funciona a su ritmo."
  },
  {
    n: "Calamardo Tentáculos",
    img: "images/calamardo.jpg",
    pos: "50% 35%",
    d: "Cajero gruñón y clarinetista frustrado. Su sueño es un poco de paz y silencio."
  },
  {
    n: "Don Cangrejo",
    img: "images/cangrejo.jpg",
    pos: "50% 40%",
    d: "Dueño del Crustáceo Cascarudo. Adora el dinero más que cualquier otra cosa."
  },
  {
    n: "Arenita Mejillas",
    img: "images/arenita.jpg",
    pos: "50% 40%",
    d: "Una ardilla texana científica que vive bajo una cúpula con aire. Experta en karate."
  },
  {
    n: "Plankton",
    img: "images/plankton.jpg",
    pos: "50% 40%",
    d: "Dueño del Balde de Carnada. Quiere la fórmula secreta de la Cangreburger desde siempre."
  },
  {
    n: "Gary",
    img: "images/gary.jpg",
    pos: "50% 50%",
    d: "El caracol mascota de Bob. Maúlla, es muy listo y siempre sabe cuándo es hora de comer."
  }
];

const frases = [
  "¡Estoy listo, estoy listo, estoy listo!",
  "Soy un buen vecino y un buen cocinero.",
  "¿Eres feliz, Patricio? Yo también.",
  "Hoy será el mejor día de mi vida, como ayer.",
  "La imaginación hace que todo sea posible.",
  "¡Un día más para freír hamburguesas!"
];


/* ---------- 2. UTILIDADES ---------- */

// Atajo para buscar un elemento por su id
const $ = (id) => document.getElementById(id);

// Frase al azar de la lista
const fraseAlAzar = () => frases[Math.floor(Math.random() * frases.length)];

// Quita mayúsculas y tildes para que "Tentaculos" encuentre "Tentáculos"
const normalizar = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


/* ---------- 3. AMIGOS: TARJETAS Y BUSCADOR ---------- */

// Crea una tarjeta por cada amigo
$("friends").innerHTML = amigos
  .map((a) => `
    <article class="friend" data-n="${a.n.toLowerCase()}">
      <div class="photo">
        <img src="${a.img}" style="object-position:${a.pos}" alt="${a.n}">
      </div>
      <h3>${a.n}</h3>
      <p>${a.d}</p>
    </article>
  `)
  .join("");

// Resalta las tarjetas que coinciden con lo que escribe la persona
$("buscar").addEventListener("input", (e) => {
  const busqueda = normalizar(e.target.value.trim());

  document.querySelectorAll(".friend").forEach((tarjeta) => {
    const coincide =
      busqueda.length > 1 && normalizar(tarjeta.dataset.n).includes(busqueda);
    tarjeta.classList.toggle("hit", coincide);
  });
});


/* ---------- 4. BURBUJAS ---------- */
function burbujas(cantidad = 24) {
  for (let i = 0; i < cantidad; i++) {
    const burbuja = document.createElement("span");
    const tamano = 10 + Math.random() * 34;

    burbuja.className = "bub";
    burbuja.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${tamano}px;
      height: ${tamano}px;
      animation-duration: ${3 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 1.2}s;
    `;

    $("bubbles").appendChild(burbuja);
    setTimeout(() => burbuja.remove(), 9000);
  }
}

$("burst").onclick = () => burbujas();


/* ---------- 5. SALUDO Y FRASES ---------- */
$("saludar").onclick = () => {
  const nombre = $("nombre").value.trim();

  if (!nombre) {
    $("salida").textContent = "Escribe tu nombre en el campo para que Bob te salude.";
    return;
  }

  $("salida").textContent = `¡Hola, ${nombre}! ${fraseAlAzar()}`;
  burbujas(12);
};

$("frase").onclick = () => {
  $("salida").textContent = fraseAlAzar();
};

// Saludar también con la tecla Enter
$("nombre").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("saludar").click();
});


/* ---------- 6. PEDIDO DE CANGREBURGERS ---------- */
const PRECIO = 3.99;

$("pedir").onclick = () => {
  const cantidad = parseInt($("cuantas").value, 10);

  if (!cantidad || cantidad < 1 || cantidad > 99) {
    $("pedido").textContent = "Escribe un número entre 1 y 99.";
    return;
  }

  const plural = cantidad > 1 ? "s" : "";
  const total = (cantidad * PRECIO).toFixed(2);

  $("pedido").textContent =
    `Pediste ${cantidad} cangreburger${plural}. Total: $${total}. ¡Sale en un momento!`;
};

$("limpiar").onclick = () => {
  $("cuantas").value = "";
  $("pedido").textContent = "Tu pedido aparecerá aquí.";
};


/* ---------- 7. FORMULARIO DE CONTACTO ---------- */
// Es una demostración: valida los datos pero no envía nada a ningún sitio
$("enviar").onclick = () => {
  const correo = $("correo").value.trim();
  const mensaje = $("msg").value.trim();

  if (!/^\S+@\S+\.\S+$/.test(correo)) {
    $("estado").textContent = "Escribe un correo válido, como nombre@ejemplo.com.";
    return;
  }

  if (mensaje.length < 5) {
    $("estado").textContent = "Escribe un mensaje de al menos 5 letras.";
    return;
  }

  $("estado").textContent =
    "¡Mensaje listo! Bob lo leerá cuando salga del trabajo. (Es una demo: no se envía a ningún sitio.)";
  $("msg").value = "";
  burbujas(10);
};


/* ---------- 8. MODO DÍA / NOCHE ---------- */
$("theme").onclick = () => {
  const raiz = document.documentElement;

  // Si no hay elección manual, se parte de la preferencia del sistema
  const esOscuro = raiz.dataset.theme
    ? raiz.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;

  raiz.dataset.theme = esOscuro ? "light" : "dark";
  $("theme").textContent = esOscuro ? "Modo noche" : "Modo día";
};
