// ----------ELEMENTOS-------------
let bloco = document.querySelector("#bloco")
let campo = document.querySelector("#campo")

let barra_jogador1 = document.querySelector("#barra_jogador1")
let barra_jogador2 = document.querySelector("#barra_jogador2")

let tela = document.querySelector("body")
let sound_explosion = document.querySelector("#sound_explosion")
let animation_explosion = document.querySelector("#explosion")
// -------------------------------

// -----------VARIAVEIS-----------

    // BARRA :
let posY = 0;
let posX = 0;

    // JOGADORES :
let posY_jogador1 = 0;
let posY_jogador2 = 0;

    // LIMITES :
let limite_superiorY = campo.clientHeight / 2 - bloco.clientHeight / 2;
let limite_inferiorY = -1*(campo.clientHeight / 2 - bloco.clientHeight / 2);
let limite_direito = campo.clientWidth / 2 - bloco.clientWidth / 2;
let limite_esquerdo = -1*(campo.clientWidth / 2 - bloco.clientWidth / 2 - barra_jogador1.clientWidth);

    // SENTIDO :
let sentido_norte = true;
let sentido_direito = true;

    // MOVIMENTAÇÃO :
let intervalo1;
let intervalo2;
let pressionado1 = false;
let pressionado2 = false;
let speed = 1;
let hits = 0;

    // ExXPLOSÃO
let first_time = true;
// --------------------------------

// ----------DIAGNÓSTICO-----------
// --------------------------------

// --------FUNCTIONS---------------

    // CONTROLE (Pressionar tecla):

document.addEventListener("keydown", function(event) {

    if (event.key === `s` && !pressionado1) {
        pressionado1 = true
        intervalo1 = setInterval(function() {
            posY_jogador1 += 2;
            if (posY_jogador1 >= campo.clientHeight / 2 - barra_jogador1.clientHeight / 2) {
                posY_jogador1 = campo.clientHeight / 2 - barra_jogador1.clientHeight / 2;
            }
            barra_jogador1.style.transform = `translateY(${posY_jogador1}px)`
        },1)
    }

    if (event.key === `w` && !pressionado1) {
        pressionado1 = true
        intervalo1 = setInterval(function() {
            posY_jogador1 -= 2;
            if (posY_jogador1
             <= -1*(campo.clientHeight / 2 - barra_jogador1.clientHeight / 2)) {
                posY_jogador1
             = -1*(campo.clientHeight / 2 - barra_jogador1.clientHeight / 2);
            }
            barra_jogador1.style.transform = `translateY(${posY_jogador1}px)`
        },1)
    }
    if (event.key === "ArrowUp" && !pressionado2) {
        pressionado2 = true;
        intervalo2 = setInterval(function() {
            posY_jogador2 -=2;
            if (posY_jogador2 <= -1*(campo.clientHeight / 2 - barra_jogador2.clientHeight / 2)) {
                posY_jogador2 = -1*(campo.clientHeight / 2 - barra_jogador2.clientHeight / 2);
            }
            barra_jogador2.style.transform = `translateY(${posY_jogador2}px)`
        })

    }
    if (event.key === "ArrowDown" && !pressionado2) {
        pressionado2 = true;
        intervalo2 = setInterval(function() {
            posY_jogador2 +=2;
            if (posY_jogador2 >= campo.clientHeight / 2 - barra_jogador2.clientHeight / 2) {
                posY_jogador2 = campo.clientHeight / 2 - barra_jogador2.clientHeight / 2;
            }
            barra_jogador2.style.transform = `translateY(${posY_jogador2}px)`
        })

    }

})


    // CONTROLE (Levantar tecla):
document.addEventListener("keyup",function(event) {
    if (event.key === "s" || event.key === "w") {
        pressionado1 = false;
        clearInterval(intervalo1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        pressionado2 = false;
        clearInterval(intervalo2);
    }
})



    // MOVIENTAÇÃO DO BLOCO:
setTimeout(function() {
    
    let movimento_bloco = setInterval(function() {
    
        if (sentido_norte) {
            posY += speed;
        } else {
            posY -= speed;
        }
        if (sentido_direito) {
            posX += speed;
        } else {
            posX -= speed;
        }
    
        limite_superiorY = campo.clientHeight / 2 - bloco.clientHeight / 2;
        limite_inferiorY = -1*(campo.clientHeight / 2 - bloco.clientHeight / 2);
        if(posY >= limite_superiorY ) {
            sentido_norte = false;
        } else if (posY <= limite_inferiorY) { 
            sentido_norte = true;
        }
    
        limite_direito = campo.clientWidth / 2 - bloco.clientWidth / 2 - barra_jogador2.clientWidth;
        limite_esquerdo = -1*(campo.clientWidth / 2 - bloco.clientWidth / 2 - barra_jogador1.clientWidth);
        console.log(posX >= limite_direito,posX <= limite_esquerdo + speed,Math.abs(posY - posY_jogador2) <= bloco.clientHeight / 2 + barra_jogador2.clientHeight / 2)
        if (posX >= limite_direito && posX <= limite_direito + speed && Math.abs(posY - posY_jogador2) <= bloco.clientHeight / 2 + barra_jogador2.clientHeight / 2) {
            sentido_direito = false;
        } else if (posX <= limite_esquerdo && posX >= limite_esquerdo - speed && Math.abs(posY - posY_jogador1) <= bloco.clientHeight / 2 + barra_jogador1.clientHeight / 2) {
            sentido_direito = true;
        }
    
        bloco.style.transform = `translate(${posX}px,${posY}px)`
    
        if (posX <= limite_esquerdo - 200 || posX >= limite_direito + 200 && first_time) {
            clearInterval(movimento_bloco);
            speed = 0;
            first_time = false; 
            bloco.removeAttribute('id');   
            animation_explosion.style.display = "block";
            sound_explosion.play();
        }
    
    },1)
},2000)