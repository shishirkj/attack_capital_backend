"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStrongPassword = void 0;
const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    return (password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar);
};
exports.isStrongPassword = isStrongPassword;
