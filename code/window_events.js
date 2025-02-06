// Speed of the player
var speed = 2;

// The hud
var hud = document.getElementById("HUDImage");

// The health
var health = document.getElementById("health");

// Whether the code is paused or not
var pauseToggle = false;

// Variable that increments each loop, once it gets to runsNeeded, it runs code
var runs = 0;

// How many runs needed for the bullet to be created
var runsNeeded = 50;

// well... The speed of the bullet
var bulletSpeed = 2;

// Counter that increments every time the interval is run, if it gets to enemyCreateSpeed, then it resets and runs that code
var createEnemyNum = 0;

// Speed at which enemies are created
var enemyCreateSpeed = 500;

// How many enemies to add
var addEnemies = 1;

// playerDamage dictates how much damage the player will do
var playerDamage = 5;

// score dictates the score
var score = 0;

// Exp dictates the exp, when the bar reaches full, player should get a level up
var exp = 0;
var expNeeded = 1000;

// When you should reset enemy adding speed and spawn extra enemies instead of spawning them faster
const ADDMORENEMIES = 10000

// The speed at which the enemies should spawn right before 1 more enemy starts spawning
const FINALSPEED = 75

// Whether the upgrades show or not
var upgrading = false;

// Chooses which upgrades show when you press space
var upgrades = [];

// Percentage of lifesteal
var lifesteal = 0;

// How many exp points you have, or how much you can upgrade things
var expPoints = 0;

// How big the bullet is
var bulletSize = 10

// Remembers which hints were given
var hints_given = {
    "wasd":[false, "Use W A S and D keys to move around"],
    "click":[false, "Click to shoot"],
    "space":[false, "Press space to open the upgrade menu and buy upgrades, when your exp meter reaches full, you get one upgrade point"],
}

// Whether or not you can unpause
var canUnpause = true;

// How far away archers should stay
const ARCHERDIST = 300;

// How much to regenerate every second
var regeneration = 0;

// How fast the enemies move
var enemySpeed = 1;

// The multiplier for enemy health so the game gets harder the more you play
var enemyHealthMultiplier = 1;

window.onload = (event) => {
    let windowSize = [window.innerWidth, window.innerHeight]
    let player = document.getElementById("player");

    // When it loads, places the player directly in the middle
    player.style.left = (windowSize[0] / 2) - (player.offsetWidth / 2) + "px"
    player.style.top = (windowSize[1] / 2) - (player.offsetHeight / 2) + "px"
    playerLocation = [(windowSize[0] / 2) - (player.offsetWidth / 2), (windowSize[1] / 2) - (player.offsetHeight / 2)]

    resize()
    chooseUpgrades()
}

window.onresize = (event) => {
    resize()
}

