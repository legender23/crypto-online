$(document).ready(function(){
    const [ classicalCryptoPath, oneWayCryptoPath, modernCryptoPath, commonCodePath ] = [ "./", "./CryptoJS/rollups/", "./CryptoJS/components/", "./CryptoJS/roolups/" ];
    const classicalEnc = [ 'Caser', 'Vigenere', 'Fence', 'Affine',  ];
    const modernEnc = [
        'rabbit', 'mode-ofb', 'mode-ctr', 'rc4', 'aes', 'evpkdf', 
        'ripemd160', 'mode-cfb', 'tripledes', 'mode-ecb' 
    ];
    const oneWayEnc = [ 
        'sha1','sha224', 'sha256', 'sha384', 'sha512', 'md5', 'pbkdf2',
        'hmac-sha1', 'hmac-sha224', 'hmac-sha256', 'hmac-sha384', 'hmac-sha512', 'hmac-md5'
    ]
    const commonEnc = [ 'enc-base64', 'enc-utf16', 'format-hex' ];

    class Init {
        constructor() {
            this.crypto_init();
        }

        crypto_init() {
            let [ width, centerWidth, height ] = [ $('#panel_left').width()+"px", $('#panel_center').width()+"px", screen.availHeight/2+"px" ];
    
            [ '#plaintext', '#ciphertext' ].map( (id) => this.panel_style_init(id, [ width, height ]) );
            [ '#crypto_way_classical', '#crypto_way_one_way', '#crypto_way_modern', '#crypto_way_common' ].map( (id) => this.panel_style_init(id, [ centerWidth ]));
    
            [ ...document.querySelectorAll('#key_choose') ].map( (id) => id.style = "opacity:0;" );
            
            this.panel_click_bind();
        }

        panel_click_bind() {
            
            [ 'panel-classical', 'panel-one-way', 'panel-modern', 'panel-common' ].map(
                (x) => {
                    let id = x;
                    document.getElementById(id).addEventListener("click", () => {
                        this.options_load(id);
                    })
                }
                
            )
        }

        options_padding(id) {
            let item = document.getElementById(id);
            for ( let val of classicalEnc ) {
                let option = document.createElement("option");
                option.setAttribute("value", `${val}`);
                option.innerText = `${val}`;
                item.appendChild(option);
            }
        }

        options_load(type) {
            switch (type) {
                case 'panel-classical':
                    this.options_padding('crypto_way_classical');
                    break;
                case 'panel-one-way':
                    this.options_padding('crypto_way_one_way');
                    break;
                case 'panel-modern':
                    this.options_padding('crypto_way_modern');
                    break;
                case 'panel-common':
                    this.options_padding('crypto_way_common');
                    break;
            }
        }

        panel_style_init(id, style) {
            for (let val of [ ...document.querySelectorAll(`${id}`) ]) {
                val.style.width = style[0];
                val.style.height = style[1];
            }
        }
    }
    new Init();
    window.onresize = function() {
        window.location.reload();
        new Init();
    }

  });