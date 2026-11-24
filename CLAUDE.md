# ATPL Prep by YSC — proje notu (Claude için)

Yiğit Serdar Canoğlu'nun (TR.FCL.A. 25544) kişisel checkride & mülakat çalışma uygulaması.
Canlı adres: https://yscanoglu.github.io/atplprepyigitserdarcanoglu/ (GitHub Pages, `main` dalının kökünden yayınlanır).

## Kullanıcı
- Türkçe konuşur, yazılım bilmez. Adım adım, sade anlat; teknik terim kullanma.
- Notları kendi el yazısı/PDF'lerinden gelir. İçeriği **onun yazdığı gibi** aktar; düzeltme önermek istediğin
  yerleri uygulamada değiştirmeden ona sor/listele (ör. "WCA formülü" ve "1 NM = 6000 ft" bilerek bu şekilde kalıyor).
- Mevcut çalışma mantığını (maskelenen kartlar, PA-28'deki kart yapısı) yeni içerikte de koru.

## Yapı
- `index.html` — kabuk; veri dosyalarını `<script defer>` ile yükler. **Yeni veri dosyası = buraya yeni satır.**
- `app.js` — motor (menüler, flashcard, Bildim/Bilemedim, W&B). `APP_VERSION` ana menünün altında görünür.
- `styles.css` — görünüm.
- `data/*.js` — sadece veri. `registerAircraft({...})` veya `registerTheory({...})` çağırır.
  - Kart maddesi: `"Metin"` → numaralı adım (numara otomatik); `{ label, val, sub?, mask? }` → etiket + gizli değer.
  - Grup: `{ header, mask, restart, items }` — `mask` gizliyken görünen başlık, `restart: true` numarayı 1'den başlatır.
  - Kart: `{ title, category?, groups, notes? }` — `category` filtre ve rozet içindir (EMERGENCY/NORMAL/WARNING/CAUTION/ADVISORY).
  - Uçak `wb`: `emptyWeight`, `emptyArm` (null olabilir → kullanıcı girer), `stations[]`, `envelope` [[CG, lbs], ...], `maxWeight`.
- `sw.js` — offline (network-first). **Dosya eklenince `ASSETS` listesine ekle ve `CACHE` adını değiştir.**
- `manifest.webmanifest`, `icons/` — ana ekran uygulaması ("ATPL Prep by YSC").

## Sürüm yayınlama
1. Değişiklik → `APP_VERSION` (app.js) ve `CACHE` (sw.js) birlikte artır.
2. Playwright + `/usr/bin/google-chrome` ile 390x844 telefon boyutunda test et (konsol hatası olmamalı).
3. `git commit` → `git tag vX.Y` → `git push origin main --tags`. Sayfa 1-2 dk içinde güncellenir.
4. Geri dönüş istenirse ilgili etiketin dosyalarını geri yükleyip yeni sürüm olarak yayınla (geçmişi silme).

## Sürümler
- v0.2 — yeniden yazım (veri/kod ayrımı, offline, Bildim/Bilemedim, genel W&B).
- v0.3 — PA-44-180 Seminole (Checklist, CAS, Limitler, Manevralar, W&B); teori bölümü "General Aviation Knowledge", IFR yapım aşamasında.
- v0.4 — PA-44 POH düzeltmeleri: Fuel Quantity (XFEED), tırmanış gücü 24 inHg / 2400 RPM, briefing "Koşu Mesafesi (FT)". BEM kolu POH'ta yok → kullanıcı kendi uçağının W&B raporundan girecek.
- v0.5 — PA-44 W&B boş ağırlık/kol: okulun Mass and Balance uygulamasından 2779.17 lbs @ 89.42". (Limitler kartındaki "BEM 2589" kullanıcının notundan, POH örneği.)
