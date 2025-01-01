/** Tombala kartındaki soldan, sağa doğru her sütünda bulunan hücrelerin hangi sayı aralığında bir sayı alacağını belirleyen dizi */
const tombalaKartiRastgeleSayiAraligiDizi = [[1, 9], [10, 19], [20, 29], [30, 39], [40, 49], [50, 59], [60, 69], [70, 79], [80, 90]];

const tombalaKartiRenkleri = ["red", "blue", "pink", "green", "yellow", "purple", "crimson", "brown", "darkblue"];

function tombalaKartiRastgeleSayilariSec(secilmisTombalaKarti) {
    let rastgeleSecilenSayilarDizisi = [];
    for (let i = 0; i < 9; i++) {
        for (let k = 0; k < 3; k++) {
            if (secilmisTombalaKarti[k][i] == 0) {
                let min = tombalaKartiRastgeleSayiAraligiDizi[i][0];
                let max = tombalaKartiRastgeleSayiAraligiDizi[i][1];
                let rastgeleTombalaKSayisi = 1;
                do {
                    rastgeleTombalaKSayisi = Math.floor(Math.random() * (max - min + 1) + min);
                } while (rastgeleSecilenSayilarDizisi.indexOf(rastgeleTombalaKSayisi) != -1);

                if (rastgeleTombalaKSayisi < rastgeleSecilenSayilarDizisi.at(-1) && secilmisTombalaKarti[k][i] != "x") {
                    let a;
                    if (secilmisTombalaKarti[k - 1][i] == "x") {
                        a = secilmisTombalaKarti[0][i];
                        secilmisTombalaKarti[0][i] = rastgeleTombalaKSayisi;
                    }
                    else {
                        a = secilmisTombalaKarti[k - 1][i];
                        secilmisTombalaKarti[k - 1][i] = rastgeleTombalaKSayisi;
                    }
                    secilmisTombalaKarti[k][i] = a;
                }
                else {
                    secilmisTombalaKarti[k][i] = rastgeleTombalaKSayisi;
                }
                rastgeleSecilenSayilarDizisi.push(rastgeleTombalaKSayisi);
            }
        }
    }
    console.log(secilmisTombalaKarti);
    return secilmisTombalaKarti;
};
function tombalaKartiRengiDegistir(renk) {
    if (renk == undefined) {
        const kartRengiRastgele = Math.floor(Math.random() * (tombalaKartiRenkleri.length));
        document.querySelector(':root').style.setProperty('--tombalaRengi', tombalaKartiRenkleri[kartRengiRastgele]);
    }
    else{
        document.querySelector(':root').style.setProperty('--tombalaRengi', renk);
    }

};
function yeniTombalaKartıOlustur() {
    /** Tombala kartı için hazır tasarımlar dizi. */
    const tombalaKartTasarimKaliplari = [
        [[0, "x", 0, "x", 0, "x", 0, 0, "x"],
        ["x", 0, "x", 0, "x", 0, "x", 0, 0],
        [0, "x", 0, "x", 0, "x", 0, "x", 0]],

        [[0, "x", 0, "x", 0, "x", 0, "x", 0],
        [0, 0, "x", 0, "x", 0, "x", 0, "x"],
        ["x", 0, 0, "x", 0, "x", 0, "x", 0]],

        [["x", 0, 0, "x", 0, "x", 0, "x", 0],
        [0, 0, "x", 0, "x", 0, "x", 0, "x"],
        [0, "x", 0, "x", 0, "x", 0, "x", 0]],

        [[0, "x", 0, "x", 0, "x", 0, "x", 0],
        ["x", 0, "x", 0, "x", 0, "x", 0, 0],
        [0, "x", 0, "x", 0, "x", 0, 0, "x"]]
    ];
    /** Hazır tombala tasarımlarından birini rastgele seçmek için (tombala tasarım sayısı ile 0 arasında bir sayı seçiliyor) */
    const tombalaKartiTasarimiSecimi = Math.floor(Math.random() * (3 - 0 + 1));
    /** Seçilmiş olan tombala kartı */
    const tombalaKarti = tombalaKartTasarimKaliplari[tombalaKartiTasarimiSecimi];
    tombalaKartiRastgeleSayilariSec(tombalaKarti);
    let tombalaKartTablosu = document.querySelector('#tombalaKart');
    let buttunNo = 0;
    for (let k = 0; k < 3; k++) {
        let sutun = tombalaKartTablosu.insertRow();
        for (let i = 0; i < 9; i++) {
            let hucre = sutun.insertCell();
            if (tombalaKarti[k][i] != "x") {
                buttunNo = tombalaKarti[k][i];
                let buton = document.createElement("button");
                buton.className = "tombalaBtn";
                buton.textContent = buttunNo;
                hucre.appendChild(buton);
            }
        }
    }
    tombalaKartiRengiDegistir();
};
yeniTombalaKartıOlustur();
function kartTablosunuSifirlama() {
    let tombalaKartTablosu = document.querySelector('#tombalaKart');
    tombalaKartTablosu.innerHTML = "";
}
let kartDegistirButon = document.querySelector("#kartDegistir");

kartDegistirButon.onclick = function () {
    kartTablosunuSifirlama();
    yeniTombalaKartıOlustur();
    tombalaKartiRengiDegistir();
};

function renkButonlarinaRenkAta() {
    let renkButonlariDiv = document.querySelector('.renkKartlari');
    for (let index = 0; index < tombalaKartiRenkleri.length; index++) {
        renkButonlariDiv.children[index].style.backgroundColor = tombalaKartiRenkleri[index];
        renkButonlariDiv.children[index].onclick = function(){
            tombalaKartiRengiDegistir(tombalaKartiRenkleri[index]);
        }
    }
    
};

renkButonlarinaRenkAta();