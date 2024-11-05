export const REXEGP = {
  SONG_ID: /^[a-zA-Z0-9-_]{11}$/,
  CLEAT_TITLE: [
    / *\([^)]*\) */g,
    / *\[[^\]]*\] */g,
    / *\{[^}]*\} */g,
    / *<[^>]*> */g,
    /\s{2,}/g,
  ],
};
