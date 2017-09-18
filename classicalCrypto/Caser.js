const Caser = {
    text : () => {

        let text_range = [];
            for ( let i=32; i < 127; i++ ) {
            text_range.push( String.fromCharCode(i) );
        }
        return text_range.join("");
    },
    Enc : ( p, offset, mod_bit ) => {

        let text = Caser.text();
        let c = [];
        for ( let i of p ) {
            let val = text[ ( text.indexOf(i) + offset ) % mod_bit ];
            c.push(val);
        }
        return c.join("");
    },
    Dec : (c, offset, mod_bit ) => {

        let text = Caser.text();
        let p = [];
        for ( let i of p ) {
            let val = text[ ( text.indexOf(i) - offset ) % mod_bit ];
            p.push(val);
        }
        return p.join("");
    }  
}