function summonSeed() {

    var seed = document.getElementById("seed").value

    seed = seed.split("|")

    var trueSeed = ""

    console.log(seed)

    for (let i = 0; i < seed.length; i++) {
        let temp = parseInt(seed[i], 36).toString()
        let run = 11 - temp.length
        var toAdd = ""
        for (let e = 0; e < run; e++) {
            toAdd += "0"
        }

        trueSeed += (toAdd + temp)
    }

    seed = trueSeed

    if (document.getElementById("photos").childNodes.length == 0) {
        for (let i = 0; i < 484; i++) {

            var image = document.createElement("img")
            image.style.width = 95 / 22 +"vh"
            image.style.height = 95 / 22 + "vh"
            image.src = "../src/" + ["lightslate","copper","coal","nickel","iron","opal"][parseInt(seed[i])] + ".png"
            image.id = i
            image.style.marginTop = "-5px"

            document.getElementById("photos").appendChild(image)
        }
    }

    else {
        for (let i = 0; i < 484; i++) {
            document.getElementById(i).src = "../src/" + ["lightslate","copper","coal","nickel","iron","opal"][parseInt(seed[i])] + ".png"
        }
    }

    var children = document.getElementById("ores").children

    while (document.getElementById("ores").children.length != 0) {
        document.getElementById("ores").removeChild(document.getElementById("ores").children[0])
    }

    try {
        for (let i = 0; i < ores[seed].length; i++) {
            let par = document.createElement("p")
            par.innerHTML = ores[seed][i]
            par.className = "ore"
            document.getElementById("ores").appendChild(par)
        }
    }
    catch {}
}