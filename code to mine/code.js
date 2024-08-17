function summonSeed() {

    // Gets the seed from the box and splits it according to the |
    var seed = document.getElementById("seed").value
    seed = seed.split("|")

    // trueSeed is used so the code can convert the bases 
    var trueSeed = ""

    for (let i = 0; i < seed.length; i++) {

        // run ensures that if the previous sections had any leading 0's, they arent ignored here
        let temp = parseInt(seed[i], 36).toString()
        let run = 11 - temp.length
        var toAdd = ""
        for (let e = 0; e < run; e++) {
            toAdd += "0"
        }

        trueSeed += (toAdd + temp)
    }

    // replaces seed to trueSeed
    seed = trueSeed

    // Creates the images if they have not been made yet
    if (document.getElementById("photos").childNodes.length == 0) {
        for (let i = 0; i < 484; i++) {

            var image = document.createElement("img")

            // Makes the images take up most of the screen, but not all of it
            image.style.width = 95 / 22 +"vh"
            image.style.height = 95 / 22 + "vh"
            image.src = "./src/" + ["lightslate","copper","coal","nickel","iron","opal"][parseInt(seed[i])] + ".png"
            
            // Sets the id to the numbre of the photo it is for future reference
            image.id = i

            // Makes all pictures blend together
            image.style.marginTop = "-5px"

            document.getElementById("photos").appendChild(image)
        }
    }

    else {
        // replaces sources instead of creating new images if previous images have already been created
        for (let i = 0; i < 484; i++) {
            document.getElementById(i).src = "./src/" + ["lightslate","copper","coal","nickel","iron","opal"][parseInt(seed[i])] + ".png"
        }
    }

    var children = document.getElementById("ores").children
    
    // Removes all current ore text
    while (document.getElementById("ores").children.length != 0) {
        document.getElementById("ores").removeChild(document.getElementById("ores").children[0])
    }

    // adds all ore names and locations to the list
    try {
        for (let i = 0; i < ores[seed].length; i++) {
            let par = document.createElement("p")

            // Properly formats the ore name and location
            let temp = ores[seed][i][0] + ": " + ores[seed][i][1] + ", " + ores[seed][i][2] + ", " + ores[seed][i][3]
            par.innerHTML = temp
            par.className = "ore"
            document.getElementById("ores").appendChild(par)
        }
    }
    catch {}
}
