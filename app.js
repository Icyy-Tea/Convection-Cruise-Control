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
    portal.style.display = "none";
}

function reloadStreamPortal() {
    const iframe = document.getElementById(
        "Convection Current Cruise-secure-iframe"
    );
    iframe.src = iframe.src;
}

function toggleuserFullscreen() {
    const portal = document.getElementById("inline-stream-layer");

    if (!document.fullscreenElement) {
        portal.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    switchTab("home-section", document.getElementById("nav-home"));
});
