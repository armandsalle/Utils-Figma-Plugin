// create Mexican Wave
export const mexicanWave = text =>
  [
    ...text
      .toLowerCase()
      .split("")
      .map(
        (e, i) =>
          text.toLowerCase().slice(0, i) +
          text
            .toLowerCase()
            .charAt(i)
            .toUpperCase() +
          text.toLowerCase().slice(i + 1)
      )
  ].filter(e => /[A-Z]/.test(e))