const UPDATE = setInterval(() => {

    let health = document.getElementById("health")
    let expItem = document.getElementById("exp")
    let hud = document.getElementById("HUDImage")
    let player = document.getElementById("player")

    // Checks to make sure your not paused
    if (!pauseToggle) {
        health.style.width = (40 * (hud.offsetWidth / 100) * (playerHealth / maxHealth)) + "px"
        expItem.style.width = (40 * (hud.offsetWidth / 100) * (exp / expNeeded)) + "px"

        // Depending on what buttons you have pressed, add speed to that direction
        if (directions[0]) {
            playerLocation[1] -= speed
        }
        if (directions[1]) {
            playerLocation[1] += speed
        }
        if (directions[2]) {
            playerLocation[0] -= speed
        }
        if (directions[3]) {
            playerLocation[0] += speed
        }
        
        // Ensures you dont go out of bounds
        playerLocation[0] = Math.min(playerLocation[0], window.innerWidth - Math.sqrt(player.offsetWidth * player.offsetWidth + player.offsetHeight * player.offsetHeight))
        playerLocation[1] = Math.min(playerLocation[1], window.innerHeight - Math.sqrt(player.offsetWidth * player.offsetWidth + player.offsetHeight * player.offsetHeight))
        playerLocation[0] = Math.max(playerLocation[0], 0)
        playerLocation[1] = Math.max(playerLocation[1], 0)

        player.style.left = playerLocation[0] + "px"
        player.style.top = playerLocation[1] + "px"

        // x is distance from cursor to ship in x position, y is the same but in y direction
        let x = cursorPos[0] - (player.offsetLeft + player.offsetWidth/2)
        let y = cursorPos[1] - (player.offsetTop + player.offsetHeight/2)

        // Complicated math shit i forgot how to do
        let rotation = Math.round(Math.atan(y/x) * (180/Math.PI))

        // Complicated math shit i forgot how to do again
        while (rotation <= 0 ) {rotation += 360}

        if (x >= 0) {rotation += 180}

        while (rotation >= 360) {rotation -= 360}

        player.style.transform = "rotate(" + (rotation - 90) + "deg)"
        

        // Creates bullets 
        if (mouseDown && runs >= runsNeeded) {

            // Makes the basis for a bullet
            var bullet = createBullet("player");
            bullet.style.left = (player.offsetLeft + (player.offsetWidth / 2) - (bulletSize / 2)) + "px"
            bullet.style.top = (player.offsetTop + (player.offsetHeight / 2) - (bulletSize / 2)) + "px"
            bullet.style.transform = player.style.transform

            // Sets how much X and Y need to increment to go "forward"
            let slopeX = Math.cos((rotation - 180) * (Math.PI /180))
            let slopeY = Math.sin((rotation - 180) * (Math.PI /180))
            
            // Literally just saves the slopes and location, as well as the damage
            bullet.setAttribute("movementX", slopeX / (Math.abs(slopeX) +  Math.abs(slopeY)))
            bullet.setAttribute("movementY", slopeY / (Math.abs(slopeX) +  Math.abs(slopeY)))
            bullet.setAttribute("X", playerLocation[0] + player.offsetWidth / 2)
            bullet.setAttribute("Y", playerLocation[1] + player.offsetHeight / 2)
            bullet.setAttribute("damage", playerDamage)

            document.getElementById("bullets").appendChild(bullet)

        }

        // Checks to ensure that runs isnt over runsNeeded
        if (runs < runsNeeded || mouseDown) {
            runs += 1
            if (runs >= runsNeeded + 1) {
                runs = 0;
            }
        }

        // Checks all bullets to move them, and/or check for collision with enemies
        for (let i = 0; i < document.getElementById("bullets").children.length; i++) {

            let child = document.getElementById("bullets").children[i]

            // Due to rounding, uses an attribute to store position 
            child.setAttribute("X", parseFloat(child.getAttribute("X")) + parseFloat(child.getAttribute("movementX")) * parseInt(child.getAttribute("bulletSpeed")))
            child.setAttribute("Y", parseFloat(child.getAttribute("Y")) + parseFloat(child.getAttribute("movementY")) * parseInt(child.getAttribute("bulletSpeed")))
            child.style.top = child.getAttribute("Y") + "px"
            child.style.left = child.getAttribute("X") + "px"

            // IF the bullet gets out of bounds, remove it
            if (child.offsetLeft >= window.innerWidth || child.offsetLeft <= 0 || child.offsetTop >= window.innerHeight || child.offsetTop <= 0) {
                document.getElementById("bullets").removeChild(child)
            }

            // Checks if the enemy is collided with the bullet, if so deal 5 damage to enemy, and destroy the enemy if its health is 0
            for (let i = 0; i < document.getElementById("enemies").children.length; i++) {

                let enemy = document.getElementById("enemies").children[i]

                if (
                    child.getAttribute("type") == "player" 
                    && checkCollision([child.offsetLeft, child.offsetTop], 
                        [enemy.offsetLeft, enemy.offsetTop], 
                        [child.offsetWidth, child.offsetHeight], 
                        [enemy.offsetWidth, enemy.offsetHeight])
                    ) 
                    
                    {

                    // If the bullet came from a player and also hit the enemy, remove the damage from the health of the enemy
                    enemy.setAttribute("health", parseFloat(enemy.getAttribute("health")) - child.getAttribute("damage"))
                    playerHealth = Math.min((playerHealth + parseFloat(child.getAttribute("damage")) * (lifesteal/100)), maxHealth)

                    if (parseFloat(enemy.getAttribute("health")) <= 0) {
                        document.getElementById("enemies").removeChild(enemy)

                        score += parseInt(enemy.getAttribute("score"))
                        exp += parseInt(enemy.getAttribute("score"))
                        enemyCreateSpeed = Math.floor(
                            ((500 - FINALSPEED) / (ADDMORENEMIES * ADDMORENEMIES)) 
                            * Math.pow(((score - (ADDMORENEMIES * (addEnemies - 1))) - ADDMORENEMIES), 2) 
                            + FINALSPEED)
                        
                        enemySpeed = Math.cbrt((score/2000) + 1)

                        enemyHealthMultiplier = 0.0001 * score + 1
                        
                        if ((score - (ADDMORENEMIES * (addEnemies - 1))) >= ADDMORENEMIES) {addEnemies += 1}

                        if (exp >= expNeeded) {
                            exp -= expNeeded
                            expNeeded *= 1.1
                            expPoints += 1
                        }

                    }

                    document.getElementById("bullets").removeChild(child)
                }

                else if (
                    child.getAttribute("type") == "enemy"
                    && checkCollision([child.offsetLeft, child.offsetTop], 
                        [player.offsetLeft, player.offsetTop], 
                        [child.offsetWidth, child.offsetHeight], 
                        [player.offsetWidth, player.offsetHeight])
                ) 
                {playerHealth -= parseInt(child.getAttribute("damage")); document.getElementById("bullets").removeChild(child)}
            }

            // console.log([parseFloat(child.getAttribute("movementX")), parseFloat(child.getAttribute("movementY"))])

        }

        // Spawn enemy if the counter reaches it
        if (createEnemyNum == enemyCreateSpeed) {for (let i = 0; i != addEnemies; i++) {document.getElementById("enemies").appendChild(createEnemy())}}

        // Moves the enemy as well as checks for collision, if there is collision, then remove the health depending on the strengh of the enemy
        for (let i = 0; i < document.getElementById("enemies").children.length; i++) {

            let child = document.getElementById("enemies").children[i]

            specialBehaviors(child)

            if (
                checkCollision([child.offsetLeft, child.offsetTop], 
                                [player.offsetLeft, player.offsetTop], 
                                [child.offsetWidth, child.offsetHeight], 
                                [player.offsetWidth, player.offsetHeight])) 
            {
                playerHealth -= parseInt(child.getAttribute("damage"))
                document.getElementById("enemies").removeChild(child)
            }

        }

        createEnemyNum += 1

        // Ensures that the counter never goes "enemyCreateSpeed"
        if (createEnemyNum > enemyCreateSpeed) {createEnemyNum = 0;}

        if (playerHealth <= 0) {canUnpause = false; pauseToggle = true; document.getElementById("gameOver").style.opacity = 1}
    }

    let hintThere = false
    for (let i = 0; i < Object.keys(hints_given).length; i++) {
        if (!hints_given[Object.keys(hints_given)[i]][0]) {
            hintThere = true
            document.getElementById("hint").innerHTML = "Hint: " + hints_given[Object.keys(hints_given)[i]][1]
            break;
        }
    }

    if (!hintThere) {
        document.getElementById("hintBox").style.opacity = 0
    }
}, 10);

