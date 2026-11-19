function switchTab(sectionId, button) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });

    document.querySelectorAll(".nav-tab-btn").forEach(tab => {
        tab.classList.remove("active");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.style.display = "block";
    }

    if (button) {
        button.classList.add("active");
    }
}

function closeStreamPortal() {
    const portal = document.getElementById("inline-stream-layer");

    if (portal) {
        portal.style.display = "none";
    }
}

function reloadStreamPortal() {
    const iframe = document.getElementByElementById(
        "secure-iframe"
    );

    if (iframe) {
        iframe.src = iframe.src;
    }
}

function toggleuserFullscreen() {
    const portal = document.getElementById("inline-stream-layer");

    if (!portal) return;

    if (!document.fullscreenElement) {
        portal.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.getElementById("nav-home");
    switchTab("home-section", homeButton);
});
