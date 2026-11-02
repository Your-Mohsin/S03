
/* ==================================
   ADD YOUR MEMORIES HERE
================================== */

const memories = [
    {
        type: "image",
        src: "assets/photos/Photo1.jpg",
        title: "That unforgettable moment",
        caption: "Write what happened here..."
    },

    {
        type: "image",
        src: "assets/photos/Photo2.jpg",
        title: "One of our best memories",
        caption: "Write your own story here..."
    },

    {
        type: "image",
        src: "assets/photos/Photo3.jpg",
        title: "A moment worth remembering",
        caption: "Describe this recording here..."
    }
];


/* YOUR FINAL MESSAGE */

const finalMessage = `Some moments may fade with time,
but the memories we made will always
have a place worth returning to.`;


/* ==================================
   STARS
================================== */

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.setProperty("--duration",
        (2 + Math.random() * 4) + "s");

    star.style.setProperty("--move-duration",
        (5 + Math.random() * 10) + "s");

    star.style.animationDelay = Math.random() * 5 + "s";

    starsContainer.appendChild(star);
}


/* ==================================
   PAGE ELEMENTS
================================== */

const intro = document.getElementById("intro");
const gallery = document.getElementById("gallery");
const finalScreen = document.getElementById("finalScreen");

const image = document.getElementById("memoryImage");
const video = document.getElementById("memoryVideo");

image.onload = () => {
    console.log("IMAGE LOADED:", image.src);
};

image.onerror = () => {
    console.error("IMAGE FAILED:", image.src);
};

const counter = document.getElementById("counter");
const title = document.getElementById("captionTitle");
const caption = document.getElementById("captionText");

let currentIndex = 0;


/* ==================================
   PAGE NAVIGATION
================================== */

function showPage(page) {
    intro.classList.add("hidden");
    gallery.classList.add("hidden");
    finalScreen.classList.add("hidden");

    page.classList.remove("hidden");
}


/* ENTER BUTTON */

document.getElementById("enterBtn").addEventListener("click", () => {
    if (memories.length === 0) {
        alert("Add your memories first!");
        return;
    }

    currentIndex = 0;
    showPage(gallery);
    showMemory();
});


/* ==================================
   SHOW MEMORY
================================== */

function showMemory() {
    const memory = memories[currentIndex];

    video.pause();
    video.removeAttribute("src");
    video.load();

    image.style.display = "none";
    video.style.display = "none";

    counter.textContent =
        `MEMORY ${String(currentIndex + 1).padStart(2, "0")} / ${memories.length}`;

    title.textContent = memory.title || "";
    caption.textContent = memory.caption || "";

    if (memory.type === "video") {
        video.src = memory.src;
        video.style.display = "block";
    } else {
        image.src = memory.src;
        image.style.display = "block";
    }
}


/* ==================================
   NEXT / PREVIOUS
================================== */

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex < memories.length - 1) {
        currentIndex++;
        showMemory();
    } else {
        showPage(finalScreen);
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showMemory();
    }
});


/* ==================================
   SWIPE SUPPORT
================================== */

let touchStartX = 0;

gallery.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

gallery.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const difference = touchEndX - touchStartX;

    if (Math.abs(difference) < 60) return;

    // Don't change memory while interacting with video controls
    if (e.target.closest("video")) return;

    if (difference < 0) {
        document.getElementById("nextBtn").click();
    } else {
        document.getElementById("prevBtn").click();
    }
}, { passive: true });


/* ==================================
   FINAL MESSAGE & REPLAY
================================== */

document.getElementById("finalMessage").textContent = finalMessage;

document.getElementById("replayBtn").addEventListener("click", () => {
    currentIndex = 0;
    showPage(gallery);
    showMemory();
});
