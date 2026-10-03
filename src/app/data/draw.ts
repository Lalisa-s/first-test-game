import { Enemy, Rect, World } from "./interface";

// используемые функции отрисовки
function drawRectangle(ctx: CanvasRenderingContext2D, rect: any) {
    ctx.fillStyle = "Green"
    ctx.fillRect(rect.x, rect.y, rect.side, rect.side)
}

function drawMenu(ctx: CanvasRenderingContext2D, world: World, imageInv: any, fon: HTMLImageElement, activeSlotI: number) { //фон
    const color = "black"

    ctx.fillStyle = ctx.createPattern(fon, "repeat") as CanvasPattern
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "AliceBlue"
    ctx.fillRect(0, 0, window.innerWidth, 50)
    ctx.globalAlpha = 1.0;

    ctx.beginPath()
    ctx.moveTo(0, 50)
    ctx.lineTo(window.innerWidth, 50)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.rect(20, 15, world.hp * 2, 20)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()

    ctx.font = '25px Arial'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillStyle = color
    ctx.fillText(`${world.hp}`, 105, 15)

    ctx.font = '30px Arial'
    ctx.fillText(`money: ${world.money}`, 300, 10)

    //inventory
    ctx.fillText(`inventory`, 500, 10)

    let x = 620
    for (let i = 0; i < 10; i++) {
        x += 30
        ctx.beginPath()
        ctx.rect(x, 10, 30, 30)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    x = 620
    for (let i = 0; i < imageInv.length; i++) {
        x += 30
        ctx.drawImage(imageInv[i], x, 12, 28, 28)
    }

    ctx.strokeStyle = "red"
    ctx.strokeRect(650 + activeSlotI * 30, 11, 29, 29)
    //

    ctx.fillText(`этаж ${world.progress.floor} - комната ${world.progress.room}`, 1000, 10)

}

function drawCircle(ctx: CanvasRenderingContext2D, circle: any) {
    ctx.beginPath()
    ctx.ellipse(circle.x, circle.y, circle.radius, circle.radius, 0, 0, 2 * Math.PI)
    ctx.strokeStyle = circle.color
    ctx.stroke()
    ctx.closePath()
}

function drawRectEnemyHp(ctx: CanvasRenderingContext2D, rect: Enemy) {
    ctx.beginPath()
    ctx.rect(rect.x - rect.hp / 2, rect.y - 10, rect.hp, 5)
    ctx.fillStyle = "red"
    ctx.fill()
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemies: Enemy[], enemies_zone: any[]) {
    for (let i = 0; i < enemies.length; i++) {
        ctx.strokeStyle = enemies[i].color
        ctx.beginPath()
        ctx.ellipse(enemies[i].x, enemies[i].y, enemies[i].radius, enemies[i].radius, 0, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(84, 10, 10, 1)'
        ctx.fill()
        ctx.closePath()
        drawCircle(ctx, enemies_zone[i])
        drawRectEnemyHp(ctx, enemies[i])
    }
}

function drawBoss(ctx: CanvasRenderingContext2D, boss: any,) {
    ctx.fillStyle = boss.color
    drawCircle(ctx, boss)
    ctx.beginPath()
    ctx.rect(boss.x - boss.hp / 2, boss.y - boss.radius - 10, boss.hp, 5)
    ctx.fillStyle = "red"
    ctx.fill()
}

function drawImg(ctx: CanvasRenderingContext2D, image: HTMLImageElement, obj: any) {
    ctx.drawImage(image, obj.x, obj.y, obj.width, obj.height)
}

function drawCircleImg(ctx: CanvasRenderingContext2D, image: HTMLImageElement, obj: any) {
    let x: number = obj.x - obj.radius
    let y: number = obj.y - obj.radius
    ctx.drawImage(image, x, y, obj.radius * 2, obj.radius * 2)
}

function checkRectCollision(first: any, second: any) {
    if (first.x <= second.x && first.x + first.side >= second.x && first.y <= second.y && first.y + first.side >= second.y ||
        first.x <= second.x + second.side && first.x + first.side >= second.x + second.side && first.y <= second.y && first.y + first.side >= second.y ||
        first.x <= second.x && first.x + first.side >= second.x && first.y <= second.y + second.side && first.y + first.side >= second.y + second.side ||
        first.x <= second.x + second.side && first.x + first.side >= second.x + second.side && first.y <= second.y + second.side && first.y + first.side >= second.y + second.side
    ) {
        return true
    }
    return false
}

function checkCircleAndRectCollision(circle: any, rect: any) {
    if (Math.sqrt(Math.pow(rect.x + rect.side / 2 - circle.x, 2) + Math.pow(rect.y + rect.side / 2 - circle.y, 2)) < rect.side * 1.41 + circle.radius) {
        return true
    } else return false
}

function checkCirclesCollision(c1: any, c2: any) {
    let distance = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2))
    return distance < c1.radius + c2.radius
}

export { drawCircle, drawMenu, drawRectangle, drawEnemy, drawBoss, drawImg, checkRectCollision, checkCircleAndRectCollision, checkCirclesCollision, drawCircleImg }