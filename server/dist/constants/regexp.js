"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REXEGP = void 0;
exports.REXEGP = {
    SONG_ID: /^[a-zA-Z0-9-_]{11}$/,
    CLEAT_TITLE: [
        / *\([^)]*\) */g,
        / *\[[^\]]*\] */g,
        / *\{[^}]*\} */g,
        / *<[^>]*> */g,
        /\s{2,}/g,
    ],
};
//# sourceMappingURL=regexp.js.map