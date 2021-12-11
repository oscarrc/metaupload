import { AES, lib } from 'crypto-js'

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) 
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const wordToUint8Array = (wordArray) => {
    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length), index=0, word, i;
    for (i=0; i<length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
}


//Read an input file and Encrypt it with crypto-js in AES
const encryptFile = async (file, key) => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = async (e) => {
            const encrypted = AES.encrypt(lib.WordArray.create(e.target.result), key).toString();         
            const encryptedFile = new File([encrypted], file.name, {type: file.type, lastModified: file.lastModified});
            resolve(encryptedFile);
        }

        reader.readAsArrayBuffer(file);
    });
}


const decryptFile = async (chunks, key) => { 
    const f = new Blob(chunks);
    
    return new Promise((resolve) => {
        const reader = new FileReader();
       
        reader.onloadend = async (e) => {
            const decrypted  = AES.decrypt(e.target.result, key)
            const decryptedFile = new Blob([wordToUint8Array(decrypted)]);
            resolve(decryptedFile);
        }

        reader.readAsText(f)
    })
}

export { randomString, encryptFile, decryptFile };