const REGEN = setInterval(() => {

    playerHealth += regeneration

}, 1000)

function createBullet(type) {

    // Makes the basis for a bullet
    let bullet = document.createElement("div");
    bullet.style.position = "absolute"

    // Changes the color of the bullet based on whether its from an enemy or from the player
    if (type == "player") {
        bullet.style.width = bulletSize + "px"
        bullet.style.height = bulletSize + "px"
        bullet.style.background = "rgb(255,255,255)"
        bullet.setAttribute("bulletSpeed", bulletSpeed)
    }

    if (type == "enemy") {
        bullet.style.width = "10px"
        bullet.style.height = "10px"
        bullet.style.background = "purple"
    }

    bullet.setAttribute("type", type)

    return bullet;
}

function createEnemy() {

    // Sets the weight of all enemies
    let types = {}

    for (let i = 0; i < Object.keys(enemyData).length; i++) {
        types[Object.keys(enemyData)[i]] = enemyData[Object.keys(enemyData)[i]]["weight"]
    }

    // Temp will be used to calculate range of random number
    let temp = 0;

    for (let i = 0; i < Object.keys(types).length; i++) {
        temp += types[Object.keys(types)[i]]
    }

    // Gets random number then determines what enemy it belongs to
    let chosen = Math.random() * temp
    temp = 0;

    for (let i = 0; i < Object.keys(types).length; i++) {
        if (chosen <= temp + types[Object.keys(types)[i]]) {
            if (i != 0 && chosen > temp) {
                var type = Object.keys(types)[i]
                break;
            }
            else {
                var type = Object.keys(types)[i]
                break;
            }
        }
        temp += types[Object.keys(types)[i]]
    }


    // Creates an enemy
    let enemy = document.createElement("div");
    enemy.style.width = enemyData[type]["size"][0] + "px"
    enemy.style.height = enemyData[type]["size"][1] + "px"
    enemy.style.position = "absolute"

    // Changes health and color depending on what type
    enemy.style.background = enemyData[type]["color"]
    enemy.setAttribute("health", enemyData[type]["health"] * enemyHealthMultiplier)
    enemy.setAttribute("score", enemyData[type]["score"])
    enemy.setAttribute("damage", enemyData[type]["damage"])
    enemy.setAttribute("runs", enemyData[type]["runs"])
    enemy.setAttribute("maxRuns", enemyData[type]["maxRuns"])
    enemy.setAttribute("speed", enemyData[type]["speed"])

    // Uses this code to decide whether the enemy will come from top bottom left or right
    let dir = Math.round(Math.random() * 3);
    let left = 0;
    let top = 0;
    
    switch (dir) {

        case 0: {
            left = -20
            top = Math.round(Math.random() * window.innerHeight)
            break;
        }
        case 1: {
            left = window.innerWidth
            top = Math.round(Math.random() * window.innerHeight)
            break;
        }
        case 2: {
            left = Math.round(Math.random() * window.innerWidth)
            top = -20
            break;
        }
        case 3: {
            left = Math.round(Math.random() * window.innerWidth)
            top = window.innerHeight
            break;
        }
    }

    enemy.style.left = left + "px"
    enemy.style.top = top + "px"

    enemy.setAttribute("X", left)
    enemy.setAttribute("Y", top)
    enemy.setAttribute("type", type)

    return enemy;

}

