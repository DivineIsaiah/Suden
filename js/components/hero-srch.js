const heroSearchControl = document.querySelector(".hero-search-control");
const exploreBtn = document.querySelector("#heroExploreBtn");
const heroSearch = document.querySelector("#heroSearch");
const searchInput = document.querySelector("#heroSearchInput");

exploreBtn.addEventListener("click", () => {
    heroSearchControl.classList.add("is-searching");

    exploreBtn.setAttribute("aria-expanded", "true");

    setTimeout(() => {
        searchInput.focus();
    }, 350);
});

// Allow users to close the search using Escape
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        heroSearchControl.classList.remove("is-searching");
        exploreBtn.setAttribute("aria-expanded", "false");
        exploreBtn.focus();
    }
});