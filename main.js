const ctx = document.getElementById("canvas").getContext("2d"); // Obtiene el contexto 2D del elemento canvas

const sun = new Image(); // Crea un nuevo objeto de imagen para el sol
const moon = new Image(); // Crea un nuevo objeto de imagen para la luna
const earth = new Image(); // Crea un nuevo objeto de imagen para la tierra

function init() {
  sun.src = "espacio.png"; // Establece la fuente de la imagen del sol
  moon.src = "luna.png"; // Establece la fuente de la imagen de la luna
  earth.src = "tierra.png"; // Establece la fuente de la imagen de la tierra
  window.requestAnimationFrame(draw); // Solicita que el navegador programe el método 'draw' para el próximo repaint
}

function draw() {
  ctx.globalCompositeOperation = "destination-over"; // Establece el modo de composición para que los dibujos se coloquen debajo del contenido existente
  ctx.clearRect(0, 0, 300, 300); // Limpia el canvas

  ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Establece el color de relleno con una opacidad del 40%
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)"; // Establece el color de trazo con una opacidad del 40%
  ctx.save(); // Guarda el estado actual del contexto
  ctx.translate(150, 150); // Traslada el origen del contexto al centro del canvas

  // Tierra
  const time = new Date(); // Obtiene la hora actual
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds(),
  ); // Rota el contexto basado en los segundos y milisegundos actuales
  ctx.translate(105, 0); // Traslada el contexto 105 píxeles a la derecha
  ctx.fillRect(0, -12, 50, 24); // Dibuja una sombra rectangular para la tierra
  ctx.drawImage(earth, -12, -12); // Dibuja la imagen de la tierra

  // Luna
  ctx.save(); // Guarda el estado actual del contexto
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds(),
  ); // Rota el contexto basado en los segundos y milisegundos actuales para la órbita de la luna
  ctx.translate(0, 28.5); // Traslada el contexto 28.5 píxeles hacia abajo
  ctx.drawImage(moon, -3.5, -3.5); // Dibuja la imagen de la luna
  ctx.restore(); // Restaura el estado anterior del contexto

  ctx.restore(); // Restaura el estado anterior del contexto

  ctx.beginPath(); // Inicia un nuevo camino de dibujo
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Dibuja la órbita de la tierra como un círculo
  ctx.stroke(); // Dibuja el camino definido (la órbita)

  ctx.drawImage(sun, 0, 0, 300, 300); // Dibuja la imagen del sol

  window.requestAnimationFrame(draw); // Solicita que el navegador programe el método 'draw' para el próximo repaint
}

init(); // Inicializa la animación

function clock() {
  const now = new Date();
  const canvas = document.getElementById("canvasReloj");
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.clearRect(0, 0, 300, 300); // Limpia el canvas de 300x300
  ctx.translate(150, 150); // Traslada el origen al centro del canvas
  ctx.scale(0.4, 0.4); // Escala el dibujo
  ctx.rotate(-Math.PI / 2); // Rota el contexto para que las 12 estén en la parte superior
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // Hour marks
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  const sec = now.getSeconds();
  // To display a clock with a sweeping second hand, use:
  // const sec = now.getSeconds() + now.getMilliseconds() / 1000;
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  ctx.fillStyle = "black";

  // Write Hours
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Write Minutes
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "rgb(0 0 0 / 0%)";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325FA2";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);



const img = new Image();

// Variables personalizadas - ajusta estos valores para cambiar la imagen que se desplaza, su
// dirección y la velocidad.
img.src = "panorama.jpg";
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30; // menor es más rápido
const y = -4.5; // desplazamiento vertical
const desiredWidth = 800; // ancho deseado para la imagen
const desiredHeight = 200; // alto deseado para la imagen

// Programa principal
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;

img.onload = () => {
  // Ajuste de tamaño de imagen deseado
  imgW = desiredWidth;
  imgH = desiredHeight;

  // Comprobación para ajustar las dimensiones de borrado
  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);

  // Obtener el contexto del canvas
  const ctx = document.getElementById("canvasPanorama").getContext("2d");

  // Establecer la tasa de refresco
  return setInterval(drawPanorama, speed);
};

function drawPanorama() {
  const ctx = document.getElementById("canvasPanorama").getContext("2d");
  ctx.clearRect(0, 0, clearX, clearY); // limpia el canvas

  // Si la imagen es <= al tamaño del canvas
  if (imgW <= canvasXSize) {
    // Restablecer, comenzar desde el principio
    if (x > canvasXSize) {
      x = -imgW + x;
    }

    // Dibujar imagen adicional1
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }

    // Dibujar imagen adicional2
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    // Imagen es > tamaño del canvas
    // Restablecer, comenzar desde el principio
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }

    // Dibujar imagen adicional
    if (x > canvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }

  // Dibujar imagen
  ctx.drawImage(img, x, y, imgW, imgH);

  // Cantidad a mover
  x += dx;
}
