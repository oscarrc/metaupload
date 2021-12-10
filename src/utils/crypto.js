import { AES } from 'crypto-js'
import { lib } from 'crypto-js'

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) 
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

//Read an input file and Encrypt it with crypto-js in AES
const encryptFile = async (file, key) => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = (e) => {
            const bytes = AES.encrypt(lib.WordArray.create(e.target.result), key);
            const encrypted = bytes.toString();
            const encryptedFile = new File([encrypted], file.name, {type: file.type});
            resolve(encryptedFile);
        }

        reader.readAsArrayBuffer(file);
    });
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