
// let imgGoDown3 = new Image()
// imgGoDown1.src = "/playerImg/godown/playerGoDown3.png"
// imgGoDown1.onload = () => { }
// let imgGoDown5 = new Image()
// imgGoDown1.src = "/playerImg/godown/playerGoDown5.png"
// imgGoDown1.onload = () => { }
// let imgGoDown7 = new Image()
// imgGoDown1.src = "/playerImg/godown/playerGoDown7.png"
// imgGoDown1.onload = () => { }

// let playerGoUp : any[] = [imgGoDown1, imgGoDown3, imgGoDown5, imgGoDown7]
// let playerGoDown : any[] = [imgGoDown1]
// // let playerGoLeft : any[] = [picturePlayer1]
// // let playerGoRight : any[] = [picturePlayer1]

// let activeInd = 0
// function drawAnumationPlayer(ctx: CanvasRenderingContext2D, movement: number, obj: any) {
//     let activeArray : any[]
//     if(movement = 1) activeArray = playerGoUp
//     else activeArray = playerGoDown
//     let x : number = obj.x - obj.radius
//     let y : number = obj.y - obj.radius
//     ctx.drawImage(activeArray[activeInd], x, y, obj.radius*2, obj.radius*2)

//     if(activeInd == activeArray.length) activeInd = 0
//     else activeInd++
// }

// export {drawAnumationPlayer}