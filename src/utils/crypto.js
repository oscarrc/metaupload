import { AES } from 'crypto-js'
import { WordArray } from 'crypto-js/lib'

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) 
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const encryptFile = (file, key) => {
    const reader = new FileReader();
    let encrypted;

    reader.onload = () => {
        encrypted = AES.encrypt(WordArray.create(reader.result), key).toString();
    }

    reader.readAsArrayBuffer(file);

    return new Blob([encrypted]);
}

const decryptFile = (file, key) => {
    const reader = new FileReader();
    let decrypted;

    reader.onload = () => {
        decrypted = AES.decrypt(reader.result, key)
    }

    reader.readAsDataURL(file)

    return new Blob(decrypted);
}

export { randomString, encryptFile, decryptFile };