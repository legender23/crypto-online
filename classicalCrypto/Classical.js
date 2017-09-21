const Caser = {
    text : (mod_bit) => {
        let [ start, end ] = [0, 0];
        switch(mod_bit) {
            case 26:
                [ start, end ] = [ 65, 91 ];
                break;
            case 95:
                [ start, end ] = [ 32, 127 ];
                break;
            default:
                break;
        }
        let text_range = [];
            for ( let i=start; i < end; i++ ) {
            text_range.push( String.fromCharCode(i) );
        }
        return text_range.join("");
    },
    Enc : ( p, offset, mod_bit ) => {

        let [ text, _p, c ] = [ Caser.text(mod_bit), p.toUpperCase(), [] ];

        for ( let i of _p ) {
            if ( mod_bit == 26 && i == " ") continue;
            let val = text[ ( text.indexOf(i) + offset ) % mod_bit ];
            c.push(val);
        }
        return c.join("");
    },
    Dec : ( c, offset, mod_bit ) => {

        let [ text, _c, p ] = [ Caser.text(mod_bit), c.toUpperCase(), [] ];
        for ( let i of _c ) {
            if ( mod_bit == 26 && i == " ") continue;
            let judge = text.indexOf(i) - offset;
            if ( judge < 0 ) judge += mod_bit;
            let val = text[ judge % mod_bit ];
            p.push(val);
        }
        return p.join("");
    },
    bruteForce: ( c, mod_bit ) => {
        let [ text, p ] = [ Caser.text(mod_bit), [] ];
        for ( let offset=1; offset < mod_bit; offset++ ) {
            let t = "";
            for ( let i of c ) {
                if ( mod_bit == 26 && i == " ") continue;
                let judge = text.indexOf(i) - offset;
                if ( judge < 0 ) judge += mod_bit;
                let val = text[ judge % mod_bit ];
                t += val;
            }
            p.push(t+'\n');
            //p.push(t.substring(0, 20)+"\n");
        }
        return p.join("");
    }
}

const Vigenere = {
    hex_decode : ( text_raw ) => {
        if ( text_raw.startsWith('0x') ) {
            let text_hex = text_raw.split("0x").shift();
            return text_hex.map( (x) => {
                String.fromCharCode( parseInt( x, 16 ) );
            }).join("");
        }else {
            if ( text_raw.startsWith('\\x') ) {
                let text_hex = text_raw.split("\\x").join("");
                return text_hex.map( (x) => {
                    String.fromCharCode( parseInt( x, 16 ) );
                }).join("");
            }
        }
        let [ text_hex, len=text_raw.length ] = [ [] ];
        for ( let i=0; i < len; i+=2 )
            text_hex.push( String.fromCharCode( parseInt( text_raw.substr(i, 2), 16 ) ) );
        return text_hex.join("");
    },
    // generate a vigenere table
    mod_table : () => {
        let [ table, str, len=str.length ] = [ {}, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ];
        for ( let i=0; i < len; i++ ) {
            table[ str[i] ] = str.substring(i, 26).padEnd(26, str.substr(0, i));
        }
        return [ str, table ];
    },
    Enc_XOR : ( p, k ) => {
        let [ len, c, k_hex, mod=k_hex.length ] = [ p.length, "", Vigenere.hex_decode(k) ];
        for ( let i=0; i < len; i++ ) {
            let tmp = p[i].charCodeAt() ^ k_hex[ i % mod ].charCodeAt();
            c += String.fromCharCode(tmp);
        }
        return c;
    },
    Enc_mod : ( p, k ) => {
        let [ [ text, mod_table ], c, p_upper, p_len=p_upper.length ] = [ Vigenere.mod_table(), "", p.toUpperCase() ];
        let [ key_offset, key, k_len=key.length ] =  [ 0, k.toUpperCase().split(" ").join("") ];
        
        for ( let i=0; i < p_len; i++ ) {
            let tmp = p_upper[i];
            if ( tmp == " " ) {
                c += " ";
                continue;
            }
            if ( tmp && ( tmp.charCodeAt() < 65 || tmp.charCodeAt() > 90 ) )
                return null;
            
            c += mod_table[ key[ key_offset++ % k_len ] ][ text.indexOf( tmp ) ];
        }
        return c;
    },
    Dec_mod : ( c, k ) => {
        let [ [ text, mod_table ], p, c_upper, c_len=c_upper.length ] = [ Vigenere.mod_table(), "", c.toUpperCase() ];
        let [ key_offset, key, k_len=key.length ] =  [ 0, k.toUpperCase().split(" ").join("") ];

        for ( let i=0; i < c_len; i++ ) {
            let tmp = c_upper[i];
            if ( tmp == " " ) {
                p += " ";
                continue;
            }
            if ( tmp && ( tmp.charCodeAt() < 65 || tmp.charCodeAt() > 90 ) )
                return null;
            
            p += text[ mod_table[ key[ key_offset++ % k_len ] ].indexOf( tmp ) ];
        }
        return p;
    },
    Dec_XOR : ( c, k ) => {
        let [ p, c_hex, k_hex, mod=k_hex.length, len=c_hex.length ] = [ "", Vigenere.hex_decode(c), Vigenere.hex_decode(k) ];
        for ( let i=0; i < len; i++ ) {
            let tmp = c_hex[i].charCodeAt() ^ k_hex[ i % mod ].charCodeAt();
            p += String.fromCharCode(tmp);
        }
        return p;
    },
    bruteForce : ( c, key_len ) => {
        let [ p, c_hex ] = [ "", Vigenere.hex_decode(c) ];
        
        for ( i=0;i<256;i++ ) {
            p += Vigenere.Dec_XOR( c, (i).toString(16).padStart(0, 2) )+"   i="+i+"\n";
        }
        return p;
    }
}

const Fence = {
    Enc : ( p, rail ) => {
        let [ _c, c, _p, len=_p.length ] = [ [], "", p.split(" ").join("") ];
        for ( let i=0; i<len; i+=rail ) {
            _c.push(_p.substr(i, rail));
        }
        let _c_len = _c[0].length;
        for ( let i=0; i<_c_len; i++ ) {
            for ( let val of _c ) {
                let tmp = val[i] ? val[i] : "";
                c += tmp;
            }
        }
        return c;
    },
    Dec : ( c, rail ) => {
        let [ _p, p, _c, len=_c.length, rail_dec=Math.round( len/rail ) ] = [ [], "", c.split(" ").join("") ];
        for ( let i=0; i<len; i+=rail_dec ) {
            _p.push( _c.substr( i, rail_dec ) );
        }
        
        let _p_len = _p[0].length;
        for ( let i=0; i<_p_len; i++ ) {
            for ( let val of _p ) {
                let tmp = val[i] ? val[i] : "";
                p += tmp;
            }
        }
        return p;
        
    }
}

const Affine = {
    
}

const Hex = {
    Enc : (p) => {
        let [ p_hex, len=p.length ] = [ [] ];
        for ( let i=0; i < len; i++ )
            p_hex.push( p[i].charCodeAt().toString(16).padStart(2, 0) );
        return p_hex.join("");
    },
    Dec : (c) => {
        let [ c_raw, len=c.length ] = [ [] ];
        for ( let i=0; i < len; i+=2 )
            c_raw.push( String.fromCharCode( parseInt( c.substr(i, 2), 16 ) ) );
        return c_raw.join("");
    }
}