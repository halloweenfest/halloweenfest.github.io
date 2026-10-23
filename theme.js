(function () {
  var KEY = "holly-theme";
  var FACE = "emma-face.png?v=11";
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "themes.css?v=7";
  document.head.appendChild(link);

  var THEMES = {
    halloween: {
      label: "Halloween", menu: "🎃  Halloween",
      props: ["🎃","🦇","🕯️","👻"],
      brand: "Holly Haunt", a: "Holly", b: "Haunt",
      lede: "Hunt hidden treasures in Emma's candlelit manor, fly the night with her, stack the spookiest blocks, or send her down the cliff road.",
      play: "Play the Haunted Hall", section: "Choose your fright", foot: "Holly Haunt · Happy Halloween",
      findT: "The Haunted Hall", findD: "Search Emma's candlelit manor for twelve hidden treasures. Hints glow when you're stuck.",
      broomT: "Emma on a Broom", broomD: "Zap ghosts, bats and wolves with her lightning, then face the ugly witch.",
      stackT: "Holly Stack", stackD: "Falling blocks with pumpkins, ghosts, bats and black cats. Clear the rows.",
      rushT: "Adrenaline Rush", rushD: "Emma on a mountain bike. Jump the rocks, duck the branches, grab energy cans and action cams.",
      rooms: { hall: "Great Hall", kitchen: "Kitchen", bedroom: "Bedroom" },
      flight: "EMMA'S FLIGHT", stackK: "Holly Stack", stackLine: "Stack pumpkins, ghosts, bats, cats and Emma. Fill a row to clear it.", nightLine: "Night 1 is free. Villains chase her. Nights 2 and 3 unlock together.", winSub: "The ugly witch is gone.", bossName: "WITCH"
    },
    christmas: {
      label: "Christmas", menu: "🎄  Christmas",
      props: ["🎄","🎁","❄️","⭐","🔔","🧦","☃️","🦌"],
      brand: "Holly Noel", a: "Holly", b: "Noel",
      lede: "Find the gifts in Emma's snowy lodge, fly the Christmas sky with her, stack the festive blocks, or ride the winter road.",
      play: "Play the Christmas Hall", section: "Choose your cheer", foot: "Holly Noel · Merry Christmas",
      findT: "The Christmas Hall", findD: "Search the snowy lodge for twelve hidden gifts. Hints glow when you're stuck.",
      broomT: "Emma in the Snow", broomD: "Fly the Christmas sky. Dodge the winter spirits, collect stars, and light the tree.",
      stackT: "Noel Stack", stackD: "Falling gifts, stars, trees and bells. Clear a row to keep the tree growing.",
      rushT: "Sleigh Rush", rushD: "Emma on the winter road. Jump the drifts, duck the garlands, grab gifts and bells.",
      rooms: { hall: "Christmas Hall", kitchen: "Festive Kitchen", bedroom: "Guest Room" },
      flight: "SNOW FLIGHT", stackK: "Noel Stack", stackLine: "Stack gifts, stars, trees and bells. Clear a full row.", nightLine: "Night 1 is free. Winter spirits chase her. Nights 2 and 3 unlock together.", winSub: "The winter spirit is gone.", bossName: "SPIRIT"
    },
    diwali: {
      label: "Diwali", menu: "🪔  Diwali",
      props: ["🪔","🎆","✨","🌸","💛","🎇","🪔","✨"],
      brand: "Diwali Hall", a: "Diwali", b: "Hall",
      lede: "Find the diyas in Emma's lit-up home, fly through the fireworks with her, stack the festival blocks, or ride the lantern road.",
      play: "Play the Diwali Hall", section: "Choose your light", foot: "Diwali Hall · Happy Diwali",
      findT: "The Diwali Hall", findD: "Search the lamp-lit home for twelve hidden lights and sweets.",
      broomT: "Emma and the Lights", broomD: "Fly through the fireworks. Gather diyas and outlast the night.",
      stackT: "Diya Stack", stackD: "Falling lamps, sweets and sparks. Clear a row to keep the house bright.",
      rushT: "Lantern Run", rushD: "Emma on the festival road. Jump the stalls, duck the banners, grab sweets and lamps.",
      rooms: { hall: "Diwali Hall", kitchen: "Sweet Kitchen", bedroom: "Guest Room" },
      flight: "LIGHT FLIGHT", stackK: "Diya Stack", stackLine: "Stack lamps, sweets and sparks. Clear a full row.", nightLine: "Night 1 is free. Sparks chase her. Nights 2 and 3 unlock together.", winSub: "The night of lights is won.", bossName: "LAMP"
    },
    holi: {
      label: "Holi", menu: "💜  Holi",
      props: ["💜","💛","💚","💗","💙","🎨","💜","💛"],
      brand: "Holi Fest", a: "Holi", b: "Fest",
      lede: "Find the colors in Emma's courtyard, fly through the powder with her, stack the bright blocks, or race the color road.",
      play: "Play the Color Hall", section: "Choose your color", foot: "Holi Fest · Happy Holi",
      findT: "The Color Hall", findD: "Search the courtyard for twelve hidden colors and sweets.",
      broomT: "Emma in Color", broomD: "Fly through the powder clouds and keep every color in the air.",
      stackT: "Color Stack", stackD: "Falling bursts of color. Clear a row before the well fills.",
      rushT: "Color Run", rushD: "Emma on the festival road. Jump the stalls and grab the color packs.",
      rooms: { hall: "Color Hall", kitchen: "Color Kitchen", bedroom: "Guest Room" },
      flight: "COLOR FLIGHT", stackK: "Color Stack", stackLine: "Stack bursts of color. Clear a full row.", nightLine: "Night 1 is free. Color clouds chase her. Nights 2 and 3 unlock together.", winSub: "The color cloud is cleared.", bossName: "COLOR"
    },
    eid: {
      label: "Eid", menu: "🌙  Eid",
      props: ["🌙","⭐","🕌","✨","🏮","🌙","⭐","✨"],
      brand: "Eid Night", a: "Eid", b: "Night",
      lede: "Find the lanterns in Emma's moonlit home, fly under the crescent with her, stack the night blocks, or ride the quiet road.",
      play: "Play the Moonlit Hall", section: "Choose your night", foot: "Eid Night · Eid Mubarak",
      findT: "The Moonlit Hall", findD: "Search the moonlit home for twelve hidden lanterns and gifts.",
      broomT: "Emma under the Moon", broomD: "Fly the crescent night. Gather stars and keep the lanterns lit.",
      stackT: "Crescent Stack", stackD: "Falling moons, stars and lanterns. Clear a row.",
      rushT: "Moonlit Ride", rushD: "Emma on the night road. Jump the gates, duck the banners, grab lanterns.",
      rooms: { hall: "Moonlit Hall", kitchen: "Night Kitchen", bedroom: "Guest Room" },
      flight: "MOON FLIGHT", stackK: "Crescent Stack", stackLine: "Stack moons, stars and lanterns. Clear a full row.", nightLine: "Night 1 is free. Night spirits chase her. Nights 2 and 3 unlock together.", winSub: "The moonlit night is clear.", bossName: "MOON"
    },
    thanksgiving: {
      label: "Thanksgiving", menu: "🍂  Thanksgiving",
      props: ["🍂","🦃","🍁","🌽","🥧","🍎","🍂","🍁"],
      brand: "Harvest Hall", a: "Harvest", b: "Hall",
      lede: "Find the harvest in Emma's warm house, fly the autumn sky with her, stack the harvest blocks, or ride the country road.",
      play: "Play the Harvest Hall", section: "Choose your table", foot: "Harvest Hall · Happy Thanksgiving",
      findT: "The Harvest Hall", findD: "Search the warm house for twelve hidden harvest treasures.",
      broomT: "Emma at Dusk", broomD: "Fly the autumn sky. Gather leaves and bring the feast home.",
      stackT: "Harvest Stack", stackD: "Falling leaves, pies and corn. Clear a row.",
      rushT: "Country Ride", rushD: "Emma on the country road. Jump the fences, duck the branches, grab the harvest.",
      rooms: { hall: "Harvest Hall", kitchen: "Harvest Kitchen", bedroom: "Guest Room" },
      flight: "HARVEST FLIGHT", stackK: "Harvest Stack", stackLine: "Stack leaves, pies and corn. Clear a full row.", nightLine: "Night 1 is free. Harvest winds chase her. Nights 2 and 3 unlock together.", winSub: "The harvest night is won.", bossName: "HARVEST"
    },
    newyear: {
      label: "New Year", menu: "🎆  New Year",
      props: ["🎆","🥂","✨","🎇","🕛","🎉","✨","🎆"],
      brand: "New Year", a: "New", b: "Year",
      lede: "Find the sparks in Emma's midnight hall, fly through the fireworks with her, stack the midnight blocks, or ride into the new year.",
      play: "Play the Midnight Hall", section: "Choose your spark", foot: "New Year · Happy New Year",
      findT: "The Midnight Hall", findD: "Search the midnight hall for twelve hidden sparks and glasses.",
      broomT: "Emma at Midnight", broomD: "Fly through the fireworks and keep the sky bright until midnight.",
      stackT: "Midnight Stack", stackD: "Falling sparks, glasses and stars. Clear a row.",
      rushT: "Midnight Ride", rushD: "Emma on the midnight road. Jump the gates and grab the sparks.",
      rooms: { hall: "Midnight Hall", kitchen: "Midnight Kitchen", bedroom: "Guest Room" },
      flight: "MIDNIGHT FLIGHT", stackK: "Midnight Stack", stackLine: "Stack sparks, glasses and stars. Clear a full row.", nightLine: "Night 1 is free. Midnight sparks chase her. Nights 2 and 3 unlock together.", winSub: "Midnight is won.", bossName: "MIDNIGHT"
    }
  };

  function themeBy(id) { return THEMES[id] || THEMES.halloween; }
  function saved() {
    try { return themeBy(localStorage.getItem(KEY) || "").label ? (THEMES[localStorage.getItem(KEY)] ? localStorage.getItem(KEY) : "halloween") : "halloween"; }
    catch (e) { return "halloween"; }
  }
  function textOf(el, value) {
    if (!el) return;
    var kept = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) kept = el.childNodes[i];
    }
    if (kept) kept.textContent = value;
    else el.textContent = value;
  }
  function q(sel) { return document.querySelector(sel); }

  var PACKS = {
    halloween: null,
    christmas: {
      hall: [["Christmas tree","🎄"],["Stocking","🧦"],["Gift","🎁"],["Candy cane","🍬"],["Nutcracker","🪆"],["Star","⭐"],["Bell","🔔"],["Wreath","🎀"],["Snowman","☃️"],["Candle","🕯️"],["Cookie","🍪"],["Reindeer","🦌"]],
      kitchen: [["Cocoa mug","☕"],["Mince pie","🥧"],["Gingerbread","🍪"],["Candy cane","🍬"],["Star cookie","⭐"],["Milk jug","🥛"],["Cinnamon","🍂"],["Wreath","🎀"],["Table candle","🕯️"],["Wrapped gift","🎁"],["Jingle bell","🔔"],["Stocking","🧦"]],
      bedroom: [["Bed stocking","🧦"],["Snow globe","🔮"],["Teddy","🧸"],["Night candle","🕯️"],["Story book","📖"],["Slipper","🥿"],["Window star","⭐"],["Bedside gift","🎁"],["Bell","🔔"],["Cookie","🍪"],["Mini wreath","🎀"],["Nutcracker","🪆"]]
    },
    diwali: {
      hall: [["Diya","🪔"],["Lantern","🏮"],["Rangoli","🪷"],["Firework","🎆"],["Mithai","🍬"],["Gold coin","🪙"],["Marigold","🌼"],["Spark","✨"],["Sparkler","🎇"],["Oil lamp","🪔"],["Toran","🎀"],["Sweet box","🥮"]],
      kitchen: [["Sweet plate","🍬"],["Diyas","🪔"],["Ladoo","🟡"],["Kaju katli","⬜"],["Oil lamp","🪔"],["Marigold","🌼"],["Sparkler","🎇"],["Coin","🪙"],["Rangoli","🪷"],["Lantern","🏮"],["Toran","🎀"],["Firework","🎆"]],
      bedroom: [["Bedside diya","🪔"],["Garland","🌼"],["Gift","🎁"],["Lantern","🏮"],["Coin tray","🪙"],["Rangoli","🪷"],["Spark","✨"],["Sweet box","🥮"],["Oil lamp","🪔"],["Marigold","🌼"],["Toran","🎀"],["Firework","🎆"]]
    },
    holi: {
      hall: [["Pichkari","💦"],["Gulal","🟣"],["Water balloon","🎈"],["Dhol","🥁"],["Thandai","🥤"],["Gujiya","🥟"],["Color bucket","🪣"],["Petals","🌸"],["White kurta","👕"],["Sunglasses","🕶️"],["Rangoli","🪷"],["Sweets","🍬"]],
      kitchen: [["Thandai jug","🥤"],["Gujiya plate","🥟"],["Color bowl","🟣"],["Sweet tray","🍬"],["Water bucket","🪣"],["Petal bowl","🌸"],["Balloon","🎈"],["Gulal tin","🟡"],["Pichkari","💦"],["Rangoli","🪷"],["Color cup","🥤"],["Flower","🌺"]],
      bedroom: [["White kurta","👕"],["Sunglasses","🕶️"],["Petals","🌸"],["Balloon","🎈"],["Gulal","🟣"],["Mirror","🪞"],["Flower","🌺"],["Sweets","🍬"],["Bucket","🪣"],["Rangoli","🪷"],["Dhol","🥁"],["Thandai","🥤"]]
    },
    eid: {
      hall: [["Crescent","🌙"],["Lantern","🏮"],["Dates","🍯"],["Prayer beads","📿"],["Mosque lamp","🕌"],["Star","⭐"],["Gift","🎁"],["Tea pot","🫖"],["Spark","✨"],["Milk glass","🥛"],["Story book","📖"],["New clothes","👕"]],
      kitchen: [["Date plate","🍯"],["Tea pot","🫖"],["Milk glass","🥛"],["Sweet tray","🍬"],["Lantern","🏮"],["Crescent","🌙"],["Star","⭐"],["Gift","🎁"],["Beads","📿"],["Lamp","🕌"],["Book","📖"],["Clothes","👕"]],
      bedroom: [["New clothes","👕"],["Gift","🎁"],["Lantern","🏮"],["Crescent","🌙"],["Beads","📿"],["Book","📖"],["Star","⭐"],["Tea cup","🫖"],["Dates","🍯"],["Lamp","🕌"],["Spark","✨"],["Milk","🥛"]]
    },
    thanksgiving: {
      hall: [["Turkey","🦃"],["Pumpkin pie","🥧"],["Corn","🌽"],["Autumn leaf","🍂"],["Apple","🍎"],["Cranberries","🫐"],["Wheat","🌾"],["Candle","🕯️"],["Honey","🍯"],["Acorn","🌰"],["Basket","🧺"],["Bread","🍞"]],
      kitchen: [["Pie","🥧"],["Turkey platter","🦃"],["Corn","🌽"],["Bread","🍞"],["Apple","🍎"],["Honey","🍯"],["Candle","🕯️"],["Basket","🧺"],["Leaf","🍂"],["Acorn","🌰"],["Wheat","🌾"],["Cranberries","🫐"]],
      bedroom: [["Candle","🕯️"],["Leaf","🍂"],["Book","📖"],["Apple","🍎"],["Acorn","🌰"],["Basket","🧺"],["Pie","🥧"],["Wheat","🌾"],["Honey","🍯"],["Bread","🍞"],["Corn","🌽"],["Turkey","🦃"]]
    },
    newyear: {
      hall: [["Firework","🎆"],["Midnight clock","🕛"],["Champagne","🥂"],["Party hat","🥳"],["Confetti","🎊"],["Balloon","🎈"],["Sparkler","✨"],["Calendar","📅"],["Rocket","🎇"],["Party mask","🎭"],["Bottle","🍾"],["Star","⭐"]],
      kitchen: [["Glass","🥂"],["Bottle","🍾"],["Party plate","🍽️"],["Confetti","🎊"],["Balloon","🎈"],["Sparkler","✨"],["Clock","🕛"],["Hat","🥳"],["Mask","🎭"],["Star","⭐"],["Firework","🎆"],["Calendar","📅"]],
      bedroom: [["Party hat","🥳"],["Balloon","🎈"],["Mask","🎭"],["Clock","🕛"],["Confetti","🎊"],["Star","⭐"],["Glass","🥂"],["Sparkler","✨"],["Calendar","📅"],["Bottle","🍾"],["Firework","🎆"],["Rocket","🎇"]]
    }
  };
  function packFor(room) {
    var all = PACKS[saved()];
    if (!all) return null;
    return all[room] || all.hall || null;
  }
  var MARKS = {
    halloween: null,
    christmas: { ghost:"❄️", skeleton:"🎄", bat:"🔔", wolf:"🦌", zombie:"🎁", witch:"🎅", pumpkin:"⭐" },
    diwali: { ghost:"🪔", skeleton:"🎆", bat:"✨", wolf:"🌸", zombie:"🎇", witch:"🪔", pumpkin:"💛" },
    holi: { ghost:"🎈", skeleton:"💦", bat:"🟣", wolf:"🥁", zombie:"🌸", witch:"🎨", pumpkin:"🥤" },
    eid: { ghost:"🌙", skeleton:"⭐", bat:"✨", wolf:"🏮", zombie:"🕌", witch:"🌙", pumpkin:"⭐" },
    thanksgiving: { ghost:"🍂", skeleton:"🦃", bat:"🍁", wolf:"🌽", zombie:"🥧", witch:"🍎", pumpkin:"🍂" },
    newyear: { ghost:"🎆", skeleton:"🥂", bat:"✨", wolf:"🎇", zombie:"🎉", witch:"🕛", pumpkin:"✨" }
  };
  var PIECES = {
    halloween: null,
    christmas: { pumpkin:"🎁", ghost:"❄️", bat:"🔔", skull:"⭐", cat:"🎄", witch:"🎅", candy:"🍪" },
    diwali: { pumpkin:"🪔", ghost:"✨", bat:"🎆", skull:"🌸", cat:"💛", witch:"🎇", candy:"🍬" },
    holi: { pumpkin:"🎈", ghost:"💦", bat:"🟣", skull:"🥁", cat:"🌸", witch:"🥤", candy:"🥟" },
    eid: { pumpkin:"🌙", ghost:"⭐", bat:"🏮", skull:"✨", cat:"🕌", witch:"🌙", candy:"🍬" },
    thanksgiving: { pumpkin:"🍂", ghost:"🦃", bat:"🍁", skull:"🌽", cat:"🥧", witch:"🍎", candy:"🍪" },
    newyear: { pumpkin:"🎆", ghost:"🥂", bat:"✨", skull:"🎇", cat:"🎉", witch:"🕛", candy:"🍪" }
  };
  var LOOT = {
    halloween: { a:"cans", b:"cams", shield:"CAM SHIELD" },
    christmas: { a:"gifts", b:"bells", shield:"BELL SHIELD" },
    diwali: { a:"sweets", b:"diyas", shield:"DIYA SHIELD" },
    holi: { a:"gulal", b:"balloons", shield:"GULAL SHIELD" },
    eid: { a:"dates", b:"lanterns", shield:"LANTERN SHIELD" },
    thanksgiving: { a:"pies", b:"gourds", shield:"HARVEST SHIELD" },
    newyear: { a:"sparks", b:"glasses", shield:"SPARK SHIELD" }
  };
  window.hollyItemName = function (room, index, fallback) {
    var row = packFor(room);
    return (row && row[index] && row[index][0]) || fallback;
  };
  window.hollyItemMark = function (room, index) {
    var row = packFor(room);
    return (row && row[index] && row[index][1]) || "";
  };
  window.hollyWinSub = function (score) {
    var t = themeBy(saved());
    return (t.winSub || "The night is clear.") + " Score " + score;
  };
  window.hollyBossName = function () {
    var t = themeBy(saved());
    return t.bossName || "WITCH";
  };
  window.hollyMark = function (kind) {
    var pack = MARKS[saved()];
    return pack ? pack[kind] || "" : "";
  };
  window.hollyPiece = function (type) {
    var pack = PIECES[saved()];
    return pack ? pack[type] || "" : "";
  };
  window.hollyLoot = function () { return LOOT[saved()] || LOOT.halloween; };
  var SCENES = {
    halloween: "",
    christmas: "scene-christmas.jpg?v=1",
    diwali: "scene-diwali.jpg?v=1",
    holi: "scene-holi.jpg?v=1",
    eid: "scene-eid.jpg?v=1",
    thanksgiving: "scene-thanksgiving.jpg?v=1",
    newyear: "scene-newyear.jpg?v=1"
  };
  window.hollyScene = function () { return SCENES[saved()] || ""; };
  var WORLD = {
    halloween: null,
    christmas: { can:"#c0392b", cam:"#f4e4a8", rock:"#e7eef4", fog:"#9db4c8", moon:"#f4fbff" },
    diwali:    { can:"#e07a12", cam:"#ffd56a", rock:"#6a3010", fog:"#4a1c08", moon:"#ffd56a" },
    holi:      { can:"#ff4fa3", cam:"#7c5cff", rock:"#ff8ad4", fog:"#6a2878", moon:"#ffd1ea" },
    eid:       { can:"#1f8a5b", cam:"#e7d39a", rock:"#143228", fog:"#0c3024", moon:"#f4fff8" },
    thanksgiving: { can:"#c45c26", cam:"#f0c07a", rock:"#6a3a18", fog:"#4a2410", moon:"#fff4e6" },
    newyear:   { can:"#8eb6ff", cam:"#f4e4a8", rock:"#2a3160", fog:"#12183a", moon:"#d7e4ff" }
  };
  window.hollyWorld = function () { return WORLD[saved()] || null; };
  /* Festival rooms with their own painted 2:3 picture (960x1440). Hotspots are % of the picture:
     x, y = centre, s = size as % of width; names match what is drawn there. A room missing here
     keeps the emoji hunt on the shared festival scene. */
  var ROOM_SCENES = {
    christmas: {
      hall: { file: "hall-christmas.jpg?v=1", items: [
        {n:"Tree star",x:13.8,y:21,s:9},
        {n:"Wreath",x:50.5,y:36,s:13},
        {n:"Stockings",x:50.5,y:49.7,s:20},
        {n:"Candy jars",x:89.5,y:46,s:15},
        {n:"Big rocking horse",x:90,y:69,s:14},
        {n:"Toy train",x:71,y:80.5,s:17},
        {n:"Snowman",x:21.6,y:75,s:11},
        {n:"Wrapped gift",x:31.5,y:75.3,s:10},
        {n:"Lantern",x:7.8,y:88,s:11},
        {n:"Glass of milk",x:29.5,y:84,s:8},
        {n:"Gingerbread cookies",x:23.4,y:87.7,s:10},
        {n:"Candy cane",x:46.3,y:91.7,s:9}
      ], riddles: {
        "Snowman": "Made of snow with a carrot nose",
        "Lantern": "A little glass house for a flame",
        "Glass of milk": "Left out for Santa, cold and white",
        "Big rocking horse": "The bigger wooden pony that never runs",
        "Toy train": "It chugs across the rug",
        "Wreath": "A green ring with a red bow"
      } },
      kitchen: { file: "kitchen-christmas.jpg?v=1", items: [
        {n:"Cuckoo clock",x:11,y:10,s:11},
        {n:"Blue plates",x:7.2,y:23.6,s:12},
        {n:"Tea towel",x:85.6,y:55.7,s:9},
        {n:"Copper kettle",x:49.3,y:40.5,s:13},
        {n:"Red teapot",x:87.7,y:40.5,s:10},
        {n:"Mixing bowl",x:9.6,y:64,s:14},
        {n:"Gingerbread house",x:30,y:69,s:15},
        {n:"Roast turkey",x:74.5,y:72,s:19},
        {n:"Rolling pin",x:51,y:82,s:11},
        {n:"Star cookies",x:27.6,y:86.5,s:18},
        {n:"Hot cocoa",x:84,y:85,s:11},
        {n:"Oven mitt",x:69,y:92.5,s:12}
      ], riddles: {
        "Cuckoo clock": "A little bird pops out to tell the time",
        "Copper kettle": "It whistles when the water boils",
        "Rolling pin": "It flattens the cookie dough",
        "Hot cocoa": "A warm mug topped with marshmallows",
        "Oven mitt": "A spotty glove for hot trays",
        "Tea towel": "A cloth for drying the dishes"
      } },
      bedroom: { file: "bedroom-christmas.jpg?v=1", items: [
        {n:"Full moon",x:42.7,y:13.2,s:8},
        {n:"Hanging star",x:83.5,y:18,s:13},
        {n:"Stocking",x:28.8,y:37,s:9},
        {n:"Table lamp",x:16.8,y:43.7,s:10},
        {n:"Teddy bear",x:49.3,y:49,s:13},
        {n:"Wooden sled",x:78,y:45,s:12},
        {n:"Snow globe",x:93.7,y:52,s:10},
        {n:"Red scarf",x:68.5,y:58,s:12},
        {n:"Nutcrackers",x:13.8,y:79,s:15},
        {n:"Gift pile",x:73.3,y:79.3,s:17},
        {n:"Storybook",x:69.7,y:91,s:14},
        {n:"Slipper",x:92,y:91,s:10}
      ], riddles: {
        "Teddy bear": "A soft friend in a Santa hat",
        "Wooden sled": "It races down snowy hills",
        "Snow globe": "Shake it and it snows inside",
        "Nutcrackers": "Wooden soldiers that crack nuts",
        "Storybook": "Open pages for a bedtime tale",
        "Slipper": "A cosy shoe for cold toes"
      } }
    },
    diwali: {
      hall: { file: "hall-diwali.jpg?v=1", items: [
        {n:"Brass bell",x:49.9,y:12,s:10},
        {n:"Star lantern",x:50.2,y:26,s:15},
        {n:"Carved door",x:50.2,y:55.3,s:19},
        {n:"Green parrots",x:87.5,y:49,s:14},
        {n:"Brass elephants",x:87,y:69.7,s:17},
        {n:"Brass lamp stand",x:10.2,y:66.5,s:12},
        {n:"Peacock feather",x:21,y:55.3,s:10},
        {n:"Silk cushion",x:22.8,y:74,s:14},
        {n:"Sparkler box",x:72.7,y:73,s:9},
        {n:"Flower bowl",x:50.2,y:81.7,s:16},
        {n:"Laddoos",x:16.2,y:91.3,s:15},
        {n:"Gift box",x:87.7,y:89.7,s:14}
      ], riddles: {
        "Brass bell": "Ring it for the evening prayer",
        "Green parrots": "Green birds that like to talk",
        "Brass elephants": "Golden animals with long trunks",
        "Peacock feather": "An eye of blue and green on a quill",
        "Laddoos": "Round sweets piled on a plate",
        "Carved door": "Wooden panels you can walk through"
      } },
      kitchen: { file: "kitchen-diwali.jpg?v=1", items: [
        {n:"Paper lantern",x:89,y:18,s:16},
        {n:"Clay diya",x:71.4,y:46,s:7},
        {n:"Pressure cooker",x:16.5,y:49,s:17},
        {n:"Copper pot",x:47.4,y:51,s:19},
        {n:"Coconut",x:64,y:56,s:12},
        {n:"Bananas",x:87.5,y:57.5,s:18},
        {n:"Brass plates",x:70.5,y:70.5,s:18},
        {n:"Jalebi",x:39,y:78.5,s:22},
        {n:"Spice box",x:23.5,y:87,s:24},
        {n:"Laddoos",x:52.5,y:92,s:22},
        {n:"Tea kettle",x:91.5,y:82,s:16},
        {n:"Chai glasses",x:82,y:92.5,s:18}
      ], riddles: {
        "Pressure cooker": "It whistles when the dal is done",
        "Coconut": "A hairy brown shell with sweet water inside",
        "Jalebi": "Orange swirls dripping with syrup",
        "Spice box": "A round tin of many coloured powders",
        "Clay diya": "A little clay lamp on the windowsill",
        "Paper lantern": "A bright light with dangling paper tails"
      } },
      bedroom: { file: "bedroom-diwali.jpg?v=1", items: [
        {n:"Star lantern",x:53.1,y:11.8,s:17},
        {n:"Kite",x:39,y:25.7,s:11},
        {n:"Sitar",x:37.5,y:50,s:12},
        {n:"Toy elephant",x:49,y:46.9,s:9},
        {n:"Alarm clock",x:60.1,y:47.4,s:6},
        {n:"Bolster pillow",x:87.5,y:50.7,s:23},
        {n:"Tulsi plant",x:23.5,y:50,s:14},
        {n:"Rangoli",x:16.1,y:62.8,s:18},
        {n:"Bangle box",x:12.5,y:81.2,s:22},
        {n:"Jutti shoes",x:42.7,y:80.2,s:15},
        {n:"Sparkler box",x:88,y:73.6,s:17},
        {n:"Storybooks",x:87.5,y:90.3,s:22}
      ], riddles: {
        "Sitar": "Strings and a round belly that sing a raga",
        "Kite": "A paper diamond that dances on the wind",
        "Alarm clock": "Two bells that ring you awake",
        "Rangoli": "A flower of coloured powder on the floor",
        "Jutti shoes": "Embroidered shoes with curled toes",
        "Bangle box": "A little chest full of shiny bracelets"
      } }
    }
  };
  /* Additive: room picture + objects for a festival room, or null (then the emoji hunt is used). */
  window.hollyRoomScene = function (themeId, roomId) {
    var t = themeId || saved();
    var rooms = ROOM_SCENES[t];
    var r = rooms && rooms[roomId];
    if (!r) return null;
    var th = themeBy(t);
    return { file: r.file, items: r.items.map(function (it) { return { n: it.n, x: it.x, y: it.y, s: it.s }; }),
      riddles: r.riddles || {}, name: (th.rooms && th.rooms[roomId]) || roomId };
  };

  function dress(theme, id) {
    var scene = q("#gate .scene");
    if (!scene) return;
    var layer = scene.querySelector(".fest-dress");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "fest-dress";
      scene.appendChild(layer);
    }
    layer.innerHTML = "";
    if (id === "halloween") return;
    (theme.props || []).forEach(function (emoji, i) {
      var s = document.createElement("span");
      s.className = "fest-obj o" + i;
      s.textContent = emoji;
      layer.appendChild(s);
    });
  }
  window.hollyRoomName = function (roomId, fallback) {
    var theme = themeBy(saved());
    return (theme.rooms && theme.rooms[roomId]) || fallback;
  };
  function apply(id) {
    if (!THEMES[id]) id = "halloween";
    var theme = THEMES[id];
    try { localStorage.setItem(KEY, id); } catch (e) {}
    document.documentElement.setAttribute("data-theme", id);
    document.querySelectorAll("[data-theme-label]").forEach(function (el) { el.textContent = theme.label; });
    document.querySelectorAll(".theme-pop button").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-theme-id") === id ? "true" : "false");
    });
    var eye = q(".eyebrow");
    if (eye) {
      var dot = eye.querySelector("i");
      eye.textContent = "";
      if (dot) eye.appendChild(dot);
      eye.appendChild(document.createTextNode((dot ? " " : "") + theme.label + " · 4 free games"));
    }
    textOf(q(".brand"), " " + theme.brand);
    var spans = document.querySelectorAll(".hero h1 span");
    if (spans[0]) spans[0].textContent = theme.a;
    if (spans[1]) spans[1].textContent = theme.b;
    var logo = document.querySelectorAll("#veilTitle span");
    if (logo[0]) logo[0].textContent = theme.a;
    if (logo[1]) logo[1].textContent = theme.b;
    if (q(".lede")) q(".lede").textContent = theme.lede;
    textOf(q("#heroPlay"), theme.play);
    var head = q(".games-head h2");
    if (head) head.textContent = theme.section;
    var foot = q(".gate-foot span");
    if (foot) foot.textContent = theme.foot;
    var cards = {
      "#playFind": [theme.findT, theme.findD],
      "#playBroom": [theme.broomT, theme.broomD],
      "#playStack": [theme.stackT, theme.stackD],
      "#playRush": [theme.rushT, theme.rushD]
    };
    Object.keys(cards).forEach(function (sel) {
      var card = q(sel);
      if (!card) return;
      var title = card.querySelector(".title");
      var desc = card.querySelector(".desc");
      if (title) title.textContent = cards[sel][0];
      if (desc) desc.textContent = cards[sel][1];
    });
    var mode = q("#mode");
    if (mode) mode.textContent = theme.flight;
    document.querySelectorAll(".kicker").forEach(function (el) {
      if (/flight|stack|holly|noel|diya|color|crescent|harvest|midnight/i.test(el.textContent)) {
        if (document.body.querySelector("#c") && el.id !== "mode") el.textContent = theme.flight;
      }
    });
    var kick = q(".topbar .kicker");
    if (kick && !kick.id) kick.textContent = theme.stackK;
    var tag = q(".tagline");
    if (tag) tag.textContent = theme.stackLine;
    var rushTitle = q("#title");
    if (rushTitle && /rush|sleigh|lantern|color run|moonlit|country|midnight ride/i.test(rushTitle.textContent)) rushTitle.textContent = theme.rushT;
    var blurb = q("#blurb");
    if (blurb && rushTitle && rushTitle.textContent === theme.rushT) blurb.textContent = theme.rushD;
    if (q("#roomName") && window.hollyRoomName) {
      var current = (q("#roomName").textContent || "").toLowerCase();
      var map = { hall: "hall", kitchen: "kitchen", bedroom: "bedroom" };
      Object.keys(theme.rooms).forEach(function (key) {
        if (current.indexOf(key) >= 0 || current.indexOf(theme.rooms[key].toLowerCase()) >= 0) {
          q("#roomName").textContent = theme.rooms[key].toUpperCase();
        }
      });
    }
    document.querySelectorAll("img.emma-mark").forEach(function (img) {
      if ((img.getAttribute("src") || "").indexOf("emma-face.png?v=11") !== 0) img.src = FACE;
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.href = "mailto:info@merahissa.co.in?subject=" + encodeURIComponent(theme.brand || "Holly Haunt");
    });
    var levelLine = q("#levelLine");
    if (levelLine && theme.nightLine) levelLine.textContent = theme.nightLine;
    document.querySelectorAll(".game-card .art").forEach(function (art, i) {
      var cover = art.querySelector(".theme-cover");
      if (!cover) { cover = document.createElement("span"); cover.className = "theme-cover"; art.appendChild(cover); }
      if (id === "halloween") { cover.hidden = true; return; }
      cover.hidden = false;
      cover.textContent = (theme.props && theme.props[i % theme.props.length]) || "";
    });
    if (window.refreshRooms) window.refreshRooms();
    dress(theme, id);
    try { window.dispatchEvent(new Event("holly-theme")); } catch (e) {}
    if (window.hollyRefresh) window.hollyRefresh();
    try { if (window.posthog) posthog.capture("theme_applied", { theme: id }); } catch (e) {}
  }
  function menu() {
    var pop = document.createElement("div");
    pop.className = "theme-pop";
    pop.hidden = true;
    Object.keys(THEMES).forEach(function (id) {
      var t = THEMES[id];
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-theme-id", id);
      b.textContent = t.menu;
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        apply(id);
        pop.hidden = true;
      });
      pop.appendChild(b);
    });
    return pop;
  }
  function hold() {
    var box = document.createElement("div");
    box.className = "theme-hold";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip-btn theme-btn";
    btn.innerHTML = "<span class=\"feel-word\">Feel · </span><span data-theme-label>Halloween</span>";
    var pop = menu();
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = pop.hidden;
      document.querySelectorAll(".theme-pop").forEach(function (p) { p.hidden = true; });
      pop.hidden = !open;
    });
    box.appendChild(btn);
    box.appendChild(pop);
    return box;
  }
  function place(parent, center) {
    if (!parent || parent.querySelector(".theme-hold")) return;
    var box = hold();
    if (center && parent.firstElementChild) parent.insertBefore(box, parent.firstElementChild.nextSibling);
    else parent.appendChild(box);
  }
  function mount() {
    place(q(".topbar .right"));
    place(q(".gate-nav"), true);
    var rush = q("header");
    if (rush && !q(".topbar") && !q(".gate-nav")) place(rush);
    apply(saved());
  }
  document.addEventListener("click", function () {
    document.querySelectorAll(".theme-pop").forEach(function (p) { p.hidden = true; });
  });
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(e.newValue || "halloween"); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
