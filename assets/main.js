// MKE Home & Garden Care — small interactions
(function () {
  // Mobile nav toggle
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
      // close menu after clicking a link (mobile)
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); });
      });
    }

    // Contact / quote form -> friendly success (static placeholder)
    var form = document.getElementById("mke-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = document.getElementById("form-ok");
        if (ok) ok.classList.add("show");
        form.reset();
        if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  });
})();
