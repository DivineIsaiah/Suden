
//    COURSE CARD INFORMATION OVERLAY

const courseCardWrappers = document.querySelectorAll(".course-card-wrap");

courseCardWrappers.forEach((wrapper) => {
    const infoBtn = wrapper.querySelector(".info-btn");
    const closeBtn = wrapper.querySelector(".course-card-hover-close");

    if (!infoBtn || !closeBtn) return;

    // OPEN COURSE INFORMATION
    infoBtn.addEventListener("click", () => {
        wrapper.classList.add("is-open");

        infoBtn.setAttribute("aria-expanded", "true");
    });

    // CLOSE COURSE INFORMATION
    closeBtn.addEventListener("click", () => {
        wrapper.classList.remove("is-open");

        infoBtn.setAttribute("aria-expanded", "false");

        infoBtn.focus();
    });
});

// CLOSE WHEN CLICKING OUTSIDE A COURSE CARD
document.addEventListener("click", (event) => {
    courseCardWrappers.forEach((wrapper) => {
        if (!wrapper.contains(event.target)) {
            wrapper.classList.remove("is-open");

            const infoBtn = wrapper.querySelector(".info-btn");

            if (infoBtn) {
                infoBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
});

// CLOSE WITH ESCAPE KEY
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        courseCardWrappers.forEach((wrapper) => {
            wrapper.classList.remove("is-open");

            const infoBtn = wrapper.querySelector(".info-btn");

            if (infoBtn) {
                infoBtn.setAttribute("aria-expanded", "false");
            }
        });
    }
});