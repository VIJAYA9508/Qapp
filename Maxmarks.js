let scoresBtn = document.querySelector(
    "#view-Max-marks"
);
function printMaxmarks() {
    let Maxmarks =
        JSON.parse(
            window.localStorage.getItem(
                "Maxmarks"
            )
        ) || [];
    Maxmarks.sort(function (a, b) {
        return b.score - a.score;
    });
    Maxmarks.forEach(function (
        score
    ) {
        let liTag =
            document.createElement(
                "li"
            );
        liTag.textContent =
            score.name +
            " - " +
            score.score;
        let olEl =
            document.getElementById(
                "Maxmarks"
            );
        olEl.appendChild(liTag);
    });
}
function clearMaxmarks() {
    window.localStorage.removeItem(
        "Maxmarks"
    );
    window.location.reload();
}
document.getElementById(
    "clear"
).onclick = clearMaxmarks;

printMaxmarks();