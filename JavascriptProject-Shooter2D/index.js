const canvas= document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl= document.querySelector('#scoreEl')
const startGameBtn= document.querySelector('#startGameBtn')
const modalEl= document.querySelector('#modalEl')
const bigScoreEl= document.querySelector('#bigScoreEl')


//Dichiarazione degli oggetti
class Player{
  constructor(x,y,radius,color){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw(){
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
    c.fillStyle= this.color
    c.fill()
  }
}

class Projectile{
  constructor(x,y,radius,color,Xvelocity,Yvelocity){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.Xvelocity = Xvelocity
    this.Yvelocity = Yvelocity
  }
  draw(){
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
    c.fillStyle= this.color
    c.fill()

  }
  update(){
    this.draw()
    this.x = this.x + this.Xvelocity
    this.y = this.y + this.Yvelocity
  }

}

class Enemy{
  constructor(x,y,radius,color,Xvelocity,Yvelocity){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.Xvelocity = Xvelocity
    this.Yvelocity = Yvelocity
  }
  draw(){
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
    c.fillStyle= this.color
    c.fill()

  }
  update(){
    this.draw()
    this.x = this.x + this.Xvelocity
    this.y = this.y + this.Yvelocity
  }

}
const friction= 0.99
class Particle{
  constructor(x,y,radius,color,Xvelocity,Yvelocity){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.Xvelocity = Xvelocity
    this.Yvelocity = Yvelocity
    this.alpha = 1
  }
  draw(){
    c.save()
    c.globalAlpha=this.alpha
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0, Math.PI *2,false)
    c.fillStyle= this.color
    c.fill()
    c.restore()

  }
  update(){
    this.draw()
    this.Xvelocity*=friction
    this.Yvelocity*=friction
    this.x = this.x + this.Xvelocity
    this.y = this.y + this.Yvelocity
    this.alpha -=0.01
  }

}

//Inizio Gioco
const x =  canvas.width / 2
const y =  canvas.height / 2

let player = new Player( x , y ,10,'gold')
let projectiles= []
let enemies= []
let particles= []


function init()
{
   player = new Player( x , y ,10,'gold')
   projectiles= []
   enemies= []
   particles= []
   score=0
}

//funzione che crea nemici e li mette in array
function spawnEnemies(){
  setInterval(()=>{
    const radius = Math.random()* (30-4)+4

     let x
     let y
//spanwn in punti casuali dello schermo
    if(Math.random() < 0.5){
     x =Math.random() < 0.5 ? 0 - radius : canvas.width + radius
     y =Math.random() * canvas.height
   }else{
     y =Math.random() < 0.5 ? 0 - radius : canvas.height + radius
     x =Math.random() * canvas.width
   }
//colore random di enemy
    const color =`hsl(${Math.random()*360}, 50%,50%)`
//direzione in cui si devono muovere
    const angle= Math.atan2(
       canvas.height / 2 - y,
       canvas.width  / 2 - x
    )
    const Xvelocity= Math.cos(angle)
    const Yvelocity= Math.sin(angle)

    enemies.push(new Enemy(x,y,radius,color,Xvelocity,Yvelocity))
  },1000)
}
let animationId
let score =0



//Animate che contiene logica di gioco
function animate(){
  animationId= requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.1)'
  c.fillRect(0,0,canvas.width,canvas.height)
  player.draw()

//far sparire le particelle nel tempo
  particles.forEach((particle,index)=>{
    if (particle.alpha <=0 ){
      particles.splice(index,1)
    }else{
      particle.update()
    }

  })

//Per disegnare ogni oggetto dobbiamo loopare attraverso l'array
projectiles.forEach((projectile,index)=>{
  projectile.update()
 if (projectile.x + projectile.radius < 0 ||
   projectile.x- projectile.radius> canvas.width ||
   projectile.y + projectile.radius < 0 ||
     projectile.y - projectile.radius > canvas.width )
   {
   setTimeout(()=>{
       //Remove object from array
     projectiles.splice(index,1)
   },0)
 }
})
//Per disegnare ogni oggetto dobbiamo loopare attraverso l'array
//Logica di Gioco
enemies.forEach((enemy,index)=>{
  enemy.update()
  const dist = Math.hypot(player.x - enemy.x , player.y - enemy.y)
  //end game
  if (dist - enemy.radius - player.radius < 1)
  {
    console.log('endGame')
    cancelAnimationFrame(animationId)
    bigScoreEl.innerHTML=score
   modalEl.style.display= 'flex'
  }
  projectiles.forEach((projectile,projectileindex) =>
  {
    //Collision detector
    const dist = Math.hypot(projectile.x - enemy.x , projectile.y - enemy.y)
    //quando i proiettili si toccano
    if (dist - enemy.radius - projectile.radius < 1)
    {



      //create explosion
      for(let i=0; i < enemy.radius  * 2 ; i++){
        particles.push(new Particle(projectile.x,projectile.y,Math.random()*2,enemy.color,(Math.random()-0.5)*8,(Math.random()-0.5)*8))
      }

      if(enemy.radius - 10 > 7 )
      {
        //increase score
        score += 70
        scoreEl.innerHTML= score

          //enemy.radius -= 10
          gsap.to(enemy,{radius:enemy.radius-10})
          setTimeout(()=>{
            //Remove object from array
            projectiles.splice(projectileindex,1)
            },0)
  } else{
    //increase score
    score += 100
    scoreEl.innerHTML= score

      setTimeout(()=>{
          //Remove object from array
        enemies.splice(index,1)
        projectiles.splice(projectileindex,1)
      },0)
      }
    }
  })
})

}
//evento del click per sparare
addEventListener('click',(event)=> {

  const angle= Math.atan2(
    event.clientY- canvas.height / 2,
    event.clientX - canvas.width / 2
  )
  const Xvelocity= Math.cos(angle) *3
  const Yvelocity= Math.sin(angle) *3

   projectiles.push(
     new Projectile(canvas.width/2,canvas.height/2,5,'orange',Xvelocity,Yvelocity)
   )

})
startGameBtn.addEventListener('click',()=> {
  init()
  animate()
  spawnEnemies()
  modalEl.style.display= 'none'
})
