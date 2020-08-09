let resultado = document.querySelector('#visor');

let calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null
};

const limpar = document.querySelector('#limpar')
limpar.addEventListener("click", ()=>{
   resultado.value = "";
    calculo.valorSalvo = null;
   funcaoParaCalcular = null; 
})

// Ao carregar a pagina
window.addEventListener("load", ()=>{
atribuirEventos();
});

function atribuirEventos(){
let numeros = document.querySelectorAll('.num');
for (let num of numeros){
    num.addEventListener("click", inserirNumero);
}

let operacoes = document.querySelectorAll('.op');
for (let op of operacoes){
    op.addEventListener("click",clicarOperador);
}

document.getElementById("ponto").addEventListener("click", inserirPonto); 
document.getElementById("pi").addEventListener("click", mostrarPi);
document.getElementById("raiz").addEventListener("click", raizQuadrada);
document.getElementById("result").addEventListener("click", clicarResultado);

}//final atribuir eventos

//display
function inserirNumero(){
   if(isNaN(resultado.value)){
       resultado.value = event.target.textContent;
   }else{
       if(resultado.value ==0){
        resultado.value = event.target.textContent;
       }else{
           resultado.value += event.target.textContent; 
       }
   }
}

function mostrarPi(){
    var valorPi = Math.PI.toFixed(2); 
     return resultado.value = valorPi;
  }
  function raizQuadrada(valor){
    var valor = resultado.value;
     var total = Math.sqrt(valor);
     return resultado.value = total; 
   }
  
function somarValores(valor1, valor2){
    return valor1 + valor2; 
}

function subtrairValores(valor1, valor2){
    return valor1 - valor2; 
}


function multiplicarValores(valor1, valor2){
    return valor1 * valor2; 
}


function dividirValores(valor1, valor2){
    if(valor2 ==0){
        return "erro, divisao por zero";
    }else{
        return valor1 / valor2;
    }
}
function potenciaValores(valor1, valor2){
    if(valor2 ==0){
        return "1";
    }
    return Math.pow(valor1, valor2);
}
function inserirPonto(){
    if(resultado.value === "" || isNaN(resultado.value)){
        resultado.value = "0.";
    }else if(!resultado.value.includes(".")){
        resultado.value = resultado.value + ".";
    }
}
function clicarOperador(){
//saber se o valor é numero
    if(!isNaN(resultado.value)){
        //se nada havia sido digitado anteriormente
      if(calculo.valorSalvo == null){
          calculo.valorSalvo = Number(resultado.value);
      }else if(calculo.funcaoParaCalcular != null){
        calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(resultado.value));
      }
    }

    let operador = event.currentTarget.value;
    atribuirOperacao(operador);
     resultado.value = operador;
}
//atribui a operacao escolhida ao objeto calculo
function atribuirOperacao(operador){
    if(operador == "+"){
        calculo.funcaoParaCalcular = somarValores;
    } else if (operador == "-"){
        calculo.funcaoParaCalcular = subtrairValores;
    }else if (operador == "*"){
        calculo.funcaoParaCalcular = multiplicarValores;
    }else if (operador == "/"){
        calculo.funcaoParaCalcular = dividirValores;
    }else if(operador == "potencia"){
        calculo.funcaoParaCalcular = potenciaValores;
    }
}
//o valor tem que ser um numero e a operacao deve ser escolhida
function clicarResultado(){
    if(!isNaN(resultado.value) && calculo.funcaoParaCalcular != null){
        let valorTotal = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(resultado.value));
        resultado.value = valorTotal;
        calculo.valorSalvo = resultado.value;
        ///caso a pessoa queira salvar o valor para fazer outra conta
        calculo.funcaoParaCalcular = null;
    //evitar erros com o operador
    }
    }