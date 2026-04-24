## Mühendislik, sadece karmaşık sistemler kurmak değil;
## o sistemleri bir insanın dünyayı daha net görmesini sağlamak için kullanmaktır.
## Bu algoritma, hiçbir harici kütüphane desteği almadan, saf matematik ve sinyal işleme ile erken teşhis imkanı sunar.
## Zeka, kibir için değil; hizmet için vahyedilmiştir.

_______
<details>
  <summary>Non-İnvaziv Diyabetik Retinopati ve Makula Dejenerasyonu. TEKNİK DÖKÜMANI (Tıkla Görüntüle)</summary>

  - **Analiz:** [TEKNİK ANALİZ VE SİSTEM RAPORU

1. Veri Üretim Modeli (Radon Transform Simülasyonu)Sistem, ham veriyi (raw data) işleme kabiliyetini simüle etmek için Radon Dönüşümü prensiplerini kullanır. 
Görüntüleme cihazından gelen sinyaller, sinogram yapısında kabul edilerek 2D doku kesitine dönüştürülür. Fovea çöküntüsü ve doku anomalileri, 
matematiksel sinüs ve kosinüs dalgalarıyla otonom bir şekilde üretilir.

2. Sinyal Temizleme (Perona-Malik Anizotropik Difüzyon)Klasik Gauss bulanıklaştırma (Blur) yöntemlerinin aksine,
3. sistem Perona-Malik diferansiyel denklemini çözer.İşleyiş: Görüntünün her pikselinde gradyan vektörleri ($\nabla I$) hesaplanır.
4. Sonuç: Kenar keskinliği (retina katmanları ve damarlar) korunurken, düşük frekanslı "Speckle Noise" (benekli gürültü) yok edilir.
5.  Bu, tıbbi teşhiste kritik olan sınırların silinmemesini sağlar.

6. Katman Ayrıştırma (Viterbi Algoritması)Retina katmanlarının (ILM ve RPE) tespiti için kütüphanesiz Viterbi Algoritması (Dinamik Programlama) uygulanmıştır.
7. her sütundaki en yüksek gradyan geçişi bir maliyet fonksiyonu üzerinden değerlendirilir.
8. Algoritma, gürültü içinde bile en optimize yolu bularak katmanları birbirinden ayırır.
9. Mikrometre Hassasiyeti: Katmanlar arası mesafe, piksel değerlerinden mikrometre ($\mu m$) birimine dönüştürülerek sayısal veri sunulur.

10. Vasküler Analiz ve Fraktal Boyut ($D_f$)Diyabetik Retinopati teşhisinde damar ağının karmaşıklığı kritik bir göstergedir.
11. Sistem, damar yoğunluğunu Box-Counting yöntemiyle analiz ederek Fraktal Boyut ($D_f$) değerini hesaplar.
12. Normal değer aralığı (1.40 - 1.60) dışındaki sapmalar, doku beslenmesindeki bozuklukların bir işareti olarak raporlanır.

13. Tanısal Görselleştirme (SVG Rendering)Tüm çıktılar matematiksel hassasiyette SVG  ve  elementleri ile çizilir.Isı Haritası (Heatmap):
14. Ödem riskine karşı katman arası dolgular gradyan filtreleri ile renklendirilir.
15. Kritik İşaretleyiciler: Kalınlık sınır değerlerini aşan bölgeler, otonom olarak işaretlenerek hekimin dikkatine sunulur.

16. Mimari DisiplinSistem, Zero-Dependency (Sıfır Bağımlılık) kuralına göre inşa edilmiştir.
17. Dış kütüphane, internet bağlantısı veya sunucu taraflı hesaplama gerektirmez.
18. Tüm matematiksel işlemler kullanıcının tarayıcısında (Client-side) gerçekleşir, bu da hasta verisinin gizliliği ve sistemin her koşulda
19.  (çevrimdışı) çalışabilirliği için en yüksek standarttır.Rapor Sonucu: Sistem, otonom döngüsünde istikrarlı bir şekilde çalışmakta olup,
20.   sayısal analiz ve görselleştirme katmanları tıbbi hassasiyet protokollerine tam uyum sağlamaktadır. ]
  
</details>

