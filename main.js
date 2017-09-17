$(document).ready(function(){
    const [ classicalCryptoPath, oneWayCryptoPath, modernCryptoPath, commonCodePath ] = [ "./classicalEnc/", "./CryptoJS/rollups/", "./CryptoJS/components/", "./CryptoJS/roolups/" ];
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
    
            [ ...document.querySelectorAll('div.key_choose') ].map( (id) => id.style = "opacity:0;" );
            
            this.panel_click_bind();
            this.options_load('panel-classical');
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

        options_padding(id, encType) {
            let item = document.getElementById(id);
            for ( let val of encType ) {
                let option = document.createElement("option");
                option.setAttribute("value", `${val}`);
                option.innerText = `${val}`;
                item.appendChild(option);
            }
        }

        options_load(type) {
            let [ key_classical, key_one_way, key_modern, key_common ] = [ ...document.querySelectorAll('div.key_choose') ];
            switch (type) {
                case 'panel-classical':
                    this.options_padding('crypto_way_classical', classicalEnc);
                    key_classical.style="opacity:100%";
                    break;
                case 'panel-one-way':
                    this.options_padding('crypto_way_one_way', oneWayEnc);
                    break;
                case 'panel-modern':
                    this.options_padding('crypto_way_modern', modernEnc);
                    key_modern.style="opacity:100%";
                    break;
                case 'panel-common':
                    this.options_padding('crypto_way_common', commonEnc);
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

    (function() {

        // let [ classical_enc, one_way_enc, modern_enc, common_enc ] = [ ...document.querySelectorAll('button.enc') ];
        // let [ classical_dec, one_way_dec, modern_dec, common_dec ] = [ ...document.querySelectorAll('button.dec') ];
        
        let [ classical_c, one_way_c, modern_c, common_c ] = [ ...document.querySelectorAll('#ciphertext') ];
        let [ classical_key, modern_key ] = [ ...document.querySelectorAll('input.key_input') ];

        [ ...document.querySelectorAll('button.enc') ].map(
            (x) => {
                let id = x.id;
                x.addEventListener("click", () => {
                    enc_exec(id);
                });
            }
        );
        
    })();

    function scripts_load(cryptoPath, way_selected) {
        if (way_selected !== "---") {
            let script = document.createElement('script');
            script.setAttribute('src', `${cryptoPath}${way_selected}.js`);
            document.head.appendChild(script);

            script.onload = () => {
                console.log(`${way_selected} has been loaded successfully!`);
            }
    
        }else {
            alert("请选择加密/编码方式");
        }
    }

    function enc_exec(type) {
        let [ classical_p, one_way_p, modern_p, common_p ] = [ ...document.querySelectorAll('#plaintext') ];
        let [ classical_c, one_way_c, modern_c, common_c ] = [ ...document.querySelectorAll('#ciphertext') ];
        let [ classical_way, one_way_way, modern_way, common_way ] = [ ...document.getElementsByName('crypto_way') ];
        let [ classical_key, modern_key ] = [ ...document.querySelectorAll('input.key_input') ];

        switch(type) {
            case 'classical-enc':
                scripts_load(classicalCryptoPath, classical_way.value);
                break;
            case 'one-way-enc':
                console.log(one_way_way.value);
                scripts_load(oneWayCryptoPath, one_way_way.value);
                let tmp = CryptoJS.MD5(one_way_p.value).toString();
                one_way_c.value = tmp;
                break;
            case 'modern-enc':
                scripts_load(modernCryptoPath, modern_way.value);
                
                break;
            case 'common-enc':
                scripts_load(commonCodePath, common_way.value);
                break;
        }
    }
    function dec_exec() {

    }

    new Init();
    window.onresize = function() {
        window.location.reload();
        new Init();
    }

  });