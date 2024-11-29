"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertUtil = void 0;
const common_1 = require("@nestjs/common");
const alphabet_1 = require("../constants/alphabet");
let ConvertUtil = class ConvertUtil {
    constructor() {
        this.textDateRexegp = /(\d+)\s*(years?|months?|days?|hours?|minutes?)\s*ago/;
    }
    convertDate(textDate) {
        const date = new Date();
        const match = textDate.match(this.textDateRexegp);
        if (match) {
            const value = parseInt(match[1], 10);
            const unit = match[2];
            switch (unit) {
                case 'year':
                case 'years':
                    date.setFullYear(date.getFullYear() - value);
                    break;
                case 'month':
                case 'months':
                    date.setMonth(date.getMonth() - value);
                    break;
                case 'day':
                case 'days':
                    date.setDate(date.getDate() - value);
                    break;
                case 'hour':
                case 'hours':
                    date.setHours(date.getHours() - value);
                    break;
                case 'minute':
                case 'minutes':
                    date.setMinutes(date.getMinutes() - value);
                    break;
            }
        }
        return date;
    }
    convertCyrilicLatin(text) {
        return text
            .split('')
            .map((char) => alphabet_1.cyrillicToLatinMap[char] || char)
            .join('')
            .replace(/[^a-zA-Z0-9]/g, '');
    }
};
exports.ConvertUtil = ConvertUtil;
exports.ConvertUtil = ConvertUtil = __decorate([
    (0, common_1.Injectable)()
], ConvertUtil);
//# sourceMappingURL=convert.util.js.map