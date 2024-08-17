const SEPERATION = 11

window.onload = function onload() {

    // Creates all 484 ore images
    for (let i = 0; i < 484; i++) {
        var image = document.createElement("img")

        // Set it to lightslate by default
        image.src = "../src/lightslate.png"

        // Sets the id to the number of the image for future reference
        image.id = i

        // Runs the function switchImg with the id so the function knows which picture to switch
        image.setAttribute("onclick", "switchImg(" + i + ")")

        // Sets the attribute pic to 0 to let the switch function know which picture it is on
        image.setAttribute("pic", 0)

        // Prevents dragging
        image.setAttribute("draggable", "true")
        image.setAttribute("draggable", "false")

        // Sets the width and height to something that takes up most of the screen
        image.style.width = "calc(" + 100 / 22 + "vh - 1px)"
        image.style.height = "calc(" + 100 / 22 + "vh - 1px)"

        // Makes them only slightly seperated from each other
        image.style.marginTop = "-3px"
        image.style.marginLeft = "1px"

        document.getElementById("photos").appendChild(image)

    }

    // Gets the seed so you dont need to click somewhere to get it
    var result = ""
    var result_part = ""

    for (let i = 0; i < 484; i++) {
        result_part += document.getElementById(i).getAttribute("pic")

        if (result_part.length == SEPERATION) {
            result += parseInt(result_part).toString(36)

            if (i != 483) {
                result += "|"
            }

            result_part = ""
        }
    }
    if (result_part.length != 0) {result += parseInt(result_part).toString(36)}

    document.getElementById("result").innerHTML = result

}

function switchImg(num) {

    // Gets the picture from the predetermined function inside the attribute
    var pic = document.getElementById(num)

    // Gets the number the picture is currently on, adds one, and loops it
    var num = parseInt(pic.getAttribute("pic")) + 1
    if (num >= 6) {
        num = 0
    }
    pic.setAttribute("pic", num)

    pic.src = "../src/" + ["lightslate","copper","coal","nickel","iron","opal"][num] + ".png"

    // Gets the seed in text form
    var result = ""
    var result_part = ""

    for (let i = 0; i < 484; i++) {
        result_part += document.getElementById(i).getAttribute("pic")

        // To make the seed smaller, every ~11 characters, convert it to base 36 and add | to seperate it
        if (result_part.length == SEPERATION) {
            result += parseInt(result_part).toString(36)

            // Makes sure the seed doesnt end with |
            if (i != 483) {
                result += "|"
            }

            result_part = ""
        }
    }

    // Adds the leftover text add the end to the seed
    if (result_part.length != 0) {result += parseInt(result_part).toString(36)}

    document.getElementById("result").innerHTML = result

}

function setSeed() {

    var seed = document.getElementById("seedInputBox").value

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

    for (let i = 0; i < seed.length; i++) {
        document.getElementById(i).src = "../src/" + ["lightslate","copper","coal","nickel","iron","opal"][parseInt(seed[i])] + ".png"
        document.getElementById(i).setAttribute("pic", seed[i])
    }

}
