(function () {
  const TOP_DUCKS = ["Bình", "HLinh", "Hà Phương", "Nam", "Chính", "NLinh", "Phương"];  // New Top 6 Ducks
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

        // Filter out the ducks that should be in the top 6
        let topDucks = result.filter((i) => TOP_DUCKS.includes(i?.name));

        // Filter out the rest of the ducks
        let otherDucks = result.filter((i) => !TOP_DUCKS.includes(i?.name));

        // Shuffle the top ducks to randomize their order within the top 6
        topDucks = topDucks.sort(() => Math.random() - 0.5); // Manual shuffle without calling shuffle again

        // Concatenate the shuffled top ducks (in first 6 positions) and the rest of the ducks
        result.length = 0;  // Clear the original array
        result.push(...topDucks.slice(0, 6), ...otherDucks);

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
