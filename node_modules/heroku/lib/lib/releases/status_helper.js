"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = exports.description = void 0;
const description = function (release) {
    switch (release.status) {
        case 'pending':
            return 'release command executing';
        case 'failed':
            return 'release command failed';
        default:
            return '';
    }
};
exports.description = description;
const color = function (s) {
    switch (s) {
        case 'pending':
            return 'yellow';
        case 'failed':
            return 'red';
        default:
            return 'white';
    }
};
exports.color = color;
