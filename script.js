// MEN-DECLARE VARIABEL
let male = document.getElementById("male");
let female = document.getElementById("female");
let weight = document.getElementById("berat_Badan");
let age = document.getElementById("usia");
let height = document.getElementById("tinggi_Badan");

warningContent = document.querySelector("warning-content");
warningText = document.querySelector("#warningText");
let warning = document.getElementById("warning");
let span = document.getElementsByClassName("close")[0];

//STATUS BMI
const STATUS = {
    KEKURANGAN: "Berat Badan Kurang",
    NORMAL: "Berat Badan Normal",
    KELEBIHAN: "Berat Badan Berlebih",
    OBESITAS: "Kegemukan (Obesitas)",
};

//FUNCTION UNTUK MENGHITUNG BMI
function calculateBMI(weight, height) {
    const bmi = weight.value / ((height.value / 100) * (height.value / 100));
    return bmi;
}

//FUNCTION UNTUK MENGKATEGORIKAN HASIL BMI
function getBMICategory(bmi){
    if (male.checked == true) {
      if (bmi < 18.5) {
        return STATUS.KEKURANGAN;
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        return STATUS.NORMAL;
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        return  STATUS.KELEBIHAN;
      } else if (bmi >= 30.0) {
        return STATUS.OBESITAS;
      }
    } else if (female.checked == true) {
      if (bmi < 17) {
        return STATUS.KEKURANGAN;
      } else if (bmi >= 17 && bmi <= 23.9) {
        return  STATUS.NORMAL;
      } else if (bmi >= 24.0 && bmi <= 27.0) {
        return STATUS.KELEBIHAN;
      } else if (bmi >= 27.0) {
        return STATUS.OBESITAS;
      }
    }
    return "";
}

//FUNCTION UNTUK MENGELUARKAN KOMEN SESUAI KATEGORI
function comment(kategori){
    if(kategori === STATUS.KEKURANGAN){
        return "Anda memiliki berat badan kurang";
    } else if (kategori === STATUS.NORMAL) {
        return "Anda memiliki berat badan yang ideal";
    } else if (kategori === STATUS.KELEBIHAN) {
        return "Anda memiliki berat badan yang berlebih";
    } else if (kategori === STATUS.OBESITAS) {
        return "Anda memiliki berat badan yang sangat berlebih";
    }
}

//FUNCTION UNTUK MENGELUARKAN SARAN SESUAI KATEGORI
function saran(kategori){
    if(kategori === STATUS.KEKURANGAN){
        return "Perlu tambahan asupan gizi dan konsultasi dengan ahli gizi.";
    } else if (kategori === STATUS.NORMAL) {
        return "Pertahankan pola makan sehat dan gaya hidup aktif";
    } else if (kategori === STATUS.KELEBIHAN) {
        return "Perlu kontrol pola makan dan aktivitas fisik.";
    } else if (kategori === STATUS.OBESITAS) {
        return "Perlunya penanganan medis dan perubahan gaya hidup.";
    }
}

//FUNCTION UNTUK MENGELUARKAN SOLUSI SESUAI KATEGORI
function solusi(kategori){
    if(kategori === STATUS.KEKURANGAN){
        return "Tingkatkan asupan makanan sehat, seperti protein, lemak sehat, dan karbohidrat kompleks. Hindari makanan berkalori kosong. Berkonsultasilah dengan ahli gizi yang sesuai dengan kebutuhan Anda.";
    } else if (kategori === STATUS.NORMAL) {
        return "Terus pertahankan kebiasaan makan sehat dan rutin berolahraga. Jangan lupa untuk memperhatikan pola tidur dan mengelola stres dengan baik.";
    } else if (kategori === STATUS.KELEBIHAN) {
        return "Kurangi konsumsi makanan tinggi kalori dan lemak jenuh. Tingkatkan aktivitas fisik dengan berolahraga secara teratur. Selalu konsisten dalam menjalankan gaya hidup sehat.";
    } else if (kategori === STATUS.OBESITAS) {
        return "Segera konsultasikan dengan ahli gizi dan tenaga medis untuk mendapatkan rencana pengobatan dan penanganan yang sesuai. Fokus pada penurunan berat badan secara sehat melalui pola makan yang tepat dan program olahraga yang disesuaikan dengan kondisi Anda.";
    }
}

//FUNCTION UNTUK MENGEUARKAN RISIKO SESUAI KATEGORI
function risiko(kategori){
    if(kategori === STATUS.KEKURANGAN){
        return ["Anemia", " Osteoporosis", " Malnutrisi"];
    } else if (kategori === STATUS.NORMAL) {
        return ["Tidak Ada", " Pertahankan Pola Makan Anda"];
    } else if (kategori === STATUS.KELEBIHAN) {
        return ["Diabetes", " Hipertensi", " Dislipidemia"];
    } else if (kategori === STATUS.OBESITAS) {
        return ["Gagal Ginjal", " Penyakit Jantung", " Stroke"];
    }
}

//MENGELUARKAN HASIL
document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    if ((male.checked == false && female.checked == false) || weight.value == '' || age.value == '' || height.value == '') {
      warning.style.display = "block";
      warningText.innerHTML = 'Semua Kolom Harus Diisi!';
    } else {
      const bmi = calculateBMI(weight, height);
      if (bmi !== null) {
        const kategori = getBMICategory(bmi);
        document.getElementById("result-title").innerText = kategori;
        document.getElementById("resultBMI").innerText = bmi.toFixed(2);
        document.getElementById("comment").innerText = comment(kategori);
        document.getElementById("text").innerText = "Hasil BMI Anda: " + bmi.toFixed(2);
        document.getElementById("saran").innerText = saran(kategori);
        document.getElementById("solusi").innerText = solusi(kategori);
        document.getElementById("list-risiko").innerText = risiko(kategori);

        //MENYEMBUNYIKAN FORM SAAT HASIL DIKELUARKAN
        document.getElementById('home').style.display = 'none';
        document.getElementById('result').style.display = 'block';
      } else {
        warning.style.display = "block";
        warningText.innerHTML = 'Harap pilih jenis kelamin (Pria atau Wanita).'
      }
    }
  });

//WARNING DITUTUP SAAT BUTTON DIKLIK
span.onclick = function(){
    warning.style.display = "none";
}

//WARNING DITUTUP SAAT LAYAR DIKLIK
window.onclick = function(event){
    if(event.target == warning){
        warning.style.display = "none";
    }
}
