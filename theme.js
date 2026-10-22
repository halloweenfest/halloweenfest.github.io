(function () {
  var KEY = "holly-theme";
  var FACE = "emma-face.png?v=11";
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "themes.css?v=2";
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
      flight: "EMMA'S FLIGHT", stackK: "Holly Stack", stackLine: "Stack pumpkins, ghosts, bats, cats and Emma. Fill a row to clear it."
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
      flight: "SNOW FLIGHT", stackK: "Noel Stack", stackLine: "Stack gifts, stars, trees and bells. Clear a full row."
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
      flight: "LIGHT FLIGHT", stackK: "Diya Stack", stackLine: "Stack lamps, sweets and sparks. Clear a full row."
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
      flight: "COLOR FLIGHT", stackK: "Color Stack", stackLine: "Stack bursts of color. Clear a full row."
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
      flight: "MOON FLIGHT", stackK: "Crescent Stack", stackLine: "Stack moons, stars and lanterns. Clear a full row."
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
      flight: "HARVEST FLIGHT", stackK: "Harvest Stack", stackLine: "Stack leaves, pies and corn. Clear a full row."
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
      flight: "MIDNIGHT FLIGHT", stackK: "Midnight Stack", stackLine: "Stack sparks, glasses and stars. Clear a full row."
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

  var ITEMS = {
    halloween: null,
    christmas: {
      hall: ["Christmas moon","Festive bear","Gift chest","Snow globe","Nutcracker","Party mask","Wooden pup","Tree light","Hourglass","Spectacles","Thimble","Golden key"],
      kitchen: ["Wall clock","Lantern","Christmas moon","Mantel light","Cocoa pot","Tree pumpkin","Red candle","Cookie plate","Shelf lights","Rolling pin","Mince pie","House cat"],
      bedroom: ["Crescent","Christmas moon","Oval mirror","Jewelry box","Grandfather clock","Little light","Tree light","Festive bear","Toy train","Spectacles","Hourglass","Story book"]
    },
    diwali: {
      hall: ["Festival moon","Diya bear","Sweet chest","Music box","Toy guard","Festive mask","Wooden pup","Oil lamp","Hourglass","Spectacles","Thimble","Brass key"],
      kitchen: ["Wall clock","Hanging diya","Festival moon","Mantel diya","Sweet pot","Oil lamp","Red candle","Mithai plate","Shelf diyas","Rolling pin","Festive pie","House cat"],
      bedroom: ["Crescent","Festival moon","Oval mirror","Jewelry box","Grandfather clock","Little diya","Oil lamp","Diya bear","Toy train","Spectacles","Hourglass","Story book"]
    },
    holi: {
      hall: ["Color moon","Color bear","Color chest","Music box","Color guard","Color mask","Color pup","Color lamp","Hourglass","Spectacles","Thimble","Color key"],
      kitchen: ["Wall clock","Color lantern","Color moon","Color lamp","Color pot","Color gourd","Color candle","Color sweets","Shelf colors","Rolling pin","Color pie","Color cat"],
      bedroom: ["Crescent","Color moon","Oval mirror","Jewelry box","Grandfather clock","Little lamp","Color lamp","Color bear","Toy train","Spectacles","Hourglass","Story book"]
    },
    eid: {
      hall: ["Crescent moon","Lantern bear","Gift chest","Music box","Night guard","Moon mask","Wooden pup","Hanging lantern","Hourglass","Spectacles","Thimble","Silver key"],
      kitchen: ["Wall clock","Hanging lantern","Crescent moon","Mantel lantern","Evening pot","Lantern","Candle","Sweet plate","Shelf lanterns","Rolling pin","Evening pie","House cat"],
      bedroom: ["Crescent","Eid moon","Oval mirror","Jewelry box","Grandfather clock","Little lantern","Hanging lantern","Lantern bear","Toy train","Spectacles","Hourglass","Story book"]
    },
    thanksgiving: {
      hall: ["Harvest moon","Harvest bear","Harvest chest","Music box","Harvest guard","Harvest mask","Harvest pup","Harvest gourd","Hourglass","Spectacles","Thimble","Harvest key"],
      kitchen: ["Wall clock","Harvest lantern","Harvest moon","Mantel gourd","Harvest pot","Harvest gourd","Candle","Pie plate","Shelf gourds","Rolling pin","Harvest pie","House cat"],
      bedroom: ["Crescent","Harvest moon","Oval mirror","Jewelry box","Grandfather clock","Little gourd","Harvest gourd","Harvest bear","Toy train","Spectacles","Hourglass","Story book"]
    },
    newyear: {
      hall: ["Midnight moon","Party bear","Gift chest","Music box","Nutcracker","Party mask","Party pup","Party lantern","Countdown glass","Spectacles","Thimble","Midnight key"],
      kitchen: ["Wall clock","Party lantern","Midnight moon","Mantel spark","Party pot","Party lantern","Candle","Party plate","Shelf sparks","Rolling pin","Midnight pie","House cat"],
      bedroom: ["Crescent","Midnight moon","Oval mirror","Jewelry box","Grandfather clock","Little spark","Party lantern","Party bear","Toy train","Spectacles","Hourglass","Story book"]
    }
  };
  var MARKS = {
    halloween: null,
    christmas: { ghost:"❄️", skeleton:"🎄", bat:"🔔", wolf:"🦌", zombie:"🎁", witch:"🎅", pumpkin:"⭐" },
    diwali: { ghost:"🪔", skeleton:"🎆", bat:"✨", wolf:"🌸", zombie:"🎇", witch:"🪔", pumpkin:"💛" },
    holi: { ghost:"💜", skeleton:"💛", bat:"💚", wolf:"💗", zombie:"💙", witch:"🎨", pumpkin:"💜" },
    eid: { ghost:"🌙", skeleton:"⭐", bat:"✨", wolf:"🏮", zombie:"🕌", witch:"🌙", pumpkin:"⭐" },
    thanksgiving: { ghost:"🍂", skeleton:"🦃", bat:"🍁", wolf:"🌽", zombie:"🥧", witch:"🍎", pumpkin:"🍂" },
    newyear: { ghost:"🎆", skeleton:"🥂", bat:"✨", wolf:"🎇", zombie:"🎉", witch:"🕛", pumpkin:"✨" }
  };
  var PIECES = {
    halloween: null,
    christmas: { pumpkin:"🎁", ghost:"❄️", bat:"🔔", skull:"⭐", cat:"🎄", witch:"🎅", candy:"🍪" },
    diwali: { pumpkin:"🪔", ghost:"✨", bat:"🎆", skull:"🌸", cat:"💛", witch:"🎇", candy:"🍬" },
    holi: { pumpkin:"💜", ghost:"💛", bat:"💚", skull:"💗", cat:"💙", witch:"🎨", candy:"🍬" },
    eid: { pumpkin:"🌙", ghost:"⭐", bat:"🏮", skull:"✨", cat:"🕌", witch:"🌙", candy:"🍬" },
    thanksgiving: { pumpkin:"🍂", ghost:"🦃", bat:"🍁", skull:"🌽", cat:"🥧", witch:"🍎", candy:"🍪" },
    newyear: { pumpkin:"🎆", ghost:"🥂", bat:"✨", skull:"🎇", cat:"🎉", witch:"🕛", candy:"🍪" }
  };
  var LOOT = {
    halloween: { a:"cans", b:"cams", shield:"CAM SHIELD" },
    christmas: { a:"gifts", b:"bells", shield:"BELL SHIELD" },
    diwali: { a:"sweets", b:"diyas", shield:"DIYA SHIELD" },
    holi: { a:"colors", b:"packs", shield:"COLOR SHIELD" },
    eid: { a:"dates", b:"lanterns", shield:"LANTERN SHIELD" },
    thanksgiving: { a:"pies", b:"gourds", shield:"HARVEST SHIELD" },
    newyear: { a:"sparks", b:"glasses", shield:"SPARK SHIELD" }
  };
  window.hollyItemName = function (room, index, fallback) {
    var pack = ITEMS[saved()];
    var row = pack && pack[room];
    return (row && row[index]) || fallback;
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
    btn.innerHTML = "Feel · <span data-theme-label>Halloween</span>";
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
