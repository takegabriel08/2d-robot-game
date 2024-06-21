const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 796;
const CANVAS_HEIGHT = canvas.height = 719;

const playerImage = new Image();
playerImage.src = 'assets/sprite_sheets/sprite_sheet.png';

const animations = {
    idle: loadImages('./assets/00_idle', 21),
    runReady: loadImages('./assets/01_run_00ready'),
    runStart: loadImages('./assets/01_run_01start', 19),
    runFinish: loadImages('./assets/01_run_02finish'),
    jumpReady: loadImages('./assets/02_jump_00ready'),
    jumpStart: loadImages('./assets/02_jump_01start'),
    jumpFinish: loadImages('./assets/02_jump_02finish'),
    ko: loadImages('./assets/03_ko', 41),
    punch: loadImages('./assets/04_punch', 10),
    run: [
        ...loadImages('./assets/01_run_00ready'),
        ...loadImages('./assets/01_run_01start', 19),
        ...loadImages('./assets/01_run_02finish')
    ],
    jump: [
        ...loadImages('./assets/02_jump_00ready'),
        ...loadImages('./assets/02_jump_01start'),
        ...loadImages('./assets/02_jump_02finish')
    ]
}

let currentAnimation = animations.idle;
let currentFrame = 0;
const animationSpeed = 3;
let frameCount = 0;

const spriteWidth = 796;
const spriteHeight = 719;

const animationSelect = document.getElementById('animation-select');

animationSelect.addEventListener('input', () => {
    const selectedAnimation = animationSelect.value;
    currentAnimation = animations[selectedAnimation];
    currentFrame = 0;
    frameCount = 0;
});

function loadImages(folder, numImages = 11) {
    const images = [];

    for (let i = 0; i < numImages; i++) {
        const img = new Image();
        let imageNo = i >= 10 ? i.toString() : '0' + i;

        img.src = `${folder}/skeleton-${folder.replace('./assets/', '')}_${imageNo}.png`;
        images.push(img);
    }

    return images;
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(currentAnimation[currentFrame], 0, 0);

    frameCount++;
    if (frameCount % animationSpeed === 0) {
        currentFrame++;
        if (currentFrame >= currentAnimation.length) {
            currentFrame = 0;
        }
    }

    requestAnimationFrame(animate);
}
animate();