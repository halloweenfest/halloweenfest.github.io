(function () {
  var KEY = "holly-theme";
  var FACE = "emma-face.png?v=11";
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "themes.css?v=1";
  document.head.appendChild(link);
  var THEMES = [
    { id: "halloween", label: "Halloween", props: "\uD83C\uDF83  \uD83E\uDD87  \uD83D\uDD6F" },
    { id: "christmas", label: "Christmas", props: "\uD83C\uDF84  \u2B50  \u2744" },
    { id: "diwali", label: "Diwali", props: "\uD83E\uDE94  \u2728  \uD83C\uDF86" },
    { id: "holi", label: "Holi", props: "\uD83D\uDC9C  \uD83D\uDC9B  \uD83D\uDC97" },
    { id: "eid", label: "Eid", props: "\uD83C\uDF19  \u2B50  \uD83D\uDD4C" },
    { id: "thanksgiving", label: "Thanksgiving", props: "\uD83C\uDF42  \uD83E\uDD83  \uD83C\uDF41" },
    { id: "newyear", label: "New Year", props: "\uD83C\uDF86  \uD83E\uDD42  \u2728" }
  ];
  function themeBy(id) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    return THEMES[0];
  }
  function saved() {
    try { return themeBy(localStorage.getItem(KEY)).id; } catch (e) { return "halloween"; }
  }
  function apply(id) {
    var theme = themeBy(id);
    try { localStorage.setItem(KEY, theme.id); } catch (e) {}
    document.documentElement.setAttribute("data-theme", theme.id);
    var labels = document.querySelectorAll("[data-theme-label]");
    for (var i = 0; i < labels.length; i++) labels[i].textContent = theme.label;
    var props = document.querySelectorAll(".theme-props");
    for (var j = 0; j < props.length; j++) props[j].textContent = theme.props;
    var eyes = document.querySelectorAll(".eyebrow");
    for (var k = 0; k < eyes.length; k++) {
      var dot = eyes[k].querySelector("i");
      eyes[k].textContent = "";
      if (dot) eyes[k].appendChild(dot);
      eyes[k].appendChild(document.createTextNode((dot ? " " : "") + theme.label + " \u00b7 4 free games"));
    }
    var faces = document.querySelectorAll("img.emma-mark");
    for (var n = 0; n < faces.length; n++) {
      if ((faces[n].getAttribute("src") || "").indexOf("emma-face.svg") !== 0) faces[n].src = FACE;
    }
    var buttons = document.querySelectorAll(".theme-pop button");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute("aria-current", buttons[b].getAttribute("data-theme-id") === theme.id ? "true" : "false");
    }
  }
  function menu() {
    var pop = document.createElement("div");
    pop.className = "theme-pop";
    pop.hidden = true;
    THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-theme-id", t.id);
      b.textContent = t.props + "  " + t.label;
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        apply(t.id);
        pop.hidden = true;
        try { if (window.posthog) posthog.capture("theme_chosen", { theme: t.id }); } catch (err) {}
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
    btn.setAttribute("aria-haspopup", "true");
    btn.innerHTML = "Feel \u00b7 <span data-theme-label>Halloween</span>";
    var pop = menu();
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = pop.hidden;
      var all = document.querySelectorAll(".theme-pop");
      for (var i = 0; i < all.length; i++) all[i].hidden = true;
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
    if (!document.querySelector(".theme-props")) {
      var p = document.createElement("div");
      p.className = "theme-props";
      p.setAttribute("aria-hidden", "true");
      document.body.appendChild(p);
    }
    place(document.querySelector(".topbar .right"));
    place(document.querySelector(".gate-nav"), true);
    var rush = document.querySelector("header");
    if (rush && !document.querySelector(".topbar") && !document.querySelector(".gate-nav")) place(rush);
    apply(saved());
  }
  document.addEventListener("click", function () {
    var all = document.querySelectorAll(".theme-pop");
    for (var i = 0; i < all.length; i++) all[i].hidden = true;
  });
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(e.newValue || "halloween");
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
