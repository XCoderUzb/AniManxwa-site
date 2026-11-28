(function () {
  var A = window.APP, ua = navigator.userAgent, d = A.downloads;
  var $ = function (i) { return document.getElementById(i); };
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var win = /Windows/i.test(ua);
  var webview = /; wv\)|FBAN|FBAV|Instagram|Line\//i.test(ua); // ilova ichidagi brauzerlar

  // ?manhwa=123&chapter=456  (404.html shu ko'rinishga o'tkazadi)
  var q = new URLSearchParams(location.search);
  var T = (q.get("t") || "").toLowerCase(), id = q.get("s"), ch = q.get("c");
  id = /^(manga|manhwa|manhua|novella)$/.test(T) && /^[\w\-.%]+$/.test(id || "") ? id : null;
  ch = id && /^\d+$/.test(ch || "") ? ch : null;
  var prof = q.get("p") === "profile"; // /Profile havolasi -> ilovada profil bo'limi
  var path = id ? T + "/" + id + (ch ? "/" + ch : "") : prof ? "profile" : "";
  var nice = id ? decodeURIComponent(id).replace(/-/g, " ") : "";
  nice = nice.charAt(0).toUpperCase() + nice.slice(1);

  var own = android ? d.android : ios ? d.ios : win ? d.windows : "";
  var dl = own || d.other;
  var canOpen = (id || prof) && (android || win || (ios && d.ios));

  document.title = A.name;
  $("label").textContent = id ? T.charAt(0).toUpperCase() + T.slice(1) : prof ? "Profil" : "";
  $("title").textContent = id ? nice : A.name;
  $("sub").textContent = id ? (ch ? ch + "-bob ilovada ochiladi." : "Ilovada ochiladi.") : prof ? "Profilingiz ilovada ochiladi." : A.tagline;
  $("note").textContent = ios && !own ? "iPhone uchun versiya tez orada chiqadi. Yangiliklar kanaliga qo'shiling."
    : !android && !ios && !own ? "Ilova telefon uchun. Bu havolani telefoningizda oching." : "";
  if (win && own) { $("get").textContent = "Windows uchun yuklab olish"; if (id || prof) $("note").textContent = "Ilova o'rnatilgan bo'lsa, «Ilovada ochish» tugmasini bosing."; }
  if (dl) { $("get").href = dl; if (!own) $("get").textContent = "Yangiliklar kanaliga o'tish"; }
  else $("get").hidden = true;

  function openApp(auto, p2) {
    var pth = p2 || path;
    if (android) {
      // ilova bo'lmasa: avtomatik urinishda sahifada qoladi, tugmada esa yuklab olishga o'tadi
      var fb = auto ? location.href.split("#")[0] + "#x" : dl;
      location.href = "intent://" + pth + "#Intent;scheme=" + A.scheme + ";package=" + A.androidPackage +
        ";S.browser_fallback_url=" + encodeURIComponent(fb) + ";end";
    } else {
      location.href = A.scheme + "://" + pth;
      if (dl && !win) { // Windows'da brauzer so'rov oynasini ko'rsatadi, shuning uchun yuklab olishga o'tkazmaymiz
        var t = setTimeout(function () { location.href = dl; }, 1800);
        document.addEventListener("visibilitychange", function () { clearTimeout(t); });
      }
    }
  }

  if (canOpen) {
    $("open").hidden = false;
    $("open").onclick = function (e) { e.preventDefault(); openApp(false); };
    if (android && !webview && !location.hash) openApp(true); // brauzer ruxsat bersa, o'zi ochadi
  }

  // ---- katalog: serverdagi mangalar (ilovaga yuklangan zahoti saytda ham chiqadi; 18+ asarlar ko'rinmaydi) ----
  var slug = function (t) { return String(t).toLowerCase().replace(/[ʻ'’‘`]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); };
  if (A.api && !id && !prof) {
    fetch(A.api.replace(/\/+$/, "") + "/api/manga").then(function (r) { return r.json(); }).then(function (l) {
      if (!Array.isArray(l) || !l.length) return;
      var ts = function (m) { return Math.max(m.at || 0, Math.max.apply(null, [0].concat((m.chapters || []).map(function (c) { return c.at || 0; })))); };
      l.sort(function (a, b) { return ts(b) - ts(a); });
      var g = $("grid"); $("cat").hidden = false; document.body.classList.add("has-cat");
      l.slice(0, 60).forEach(function (m) {
        var p = String(m.type || "manga").toLowerCase() + "/" + slug(m.title);
        var a = document.createElement("a"); a.className = "mc"; a.href = "#";
        var im = document.createElement("img"); im.loading = "lazy"; im.alt = ""; im.src = m.cover || ""; a.appendChild(im);
        var b = document.createElement("b"); b.textContent = m.title; a.appendChild(b);
        var s = document.createElement("span"); s.textContent = "★ " + (m.rating ? m.rating.toFixed(1) : "-") + " · " + (m.chapters || []).length + " bob"; a.appendChild(s);
        a.onclick = function (e) { e.preventDefault(); openCard(p); };
        g.appendChild(a);
      });
    }).catch(function () {});
  }
  function openCard(p) {
    if (android || (ios && d.ios)) return openApp(false, p); // ilova bo'lmasa, Android o'zi yuklab olishga o'tkazadi
    if (win && own) { // Windows: ilova o'rnatilgan bo'lsa, brauzer so'raydi; ochilmasa yuklab olish havolasi chiqadi
      var blurred = false, f = function () { blurred = true; };
      window.addEventListener("blur", f, { once: true });
      location.href = A.scheme + "://" + p;
      setTimeout(function () { if (!blurred && !document.hidden) { $("hdl").href = own; $("hint").hidden = false; } }, 2500);
      return;
    }
    if (dl) location.href = dl;
  }
})();
