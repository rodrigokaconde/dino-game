const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJump = false;
var position = 0;
var pontos = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJump){
            jump();
        }
    }
}

function jump(){
    isJump = true;
    let upInterval = setInterval(() =>{
        if(position >= 150){
            clearInterval(upInterval);
            
            let downInterval = setInterval(() => {
                if(position <=0){
                    isJump = false;
                    clearInterval(downInterval);
                }else{
                    position -= 20;
                    dino.style.bottom = position+'px';
                }
                
            }, 20);
        }else{
            position += 20;
            dino.style.bottom = position+'px';
        }
        
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactuspositon = 1000;
    let randonTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000+'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if(cactuspositon < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            pontos += 10;
        }else if (cactuspositon > 0 && cactuspositon <60 && position <60){
            clearInterval(leftInterval);
            document.body.innerHTML= '<h1 class="game-over">Fim de Jogo</h1><h2 class="pontos">'+pontos+' pontos</h2>';
        }else{        
            cactuspositon -=10;
            cactus.style.left = cactuspositon + 'px';
        }
    }, 20);

    setTimeout(createCactus, randonTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);