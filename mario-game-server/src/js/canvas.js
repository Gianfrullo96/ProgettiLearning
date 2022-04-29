
import platform from '../img/platform3.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'

import spriteRunLeft from '../img/spriteRunLeft.png'
import spriteRunRight from '../img/spriteRunRight.png'
import spriteStandLeft from '../img/spriteStandLeft.png'
import spriteStandRight from '../img/spriteStandRight.png'

console.log(platform)
console.log(background)
const canvas= document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width=1024
canvas.height=576

const gravity=1.5

class Player{
  constructor(){
    this.speed=10
    this.position={
      x:100,
      y:100
    }
    this.velocity={
      x:0,
      y:0
    }
    this.height=150
    this.width=66
    this.frames =0
    this.image= createImage(spriteStandRight)
    this.sprites= {
      stand: {
        right: createImage(spriteStandRight),
        left:createImage(spriteStandLeft),
        cropWidth:177,
        width:66
        //left: createImage(spriteStandLeft)
      },
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth:341,
        width:127.875
      }
    }
    this.currentSprite=this.sprites.stand.right
    this.currentCropWidth=177
  }
 /*draw(){
   c.drawImage(this.image, this.position.x, this.position.y,this.width,this.height)
 }*/
    //rettangolo
  draw(){
    c.drawImage(
        this.currentSprite,
        this.currentCropWidth * this.frames,
        0,
        this.currentCropWidth,
        400,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
   }
   update(){
     this.frames++
     if(this.frames >59 && this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left ) {
       this.frames=0
     }else if(this.frames >29 && this.currentSprite === this.sprites.run.right ||
     this.currentSprite === this.sprites.run.left){
      this.frames=0
     }

     this.draw()
     //gravity
     this.position.x += this.velocity.x
     this.position.y += this.velocity.y
     if (this.position.y + this.height + this.velocity.y <= canvas.height){
        this.velocity.y += gravity
     }

   }
}

class Platform{
  constructor({x,y,image}){
    this.position ={
      x,
      y
    }
    this.image=image
    this.height=image.height
    this.width=image.width
  }
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject{
  constructor({x,y,image}){
    this.position ={
      x,
      y
    }
    this.image=image
    this.height=image.height
    this.width=image.width
  }
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

function createImage(imageSrc){
  const image= new Image()
  image.src = imageSrc
  return image
}

let platformImage=createImage(platform)
let platformSmallTallImage=createImage(platformSmallTall)
let player = new Player()
let platforms=[]

let genericObjects=[]
let lastKey=''

const keys={
right:{
  pressed:false
},
left:{
  pressed:false
},
}

let scrollOffsett=0
function init(){

platformImage=createImage(platform)
platformSmallTallImage=createImage(platformSmallTall)
 player = new Player()
platforms=[
  new Platform({x:platformImage.width * 2 + 300 , y:370, image: platformSmallTallImage }),
  new Platform({x:-1, y:470, image: platformImage }),
  new Platform({x:platformImage.width-3, y:470, image: platformImage }),
  new Platform({x:platformImage.width * 2 + 100 , y:470, image: platformImage }),
  new Platform({x:platformImage.width * 3 + 300 , y:470, image: platformImage })
  ]

  genericObjects=[new GenericObject ({
    x:-1,
    y:-1,
    image: createImage(background)
  }),new GenericObject ({
    x:-1,
    y:-1,
    image: createImage(hills)
  }),new GenericObject ({
    x:-1,
    y:-1,
    image: createImage(hills)
  })]

 scrollOffsett=0

}

function animate(){
  requestAnimationFrame(animate)
c.fillStyle='white'
  c.fillRect(0,0,canvas.width,canvas.height)
  genericObjects.forEach(genericObject =>{
    genericObject.draw()
  })
  platforms.forEach((platform)=>{
      platform.draw()
  })
  player.update()


//Controlli di movimento
  if (keys.right.pressed && player.position.x < 600){
    player.velocity.x=player.speed
    //impediamo margine sinistro
  }else if((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffsett=== 0 && player.position.x >0)){
      player.velocity.x=-player.speed
  }//
  else{
    player.velocity.x=0
    if(keys.right.pressed){
      scrollOffsett+=player.speed
      platforms.forEach((platform) =>{
          platform.position.x-=player.speed
    })
    genericObjects.forEach((genericObject)=>{
      genericObject.position.x-=player.speed* 0.66

    })

  }

    else if(keys.left.pressed && scrollOffsett===0){
      scrollOffsett-=player.speed
      platforms.forEach((platform) =>{
          platform.position.x+=player.speed
    })
    genericObjects.forEach((genericObject)=>{
      genericObject.position.x+=player.speed* 0.66
    })
  }
}
console.log(scrollOffsett)

  //rectangular Collision direction in y axes
  platforms.forEach((platform) =>{

  if(player.position.y +player.height <= platform.position.y &&
     player.position.y +player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x+ platform.width
    )
     {
       player.velocity.y=0
     }
})

//sprite switching
if (
keys.right.pressed &&
  lastKey === 'right' && player.currentSprite !== player.sprites.run.right){
  player.frames=1
  player.currentSprite= player.sprites.run.right
  player.currentCropWidth=player.sprites.run.cropWidth
  player.width=player.sprites.run.width
}else if ( keys.left.pressed && lastKey ==='left'&& player.currentSprite !== player.sprites.run.left){
  player.currentSprite=player.sprites.run.left
  player.currentCropWidth=player.sprites.run.cropWidth
  player.width=player.sprites.run.width
}else if ( !keys.left.pressed && lastKey ==='left'&& player.currentSprite !== player.sprites.stand.left){
  player.currentSprite=player.sprites.stand.left
  player.currentCropWidth=player.sprites.stand.cropWidth
  player.width=player.sprites.stand.width
}else if ( !keys.right.pressed && lastKey ==='right'&& player.currentSprite !== player.sprites.stand.right){
  player.currentSprite=player.sprites.stand.right
  player.currentCropWidth=player.sprites.stand.cropWidth
  player.width=player.sprites.stand.width
}





if(scrollOffsett>platformImage.width * 3 + 200){
  console.log('you win')
}
//lose condition
if(player.position.y > canvas.height){
  console.log('you loose')
  init()
}
}

//start game
init()
animate()


//trucco per agganciare tasti ad azione
addEventListener('keydown',({keyCode})=>{
  switch(keyCode){
    case 65:
    console.log('left')
      keys.left.pressed=true
      lastKey='left'
    break
    case 83:
    console.log('down')
    break
    case 68:
    console.log('right')
      keys.right.pressed=true
      lastKey='right'
    break
    case 87:
    console.log('up')
    player.velocity.y -= 20
    break
  }
})

addEventListener('keyup',({keyCode})=>{

  switch(keyCode){
    case 65:

    keys.left.pressed=false
    break
    case 83:

    break
    case 68:

    keys.right.pressed=false
    break
    case 87:


    break
  }
})
