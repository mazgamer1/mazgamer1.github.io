var playerLocation = [0,0];
var cursorPos = [0,0];
var maxHealth = 100;
var playerHealth = 100
var mouseDown = false;

// Before the upgrade



// up, down, left, right
var directions = [false, false, false, false]

window.addEventListener("mousedown", function(e) {
    
    let pause = document.getElementById("pause")

    if (e.button == 0 && !upgrading) {

        let XTrue = (e.pageX - pause.offsetLeft) >= 0 && (e.pageX - pause.offsetLeft) <= pause.offsetWidth
        let YTrue = (e.pageY - pause.offsetTop) >= 0 && (e.pageY - pause.offsetTop) <= pause.offsetHeight

        if (XTrue && YTrue && canUnpause) {
            pauseToggle = !pauseToggle

            if (pauseToggle) {this.document.getElementById("HUDImage").setAttribute("src", "./src/HUD_paused.png")}
            else {this.document.getElementById("HUDImage").setAttribute("src", "./src/HUD.png")}

        }
    }

    if (!pauseToggle && e.button == 0) {
        mouseDown = true
        hints_given["click"][0] = true;
    }

    if (upgrading) {

        let cards = [this.document.getElementById("card1"), this.document.getElementById("card2"), this.document.getElementById("card3")]
        let main = this.document.getElementById("cardUpgrades")


        for (let i = 0; i <= 2; i++) {
            if (checkCollision(cursorPos, [cards[i].offsetLeft + main.offsetLeft, cards[i].offsetTop + main.offsetTop], [0,0], [cards[i].offsetWidth, cards[i].offsetHeight])) {
                if (expPoints > 0) {
                    upgrade(upgrades[i])
                    chooseUpgrades()
                    expPoints -= 1
                    update()
                }
            }
        }

    }

})

window.addEventListener("mouseup", function(e) {
    if (e.button == 0) {
        mouseDown = false
    }
})

window.addEventListener("mousemove", function(e) {
    cursorPos = [e.pageX, e.pageY]
})

window.addEventListener("keydown", function(e) {

    let player = document.getElementById("player")

    if (e["key"] == "w" || e["key"] == "arrowup") {
        directions[0] = true
        hints_given["wasd"][0] = true;
    }
    if (e["key"] == "s" || e["key"] == "arrowdown") {
        directions[1] = true
        hints_given["wasd"][0] = true;
    }
    if (e["key"] == "a" || e["key"] == "arrowleft") {
        directions[2] = true
        hints_given["wasd"][0] = true;
    }
    if (e["key"] == "d" || e["key"] == "arrowright") {
        directions[3] = true
        hints_given["wasd"][0] = true;
    }

    if (e["key"] == " ") {
        if (!pauseToggle) {
            hints_given["space"][0] = true
            pauseToggle = true;
            upgrading = true;
            this.document.getElementById("upgradePoints").style.opacity = 1
            this.document.getElementById("cardUpgrades").style.opacity = 1
            this.document.getElementById("HUDImage").setAttribute("src", "./src/HUD_paused.png")

            update()

        }
        else if (pauseToggle && upgrading) {
            pauseToggle = false;
            upgrading = false;
            this.document.getElementById("cardUpgrades").style.opacity = 0
            this.document.getElementById("upgradePoints").style.opacity = 0
            this.document.getElementById("HUDImage").setAttribute("src", "./src/HUD.png")
        }
    }

})

window.addEventListener("keyup", function(e) {

    let player = document.getElementById("player")

    if (e["key"] == "w" || e["key"] == "arrowup") {
        directions[0] = false
    }
    if (e["key"] == "s" || e["key"] == "arrowdown") {
        directions[1] = false
    }
    if (e["key"] == "a" || e["key"] == "arrowleft") {
        directions[2] = false
    }
    if (e["key"] == "d" || e["key"] == "arrowright") {
        directions[3] = false
    }
})

function card(which) {
    console.log(which)
}

function upgrade(item) {


    switch (item) {
        case 0: {
            bulletSpeed += 1
            break;
        }
        case 1: {
            runsNeeded -= 5
            break;
        }
        case 2: {
            playerDamage += 2.5
            break;
        }
        case 3: {
            maxHealth += 10
            break;
        }
        case 4: {
            lifesteal += 2
            break;
        }
        case 5: {
            speed += 1
            break;
        }
        case 6: {
            bulletSize += 2.5
            break;
        }
        case 7: {
            regeneration += 0.25
            break;
        }
    }

}

function update() {
    // IF you press space, then change the cards to be what they are supposed to be
    for (let i = 1; i <= 3; i++) {
        this.document.getElementById("card" + i + "Name").innerHTML = items[upgrades[i - 1]]["name"]

        let before = [
            bulletSpeed, 
            runsNeeded, 
            playerDamage, 
            maxHealth, 
            "%" + lifesteal, 
            speed, 
            bulletSize,
            regeneration
        ];

        let after = [
            bulletSpeed + 1, 
            runsNeeded - 5, 
            playerDamage + 2.5, 
            maxHealth + 10, 
            "%" + (lifesteal + 2), 
            speed + 1, 
            bulletSize + 2.5,
            regeneration + 0.25
        ];

        let desc = items[upgrades[i - 1]]["desc"].split("$");
        description = desc[0] + '<span id="red">' + before[upgrades[i - 1]] + "</span>" + desc[1]
        description += '<span id="red">' + after[upgrades[i - 1]] + "</span>" + desc[2]

        this.document.getElementById("card" + i + "Info").innerHTML = description
        this.document.getElementById("card" + i + "Img").setAttribute("src", items[upgrades[i - 1]]["img"])
        this.document.getElementById("upgradePoints").innerHTML = "Upgrade points: " + expPoints
    }

}
