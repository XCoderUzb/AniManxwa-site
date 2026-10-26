# AniManxwa — havola sahifasi (GitHub Pages)

Sayt bitta ish qiladi: `/manhwa/123/` havolasi ochilganda
- ilova o'rnatilgan bo'lsa → ilovada shu manhwani (yoki bobni) ochadi;
- o'rnatilmagan bo'lsa → yuklab olish havolasini beradi.

Server ham, domen puli ham kerak emas — hammasi GitHub Pages'da bepul.

## Havola formatlari

| Havola | Ilovada nima ochiladi |
|---|---|
| `https://NOM.github.io/manhwa/123/` | 123-manhwa sahifasi |
| `https://NOM.github.io/manhwa/123/456/` | 123-manhwaning 456-bobi |
| `https://NOM.github.io/?manhwa=123&chapter=456` | yuqoridagi bilan bir xil (zaxira format) |

Ilova ichidagi manzillar: `animanxwa://manhwa/123` va `animanxwa://manhwa/123/456`.

## Siz qiladigan ishlar

1. **Repo yarating.** Nomi aynan `NOM.github.io` bo'lsin (NOM — GitHub username yoki organization nomi), repo *Public*. Maslahat: bepul *organization* oching (nomi `animanxwa`), shunda manzil `animanxwa.github.io` bo'ladi va chiroyli chiqadi.
2. **Fayllarni yuklang.** Zip'ni oching, ichidagi HAMMA narsani repo ildiziga yuklang (Add file → Upload files). `.well-known` papkasi va `.nojekyll` fayli ham kerak. Telefondan yuklash qiyin bo'lsa, GitHub Desktop yoki kompyuterdan foydalaning.
3. **Pages'ni yoqing.** Settings → Pages → *Deploy from a branch* → `main` / `(root)` → Save. 1–2 daqiqada sayt ochiladi.
4. **`USERNAME` ni almashtiring.** `index.html` va `404.html` (ikkalasi bir xil, ikkalasini ham tahrirlang) ichida `USERNAME` o'rniga `NOM` yozing. Ilova nomi boshqacha bo'lsa, shu yerdagi `AniManxwa` ni ham o'zgartiring.
5. **`config.js` ni to'ldiring:** ilova nomi, `scheme`, `androidPackage`, `downloads.android` (APK joylangan Telegram post havolasi, masalan `https://t.me/kanal/45`).
6. **`icon.png`** (512×512) ni ildizga qo'ying. Sahifada logo va havola rasmi sifatida chiqadi.
7. **`.well-known/assetlinks.json`** ni to'ldiring (pastda). Bu ilova o'rnatilgan telefonlarda havola saytni ochmasdan, to'g'ridan-to'g'ri ilovada ochilishini ta'minlaydi.
8. **Sinab ko'ring:** telefonda `https://NOM.github.io/manhwa/123/` ni oching.

## Yuklab olish havolasini keyin almashtirish

Faqat `config.js` dagi `downloads` ni tahrirlang va Commit qiling. Play Market chiqsa `android` ga Play havolasini, App Store / Microsoft Store chiqsa `ios` / `windows` ga ularning havolalarini yozing. Hamma eski havolalar o'zgarishsiz ishlayveradi.

## Ilova tomoni (keyingi promptga qo'shing)

Ilova ikkala turdagi havolani ham tushunishi va id'lar bo'yicha kerakli ekranni ochishi kerak (ilova yopiq bo'lsa ham, ochiq bo'lsa ham):

```xml
<!-- 1) Saytdagi havola (App Links) -->
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="https" android:host="NOM.github.io" android:pathPrefix="/manhwa/"/>
</intent-filter>
<!-- 2) Ilovaning o'z manzili: animanxwa://manhwa/123/456 -->
<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="animanxwa" android:host="manhwa"/>
</intent-filter>
```

Yo'l qoidasi: `/manhwa/{manhwaId}` → manhwa sahifasi, `/manhwa/{manhwaId}/{bobId}` → shu bobni o'qish. `package` nomi `config.js` dagi `androidPackage` bilan bir xil bo'lishi shart.

## assetlinks.json uchun SHA-256

Ilovani imzolagan kalitning SHA-256 izi kerak:
- terminalda: `keytool -list -v -keystore kalit.jks -alias ALIAS` → `SHA256:` qatori;
- yoki Android Studio'da: Gradle → Tasks → android → `signingReport`.

`package_name` ni ham ilovangizniki bilan almashtiring. Keyinchalik Play Market'ga chiqarsangiz, Play Console → App signing'dagi SHA-256 ni ham ro'yxatga qo'shing (vergul bilan ikkinchi qiymat).

## Bilib qo'ying

- GitHub Pages `/manhwa/123/` kabi manzillarga `404.html` orqali javob beradi. Brauzerda hammasi ishlaydi, lekin ba'zi messenjerlarda havola rasmi (preview) chiqmasligi mumkin. Shunda `?manhwa=123` formatidan foydalaning.
- Sayt ilovani o'zi ochishga urinadi, lekin Chrome bunga har doim ruxsat bermaydi. Shunda "Ilovada ochish" tugmasi ishlaydi. Eng ishonchli yo'l — 7-qadam (App Links).
- Telegram va Instagram ichki brauzerlarida ba'zan ilova ochilmaydi; foydalanuvchi "Brauzerda ochish"ni tanlashi kerak bo'ladi.
- iPhone uchun to'liq ishlashi App Store'ga chiqqandan keyin alohida sozlanadi (Universal Links). Hozircha iPhone foydalanuvchilariga "tez orada" xabari ko'rsatiladi.
