const canvas = document.getElementById('semaforo');
const ctx = canvas.getContext('2d');

// Dibujar fondo del semáforo
ctx.fillStyle = '#2f2f2f';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Función para dibujar un círculo
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Dibujar los círculos del semáforo
drawCircle(canvas.width / 2, 50, 20, 'red');     // Círculo rojo en la parte superior
drawCircle(canvas.width / 2, 150, 20, 'yellow'); // Círculo amarillo en el centro
drawCircle(canvas.width / 2, 250, 20, 'green');  // Círculo verde en la parte inferior
