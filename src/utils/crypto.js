import { AES, lib } from 'crypto-js'

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) 
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const wordToByteArray = (wordArray) => {
    var byteArray = [], word, i, j;
    for (i = 0; i < wordArray.length; ++i) {
        word = wordArray[i];
        for (j = 3; j >= 0; --j) {
            byteArray.push((word >> 8 * j) & 0xFF);
        }
    }
    return byteArray;
}

//Read an input file and Encrypt it with crypto-js in AES
const encryptFile = async (file, key) => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = async (e) => {
            const bytes = AES.encrypt(lib.WordArray.create(e.target.result), key);
            const encrypted = bytes.toString();
            const encryptedFile = new File([encrypted], file.name, {type: file.type});
            resolve(encryptedFile);
        }

        reader.readAsArrayBuffer(file);
    });
}


const decryptFile = (file, key) => {    
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onloadend = (e) => {
            const words = AES.decrypt(lib.WordArray.create(e.target.result), key);
            const decrypted = wordToByteArray(words).buffer;
            const decryptedFile = new File([decrypted], file.name, {type: file.type});
            
            resolve(decryptedFile);
        }

        reader.readAsArrayBuffer(file)
    })
}

export { randomString, encryptFile, decryptFile };