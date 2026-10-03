const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = document.documentElement.clientHeight

async function playTheGame(string) {
  document.querySelector(".canvas").style.display = "flex"
  close_(".container")


  //получение инструментов
  let responseWorlds = await fetch(`/playGame`)
  let worlds = await responseWorlds.json()

  let world = {}
  for (let i = 0; i < worlds.length; i++) {
    if (worlds[i].name === string) {
      world = worlds[i];
    }
  }

  let responseWeapons = await fetch(`/playGameWeapon`)
  let weapons = await responseWeapons.json()

  let inventory_weapon = []
  for (let i = 0; i < world.inventory.weapon.length; i++) {
    for (let y = 0; y < weapons.length; y++) {
      if (world.inventory.weapon[i] == weapons[y].name) {
        inventory_weapon[i] = weapons[y]
      }
    }
  }
  let active_weapon = inventory_weapon[0]

  let change_of_progress = true
  let lvl = level[world.progress.floor - 1][world.progress.room - 1]


  // объекты
  let exitButton = {
    x: canvas.width - 50,
    y: 10,
    width: 30
  }

  let player = {
    x: 100,
    y: 100,
    speed: 2,
    radius: 15,
    color: "Green"
  }

  let enemies = []
  for (let i = 0; i < lvl.number_enemy; i++) {
    enemies.push({
      x: getRandom(20, canvas.width - 20),
      y: getRandom(70, canvas.height - 20),
      speed: lvl.speed_enemy,
      hunting: false,
      hp: lvl.hp_enemy,
      radius: lvl.radius_enemy,
      color: "Fuchsia",
      target: {
        x: getRandom(20, canvas.width - 20),
        y: getRandom(70, canvas.height - 20),
        radius: 2
      }
    })
  }

  let imageWeapons = []
  for (let i = 0; i < inventory_weapon.length; i++) {
    let imageWeapon = new Image()
    imageWeapon.src = "../" + inventory_weapon[i].img
    imageWeapon.onload = () => { imageWeapons.push(imageWeapon) }
  }

  let port = new Image()
  port.src = "../img/web/portal.png"
  port.onload = () => { }

  //фон
  let fon = new Image()
  fon.src = "../img/web/road.png"
  fon.onload = () => {
    const pattern = ctx.createPattern(fon, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 50, canvas.width, canvas.height);
  }


  let portal = {
    active: false,
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 35,
    width: 100,
    height: 70,
    img: port
  }

  //-------------------------
  let dealer = {
    x: canvas.width - 140,
    y: canvas.height - 140,
    radius: 20,
    color: "orange"
  }

  let boss = {
    active: lvl.boss,
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: lvl.radius_boss,
    speed: lvl.speed_boss,
    hp: lvl.hp_boss,
    color: "indigo"
  }


  //время 
  var data = new Date();
  let last_time_damade_from_enemy = []
  for (let i = 0; i < enemies.length; i++) {
    last_time_damade_from_enemy[i] = data.getHours() * 60 * 60 * 1000 + data.getMinutes() * 60 * 1000 + data.getSeconds() * 1000 + data.getMilliseconds()
  }
  let current_time_damade_from_enemy = []
  let last_time_damade_from_player = data.getHours() * 60 * 60 * 1000 + data.getMinutes() * 60 * 1000 + data.getSeconds() * 1000 + data.getMilliseconds()
  let last_time_dealer = data.getHours() * 60 * 60 * 1000 + data.getMinutes() * 60 * 1000 + data.getSeconds() * 1000 + data.getMilliseconds()
  let last_time_inventory = data.getHours() * 60 * 60 * 1000 + data.getMinutes() * 60 * 1000 + data.getSeconds() * 1000 + data.getMilliseconds()
  let last_time_damade_from_boss = data.getHours() * 60 * 60 * 1000 + data.getMinutes() * 60 * 1000 + data.getSeconds() * 1000 + data.getMilliseconds()


  // элемент управления
  let pressed = {}
  document.addEventListener("keydown", function (event) {
    pressed[event.code] = true
  })
  document.addEventListener("keyup", function (event) {
    pressed[event.code] = false
  })


  //рисовка
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // движущиеся объекты 
    player_zone = {
      x: player.x,
      y: player.y,
      radius: player.radius + active_weapon.distance,
      color: "red"
    }

    enemies_zone = []
    for (let i = 0; i < enemies.length; i++) {
      enemies_zone.push({
        x: enemies[i].x,
        y: enemies[i].y,
        radius: lvl.radius_enemy_zone,
        color: "red"
      })
    }

    if (enemies.length <= 0 && (boss.hp <= 0 || !lvl.boss)) {
      portal.active = true
      //------------
    }


    //управление игроком
    if (pressed["KeyW"] && player.y - player.radius > 50) {
      player.y -= player.speed
    }
    if (pressed["KeyD"] && player.x + player.radius < canvas.width) {
      player.x += player.speed
    }
    if (pressed["KeyS"] && player.y + player.radius < canvas.height) {
      player.y += player.speed
    }
    if (pressed["KeyA"] && player.x - player.radius > 0) {
      player.x -= player.speed
    }
    if (pressed["KeyX"]) {
      exitGame(world, "close_window")
    }
    if (pressed["KeyE"]) {
      var dete = new Date();
      let current_time_damade_from_player = dete.getHours() * 60 * 60 * 1000 + dete.getMinutes() * 60 * 1000 + dete.getSeconds() * 1000 + dete.getMilliseconds()

      for (let i = 0; i < enemies.length; i++) {
        if (checkCirclesCollision(player_zone, enemies[i])) {
          if (current_time_damade_from_player >= last_time_damade_from_player + active_weapon.rollback) {
            enemies[i].hp -= active_weapon.hit
            last_time_damade_from_player = current_time_damade_from_player
          }
        }
      }
      if (boss.active && checkCirclesCollision(player_zone, boss) && current_time_damade_from_player >= last_time_damade_from_player + active_weapon.rollback) {
        boss.hp -= active_weapon.hit
        last_time_damade_from_player = current_time_damade_from_player
      }
    }

    if (pressed["KeyQ"]) {
      var dete = new Date();
      current_time_dealer = dete.getHours() * 60 * 60 * 1000 + dete.getMinutes() * 60 * 1000 + dete.getSeconds() * 1000 + dete.getMilliseconds()

      if (checkCirclesCollision(player, dealer) && lvl.dealer && world.money >= lvl.prices_dealer &&
        world.inventory.potion + world.inventory.weapon.length < 10 && current_time_dealer >= last_time_dealer + 300) {
        world.money -= lvl.prices_dealer
        world.inventory.potion++
        last_time_dealer = current_time_dealer
      }
    }

    let last_iteracia = false
    for (let i = 0; i < 10; i++) {
      var dete = new Date();
      let current_time_inventory = dete.getHours() * 60 * 60 * 1000 + dete.getMinutes() * 60 * 1000 + dete.getSeconds() * 1000 + dete.getMilliseconds()

      if (i == 9) {
        i = -1
        last_iteracia = true
      }
      if (pressed[`Digit${i + 1}`] && current_time_inventory >= last_time_inventory + 150) {
        if (last_iteracia) {
          i = 9
        }
        last_time_inventory = current_time_inventory
        for (let x = 0; x < inventory_weapon.length; x++) {
          if (i == x) {
            active_weapon = inventory_weapon[i]
          }
        }
        for (let x = inventory_weapon.length; x < world.inventory.weapon.length + world.inventory.potion; x++) {
          if (i == x && world.hp <= 100 - lvl.potion_hp) {
            world.inventory.potion--
            world.hp += lvl.potion_hp
          }
        }
      }
      if (last_iteracia) {
        i = 9
      }
    }


    //движение врага
    for (let i = 0; i < enemies.length; i++) {
      let distance_enemy = getDistance(enemies[i], enemies[i].target)

      enemies[i].x += (enemies[i].target.x - enemies[i].x) * enemies[i].speed / distance_enemy
      enemies[i].y += (enemies[i].target.y - enemies[i].y) * enemies[i].speed / distance_enemy
    }


    //движение босса
    if (boss.active) {
      let distance_boss = getDistance(boss, player)

      if (boss.y - boss.radius >= 50 && boss.y + boss.radius <= canvas.height) {
        boss.y += (player.y - boss.y) * boss.speed / distance_boss
      } else {
        if (boss.y - boss.radius < 50) { boss.y += 0.05 }
        if (boss.y + boss.radius > canvas.height) { boss.y -= 0.05 }
      }

      if (boss.x + boss.radius <= canvas.width && boss.x - boss.radius >= 0) {
        boss.x += (player.x - boss.x) * boss.speed / distance_boss
      } else {
        if (boss.x + boss.radius > canvas.width) { boss.x -= 0.05 }
        if (boss.x - boss.radius < 0) { boss.x += 0.05 }
      }
    }


    //коллиззии
    for (let i = 0; i < enemies.length; i++) {
      if (checkCirclesCollision(enemies[i], enemies[i].target)) {
        if (enemies[i].hunting) {
          var dete = new Date();
          current_time_damade_from_enemy[i] = dete.getHours() * 60 * 60 * 1000 + dete.getMinutes() * 60 * 1000 + dete.getSeconds() * 1000 + dete.getMilliseconds()

          if (current_time_damade_from_enemy[i] >= last_time_damade_from_enemy[i] + lvl.rollback_enemy) {
            world.hp -= lvl.damage_from_enemy
            last_time_damade_from_enemy[i] = current_time_damade_from_enemy[i];
          }
        } else {
          enemies[i].target = {
            x: getRandom(50, 900),
            y: getRandom(50, 400),
            radius: 2
          }
        }
      }
    }
    

    for (let i = 0; i < enemies.length; i++) {
      if (checkCirclesCollision(player, enemies_zone[i])) {
        enemies[i].hunting = true
        enemies[i].target = player
      } else {
        if (enemies[i].hunting) {
          enemies[i].hunting = false

          enemies[i].target = {
            x: getRandom(50, 900),
            y: getRandom(50, 400),
            radius: 20,
          }
        }
      }
    }

    if (portal.active && checkCircleAndRectCollision(player, portal)) {
      if (change_of_progress) {
        portal.active = false
        if (world.progress.room == 3) {
          world.progress.floor++
          world.progress.room = 1
        }
        else {
          world.progress.room++
        }
        exitGame(world)
        playTheGame(world.name)
      }
      change_of_progress = false
    }

    if (boss.active && checkCirclesCollision(player, boss)) {
      var dete = new Date();
      let current_time_damade_from_boss = dete.getHours() * 60 * 60 * 1000 + dete.getMinutes() * 60 * 1000 + dete.getSeconds() * 1000 + dete.getMilliseconds()

      if (current_time_damade_from_boss >= last_time_damade_from_boss + lvl.rollback_boss) {
        last_time_damade_from_boss = current_time_damade_from_boss
        world.hp -= lvl.damage_from_boss
      }
    }


    //убийство врага
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].hp <= 0) {
        enemies.splice(i, 1)
        world.money += lvl.revard_for_the_enemy
      }
    }


    //убийство босса
    if (boss.active && boss.hp <= 0) {
      world.money += lvl.revard_for_the_boss
      boss.active = false
      world.inventory.weapon.push(`${lvl.weapon_for_the_boss}`)
      for (let i = 0; i < world.inventory.weapon.length; i++) {
        for (let y = 0; y < weapons.length; y++) {
          if (world.inventory.weapon[i] == weapons[y].name) {
            inventory_weapon[i] = weapons[y]
          }
        }
      }
      for (let i = 0; i < inventory_weapon.length; i++) {
        let imageWeapon = new Image()
        imageWeapon.src = "../" + inventory_weapon[i].img
        imageWeapon.onload = () => { imageWeapons[i] = imageWeapon }
      }
      putWeapon(lvl.weapon_for_the_boss)
    }


    //смерть игрока
    if (world.hp <= 0) {
      world.bool = false
      exitGame(world, "close_window")
    }


    //отрисовка
    drawMenu(world, exitButton, fon, imageWeapons)

    if (portal.active) {
      ctx.drawImage(portal.img, portal.x, portal.y, portal.width, portal.height)
    }

    if (lvl.dealer) {
      drawCircle(dealer)
    }

    if (boss.active) {
      drawCircle(boss)
      drawRectBossHp(boss)
    }

    drawPlayer(player)
    drawCircle(player_zone, "stroke")
    for (let i = 0; i < enemies.length; i++) {
      drawCircle(enemies[i])
      drawCircle(enemies_zone[i], "stroke")
      drawRectEnemyHp(enemies[i])
    }

    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
}