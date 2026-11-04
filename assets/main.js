// MKE Home & Garden Care — small interactions
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav toggle
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); });
      });
    }

    // Contact / quote form -> submit via Formspree
    var form = document.getElementById("mke-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn ? btn.textContent : "Send my request";
        if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }

        var data = new FormData(form);
        fetch(form.action, {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        })
        .then(function (response) {
          if (response.ok) {
            var ok = document.getElementById("form-ok");
            if (ok) {
              ok.classList.add("show");
              ok.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            form.reset();
          } else {
            return response.text().then(function (text) {
              throw new Error(text || "Submission failed");
            });
          }
        })
        .catch(function (err) {
          var errEl = document.getElementById("form-err");
          if (!errEl) {
            errEl = document.createElement("div");
            errEl.id = "form-err";
            errEl.className = "form-err show";
            errEl.textContent = "Sorry — we couldn't send your request right now. Please email us directly at info@mkegardencare.com.au or call us.";
            form.parentNode.insertBefore(errEl, form.nextSibling);
          }
          console.error("Form error:", err);
        })
        .finally(function () {
          if (btn) { btn.textContent = originalText; btn.disabled = false; }
        });
      });
    }
  });
})();
