const starsContainer = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");

    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.setProperty(
        "--duration",
        (2 + Math.random() * 4) + "s"
    );

    star.style.setProperty(
        "--move-duration",
        (5 + Math.random() * 10) + "s"
    );

    star.style.animationDelay = Math.random() * 5 + "s";

    starsContainer.appendChild(star);
}

document.getElementById("enterBtn").addEventListener("click", () => {
    // We'll connect this button to the memories page later.
    alert("Our memories are waiting...");
});
