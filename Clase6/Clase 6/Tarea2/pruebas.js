function probarValidarSalario(){
    console.assert( 
        validarSalarios(10e10)=== "Solo se admiten numeros enteros",
        "Validar salario no valido que solo se ingrese un salario de enteros",
    )

    console.assert(
        validarSalarios(-2333) === "Debe ingresar un salario valido, solo se permiten numeros positivos",
        "Validar salario no valido que el salario ingresado sea un numero positivo",
    )
}

probarValidarSalario();