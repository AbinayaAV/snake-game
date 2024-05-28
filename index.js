const gameboard=document.querySelector("#gameboard")
const ctx=gameboard.getContext("2d")
const scoretext=document.querySelector("#scoretext")
const resetbutton=document.querySelector("#resetbutton")
const gamewidth=gameboard.width
const gameheight=gameboard.height
const boardBackground="white"
const snakeColor="lightgreen"
const snakeBorder="black"
const foodColor="red"
const unitSize=25
let running=false
let xVelocity=unitSize
let yVelocity=0
let foodX
let foodY
let score=0

//snake is a obj snake is the var and x&y are the properties

let snake=[
    {x:unitSize*4 ,y:0},
    {x:unitSize*3 ,y:0},
    {x:unitSize*2 ,y:0},
    {x:unitSize ,y:0},
    {x:0 ,y:0},
]

window .addEventListener("keydown",changedirection)
resetbutton.addEventListener("click",resetgame)

gamestart()

function gamestart(){
    running=true
    scoretext.textContent=score
    creatfood()
    drawfood()
    nexttick()

}
function nexttick(){
    if(running){
        setTimeout(()=>{
            clearboard()
            drawfood()
            movesnake()
            drawsnake()
            checkgameover()
            nexttick()
        },75)
    }
    else{
        dispalygameover()
    }

}
function clearboard(){
    ctx.fillStyle=boardBackground
    ctx.fillRect(0,0,gamewidth,gameheight)

}
function creatfood(){
     function randomfood(min,max){
        const randnum=Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize
        return randnum
     }
     foodX=randomfood(0,gamewidth-unitSize)
     foodY=randomfood(0,gamewidth-unitSize)
     
}
function drawfood(){
    ctx.fillStyle=foodColor
    ctx.fillRect(foodX,foodY,unitSize,unitSize)

}
function movesnake(){
    const head={x:snake[0].x+xVelocity,
                y:snake[0].y+yVelocity,}
    snake.unshift(head)
    if(snake[0].x==foodX&&snake[0].y==foodY){
        score+=1
        scoretext.textContent=score
        creatfood()

    }
    else{
        snake.pop()
    }

}
function drawsnake(){
    ctx.fillStyle=snakeColor
    ctx.strokeStyle=snakeBorder
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })

}
function changedirection(event){
    const keypressed=event.keyCode
    const LEFT=37
    const UP=38
    const RIGHT=39
    const DOWN=40

    const goingUp=(yVelocity== -unitSize)
    const goingDown=(yVelocity== unitSize)
    const goingRight=(xVelocity== unitSize)
    const goingLeft=(xVelocity== -unitSize)

    switch(true){
        case(keypressed ==LEFT&&!goingRight):
             xVelocity=-unitSize
             yVelocity=0
             break
        case(keypressed ==UP&&!goingDown):
             xVelocity=0
             yVelocity=-unitSize
             break
        case(keypressed ==RIGHT&&!goingLeft):
             xVelocity=unitSize
             yVelocity=0
             break
        case(keypressed ==DOWN&&!goingUp):
             xVelocity=0
             yVelocity=unitSize
             break
        
    }
    

}
function checkgameover(){
    switch(true){
        case(snake[0].x<0):
            running=false
            break
        case(snake[0].x>=gamewidth):
            running=false
            break
        case(snake[0].y<0):
            running=false
            break
        case(snake[0].y>=gameheight):
            running=false
            break

    }
    for(let i=1;i<snake.length;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            running=false
        }
    }

}
function dispalygameover(){
    ctx.font="50px MV Boli"
    ctx.fillStyle="black"
    ctx.textAlign="center"
    ctx.fillText("GAME OVER!!",gamewidth/2,gameheight/2)
    running=false

}


function resetgame(){
    score=0
    xVelocity=unitSize
    yVelocity=0
    snake=[
        {x:unitSize*4 ,y:0},
        {x:unitSize*3 ,y:0},
        {x:unitSize*2 ,y:0},
        {x:unitSize ,y:0},
        {x:0 ,y:0},
    ]
    gamestart()


}