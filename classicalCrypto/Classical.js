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

}

const Fence = {

}

const Affine = {
    
}