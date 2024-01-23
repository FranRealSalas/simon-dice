let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

ocultarTablero();

document.querySelector('#boton-empezar').onclick = comenzarJuego;

mostrarInputObjetivo();
actualizarEstado('Ingresa el objetivo y toca "Empezar" para jugar!')
actualizarRonda('-');
bloquearInputUsuario();

function comenzarJuego(){
    ocultarInputObjetivo();
    ocultarMensajeObjetivo();
    const objetivo = Number(document.querySelector('#objetivo').value);
    
    if(objetivo===0){
        ocultarTablero();
        mostrarInputObjetivo();
        actualizarEstado("Debe seleccionar un objetivo de rondas!");
    }
    else if(objetivo<0){
        mostrarInputObjetivo();
        actualizarEstado("Debe utilizar un numero mayor a 0!");
    }
    else{
        mostrarTablero();
        reiniciarEstado();
        manejarRonda();
    }
}

function reiniciarEstado(){
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
}

function manejarRonda(){
    actualizarEstado("Turno de la maquina");
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const retraso_turno_jugador = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(function($cuadro, index){
        const retraso_ms = (index+1)*1000;
        setTimeout(function(){
            resaltar($cuadro);
        }, retraso_ms);
    });

    setTimeout(function(){
        actualizarEstado("Turno del jugador");
        desbloquearInputUsuario();
    }, retraso_turno_jugador);

    secuenciaUsuario = [];
    ronda ++;
    actualizarRonda(ronda);
}

function manejarInputUsuario(e){
    const $cuadro = e.target;
    resaltar($cuadro);
    secuenciaUsuario.push($cuadro);

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
    if($cuadro.id !== $cuadroMaquina.id){
        perder();
        return;
    }

    if(secuenciaUsuario.length === secuenciaMaquina.length){
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function actualizarEstado(estado, error = false){
    const $estado = document.querySelector("#estado");
    $estado.textContent = estado;
    if(error){
        $estado.classList.remove("alert-primary");
        $estado.classList.add("alert-danger");
    }
    else{
        $estado.classList.remove("alert-danger");
        $estado.classList.add("alert-primary");
    }
}

function obtenerCuadroAleatorio(){
    const $cuadros = document.querySelectorAll(".cuadro");
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
}

function resaltar($cuadro){
    $cuadro.style.opacity = 1;
    setTimeout(function(){
        $cuadro.style.opacity = 0.5;
    }, 500);
}

function bloquearInputUsuario(){
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = function(){

        };
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
      $cuadro.onclick = manejarInputUsuario;
    });
}

function perder(){
    mostrarMensajeObjetivo();
    mostrarInputObjetivo();
    const ronda = document.querySelector("#ronda").textContent;
    const objetivo = Number(document.querySelector("#objetivo").value);

    if(ronda>objetivo){
        actualizarMensajeObjetivo("Superaste tu objetivo!");
    }
    else{
        actualizarMensajeObjetivo("No superaste tu objetivo!", true);
    }
    bloquearInputUsuario();
    ocultarTablero();
    actualizarEstado('Perdiste! Toca "Empezar" para jugar de nuevo', true);
}

function actualizarMensajeObjetivo(mensajeObjetivo, error){
    const $mensajeObjetivo = document.querySelector("#mensaje-objetivo");
    $mensajeObjetivo.textContent = mensajeObjetivo;
    if(error){
        $mensajeObjetivo.classList.remove("alert-success");
        $mensajeObjetivo.classList.add("alert-danger");
    }
    else{
        $mensajeObjetivo.classList.remove("alert-danger");
        $mensajeObjetivo.classList.add("alert-success");
    }
}

function ocultarMensajeObjetivo(){
    document.querySelector("#mensaje-objetivo").classList.add("oculto");

}

function mostrarMensajeObjetivo(){
    document.querySelector("#mensaje-objetivo").classList.remove("oculto");

}

function actualizarRonda(){
    document.querySelector('#ronda').textContent = ronda;
}

function ocultarTablero(){
    document.querySelector("#tablero").classList.add("oculto");
    document.querySelector("#ronda").classList.add("oculto");
    document.querySelector("#ronda-texto").classList.add("oculto");

}

function mostrarTablero(){
    document.querySelector("#tablero").classList.remove("oculto");
    document.querySelector("#ronda").classList.remove("oculto");
    document.querySelector("#ronda-texto").classList.remove("oculto");
}

function ocultarInputObjetivo(){
    document.querySelector("#div-objetivo").classList.add("oculto");
}

function mostrarInputObjetivo(){
    document.querySelector("#div-objetivo").classList.remove("oculto");
}