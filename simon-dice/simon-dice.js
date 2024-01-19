let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

document.querySelector('#boton-empezar').onclick = comenzarJuego;

console.log("asd");

actualizarEstado('Toca "Empezar" para jugar!')
actualizarRonda('-');
bloquearInputUsuario();

function comenzarJuego(){
    reiniciarEstado();
    manejarRonda();
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
            resaltar($cuadro)
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

function actualizarEstado(estado,error = false){
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
    bloquearInputUsuario();
    actualizarEstado('Perdiste! toca "empezar" para jugar de nuevo', true);
}

function actualizarRonda(){
    document.querySelector('#ronda').textContent = ronda;
}
