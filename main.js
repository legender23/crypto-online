$(document).ready(function(){

    class Init {
        constructor() {
            this.crypto_init();
        }

        crypto_init() {
            let [ width, centerWidth, height ] = [ $('#panel_left').width()+"px", $('#panel_center').width()+"px", screen.availHeight/2+"px" ];
    
            [ '#plaintext', '#ciphertext' ].map( (id) => this.panel_style_init(id, [ width, height ]) );
            [ '#crypto_way_classical', '#crypto_way_one_way', '#crypto_way_modern', '#crypto_way_common' ].map( (id) => this.panel_style_init(id, [ centerWidth ]));
            
            document.getElementById('crypto_way_classical').addEventListener("click", () => {
                this.classical_select_bind($('#crypto_way_classical').val());
            });
            this.panel_click_bind();
            
            (function() {
                let id = document.getElementById('crypto_way_classical');
                
                for ( let val of classicalEnc ) {
                    let option = document.createElement("option");
                    option.setAttribute("value", `${val}`);
                    option.innerText = `${val}`;
                    id.appendChild(option);
                }
                
            })();
        }

        panel_style_init(id, style) {
            for (let val of [ ...document.querySelectorAll(`${id}`) ]) {
                val.style.width = style[0];
                val.style.height = style[1];
            }
        }

        classical_select_bind(type) {
            switch(type) {
                case 'Caser-mod26':
                    $('#info_change')[0].innerText = "偏移位置";
                    if ( document.getElementById('caser_bruteforce') == null ) {
                        $('div#panel_center>div.button-component').prepend(
                            `<button id="caser_bruteforce" class="btn btn-warning" type="button"> 暴力破解 <span class="glyphicon glyphicon-arrow-left"></span></button>
                            <br><br>`
                        );
                        $('#caser_bruteforce').click(() => {
                            c_check('caser_bruteforce', 26);
                        });
                    }
                    break;
                case 'Caser-mod95':
                    $('#info_change')[0].innerText = "偏移位置";
                    if ( document.getElementById('caser_bruteforce') == null ) {
                        $('div#panel_center>div.button-component').prepend(
                            `<button id="caser_bruteforce" class="btn btn-warning" type="button"> 暴力破解 <span class="glyphicon glyphicon-arrow-left"></span></button>
                            <br><br>`
                        );
                        $('#caser_bruteforce').click(() => {
                            c_check('caser_bruteforce', 95);
                        });
                    }
                    break;
                case 'Vigenere-XOR':
                    $('#info_change')[0].innerText = "输入密钥";
                    document.querySelectorAll('input.key_input')[0].setAttribute("placeholder", "与密文十六进制格式一致");
                    if ( document.getElementById('vige_bruteforce') == null ) {
                        $('div#panel_center>div.button-component').prepend(
                            `<button id="vige_bruteforce" class="btn btn-warning" type="button"> 暴力破解 <span class="glyphicon glyphicon-arrow-left"></span></button>
                            <br><br>`
                        );
                        $('#vige_bruteforce').click(() => {
                            c_check('vige_bruteforce', 1);
                        });
                    }
                    break;
                case 'Vigenere-mod26':
                    //$('#info_change')[0].innerText = "偏移位置";
                    document.querySelectorAll('input.key_input')[0].setAttribute("placeholder", "与密文十六进制格式一致");
                    if ( document.getElementById('vige_bruteforce') == null ) {
                        $('div#panel_center>div.button-component').prepend(
                            `<button id="vige_bruteforce" class="btn btn-warning" type="button"> 暴力破解 <span class="glyphicon glyphicon-arrow-left"></span></button>
                            <br><br>`
                        );
                        // $('#vige_bruteforce').click(() => {
                        //     c_check('Vigenere-XOR', 26);
                        // });
                    }
                    break;
            }
        }

        panel_click_bind() {
            
            [ 'panel-one-way', 'panel-modern', 'panel-common' ].map(
                (x) => {
                    let id = x;
                    document.getElementById(id).addEventListener("click", () => {
                        this.options_load(id);
                    })
                }
                
            )
        }

        options_padding( id, encType, cryptoPath ) {
            let item = document.getElementById(id);
            let body = document.body;
            if ( item.length == 1 ) {
                for ( let val of encType ) {

                    let option = document.createElement("option");
                    let script = document.createElement("script");
                    script.setAttribute("src", `${cryptoPath}${val}.js`);
                    script.setAttribute('async', true);
                    option.setAttribute("value", `${val}`);
                    option.innerText = `${val}`;
                    
                    body.appendChild(script);
                    item.appendChild(option);
                }
    
                if ( id === 'crypto_way_modern' ) {
                    let option = document.createElement("option");
                    option.setAttribute("value", "DES");
                    option.innerText = "DES";
                    item.appendChild(option);
                }
                if ( id === 'crypto_way_common' ) {
                    let option = document.createElement("option");
                    option.setAttribute("value", "HEX");
                    option.innerText = "HEX";
                    item.appendChild(option);
                }
            }
            
        }

        options_load(type) {
            let [ key_classical, key_one_way, key_modern, key_common ] = [ ...document.querySelectorAll('div.key_choose') ];
            switch (type) {
                case 'panel-one-way':
                    this.options_padding('crypto_way_one_way', oneWayEnc, oneWayCryptoPath);
                    break;
                case 'panel-modern':
                    this.options_padding('crypto_way_modern', modernEnc, modernCryptoPath);
                    break;
                case 'panel-common':
                    this.options_padding('crypto_way_common', commonEnc, commonCodePath);
                    break;
            }
        }
    }

    (function() {

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
        [ ...document.querySelectorAll('button.dec') ].map(
            (x) => {
                let id = x.id;
                x.addEventListener("click", () => {
                    dec_exec(id);
                });
            }
        );
        let change_way = document.getElementById("crypto_way_one_way");
        change_way.addEventListener("click", () => {
            if ( change_way.value.startsWith("Hmac") ) {
                $('div.key_choose').removeClass("key_choose_hide");
            }else {
                $('div.key_choose').addClass("key_choose_hide");
            }
        });
    })();

    function c_check(id, tmp) {
        let [ way, c ] = [ $('#crypto_way_classical').val(), $('#ciphertext').val() ];
        if ( way !== "---" && c != "" ) {
            switch(id) {
                case 'caser_bruteforce':
                    // we can regard the variable named tmp as mod_bit in caser.
                    $('#plaintext').val( Caser.bruteForce( c, Number(tmp) ) );
                    break;
                case 'vige_bruteforce':
                    $('#plaintext').val( Vigenere.bruteForce( c, 1 ) );
                    // 暴力破解按钮的特殊调整，如key长度的限制等
            }
        }else {
            alert("请检查数据是否输入完全");
        }
    }

    function enc_exec(type) {
        let [ classical_p, one_way_p, modern_p, common_p ] = [ ...document.querySelectorAll('#plaintext') ];
        let [ classical_c, one_way_c, modern_c, common_c ] = [ ...document.querySelectorAll('#ciphertext') ];
        let [ classical_way, one_way_way, modern_way, common_way ] = [ ...document.getElementsByName('crypto_way') ];
        let [ classical_key, modern_key ] = [ ...document.querySelectorAll('input.key_input') ];

        switch(type) {
            case 'classical-enc':
                scripts_call(classical_way.value, classical_p.value, classical_key.value, classical_c, 'classical-enc', 'enc');
                break;
            case 'one-way-enc':
                scripts_call(one_way_way.value, one_way_p.value, null, one_way_c, 'one-way-enc', 'enc');
                break;
            case 'modern-enc':
                scripts_call(modern_way.value, modern_p.value, modern_key.value, modern_c, 'modern-enc', 'enc');
                break;
            case 'common-enc':
                scripts_call(common_way.value, common_p.value, null, common_c, 'common-enc', 'enc');
                break;
        }
    }

    function dec_exec(type) {
        let [ classical_p, one_way_p, modern_p, common_p ] = [ ...document.querySelectorAll('#plaintext') ];
        let [ classical_c, one_way_c, modern_c, common_c ] = [ ...document.querySelectorAll('#ciphertext') ];
        let [ classical_way, one_way_way, modern_way, common_way ] = [ ...document.getElementsByName('crypto_way') ];
        let [ classical_key, modern_key ] = [ ...document.querySelectorAll('input.key_input') ];

        switch(type) {
            case 'classical-dec':
                scripts_call(classical_way.value, classical_p, classical_key.value, classical_c.value, 'classical-dec', 'dec');
                break;
            case 'modern-dec':
                scripts_call(modern_way.value, modern_p, modern_key.value, modern_c.value, 'modern-dec', 'dec');
                break;
            case 'common-dec':
                scripts_call(common_way.value, common_p, null, common_c.value, 'common-dec', 'dec');
                break;
        }
    }

    new Init();
    window.onresize = function() {
        window.location.reload();
        new Init();
    }

  });