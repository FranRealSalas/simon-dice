function probarValidarCantIntegrantes(){
    console.assert(
        validarCantidadIntegrantes(0)==="Debe ingresar la cantidad de integrantes",
        "Validar cantidad integrantes no valido que se haya ingresado una cantidad de integrantes",
    );
    
    console.assert(
        validarCantidadIntegrantes(-2) === "Debe ingresar un numero positivo",
        "Validar cantidad intregrantes no valido que el numero no sea negativo",
    );
}

probarValidarCantIntegrantes();

function probarValidarEdades(){
    console.assert(
        validarEdades(-2)=== "Debes completar todos los campos con edades validas",
        "Validar edades no valido que la edad ingresada sea positiva",
    );
}

probarValidarEdades();


