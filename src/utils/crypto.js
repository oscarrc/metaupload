import { AES, PBKDF2, lib} from 'crypto-js'

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

const deriveKey = async (password, salt) => {
    const key = await PBKDF2(password, salt, {
        keySize: 64 / 32,
        iterations: 1000
    });
    return key.toString();
}

const encryptFile = async (file, key) => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = async (e) => {
            const encrypted = AES.encrypt(lib.WordArray.create(e.target.result), key).toString(); //As base64 ~ 33% overhead        
            const encryptedFile = new File([encrypted], file.name, {type: file.type, lastModified: file.lastModified});
            resolve(encryptedFile);
        }

        reader.readAsArrayBuffer(file);
    });
}

const decryptFile = async (file, chunks, key) => { 
    const f = new Blob(chunks);
    
    return new Promise((resolve) => {
        const reader = new FileReader();
       
        reader.onloadend = async (e) => {
            const decrypted  = AES.decrypt(e.target.result, key)
            const decryptedFile = new File([wordToUint8Array(decrypted)], file.name);
            resolve(decryptedFile);
        }

        reader.readAsText(f)
    })
}

export { encryptFile, decryptFile, deriveKey };