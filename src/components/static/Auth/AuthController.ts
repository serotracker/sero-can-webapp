import * as crypto from "crypto-js";

// Note, this password protection method is intended for deterrence, not a robust security solution
export function checkPassword(password: string) {
    const msg = "decrypted string"
    const encrypted = "U2FsdGVkX1/8XcUQ6PdvFxmM8rTNnwQeyb+MvIXh2hrwvoER4IWLu1It5+Hv/28K";
    const decryptedMsg = crypto.AES.decrypt(encrypted, password);
    const passwordValid = decryptedMsg.toString(crypto.enc.Utf8) === msg;
    return passwordValid;
}