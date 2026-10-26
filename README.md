# AniManxwa — havola sahifasi (GitHub Pages)

`/manhwa/123/` havolasi ochilganda: ilova o'rnatilgan bo'lsa ilovada ochishga urinadi, bo'lmasa yuklab olish tugmasini beradi. Server va domen kerak emas.

Sizning sayt manzilingiz: `https://USERNAME.github.io/REPO/` (oddiy repo — shu variant ishlaydi).

## Havola formatlari

| Havola | Ilovada nima ochiladi |
|---|---|
| `https://USERNAME.github.io/REPO/manhwa/123/` | 123-manhwa sahifasi |
| `https://USERNAME.github.io/REPO/manhwa/123/456/` | 123-manhwaning 456-bobi |
| `https://USERNAME.github.io/REPO/?manhwa=123&chapter=456` | yuqoridagi bilan bir xil (zaxira format) |

GitHub Pages'da boshqa yo'l yo'q, shuning uchun `404.html` birinchi ikkitasini avtomatik uchinchi ko'rinishga o'tkazadi. Ilova ichidagi manzillar: `animanxwa://manhwa/123` va `animanxwa://manhwa/123/456`.

## O'rnatish

1. Repo'dagi eski fayllarni o'chiring va zip ichidagi HAMMA fayllarni ildizga yuklang (`404.html` va `.nojekyll` ham kerak).
2. `index.html` ichida `USERNAME` va `REPO` ni o'zingiznikiga almashtiring (havola rasmi uchun, 1 joy).
3. `config.js` da `androidPackage` ni ilovangizning haqiqiy applicationId'si bilan almashtiring. Havolalar qo'yib bo'lingan.
4. `icon.png` (512×512) ni ildizga qo'ying.
5. 1–2 daqiqa kuting, brauzerda Ctrl+F5 bosing va sinang: `https://USERNAME.github.io/REPO/manhwa/123/`

## Yuklab olish havolasini keyin almashtirish

Faqat `config.js` dagi `downloads` ni tahrirlang va Commit qiling. Play Market chiqsa `android` ga, App Store / Microsoft Store chiqsa `ios` / `windows` ga havolasini yozing.

## Ilova tomoni (keyingi promptga qo'shing)

Ilova `animanxwa://manhwa/{manhwaId}` va `animanxwa://manhwa/{manhwaId}/{bobId}` manzillarini tushunishi kerak (ilova yopiq bo'lsa ham, ochiq bo'lsa ham):

```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="animanxwa" android:host="manhwa"/>
</intent-filter>
```

## Bilib qo'ying

- Oddiy repoda (`USERNAME.github.io/REPO/`) havola tugma orqali ochiladi. Havolaning o'zi to'g'ridan-to'g'ri ilovada ochilishi (App Links) uchun repo nomi aynan `USERNAME.github.io` bo'lishi va `.well-known/assetlinks.json` to'ldirilishi kerak (SHA-256 izi: Android Studio → Gradle → android → `signingReport`). Hozircha shart emas.
- Sayt ilovani o'zi ochishga urinadi, lekin Chrome buni har doim ruxsat etmaydi, shunda "Ilovada ochish" tugmasi ishlaydi. Telegram ichki brauzerida ba'zan "Brauzerda ochish" kerak bo'ladi.
- Ba'zi messenjerlarda `/manhwa/123/` havolasining rasmi (preview) chiqmasligi mumkin; shunda `?manhwa=123` formatini ishlating.
