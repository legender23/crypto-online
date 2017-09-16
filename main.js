$(document).ready(function(){
    const [ classcialCryptoPath, oneWayCryptoPath, modernCryptoPath， commonCodePath ] = [ "./", "./CryptoJS/rollups/", "./CryptoJS/components/", "./CryptoJS/roolups/" ];
    const modernEnc = [
        'rabbit', 'mode-ofb', 'mode-ctr', 'rc4', 'aes', 'evpkdf', 
        'ripemd160', 'mode-cfb', 'tripledes', 'mode-ecb' 
    ]
    const oneWayEnc = [ 
        'sha1','sha224', 'sha256', 'sha384', 'sha512', 'md5', 'pbkdf2',
        'hmac-sha1', 'hmac-sha224', 'hmac-sha256', 'hmac-sha384', 'hmac-sha512', 'hmac-md5'
    ]
    const commonCoding = [ 'enc-base64', 'enc-utf16', 'format-hex' ];
    window.onresize = function() {
        window.location.reload();
        init();
    }
    init();
    
    function init() {
        let [ width, centerWidth, height ] = [ $('#panel_left').width()+"px", $('#panel_center').width()+"px", screen.availHeight/2+"px" ];

        [ '#plaintext', '#ciphertext' ].map( (id) => panel_init(id, [ width, height ]) );
        panel_init('#crypto_way', [ centerWidth ]);

        [ ...document.querySelectorAll('#key_choose') ].map( (id) => id.style = "opacity:0;" );
        [ 'panel-classcial', 'panel-modern', 'panel-common' ].map( (id) => document.getElementById(id).addEventListener("click", ) );
    }
    
    function optionsPadding(id) {
        let select = document.getElementById(id);
    }

    function panel_init(id, style) {
        for (let val of [ ...document.querySelectorAll(`${id}`) ]) {
            val.style.width = style[0];
            val.style.height = style[1];
        }
    }

  });