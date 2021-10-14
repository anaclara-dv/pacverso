const player1 = "X";
const player2 = "O";
var playtime = player1;
var gameover = false;

main();

function main(){
    atualizaContagem();
    inicializaEspacos();
    resetaPartida();
}

function atualizaContagem() {

    if (gameover) {return;}

    if (playtime == player1) {
        var player = document.querySelectorAll("div#contagem img") [0];
        player.setAttribute("src", "jogodavelha/x.png");
    }

    else {
        var player = document.querySelectorAll("div#contagem img") [0];
        player.setAttribute("src", "jogodavelha/o.jpeg");
    }

}

function inicializaEspacos(){

    var espacos = document.getElementsByClassName("espaco");

    for(var i = 0; i < espacos.length; i++) {

        espacos[i].addEventListener("click", function() {

            if(gameover) {return;}

            if(this.getElementsByTagName("img").length == 0) {

                if(playtime == player1) {
                    this.innerHTML = "<img src='jogodavelha/x.png' border='0' height='50'>";
                    this.setAttribute("ocupado", player1);
                    playtime = player2;
                }

                else {
                    this.innerHTML = "<img src='jogodavelha/o.jpeg' border='0' height='50'>";
                    this.setAttribute("ocupado", player2);
                    playtime = player1;
                }

                atualizaContagem();
                verificarVencedor();
            }
        });
    }
}



async function verificarVencedor(){

    var a1 = document.getElementById("a1").getAttribute("ocupado");
    var a2 = document.getElementById("a2").getAttribute("ocupado");
    var a3 = document.getElementById("a3").getAttribute("ocupado");

    var b1 = document.getElementById("b1").getAttribute("ocupado");
    var b2 = document.getElementById("b2").getAttribute("ocupado");
    var b3 = document.getElementById("b3").getAttribute("ocupado");

    var c1 = document.getElementById("c1").getAttribute("ocupado");
    var c2 = document.getElementById("c2").getAttribute("ocupado");
    var c3 = document.getElementById("c3").getAttribute("ocupado");

    var vencedor = "";

    if((a1 == b1 && b1 == c1 && a1 != "") || (a1 == a2 && a2 == a3 && a1 != "") || (a1 == b2 && b2 == c3 && a1 != ""))
        vencedor = a1;

    else if((b1 == b2 && b2 == b3 && b1 != "") || (a2 == b2 && b2 == c2 && a2 != "") || (a3 == b2 && b2 == c1 && a3 != ""))
        vencedor = b2;

    else if((c1 == c2 && c2 == c3 && c1 != "") || (a3 == b3 && b3 == c3 && a3 != ""))
        vencedor = c3;

    if(vencedor != "") {
        gameover = true;
        await new Promise(resolve => setTimeout(resolve, 50));
        alert("o ganhador foi o '" + vencedor + "'");
        reiniciaJogo();
    }

    else if(a1 != "" && a2 != "" && a3 != "" && b1 != "" && b2 != "" && b3 != "" && c1 != "" && c2 != "" && c3 != ""){
        gameover = true;
        await new Promise(() => setTimeout( () => { alert("deu velha!!!"); reiniciaJogo(); }, 50));
    }
}

function sleep (ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}

function reiniciaJogo(){

    playtime = player1;
    gameover = false;
    var espacos = document.getElementsByClassName("espaco");

    for (var i=0; i<espacos.length; i++){
         espacos[i].innerHTML = "";
         espacos[i].setAttribute("ocupado", "");
    }
    main();
}

function resetaPartida(){
    var novo = document.getElementById("reiniciar");
    novo.addEventListener("click", function(){
        document.location.reload(true)});
}
