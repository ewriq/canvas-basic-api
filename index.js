const express = require('express');
const app = express(); 
const port = 3000; //portu belirliyoruz
const { createCanvas, loadImage } = require('canvas'); 


app.get('/api/canvas/:id', async (req, res) => {
  try {
    const id = req.params.id; // Kullanıcı tarafından sağlanan metin

    // Canvas oluşturma
    const canvas = createCanvas(400, 400);
    const context = canvas.getContext('2d');

    // Arka plan resmini yükleme
    const backgroundImage = await loadImage('./public/index.png');
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Metni ortalamak için gereken hesaplamalar
    const text = id || 'Boş metin'; // Eğer metin sağlanmadıysa varsayılan değer kullanılır
    const textWidth = context.measureText(text).width;
    const textX = (canvas.width - textWidth) / 2;
    const textY = canvas.height / 2 - 110; // Metnin konumunu belirtir


    // Metni çizme
    context.fillStyle = '#fffff'; // Metin rengi
    context.font = '20px Arial'; // Metin fontu
    context.fillText(text, textX, textY);

    // Sonuç resmini oluşturma
    const resultImage = canvas.toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(resultImage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Bir hata oluştu');
  }
});

app.listen(port, () => {
  console.log(`Sunucu şurada açıldı: http://localhost:${port}`);
});
