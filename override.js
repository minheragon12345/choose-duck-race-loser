(function () {
  const TOP_DUCKS = ["Nam", "Bình", "Hà Phương", "Tuấn", "Tâm", "Hướng"];  // Ducks that should always be in the top 1
  const LAST_DUCK_NAME = "Lan";  // The duck that should always be last
  const outputColor = "color:yellow; font-size:14px; font-weight: bold;";

  console.log(
    `%c Patched by @tmsanghoclaptrinh - Top Ducks: ${TOP_DUCKS.join(", ")}, Last Duck: ${LAST_DUCK_NAME}`,
    outputColor
  );

  let iframe = document.querySelector('iframe[src*="duck-race"]');

  [window, iframe?.contentWindow]
    .filter((_) => _)
    .forEach((win) => {
      if (!win.ufs_duckRace_originalShuffle)
        win.ufs_duckRace_originalShuffle = win.Array.prototype.shuffle;

      win.Array.prototype.shuffle = function () {
        const result = win.ufs_duckRace_originalShuffle.apply(this, arguments);

        // Move the ducks in TOP_DUCKS to the first position
        let firstDuckIndex = result.findIndex(
          (i) => TOP_DUCKS.includes(i?.name)
        );

        if (firstDuckIndex >= 0 && firstDuckIndex !== 0) {
          let temp = result[0];
          result[0] = result[firstDuckIndex];
          result[firstDuckIndex] = temp;
        }

        // Ensure "Lan" is in the last position
        let lastDuckIndex = result.findIndex(
          (i) => i?.name === LAST_DUCK_NAME
        );

        if (lastDuckIndex >= 0 && lastDuckIndex !== result.length - 1) {
          let temp = result[result.length - 1];
          result[result.length - 1] = result[lastDuckIndex];
          result[lastDuckIndex] = temp;
        }

        return result;
      };
    });
})();
