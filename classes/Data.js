let dataGame = {
    level: '1-1',
    levelBg : './storage/levels/1-1/Spiral.jpg',
    canvasWidth: 800,
    canvasHeight: 600,

    frogLeft : 333,
    frogTop : 215,
    frogWidth : 150,
    frogHeight : 150,
    bulletRadius : 15,

    ballRadius : 15,
    ballsColor: ['./storage/colors/BlueBall1.jpg', './storage/colors/GreenBall1.jpg', './storage/colors/PurpleBall1.jpg',
        './storage/colors/RedBall1.jpg',/* './storage/colors/WhiteBall1.jpg', './storage/colors/YellowBall1.jpg'*/],
    pointsPath: [
        {A: {x: 655, y: -30}, B: {x: 658, y: 110}, C: {x: 660, y: 220}, D: {x: 650, y: 330}},
        {A: {x: 650, y: 330}, B: {x: 630, y: 420}, C: {x: 585, y: 480}, D: {x: 505, y: 527}},
        {A: {x: 505, y: 527}, B: {x: 412, y: 570}, C: {x: 312, y: 560}, D: {x: 235, y: 505}},
        {A: {x: 235, y: 505}, B: {x: 180, y: 464}, C: {x: 140, y: 400}, D: {x: 136, y: 301}},
        {A: {x: 136, y: 301}, B: {x: 140, y: 200}, C: {x: 179, y: 145}, D: {x: 250, y: 97}},
        {A: {x: 250, y: 97}, B: {x: 322, y: 55}, C: {x: 418, y: 60}, D: {x: 489, y: 100}},
        {A: {x: 489, y: 100}, B: {x: 590, y: 170}, C: {x: 590, y: 250}, D: {x: 590, y: 300}},
        {A: {x: 590, y: 300}, B: {x: 575, y: 420}, C: {x: 500, y: 475}, D: {x: 433, y: 491}},
        {A: {x: 433, y: 491}, B: {x: 300, y: 520}, C: {x: 221, y: 415}, D: {x: 207, y: 356}},
        {A: {x: 207, y: 356}, B: {x: 180, y: 255}, C: {x: 222, y: 175}, D: {x: 320, y: 137}},
        {A: {x: 320, y: 137}, B: {x: 450, y: 100}, C: {x: 550, y: 215}, D: {x: 526, y: 324}},
        {A: {x: 526, y: 324}, B: {x: 500, y: 405}, C: {x: 417, y: 445}, D: {x: 345, y: 423}},
        {A: {x: 345, y: 423}, B: {x: 265, y: 385}, C: {x: 260, y: 325}, D: {x: 266, y: 253}},
    ],
};

export {dataGame};