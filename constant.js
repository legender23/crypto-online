const [ classicalCryptoPath, oneWayCryptoPath, modernCryptoPath, commonCodePath ] = [ "./classicalCrypto/", "./CryptoJS/rollups/", "./CryptoJS/rollups/", "./CryptoJS/components/" ];
const classicalEnc = [ 'Caser', 'Vigenere', 'Fence', 'Affine',  ];
const modernEnc = [ 'Rabbit', 'RC4', 'AES', 'TripleDes' ];
// 'ripemd160', 'mode-cfb', 'mode-ecb',  'mode-ofb', 'mode-ctr', 'evpkdf'
//  'pbkdf2',
const oneWayEnc = [ 
    'SHA1','SHA224', 'SHA256', 'SHA384', 'SHA512', 'MD5',
    'HmacSHA1', 'HmacSHA224', 'HmacSHA256', 'HmacSHA384', 'HmacSHA512', 'HmacMD5'
]
const commonEnc = [ 'BASE64', 'UTF16' ];
// , 'format-hex'
const encrypt_call = {
    'Caser': (p, k) => {
        // Caser Encryption code here ...
    },
    'Vigenere' : (p, k) => {
        // Vigenere Encryption code here ...
    },
    'Fence' : (p, k) => {
        // Fence Encryption code here
    },
    'Affine' : (p, k) => {
        // Affine Encryption code here
    },
    'Rabbit' : (p, k) => {
        return CryptoJS.Rabbit.encrypt(p, k).toString();
    },
    'RC4' : (p, k) => {
        return CryptoJS.RC4.encrypt(p, k).toString();
    },
    'AES' : (p, k) => {
        return CryptoJS.AES.encrypt(p, k).toString();
    },
    'TripleDes' : (p, k) => {
        return CryptoJS.TripleDES.encrypt(p, k).toString();
    },
    'DES' : (p, k) => {
        return CryptoJS.DES.encrypt(p, k).toString();
    },
    'SHA1' : (p) => {
        return CryptoJS.SHA1(p).toString();
    },
    'SHA224' : (p) => {
        return CryptoJS.SHA224(p).toString();
    },
    'SHA256' : (p) => {
        return CryptoJS.SHA256(p).toString();
    },
    'SHA384' : (p) => {
        return CryptoJS.SHA384(p).toString();
    },
    'SHA512' : (p) => {
        return CryptoJS.SHA512(p).toString();
    },
    'MD5' : (p) => {
        return CryptoJS.MD5(p).toString();
    },
    // 'pbkdf2',
    'HmacSHA1' : (p, k) => {
        return CryptoJS.HmacSHA1(p, k).toString();
    },
    'HmacSHA224' :(p, k) => {
        return CryptoJS.HmacSHA224(p, k).toString();
    },
    'HmacSHA256' : (p, k) => {
        return CryptoJS.HmacSHA256(p, k).toString();
    },
    'HmacSHA384' : (p, k) => {
        return CryptoJS.HmacSHA384(p, k).toString();
    },
    'HmacSHA512' : (p, k) => {
        return CryptoJS.HmacSHA512(p, k).toString();
    },
    'HmacMD5' : (p, k) => {
        return CryptoJS.HmacMD5(p, k).toString();
    },
    'BASE64' : (p) => {
        let wordArray = CryptoJS.enc.Utf8.parse(p);
        return CryptoJS.enc.Base64.stringify(wordArray);
    }
}

const decrypt_call = {
    'Caser': (p, k) => {
        // Caser Encryption code here ...
    },
    'Vigenere' : (p, k) => {
        // Vigenere Encryption code here ...
    },
    'Fence' : (p, k) => {
        // Fence Encryption code here
    },
    'Affine' : (p, k) => {
        // Affine Encryption code here
    },
    'Rabbit' : (c, k) => {
        return CryptoJS.Rabbit.decrypt(c, k).toString(CryptoJS.enc.Utf8);
    },
    'RC4' : (c, k) => {
        return CryptoJS.RC4.decrypt(c, k).toString(CryptoJS.enc.Utf8);
    },
    'AES' : (c, k) => {
        return CryptoJS.AES.decrypt(c, k).toString(CryptoJS.enc.Utf8);
    },
    'TripleDes' : (c, k) => {
        return CryptoJS.TripleDES.decrypt(c, k).toString(CryptoJS.enc.Utf8);
    },
    'DES' : (c, k) => {
        return CryptoJS.DES.decrypt(c, k).toString(CryptoJS.enc.Utf8);
    }
}

function scripts_call(way, plaintext, key, ciphertext, type, enc_dec) {
    if (enc_dec === "enc") {
        switch(type) {
            case 'classical-enc':
                if (way !== '---') {
                    if (plaintext !== "") {
                        if (key !== "") {
                            ciphertext.value = encrypt_call[way](plaintext, key);
                        }else {
                            alert("请输入密钥信息");
                        }
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
            case 'one-way-enc':
                if (way !== '---') {
                    if (plaintext !== "") {
                        ciphertext.value = encrypt_call[way](plaintext);
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
            case 'modern-enc':
                if (way !== '---') {
                    if (plaintext !== "") {
                        if (key !== "") {
                            ciphertext.value = encrypt_call[way](plaintext, key);
                        }else {
                            alert("请输入密钥信息");
                        }
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
            case 'common-enc':
                if (way !== '---') {
                    if (plaintext !== "") {
                        ciphertext.value = encrypt_call[way](plaintext);
                    }else {
                        alert("请输入待编码字段的信息");
                    }
                }else {
                    alert("请选择编码方式");
                }
                break;
        }
    }
    if (enc_dec === "dec") {
        switch(type) {
            case 'classical-dec':
                if (way !== '---') {
                    if (ciphertext !== "") {
                        if (key !== "") {
                            plaintext.value = decrypt_call[way](ciphertext, key);
                        }else {
                            alert("请输入密钥信息");
                        }
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
            case 'one-way-dec':
                if (way !== '---') {
                    if (ciphertext !== "") {
                        plaintext.value = decrypt_call[way](ciphertext);
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
            case 'modern-dec':
                if (way !== '---') {
                    if (plaintext !== "") {
                        if (key !== "") {
                            plaintext.value = decrypt_call[way](ciphertext, key);
                        }else {
                            alert("请输入密钥信息");
                        }
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
            case 'common-dec':
                if (way !== '---') {
                    if (ciphertext !== "") {
                        plaintext.value = decrypt_call[way](ciphertext);
                    }else {
                        alert("请输入明文信息");
                    }
                }else {
                    alert("请选择加密方式");
                }
                break;
        }
    }
}