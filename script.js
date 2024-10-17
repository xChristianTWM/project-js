document.getElementById('start-btn').addEventListener('click', iniciarJuego);

const colores = ['verde', 'rojo', 'amarillo', 'azul'];
let secuencia = [];
let userSecuencia = [];
let aceptarInput = false;
let cuentaRegreIntervalo = null;
let cuentaTiempo = 5;

function iniciarJuego() {
    const numLuces = parseInt(prompt('¿Cuántas luces queres intentar acertar?'));

    if (isNaN(numLuces) || numLuces < 1) {
        alert('Por favor, ingresa un número válido.');
        return;
    }

    secuencia = generarSecuencia(numLuces);
    console.log('Secuencia generada: ', secuencia);

    userSecuencia = [];
    aceptarInput = false;
    clearInterval(cuentaRegreIntervalo);
    cuentaTiempo = 5;
    updateCuentaRegre();

    playSecuencia();
}

function generarSecuencia(num) {
    let secuencia = [];
    for (let i = 0; i < num; i++) {
        const randomColor = colores[Math.floor(Math.random() * colores.length)];
        secuencia.push(randomColor);
    }
    return secuencia;
}

function playSecuencia() {
    let index = 0;
    
    const interval = setInterval(() => {
        if (index >= secuencia.length) {
            clearInterval(interval);
            aceptarInput = true;
            startCuentaRegre();
            return;
        }
        
        const currentColor = secuencia[index];
        const boton = document.getElementById(currentColor);
        
        iluminarBoton(boton);
        
        index++;
    }, 1000);
}

function iluminarBoton(boton) {
    boton.style.opacity = '1';
    boton.style.transform = 'scale(1.1)';
    setTimeout(() => {
        boton.style.opacity = '0.8';
        boton.style.transform = 'scale(1)';
    }, 500);
}

document.querySelectorAll('.color-button').forEach(boton => {
    boton.addEventListener('click', userClick);
});

function userClick(event) {
    if (!aceptarInput) return;

    const clickColor = event.target.id;
    const boton = event.target;
    
    iluminarBoton(boton);

    userSecuencia.push(clickColor);
    
    const validSecuencia = userSecuencia.length - 1;
    
    if (userSecuencia[validSecuencia] !== secuencia[validSecuencia]) {
        alert('Fallaste, juego terminado.');
        resetPartida();
        return;
    }

    if (userSecuencia.length === secuencia.length) {
        alert('¡Acertaste la secuencia completa!');
        resetPartida();
    } else {
        cuentaTiempo = 5;
        updateCuentaRegre();
    }
}

function startCuentaRegre() {
    cuentaRegreIntervalo = setInterval(() => {
        cuentaTiempo--;
        updateCuentaRegre();

        if (cuentaTiempo <= 0) {
            clearInterval(cuentaRegreIntervalo);
            alert('Se acabó el tiempo, juego terminado.');
            resetPartida();
        }
    }, 1000);
}

function updateCuentaRegre() {
    document.getElementById('cuentaRegresiva').textContent = cuentaTiempo;
}

function resetPartida() {
    userSecuencia = [];
    secuencia = [];
    aceptarInput = false;
    clearInterval(cuentaRegreIntervalo);
    cuentaTiempo = 5;
    updateCuentaRegre();
}
