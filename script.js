let inputResultado = document.getElementById('resultado')
let calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null //soma, div, sub, mult......//
}   
//evento para quando a página carrega; 
window.addEventListener("load", function(){
    atribuirEventos()
})

//atribui eventos aos botões;

function atribuirEventos(){
    document.getElementById('btnValor0').addEventListener('click', clicarNumero)
    document.getElementById('btnValor1').addEventListener('click', clicarNumero)
    document.getElementById('btnValor2').addEventListener('click', clicarNumero)
    document.getElementById('btnValor3').addEventListener('click', clicarNumero)
    document.getElementById('btnValor4').addEventListener('click', clicarNumero)
    document.getElementById('btnValor5').addEventListener('click', clicarNumero)
    document.getElementById('btnValor6').addEventListener('click', clicarNumero)
    document.getElementById('btnValor7').addEventListener('click', clicarNumero)
    document.getElementById('btnValor8').addEventListener('click', clicarNumero)
    document.getElementById('btnValor9').addEventListener('click', clicarNumero)
    document.getElementById('btnLimpar').addEventListener('click', limparDados)
    document.getElementById('btnLimparTudo').addEventListener('click', limparTodosDados)
    document.getElementById('btnPonto').addEventListener('click', inserirPonto)
    document.getElementById('btnPorcentagem').addEventListener('click', clicarOperador)
    document.getElementById('btnDividir').addEventListener('click', clicarOperador)
    document.getElementById('btnMultiplicar').addEventListener('click', clicarOperador)
    document.getElementById('btnSubtrair').addEventListener('click', clicarOperador)
    document.getElementById('btnSomar').addEventListener('click', clicarOperador)
    document.getElementById('btnResultado').addEventListener('click', clicarResultado)
}

//insere um numero no display da calculadora;

function clicarNumero(){
    if(isNaN(inputResultado.value)){//caso haja um NaN na caixa de texto;
        inputResultado.value = event.target.textContent 
    }else{
        if(inputResultado.value === 0){//eliminando zeros a esquerda;
            inputResultado.value = event.target.textContent 
        }else{
            inputResultado.value += event.target.textContent    
        }
    }
}
//operações matemáticas:
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
    if(valor1 == 0 && valor2 == 0){
        return 1
    }else{
        return valor1 / valor2;
    }
}

function tirarPorcentagem(valor1, valor2){
    return (valor1/100)*valor2
}

//limpa os dados do input e do objeto;
function limparTodosDados(){
    inputResultado.value = ''
    calculo.valorSalvo = null //parametros que apagam os histórico de valores atribuidos;
    calculo.funcaoParaCalcular = null //parametros que apagam os histórico de operações atribuidas;
}

function limparDados() {
    inputResultado.value = inputResultado.value.substr(0, inputResultado.value.length - 1)
    calculo.valorSalvo = calculo.valorSalvo = null //parametros que apagam os histórico de valores atribuidos;
    calculo.funcaoParaCalcular = calculo.funcaoParaCalcular = null //parametros que apagam os histórico de operações atribuidas;
}

function inserirPonto(){
    if(inputResultado.value === '' || isNaN(inputResultado.value)){
        //isNaN(se não for número), ex: * / - + não podem ter ponto a direita;
        //obs: o javascript considera a '' (string vazia) como um Number, por isso a redundancia;
        inputResultado.value = '0.'
    }else if(!inputResultado.value.includes('.')){
        //includes: verifica se o value possui o valor declarado(ponto);
        //com a exclamação/negação, a funcao verifica se ele não possui o ponto, ou seja, é apenas um número inteiro;
        inputResultado.value = inputResultado.value + '.'
    }
}

function clicarOperador(){
    if(!isNaN(inputResultado.value)){//verifica se já tem um valor numérico na caixa de resultados, antes de acrescentar um sinal;
        if(calculo.valorSalvo == null){//se nenhuma operação for feita;
            calculo.valorSalvo = Number(inputResultado.value)
        }else if(calculo.funcaoParaCalcular != null){//se já foi feita alguma operação;
             calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value))
        }
    }
    let operador = event.target.textContent //no evento; quem disparou(target=button); traz o texto dele e guarda na variável;
    atribuirOperacao(operador)
    inputResultado.value = operador
}

//atribui a operação ao objeto Cálculo;
function atribuirOperacao(operador){
    if(operador == '+'){
        calculo.funcaoParaCalcular = somarValores
    }else if(operador == '-'){
        calculo.funcaoParaCalcular = subtrairValores
    }else if(operador == 'x'){
        calculo.funcaoParaCalcular = multiplicarValores
    }else if(operador == '÷'){
        calculo.funcaoParaCalcular = dividirValores
    }else if(operador == '%'){
        calculo.funcaoParaCalcular = tirarPorcentagem
    }
}

function alerta(){
    alert('You have successfully deleted the entire universe, congratulations!')        
    window.close('','fechar_janela','')
}

function clicarResultado(){
    if(!isNaN(inputResultado.value) && calculo.funcaoParaCalcular != null){
        //não pode mostrar resultado enquanto houver um operador matemático na tela;
        //a função de operação deve ter sido chamada, ou clicada ao menos uma vez;
        var resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value)) 
        parseFloat(resultado = +resultado.toFixed(2)) //fixa as casas decimais em duas (apenas se necessário);
        /*OBSERVAÇÃO IMPORTANTÍSSIMA PARA O MATHEUS DO FUTURO!
        O '+' DEFINE SE O .toFixed(2) será chamado apenas caso necessário, 
        se não houvesse, todos os resultados inteiros teriam duas casas decimais vazias*/
        inputResultado.value = resultado //mostra o resultado na tela do usuário;
        calculo.valorSalvo = resultado //salva a variável caso o usuário deseje calcular novamente;
        calculo.funcaoParaCalcular = null //evita erros caso o usuário tente clicar em operadores logo após exibir o resultado;
    }
    var tamanho = inputResultado.value.length //delimita a quantidade máxima de casas(decimais e inteiras) que podem aparecer;
    if(tamanho > 10){//10 pois podem ser 8 inteiras e 2 decimais, ou 10 inteiros;
    inputResultado.value = 'erro(tamanho.max => 8)'
    }
    if(inputResultado.value == Infinity){
        alerta()//chama a função alerta que fecha a página;
    }
}
