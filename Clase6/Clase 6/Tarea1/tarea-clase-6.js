/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

function validarCantidadIntegrantes(cantidadIntegrantes){
    if(cantidadIntegrantes===0){
        return "Debe ingresar la cantidad de integrantes"
    }

    if(cantidadIntegrantes<0){
        return "Debe ingresar un numero positivo"
    }

    return "";
}

function validarEdades(edad){
    if(edad<0){
        return "Debes completar todos los campos con edades validas"
    }
    
    return "";
}

function validarFormularioCantIntegrantes(event){
    const $cantidadIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);
    const errorBotonSiguiente = validarCantidadIntegrantes($cantidadIntegrantes);

    const errores ={
        cantidadIntegrantes: errorBotonSiguiente
    };

    const esExito = manejarErroresCantIntegrantes(errores) === 0;

    if(esExito){
        quitarIntegrantes();
        crearIntegrantes($cantidadIntegrantes);
    }

}


function manejarErroresCantIntegrantes(errores){
    const keys = Object.keys(errores);
    const $errores = document.querySelector("#errores");
    limpiarErrores();
    let cantidadErrores=0;
    
    keys.forEach(function(key){
        const error = errores[key];
        
        if(error){
            cantidadErrores++;
            
            const $error = document.createElement('li');
            $error.innerText = error;
            $errores.appendChild($error);
            mostrarErrores();
        }
    });
    
    return cantidadErrores;
}

function validarFormularioCalculo(event){
    const numeros = obtenerEdades();
    const errorInput = [];
    const errorLineas = [];
    let cantidadErrores = 0;

    numeros.forEach(function(numero,index){
        if(validarEdades(numero)===""){
            return "sin error"
        }
        else{
            cantidadErrores++;
            errorInput.push(numero);
            errorLineas.push(index+1);
        }
    })

    if(errorInput.length>0){
        const $errores = document.querySelector("#errores");
        limpiarErrores();
        for(let i=0;i<cantidadErrores;i++){
            const $error = document.createElement('li');
            $error.innerText = "No se admite la edad " + errorInput[i] + " de su integrante "+ errorLineas[i] +", por favor ingrese numeros validos (en el rango 0-9)";
            $errores.appendChild($error);
            mostrarErrores();
            ocultarCalculos()
        }
    } 
    else {
        document.querySelector("#edad-menor").textContent = `La menor edad es ${obtenerMenor(numeros)}`
        document.querySelector("#edad-mayor").textContent = `La mayor edad es ${obtenerMayor(numeros)}`
        document.querySelector("#edad-promedio").textContent = `El promedio de edad es ${obtenerPromedio(numeros)}`
        mostrarCalculos();
        ocultarErrores();
    }
}

document.querySelector("#boton-siguiente").onclick = function(event){
    ocultarErrores();
    validarFormularioCantIntegrantes(event);
    event.preventDefault();
}

document.querySelector("#calcular").onclick = function(event){
    validarFormularioCalculo(event);
    event.preventDefault();
}

document.querySelector("#boton-reset").onclick = reset;


function quitarIntegrantes(){
    const $integrantes = document.querySelectorAll(".integrantes");
    for(let i=0;i<$integrantes.length;i++){
        $integrantes[i].remove();
    }
}

function crearIntegrantes(cantidadIntegrantes){
    if(cantidadIntegrantes>0){
        mostrarBotonCalcular();
    }
    else{
        reset();
    }
    for(let i=0;i<cantidadIntegrantes;i++){
        crearIntegrante(i);
    }
}

function crearIntegrante(indice){
    const $div = document.createElement('div');
    $div.className = "integrantes";

    const $label = document.createElement("label");
    $label.textContent = `Edad del integrante numero ${indice+1}`;
    const $input = document.createElement("input");
    $input.type = "number";
    $input.min = 0;
    $input.id = `integrante-numero-${indice}`;
    $input.classList.add ("integrantes");

    $div.appendChild($label);
    $div.appendChild($input);

    const $integrantes = document.querySelector("#integrantes-familia");
    $integrantes.appendChild($div);
}


function obtenerEdades(){
    const $integrantes = document.querySelectorAll(".integrantes input");
    const edades = [];
    for (let i=0;i<$integrantes.length;i++){
        edades.push(Number($integrantes[i].value));
    }

    return edades;
}

function reset(){
    limpiarErrores();
    quitarIntegrantes();
    ocultarBotonCalcular();
    ocultarCalculos();
    ocultarErrores();
}

function ocultarBotonCalcular(){
    document.querySelector("#calcular").classList.add("oculto");
}


function mostrarBotonCalcular(){
    document.querySelector("#calcular").classList.remove("oculto");
}


function ocultarCalculos(){
    document.querySelector("#resultados-calculo").classList.add("oculto");
}

function mostrarCalculos(){
    document.querySelector("#resultados-calculo").classList.remove("oculto");
}

function limpiarErrores(){
    const $errores = document.querySelector("#errores");
    $errores.innerHTML = "";
}

function ocultarErrores(){
    document.querySelector("#errores").classList.add("oculto");
}

function mostrarErrores(){
    document.querySelector("#errores").classList.remove("oculto");
}