function checkCollision(pos1, pos2, measure1, measure2) {

    // Checks for collision on each of the four corners of an object. This isnt very optimized, but it somehow doesnt lag the computer

    let check = false
    checks = [[pos1[0], pos1[1]], [pos1[0] + measure1[0], pos1[1]], [pos1[0], pos1[1] + measure1[1]], [pos1[0] + measure1[0], pos1[1] + measure1[1]]]

    for (let i = 0; i < checks.length; i++) {
        let pos = checks[i]
        if (pos[0] >= pos2[0] && pos[0] <= pos2[0] + measure2[0]) {
            if (pos[1] >= pos2[1] && pos[1] <= pos2[1] + measure2[1]) {
                check = true
                break;
            }
        }
    }

    return check;

}

// Sets each upgrade card to a different upgrade, making sure that none of them are the same upgrade
function chooseUpgrades() {

    // Card 1
    upgrades[0] = Math.round(Math.random() * (Object.keys(items).length - 1))

    // Card 2
    upgrades[1] = Math.round(Math.random() * (Object.keys(items).length - 1))
    while (upgrades[1] == upgrades[0]) {

        upgrades[1] = Math.round(Math.random() * (Object.keys(items).length - 1))

    }

    // Card 3
    upgrades[2] = Math.round(Math.random() * (Object.keys(items).length - 1))
    while (upgrades[2] == upgrades[1] || upgrades[2] == upgrades[0]) {

        upgrades[2] = Math.round(Math.random() * (Object.keys(items).length - 1))

    }
}

function resize() {

    // Resizes the window to match
    let windowSize = [window.innerWidth, window.innerHeight]
    let hud = document.getElementById("HUDImage")
    let health = document.getElementById("health")
    let expItem = document.getElementById("exp")
    let pause = document.getElementById("pause")
    let points = document.getElementById("upgradePoints")
    let hintBox = document.getElementById("hintBox")
    let gameOver = document.getElementById("gameOver")

    hud.style.left = (windowSize[0] - hud.offsetWidth) / 2 + "px"

    // Uses ratios to find out where to put the health bar
    health.style.height = 10 * (hud.offsetHeight / 30) + "px"
    health.style.left = windowSize[0] / 2 - (hud.offsetWidth * 0.2) + "px"
    health.style.top = hud.offsetHeight * (18/30) + "px"

    expItem.style.height = 10 * (hud.offsetHeight / 30) + "px"
    expItem.style.left = windowSize[0] / 2 - (hud.offsetWidth * 0.2) + "px"
    expItem.style.top = hud.offsetHeight * (7/30) + "px"

    // Uses rations to find out where to put the pause image
    pause.style.height = (3/10) * hud.offsetHeight + "px"
    pause.style.width = 0.085 * hud.offsetWidth + "px"
    pause.style.left = windowSize[0] / 2 + (hud.offsetWidth * 0.25) + "px"
    pause.style.top = hud.offsetHeight * (3.5/30) + "px"

    points.style.top = document.getElementById("card2").offsetTop + document.getElementById("cardUpgrades").offsetTop - 40 + "px"
    points.style.left = ((window.innerWidth / 2) - (points.offsetWidth / 2)) + "px"

    hintBox.style.width = (window.innerWidth / 5) * 4 + "px"
    hintBox.style.left = (window.innerWidth / 2) - (window.innerWidth / 5) * 2 + "px"
    hintBox.style.height = (window.innerHeight / 5) + "px"
    hintBox.style.top = (window.innerHeight) - (window.innerHeight / 5) - (window.innerHeight / 15) + "px"
}

function specialBehaviors(child) {

    switch (child.getAttribute("type")) {
        case "melee": {
            meleeBehavior(child)
            break;
        }
        case "archer": {
            archerBehavior(child)
            break;
        }
        case "heavy": {
            meleeBehavior(child)
            break;
        }
    }

}

