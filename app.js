(function () {
  var A = window.APP, ua = navigator.userAgent, d = A.downloads;
  var $ = function (i) { return document.getElementById(i); };
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var win = /Windows/i.test(ua);
  var webview = /; wv\)|FBAN|FBAV|Instagram|Line\//i.test(ua); // ilova ichidagi brauzerlar

  // ?manhwa=123&chapter=456  (404.html shu ko'rinishga o'tkazadi)
  var q = new URLSearchParams(location.search);
  var id = q.get("manhwa"), ch = q.get("chapter");
  id = /^\d+$/.test(id || "") ? id : null;
  ch = id && /^\d+$/.test(ch || "") ? ch : null;
  var path = id ? "manhwa/" + id + (ch ? "/" + ch : "") : "";

  var own = android ? d.android : ios ? d.ios : win ? d.windows : "";
  var dl = own || d.other;
  var canOpen = id && (android || (ios && d.ios));

  document.title = A.name;
  $("label").textContent = id ? A.name : "";
  $("title").textContent = id ? "Manhwa #" + id : A.name;
  $("sub").textContent = id ? (ch ? "Bob #" + ch + " ilovada ochiladi." : "Ilovada ochiladi.") : A.tagline;
  $("note").textContent = ios && !own ? "iPhone uchun versiya tez orada chiqadi. Yangiliklar kanaliga qo'shiling."
    : !android && !ios && !own ? "Ilova telefon uchun. Bu havolani telefoningizda oching." : "";
  if (dl) { $("get").href = dl; if (!own) $("get").textContent = "Yangiliklar kanaliga o'tish"; }
  else $("get").hidden = true;

  function openApp(auto) {
    if (android) {
      // ilova bo'lmasa: avtomatik urinishda sahifada qoladi, tugmada esa yuklab olishga o'tadi
      var fb = auto ? location.href.split("#")[0] + "#x" : dl;
      location.href = "intent://" + path + "#Intent;scheme=" + A.scheme + ";package=" + A.androidPackage +
        ";S.browser_fallback_url=" + encodeURIComponent(fb) + ";end";
    } else {
      location.href = A.scheme + "://" + path;
      if (dl) {
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
})();
