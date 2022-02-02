const salt = '#_DontMindMe_!';

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

function Enc(text) {
    const myCipher = cipher(salt);
    return myCipher(text);
}

function Dec(text) {
    const myDecipher = decipher(salt);
    return myDecipher(text);
}

function ShowHeaderAlert(response, type) {
    ShowHeaderAlert(response, type, 3000);
};
function ShowHeaderAlert(response, type, milisecs) {
    var alertParam = $("#HeaderAlert");
    console.log(response);
    alertParam.text(response);
    if (type == "success")
        alertParam.addClass("alert-success");
    else
        alertParam.addClass("alert-danger");
    alertParam.alert();
    alertParam.fadeTo(milisecs, 500).slideUp(500, function () {
        alertParam.slideUp(500);
    });
}