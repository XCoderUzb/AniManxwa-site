// ====== FAQAT SHU FAYLNI TAHRIRLANG ======
window.APP = {
  name: "AniManxwa",
  tagline: "Manxwa va manhwalarni qulay o'qing",
  api: "https://animanxwa-server.onrender.com",                              // <-- Render server manzili, masalan: https://animanxwa-server.onrender.com (Google kirish uchun SHART)
  gclient: "830480285485-ibe59dd1ccljb8lee1kscrfcehps11kp.apps.googleusercontent.com", // Google OAuth Client ID (maxfiy emas)
  birthday: true,                       // true: Google dan tug'ilgan sana so'raladi (Google tekshiruvi kerak, tekshiruvgacha faqat Test users kira oladi). false: hamma kira oladi, sana ilovada qo'lda kiritiladi
  scheme: "animanxwa",                 // ilova ichidagi havola: animanxwa://manhwa/123
  androidPackage: "com.animanxwa.app", // <-- ilovaning HAQIQIY applicationId'sini yozing
  downloads: {
    android: "https://github.com/XCoderUzb/AniManxwa-app/releases/download/android/AniManxwa.apk", // Releases dagi APK (Play Market havolasi keyin)
    ios: "",                                     // App Store (keyin)
    windows: "https://github.com/XCoderUzb/AniManxwa-app/releases/download/windows/AniManxwa-Setup.exe", // Windows o'rnatuvchi
    other: "https://telegram.me/AniManxwaAppNews" // yangiliklar kanali (kompyuter va iPhone uchun)
  }
};
