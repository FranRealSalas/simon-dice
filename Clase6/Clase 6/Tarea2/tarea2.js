/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

function validarSalarios(salario){
    if(salario<0){
        return "Debe ingresar un salario valido, solo se permiten numeros positivos"
    }
    if(!/^[0-9]+$/i.test(salario)){
        return "Solo se admiten numeros enteros"
    }
    return "";
}

function validarFormularioSalarios(event){
    const $salarios = document.querySelectorAll(".salarios-input");
    const salarios = [];
    for (let i=0;i<$salarios.length;i++){
        salarios.push(Number($salarios[i].value));
    }

    const objetoErrores = [];

    let cantidadErrores = 0;
    
    salarios.forEach(function(salario,index){
        const elError = validarSalarios(salario);
        if(elError===""){
            return "sin error"
        }
        else{
            cantidadErrores++;
            objetoErrores.push({
                linea: index+1,
                texto: elError,
                input: salario
            });
        }
    })
    
    if(objetoErrores.length>0){
        mostrarErrores();
        ocultarResultados();
        const $errores = document.querySelector("#errores");
        $errores.innerHTML = "";
        for(let i=0;i<cantidadErrores;i++){
            const $error = document.createElement('li');
            const objetoError = objetoErrores[i];
            $error.innerText = "El salario ingresado (" + objetoError.input + ") del integrante "+ objetoError.linea +" es erroneo. "+ objetoError.texto;
            
            $errores.appendChild($error);
        }
    } 
    else{
        const $errores = document.querySelector("#errores");
        $errores.innerHTML = ""; 
        ocultarErrores();     
        mostrarResultados();
        const salarios = document.querySelectorAll(".salarios-input");
        document.querySelector("#salario-mayor-mensual").textContent = mayorSalarioMensual(salarios);
        document.querySelector("#salario-menor-mensual").textContent = menorSalarioMensual(salarios);
        document.querySelector("#salario-promedio-mensual").textContent = promedioSalarioMensual(salarios);
        document.querySelector("#salario-promedio-anual").textContent = (promedioSalarioMensual(salarios)*12);
    }
}

document.querySelector("#agregar").onclick = function(event){
    const totalSalarios = document.querySelectorAll(".input-salario");
    mostrarBotonCalcular();
    agregarSalario(totalSalarios.length)

    event.preventDefault();
}

document.querySelector("#quitar").onclick = function(event){
    const totalSalarios = document.querySelectorAll(".input-salario");
    quitarSalario(totalSalarios.length)

    event.preventDefault();
}

document.querySelector("#calcular").onclick = function (event){
    validarFormularioSalarios();
    event.preventDefault();
}


function agregarSalario(indice){
    const $div = document.createElement("div");
    $div.className = "input-salario";
    $div.id = indice;

    const $label = document.createElement("label");
    $label.textContent = `Salario mensual del integrante numero ${indice+1}`
    const $input = document.createElement("input");
    $input.type = "number";
    $input.className = "salarios-input";
    $input.min = "0";

    $div.appendChild($label);
    $div.appendChild($input);

    document.querySelector("#integrantes-con-salario").appendChild($div);
}

function quitarSalario(indice){
    ocultarResultados();
    ocultarErrores();
    const divSalario = document.getElementById(indice-1);
    if (indice === 1){
        ocultarBotonCalcular();
    }
    if (indice>0){
    divSalario.remove();
    }
    else{
        alert("No hay elementos para quitar");
    }
}

function mostrarBotonCalcular(){
    document.querySelector("#calcular").classList.remove ("oculto");
}

function ocultarBotonCalcular(){
    document.querySelector("#calcular").classList.add ("oculto");
}

function mostrarResultados(){
    document.querySelector("#resultados-calcular").classList.remove ("oculto");
}

function ocultarResultados(){
    document.querySelector("#resultados-calcular").classList.add ("oculto");
}

function mostrarErrores(){
    document.querySelector("#errores").classList.remove ("oculto");
}

function ocultarErrores(){
    document.querySelector("#errores").classList.add ("oculto");
}
