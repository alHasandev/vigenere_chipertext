/* eslint-disable eol-last */
/* eslint-disable semi */
// memuat komponen yang diperlukan
const encryptButton = document.getElementById('encryptButton');
const plainText = document.getElementById('plaintext');
const chiperText = document.getElementById('chipertext');
const key = document.getElementById('key');

// saat tombol Encrypt ditekan
encryptButton.addEventListener('click', e => {
  e.preventDefault();
  console.clear();
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
  console.log('Plaintext = ' + plain);
  console.log('key = ' + key);
  console.log('Chipertext = ' + chiper);
  console.log('===================================');

  // menampung nilai-nilai ascii dari string
  let asciiPlains = convertToAscii(plain);
  let asciiKeys = convertToAscii(key);

  console.log('Nilai Ascii Plaintext :');
  console.log(asciiPlains);

  console.log('Nilai Ascii True Keys (Kunci yang sesuai dengan Plaintext)');
  console.log(getTrueKeys(asciiPlains, asciiKeys));
  asciiKeys = getTrueKeys(asciiPlains, asciiKeys);

  console.log('Nilai Ascii Chipertext :');
  console.log(getAsciiChiper(asciiPlains, asciiKeys));

  chiperText.value = convertToChar(getAsciiChiper(asciiPlains, asciiKeys)).join('');
}

// konversi dari string menjadi array dari nilai-nilai ascii string
const convertToAscii = string => {
  let asciiValues = [];
  for (let i in string) {
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
  for (let i in asciiPlains) {
    // jika asciiPlains ke-i adalah char yang valid, maka
    if (
      (isMinMax(asciiPlains[i], 65, 90) || isMinMax(asciiPlains[i], 97, 122))
    ) {
      // jika perulangan sudah mencapai batas index asciiKeys terakhir,
      // maka index asciiKeys akan diulang dari awal (0)
      if (j === keyLength) {
        j = 0;
      }

      // trueKey = asciiKey index ke-j
      trueKeys.push(asciiKeys[j]);
      j++;
    } else { // jika adalah spasi, maka
      // trueKey = spasi
      trueKeys.push(asciiPlains[i]);
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
  for (let i in asciiPlains) {
    // jika asciiPlains ke-i adalah char yang valid, maka
    if (isMinMax(asciiPlains[i], 65, 90) || isMinMax(asciiPlains[i], 97, 122)) {
      // nilai dasar m & n adalah 0
      let n = 0;
      let m = 0;

      // pisahkan logika perhitungan kunci UPPERCASE dan lowercase
      if (isMinMax(asciiKeys[i], 97, 122)) {
        m = 32;
      }

      // pisahkan logika perhitungan plaintext UPPERCASE dan lowercase
      if (isMinMax(asciiPlains[i], 97, 122)) {
        n = 32;
      }

      // masukkan hasil dari rumus mencari vigenere chipertext ke array asciiChiper
      asciiChiper.push(
        ((asciiPlains[i] - n + asciiKeys[i] - m) % 26) + 65 + n
      );
    } else { // jika bukan char yang valid
      asciiChiper.push(asciiPlains[i]);
    }
  }

  // hasilkan array nilai ascii chipertext
  return asciiChiper;
}

// mendapatkan / konversi nilai ascii chipertext menjadi chipertext
const convertToChar = asciiValues => {
  const chars = [];
  for (let i in asciiValues) {
    chars.push(String.fromCharCode(asciiValues[i]));
  }

  // hasilkan array chipertext
  return chars;
  // eslint-disable-next-line eol-last
}

// kondisi true jika nilai yang dimasukkan berada diantara parameter ke-2 dan ke-3
const isMinMax = (value, min, max) => {
  return (value >= min && value <= max);
}