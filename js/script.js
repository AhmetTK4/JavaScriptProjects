// JavaScript kodunun belgeden sonra çalıştığından emin olmak için DOMContentLoaded olayı kullanıyoruz
document.addEventListener('DOMContentLoaded', () => {
    // Elementleri seçiyoruz
    const buton = document.getElementById('renkButonu');
    const clickCounter = document.getElementById('clickCounter');
    const timer = document.getElementById('timer');
    const clickSound = document.getElementById('clickSound');
    const restartButton = document.getElementById('restartButton');

    let tıklamaSayısı = 0;
    let kalanSaniye = 10;
    let zamanlayıcı;

    // Rastgele renk oluşturmak için bir fonksiyon tanımlıyoruz
    function rastgeleRenkOlustur() {
        const harfler = '0123456789ABCDEF';
        let renk = '#';
        for (let i = 0; i < 6; i++) {
            renk += harfler[Math.floor(Math.random() * 16)];
        }
        return renk;
    }

    // Butona tıklama olayı ekliyoruz
    buton.addEventListener('click', () => {
        // Rastgele bir renk oluştur ve arka plan rengini değiştir
        const yeniRenk = rastgeleRenkOlustur();
        document.body.style.backgroundColor = yeniRenk;

        // Tıklama sayısını artır ve güncelle
        tıklamaSayısı++;
        clickCounter.textContent = `Tıklama Sayısı: ${tıklamaSayısı}`;

        // Tıklama sesini çal
        clickSound.play();
    });

    // Geri sayımı başlatan fonksiyon
    function geriSayimBaslat() {
        kalanSaniye = 30;
        tıklamaSayısı = 0;
        clickCounter.textContent = `Tıklama Sayısı: ${tıklamaSayısı}`;
        timer.textContent = `${kalanSaniye} saniye kaldı!`;
        buton.disabled = false; // Butonu yeniden etkinleştir
        restartButton.style.display = 'none'; // Yeniden başlat butonunu gizle

        zamanlayıcı = setInterval(() => {
            kalanSaniye--;
            if (kalanSaniye > 0) {
                timer.textContent = `${kalanSaniye} saniye kaldı!`;
            } else {
                timer.textContent = `Süre doldu!`;
                buton.disabled = true; // Süre dolduğunda butonu devre dışı bırak
                clearInterval(zamanlayıcı);

                // Geri başlatma butonunu göster
                restartButton.style.display = 'block';
            }
        }, 1000);
    }

    // Yeniden başlatma butonuna tıklama olayı ekliyoruz
    restartButton.addEventListener('click', () => {
        geriSayimBaslat();
    });

    // İlk geri sayımı başlatıyoruz
    geriSayimBaslat();
});
