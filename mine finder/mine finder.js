const SEPERATION = 11

window.onload = function onload() {

    for (let i = 0; i < 484; i++) {
        var image = document.createElement("img")
        image.src = "../src/lightslate.png"
        image.id = i
        image.setAttribute("onclick", "switchImg(" + i + ")")
        image.setAttribute("pic", 0)
        image.setAttribute("draggable", "true")
        image.setAttribute("draggable", "false")
        image.style.width = "calc(" + 100 / 22 + "vh - 1px)"
        image.style.height = "calc(" + 100 / 22 + "vh - 1px)"
        image.style.marginTop = "-3px"
        image.style.marginLeft = "1px"
        document.getElementById("photos").appendChild(image)

        document.getElementById("result").innerHTML = "0" * 484

    }

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
    var pic = document.getElementById(num)
    var num = parseInt(pic.getAttribute("pic")) + 1
    if (num >= 6) {
        num = 0
    }
    pic.setAttribute("pic", num)

    pic.src = "../src/" + ["lightslate","copper","coal","nickel","iron","opal"][num] + ".png"

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