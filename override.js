(function () {
  const FIRST_DUCK_NAME = "Nam";  // The duck that should always be first
  const LAST_DUCK_NAME = "Lan";   // The duck that should always be last
  const outputColor = "color:yellow; font-size:14px; font-weight: bold;";

  console.log(
    `%c Patched by @tmsanghoclaptrinh - First Duck: ${FIRST_DUCK_NAME}, Last Duck: ${LAST_DUCK_NAME}`,
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

        // Find the index of the ducks with the names "Nam" and "Lan"
        let firstDuckIndex = result.findIndex(
          (i) => i?.name === FIRST_DUCK_NAME
        );
        let lastDuckIndex = result.findIndex(
          (i) => i?.name === LAST_DUCK_NAME
        );

        // Ensure "Nam" is in the first position
        if (firstDuckIndex >= 0 && firstDuckIndex !== 0) {
          let temp = result[0];
          result[0] = result[firstDuckIndex];
          result[firstDuckIndex] = temp;
        }

        // Ensure "Lan" is in the last position
        if (lastDuckIndex >= 0 && lastDuckIndex !== result.length - 1) {
          let temp = result[result.length - 1];
          result[result.length - 1] = result[lastDuckIndex];
          result[lastDuckIndex] = temp;
        }

        return result;
      };
    });
})();