function archerBehavior(child) {

    // Gets the position of the enemy from the center
    let x = child.offsetLeft + child.offsetWidth / 2
    let y = child.offsetTop + child.offsetHeight / 2

    // Rotates the enemy
    let rotation = Math.atan((x - (player.offsetLeft + player.offsetWidth / 2)) / (y - (player.offsetTop + player.offsetHeight / 2)))
    let movementX = Math.sin(rotation) * parseFloat(child.getAttribute("speed")) * enemySpeed
    let movementY = Math.cos(rotation) * parseFloat(child.getAttribute("speed")) * enemySpeed
     
    if (y >= player.offsetTop + player.offsetHeight / 2) {movementX *= -1; movementY *= -1}

    child.setAttribute("runs", parseInt(child.getAttribute("runs")) + 1)

    if (Math.sqrt(Math.pow(child.offsetLeft - player.offsetLeft, 2) + Math.pow(child.offsetTop - player.offsetTop, 2)) <= ARCHERDIST - 20) {movementX *= -1; movementY *= -1}

    else if (Math.sqrt(Math.pow(child.offsetLeft - player.offsetLeft, 2) + Math.pow(child.offsetTop - player.offsetTop, 2)) <= ARCHERDIST
        && parseInt(child.getAttribute("maxRuns")) <= parseInt(child.getAttribute("runs"))) {

        child.setAttribute("runs", 0)

        movementX = 0
        movementY = 0

        let bullet = createBullet("enemy")

        let x = parseFloat(child.getAttribute("X")) - (player.offsetLeft + player.offsetWidth/2)
        let y = parseFloat(child.getAttribute("Y")) - (player.offsetTop + player.offsetHeight/2)

        let rotation = Math.round(Math.atan(y/x) * (180/Math.PI))

        while (rotation <= 0 ) {rotation += 360}

        if (x >= 0) {rotation += 180}

        while (rotation >= 360) {rotation -= 360}

        bullet.style.left = child.getAttribute("X") + "px"
        bullet.style.top = child.getAttribute("Y") + "px"
        bullet.style.transform = "rotate(" + (rotation - 90) + "deg)"

        bullet.setAttribute("bulletSpeed", 3)

        // Sets how much X and Y need to increment to go "forward"
        let slopeX = Math.cos((rotation) * (Math.PI /180))
        let slopeY = Math.sin((rotation) * (Math.PI /180))
        
        // Literally just saves the slopes and location, as well as the damage
        bullet.setAttribute("movementX", slopeX / (Math.abs(slopeX) +  Math.abs(slopeY)))
        bullet.setAttribute("movementY", slopeY / (Math.abs(slopeX) +  Math.abs(slopeY)))
        bullet.setAttribute("X", child.getAttribute("X"))
        bullet.setAttribute("Y", child.getAttribute("Y"))

        bullet.setAttribute("damage", child.getAttribute("damage"))

        document.getElementById("bullets").appendChild(bullet)
    }

    else if (Math.sqrt(Math.pow(child.offsetLeft - player.offsetLeft, 2) + Math.pow(child.offsetTop - player.offsetTop, 2)) <= ARCHERDIST) {movementX = 0;movementY = 0}
    child.setAttribute("X", (parseFloat(child.getAttribute("X")) + movementX))
    child.setAttribute("Y", (parseFloat(child.getAttribute("Y")) + movementY))

    child.style.top = child.getAttribute("Y") + "px"
    child.style.left = child.getAttribute("X") + "px"

}

function meleeBehavior(child) {

    // Gets the position of the enemy from the center
    let x = child.offsetLeft + child.offsetWidth / 2
    let y = child.offsetTop + child.offsetHeight / 2

    // Rotates the enemy
    let rotation = Math.atan((x - (player.offsetLeft + player.offsetWidth / 2)) / (y - (player.offsetTop + player.offsetHeight / 2)))
    let movementX = Math.sin(rotation) * parseFloat(child.getAttribute("speed")) * enemySpeed
    let movementY = Math.cos(rotation) * parseFloat(child.getAttribute("speed")) * enemySpeed
     
    if (y >= player.offsetTop + player.offsetHeight / 2) {movementX *= -1; movementY *= -1}

    child.setAttribute("X", (parseFloat(child.getAttribute("X")) + movementX))
    child.setAttribute("Y", (parseFloat(child.getAttribute("Y")) + movementY))

    child.style.top = child.getAttribute("Y") + "px"
    child.style.left = child.getAttribute("X") + "px"

}
