// memuat komponen yang diperlukan
const encryptButton = document.getElementById("encryptButton");
const plainText = document.getElementById("plaintext");
const chiperText = document.getElementById("chipertext");
const key = document.getElementById("key");

// saat tombol Encrypt ditekan
encryptButton.addEventListener('click', e => {
  e.preventDefault();
  console.log('tombol ditekan');

  // mengambil data plaintext
  let DataPlain = plainText.value;
  let DataKey = key.value;
  let DataChiper = chiperText.value;

  encrypt(DataPlain, DataKey, DataChiper);
});

// proses enkripsi
const encrypt = (plain, key, chiper) => {
  // plain = plain.toLowerCase();
  // key = key.toLowerCase();
  // chiper = chiper.toLowerCase();
  console.log("Plaintext = " + plain);
  console.log("key = " + key);
  console.log("Chipertext = " + chiper);
  console.log("===================================");

  // menampung nilai-nilai ascii dari string
  let asciiPlains = convertToAscii(plain);
  let asciiKeys = convertToAscii(key);

  console.log(asciiPlains);
  console.log(getTrueKeys(asciiPlains, asciiKeys));
  asciiKeys = getTrueKeys(asciiPlains, asciiKeys);

  console.log(getAsciiChiper(asciiPlains, asciiKeys));

  chiperText.value = getChiperText(getAsciiChiper(asciiPlains, asciiKeys)).join('');


}

// konversi dari string menjadi array dari nilai-nilai ascii string
const convertToAscii = string => {
  let asciiValues = [];
  for (i in string) {
    asciiValues.push(string.charCodeAt(i));
  }

  // hasilkan nilai ascii
  return asciiValues;
}

// men-generate kunci yang sesuai untuk plaintext
const getTrueKeys = (asciiPlains, asciiKeys) => {
  const trueKeys = [];

  // menampung nilai total item pada array asciiKeys
  let keyLength = asciiKeys.length;

  // index untuk asciiKeys
  let j = 0;
  for (i in asciiPlains) {
    // jika asciiPlains ke-i bukan spasi, maka 
    if (asciiPlains[i] != 32) {

      // jika perulangan sudah mencapai batas index asciiKeys terakhir,
      // maka index asciiKeys akan diulang dari awal (0)
      if (j == keyLength) {
        j = 0;
      }

      // trueKey = asciiKey index ke-j
      trueKeys.push(asciiKeys[j]);
      j++;
    } else { // jika adalah spasi, maka

      // trueKey = spasi
      trueKeys.push(32);
    }
  }

  // hasilkan array trueKeys
  return trueKeys;
}

// rumus untuk mendapatkan nilai ascii dari chipertext
const getAsciiChiper = (asciiPlains, asciiKeys) => {
  // (plain ascii value + key ascii value) mod 26 = chipertext

  // menampung array untuk hasil chipertext
  const asciiChiper = [];
  for (i in asciiPlains) {
    // mengatasi nilai spasi
    if (asciiPlains[i] == 32) {
      asciiChiper.push(32);
    } else {
      let n;

      // pisahkan logika perhitungan kunci UPPERCASE dan lowercase
      if (asciiKeys[i] <= 90 && asciiKeys[i] >= 65) {
        m = 0;
      } else {
        m = 32;
      }

      // pisahkan logika perhitungan plaintext UPPERCASE dan lowercase
      if (asciiPlains[i] <= 90 && asciiPlains[i] >= 65) {
        n = 0;
      } else {
        n = 32;
      }

      asciiChiper.push(
        ((asciiPlains[i] - n + asciiKeys[i] - m) % 26) + 65 + n
      );
    }
  }

  // hasilkan array nilai ascii chipertext
  return asciiChiper;
}

// mendapatkan / konversi nilai ascii chipertext menjadi chipertext
const getChiperText = asciiChiper => {
  const chiperText = [];
  for (i in asciiChiper) {
    chiperText.push(String.fromCharCode(asciiChiper[i]));
  }

  // hasilkan array chipertext
  return chiperText;
}