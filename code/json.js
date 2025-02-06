const items = {
    0:{
        "name":"Bullet Speed",
        "img":"./src/bullet speed.png",
        "desc":"This upgrade improves your bullet speed by 1, from $ to $",
        "level":0,
    },
    1:{
        "name":"Fire Speed",
        "img":"./src/fire_speed.png",
        "desc":"This upgrades how fast you shoot, decreasing the cooldown from $ to $",
        "level":0
    },
    2:{
        "name":"Firepower",
        "img":"./src/firepower.png",
        "desc":"This improves the amount of damage you do with your bullets, increasing the damage from $ to $",
        "level":0
    },
    3:{
        "name":"Health",
        "img":"./src/Health.png",
        "desc":"This increases your max health from $ to $",
        "level":0
    },
    4:{
        "name":"Lifesteal",
        "img":"./src/lifesteal.png",
        "desc":"This improves what percentage of the damage you do gets turned to lifesteal from $ to $",
        "level":0
    },
    5:{
        "name":"Speed",
        "img":"./src/speed.png",
        "desc":"This improves your player speed from $ to $",
        "level":0
    },
    6:{
        "name":"Bullet Size",
        "img":"./src/bullet_size.png",
        "desc":"Increases the size of the bullet from $ to $",
        "level":0
    },
    7:{
        "name":"Regeneration",
        "img":"./src/regeneration.png",
        "desc":"Increases health regeneration from $ every second to $ every second",
        "level":0
    },
};

var enemyData = {

    "melee": {
        "size":[20,20],
        "speed":1,
        "color":"rgb(255,0,0)",
        "health":20,
        "damage":5,
        "score":100,
        "maxRuns":"N/A",
        "runs":"N/A",
        "weight":40,
    },
    "archer": {
        "size":[20,20],
        "speed":1,
        "color":"cyan",
        "health":10,
        "damage":5,
        "score":150,
        "maxRuns":50,
        "runs":0,
        "weight":20,
    },
    "heavy": {
        "size":[50,50],
        "speed":0.75,
        "color":"black",
        "health":35,
        "damage":10,
        "score":225,
        "maxRuns":"N/A",
        "runs":"N/A",
        "weight":5,
    },
};
