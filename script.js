
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = screen.availWidth * 0.70;
const CANVAS_HEIGHT = canvas.height = window.innerHeight * 0.70;

let gameSpeed = 0; 

const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();
const backgroundLayer6 = new Image();

backgroundLayer1.src = './images/layer-1.png'
backgroundLayer2.src = './images/layer-2.png'
backgroundLayer3.src = './images/layer-3.png'
backgroundLayer4.src = './images/layer-4.png'
backgroundLayer5.src = './images/layer-5.png'
backgroundLayer6.src = './images/layer-6.png'

// SLIDER
const slider = document.getElementById("slider");
slider.value = 5

slider.addEventListener('change', function(e){
    gameSpeed = e.target.value
})

// MUSIC AND PLAY
const audioBtn = document.getElementById('play')
const audio = new Audio('./sounds/merrygoroundoflife.mp3')

audioBtn.addEventListener('click', function(){
    if(audio.paused){
        audio.play();
        audioBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        gameSpeed = slider.value
      } else {
        audio.pause();
        audioBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        gameSpeed = 0;
      }
})

class Layer {
    constructor(image, speedModifier, gameWidth, gameHeight){
        this.x = 0;
        this.y = 0;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 2400;
        this.height = 700;
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * speedModifier
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0
        }
        this.x -= this.speed; 
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.gameHeight)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.gameHeight)
    }
}


const layer1 = new Layer(backgroundLayer1, 0.2, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer2 = new Layer(backgroundLayer2, 0.05, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer3 = new Layer(backgroundLayer3, 0.1, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer4 = new Layer(backgroundLayer4, 0.2, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer5 = new Layer(backgroundLayer5, 1.3, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer6 = new Layer(backgroundLayer6, 1.5, CANVAS_WIDTH, CANVAS_HEIGHT)

const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6]

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })
    requestAnimationFrame(animate);
};

animate();