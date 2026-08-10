(function () {
    "use strict";

    /* ---------- Mobile nav ---------- */
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const open = navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(open));
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.focus();
            }
        });
    }

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
        revealEls.forEach((el) => el.classList.add("in"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => revealObserver.observe(el));
    }

    /* ---------- Active nav link ---------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((link) => {
                        const target = link.getAttribute("href").substring(1);
                        link.classList.toggle("active", target === entry.target.id);
                    });
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        sections.forEach((section) => sectionObserver.observe(section));
    }

    /* ---------- Form validation ---------- */
    const form = document.getElementById("contact-form");
    if (form) {
        const fields = {
            name: form.querySelector("#name"),
            email: form.querySelector("#email"),
            subject: form.querySelector("#subject"),
            message: form.querySelector("#message"),
        };
        const successMsg = document.getElementById("form-success");

        const validators = {
            name: (value) =>
                value.trim().length >= 2
                    ? ""
                    : "Please enter your name (at least 2 characters).",
            email: (value) => {
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
                return ok ? "" : "Please enter a valid email address.";
            },
            subject: (value) =>
                value.trim() ? "" : "Please add a subject.",
            message: (value) =>
                value.trim().length >= 10
                    ? ""
                    : "Your message should be at least 10 characters.",
        };

        function validateField(name) {
            const field = fields[name];
            const error = validators[name](field.value);
            field.closest(".field").classList.toggle("invalid", Boolean(error));
            return error;
        }

        Object.keys(fields).forEach((name) => {
            fields[name].addEventListener("input", () => validateField(name));
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            successMsg.classList.remove("visible");

            const errors = {};
            Object.keys(fields).forEach((name) => {
                errors[name] = validateField(name);
            });

            const firstInvalid = Object.keys(fields).find((name) => errors[name]);
            if (firstInvalid) {
                fields[firstInvalid].focus();
                return;
            }

            const data = new FormData(form);
            const subject = data.get("subject");
            const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`;
            const mailto = `mailto:hamzakashifkhanzada@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;

            successMsg.classList.add("visible");
            form.reset();
        });
    }
})();
