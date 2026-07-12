// Pascube Benchmark Dashboard Logic

const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1nlMgeW0ZFmtwwT3hty8JAFT3sM0SNhMpc24mH3In9zI/export?format=csv";

// ─── Supabase (Blog + Comments) ───
const SUPABASE_URL = 'https://abyocgxsepgbofevxgme.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFieW9jZ3hzZXBnYm9mZXZ4Z21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MDM0MzMsImV4cCI6MjA5ODk3OTQzM30.tdlETv_h7BaFcEjDOXhxlOGzTVYl7uvFpxG43mMCPyk';
const supa = window.supabase && window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let blogSession = null;

// ─── Analytics Tracking ───

function trackPage(page) {
    if (!supa) return;
    supa.from('pageviews').insert({ page, referrer: document.referrer || null, user_agent: navigator.userAgent || null }).then(() => {});
}

function trackPostView(postId) {
    if (!supa) return;
    supa.rpc('increment_post_views', { post_id: postId }).then(() => {}).catch(() => {});
}

// Fallback CSV Data to ensure the dashboard works even offline or in case of CORS/network issues
const FALLBACK_CSV = `Origem / Usuário,CPU,RAM,GPU,VRAM,Driver,Kernel,Operating System,Main Score,CPU Single,CPU Multi,GPU Score,Date/Time,client-id,architecture,package,,product name,CPU Max Freq (MHz),GPU Max Freq (MHz),CPU Max Freq (MHz),GPU Max Freq (MHz)
Anonymous,Ryzen 7 9800X3D,31GB,RTX 4090,24GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (daniel@Cafetera)  dom 31 may 2026 19:42:58 CEST,7.0.10-2-cachyos-custom,CachyOS,5174,2780,3655,7306,16/06/2026 13:11:07,2648f98e2306731777b45289ec0a46e6d5466beb43cecb72104b6ea3449aa10a,,,,,,,,,,,,,,5700,2520
Anonymous,Ryzen 7 9800X3D,30GB,RTX 4090,24GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  595.80  Release Build  (dvs-builder@U22-I3-AF05-29-2)  Thu May 21 19:21:58 UTC 2026,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),4975,2615,4019,6913,,,,,,,,,,,,,,,,5700,2520
Anonymous,Ryzen 9 7950X3D 16-Core,63GB,RX 7900 XTX,24GB,Mesa 26.1.99,7.0.12-1-cachyos,CachyOS,4938,3481,10783,4205,14/06/2026 14:22:49,,,,,,,,,,,,,,,5900,2500
Anonymous,Ryzen 9 9950X3D,96 GB,RX 9070 XT,,,,Arch Linux,4932,3576,11897,3791,,,,,,,,,,,,,,,,5900,2970
Anonymous,Ryzen 9 9900X3D 12-Core,60GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,4665,3731,9404,3897,14/06/2026 13:14:56,,,,,,,,,,,,,,,5800,2970
Anonymous,Ryzen 7 9800X3D,94GB,RTX 5070 Ti,,,,CachyOS,4609,3978,5679,4729,,,,,,,,,,,,,,,,5700,2700
Anonymous,Ryzen 7 9800X3D,96 GB,RTX 5070 Ti,,,,CachyOS,4546,N/D,N/D,N/D,,,,,,,,,,,,,,,,5700,2700
Anonymous,Ryzen 7 9800X3D,94GB,RTX 5070 Ti,,,,CachyOS,4546,"3,909","5,438","4,725",,,,,,,,,,,,,,,,5700,2700
Anonymous,RYZEN AI MAX+ 395 w/ Radeon 8060S,125GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4513,3062,10564,3713,,,,,,,,,,,,,,,,5100,2970
Anonymous,Ryzen 7 7800X3D,62GB,RX 7900 XTX,,,,CachyOS,4465,"3,767","5,508","4,641",,,,,,,,,,,,,,,,5000,2500
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,24GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4441,3980,5716,4382,,,,,,,,,,,,,,,,5000,2500
Anonymous,AMD Ryzen 9 9950X3D,96 GB,RX 9070 XT,,,,Arch Linux,4380,3754,12228,2464,,,,,,,,,,,,,,,,5900,2970
Anonymous,Ryzen 9 9950X3D,94GB,RX 9070 XT,,,,Arch Linux,4380,"3,754","12,228","2,464",,,,,,,,,,,,,,,,5900,2970
Anonymous,Ryzen 7 9800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,4323,4166,6530,3771,15/06/2026 04:48:03,,,,,,,,,,,,,,,5700,2970
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,24GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,4317,3929,5257,4307,14/06/2026 11:07:41,,,,,,,,,,,,,,,5000,2500
Anonymous,Ryzen 9 7950X3D 16-Core,62GB,RX 7900 XTX,24GB,Mesa 26.0.6,7.0.12-arch1-1,Arch Linux,4294,2603,7647,4471,15/06/2026 17:45:28,,,,,,,,,,,,,,,5900,2500
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,,,,CachyOS,4213,"3,689","5,503","4,193",,,,,,,,,,,,,,,,5000,2500
Anonymous,Ryzen 7 9800X3D,64 GB,RX 9070 XT,,,,Cachy OS,4207,N/D,N/D,N/D,,,,,,,,,,,,,,,,5700,2970
Anonymous,Ryzen 7 9800X3D,60GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4133,4004,6475,3520,,,,,,,,,,,,,,,,5700,2970
Anonymous,Ryzen 7 9800X3D,32 GB,RX 9070 XT,,,,CachyOS,4131,N/D,N/D,N/D,,,,,,,,,,,,,,,,5700,2970
Anonymous,RYZEN AI MAX+ 395 w/ Radeon 8060S,125GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4130,2545,9451,3644,,,,,,,,,,,,,,,,5100,2970
Anonymous,Ryzen 7 9800X3D,62GB,RX 7900 XTX,24GB,Mesa 26.1.2,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),4109,2915,5029,4668,15/06/2026 03:38:39,,,,,,,,,,,,,,,5700,2500
Anonymous,Ryzen 7 7800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.1.0-rc7-1-cachyos-rc,CachyOS,4100,3808,6109,3702,,,,,,,,,,,,,,,,5000,2970
Anonymous,Ryzen 7 7800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.1.0-rc7-1-cachyos-rc,CachyOS,4040,3813,5996,3613,,,,,,,,,,,,,,,,5000,2970
Anonymous,Ryzen 7 5800X 8-Core,31GB,RTX 5070 Ti,,,,CachyOS,4032,3053,4610,4544,,,,,,,,,,,,,,,,4600,2700
Anonymous,Ryzen 7 9800X3D,64 GB,RX 9070 XT,,,,Cachy OS,3989,N/D,N/D,N/D,,,,,,,,,,,,,,,,5700,2970
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,3889,3283,5120,3944,,,,,,,,,,,,,,,,4500,2970
Anonymous,Ryzen 9 9950X3D 16-Core,92GB,RX 9070 XT,15.9GB,Mesa 26.0.6,6.17.7-ba29.fc43.x86_64,Bazzite,3820,2290,7314,3842,16/06/2026 12:40:48,,,,,,,,,,,,,,,5900,2970
Anonymous,Ryzen 7 5800X 8-Core,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,3690,2995,4983,3789,15/06/2026 09:39:07,,,,,,,,,,,,,,,4600,2970
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,24GB,Mesa 26.0.6,7.0.11-1-cachyos,CachyOS,3680,2703,3803,4327,,,,,,,,,,,,,,,,5000,2500
Anonymous,i5-14600KF,31GB,RTX 5070,12.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Wed Jun  3 22:21:41 UTC 2026,7.0.11-1-cachyos,CachyOS,3679,3058,6429,3289,,,,,,,,,,,,,,,,5300,2700
Anonymous,i5-14600KF,31GB,RTX 5070,12.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Wed Jun  3 22:21:41 UTC 2026,7.0.11-1-cachyos,CachyOS,3679,3058,6429,3289,,,,,,,,,,,,,,,,5300,2700
Anonymous,Ryzen 7 5800X 8-Core,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,3659,3008,4880,3748,14/06/2026 13:37:55,,,,,,,,,,,,,,,4600,2970
Anonymous,Ryzen 7 9800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3656,3010,4980,3711,15/06/2026 08:21:30,,,,,,,,,,,,,,,5700,2970
Anonymous,Ryzen 7 9700X 8-Core,60GB,RX 7900 XTX,24GB,Mesa 26.0.6,7.0.12-zen1-1-zen,Arch Linux,3638,2304,3456,4627,16/06/2026 14:47:46,,,,,,,,,,,,,,,5500,2500
Anonymous,Ryzen 7 7800X3D,30GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.12-cachyos1.fc44.x86_64,Fedora Linux 44 (Forty Four),3498,2855,3869,3836,16/06/2026 06:15:59,,,,,,,,,,,,,,,5000,2970
Anonymous,Ryzen 7 9800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),3412,2687,4274,3661,,,,,,,,,,,,,,,,5700,2970
Anonymous,Ryzen 7 7800X3D,47GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,3393,3908,3496,3002,,,,,,,,,,,,,,,,5000,2970
Anonymous,Ryzen 9 5900X 12-Core,63 GB,RX 7800 XT,,,,Arch Linux,3367,2858,6.605,2751,,,,,,,,,,,,,,,,4800,2430
Anonymous,Ryzen 5 7500F 6-Core,31GB,RTX 5070,11.9GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (root@bezzerk-b650mgamingpluswifi),7.0.11-zen1-1-zen,Garuda Linux,3304,3336,4006,3070,,,,,,,,,,,,,,,,5000,2700
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,,,,CachyOS,3225,2203,1458,4471,,,,,,,,,,,,,,,,4400,2700
Anonymous,AMD Ryzen 7 7800X3D,32 GiB,RX 6750 XT,,,,EndeavourOS,3194,N/D,N/D,N/D,,,,,,,,,,,,,,,,5000,2600
Anonymous,Ryzen 7 7800X3D,31GB,RX 6750 XT,,,,EndeavourOS,3194,"3,989","6,352","1,69",,,,,,,,,,,,,,,,5000,2600
Anonymous,Ryzen 7 7800X3D,31GB,RTX 4070,,,,Bazzite,3148,2804,4186,3078,,,,,,,,,,,,,,,,5000,2480
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3078,2506,3548,3338,,,,,,,,,,,,,,,,4500,2700
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3075,2510,3522,3337,,,,,,,,,,,,,,,,4500,2700
Anonymous,Ryzen 7 5800X3D 8-Core,16GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.12-arch1-1,Arch Linux,3069,2344,3125,3560,16/06/2026 07:11:39,,,,,,,,,,,,,,,4500,2970
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3035,2439,3547,3299,,,,,,,,,,,,,,,,4500,2700
Anonymous,Ryzen 7 7800X3D,58GB,RTX 5070 Ti,15.9GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (root@Linusive),7.0.12-1-cachyos,Garuda Linux,3029,3936,6010,1500,,,,,,,,,,,,,,,,5000,2700
Anonymous,Ryzen 7 5800X3D 8-Core,32 GB,RX 9070 XT,,,,Fedora 44 KDE,3021,2308,3.385,3411,,,,,,,,,,,,,,,,4500,2970
Anonymous,Ryzen 7 9700X 8-Core,31GB,RX 9070,15.9GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,2979,2444,3851,3092,16/06/2026 16:06:23,,,,,,,,,,,,,,,5500,2700
Anonymous,Ryzen 7 5800X3D 8-Core,63GB,RTX 5070,11.9GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,2970,2439,3559,3165,,,,,,,,,,,,,,,,4500,2700
Anonymous,i7-12700K,31GB,RX 7800 XT,,,,Arch Linux,2962,"2,699","4,096","2,806",,,,,,,,,,,,,,,,5200,2430
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,16.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.126.09  Release Build  (dvs-builder@U22-I3-AM02-24-3)  Wed Jan  7 22:51:36 UTC 2026,6.19.10-2-liquorix-amd64,Ubuntu 24.04.4 LTS,2959,1627,1129,4440,,,,,,,,,,,,,,,,4400,2700
Anonymous,Ryzen 9 5900X 12-Core,31GB,RX 6900 XT,16GB,Mesa 26.1.2,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),2954,2390,4546,2871,15/06/2026 10:36:04,,,,,,,,,,,,,,,4800,2250
Anonymous,Ryzen 5 5600X 6-Core,31GB,RX 9070 GRE,11.9GB,Mesa 26.1.1,6.18.33-1-MANJARO,Manjaro Linux,2946,2899,3228,2894,,,,,,,,,,,,,,,,4400,2700
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 6800 XT,,,,CachyOS,2935,3242,4396,2281,,,,,,,,,,,,,,,,4500,2105
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 6800,16GB,Mesa 26.1.2,7.0.10-1-cachyos-bore-lto,CachyOS,2930,3356,4598,2132,,,,,,,,,,,,,,,,4500,2105
Anonymous,Ryzen AI 9 HX 370 w/ Radeon 890M,94GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.0-22-generic,Ubuntu 26.04 LTS,2893,1704,2829,3745,16/06/2026 06:29:30,,,,,,,,,,,,,,,5100,2970
Anonymous,12th Gen i5-12400F,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,2820,2316,2936,3139,14/06/2026 16:00:38,,,,,,,,,,,,,,,4400,2700
Anonymous,Ryzen 7 5700X 8-Core,15GB,RX 9060 XT,16GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,2791,2987,4138,2249,,,,,,,,,,,,,,,,4600,2700
Anonymous,Ryzen 9 5900XT 16-Core,31GB,RX 6750 XT,12GB,Mesa 26.1.2,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),2763,2501,6547,1812,,,,,,,,,,,,,,,,4800,2600
Anonymous,Ryzen 7 9700X 8-Core,30GB,RX 9060 XT,,,,CachyOS,2752,3759,4576,1500,,,,,,,,,,,,,,,,5500,2700
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 7800 XT,16GB,Mesa 26.0.6,7.0.12-1-cachyos,CachyOS,2710,2289,3187,2862,,,,,,,,,,,,,,,,4500,2430
Anonymous,Ryzen 7 5700X 8-Core,30GB,RX 6800,16GB,Mesa 26.0.6,7.0.0-22-generic,Ubuntu 26.04 LTS,2391,2176,3460,2220,16/06/2026 08:23:53,,,,,,,,,,,,,,,4600,2105
Anonymous,i7-9700K @ 3.60GHz,31GB,RX 9060 XT,,,,EndeavourOS,2387,2590,2852,2105,,,,,,,,,,,,,,,,4900,2700
Anonymous,Ryzen 9 3900X 12-C,31GB,RTX 3060 Ti,,,,CachyOS,2384,"2,113","4,886","1,823",,,,,,,,,,,,,,,,4600,1670
Anonymous,i7-9700K @ 3.60GHz,N/D,RX 9060 XT,,,,CachyOS,2330,N/D,N/D,N/D,,,,,,,,,,,,,,,,4900,2700
Anonymous,13th Gen i9-13900HX,31GB,RTX 4070 Laptop GPU,8GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  595.71.05  Release Build  (root@Mahoraga)  Tue Jun  2 17:06:29 CEST 2026,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),2305,2152,4365,1794,,,,,,,,,,,,,,,,5400,2480
Anonymous,AMD Ryzen 7 5800x3d,32 GB,AMD Radeon RX 6700xt,,,,Nobara 43 KDE,2219,N/D,N/D,N/D,,,,,,,,,,,,,,,,,2400
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,16.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.126.09  Release Build  (dvs-builder@U22-I3-AM02-24-3)  Wed Jan  7 22:51:36 UTC 2026,6.19.10-2-liquorix-amd64,Ubuntu 24.04.4 LTS,2203,1,1,4405,,,,,,,,,,,,,,,,4400,2700
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,,,,Ubuntu 24.04.4 LTS,2202,1,1,4402,,,,,,,,,,,,,,,,4400,2700
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,,,,Ubuntu 24.04.4 LTS,2200,1,1,4400,,,,,,,,,,,,,,,,4400,2700
Anonymous,AMD Ryzen 5 5600 6-Core,31 GB,Intel Arc A750 Graphics,,,,CachyOS,2169,2.992,3.245,1.270,,,,,,,,,,,,,,,,4400,2400
Anonymous,Ryzen 7 9800X3D,62GB,RX 7900 XTX,,,,PikaOS 4,1892,1,1,3784,,,,,,,,,,,,,,,,5700,2500
Anonymous,Ryzen 5 3600 6-Core,31GB,RTX 3060 Ti,8.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,1862,2156,2215,1550,16/06/2026 11:02:05,,,,,,,,,,,,,,,,1670
Anonymous,Ryzen 5 5600 6-Core,31GB,RX 6700,10GB,Mesa 26.1.2,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),1851,2333,2723,1252,15/06/2026 03:23:04,,,,,,,,,,,,,,,4400,2400
Anonymous,Ryzen 5 7600X 6-Core,31GB,Intel(R) Arc(tm) B580 Graphics (BMG G21),11.9GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,1844,2510,3060,1013,,,,,,,,,,,,,,,,5400,2850
Anonymous,12th Gen i5-12450HX,15GB,RTX 4050 Laptop GPU,6GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Wed Jun  3 22:21:41 UTC 2026,7.0.11-1-cachyos,CachyOS,1777,2152,2195,1390,,,,,,,,,,,,,,,,4500,2370
Anonymous,Ryzen 5 3600 6-Core,31GB,RX 6750 XT,12GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,1693,1540,2034,1697,,,,,,,,,,,,,,,,,2600
Anonymous,Ryzen 5 5600G with Radeon Graphics,31GB,RX 6650 XT,8GB,Mesa 26.0.6,7.0.0-22-generic,Ubuntu 26.04 LTS,1660,1832,2245,1365,15/06/2026 20:41:15,,,,,,,,,,,,,,,4400,2694
Anonymous,i7-10870H @ 2.20GHz,31GB,RTX 3080 Laptop,,,,CachyOS,1520,"1,352",887,"1,617",,,,,,,,,,,,,,,,5000,1710
Anonymous,12th Gen i5-12400F,15GB,GTX 1060 6GB,6.2GB,NVRM version: NVIDIA UNIX x86_64 Kernel Module  580.159.04  Wed Apr 29 17:32:45 UTC 2026,7.0.12-zen1-1-zen,Garuda Linux,1513,2277,2545,669,,,,,,,,,,,,,,,,4400,1708
Anonymous,12th Gen i5-12400F,31GB,RX 6600,8GB,Mesa 26.0.6,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),1438,1761,2221,978,16/06/2026 15:37:21,,,,,,,,,,,,,,,4400,2491
Anonymous,Ryzen 5 4600H with Radeon Graphics,15GB,GTX 1650 Ti,4.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,1320,1972,1947,676,16/06/2026 03:17:59,,,,,,,,,,,,,,,4000,1485
Anonymous,12th Gen i5-12450H,31GB,RTX 4060 Laptop GPU,8GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  595.80  Release Build  (dvs-builder@U22-I3-AF05-29-2)  Thu May 21 19:21:58 UTC 2026,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),1312,1283,1178,1372,,,,,,,,,,,,,,,,4500,2460
Anonymous,i7-2600K @ 3.40GHz,16GB,RX 580,8GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,1298,2263,1558,544,,,,,,,,,,,,,,,,3800,1340
Anonymous,AMD Ryzen 7 3800XT,32 GB,GTX 1080,,,,Fedora 44 KDE (VM),1278,1294,1164,1300,,,,,,,,,,,,,,,,4700,1733
Anonymous,i7-2600K @ 3.40GHz,16GB,RX 580,8GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,1278,2228,1480,553,,,,,,,,,,,,,,,,3800,1340
Anonymous,Intel(R) Xeon(R) E5-2680 v3 @ 2.50GHz,16GB,GTX 980 Ti,6.2GB,NVRM version: NVIDIA UNIX x86_64 Kernel Module  580.159.04  Wed Apr 29 17:32:45 UTC 2026,7.0.12-201.fc44.x86_64,Fedora Linux 44 (Workstation Edition),1259,1119,2231,1065,,,,,,,,,,,,,,,,3300,1391
Anonymous,Ryzen Z1 Extreme,11 GB,Ryzen Z1 Extreme,,,,Bazzite (ROG Ally Z1E),1144,N/D,N/D,N/D,,,,,,,,,,,,,,,,5100,
Anonymous,Ryzen 5 5600G with Radeon Graphics,15GB,RX 580,8GB,Mesa 26.0.6,6.17.0-35-generic,Zorin OS 18.1,1143,1708,2017,485,15/06/2026 12:23:39,,,,,,,,,,,,,,,4400,1340
Anonymous,i7-9750H @ 2.60GHz,15GB,GTX 1660 Ti,6.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,1112,1264,1098,1009,15/06/2026 09:19:31,,,,,,,,,,,,,,,4500,1770
Anonymous,11th Gen i5-11400H @ 2.70GHz,15GB,RTX 3050 Laptop GPU,4GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.159.03  Release Build  (dvs-builder@U22-I3-AM27-29-6)  Fri Apr 24 06:03:03 UTC 2026,7.0.11-76070011-generic,Pop!_OS 24.04 LTS,1060,1322,1327,796,16/06/2026 09:51:59,,,,,,,,,,,,,,,4600,1740
Anonymous,Ryzen 7 2700 Eight-Core,16GB,RX 590 Series,8GB,Mesa 26.0.6,6.17.0-35-generic,Linux Mint 22.3,978,1223,1556,634,16/06/2026 13:26:26,,,,,,,,,,,,,,,5200,1469
Anonymous,Intel(R) Xeon(R) E5-2667 v3 @ 3.20GHz,16GB,RX 580,8GB,Mesa 26.0.6,6.18.35-1-cachyos-lts,CachyOS,934,1183,1602,560,,,,,,,,,,,,,,,,3200,1340
Anonymous,Ryzen 5 5600H with Radeon Graphics,15GB,Graphics,5.3GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,889,1569,1736,159,,,,,,,,,,,,,,,,4400,
Anonymous,i5-10500 @ 3.10GHz,15GB,Intel(R) UHD Graphics 630 (CML GT2),,,,CachyOS,847,1639,1491,100,,,,,,,,,,,,,,,,4500,1200
Anonymous,Custom APU 0405,14GB,AMD Custom GPU 0405,6GB,Mesa 26.1.2,6.11.11-valve29-1-neptune-611-g2dcfaf4df7ac,SteamOS,808,1454,1285,212,,,,,,,,,,,,,,,,3500,
Anonymous,i7-4770 @ 3.40GHz,16GB,RX 580,8GB,Mesa 26.0.6,7.0.11-arch1-1,Arch Linux,787,1266,901,417,,,,,,,,,,,,,,,,3900,1340
Anonymous,Ryzen 5 PRO 5650U with Radeon Graphics,23GB,Graphics,13.1GB,Mesa 26.0.6,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),650,1181,1036,162,,,,,,,,,,,,,,,,4200,
Anonymous,i5-6400 @ 2.70GHz,12GB,R9 390 Series,8GB,Mesa 26.0.5,6.19.14-ogc5.1.fc44.x86_64,Bazzite,585,879,311,461,15/06/2026 14:41:25,,,,,,,,,,,,,,,3300,1015
Anonymous,i5-3470S @ 2.90GHz,16GB,GT 1030 (NVK GP108),2.3GB,NVIDIA 109051.91.0,6.17.0-35-generic,Zorin OS 18.1,528,1120,503,122,14/06/2026 12:29:55,,,,,,,,,,,,,,,3600,1468
Anonymous,11th Gen i5-11400H @ 2.70GHz,15GB,RTX 3050 Laptop GPU,4GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.159.03  Release Build  (dvs-builder@U22-I3-AM27-29-6)  Fri Apr 24 06:03:03 UTC 2026,7.0.11-76070011-generic,Pop!_OS 24.04 LTS,407,1,1,813,16/06/2026 12:20:04,,,,,,,,,,,,,,,4600,1740
Anonymous,i5-5250U @ 1.60GHz,8GB,Intel(R) HD Graphics 6000 (BDW GT3),7.7GB,Mesa 26.1.2,6.14.0-37-generic,Linux Mint 22.3,54,1,1,107,14/06/2026 18:04:47,,x86_64,native,,,,,,,,,,,,2700,1000
Anonymous,Raspberry Pi 5,8GB,VideoCore VII,0.5GB,Mesa 26.1.2,7.0.12-1-cachyos,Ubuntu 24.04 LTS,94,1,1,67,20/06/2026 12:00:00,,aarch64,native,,Raspberry Pi 5 Rev 1.0,,,,,,,,,,2400,800
Anonymous,Orange Pi 5 Plus,16GB,Mali G610,2GB,Mesa 26.1.2,7.0.12-1-cachyos,Debian 12,78,1,1,52,22/06/2026 14:30:00,,aarch64,native,,Orange Pi 5 Plus 16GB,,,,,,,,,,2000,800
`;

// Score type color scheme — consistent across all charts
const SCORE_COLORS = {
    cpuSingle: { bg: 'rgba(99, 102, 241, 0.85)', border: '#818cf8' },
    cpuMulti: { bg: 'rgba(168, 85, 247, 0.85)', border: '#c084fc' },
    gpu: { bg: 'rgba(16, 185, 129, 0.85)', border: '#10b981' },
    popular: { bg: 'rgba(245, 158, 11, 0.85)', border: '#f59e0b' },
    popularGpu: { bg: 'rgba(217, 119, 6, 0.85)', border: '#d97706' },
    portableRuns: { bg: 'rgba(6, 182, 212, 0.85)', border: '#22d3ee' },
};

// State Variables
let benchmarkData = [];
let filteredData = [];
let chartInstances = {};
let chartNorm = {};
let currentSort = { column: 'mainScore', direction: 'desc' };
let chartVizState = { mesa: { mode: 'absolute', normalize: true }, nvidia: { mode: 'absolute', normalize: true }, kernel: { mode: 'delta', normalize: true }, os: { mode: 'delta', normalize: true }, cpuAverage: { mode: 'absolute', normalize: false }, gpuAverage: { mode: 'absolute', normalize: false } };
let baselineState = { mesa: null, nvidia: null, kernel: null, os: null, cpuAverage: null, gpuAverage: null };
let modelSelection = { cpuAverage: [], gpuAverage: [], mesa: null, nvidia: null, kernel: null, os: null };
let lastSoftwareData = { mesa: null, nvidia: null, kernel: null, os: null, cpuAverage: null, gpuAverage: null };
let modelSelectorActiveType = null;

// Pill Navigation State
let PILL_STATE = {
    active: 'performance',
    rendered: { performance: false, efficiency: false, thermals: false }
};

function updateURLParam(key, value) {
    const url = new URL(window.location);
    if (value) {
        url.searchParams.set(key, value);
    } else {
        url.searchParams.delete(key);
    }
    history.replaceState({}, '', url);
}

function switchPill(name) {
    if (name === PILL_STATE.active) return;

    const oldName = PILL_STATE.active;
    PILL_STATE.active = name;

    // Update tabs
    document.querySelectorAll('.hw-tab').forEach(t => t.classList.toggle('active', t.dataset.pill === name));

    // Update underline position
    const activeTab = document.querySelector('.hw-tab.active');
    const underline = document.querySelector('.hw-tab-underline');
    if (activeTab && underline) {
        underline.style.left = activeTab.offsetLeft + 'px';
        underline.style.width = activeTab.offsetWidth + 'px';
    }

    // Exit animation on old content
    const oldContent = document.querySelector(`.pill-content[data-pill="${oldName}"]`);
    const newContent = document.querySelector(`.pill-content[data-pill="${name}"]`);
    if (oldContent && oldContent !== newContent) {
        oldContent.classList.add('exit');
    }

    setTimeout(() => {
        if (oldContent && oldContent !== newContent) {
            oldContent.classList.remove('active', 'exit');
        }
        if (newContent) {
            newContent.classList.add('active', 'enter');

            requestAnimationFrame(() => {
                // Browser laid out content → canvas has real dimensions
                if (!PILL_STATE.rendered[name]) {
                    if (name === 'efficiency') renderEfficiencyCharts();
                    if (name === 'thermals') renderThermalsCharts();
                    PILL_STATE.rendered[name] = true;
                }
                requestAnimationFrame(() => {
                    newContent.classList.remove('enter');
                });
            });
        }
    }, 150);

    renderStats(name);
    updateURLParam('subtab', name === 'performance' ? '' : name);
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
}

function initPillNav() {
    const params = new URLSearchParams(window.location.search);
    const subtab = params.get('subtab');
    const initialPill = (subtab === 'efficiency' || subtab === 'thermals') ? subtab : 'performance';
    PILL_STATE.active = initialPill;

    document.querySelectorAll('.hw-tab').forEach(btn => {
        btn.addEventListener('click', () => switchPill(btn.dataset.pill));
    });

    document.querySelectorAll('.pill-content').forEach(c => c.classList.toggle('active', c.dataset.pill === initialPill));
    document.querySelectorAll('.hw-tab').forEach(t => t.classList.toggle('active', t.dataset.pill === initialPill));

    // Position underline for initial tab
    const activeTab = document.querySelector('.hw-tab.active');
    const underline = document.querySelector('.hw-tab-underline');
    if (activeTab && underline) {
        underline.style.left = activeTab.offsetLeft + 'px';
        underline.style.width = activeTab.offsetWidth + 'px';
    }

    // Reposition underline on resize
    window.addEventListener('resize', () => {
        const at = document.querySelector('.hw-tab.active');
        const ul = document.querySelector('.hw-tab-underline');
        if (at && ul) {
            ul.style.left = at.offsetLeft + 'px';
            ul.style.width = at.offsetWidth + 'px';
        }
    }, { passive: true });
}

function initVizTooltips() {
    const tooltip = document.createElement('div');
    tooltip.className = 'viz-info-tooltip-global';
    document.body.appendChild(tooltip);

    document.addEventListener('mouseover', e => {
        const icon = e.target.closest('.viz-info-icon');
        if (!icon) { tooltip.classList.remove('visible'); return; }
        const wrap = icon.closest('.viz-info-wrap');
        if (!wrap) return;
        const tip = wrap.querySelector('.viz-info-tooltip');
        if (!tip) return;
        tooltip.textContent = tip.textContent;
        const rect = icon.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.bottom + 8 + 'px';
        tooltip.classList.add('visible');
    });

    document.addEventListener('mouseout', e => {
        if (!e.target.closest('.viz-info-icon')) tooltip.classList.remove('visible');
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupTabNavigation();
    setupBaselineListeners();
    setupChartVizControls();
    setupHardwareListeners();
    setupModelSelectorListeners();
    initSkeletonLoading();
    initScrollObservers();
    initBackToTop();
    initPillNav();
    initVizTooltips();
    fetchData();
    trackPage('tab:hardware');
});

// Tab Navigation — Hardware / Software
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    window.switchTab = (target) => {
        const activeTab = document.querySelector(`.tab-btn[data-tab="${target}"]`);
        const activeContents = document.querySelectorAll(`.tab-content[data-tab="${target}"]`);

        const updateUI = () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');
            if (activeTab) activeTab.classList.add('active');
            activeContents.forEach(c => c.style.display = 'block');
        };

        if (document.startViewTransition) {
            document.startViewTransition(() => updateUI());
        } else {
            updateUI();
        }

        trackPage('tab:' + target);
        setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
    };
    tabs.forEach(tab => {
        tab.addEventListener('click', () => window.switchTab(tab.getAttribute('data-tab')));
    });
}

const BASELINE_CHART_MAP = { mesa: 'mesaDriverScatterChart', nvidia: 'nvidiaDriverScatterChart', kernel: 'kernelScatterChart', os: 'osHardwareScatterChart' };
const VIZ_CHART_IDS = { mesa: { mode: 'mesa-mode', toggle: 'mesa-toggle' }, nvidia: { mode: 'nvidia-mode', toggle: 'nvidia-toggle' }, kernel: { mode: 'kernel-mode', toggle: 'kernel-toggle' }, os: { mode: 'os-mode', toggle: 'os-toggle' }, cpuAverage: { mode: 'cpuAverage-mode', toggle: 'cpuAverage-toggle' }, gpuAverage: { mode: 'gpuAverage-mode', toggle: 'gpuAverage-toggle' } };
const AVERAGE_CHART_CONFIG = { cpuAverage: { chartId: 'cpuAverageChart', color: 'rgba(99, 102, 241, 0.85)', border: '#818cf8', label: 'Average CPU Single Score', maxItems: 10 }, gpuAverage: { chartId: 'gpuAverageChart', color: SCORE_COLORS.gpu.bg, border: SCORE_COLORS.gpu.border, label: 'Average GPU Score', maxItems: 10 } };

function populateBaselineSelects() {
    ['mesa', 'nvidia', 'kernel', 'os', 'cpuAverage', 'gpuAverage'].forEach(type => {
        const data = lastSoftwareData[type];
        if (!data) return;
        const select = document.getElementById(`${type}-baseline`);
        if (!select) return;
        select.innerHTML = '';
        let items, currentVal = select.value || baselineState[type];
        if (type === 'cpuAverage' || type === 'gpuAverage') {
            items = data.map(d => d.name);
        } else {
            items = [...new Set(data.points.map(p => p.label))];
        }
        items.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v;
            opt.textContent = v;
            if (v === currentVal || (!currentVal && !baselineState[type] && opt === select.options[0])) opt.selected = true;
            select.appendChild(opt);
        });
        if (!baselineState[type] && select.options.length > 0) {
            select.options[0].selected = true;
            baselineState[type] = select.options[0].value;
        }
    });
    const osHwSelect = document.getElementById('os-hardware');
    const osData = lastSoftwareData.os;
    if (osHwSelect && osData && osData.hwLabels) {
        osHwSelect.innerHTML = '';
        const curHw = modelSelection.os || '';
        const sorted = [...osData.hwLabels].sort((a, b) => {
            const pa = osData.points.filter(p => p.hardwareLabel === a);
            const pb = osData.points.filter(p => p.hardwareLabel === b);
            const sa = pa.reduce((s, p) => s + p.y, 0) / pa.length;
            const sb = pb.reduce((s, p) => s + p.y, 0) / pb.length;
            return sb - sa;
        });
        sorted.forEach(h => {
            const opt = document.createElement('option');
            opt.value = h;
            opt.textContent = h.length > 40 ? h.substring(0, 40) + '...' : h;
            if (h === curHw) opt.selected = true;
            osHwSelect.appendChild(opt);
        });
        if (!modelSelection.os && osHwSelect.options.length > 0) {
            let preferred = null;
            for (let i = 0; i < osHwSelect.options.length; i++) {
                if (osHwSelect.options[i].value.includes('9800X3D + RX 9070')) {
                    preferred = osHwSelect.options[i];
                    break;
                }
            }
            const target = preferred || osHwSelect.options[0];
            target.selected = true;
            modelSelection.os = target.value;
            const availableOS = [...new Set(osData.points.filter(p => p.hardwareLabel === modelSelection.os).map(p => p.label))].sort();
            const blSelect = document.getElementById('os-baseline');
            if (blSelect && availableOS.length > 0) {
                blSelect.innerHTML = '';
                availableOS.forEach(os => {
                    const opt = document.createElement('option');
                    opt.value = os;
                    opt.textContent = os;
                    blSelect.appendChild(opt);
                });
                let preferred = null;
                for (let i = 0; i < blSelect.options.length; i++) {
                    if (blSelect.options[i].value === 'CachyOS') {
                        preferred = blSelect.options[i];
                        break;
                    }
                }
                const target = preferred || blSelect.options[0];
                target.selected = true;
                baselineState.os = target.value;
            }
            const osChartId = BASELINE_CHART_MAP.os;
            if (chartVizState.os.mode === 'delta' && document.getElementById(osChartId)) {
                renderSoftwareDeltaChart('os');
            }
        }
    }
    const kernelHwSelect = document.getElementById('kernel-hardware');
    const kernelData = lastSoftwareData.kernel;
    if (kernelHwSelect && kernelData && kernelData.hwLabels) {
        kernelHwSelect.innerHTML = '';
        const curHw = modelSelection.kernel || '';
        const sorted = [...kernelData.hwLabels].sort((a, b) => {
            const pa = kernelData.points.filter(p => p.hardwareLabel === a);
            const pb = kernelData.points.filter(p => p.hardwareLabel === b);
            const sa = pa.reduce((s, p) => s + p.y, 0) / pa.length;
            const sb = pb.reduce((s, p) => s + p.y, 0) / pb.length;
            return sb - sa;
        });
        sorted.forEach(h => {
            const opt = document.createElement('option');
            opt.value = h;
            opt.textContent = h.length > 40 ? h.substring(0, 40) + '...' : h;
            if (h === curHw) opt.selected = true;
            kernelHwSelect.appendChild(opt);
        });
        if (!modelSelection.kernel && kernelHwSelect.options.length > 0) {
            let prefHw = null;
            for (let i = 0; i < kernelHwSelect.options.length; i++) {
                if (kernelHwSelect.options[i].value.includes('7800X3D')) {
                    prefHw = kernelHwSelect.options[i];
                    break;
                }
            }
            const hwTarget = prefHw || kernelHwSelect.options[0];
            hwTarget.selected = true;
            modelSelection.kernel = hwTarget.value;
            const availableKernels = [...new Set(kernelData.points.filter(p => p.hardwareLabel === modelSelection.kernel).map(p => p.label))].sort();
            const blSelect = document.getElementById('kernel-baseline');
            if (blSelect && availableKernels.length > 0) {
                blSelect.innerHTML = '';
                availableKernels.forEach(k => {
                    const opt = document.createElement('option');
                    opt.value = k;
                    opt.textContent = k;
                    blSelect.appendChild(opt);
                });
                let prefBl = null;
                for (let i = 0; i < blSelect.options.length; i++) {
                    if (blSelect.options[i].value === 'Kernel 7.0') {
                        prefBl = blSelect.options[i];
                        break;
                    }
                }
                const blTarget = prefBl || blSelect.options[0];
                blTarget.selected = true;
                baselineState.kernel = blTarget.value;
            }
            if (chartVizState.kernel.mode === 'delta' && document.getElementById('kernelScatterChart')) {
                renderSoftwareDeltaChart('kernel');
            }
        }
    }
    ['mesa', 'nvidia'].forEach(type => {
        const hwSelect = document.getElementById(`${type}-hardware`);
        const data = lastSoftwareData[type];
        if (hwSelect && data && data.hwLabels) {
            hwSelect.innerHTML = '';
            const curHw = modelSelection[type] || '';
            const sorted = [...data.hwLabels].sort((a, b) => {
                const pa = data.points.filter(p => p.hardwareLabel === a);
                const pb = data.points.filter(p => p.hardwareLabel === b);
                const sa = pa.reduce((s, p) => s + p.y, 0) / pa.length;
                const sb = pb.reduce((s, p) => s + p.y, 0) / pb.length;
                return sb - sa;
            });
            sorted.forEach(h => {
                const opt = document.createElement('option');
                opt.value = h;
                opt.textContent = h.length > 40 ? h.substring(0, 40) + '...' : h;
                if (h === curHw) opt.selected = true;
                hwSelect.appendChild(opt);
            });
            if (!modelSelection[type] && hwSelect.options.length > 0) {
                hwSelect.options[0].selected = true;
                modelSelection[type] = hwSelect.options[0].value;
                const available = [...new Set(data.points.filter(p => p.hardwareLabel === modelSelection[type]).map(p => p.label))].sort();
                const blSelect = document.getElementById(`${type}-baseline`);
                if (blSelect && available.length > 0) {
                    blSelect.innerHTML = '';
                    available.forEach(v => {
                        const opt = document.createElement('option');
                        opt.value = v;
                        opt.textContent = v;
                        blSelect.appendChild(opt);
                    });
                    if (type === 'os') {
                        let pref = null;
                        for (let i = 0; i < blSelect.options.length; i++) {
                            if (blSelect.options[i].value === 'CachyOS') { pref = blSelect.options[i]; break; }
                        }
                        const tgt = pref || blSelect.options[0];
                        tgt.selected = true;
                        baselineState.os = tgt.value;
                    } else {
                        blSelect.options[0].selected = true;
                        baselineState[type] = available[0];
                    }
                }
            }
        }
    });
}

function setupBaselineListeners() {
    ['mesa', 'nvidia', 'kernel', 'os'].forEach(type => {
        const select = document.getElementById(`${type}-baseline`);
        if (!select) return;
        select.addEventListener('change', () => {
            baselineState[type] = select.value;
            renderSoftwareDeltaChart(type);
        });
    });
    ['cpuAverage', 'gpuAverage'].forEach(type => {
        const select = document.getElementById(`${type}-baseline`);
        if (!select) return;
        select.addEventListener('change', () => {
            baselineState[type] = select.value;
            renderAverageChart(type);
        });
    });
}

function setupHardwareListeners() {
    ['os', 'kernel', 'mesa', 'nvidia'].forEach(type => {
        const chartType = type;
        const hwSelect = document.getElementById(`${type}-hardware`);
        if (!hwSelect) return;
        hwSelect.addEventListener('change', () => {
            modelSelection[chartType] = hwSelect.value;
            const data = lastSoftwareData[chartType];
            if (!data) return;
            const available = [...new Set(data.points.filter(p => p.hardwareLabel === hwSelect.value).map(p => p.label))].sort();
            const blSelect = document.getElementById(`${type}-baseline`);
            if (blSelect) {
                blSelect.innerHTML = '';
                available.forEach(v => {
                    const opt = document.createElement('option');
                    opt.value = v;
                    opt.textContent = v;
                    if (v === baselineState[chartType] || (!baselineState[chartType] && opt === blSelect.options[0])) opt.selected = true;
                    blSelect.appendChild(opt);
                });
                if (available.length > 0) {
                    baselineState[chartType] = blSelect.value || available[0];
                }
            }
            renderSoftwareDeltaChart(chartType);
        });
    });
}

function renderAverageChart(type) {
    const cfg = AVERAGE_CHART_CONFIG[type];
    if (!cfg) return;
    const data = lastSoftwareData[type];
    if (!data || !document.getElementById(cfg.chartId)) return;
    if (chartInstances[cfg.chartId]) { chartInstances[cfg.chartId].destroy(); delete chartInstances[cfg.chartId]; }
    makeChartScrollable(cfg.chartId, data.map(d => d.name), data.map(d => d.average), cfg.label, cfg.color, cfg.border, cfg.maxItems, undefined, undefined, undefined, true);
}

function openModelSelector(type) {
    const data = lastSoftwareData[type];
    if (!data) return;
    const isAverage = type === 'cpuAverage' || type === 'gpuAverage';
    const maxItems = isAverage ? 5 : 10;

    let items;
    if (isAverage) {
        if (!data.length || data.length < 2) return false;
        items = data.map(d => d.name);
    } else {
        items = data.hwLabels;
        if (items.length < 2) return false;
    }

    modelSelectorActiveType = type;
    const modal = document.getElementById('model-select-modal');
    const list = document.getElementById('model-select-list');
    const title = document.getElementById('model-select-title');
    if (!modal || !list) return false;

    const names = { cpuAverage: 'CPU Models', gpuAverage: 'GPU Models', mesa: 'GPU Models', nvidia: 'GPU Models', kernel: 'CPU Models', os: 'Operating Systems' };
    title.textContent = `Select ${names[type] || 'Items'} to Compare (max ${maxItems})`;

    const prevSelected = modelSelection[type] || [];
    list.innerHTML = '';
    items.forEach(v => {
        const label = document.createElement('label');
        label.className = 'model-select-item';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = v;
        cb.checked = prevSelected.includes(v);
        cb.addEventListener('change', () => {
            const checked = list.querySelectorAll('input:checked');
            if (cb.checked && checked.length > maxItems) {
                cb.checked = false;
                return;
            }
        });
        const name = document.createElement('span');
        name.textContent = v;
        label.appendChild(cb);
        label.appendChild(name);
        list.appendChild(label);
    });

    modal.showModal();
    document.body.classList.add('modal-open');
    return true;
}

function renderSoftwareDeltaChart(type) {
    const data = lastSoftwareData[type];
    if (!data) return;
    const chartId = BASELINE_CHART_MAP[type];

    if (type === 'os' || type === 'kernel' || type === 'mesa' || type === 'nvidia') {
        const pagEl = document.getElementById(`pag-${chartId}`);
        if (pagEl) pagEl.style.display = 'none';
        const hw = modelSelection[type];
        if (!hw) return;
        const hwPoints = data.points.filter(p => p.hardwareLabel === hw);
        if (hwPoints.length < 2) return;
        const baselineLabel = baselineState[type] || hwPoints[0].label;
        const baselineScore = (hwPoints.find(p => p.label === baselineLabel)?.y || hwPoints[0].y);
        const points = hwPoints.map((p, i) => {
            const delta = baselineScore > 0 ? Math.round(((p.y / baselineScore) - 1) * 100) : 0;
            return { x: i, y: delta, label: p.label, hardwareLabel: hw, count: p.count, baseLabel: baselineLabel, origY: p.y, baseY: baselineScore };
        });
        if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
        renderDivergingBarChart(chartId, { points, hwLabels: [hw], baselineLabel }, chartVizState[type].normalize);
        return;
    }

    const sel = modelSelection[type];
    if (!sel || sel.length < 2) return;
    const filtered = { points: data.points.filter(p => sel.includes(p.hardwareLabel)), hwLabels: data.hwLabels.filter(h => sel.includes(h)) };
    if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
    renderDivergingBarChart(chartId, computeDeltaData(filtered, baselineState[type], chartVizState[type].normalize), chartVizState[type].normalize);
}

function setupModelSelectorListeners() {
    document.getElementById('model-select-confirm')?.addEventListener('click', () => {
        const type = modelSelectorActiveType;
        if (!type) return;
        const checked = document.querySelectorAll('#model-select-list input:checked');
        modelSelection[type] = Array.from(checked).map(cb => cb.value);
        document.getElementById('model-select-modal').close();
        document.body.classList.remove('modal-open');
        if (modelSelection[type].length < 2) return;
        const isAverage = type === 'cpuAverage' || type === 'gpuAverage';
        if (isAverage) {
            renderAverageChart(type);
        } else {
            renderSoftwareDeltaChart(type);
        }
    });
    document.getElementById('model-select-cancel')?.addEventListener('click', () => {
        const type = modelSelectorActiveType;
        document.getElementById('model-select-modal').close();
        document.body.classList.remove('modal-open');
        if (type) {
            chartVizState[type].mode = 'absolute';
            const modeGroup = document.getElementById(VIZ_CHART_IDS[type].mode);
            if (modeGroup) {
                modeGroup.querySelectorAll('.chart-mode-btn').forEach(b => b.classList.remove('active'));
                const absBtn = modeGroup.querySelector('[data-value="absolute"]');
                if (absBtn) absBtn.classList.add('active');
            }
            const isAverage = type === 'cpuAverage' || type === 'gpuAverage';
            if (isAverage) {
                renderAverageChart(type);
            } else {
                renderSoftwareDeltaChart(type);
            }
        }
    });
    document.getElementById('close-model-select')?.addEventListener('click', () => {
        document.getElementById('model-select-cancel')?.click();
    });
}

function setupChartVizControls() {
    ['mesa', 'nvidia', 'kernel', 'os', 'cpuAverage', 'gpuAverage'].forEach(type => {
        const modeGroup = document.getElementById(VIZ_CHART_IDS[type].mode);
        const toggle = document.getElementById(VIZ_CHART_IDS[type].toggle);
        const chartId = BASELINE_CHART_MAP[type];

        const isAverageChart = type === 'cpuAverage' || type === 'gpuAverage';

        if (modeGroup) {
            modeGroup.querySelectorAll('.chart-mode-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    modeGroup.querySelectorAll('.chart-mode-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    chartVizState[type].mode = btn.dataset.value;
                    const vizRow = document.querySelector(`#${VIZ_CHART_IDS[type].mode}`).closest('.chart-viz-row');
        const hwRow = vizRow?.querySelector('#os-hw-row, #kernel-hw-row, #mesa-hw-row, #nvidia-hw-row');
                    const blRow = vizRow?.querySelector('[id$="-baseline"]')?.closest('.baseline-row');
                    const toggleLabel = document.getElementById(VIZ_CHART_IDS[type].toggle);
                    const isDelta = btn.dataset.value === 'delta';
                    if (hwRow) hwRow.style.display = isDelta ? '' : 'none';
                    if (blRow) blRow.style.display = isDelta ? '' : 'none';
                    if (toggleLabel) toggleLabel.style.display = isDelta ? 'none' : '';
                    if (isAverageChart) {
                        renderAverageChart(type);
                    } else if ((type === 'mesa' || type === 'nvidia' || type === 'os' || type === 'kernel') && btn.dataset.value === 'delta') {
                        if (!modelSelection[type]) {
                            if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
                        } else {
                            renderSoftwareDeltaChart(type);
                        }
                    } else {
                        if (btn.dataset.value === 'delta') {
                            if (!modelSelection[type] || modelSelection[type].length === 0) {
                                if (!openModelSelector(type)) {
                                    chartVizState[type].mode = 'absolute';
                                    btn.classList.remove('active');
                                    modeGroup.querySelector('[data-value="absolute"]')?.classList.add('active');
                                    const baselineRow = modeGroup.closest('.chart-viz-row')?.querySelector('.baseline-row');
                                    const toggleLabel = document.getElementById(VIZ_CHART_IDS[type].toggle);
                                    if (baselineRow) baselineRow.style.display = 'none';
                                    if (toggleLabel) toggleLabel.style.display = '';
                                    const data = lastSoftwareData[type];
                                    if (data && document.getElementById(chartId)) {
                                        if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
                                        chartPageState[type] = 0;
                                        renderHardwareComparisonBars(chartId, data);
                                    }
                                }
                            } else {
                                renderSoftwareDeltaChart(type);
                            }
                        } else {
                            chartVizState[type].normalize = true;
                            const cb = document.getElementById(VIZ_CHART_IDS[type].toggle)?.querySelector('.chart-toggle-cb');
                            if (cb) cb.checked = true;
                            const data = lastSoftwareData[type];
                            if (!data || !document.getElementById(chartId)) return;
                            if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
                            chartPageState[type] = 0;
                            if (chartVizState[type].normalize) {
                                renderHardwareComparisonBars(chartId, computeNormalizedData(data));
                            } else {
                                renderHardwareComparisonBars(chartId, data);
                            }
                        }
                    }
                });
            });
        }

        if (toggle) {
            const cb = toggle.querySelector('.chart-toggle-cb');
            if (cb) {
                cb.checked = chartVizState[type].normalize;
                cb.addEventListener('change', () => {
                    chartVizState[type].normalize = cb.checked;
                    if (isAverageChart) {
                        renderAverageChart(type);
                    } else {
                        const vs = chartVizState[type];
                        if (vs.mode === 'delta') {
                            if (!modelSelection[type] || modelSelection[type].length === 0) {
                                if (!openModelSelector(type)) {
                                    const data = lastSoftwareData[type];
                                    if (data && document.getElementById(chartId)) {
                                        if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
                                        chartPageState[type] = 0;
                                        renderHardwareComparisonBars(chartId, data);
                                    }
                                }
                            } else {
                                renderSoftwareDeltaChart(type);
                            }
                        } else {
                            const data = lastSoftwareData[type];
                            if (!data || !document.getElementById(chartId)) return;
                            if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
                            chartPageState[type] = 0;
                            if (vs.normalize) {
                                renderHardwareComparisonBars(chartId, computeNormalizedData(data));
                            } else {
                                renderHardwareComparisonBars(chartId, data);
                            }
                        }
                    }
                });
            }
        }
    });
    ['mesa', 'nvidia', 'kernel', 'os'].forEach(type => {
        const modeEl = document.getElementById(VIZ_CHART_IDS[type].mode);
        if (!modeEl) return;
        const vizRow = modeEl.closest('.chart-viz-row');
        const hwRow = vizRow?.querySelector('[id$="-hw-row"]');
        const blRow = vizRow?.querySelector('[id$="-baseline"]')?.closest('.baseline-row');
        const toggleLabel = document.getElementById(VIZ_CHART_IDS[type].toggle);
        const isDefaultDelta = chartVizState[type].mode === 'delta';
        if (hwRow) hwRow.style.display = isDefaultDelta ? '' : 'none';
        if (blRow) blRow.style.display = isDefaultDelta ? '' : 'none';
        if (toggleLabel) toggleLabel.style.display = isDefaultDelta ? 'none' : '';
    });
}

// Setup Events (search, filter, sort, sync)
function setupEventListeners() {
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) refreshBtn.addEventListener('click', fetchData);
    document.getElementById('search-input').addEventListener('input', handleFilterChange);
    document.getElementById('os-filter').addEventListener('change', handleFilterChange);
    document.getElementById('cpu-filter').addEventListener('change', handleFilterChange);
    document.getElementById('gpu-filter').addEventListener('change', handleFilterChange);
    document.getElementById('ram-filter').addEventListener('change', handleFilterChange);
    document.getElementById('vram-filter').addEventListener('change', handleFilterChange);
    document.getElementById('kernel-filter').addEventListener('change', handleFilterChange);
    
    // Sort columns
    const headers = document.querySelectorAll('#leaderboard-table th.sortable');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            handleSort(column);
        });
    });

    // Leaderboard Modal Toggle listeners
    const modal = document.getElementById('leaderboard-modal');
    const openBtn = document.getElementById('leaderboard-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.showModal();
            document.body.classList.add('modal-open');
        });
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    }
    if (modal) {
        modal.addEventListener('close', () => {
            document.body.classList.remove('modal-open');
            // Collapse filters on close so they reset on next open
            if (filtersWrapper) {
                filtersWrapper.classList.remove('filters-expanded');
                if (toggleFiltersBtn) {
                    toggleFiltersBtn.classList.remove('btn-primary');
                    toggleFiltersBtn.classList.add('btn-secondary');
                }
            }
        });
    }
    
    // Toggle filters button on mobile
    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const filtersWrapper = document.querySelector('.leaderboard-filters');
    if (toggleFiltersBtn && filtersWrapper) {
        toggleFiltersBtn.addEventListener('click', () => {
            filtersWrapper.classList.toggle('filters-expanded');
            const isExpanded = filtersWrapper.classList.contains('filters-expanded');
            toggleFiltersBtn.classList.toggle('btn-primary', isExpanded);
            toggleFiltersBtn.classList.toggle('btn-secondary', !isExpanded);
        });
    }
    
    // Fallback for browsers without closedby support
    if (modal && !('closedBy' in HTMLDialogElement.prototype)) {
        modal.addEventListener('click', (event) => {
            if (event.target !== modal) return;
            const rect = modal.getBoundingClientRect();
            const isDialogContent = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );
            if (!isDialogContent) {
                modal.close();
            }
        });
    }

    document.addEventListener('change', (e) => {
        const cb = e.target.closest('.chart-toggle-cb');
        if (!cb) return;
        const wrap = cb.closest('.chart-toggle-wrap');
        if (!wrap || !wrap.dataset.chart) return;
        chartNorm[wrap.dataset.chart] = cb.checked;
        renderCharts();
        PILL_STATE.rendered.performance = true;
    });
}

// Fetch Google Sheets Data using JSONP to bypass CORS restrictions
function fetchGoogleSheetDataJSONP() {
    return new Promise((resolve, reject) => {
        const callbackName = "gvizCallback_" + Math.round(Math.random() * 1000000);
        // Extracts the spreadsheet ID from SPREADSHEET_URL or uses the hardcoded ID
        const spreadsheetId = "1nlMgeW0ZFmtwwT3hty8JAFT3sM0SNhMpc24mH3In9zI";
        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=responseHandler:${callbackName}`;
        
        const script = document.createElement('script');
        script.src = url;
        script.id = callbackName;
        
        // Timeout handling (10 seconds)
        const timeoutId = setTimeout(() => {
            cleanup();
            reject(new Error("Timeout loading Google Sheets data"));
        }, 10000);
        
        function cleanup() {
            clearTimeout(timeoutId);
            const el = document.getElementById(callbackName);
            if (el) el.remove();
            delete window[callbackName];
        }
        
        window[callbackName] = function(data) {
            cleanup();
            resolve(data);
        };
        
        script.onerror = function(err) {
            cleanup();
            reject(err);
        };
        
        document.head.appendChild(script);
    });
}

// Process data from Google Sheets Visualization API JSON response
function processGvizData(jsonResponse) {
    if (!jsonResponse || !jsonResponse.table || !jsonResponse.table.rows) {
        throw new Error("Invalid format from Google Sheets API");
    }
    
    const rows = jsonResponse.table.rows;
    benchmarkData = rows.map(row => {
        if (!row || !row.c || row.c.length < 5) return null;
        
        const getVal = (idx) => {
            const cell = row.c[idx];
            return cell ? cell.v : null;
        };
        
        const getFormattedVal = (idx) => {
            const cell = row.c[idx];
            if (!cell) return null;
            return cell.f !== undefined ? cell.f : cell.v;
        };
        
        const mainScore = cleanNumber(getVal(8));
        const cpuSingle = cleanNumber(getVal(9));
        const cpuMulti = cleanNumber(getVal(10));
        const gpuScore = cleanNumber(getVal(11));
        
        if (mainScore === null && cpuSingle === null && cpuMulti === null && gpuScore === null) {
            return null;
        }
        
        let cpuVal = getVal(1) || 'Unknown CPU';
        cpuVal = cpuVal.replace(/\s+(w\/|with) Radeon.*/i, '').trim();
        if (cpuVal.trim() === 'Custom APU 0405') {
            cpuVal = 'Steam Deck';
        } else if (cpuVal.trim() === 'Custom APU 0932') {
            cpuVal = 'Steam Deck OLED';
        }
        
        let gpuVal = getVal(3) || 'Unknown GPU';
        if (gpuVal.trim() === 'Graphics') {
            gpuVal = 'Radeon Graphics';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0405') {
            gpuVal = 'Steam Deck';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0932') {
            gpuVal = 'Steam Deck OLED';
        } else if (/intel.*?\barc.*?\b([ab]\d{3})\b/i.test(gpuVal)) {
            const modelMatch = gpuVal.match(/\b([ab]\d{3})\b/i);
            gpuVal = `Arc ${modelMatch[1].toUpperCase()}`;
        }
        
        if (gpuVal.trim() === 'Radeon RX Vega' || gpuVal.trim() === 'Vega 8 Graphics') {
            gpuVal = 'AMD Vega';
        } else if (gpuVal.trim() === 'RX 580') {
            gpuVal = 'RX 580 Series';
        }
        
        return {
            user: getVal(0) || 'Anonymous',
            cpu: cpuVal,
            ram: getVal(2) || 'N/D',
            gpu: gpuVal,
            vram: getVal(4) || 'N/D',
            driver: getVal(5) || 'N/D',
            kernel: getVal(6) || 'N/D',
            os: getVal(7) || 'Linux',
            mainScore: mainScore,
            cpuSingle: cpuSingle,
            cpuMulti: cpuMulti,
            gpuScore: gpuScore,
            dateTime: normalizeDate(getFormattedVal(12)),
            clientId: getVal(13) || 'N/D',
            architecture: getVal(14) || 'N/D',
            packageType: getVal(15) || 'N/D',
            productName: getVal(17) || 'N/D',
            displayServer: getVal(18) || 'N/D',
            desktop: getVal(19) || 'N/D',
            storageType: getVal(20) || 'N/D',
            gpuMaxTemp: cleanNumber(getVal(24)),
            gpuTempDelta: cleanNumber(getVal(25)),
            cpuMaxFreq: cleanNumber(getVal(27)),
            gpuMaxFreq: cleanNumber(getVal(28))
        };
    }).filter(row => row !== null);
    
    if (benchmarkData.length === 0) {
        throw new Error("No benchmark records found in Google Sheets");
    }
    
    populateFilters();
    filteredData = [...benchmarkData];
    sortData(currentSort.column, currentSort.direction);
    renderOverviewStats();
    renderCharts();
    PILL_STATE.rendered.performance = true;
    renderTable();
}

// Fetch Google Sheet Data
async function fetchData() {
    showLoading();
    setSyncStatus('syncing', 'Syncing...');
    
    try {
        const data = await fetchGoogleSheetDataJSONP();
        processGvizData(data);
        setSyncStatus('success', 'Synced (Real-time)');
    } catch (e) {
        console.error("Direct JSONP fetch failed, using fallback static data...", e);
        processCSVData(FALLBACK_CSV);
        setSyncStatus('warning', 'Using Fallback Data');
    }
}

// Helper to update sync/refresh button visual state
function setSyncStatus(type, message) {
    const btn = document.getElementById('refresh-btn');
    if (!btn) return;
    const oldIcon = btn.querySelector('i, svg');
    const text = btn.querySelector('span');
    
    // Recreate a clean <i> tag for Lucide (since Lucide replaces it with an <svg> tag)
    const icon = document.createElement('i');
    if (oldIcon) {
        btn.replaceChild(icon, oldIcon);
    } else {
        btn.insertBefore(icon, text);
    }
    
    // Reset classes
    btn.className = 'btn';
    btn.removeAttribute('style'); // reset warning border if set
    
    if (type === 'syncing') {
        btn.classList.add('btn-secondary');
        icon.setAttribute('data-lucide', 'refresh-cw');
        icon.classList.add('spin');
        text.textContent = message;
    } else if (type === 'success') {
        btn.classList.add('btn-primary');
        icon.setAttribute('data-lucide', 'check');
        text.textContent = message;
        setTimeout(() => {
            text.textContent = 'Sync Data';
            // Restore refresh icon on timeout
            const finalIcon = document.createElement('i');
            finalIcon.setAttribute('data-lucide', 'refresh-cw');
            const currentIcon = btn.querySelector('i, svg');
            if (currentIcon) {
                btn.replaceChild(finalIcon, currentIcon);
            }
            lucide.createIcons();
        }, 3000);
    } else {
        btn.classList.add('btn-secondary');
        btn.style.border = '1px solid var(--warning)';
        icon.setAttribute('data-lucide', 'alert-circle');
        text.textContent = message;
    }
    
    lucide.createIcons();
}

// Show loader in table using animated skeletons
function showLoading() {
    const tbody = document.getElementById('leaderboard-body');
    let skeletonHtml = '';
    
    for (let i = 0; i < 5; i++) {
        skeletonHtml += `
            <tr class="table-skeleton-row">
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell"></div></td>
                <td><div class="table-skeleton-cell"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell medium"></div></td>
                <td><div class="table-skeleton-cell medium"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell short"></div></td>
                <td><div class="table-skeleton-cell"></div></td>
            </tr>
        `;
    }
    tbody.innerHTML = skeletonHtml;
}

// Safe numeric cleaner
function cleanNumber(val) {
    if (val === null || val === undefined) return null;
    if (typeof val === 'number') return val;
    const cleanStr = String(val).replace(/"/g, '').replace(/,/g, '').trim();
    if (cleanStr === 'N/D' || cleanStr === 'N/A' || cleanStr === '') return null;
    const num = Number(cleanStr);
    return isNaN(num) ? null : num;
}


// Process CSV content
function processCSVData(csvText) {
    const parsed = parseCSV(csvText);
    if (parsed.length <= 1) {
        showError('No records found in CSV file.');
        return;
    }
    
    // Map headers to column index
    // Expected headers: Origem / Usuário,CPU,RAM,GPU,VRAM,Driver,Kernel,Operating System,Main Score,CPU Single,CPU Multi,GPU Score,Date/Time
    const headers = parsed[0].map(h => h.toLowerCase().trim());
    
    const dataRows = parsed.slice(1);
    benchmarkData = dataRows.map(row => {
        if (row.length < 5) return null; // skip malformed lines
        
        let cpuVal = row[1] || 'Unknown CPU';
        cpuVal = cpuVal.replace(/\s+(w\/|with) Radeon.*/i, '').trim();
        if (cpuVal.trim() === 'Custom APU 0405') {
            cpuVal = 'Steam Deck';
        } else if (cpuVal.trim() === 'Custom APU 0932') {
            cpuVal = 'Steam Deck OLED';
        }
        
        let gpuVal = row[3] || 'Unknown GPU';
        if (gpuVal.trim() === 'Graphics') {
            gpuVal = 'Radeon Graphics';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0405') {
            gpuVal = 'Steam Deck';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0932') {
            gpuVal = 'Steam Deck OLED';
        } else if (/intel.*?\barc.*?\b([ab]\d{3})\b/i.test(gpuVal)) {
            const modelMatch = gpuVal.match(/\b([ab]\d{3})\b/i);
            gpuVal = `Arc ${modelMatch[1].toUpperCase()}`;
        }
        
        if (gpuVal.trim() === 'Radeon RX Vega' || gpuVal.trim() === 'Vega 8 Graphics') {
            gpuVal = 'AMD Vega';
        } else if (gpuVal.trim() === 'RX 580') {
            gpuVal = 'RX 580 Series';
        }
        
        return {
            user: row[0] || 'Anonymous',
            cpu: cpuVal,
            ram: row[2] || 'N/D',
            gpu: gpuVal,
            vram: row[4] || 'N/D',
            driver: row[5] || 'N/D',
            kernel: row[6] || 'N/D',
            os: row[7] || 'Linux',
            mainScore: cleanNumber(row[8]),
            cpuSingle: cleanNumber(row[9]),
            cpuMulti: cleanNumber(row[10]),
            gpuScore: cleanNumber(row[11]),
            dateTime: normalizeDate(row[12]),
            clientId: row[13] || 'N/D',
            architecture: row[14] || 'N/D',
            packageType: row[15] || 'N/D',
            productName: row[17] || 'N/D',
            displayServer: row[18] || 'N/D',
            desktop: row[19] || 'N/D',
            storageType: row[20] || 'N/D',
            gpuMaxTemp: cleanNumber(row[24]),
            gpuTempDelta: cleanNumber(row[25]),
            cpuMaxFreq: cleanNumber(row[27]),
            gpuMaxFreq: cleanNumber(row[28])
        };
    }).filter(row => row !== null && (row.mainScore !== null || row.cpuSingle !== null || row.cpuMulti !== null || row.gpuScore !== null));
    
    // Set up unique Dropdown Filter options
    populateFilters();
    
    // Initial Filter & Sort (Sort by Main Score descending)
    filteredData = [...benchmarkData];
    sortData(currentSort.column, currentSort.direction);
    
    // Render Dashboard
    renderOverviewStats();
    renderCharts();
    PILL_STATE.rendered.performance = true;
    renderTable();
}

// Parses standard CSV string correctly handling encapsulated quotes with commas
function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const cells = [];
        let inQuotes = false;
        let currentCell = '';
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                cells.push(currentCell.trim());
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
        cells.push(currentCell.trim());
        result.push(cells);
    }
    return result;
}

// Numeric parser for RAM/VRAM capacity strings to support numeric sorting
function parseGB(sizeStr) {
    if (!sizeStr) return 0;
    const cleanStr = sizeStr.toString().trim().toUpperCase();
    if (cleanStr === 'N/D' || cleanStr === '') return 0;
    
    // Extract the numeric part and the unit
    const numMatch = cleanStr.match(/^([0-9]+(?:\.[0-9]+)?)\s*([A-Z]*)/);
    if (!numMatch) return 0;
    
    const value = parseFloat(numMatch[1]);
    const unit = numMatch[2];
    
    if (unit.startsWith('M')) {
        // Megabytes to Gigabytes
        return value / 1024;
    } else if (unit.startsWith('T')) {
        // Terabytes to Gigabytes
        return value * 1024;
    } else {
        // Defaults to GB (Gigabytes)
        return value;
    }
}

// Populate Dropdown Filters (OS, CPU, GPU, RAM, VRAM)
function populateFilters() {
    const osFilter = document.getElementById('os-filter');
    const cpuFilter = document.getElementById('cpu-filter');
    const gpuFilter = document.getElementById('gpu-filter');
    const ramFilter = document.getElementById('ram-filter');
    const vramFilter = document.getElementById('vram-filter');
    const kernelFilter = document.getElementById('kernel-filter');
    
    // Save current selected values
    const osSelected = osFilter.value;
    const cpuSelected = cpuFilter.value;
    const gpuSelected = gpuFilter.value;
    const ramSelected = ramFilter.value;
    const vramSelected = vramFilter.value;
    const kernelSelected = kernelFilter.value;
    
    const osList = new Set();
    const cpuList = new Set();
    const gpuList = new Set();
    const ramList = new Set();
    const vramList = new Set();
    const kernelList = new Set();
    
    benchmarkData.forEach(row => {
        if (row.os && row.os.trim() !== '' && row.os !== 'N/D') {
            osList.add(row.os.trim());
        }
        if (row.cpu && row.cpu.trim() !== '' && row.cpu !== 'N/D') {
            cpuList.add(row.cpu.trim());
        }
        if (row.gpu && row.gpu.trim() !== '' && row.gpu !== 'N/D') {
            gpuList.add(row.gpu.trim());
        }
        if (row.ram && row.ram.trim() !== '' && row.ram !== 'N/D') {
            ramList.add(row.ram.trim());
        }
        if (row.vram && row.vram.trim() !== '' && row.vram !== 'N/D') {
            vramList.add(row.vram.trim());
        }
        if (row.kernel && row.kernel.trim() !== '' && row.kernel !== 'N/D') {
            const match = row.kernel.trim().match(/^(\d+\.\d+)/);
            if (match) kernelList.add(match[1]);
        }
    });
    
    // 1. Populate OS
    osFilter.innerHTML = '<option value="">ALL OS</option>';
    Array.from(osList).sort().forEach(os => {
        const option = document.createElement('option');
        option.value = os;
        option.textContent = os;
        osFilter.appendChild(option);
    });
    if (osList.has(osSelected)) {
        osFilter.value = osSelected;
    }
    
    // 2. Populate CPU
    cpuFilter.innerHTML = '<option value="">All CPU Models</option>';
    Array.from(cpuList).sort().forEach(cpu => {
        const option = document.createElement('option');
        option.value = cpu;
        option.textContent = cpu;
        cpuFilter.appendChild(option);
    });
    if (cpuList.has(cpuSelected)) {
        cpuFilter.value = cpuSelected;
    }
    
    // 3. Populate GPU
    gpuFilter.innerHTML = '<option value="">All GPU Models</option>';
    Array.from(gpuList).sort().forEach(gpu => {
        const option = document.createElement('option');
        option.value = gpu;
        option.textContent = gpu;
        gpuFilter.appendChild(option);
    });
    if (gpuList.has(gpuSelected)) {
        gpuFilter.value = gpuSelected;
    }
    
    // 4. Populate RAM (Numeric Sort)
    ramFilter.innerHTML = '<option value="">ALL RAM</option>';
    Array.from(ramList).sort((a, b) => parseGB(a) - parseGB(b)).forEach(ram => {
        const option = document.createElement('option');
        option.value = ram;
        option.textContent = ram;
        ramFilter.appendChild(option);
    });
    if (ramList.has(ramSelected)) {
        ramFilter.value = ramSelected;
    }
    
    // 5. Populate VRAM (Numeric Sort)
    vramFilter.innerHTML = '<option value="">ALL VRAM</option>';
    Array.from(vramList).sort((a, b) => parseGB(a) - parseGB(b)).forEach(vram => {
        const option = document.createElement('option');
        option.value = vram;
        option.textContent = vram;
        vramFilter.appendChild(option);
    });
    if (vramList.has(vramSelected)) {
        vramFilter.value = vramSelected;
    }
    
    // 6. Populate Kernel (numeric sort)
    kernelFilter.innerHTML = '<option value="">ALL Kernel</option>';
    Array.from(kernelList).sort((a, b) => {
        const [aMaj, aMin] = a.split('.').map(Number);
        const [bMaj, bMin] = b.split('.').map(Number);
        return bMaj - aMaj || bMin - aMin;
    }).forEach(kv => {
        const option = document.createElement('option');
        option.value = kv;
        option.textContent = `Linux ${kv}`;
        kernelFilter.appendChild(option);
    });
    if (kernelList.has(kernelSelected)) {
        kernelFilter.value = kernelSelected;
    }
    
    // Initialize filters from URL query parameters
    initUrlFilters();
}

// Update URL query parameters based on active filters
function updateUrlFilters() {
    const searchVal = document.getElementById('search-input').value.trim();
    const osVal = document.getElementById('os-filter').value;
    const cpuVal = document.getElementById('cpu-filter').value;
    const gpuVal = document.getElementById('gpu-filter').value;
    const ramVal = document.getElementById('ram-filter').value;
    const vramVal = document.getElementById('vram-filter').value;
    const kernelVal = document.getElementById('kernel-filter').value;

    const params = new URLSearchParams();
    if (searchVal) params.set('search', searchVal);
    if (osVal) params.set('os', osVal);
    if (cpuVal) params.set('cpu', cpuVal);
    if (gpuVal) params.set('gpu', gpuVal);
    if (ramVal) params.set('ram', ramVal);
    if (vramVal) params.set('vram', vramVal);
    if (kernelVal) params.set('kernel', kernelVal);

    const newQueryString = params.toString();
    const newUrl = window.location.pathname + (newQueryString ? '?' + newQueryString : '');
    window.history.replaceState(null, '', newUrl);
}

// Parse URL query parameters to pre-populate filters
let urlFiltersInitialized = false;
function initUrlFilters() {
    if (urlFiltersInitialized) return;
    const params = new URLSearchParams(window.location.search);
    
    const searchVal = params.get('search');
    const osVal = params.get('os');
    const cpuVal = params.get('cpu');
    const gpuVal = params.get('gpu');
    const ramVal = params.get('ram');
    const vramVal = params.get('vram');
    const kernelVal = params.get('kernel');

    let applied = false;
    if (searchVal) {
        document.getElementById('search-input').value = searchVal;
        applied = true;
    }
    
    const osFilter = document.getElementById('os-filter');
    if (osVal && [...osFilter.options].some(opt => opt.value === osVal)) {
        osFilter.value = osVal;
        applied = true;
    }
    const cpuFilter = document.getElementById('cpu-filter');
    if (cpuVal && [...cpuFilter.options].some(opt => opt.value === cpuVal)) {
        cpuFilter.value = cpuVal;
        applied = true;
    }
    const gpuFilter = document.getElementById('gpu-filter');
    if (gpuVal && [...gpuFilter.options].some(opt => opt.value === gpuVal)) {
        gpuFilter.value = gpuVal;
        applied = true;
    }
    const ramFilter = document.getElementById('ram-filter');
    if (ramVal && [...ramFilter.options].some(opt => opt.value === ramVal)) {
        ramFilter.value = ramVal;
        applied = true;
    }
    const vramFilter = document.getElementById('vram-filter');
    if (vramVal && [...vramFilter.options].some(opt => opt.value === vramVal)) {
        vramFilter.value = vramVal;
        applied = true;
    }
    const kernelFilter = document.getElementById('kernel-filter');
    if (kernelVal && [...kernelFilter.options].some(opt => opt.value === kernelVal)) {
        kernelFilter.value = kernelVal;
        applied = true;
    }

    urlFiltersInitialized = true;

    if (applied) {
        handleFilterChange(false);
    }
}

// Handle Filters
function handleFilterChange(updateUrl = true) {
    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    const osSelection = document.getElementById('os-filter').value;
    const cpuSelection = document.getElementById('cpu-filter').value;
    const gpuSelection = document.getElementById('gpu-filter').value;
    const ramSelection = document.getElementById('ram-filter').value;
    const vramSelection = document.getElementById('vram-filter').value;
    const kernelSelection = document.getElementById('kernel-filter').value;
    
    filteredData = benchmarkData.filter(row => {
        // Search filter
        const matchesSearch = !searchQuery || 
            row.cpu.toLowerCase().includes(searchQuery) ||
            row.gpu.toLowerCase().includes(searchQuery) ||
            row.os.toLowerCase().includes(searchQuery) ||
            row.kernel.toLowerCase().includes(searchQuery) ||
            row.user.toLowerCase().includes(searchQuery) ||
            (row.clientId && row.clientId.toLowerCase().includes(searchQuery));
            
        // Dropdown filters
        const matchesOs = !osSelection || row.os === osSelection;
        const matchesCpu = !cpuSelection || row.cpu === cpuSelection;
        const matchesGpu = !gpuSelection || row.gpu === gpuSelection;
        const matchesRam = !ramSelection || row.ram === ramSelection;
        const matchesVram = !vramSelection || row.vram === vramSelection;
        let matchesKernel = !kernelSelection;
        if (!matchesKernel && row.kernel && row.kernel !== 'N/D') {
            const match = row.kernel.match(/^(\d+\.\d+)/);
            if (match) matchesKernel = match[1] === kernelSelection;
        }
        
        return matchesSearch && matchesOs && matchesCpu && matchesGpu && matchesRam && matchesVram && matchesKernel;
    });


    // Keep current sort
    sortData(currentSort.column, currentSort.direction);
    
    // Re-render
    renderTable();

    // Sync with URL if needed
    if (updateUrl) {
        updateUrlFilters();
    }

    // Invalidate lazy-rendered pills so they re-render on next activation
    PILL_STATE.rendered.efficiency = false;
    PILL_STATE.rendered.thermals = false;
}

// Render Overview Statistics
function renderOverviewStats() {
    renderStats('performance');
}

const STATS_PILL_LABELS = {
    performance: ['Top CPU Single-Thread', 'Top CPU Multi-Thread', 'Top GPU Score', 'Most Humble'],
    efficiency: ['Most Efficient CPU', 'Most Efficient GPU', 'Major CPU Bottleneck', 'Avg Thermal Eff.'],
    thermals: ['Hottest GPU', 'Coolest GPU', 'Widest thermal delta', 'Shortest thermal delta']
};

const STATS_ICONS = { cpu: 'cpu', binary: 'binary', zap: 'zap', sprout: 'sprout' };

const STAT_TOOLTIPS = {
    performance: [
        'Winner is the CPU model with the highest single-core benchmark score. Each CPU model is represented by its best single submission — no averaging across multiple runs of the same hardware.',
        'Winner is the CPU model with the highest multi-core benchmark score. Each CPU model is represented by its best single submission — no averaging across multiple runs of the same hardware.',
        'Winner is the GPU model with the highest GPU benchmark score. Each GPU model is represented by its best single submission — no averaging across multiple runs of the same hardware.',
        'Winner is the submission with the lowest main score among all benchmarks. Highlights the most modest hardware in the database.'
    ],
    efficiency: [
        'Winner is the hardware+user combo with the highest CPU single-core score per MHz of clock frequency. Formula: cpuSingle ÷ cpuMaxFreq. Higher ratios indicate more work done per clock cycle — a sign of strong architectural efficiency.',
        'Winner is the hardware+user combo with the highest GPU score per MHz of clock frequency. Formula: gpuScore ÷ gpuMaxFreq. Higher ratios mean the GPU achieves more performance per megahertz.',
        'Lowest CPU Multi ÷ GPU Score. Highlights the most CPU-limited combos — the GPU far outruns the CPU.',
        'Average thermal efficiency across all benchmark runs. Formula: mainScore ÷ gpuTempDelta. Higher values mean more performance per degree of GPU temperature increase.'
    ],
    thermals: [
        'Winner is the GPU model with the highest average peak temperature (gpuMaxTemp). Only GPUs with 2+ samples are considered to prevent single-run outliers from skewing the ranking.',
        'Winner is the GPU model with the lowest average peak temperature (gpuMaxTemp). Only GPUs with 2+ samples are considered. Lower temps indicate better thermal management.',
        'Winner is the GPU model with the widest average temperature delta between idle and load (gpuTempDelta). Only GPUs with 2+ samples are considered.',
        'Winner is the GPU model with the shortest average temperature delta between idle and load (gpuTempDelta). Only GPUs with 2+ samples are considered. Smaller deltas indicate more efficient cooling.'
    ]
};

function renderStats(pill) {
    const pills = ['performance', 'efficiency', 'thermals'];
    const idx = pills.indexOf(pill);
    if (idx === -1) return;

    if (pill === 'performance') {
        document.getElementById('stat-label-1').textContent = STATS_PILL_LABELS.performance[0];
        document.getElementById('stat-label-2').textContent = STATS_PILL_LABELS.performance[1];
        document.getElementById('stat-label-3').textContent = STATS_PILL_LABELS.performance[2];
        document.getElementById('stat-label-4').textContent = STATS_PILL_LABELS.performance[3];
        ['stat-top-cpu-single','stat-top-cpu-multi','stat-top-gpu','stat-most-humble-score']
            .forEach(id => { const el = document.getElementById(id); if (el) delete el.dataset.counterTarget; });
        renderOverviewStatsImpl();
        const perfTips = document.querySelectorAll('#stats-grid .stat-card .winner-info-tooltip');
        STAT_TOOLTIPS.performance.forEach((t, i) => { if (perfTips[i]) perfTips[i].textContent = t; });
        return;
    }

    document.getElementById('stat-label-1').textContent = STATS_PILL_LABELS[pill][0];
    document.getElementById('stat-label-2').textContent = STATS_PILL_LABELS[pill][1];
    document.getElementById('stat-label-3').textContent = STATS_PILL_LABELS[pill][2];
    document.getElementById('stat-label-4').textContent = STATS_PILL_LABELS[pill][3];

    if (pill === 'efficiency') {
        const effData = filteredData.length ? filteredData : benchmarkData;
        const cpuEff = computeCpuEfficiency(effData);
        const gpuEff = computeGpuEfficiency(effData);
        document.getElementById('stat-top-cpu-single').textContent = cpuEff.length > 0 ? (Math.trunc(cpuEff[0].ratio * 100) / 100).toFixed(2) : '-';
        document.getElementById('stat-top-cpu-single-sub').textContent = cpuEff.length > 0 ? cpuEff[0].name : '-';
        document.getElementById('stat-cpu-single-second').textContent = cpuEff[1] ? `2º ${cpuEff[1].name} — ${(Math.trunc(cpuEff[1].ratio * 100) / 100).toFixed(2)}` : '2º -';
        document.getElementById('stat-cpu-single-third').textContent = cpuEff[2] ? `3º ${cpuEff[2].name} — ${(Math.trunc(cpuEff[2].ratio * 100) / 100).toFixed(2)}` : '3º -';

        document.getElementById('stat-top-cpu-multi').textContent = gpuEff.length > 0 ? (Math.trunc(gpuEff[0].ratio * 100) / 100).toFixed(2) : '-';
        document.getElementById('stat-top-cpu-multi-sub').textContent = gpuEff.length > 0 ? gpuEff[0].name : '-';
        document.getElementById('stat-cpu-multi-second').textContent = gpuEff[1] ? `2º ${gpuEff[1].name} — ${(Math.trunc(gpuEff[1].ratio * 100) / 100).toFixed(2)}` : '2º -';
        document.getElementById('stat-cpu-multi-third').textContent = gpuEff[2] ? `3º ${gpuEff[2].name} — ${(Math.trunc(gpuEff[2].ratio * 100) / 100).toFixed(2)}` : '3º -';

        const bneck = effData
            .filter(r => r.cpuMulti !== null && r.gpuScore !== null && r.gpuScore > 0 && r.cpuMulti > 0)
            .map(r => ({ ratio: r.cpuMulti / r.gpuScore, user: getDisplayName(r), cpu: normalizeCPU(r.cpu), gpu: normalizeGPU(r.gpu) }))
            .filter(r => r.ratio >= 0.1 && r.ratio <= 10)
            .sort((a, b) => a.ratio - b.ratio);
        document.getElementById('stat-top-gpu').textContent = bneck.length > 0 ? bneck[0].ratio.toFixed(3) : '-';
        document.getElementById('stat-top-gpu-sub').textContent = bneck.length > 0 ? `${bneck[0].cpu} + ${bneck[0].gpu}` : '-';
        document.getElementById('stat-gpu-second').textContent = bneck[1] ? `2º ${bneck[1].cpu} + ${bneck[1].gpu} — ${bneck[1].ratio.toFixed(3)}` : '2º -';
        document.getElementById('stat-gpu-third').textContent = bneck[2] ? `3º ${bneck[2].cpu} + ${bneck[2].gpu} — ${bneck[2].ratio.toFixed(3)}` : '3º -';

        // Card 4: Avg Thermal Eff (placeholder)
        document.getElementById('stat-most-humble-score').textContent = '-';
        document.getElementById('stat-most-humble-hardware').textContent = 'Efficiency';
        document.getElementById('stat-humble-second').textContent = '2º -';
        document.getElementById('stat-humble-third').textContent = '3º -';
    } else if (pill === 'thermals') {
        const thermalData = filteredData.length ? filteredData : benchmarkData;

        // Hottest / Coolest GPU by peak temp (gpuMaxTemp)
        const hotRuns = getHottestGPU(thermalData, 999, 1);
        const hl = hotRuns.labels, hd = hotRuns.data;
        const hotLen = hl.length;

        // Card 1: Hottest GPU
        document.getElementById('stat-top-cpu-single').textContent = hotLen > 0 ? `${hd[0]}°C` : '-';
        document.getElementById('stat-top-cpu-single-sub').textContent = hotLen > 0 ? hl[0] : '-';
        document.getElementById('stat-cpu-single-second').textContent = hotLen > 1 ? `2º ${hl[1]} — ${hd[1]}°C` : '2º -';
        document.getElementById('stat-cpu-single-third').textContent = hotLen > 2 ? `3º ${hl[2]} — ${hd[2]}°C` : '3º -';

        // Card 2: Coolest GPU (reverse of hottest)
        document.getElementById('stat-top-cpu-multi').textContent = hotLen > 0 ? `${hd[hotLen - 1]}°C` : '-';
        document.getElementById('stat-top-cpu-multi-sub').textContent = hotLen > 0 ? hl[hotLen - 1] : '-';
        document.getElementById('stat-cpu-multi-second').textContent = hotLen > 1 ? `2º ${hl[hotLen - 2]} — ${hd[hotLen - 2]}°C` : '2º -';
        document.getElementById('stat-cpu-multi-third').textContent = hotLen > 2 ? `3º ${hl[hotLen - 3]} — ${hd[hotLen - 3]}°C` : '3º -';

        // Widest / Shortest thermal delta (gpuTempDelta)
        const deltaRuns = getBestCooling(thermalData, 999);
        const dl = deltaRuns.labels, dd = deltaRuns.data;
        const dLen = dl.length;

        // Card 3: Widest thermal delta (last entry = highest delta)
        document.getElementById('stat-top-gpu').textContent = dLen > 0 ? `${dd[dLen - 1]}°C` : '-';
        document.getElementById('stat-top-gpu-sub').textContent = dLen > 0 ? dl[dLen - 1] : '-';
        document.getElementById('stat-gpu-second').textContent = dLen > 1 ? `2º ${dl[dLen - 2]} — ${dd[dLen - 2]}°C` : '2º -';
        document.getElementById('stat-gpu-third').textContent = dLen > 2 ? `3º ${dl[dLen - 3]} — ${dd[dLen - 3]}°C` : '3º -';

        // Card 4: Shortest thermal delta (first entry = lowest delta)
        document.getElementById('stat-most-humble-score').textContent = dLen > 0 ? `${dd[0]}°C` : '-';
        document.getElementById('stat-most-humble-hardware').textContent = dLen > 0 ? dl[0] : '-';
        document.getElementById('stat-humble-second').textContent = dLen > 1 ? `2º ${dl[1]} — ${dd[1]}°C` : '2º -';
        document.getElementById('stat-humble-third').textContent = dLen > 2 ? `3º ${dl[2]} — ${dd[2]}°C` : '3º -';
    }

    // Update help tooltips
    const tips = document.querySelectorAll('#stats-grid .stat-card .winner-info-tooltip');
    STAT_TOOLTIPS[pill].forEach((t, i) => { if (tips[i]) tips[i].textContent = t; });
}

function renderOverviewStatsImpl() {
    
    function bestPerModel(data, scoreField, normalizeFn, unknownStr) {
        const best = {};
        data.filter(r => r[scoreField] !== null).forEach(r => {
            const key = normalizeFn(r);
            if (!key || key === unknownStr) return;
            if (!best[key] || r[scoreField] > best[key][scoreField]) best[key] = r;
        });
        return Object.values(best).sort((a, b) => b[scoreField] - a[scoreField]).slice(0, 3);
    }

    const singleTop = bestPerModel(benchmarkData, 'cpuSingle', r => normalizeCPU(r.cpu), 'Unknown CPU');
    if (singleTop[0]) {
        document.getElementById('stat-top-cpu-single').textContent = animateCounter('stat-top-cpu-single', singleTop[0].cpuSingle || 0);
        document.getElementById('stat-top-cpu-single-sub').textContent = trunc(normalizeCPU(singleTop[0].cpu));
        document.getElementById('stat-cpu-single-second').textContent = singleTop[1] ? `2º ${trunc(normalizeCPU(singleTop[1].cpu))} — ${singleTop[1].cpuSingle.toLocaleString()}` : '2º -';
        document.getElementById('stat-cpu-single-third').textContent = singleTop[2] ? `3º ${trunc(normalizeCPU(singleTop[2].cpu))} — ${singleTop[2].cpuSingle.toLocaleString()}` : '3º -';
    }

    const multiTop = bestPerModel(benchmarkData, 'cpuMulti', r => normalizeCPU(r.cpu), 'Unknown CPU');
    if (multiTop[0]) {
        document.getElementById('stat-top-cpu-multi').textContent = animateCounter('stat-top-cpu-multi', multiTop[0].cpuMulti || 0, true);
        document.getElementById('stat-top-cpu-multi-sub').textContent = trunc(normalizeCPU(multiTop[0].cpu));
        document.getElementById('stat-cpu-multi-second').textContent = multiTop[1] ? `2º ${trunc(normalizeCPU(multiTop[1].cpu))} — ${multiTop[1].cpuMulti.toLocaleString()}` : '2º -';
        document.getElementById('stat-cpu-multi-third').textContent = multiTop[2] ? `3º ${trunc(normalizeCPU(multiTop[2].cpu))} — ${multiTop[2].cpuMulti.toLocaleString()}` : '3º -';
    }

    const gpuTop = bestPerModel(benchmarkData, 'gpuScore', r => normalizeGPU(r.gpu), 'Unknown GPU');
    if (gpuTop[0]) {
        document.getElementById('stat-top-gpu').textContent = animateCounter('stat-top-gpu', gpuTop[0].gpuScore || 0, true);
        document.getElementById('stat-top-gpu-sub').textContent = trunc(normalizeGPU(gpuTop[0].gpu));
        document.getElementById('stat-gpu-second').textContent = gpuTop[1] ? `2º ${trunc(normalizeGPU(gpuTop[1].gpu))} — ${gpuTop[1].gpuScore.toLocaleString()}` : '2º -';
        document.getElementById('stat-gpu-third').textContent = gpuTop[2] ? `3º ${trunc(normalizeGPU(gpuTop[2].gpu))} — ${gpuTop[2].gpuScore.toLocaleString()}` : '3º -';
    }

    const humbles = [...benchmarkData]
        .filter(r => r.mainScore !== null && r.mainScore > 0)
        .sort((a, b) => a.mainScore - b.mainScore)
        .slice(0, 3);
    if (humbles[0]) {
        document.getElementById('stat-most-humble-score').textContent = animateCounter('stat-most-humble-score', humbles[0].mainScore);
        document.getElementById('stat-most-humble-hardware').textContent = trunc(normalizeCPU(humbles[0].cpu) + ' + ' + normalizeGPU(humbles[0].gpu));
        document.getElementById('stat-humble-second').textContent = humbles[1] ? `2º ${trunc(normalizeCPU(humbles[1].cpu) + ' + ' + normalizeGPU(humbles[1].gpu))} — ${humbles[1].mainScore.toLocaleString()}` : '2º -';
        document.getElementById('stat-humble-third').textContent = humbles[2] ? `3º ${trunc(normalizeCPU(humbles[2].cpu) + ' + ' + normalizeGPU(humbles[2].gpu))} — ${humbles[2].mainScore.toLocaleString()}` : '3º -';
    }
}

const TRUNC = 30;
function trunc(s) { return s && s.length > TRUNC ? s.substring(0, TRUNC - 3) + '...' : s || '-'; }
function handleSort(column) {
    let direction = 'asc';
    if (currentSort.column === column && currentSort.direction === 'asc') {
        direction = 'desc';
    }
    
    currentSort = { column, direction };
    
    // Update sorted headers CSS styles
    const headers = document.querySelectorAll('#leaderboard-table th');
    headers.forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc');
        // Clear old icon inside header (if not rank, etc.)
        const icon = header.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'chevrons-up-down');
        }
    });
    
    const activeHeader = document.querySelector(`#leaderboard-table th[data-sort="${column}"]`);
    if (activeHeader) {
        activeHeader.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
        const icon = activeHeader.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', direction === 'asc' ? 'chevron-up' : 'chevron-down');
        }
        lucide.createIcons();
    }
    
    sortData(column, direction);
    renderTable();
}

// Sort Logic Helper
function sortData(column, direction) {
    const isAsc = direction === 'asc';
    
    filteredData.sort((a, b) => {
        let valA, valB;
        
        switch (column) {
            case 'rank':
                // Rank is based on Main Score descending
                valA = a.mainScore || 0;
                valB = b.mainScore || 0;
                // Swap values to match direction (rank 1 = highest main score)
                return isAsc ? valB - valA : valA - valB;
            case 'clientId':
                valA = a.clientId.toLowerCase();
                valB = b.clientId.toLowerCase();
                break;
            case 'cpu':
                valA = a.cpu.toLowerCase();
                valB = b.cpu.toLowerCase();
                break;
            case 'cpuMaxFreq':
                valA = a.cpuMaxFreq || 0;
                valB = b.cpuMaxFreq || 0;
                break;
            case 'ram':
                valA = a.ram.toLowerCase();
                valB = b.ram.toLowerCase();
                break;
            case 'gpu':
                valA = a.gpu.toLowerCase();
                valB = b.gpu.toLowerCase();
                break;
            case 'gpuMaxFreq':
                valA = a.gpuMaxFreq || 0;
                valB = b.gpuMaxFreq || 0;
                break;
            case 'vram':
                valA = a.vram.toLowerCase();
                valB = b.vram.toLowerCase();
                break;
            case 'os':
                valA = a.os.toLowerCase();
                valB = b.os.toLowerCase();
                break;
            case 'kernel':
                valA = a.kernel.toLowerCase();
                valB = b.kernel.toLowerCase();
                break;
            case 'mainScore':
                valA = a.mainScore || 0;
                valB = b.mainScore || 0;
                break;
            case 'cpuSingle':
                valA = a.cpuSingle || 0;
                valB = b.cpuSingle || 0;
                break;
            case 'cpuMulti':
                valA = a.cpuMulti || 0;
                valB = b.cpuMulti || 0;
                break;
            case 'gpuScore':
                valA = a.gpuScore || 0;
                valB = b.gpuScore || 0;
                break;
            case 'date': {
                const dA = parseDate(a.dateTime);
                const dB = parseDate(b.dateTime);
                if (!dA && !dB) { valA = valB = 0; break; }
                if (!dA) { valA = 0; valB = 1; break; }
                if (!dB) { valA = 1; valB = 0; break; }
                valA = dA.getTime();
                valB = dB.getTime();
                break;
            }
            default:
                valA = a.mainScore || 0;
                valB = b.mainScore || 0;
        }
        
        if (valA < valB) return isAsc ? -1 : 1;
        if (valA > valB) return isAsc ? 1 : -1;
        return 0;
    });
}

// Helper to highlight search matches safely
function highlightText(text, query) {
    if (!text) return '';
    if (!query) return text;
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return text;
    
    const escapedQuery = cleanQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.toString().replace(regex, '<mark class="search-highlight">$1</mark>');
}

// Render Table Rows
function renderTable() {
    const tbody = document.getElementById('leaderboard-body');
    const searchQuery = document.getElementById('search-input')?.value?.trim() || '';
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="15" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    No benchmark results match your search or filters.
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort reference table by main score to compute absolute ranks
    const sortedByScore = [...benchmarkData].sort((a, b) => (b.mainScore || 0) - (a.mainScore || 0));
    
    tbody.innerHTML = '';
    
    filteredData.forEach(row => {
        // Calculate absolute rank based on its index in sortedByScore
        const absoluteRank = sortedByScore.findIndex(r => r === row) + 1;
        
        let rankContent = absoluteRank;
        if (absoluteRank === 1) {
            rankContent = `<i data-lucide="trophy" style="display: inline-block; width: 13px; height: 13px; margin-right: 4px; vertical-align: text-bottom; color: #ffd700; fill: rgba(255, 215, 0, 0.2);"></i>${absoluteRank}`;
        } else if (absoluteRank === 2) {
            rankContent = `<i data-lucide="trophy" style="display: inline-block; width: 13px; height: 13px; margin-right: 4px; vertical-align: text-bottom; color: #c0c0c0; fill: rgba(192, 192, 192, 0.2);"></i>${absoluteRank}`;
        } else if (absoluteRank === 3) {
            rankContent = `<i data-lucide="trophy" style="display: inline-block; width: 13px; height: 13px; margin-right: 4px; vertical-align: text-bottom; color: #cd7f32; fill: rgba(205, 127, 50, 0.2);"></i>${absoluteRank}`;
        }
        
        const displayName = getDisplayName(row);
        const isNamed = row.user && row.user.toLowerCase() !== 'anonymous';
        const title = isNamed ? `Username: ${row.user}` : `Full ID: ${row.clientId} (Click to copy)`;
        const copyValue = displayName;
            
        let clientIdHtml = '';
        if (row.clientId === 'N/D') {
            clientIdHtml = '<span class="nd-cell">N/D</span>';
        } else {
            clientIdHtml = `
                <div class="client-id-badge" title="${title}" onclick="copyToClipboard('${copyValue}', this)">
                    <span class="client-id-text">${highlightText(displayName, searchQuery)}</span>
                    <i data-lucide="copy" class="copy-icon"></i>
                </div>
            `;
        }
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="rank-cell">${rankContent}</td>
            <td>${clientIdHtml}</td>
            <td title="${row.cpu}">${highlightText(row.cpu, searchQuery)}</td>
            <td>${row.cpuMaxFreq ? `${row.cpuMaxFreq.toLocaleString()} MHz` : '<span class="nd-cell">N/D</span>'}</td>
            <td>${row.ram}</td>
            <td title="${row.gpu}">${highlightText(row.gpu, searchQuery)}</td>
            <td>${row.gpuMaxFreq ? `${row.gpuMaxFreq.toLocaleString()} MHz` : '<span class="nd-cell">N/D</span>'}</td>
            <td>${row.vram}</td>
            <td title="${row.os}">${highlightText(row.os && row.os.length > 21 ? row.os.substring(0, 21) + '…' : row.os, searchQuery)}</td>
            <td title="${row.kernel}">${highlightText(row.kernel, searchQuery)}</td>
            <td class="score-cell main">${row.mainScore ? row.mainScore.toLocaleString() : '<span class="nd-cell">N/D</span>'}</td>
            <td class="score-cell secondary">${row.cpuSingle ? row.cpuSingle.toLocaleString() : '<span class="nd-cell">N/D</span>'}</td>
            <td class="score-cell secondary">${row.cpuMulti ? row.cpuMulti.toLocaleString() : '<span class="nd-cell">N/D</span>'}</td>
            <td class="score-cell secondary">${row.gpuScore ? row.gpuScore.toLocaleString() : '<span class="nd-cell">N/D</span>'}</td>
            <td style="font-size: 0.8rem; color: var(--text-secondary)">${row.dateTime}</td>
        `;
        
        tbody.appendChild(tr);
    });

    if (window.lucide) {
        lucide.createIcons();
    }
}

// Copy to Clipboard Helper
window.copyToClipboard = function(text, element) {
    if (!navigator.clipboard) {
        // Fallback for older browsers or non-HTTPS contexts
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(element);
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textarea);
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(element);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

function showCopyFeedback(element) {
    const icon = element.querySelector('.copy-icon');
    const textEl = element.querySelector('.client-id-text');
    const originalText = textEl.textContent;
    
    textEl.textContent = 'Copied!';
    element.classList.add('copied');
    
    // Temporarily replace copy icon with check icon
    if (icon && window.lucide) {
        icon.setAttribute('data-lucide', 'check');
        lucide.createIcons();
    }
    
    setTimeout(() => {
        textEl.textContent = originalText;
        element.classList.remove('copied');
        if (icon && window.lucide) {
            icon.setAttribute('data-lucide', 'copy');
            lucide.createIcons();
        }
    }, 1500);
}

// Helper to parse dates in format DD/MM/YYYY HH:MM:SS or YYYY-MM-DD HH:MM:SS
function parseDate(dateStr) {
    if (!dateStr || dateStr === 'N/D') return null;
    const datePart = dateStr.split(' ')[0];
    if (datePart.includes('-')) {
        const parts = datePart.split('-');
        if (parts.length < 3) return null;
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else if (datePart.includes('/')) {
        const parts = datePart.split('/');
        if (parts.length < 3) return null;
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    return null;
}

function normalizeDate(str) {
    if (!str || str === 'N/D') return 'N/D';
    const d = parseDate(str);
    if (!d) return str;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const timePart = str.includes(' ') ? str.split(' ').slice(1).join(' ') : '';
    const time = timePart && /^\d{2}:\d{2}:\d{2}/.test(timePart.trim()) ? timePart.trim() : '';
    return time ? `${dd}/${mm}/${d.getFullYear()}, ${time}` : `${dd}/${mm}/${d.getFullYear()}`;
}

// Helper to normalize CPU names for popularity chart
function normalizeCPU(name) {
    if (!name) return 'Unknown CPU';
    let clean = name.replace(/^(AMD|Intel|Intel\(R\))\s+/i, '');
    clean = clean.replace(/\s+\d+-Core$/i, ''); // strip " 16-Core" etc.
    clean = clean.replace(/\s+Eight-Core$/i, ''); // strip " Eight-Core"
    clean = clean.replace(/\s+@\s+\d+\.\d+GHz.*/i, ''); // strip "@ 4.00GHz" etc.
    return clean.trim();
}

// Helper to normalize GPU names for popularity chart
function normalizeGPU(name) {
    if (!name) return 'Unknown GPU';
    if (/^(AMD\s*)?Radeon\s*Graphics|^Graphics$/i.test(name.trim())) return 'AMD Vega';
    let clean = name.replace(/^(AMD|Intel|NVIDIA|Radeon|Intel\(R\))\s+/i, '');
    clean = clean.replace(/(?:^\s*|\s+)Graphics.*/i, ''); // strip " Graphics"
    clean = clean.replace(/\(tm\)/gi, '');
    clean = clean.replace(/\(R\)/gi, '');
    clean = clean.replace(/Laptop\s+GPU/gi, 'Mobile');
    clean = clean.trim();
    if (/^AMD\s*Vega|^Vega\s*\d|^Vega$|^Radeon.*Vega|^RX\s*Vega/i.test(clean)) return 'AMD Vega';
    return clean;
}

// Helper to get top hardware by frequency
function getTopHardware(data, type, limit = 10) {
    const counts = {};
    data.forEach(r => {
        const name = type === 'cpu' ? normalizeCPU(r.cpu) : normalizeGPU(r.gpu);
        if (name && name !== 'Unknown CPU' && name !== 'Unknown GPU' && name !== 'N/D') {
            counts[name] = (counts[name] || 0) + 1;
        }
    });
    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

// Helper to get OS distribution
function getOSDistribution(data) {
    const osMap = {};
    data.forEach(r => {
        const os = r.os || 'Unknown OS';
        let osClean = os.split(' ')[0];
        if (os.toLowerCase().includes('arch')) osClean = 'Arch Linux';
        else if (os.toLowerCase().includes('fedora')) osClean = 'Fedora';
        else if (os.toLowerCase().includes('ubuntu')) osClean = 'Ubuntu';
        else if (os.toLowerCase().includes('cachyos') || os.toLowerCase().includes('cachy os')) osClean = 'CachyOS';
        else if (os.toLowerCase().includes('bazzite')) osClean = 'Bazzite';
        else if (os.toLowerCase().includes('mint')) osClean = 'Linux Mint';
        else if (os.toLowerCase().includes('nobara')) osClean = 'Nobara';
        else if (os.toLowerCase().includes('pop!_os') || os.toLowerCase().includes('pop_os')) osClean = 'Pop!_OS';
        else if (os.toLowerCase().includes('zorin')) osClean = 'Zorin OS';
        else if (os.toLowerCase().includes('steamos')) osClean = 'SteamOS';
        else if (os.toLowerCase().includes('garuda')) osClean = 'Garuda';
        else if (osClean === 'N/D' || osClean.trim() === '') osClean = 'Other';
        
        osMap[osClean] = (osMap[osClean] || 0) + 1;
    });

    // Sort operating systems by frequency descending
    const sortedOS = Object.entries(osMap).sort((a, b) => b[1] - a[1]);

    if (sortedOS.length <= 10) {
        const result = {};
        sortedOS.forEach(([key, val]) => {
            result[key] = val;
        });
        return result;
    }

    // Top 10 most used
    const top10 = sortedOS.slice(0, 10);
    const others = sortedOS.slice(10);
    
    // Sum all others
    const otherSum = others.reduce((sum, curr) => sum + curr[1], 0);

    const finalMap = {};
    top10.forEach(([key, val]) => {
        finalMap[key] = val;
    });

    // Add/merge into 'Other'
    finalMap['Other'] = (finalMap['Other'] || 0) + otherSum;

    return finalMap;
}

// Classify a device as Handheld, Notebook, or Desktop
function classifyDevice(r) {
    const cpu = (r.cpu || '').toLowerCase();
    const gpu = (r.gpu || '').toLowerCase();
    const os = (r.os || '').toLowerCase();
    const kernel = (r.kernel || '').toLowerCase();

    // Handheld detection signatures
    const isHandheld = 
        cpu.includes('steam deck') || 
        gpu.includes('steam deck') ||
        cpu.includes('z1 extreme') || 
        cpu.includes('z1') ||
        os.includes('rog ally') ||
        kernel.includes('rog ally') ||
        os.includes('steam deck') ||
        os.includes('deck') ||
        os.includes('ally') ||
        os.includes('legion go') ||
        cpu.includes('claw') ||
        gpu.includes('custom apu 0405') ||
        gpu.includes('amd custom gpu 0405') ||
        cpu.includes('custom apu 0405');

    if (isHandheld) {
        return 'Handheld';
    }

    // SBC detection (aarch64 architecture)
    const arch = (r.architecture || '').toLowerCase();
    if (arch === 'aarch64') {
        return 'SBC';
    }

    // Notebook/Laptop detection signatures
    const isLaptop = 
        gpu.includes('laptop') || 
        gpu.includes('mobile') ||
        // Intel mobile CPUs: suffix H, HX, HK, U, Y
        /\b(i[3579]-\d{4,5}[h|u])\b/i.test(cpu) ||
        /\b(i[3579]-\d{5}hx)\b/i.test(cpu) ||
        /\b(core.*?[h|u|hx|hs])\b/i.test(cpu) ||
        // AMD mobile CPUs: suffix H, HS, HX, U. Also Ryzen AI (usually mobile)
        /\bryzen.*?\b\d{4}(h|hs|u|hx)\b/i.test(cpu) ||
        cpu.includes('ryzen ai') ||
        cpu.includes('intel core m') ||
        gpu.includes('geforce mx');

    if (isLaptop) {
        return 'Notebook';
    }

    return 'Desktop';
}

// Check if a CPU name belongs to a handheld
function isHandheldCPU(name) {
    const lower = (name || '').toLowerCase();
    return lower.includes('z1') || lower.includes('deck') || lower.includes('apu 0405');
}

// Check if a GPU name belongs to a handheld
function isHandheldGPU(name) {
    const lower = (name || '').toLowerCase();
    return lower.includes('z1') || lower.includes('deck') || lower.includes('gpu 0405');
}

// Get Mobile distribution counts
function getMobileDistribution(data) {
    const dist = { Handheld: 0, SBC: 0, Notebook: 0 };
    data.forEach(r => {
        const type = classifyDevice(r);
        if (type === 'Handheld' || type === 'SBC' || type === 'Notebook') {
            dist[type]++;
        }
    });
    return dist;
}

// Get Mobile category averages
function getMobileAverages(data) {
    const handhelds = data.filter(r => classifyDevice(r) === 'Handheld');
    const notebooks = data.filter(r => classifyDevice(r) === 'Notebook');
    const sbcs = data.filter(r => classifyDevice(r) === 'SBC');

    const getAverage = (arr, field) => {
        let filtered = arr;
        if (field === 'gpuScore' || field === 'mainScore') {
            filtered = arr.filter(r => {
                const gpuLower = (r.gpu || '').toLowerCase();
                if (gpuLower.includes('9070') || gpuLower.includes('9060') || gpuLower.includes('4090') || gpuLower.includes('5070') || gpuLower.includes('7900') || gpuLower.includes('7800') || gpuLower.includes('6900') || gpuLower.includes('6800') || gpuLower.includes('6700') || gpuLower.includes('6750')) {
                    if (!gpuLower.includes('laptop') && !gpuLower.includes('mobile')) {
                        return false;
                    }
                }
                return true;
            });
        }
        const valid = filtered.map(r => r[field]).filter(val => val !== null && !isNaN(val));
        if (valid.length === 0) return 0;
        return Math.round(valid.reduce((sum, val) => sum + val, 0) / valid.length);
    };

    return {
        handheld: {
            mainScore: getAverage(handhelds, 'mainScore'),
            cpuSingle: getAverage(handhelds, 'cpuSingle'),
            cpuMulti: getAverage(handhelds, 'cpuMulti'),
            gpuScore: getAverage(handhelds, 'gpuScore')
        },
        notebook: {
            mainScore: getAverage(notebooks, 'mainScore'),
            cpuSingle: getAverage(notebooks, 'cpuSingle'),
            cpuMulti: getAverage(notebooks, 'cpuMulti'),
            gpuScore: getAverage(notebooks, 'gpuScore')
        },
        sbc: {
            mainScore: getAverage(sbcs, 'mainScore'),
            cpuSingle: getAverage(sbcs, 'cpuSingle'),
            cpuMulti: getAverage(sbcs, 'cpuMulti'),
            gpuScore: getAverage(sbcs, 'gpuScore')
        }
    };
}

// Get top mobile CPUs by average performance (using Single Thread)
function getTopMobileCPUs(data, limit = 10) {
    const mobileData = data.filter(r => ['Handheld', 'SBC', 'Notebook'].includes(classifyDevice(r)) && r.cpuSingle !== null);
    const groups = {};
    
    mobileData.forEach(r => {
        const name = normalizeCPU(r.cpu);
        if (name && name !== 'Unknown CPU' && name !== 'N/D') {
            if (!groups[name]) groups[name] = [];
            groups[name].push(r);
        }
    });

    return Object.entries(groups)
        .map(([name, runs]) => {
            const avg = Math.round(runs.reduce((sum, r) => sum + r.cpuSingle, 0) / runs.length);
            const bestRun = runs.reduce((best, current) => current.cpuSingle > best.cpuSingle ? current : best, runs[0]);
            return { name, avg, displayName: getDisplayName(bestRun) };
        })
        .sort((a, b) => b.avg - a.avg)
        .slice(0, limit);
}

// Get top mobile GPUs by average performance (excluding desktop GPUs)
function getTopMobileGPUs(data, limit = 10) {
    const mobileData = data.filter(r => {
        if (!['Handheld', 'SBC', 'Notebook'].includes(classifyDevice(r))) return false;
        if (r.gpuScore === null) return false;
        
        // Filter out desktop GPUs (eGPUs or incorrect reports)
        const gpuLower = (r.gpu || '').toLowerCase();
        if (gpuLower.includes('9070') || gpuLower.includes('9060') || gpuLower.includes('4090') || gpuLower.includes('5070') || gpuLower.includes('7900') || gpuLower.includes('7800') || gpuLower.includes('6900') || gpuLower.includes('6800') || gpuLower.includes('6700') || gpuLower.includes('6750')) {
            if (!gpuLower.includes('laptop') && !gpuLower.includes('mobile')) {
                return false;
            }
        }
        return true;
    });
    
    const groups = {};
    mobileData.forEach(r => {
        const name = normalizeGPU(r.gpu);
        if (name && name !== 'Unknown GPU' && name !== 'N/D') {
            if (!groups[name]) groups[name] = [];
            groups[name].push(r);
        }
    });

    return Object.entries(groups)
        .map(([name, runs]) => {
            const avg = Math.round(runs.reduce((sum, r) => sum + r.gpuScore, 0) / runs.length);
            const bestRun = runs.reduce((best, current) => current.gpuScore > best.gpuScore ? current : best, runs[0]);
            return { name, avg, displayName: getDisplayName(bestRun) };
        })
        .sort((a, b) => b.avg - a.avg)
        .slice(0, limit);
}

// Get top handheld runs by Main Score
function getTopHandheldRuns(data, limit = 10) {
    const handheldData = data.filter(r => classifyDevice(r) === 'Handheld' && r.mainScore !== null);
    
    return handheldData
        .sort((a, b) => b.mainScore - a.mainScore)
        .slice(0, limit)
        .map(r => ({
            label: normalizeCPU(r.cpu),
            score: r.mainScore,
            cpuMaxFreq: r.cpuMaxFreq,
            userName: r.user && r.user !== 'Anonymous' ? r.user : null
        }));
}

// Get SBC label for runs chart — product name only
function getSbcLabel(r) {
    if (r.productName && r.productName !== 'N/D') {
        return r.productName;
    }
    return normalizeCPU(r.cpu);
}

// Get top SBC runs by Main Score
function getTopSbcRuns(data, limit = 10) {
    const sbcData = data.filter(r => classifyDevice(r) === 'SBC' && r.mainScore !== null);
    
    return sbcData
        .sort((a, b) => b.mainScore - a.mainScore)
        .slice(0, limit)
        .map(r => ({
            label: getSbcLabel(r),
            score: r.mainScore,
            cpuMaxFreq: r.cpuMaxFreq
        }));
}

// Get Mobile OS distribution
function getMobileOSDistribution(data) {
    const mobileData = data.filter(r => ['Handheld', 'SBC', 'Notebook'].includes(classifyDevice(r)));
    return getOSDistribution(mobileData);
}

// Get Handheld OS distribution
function getHandheldOSDistribution(data) {
    const handheldData = data.filter(r => classifyDevice(r) === 'Handheld');
    return getOSDistribution(handheldData);
}

// Get SBC OS distribution
function getSbcOSDistribution(data) {
    const sbcData = data.filter(r => classifyDevice(r) === 'SBC');
    return getOSDistribution(sbcData);
}

// Get Notebook OS distribution
function getNotebookOSDistribution(data) {
    const notebookData = data.filter(r => classifyDevice(r) === 'Notebook');
    return getOSDistribution(notebookData);
}

// Get top Notebook runs by Main Score
function getTopNotebookRuns(data, limit = 10) {
    const notebookData = data.filter(r => classifyDevice(r) === 'Notebook' && r.mainScore !== null);

    return notebookData
        .sort((a, b) => b.mainScore - a.mainScore)
        .slice(0, limit)
        .map(r => ({
            label: normalizeCPU(r.cpu),
            score: r.mainScore,
            cpuMaxFreq: r.cpuMaxFreq,
            userName: r.user && r.user !== 'Anonymous' ? r.user : null
        }));
}

// Get top CPUs by category (Notebook/Handheld/SBC) by average CPU Single score
function getTopCategoryCPUs(data, category, limit = 10) {
    const catData = data.filter(r => classifyDevice(r) === category && r.cpuSingle !== null);
    const best = {};

    catData.forEach(r => {
        const name = normalizeCPU(r.cpu);
        if (!name || name === 'Unknown CPU' || name === 'N/D') return;
        if (!best[name] || r.cpuSingle > best[name].cpuSingle) {
            best[name] = r;
        }
    });

    return Object.values(best)
        .sort((a, b) => b.cpuSingle - a.cpuSingle)
        .slice(0, limit)
        .map(r => ({ name: normalizeCPU(r.cpu), score: r.cpuSingle, displayName: getDisplayName(r), cpuMaxFreq: r.cpuMaxFreq }));
}

// Get top GPUs by category (Notebook/Handheld/SBC) by average GPU score
function getTopCategoryGPUs(data, category, limit = 10) {
    const catData = data.filter(r => {
        if (classifyDevice(r) !== category) return false;
        if (r.gpuScore === null) return false;

        // Exclude desktop GPUs for Notebook category only
        if (category === 'Notebook') {
            const gpuLower = (r.gpu || '').toLowerCase();
            if (gpuLower.includes('9070') || gpuLower.includes('9060') || gpuLower.includes('4090') || gpuLower.includes('5070') || gpuLower.includes('7900') || gpuLower.includes('7800') || gpuLower.includes('6900') || gpuLower.includes('6800') || gpuLower.includes('6700') || gpuLower.includes('6750')) {
                if (!gpuLower.includes('laptop') && !gpuLower.includes('mobile')) {
                    return false;
                }
            }
        }
        return true;
    });

    const best = {};
    catData.forEach(r => {
        const name = normalizeGPU(r.gpu);
        if (!name || name === 'Unknown GPU' || name === 'N/D') return;
        if (!best[name] || r.gpuScore > best[name].gpuScore) {
            best[name] = r;
        }
    });

    return Object.values(best)
        .sort((a, b) => b.gpuScore - a.gpuScore)
        .slice(0, limit)
        .map(r => ({ name: normalizeGPU(r.gpu), score: r.gpuScore, displayName: getDisplayName(r), gpuMaxFreq: r.gpuMaxFreq }));
}

// Helper to get CPU Brand distribution
function getCPUBrandDistribution(data) {
    const brands = { AMD: 0, Intel: 0, ARM: 0, Other: 0 };
    data.forEach(r => {
        const cpu = (r.cpu || '').toLowerCase();
        const arch = (r.architecture || '').toLowerCase();
        if (arch === 'aarch64') {
            brands.ARM++;
        } else if (cpu.includes('amd') || cpu.includes('ryzen') || cpu.includes('epyc') || cpu.includes('fx') || cpu.includes('apu') || cpu.includes('deck') || cpu.includes('athlon') || cpu.includes('bc-250')) {
            brands.AMD++;
        } else if (cpu.includes('intel') || cpu.includes('xeon') || cpu.includes('pentium') || cpu.includes('i3') || cpu.includes('i5') || cpu.includes('i7') || cpu.includes('i9') || cpu.includes('ultra') || cpu.includes('core 5') || cpu.includes('core 3') || cpu.includes('core 7') || cpu.includes('celeron') || cpu.includes('atom') || /^\d/.test(cpu)) {
            brands.Intel++;
        } else if (cpu.includes('arm') || cpu.includes('rk3588') || cpu.includes('mali')) {
            brands.ARM++;
        } else {
            brands.Other++;
        }
    });
    return brands;
}

// Helper to get GPU Brand distribution
function getGPUBrandDistribution(data) {
    const brands = { NVIDIA: 0, AMD: 0, Intel: 0, ARM: 0, llvmpipe: 0, Broadcom: 0, Other: 0 };
    data.forEach(r => {
        const gpu = (r.gpu || '').toLowerCase();
        const arch = (r.architecture || '').toLowerCase();
        if (arch === 'aarch64') {
            brands.ARM++;
        } else if (gpu.includes('nvidia') || gpu.includes('rtx') || gpu.includes('gtx') || gpu.includes('geforce') || gpu.includes('quadro') || gpu.includes('nvk') || gpu.includes('gt 1030') || gpu.includes('mx')) {
            brands.NVIDIA++;
        } else if (gpu.includes('broadcom') || gpu.includes('videocore') || gpu.includes('vc4') || gpu.includes('v3d')) {
            brands.Broadcom++;
        } else if (gpu.includes('arm') || gpu.includes('mali') || gpu.includes('rk3588')) {
            brands.ARM++;
        } else if (gpu.includes('amd') || gpu.includes('radeon') || gpu.includes('rx') || gpu.includes('r9') || gpu.includes('r7') || gpu.includes('r5') || gpu.includes('z1 extreme') || gpu.includes('deck') || gpu.includes('660m') || gpu.includes('610m') || gpu.includes('680m') || gpu.includes('550x') || gpu.includes('w5500') || gpu.includes('hd 8') || gpu.includes('hd 7') || gpu.includes('hd 6') || gpu.includes('pro v') || gpu.includes('radeon pro') || (gpu.includes('graphics') && !gpu.includes('intel'))) {
            brands.AMD++;
        } else if (gpu.includes('intel') || gpu.includes('arc') || gpu.includes('uhd') || gpu.includes('hd graphics')) {
            brands.Intel++;
        } else if (gpu.includes('llvmpipe')) {
            brands.llvmpipe++;
        } else {
            brands.Other++;
        }
    });
    return brands;
}

// Helper to get RAM capacity distribution
function getRAMDistribution(data) {
    const ramMap = {};
    data.forEach(r => {
        let ram = r.ram || 'N/D';
        if (ram === 'N/D' || ram.trim() === '') return;
        
        const match = ram.match(/(\d+(?:\.\d+)?)/);
        if (!match) return;
        
        let num = parseFloat(match[1]);
        let label = '';
        if (num > 0) {
            if (num >= 120 && num <= 130) label = '128 GB';
            else if (num >= 90 && num <= 100) label = '96 GB';
            else if (num >= 60 && num <= 68) label = '64 GB';
            else if (num >= 44 && num <= 52) label = '48 GB';
            else if (num >= 28 && num <= 36) label = '32 GB';
            else if (num >= 20 && num <= 27) label = '24 GB';
            else if (num >= 12 && num <= 19) label = '16 GB';
            else if (num >= 6 && num <= 11) label = '8 GB';
            else if (num < 6) label = '< 8 GB';
            else label = Math.round(num) + ' GB';
        } else {
            label = 'N/D';
        }
        
        ramMap[label] = (ramMap[label] || 0) + 1;
    });
    
    const capacityOrder = ['< 8 GB', '8 GB', '16 GB', '24 GB', '32 GB', '48 GB', '64 GB', '96 GB', '128 GB'];
    const sorted = {};
    capacityOrder.forEach(cap => {
        if (ramMap[cap]) {
            sorted[cap] = ramMap[cap];
            delete ramMap[cap];
        }
    });
    Object.keys(ramMap).sort((a,b) => parseFloat(a) - parseFloat(b)).forEach(cap => {
        sorted[cap] = ramMap[cap];
    });
    
    return sorted;
}

// Helper to get VRAM capacity distribution
function getVRAMDistribution(data) {
    const vramMap = {};
    data.forEach(r => {
        let vram = r.vram || 'N/D';
        if (vram === 'N/D' || vram.trim() === '') return;
        
        const match = vram.match(/(\d+(?:\.\d+)?)/);
        if (!match) return;
        
        let num = parseFloat(match[1]);
        let label = '';
        if (num > 0) {
            if (num >= 30) label = '32 GB';
            else if (num >= 22 && num <= 26) label = '24 GB';
            else if (num >= 15 && num <= 18) label = '16 GB';
            else if (num >= 11 && num <= 13) label = '12 GB';
            else if (num >= 9 && num <= 10.5) label = '10 GB';
            else if (num >= 7.5 && num <= 8.5) label = '8 GB';
            else if (num >= 5.5 && num <= 6.5) label = '6 GB';
            else if (num >= 3.5 && num <= 4.5) label = '4 GB';
            else if (num < 3.5) label = '< 4 GB';
            else label = Math.round(num) + ' GB';
        } else {
            label = 'N/D';
        }
        
        vramMap[label] = (vramMap[label] || 0) + 1;
    });
    
    const capacityOrder = ['< 4 GB', '4 GB', '6 GB', '8 GB', '10 GB', '12 GB', '16 GB', '24 GB', '32 GB'];
    const sorted = {};
    capacityOrder.forEach(cap => {
        if (vramMap[cap]) {
            sorted[cap] = vramMap[cap];
            delete vramMap[cap];
        }
    });
    Object.keys(vramMap).sort((a,b) => parseFloat(a) - parseFloat(b)).forEach(cap => {
        sorted[cap] = vramMap[cap];
    });
    
    return sorted;
}

// Helper to calculate average scores by CPU or GPU
function getAverageScores(data, type) {
    const totals = {};
    const counts = {};
    
    data.forEach(r => {
        let key, val;
        if (type === 'cpu') {
            key = normalizeCPU(r.cpu);
            val = r.cpuSingle;
        } else if (type === 'gpu') {
            key = normalizeGPU(r.gpu);
            val = r.gpuScore;
        }
        
        if (key && key !== 'Unknown CPU' && key !== 'Unknown GPU' && key !== 'N/D' && val !== null && val !== undefined) {
            totals[key] = (totals[key] || 0) + val;
            counts[key] = (counts[key] || 0) + 1;
        }
    });
    
    return Object.entries(totals)
        .map(([name, total]) => ({
            name,
            average: Math.round(total / counts[name])
        }))
        .sort((a, b) => b.average - a.average);
}

// Helper to get Mesa, Kernel or NVIDIA major.minor version distributions
function getVersionDistribution(data, type) {
    const counts = {};
    data.forEach(r => {
        let version = null;
        if (type === 'mesa') {
            const d = r.driver || '';
            const match = d.match(/Mesa\s+(\d+\.\d+)(?:\.(\d+))?/i);
            if (match) {
                const majorMinor = match[1];
                const patch = match[2];
                version = patch === '99' ? `${majorMinor} (mesa-git)` : majorMinor;
            }
        } else if (type === 'kernel') {
            const k = r.kernel || '';
            const match = k.match(/^(\d+\.\d+)/);
            if (match) {
                version = match[1];
            }
        } else if (type === 'nvidia') {
            const d = r.driver || '';
            if (d.includes('NVRM') || d.includes('NVIDIA')) {
                const match = d.match(/NVRM version:.*?(\d+\.\d+)/i);
                if (match) {
                    version = match[1];
                }
            } else {
                return;
            }
        }
        
        if (version) {
            counts[version] = (counts[version] || 0) + 1;
        } else {
            const rawVal = type === 'mesa' ? r.driver : r.kernel;
            if (type === 'nvidia') {
                const d = r.driver || '';
                if (d.includes('NVRM') || d.includes('NVIDIA')) {
                    counts['Other'] = (counts['Other'] || 0) + 1;
                }
            } else if (rawVal && rawVal !== 'N/D' && rawVal.trim() !== '') {
                counts['Other'] = (counts['Other'] || 0) + 1;
            }
        }
    });
    
    return counts;
}

// Get software winner comparison (OS, Mesa, NVIDIA, Kernel)
function getSoftwareWinner(data, type, maxHardware = 12) {
    // Group by hardware and determine which software version wins most often
    // os: group by CPU+GPU, compare Main Score (maxHardware=15)
    // mesa: group by GPU, compare GPU Score (maxHardware=12)
    // nvidia: group by GPU, compare GPU Score (maxHardware=12)
    // kernel: group by CPU, compare CPU Single (maxHardware=12)
    const groups = {};

    data.forEach(r => {
        let hwKey, score, version;
        if (type === 'os') {
            hwKey = `${normalizeCPU(r.cpu)} + ${normalizeGPU(r.gpu)}`;
            score = r.mainScore;
            const os = r.os || 'N/D';
            let osClean = os.split(' ')[0];
            if (os.toLowerCase().includes('arch')) osClean = 'Arch Linux';
            else if (os.toLowerCase().includes('fedora')) osClean = 'Fedora';
            else if (os.toLowerCase().includes('ubuntu')) osClean = 'Ubuntu';
            else if (os.toLowerCase().includes('cachyos') || os.toLowerCase().includes('cachy os')) osClean = 'CachyOS';
            else if (os.toLowerCase().includes('bazzite')) osClean = 'Bazzite';
            else if (os.toLowerCase().includes('mint')) osClean = 'Linux Mint';
            else if (os.toLowerCase().includes('nobara')) osClean = 'Nobara';
            else if (os.toLowerCase().includes('pop!_os') || os.toLowerCase().includes('pop_os')) osClean = 'Pop!_OS';
            else if (os.toLowerCase().includes('zorin')) osClean = 'Zorin OS';
            else if (os.toLowerCase().includes('steamos')) osClean = 'SteamOS';
            else if (os.toLowerCase().includes('garuda')) osClean = 'Garuda';
            else if (os.toLowerCase().includes('manjaro')) osClean = 'Manjaro';
            else if (os.toLowerCase().includes('endeavouros')) osClean = 'EndeavourOS';
            version = osClean;
        } else if (type === 'mesa') {
            hwKey = normalizeGPU(r.gpu);
            score = r.gpuScore;
            const d = r.driver || '';
            const match = d.match(/Mesa\s+(\d+\.\d+)(?:\.(\d+))?/i);
            if (match) version = match[2] === '99' ? `${match[1]} (mesa-git)` : match[1];
        } else if (type === 'nvidia') {
            hwKey = normalizeGPU(r.gpu);
            score = r.gpuScore;
            const d = r.driver || '';
            if (d.includes('NVRM') || d.includes('NVIDIA')) {
                const match = d.match(/NVRM version:.*?(\d+\.\d+)/i);
                if (match) version = match[1];
            }
        } else if (type === 'kernel') {
            hwKey = normalizeCPU(r.cpu);
            score = r.cpuSingle;
            const k = r.kernel || '';
            const match = k.match(/^(\d+\.\d+)/);
            if (match) version = match[1];
        }

        if (!hwKey || !version || score === null || isNaN(score)) return;

        if (!groups[hwKey]) groups[hwKey] = {};
        if (!groups[hwKey][version]) groups[hwKey][version] = { total: 0, count: 0 };
        groups[hwKey][version].total += score;
        groups[hwKey][version].count++;
    });

    // Sort hardware groups by total runs, limit to maxHardware
    const limitedGroups = Object.entries(groups)
        .sort((a, b) => {
            const aTotal = Object.values(a[1]).reduce((s, v) => s + v.count, 0);
            const bTotal = Object.values(b[1]).reduce((s, v) => s + v.count, 0);
            return bTotal - aTotal;
        })
        .slice(0, maxHardware);

    // For each hardware group with 2+ versions, determine winner
    const wins = {};
    const versionScores = {};
    let totalCompared = 0;
    limitedGroups.forEach(([hw, versions]) => {
        const verList = Object.keys(versions);
        if (verList.length < 2) return;
        totalCompared++;
        let bestVersion = null;
        let bestAvg = 0;
        Object.entries(versions).forEach(([ver, vdata]) => {
            const avg = vdata.total / vdata.count;
            if (!versionScores[ver]) versionScores[ver] = { total: 0, count: 0 };
            versionScores[ver].total += vdata.total;
            versionScores[ver].count += vdata.count;
            if (avg > bestAvg) {
                bestAvg = avg;
                bestVersion = ver;
            }
        });
        if (bestVersion) {
            wins[bestVersion] = (wins[bestVersion] || 0) + 1;
        }
    });

    // Calculate average score per version
    const versionAvgs = {};
    Object.entries(versionScores).forEach(([ver, vdata]) => {
        versionAvgs[ver] = Math.round(vdata.total / vdata.count);
    });

    const entries = Object.entries(wins)
        .map(([name, count]) => ({ name, wins: count, avg: versionAvgs[name] || 0, runCount: versionScores[name] ? versionScores[name].count : 0 }))
        .sort((a, b) => b.wins - a.wins || b.avg - a.avg);

    if (entries.length === 0) return null;

    const winner = entries[0];
    const second = entries.length > 1 ? entries[1] : null;
    const third = entries.length > 2 ? entries[2] : null;

    return {
        winner: winner.name,
        winnerAvg: winner.avg,
        winnerWins: winner.wins,
        winnerRuns: winner.runCount,
        totalCompared: totalCompared,
        secondName: second ? second.name : null,
        vsSecond: second ? Math.round(((winner.wins - second.wins) / Math.max(second.wins, 0.1)) * 100) : 0,
        thirdName: third ? third.name : null,
        vsThird: third ? Math.round(((winner.wins - third.wins) / Math.max(third.wins, 0.1)) * 100) : 0,
    };
}

// Helper to get Package type distribution
function getPackageDistribution(data) {
    const counts = {};
    data.forEach(r => {
        let pkg = (r.packageType || '').trim().toLowerCase();
        if (!pkg || pkg === 'n/d' || pkg === '' || pkg === 'unknown') return;
        counts[pkg] = (counts[pkg] || 0) + 1;
    });
    const order = ['native', 'flatpak', 'appimage'];
    const sorted = {};
    order.forEach(k => { if (counts[k]) sorted[k] = counts[k]; });
    Object.keys(counts).sort().forEach(k => { if (!order.includes(k)) sorted[k] = counts[k]; });
    return sorted;
}

// ─── System Tab Aggregation Helpers ───

function getDisplayServerDistribution(data) {
    const counts = {};
    data.forEach(r => {
        let v = (r.displayServer || '').trim();
        if (!v || v === 'N/D') return;
        counts[v] = (counts[v] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { labels: sorted.map(e => e[0]), counts: sorted.map(e => e[1]) };
}

function getDesktopDistribution(data) {
    const counts = {};
    data.forEach(r => {
        let v = (r.desktop || '').trim();
        if (!v || v === 'N/D') return;
        v = v.replace(/\s+\d+(\.\d+)*.*$/, '').trim();
        counts[v] = (counts[v] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { labels: sorted.map(e => e[0]), counts: sorted.map(e => e[1]) };
}

function getStorageDistribution(data) {
    const counts = {};
    data.forEach(r => {
        let v = (r.storageType || '').trim().toLowerCase();
        if (!v || v === 'n/d') return;
        v = v.replace(/^.*\s+/, '').trim();
        if (v === 'nvme') v = 'NVMe';
        else if (v === 'ssd') v = 'SSD';
        else if (v === 'hdd') v = 'HDD';
        counts[v] = (counts[v] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { labels: sorted.map(e => e[0]), counts: sorted.map(e => e[1]) };
}

function getHottestGPU(data, limit = 10, minSamples = 2) {
    const groups = {};
    data.forEach(r => {
        const temp = r.gpuMaxTemp;
        if (temp === null || temp === undefined || isNaN(temp)) return;
        const gpu = normalizeGPU(r.gpu);
        if (!gpu || gpu === 'N/D' || gpu === 'Unknown GPU') return;
        if (!groups[gpu]) groups[gpu] = [];
        groups[gpu].push(temp);
    });
    const entries = Object.entries(groups)
        .filter(([, temps]) => temps.length >= minSamples)
        .map(([gpu, temps]) => ({ gpu, avg: temps.reduce((s, t) => s + t, 0) / temps.length }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, limit);
    return { labels: entries.map(e => e.gpu), data: entries.map(e => Math.round(e.avg * 10) / 10) };
}

function getBestCooling(data, limit = 10, minSamples = 2) {
    const groups = {};
    data.forEach(r => {
        const delta = r.gpuTempDelta;
        if (delta === null || delta === undefined || isNaN(delta)) return;
        const gpu = normalizeGPU(r.gpu);
        if (!gpu || gpu === 'N/D' || gpu === 'Unknown GPU') return;
        if (!groups[gpu]) groups[gpu] = [];
        groups[gpu].push(delta);
    });
    const entries = Object.entries(groups)
        .filter(([, deltas]) => deltas.length >= minSamples)
        .map(([gpu, deltas]) => ({ gpu, avg: deltas.reduce((s, d) => s + d, 0) / deltas.length }))
        .sort((a, b) => a.avg - b.avg)
        .slice(0, limit);
    return { labels: entries.map(e => e.gpu), data: entries.map(e => Math.round(e.avg * 10) / 10) };
}

function getVendorHottestRuns(data, vendor, limit = 10, excludeMobile) {
    const vendorTest = {
        amd: gpu => /^(AMD|Radeon|RX)\b/i.test(gpu) || /\b(Radeon|Vega)\b/i.test(gpu),
        nvidia: gpu => /^(RTX|GTX|NVIDIA|GeForce|TITAN|Quadro)\b/i.test(gpu) || /\bNVIDIA\b/i.test(gpu),
        intel: gpu => /^(Intel|Arc)\b/i.test(gpu) || /^UHD\b/i.test(gpu) || /^Iris\b/i.test(gpu) || /\b(Intel|Arc)\b/i.test(gpu)
    };
    const test = vendorTest[vendor];
    if (!test) return { labels: [], data: [], clientIds: [] };
    const runs = data
        .filter(r => {
            const rawGpu = r.gpu || '';
            if (!test(rawGpu) || r.gpuMaxTemp === null || isNaN(r.gpuMaxTemp)) return false;
            if (!excludeMobile) return true;
            const lower = rawGpu.toLowerCase();
            if (lower.includes('laptop') || lower.includes('mobile') || lower.includes('max-q')) return false;
            const cat = classifyDevice(r);
            if (cat === 'Handheld' || cat === 'SBC' || cat === 'Notebook') return false;
            return true;
        })
        .map(r => ({
            gpu: normalizeGPU(r.gpu || ''),
            temp: r.gpuMaxTemp,
            gpuFreq: r.gpuMaxFreq,
            display: getDisplayName(r)
        }))
        .sort((a, b) => b.temp - a.temp)
        .slice(0, limit);
    return {
        labels: runs.map(r => r.gpu),
        data: runs.map(r => r.temp),
        clientIds: runs.map(r => r.display),
        gpuFreqs: runs.map(r => r.gpuFreq || null)
    };
}

function getCategoryHottestRuns(data, category, limit) {
    const isDesktopGpu = (name) => {
        const lower = name.toLowerCase();
        const desktopModels = ['9070','9060','4090','5070','7900','7800xt','7800 xt','6900','6800','6700','6750','7700','7600','4060','4080','3090','3080','3070','3060','arc a7','arc a5','arc a3'];
        return desktopModels.some(m => lower.includes(m)) && !lower.includes('laptop') && !lower.includes('mobile');
    };
    const portableData = data.filter(r => classifyDevice(r) === category);
    const runs = portableData
        .filter(r => r.gpuMaxTemp !== null && !isNaN(r.gpuMaxTemp))
        .filter(r => !isDesktopGpu(r.gpu || ''))
        .map(r => ({
            gpu: normalizeGPU(r.gpu || ''),
            temp: r.gpuMaxTemp,
            gpuFreq: r.gpuMaxFreq,
            display: getDisplayName(r)
        }))
        .sort((a, b) => b.temp - a.temp)
        .slice(0, limit);
    return {
        labels: runs.map(r => r.gpu),
        data: runs.map(r => r.temp),
        clientIds: runs.map(r => r.display),
        gpuFreqs: runs.map(r => r.gpuFreq || null)
    };
}

function getVendorBestCooling(data, vendor, limit) {
    const vendorTest = {
        amd: gpu => /^(AMD|Radeon|RX)\b/i.test(gpu) || /\b(Radeon|Vega)\b/i.test(gpu),
        nvidia: gpu => /^(RTX|GTX|NVIDIA|GeForce|TITAN|Quadro)\b/i.test(gpu) || /\bNVIDIA\b/i.test(gpu),
        intel: gpu => /^(Intel|Arc)\b/i.test(gpu) || /^UHD\b/i.test(gpu) || /^Iris\b/i.test(gpu) || /\b(Intel|Arc)\b/i.test(gpu)
    };
    const test = vendorTest[vendor];
    if (!test) return { labels: [], data: [], clientIds: [], gpuFreqs: [] };
    const bestPerUser = {};
    data.forEach(r => {
        const rawGpu = r.gpu || '';
        if (!test(rawGpu) || r.gpuTempDelta === null || isNaN(r.gpuTempDelta)) return;
        const gpu = normalizeGPU(rawGpu);
        const id = r.clientId || 'N/D';
        const key = id + '|' + gpu;
        if (!bestPerUser[key] || r.gpuTempDelta < bestPerUser[key].delta) {
            bestPerUser[key] = { gpu, delta: r.gpuTempDelta, gpuFreq: r.gpuMaxFreq, display: getDisplayName(r) };
        }
    });
    const sorted = Object.values(bestPerUser)
        .sort((a, b) => a.delta - b.delta)
        .slice(0, limit);
    return {
        labels: sorted.map(r => r.gpu),
        data: sorted.map(r => r.delta),
        clientIds: sorted.map(r => r.display),
        gpuFreqs: sorted.map(r => r.gpuFreq || null)
    };
}

function renderSystemCharts() {
    const hasChart = id => document.getElementById(id);

    // ── Stats Grid (podium format) ──
    const bm = benchmarkData || [];

    function setPodiumCard(prefix, dist) {
        const entries = Array.isArray(dist)
            ? dist
            : Object.entries(dist).map(([name, count]) => ({ name, count }));
        const total = entries.reduce((s, e) => s + e.count, 0);
        const get = i => entries[i] || null;
        const pct = (item) => item ? ((item.count / total) * 100).toFixed(1) + '%' : '-';

        const el = id => document.getElementById(prefix + '-' + id);
        if (el('name')) el('name').textContent = get(0) ? get(0).name : '-';
        if (el('stat')) el('stat').textContent = get(0) ? pct(get(0)) + ' of submissions' : '-';
        if (el('second')) el('second').textContent = get(1) ? `2º ${get(1).name} — ${pct(get(1))}` : '2º -';
        if (el('third')) el('third').textContent = get(2) ? `3º ${get(2).name} — ${pct(get(2))}` : '3º -';
    }

    const osRaw = getOSDistribution(bm);
    setPodiumCard('sys-os', Object.entries(osRaw).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));

    const desktopRaw = getDesktopDistribution(bm);
    const desktopSorted = desktopRaw.labels.map((name, i) => ({ name, count: desktopRaw.counts[i] })).sort((a, b) => b.count - a.count);
    setPodiumCard('sys-desktop', desktopSorted);

    const displayRaw = getDisplayServerDistribution(bm);
    const displaySorted = displayRaw.labels.map((name, i) => ({ name, count: displayRaw.counts[i] })).sort((a, b) => b.count - a.count);
    setPodiumCard('sys-display', displaySorted);

    const pkgRaw = getPackageDistribution(bm);
    setPodiumCard('sys-package', Object.entries(pkgRaw).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));

    // ── System Environment Donuts ──
    const displayDist = getDisplayServerDistribution(bm);
    const desktopDist = getDesktopDistribution(bm);
    const donutColors = [
        { bg: 'rgba(99, 102, 241, 0.8)', border: '#818cf8' },
        { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' },
        { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' },
        { bg: 'rgba(239, 68, 68, 0.8)', border: '#ef4444' },
        { bg: 'rgba(107, 114, 128, 0.8)', border: '#9ca3af' }
    ];

    if (hasChart('displayServerChart')) {
        const d = displayDist;
        if (d.labels.length > 0) {
            renderDoughnutChart('displayServerChart', d.labels, d.counts,
                d.labels.map((_, i) => donutColors[i % donutColors.length].bg),
                d.labels.map((_, i) => donutColors[i % donutColors.length].border));
        }
    }
    if (hasChart('desktopChart')) {
        const d = desktopDist;
        if (d.labels.length > 0) {
            renderDoughnutChart('desktopChart', d.labels, d.counts,
                d.labels.map((_, i) => donutColors[i % donutColors.length].bg),
                d.labels.map((_, i) => donutColors[i % donutColors.length].border));
        }
    }

    // ── Thermal Performance Bars ──

    function renderVendorChart(canvasId, vendor, bgColor, borderColor) {
        if (!hasChart(canvasId)) return;
        const d = getVendorHottestRuns(bm, vendor, 999, true);
        if (d.labels.length === 0) return;
        const VIS = 10;
        const allL = d.labels, allD = d.data, allC = d.clientIds, allF = d.gpuFreqs;
        const fixedMax = Math.max(...allD) + 5;
        renderHorizontalBarChart(canvasId, allL.slice(0, VIS), allD.slice(0, VIS), 'Max Temp °C',
            bgColor, borderColor, fixedMax, 0, allC.slice(0, VIS), null, null, null, null, allF.slice(0, VIS), null, null, true);
        const chart = chartInstances[canvasId];
        if (!chart) return;
        chart.data.datasets[0].dataLabelUnit = '°C';
        chart.data.datasets[0].rankOneIcon = '🔥';
        chart.data.datasets[0].rankOneLocalIdx = 0;
        chart.data.datasets[0].startIndex = 0;
        chart.options.scales.x.max = fixedMax;
        if (allL.length <= VIS) return;
        const parent = chart.canvas.parentElement;
        parent.style.position = 'relative';
        const overlay = document.createElement('div');
        overlay.className = 'chart-scroll-overlay';
        const spacer = document.createElement('div');
        spacer.style.height = `${320 + (allL.length - VIS) * 18}px`;
        overlay.appendChild(spacer);
        parent.appendChild(overlay);
        let lastIdx = 0;
        overlay.onscroll = () => {
            const pct = overlay.scrollHeight > overlay.clientHeight ? overlay.scrollTop / (overlay.scrollHeight - overlay.clientHeight) : 0;
            const maxStart = allL.length - VIS;
            const idx = Math.min(maxStart, Math.round(pct * maxStart));
            if (idx === lastIdx) return;
            lastIdx = idx;
            chart.data.labels = allL.slice(idx, idx + VIS);
            chart.data.datasets[0].data = allD.slice(idx, idx + VIS);
            chart.data.datasets[0].clientIds = allC.slice(idx, idx + VIS);
            chart.data.datasets[0].gpuFreqs = allF.slice(idx, idx + VIS);
            chart.data.datasets[0].rankOneLocalIdx = idx === 0 ? 0 : -1;
            chart.data.datasets[0].startIndex = idx;
            chart.options.scales.x.max = fixedMax;
            chart.update('none');
        };
        parent.addEventListener('wheel', e => {
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            const maxStart = allL.length - VIS;
            const newIdx = Math.min(maxStart, Math.max(0, lastIdx + dir));
            if (newIdx === lastIdx) return;
            lastIdx = newIdx;
            const pct = maxStart > 0 ? lastIdx / maxStart : 0;
            overlay.scrollTop = pct * (overlay.scrollHeight - overlay.clientHeight);
            chart.data.labels = allL.slice(lastIdx, lastIdx + VIS);
            chart.data.datasets[0].data = allD.slice(lastIdx, lastIdx + VIS);
            chart.data.datasets[0].clientIds = allC.slice(lastIdx, lastIdx + VIS);
            chart.data.datasets[0].gpuFreqs = allF.slice(lastIdx, lastIdx + VIS);
            chart.data.datasets[0].rankOneLocalIdx = lastIdx === 0 ? 0 : -1;
            chart.data.datasets[0].startIndex = lastIdx;
            chart.options.scales.x.max = fixedMax;
            chart.update('none');
        }, { passive: false });
        chart.update('none');
    }

    renderVendorChart('hottestAmdChart', 'amd', 'rgba(239, 68, 68, 0.8)', '#ef4444');
    renderVendorChart('hottestNvidiaChart', 'nvidia', 'rgba(16, 185, 129, 0.8)', '#34d399');
    renderVendorChart('hottestIntelChart', 'intel', 'rgba(99, 102, 241, 0.8)', '#818cf8');

    function renderCatChart(canvasId, category, bgColor, borderColor) {
        if (!hasChart(canvasId)) return;
        const d = getCategoryHottestRuns(bm, category, 999);
        if (d.labels.length === 0) return;
        const VIS = 10;
        const allL = d.labels, allD = d.data, allC = d.clientIds, allF = d.gpuFreqs;
        const fixedMax = Math.max(...allD) + 5;
        renderHorizontalBarChart(canvasId, allL.slice(0, VIS), allD.slice(0, VIS), 'Max Temp °C',
            bgColor, borderColor, fixedMax, 0, allC.slice(0, VIS), null, null, null, null, allF.slice(0, VIS), null, null, true);
        const chart = chartInstances[canvasId];
        if (!chart) return;
        chart.data.datasets[0].dataLabelUnit = '°C';
        chart.data.datasets[0].rankOneIcon = '🔥';
        chart.data.datasets[0].rankOneLocalIdx = 0;
        chart.data.datasets[0].startIndex = 0;
        if (allL.length <= VIS) return;
        const parent = chart.canvas.parentElement;
        parent.style.position = 'relative';
        const overlay = document.createElement('div');
        overlay.className = 'chart-scroll-overlay';
        const spacer = document.createElement('div');
        spacer.style.height = `${320 + (allL.length - VIS) * 18}px`;
        overlay.appendChild(spacer);
        parent.appendChild(overlay);
        let lastIdx = 0;
        function updateCatChart(idx) {
            lastIdx = idx;
            chart.data.labels = allL.slice(idx, idx + VIS);
            chart.data.datasets[0].data = allD.slice(idx, idx + VIS);
            chart.data.datasets[0].clientIds = allC.slice(idx, idx + VIS);
            chart.data.datasets[0].gpuFreqs = allF.slice(idx, idx + VIS);
            chart.data.datasets[0].rankOneLocalIdx = idx === 0 ? 0 : -1;
            chart.data.datasets[0].startIndex = idx;
            chart.options.scales.x.max = fixedMax;
            chart.update('none');
        }
        overlay.onscroll = () => {
            const pct = overlay.scrollHeight > overlay.clientHeight ? overlay.scrollTop / (overlay.scrollHeight - overlay.clientHeight) : 0;
            const maxStart = allL.length - VIS;
            updateCatChart(Math.min(maxStart, Math.round(pct * maxStart)));
        };
        parent.addEventListener('wheel', e => {
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            const maxStart = allL.length - VIS;
            const newIdx = Math.min(maxStart, Math.max(0, lastIdx + dir));
            if (newIdx === lastIdx) return;
            overlay.scrollTop = maxStart > 0 ? (newIdx / maxStart) * (overlay.scrollHeight - overlay.clientHeight) : 0;
            updateCatChart(newIdx);
        }, { passive: false });
        chart.update('none');
    }

    renderCatChart('portableNoteChart', 'Notebook', 'rgba(245, 158, 11, 0.8)', '#fbbf24');
    renderCatChart('portableHandChart', 'Handheld', 'rgba(249, 115, 22, 0.8)', '#f97316');
    renderCatChart('portableSbcChart', 'SBC', 'rgba(239, 68, 68, 0.8)', '#ef4444');
}

// Helper to get top contributors by number of benchmark submissions
function getTopContributors(data, limit = 10) {
    const counts = {};
    const latestRun = {};
    data.forEach(r => {
        const id = r.clientId || 'N/D';
        if (id === 'N/D' || id === '') return;
        counts[id] = (counts[id] || 0) + 1;
        // keep best run for display name: prefer username over Anonymous, then most recent
        const cur = latestRun[id];
        if (!cur) {
            latestRun[id] = r;
        } else {
            const newHasUser = r.user && r.user.toLowerCase() !== 'anonymous';
            const curHasUser = cur.user && cur.user.toLowerCase() !== 'anonymous';
            if (!curHasUser && newHasUser) {
                latestRun[id] = r;
            } else if (curHasUser === newHasUser) {
                const newDate = parseDate(r.dateTime);
                const curDate = parseDate(cur.dateTime);
                if (newDate && (!curDate || newDate > curDate)) {
                    latestRun[id] = r;
                }
            }
        }
    });
    const entries = Object.entries(counts)
        .map(([clientId, submissions]) => ({ clientId, submissions }))
        .sort((a, b) => b.submissions - a.submissions)
        .slice(0, limit);
    return {
        labels: entries.map(e => getDisplayName(latestRun[e.clientId] || {})),
        counts: entries.map(e => e.submissions),
        clientIds: entries.map(e => getDisplayName(latestRun[e.clientId] || {}))
    };
}

// Helper to deduplicate runs by client-id, keeping only the most recent run per client
function getUniqueClientRuns(data) {
    const latestByClient = {};
    data.forEach(r => {
        const id = r.clientId || 'N/D';
        if (id === 'N/D' || id === '') return;
        const date = parseDate(r.dateTime);
        const current = latestByClient[id];
        if (!current) {
            latestByClient[id] = { run: r, date };
        } else if (date !== null && (current.date === null || date > current.date)) {
            latestByClient[id] = { run: r, date };
        }
    });
    return Object.values(latestByClient).map(entry => entry.run);
}

// Helper to resolve contributor display name: username if present and not Anonymous, else client-id
function getDisplayName(run) {
    const user = run.user || '';
    if (user && user.toLowerCase() !== 'anonymous') return user;
    return 'Anonymous';
}

// Helper to calculate score histogram bins
function getScoreHistogramData(data) {
    const bins = {
        '0-499': 0,
        '500-999': 0,
        '1000-1499': 0,
        '1500-1999': 0,
        '2000-2499': 0,
        '2500-2999': 0,
        '3000-3499': 0,
        '3500-3999': 0,
        '4000-4499': 0,
        '4500-4999': 0,
        '5000+': 0
    };
    
    data.forEach(r => {
        const score = r.mainScore;
        if (score !== null && score !== undefined) {
            if (score < 500) bins['0-499']++;
            else if (score < 1000) bins['500-999']++;
            else if (score < 1500) bins['1000-1499']++;
            else if (score < 2000) bins['1500-1999']++;
            else if (score < 2500) bins['2000-2499']++;
            else if (score < 3000) bins['2500-2999']++;
            else if (score < 3500) bins['3000-3499']++;
            else if (score < 4000) bins['3500-3999']++;
            else if (score < 4500) bins['4000-4499']++;
            else if (score < 5000) bins['4500-4999']++;
            else bins['5000+']++;
        }
    });
    
    return bins;
}

// Helper to render vertical bar chart for histogram
function renderVerticalBarChart(canvasId, labels, data, datasetLabel, barColor, borderColor, isPercentage = false) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: barColor,
                borderColor: borderColor,
                borderWidth: 1.5,
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.75,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: {
                        family: "'Outfit', sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Inter', sans-serif",
                        size: 13
                    },
                    padding: 12,
                    borderColor: 'rgba(99, 102, 241, 0.45)',
                    borderWidth: 1.5,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}${isPercentage ? '%' : ''}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        tickBorderDash: [3, 3]
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        callback: function(value) {
                            return isPercentage ? value + '%' : value;
                        }
                    }
                }
            }
        }
    });
}

// Doughnut Chart Renderer Helper
function renderDoughnutChart(canvasId, labels, data, colors, borderColors) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1.5,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#9ca3af',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        padding: 12,
                        boxWidth: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: {
                        family: "'Outfit', sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Inter', sans-serif",
                        size: 13
                    },
                    padding: 12,
                    borderColor: 'rgba(99, 102, 241, 0.45)',
                    borderWidth: 1.5,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return ` ${context.label}: ${context.raw} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// OS vs Hardware Scatter Chart Renderer
// Generate distinct colors for each OS using HSL cycling
function generateDistinctColors(osNames) {
    const map = {};
    osNames.forEach((name, i) => {
        const hue = (i * 47 + 11) % 360;
        const sat = 70 + (i % 3) * 10;
        const light = 50 + (i % 2) * 10;
        const rgba = `rgba(${hslToRgb(hue, sat, light)}, 0.75)`;
        const border = `hsl(${hue}, ${sat}%, ${light}%)`;
        map[name] = { bg: rgba, border };
    });
    return map;
}

function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return `${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}`;
}

function renderOSHardwareScatterChart(canvasId, data) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const osGroups = {};
    data.points.forEach(p => {
        const osName = p.os || 'Other';
        if (!osGroups[osName]) osGroups[osName] = [];
        osGroups[osName].push(p);
    });

    const osNames = Object.keys(osGroups).sort();
    const colorMap = generateDistinctColors(osNames);

    const datasets = Object.entries(osGroups).map(([osName, pts]) => {
        const color = colorMap[osName];
        return {
            label: osName,
            data: pts.map(p => ({ x: p.x, y: p.y })),
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 1.5,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHitRadius: 10,
            _points: pts
        };
    });

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 11 },
                        padding: 12,
                        boxWidth: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    borderColor: 'rgba(99, 102, 241, 0.45)',
                    borderWidth: 1.5,
                    cornerRadius: 10,
                    callbacks: {
                        title: function(items) {
                            const p = items[0];
                            const pts = p.dataset._points;
                            if (pts && pts[p.dataIndex]) return pts[p.dataIndex].hardwareLabel;
                            return '';
                        },
                        label: function(context) {
                            const pts = context.dataset._points;
                            if (!pts || !pts[context.dataIndex]) return '';
                            const p = pts[context.dataIndex];
                            const lines = [
                                `OS: ${p.os || 'N/D'}`,
                                `Avg Score: ${p.y.toLocaleString()}`,
                                `Samples: ${p.count || 1}`,
                                `User: ${p.user || 'N/D'}`
                            ];
                            if (p.clientId && p.clientId !== 'N/D') {
                                lines.push(`Client: ${getDisplayName(p)}`);
                            }
                            if (p.kernel && p.kernel !== 'N/D') lines.push(`Kernel: ${p.kernel}`);
                            if (p.driver && p.driver !== 'N/D') lines.push(`Driver: ${p.driver}`);
                            return lines;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    offset: true,
                    min: -0.5,
                    max: data.hwLabels.length - 0.5,
                    grid: { color: 'rgba(255, 255, 255, 0.05)', tickBorderDash: [3, 3] },
                    ticks: {
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 10 },
                        stepSize: 1,
                        callback: function(value) {
                            const idx = Math.round(value);
                            if (idx >= 0 && idx < data.hwLabels.length) {
                                const label = data.hwLabels[idx];
                                return label.length > 25 ? label.substring(0, 25) + '...' : label;
                            }
                            return '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Hardware (CPU + GPU)',
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 12 }
                    }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)', tickBorderDash: [3, 3] },
                    ticks: {
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 10 },
                        callback: function(value) { return value.toLocaleString(); }
                    },
                    title: {
                        display: true,
                        text: 'Main Score',
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 12 }
                    }
                }
            }
        }
    });
}

// Dedupe by client-id, keeping the highest score per contributor
function dedupeBestPerClient(entries, scoreField) {
    const best = {};
    entries.forEach(r => {
        const id = r.clientId || 'unknown';
        if (!best[id] || r[scoreField] > best[id][scoreField]) {
            best[id] = r;
        }
    });
    return Object.values(best).sort((a, b) => b[scoreField] - a[scoreField]);
}

// Render Interactive Charts using Chart.js
function renderCharts() {
    // 0. Overall Top 10 Main Scores Chart
    const mainRuns = [...benchmarkData]
        .filter(r => r.mainScore !== null)
        .sort((a, b) => b.mainScore - a.mainScore)
        .slice(0, 10);
    
    const mainScores = mainRuns.map(r => r.mainScore);
    const mainMin = mainScores.length > 0 ? Math.min(...mainScores) : 0;
    const mainXMin = Math.floor(mainMin * 0.9);
    
    renderHorizontalBarChart(
        'mainOverallChart',
        mainRuns.map(r => `${normalizeCPU(r.cpu)} + ${normalizeGPU(r.gpu)}`),
        mainScores,
        'Main Score',
        SCORE_COLORS.portableRuns.bg,
        SCORE_COLORS.portableRuns.border,
        undefined,
        mainXMin,
        mainRuns.map(r => getDisplayName(r)),
        mainRuns.map(r => r.cpu),
        mainRuns.map(r => r.gpu),
        mainRuns.map(r => r.cpuMaxFreq),
        'CPU Max Freq',
        mainRuns.map(r => r.gpuMaxFreq),
        undefined,
        chartNorm['mainOverallChart'],
        true
    );
    const cpuSingleBest = {};
    benchmarkData.filter(r => r.cpuSingle !== null).forEach(r => {
        const key = normalizeCPU(r.cpu);
        if (!key || key === 'Unknown CPU') return;
        if (!cpuSingleBest[key] || r.cpuSingle > cpuSingleBest[key].cpuSingle) {
            cpuSingleBest[key] = r;
        }
    });
    const cpuSingleRuns = Object.values(cpuSingleBest)
        .sort((a, b) => b.cpuSingle - a.cpuSingle)
        .slice(0, 10);
    
    const cpuSingleScores = cpuSingleRuns.map(r => r.cpuSingle);
    const cpuSingleMin = cpuSingleScores.length > 0 ? Math.min(...cpuSingleScores) : 0;
    const cpuSingleXMin = Math.floor(cpuSingleMin * 0.9);
    
    renderHorizontalBarChart(
        'cpuSingleChart',
        cpuSingleRuns.map(r => r.cpu),
        cpuSingleScores,
        'Top 10 CPU Model - Single Thread',
        SCORE_COLORS.cpuSingle.bg,
        SCORE_COLORS.cpuSingle.border,
        undefined,
        cpuSingleXMin,
        cpuSingleRuns.map(r => getDisplayName(r)),
        null,
        null,
        cpuSingleRuns.map(r => r.cpuMaxFreq),
        'CPU Max Freq',
        undefined,
        undefined,
        chartNorm['cpuSingleChart'],
        true
    );

    // 2. CPU Multi Thread Top 10 Chart
    const cpuMultiBest = {};
    benchmarkData.filter(r => r.cpuMulti !== null).forEach(r => {
        const key = normalizeCPU(r.cpu);
        if (!key || key === 'Unknown CPU') return;
        if (!cpuMultiBest[key] || r.cpuMulti > cpuMultiBest[key].cpuMulti) {
            cpuMultiBest[key] = r;
        }
    });
    const cpuMultiRuns = Object.values(cpuMultiBest)
        .sort((a, b) => b.cpuMulti - a.cpuMulti)
        .slice(0, 10);
        
    const cpuMultiScores = cpuMultiRuns.map(r => r.cpuMulti);
    const cpuMultiMin = cpuMultiScores.length > 0 ? Math.min(...cpuMultiScores) : 0;
    const cpuMultiXMin = Math.floor(cpuMultiMin * 0.9);
    
    renderHorizontalBarChart(
        'cpuMultiChart',
        cpuMultiRuns.map(r => r.cpu),
        cpuMultiScores,
        'Top 10 CPU Model - Multi Thread',
        SCORE_COLORS.cpuMulti.bg,
        SCORE_COLORS.cpuMulti.border,
        undefined,
        cpuMultiXMin,
        cpuMultiRuns.map(r => getDisplayName(r)),
        null,
        null,
        cpuMultiRuns.map(r => r.cpuMaxFreq),
        'CPU Max Freq',
        undefined,
        undefined,
        chartNorm['cpuMultiChart'],
        true
    );

    // 3. GPU Performance Top 10 Chart
    const gpuBest = {};
    benchmarkData.filter(r => r.gpuScore !== null).forEach(r => {
        const key = normalizeGPU(r.gpu);
        if (!key || key === 'Unknown GPU') return;
        if (!gpuBest[key] || r.gpuScore > gpuBest[key].gpuScore) {
            gpuBest[key] = r;
        }
    });
    const gpuRuns = Object.values(gpuBest)
        .sort((a, b) => b.gpuScore - a.gpuScore)
        .slice(0, 10);
        
    renderHorizontalBarChart(
        'gpuChart',
        gpuRuns.map(r => r.gpu),
        gpuRuns.map(r => r.gpuScore),
        'GPU Score',
        SCORE_COLORS.gpu.bg,
        SCORE_COLORS.gpu.border,
        undefined,
        undefined,
        gpuRuns.map(r => getDisplayName(r)),
        null,
        null,
        null,
        null,
        gpuRuns.map(r => r.gpuMaxFreq),
        undefined,
        chartNorm['gpuChart'],
        true
    );

    // 4. Top 10 CPU - Most Used Chart
    const popularCPUs = getTopHardware(benchmarkData, 'cpu', 10);
    const cpuPopTotal = popularCPUs.reduce((s, c) => s + c.count, 0);
    const cpuPopPct = popularCPUs.map(c => (c.count / cpuPopTotal) * 100);
    renderHorizontalBarChart(
        'cpuPopularChart',
        popularCPUs.map(c => c.name),
        popularCPUs.map(c => c.count),
        'Count',
        'rgba(245, 158, 11, 0.85)',
        '#f59e0b',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        cpuPopPct,
        null,
        true
    );

    // 5. Top 10 GPU - Most Used Chart
    const popularGPUs = getTopHardware(benchmarkData, 'gpu', 10);
    const gpuPopTotal = popularGPUs.reduce((s, g) => s + g.count, 0);
    const gpuPopPct = popularGPUs.map(g => (g.count / gpuPopTotal) * 100);
    renderHorizontalBarChart(
        'gpuPopularChart',
        popularGPUs.map(g => g.name),
        popularGPUs.map(g => g.count),
        'Count',
        SCORE_COLORS.popularGpu.bg,
        SCORE_COLORS.popularGpu.border,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        gpuPopPct,
        null,
        true
    );

    // 6. Pie/Doughnut OS Distribution Chart
    const osDist = getOSDistribution(getUniqueClientRuns(benchmarkData));
    const osLabels = Object.keys(osDist);
    
    const osPalette = [
        { bg: 'rgba(99, 102, 241, 0.8)', border: '#818cf8' },   // Indigo
        { bg: 'rgba(168, 85, 247, 0.8)', border: '#c084fc' },  // Purple
        { bg: 'rgba(14, 165, 233, 0.8)', border: '#38bdf8' },  // Sky
        { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' },  // Emerald
        { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' },  // Amber
        { bg: 'rgba(244, 63, 94, 0.8)', border: '#fb7185' },   // Rose
        { bg: 'rgba(6, 182, 212, 0.8)', border: '#22d3ee' },   // Cyan
        { bg: 'rgba(139, 92, 246, 0.8)', border: '#a78bfa' },  // Violet
        { bg: 'rgba(236, 72, 153, 0.8)', border: '#f472b6' },  // Pink
        { bg: 'rgba(20, 184, 166, 0.8)', border: '#2dd4bf' }   // Teal
    ];

    const osBgColors = [];
    const osBorderColors = [];
    let osColorIdx = 0;

    osLabels.forEach(label => {
        if (label === 'Other') {
            osBgColors.push('rgba(107, 114, 128, 0.8)'); // Gray
            osBorderColors.push('#9ca3af');
        } else {
            const color = osPalette[osColorIdx % osPalette.length];
            osBgColors.push(color.bg);
            osBorderColors.push(color.border);
            osColorIdx++;
        }
    });

    renderDoughnutChart(
        'osDistChart',
        osLabels,
        Object.values(osDist),
        osBgColors,
        osBorderColors
    );

    // 7. Pie/Doughnut CPU Brand Distribution Chart
    const cpuBrandDist = getCPUBrandDistribution(getUniqueClientRuns(benchmarkData));
    if (cpuBrandDist.Other === 0) {
        delete cpuBrandDist.Other;
    }
    const cpuBrandColors = {
        'AMD': { bg: 'rgba(244, 63, 94, 0.8)', border: '#fb7185' },
        'Intel': { bg: 'rgba(14, 165, 233, 0.8)', border: '#38bdf8' },
        'ARM': { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' },
        'Other': { bg: 'rgba(156, 163, 175, 0.8)', border: '#9ca3af' }
    };
    const cpuLabels = Object.keys(cpuBrandDist);
    renderDoughnutChart(
        'cpuBrandDistChart',
        cpuLabels,
        Object.values(cpuBrandDist),
        cpuLabels.map(label => cpuBrandColors[label].bg),
        cpuLabels.map(label => cpuBrandColors[label].border)
    );

    // 8. Pie/Doughnut GPU Brand Distribution Chart
    const gpuBrandDist = getGPUBrandDistribution(benchmarkData);
    delete gpuBrandDist.llvmpipe;
    Object.keys(gpuBrandDist).forEach(k => { if (gpuBrandDist[k] === 0) delete gpuBrandDist[k]; });
    if (gpuBrandDist.llvmpipe === 0) {
        delete gpuBrandDist.llvmpipe;
    }
    const gpuBrandColors = {
        'NVIDIA': { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' },
        'AMD': { bg: 'rgba(244, 63, 94, 0.8)', border: '#fb7185' },
        'Intel': { bg: 'rgba(14, 165, 233, 0.8)', border: '#38bdf8' },
        'ARM': { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' },
        'llvmpipe': { bg: 'rgba(236, 72, 153, 0.8)', border: '#f472b6' },
        'Broadcom': { bg: 'rgba(244, 114, 182, 0.8)', border: '#f9a8d4' },
        'Other': { bg: 'rgba(156, 163, 175, 0.8)', border: '#9ca3af' }
    };
    const gpuLabels = Object.keys(gpuBrandDist);
    renderDoughnutChart(
        'gpuBrandDistChart',
        gpuLabels,
        Object.values(gpuBrandDist),
        gpuLabels.map(label => gpuBrandColors[label].bg),
        gpuLabels.map(label => gpuBrandColors[label].border)
    );

    // 8b. Pie/Doughnut RAM Capacity Distribution Chart
    const ramDist = getRAMDistribution(benchmarkData);
    const ramLabels = Object.keys(ramDist);
    const ramColors = {
        '< 8 GB': { bg: 'rgba(6, 182, 212, 0.8)', border: '#22d3ee' },    // Cyan
        '8 GB': { bg: 'rgba(14, 165, 233, 0.8)', border: '#38bdf8' },     // Sky
        '16 GB': { bg: 'rgba(99, 102, 241, 0.8)', border: '#818cf8' },    // Indigo
        '24 GB': { bg: 'rgba(139, 92, 246, 0.8)', border: '#a78bfa' },   // Violet
        '32 GB': { bg: 'rgba(16, 185, 129, 0.8)', border: '#c084fc' },   // Purple
        '48 GB': { bg: 'rgba(236, 72, 153, 0.8)', border: '#f472b6' },   // Pink
        '64 GB': { bg: 'rgba(244, 63, 94, 0.8)', border: '#fb7185' },    // Rose
        '96 GB': { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' },   // Amber
        '128 GB': { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' }   // Emerald
    };
    const ramBgColors = [];
    const ramBorderColors = [];
    ramLabels.forEach(label => {
        const color = ramColors[label] || { bg: 'rgba(156, 163, 175, 0.8)', border: '#9ca3af' };
        ramBgColors.push(color.bg);
        ramBorderColors.push(color.border);
    });
    
    renderDoughnutChart(
        'ramDistChart',
        ramLabels,
        Object.values(ramDist),
        ramBgColors,
        ramBorderColors
    );

    // 8c. Pie/Doughnut VRAM Capacity Distribution Chart
    const vramDist = getVRAMDistribution(benchmarkData);
    const vramLabels = Object.keys(vramDist);
    const vramColors = {
        '< 4 GB': { bg: 'rgba(107, 114, 128, 0.8)', border: '#9ca3af' },  // Gray
        '4 GB': { bg: 'rgba(6, 182, 212, 0.8)', border: '#22d3ee' },     // Cyan
        '6 GB': { bg: 'rgba(14, 165, 233, 0.8)', border: '#38bdf8' },    // Sky
        '8 GB': { bg: 'rgba(99, 102, 241, 0.8)', border: '#818cf8' },    // Indigo
        '10 GB': { bg: 'rgba(139, 92, 246, 0.8)', border: '#a78bfa' },   // Violet
        '12 GB': { bg: 'rgba(16, 185, 129, 0.8)', border: '#c084fc' },   // Purple
        '16 GB': { bg: 'rgba(244, 63, 94, 0.8)', border: '#fb7185' },    // Rose
        '24 GB': { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' },   // Amber
        '32 GB': { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' }    // Emerald
    };
    const vramBgColors = [];
    const vramBorderColors = [];
    vramLabels.forEach(label => {
        const color = vramColors[label] || { bg: 'rgba(156, 163, 175, 0.8)', border: '#9ca3af' };
        vramBgColors.push(color.bg);
        vramBorderColors.push(color.border);
    });

    renderDoughnutChart(
        'vramDistChart',
        vramLabels,
        Object.values(vramDist),
        vramBgColors,
        vramBorderColors
    );

    // 10. Average CPU score by model
    const cpuAverages = getAverageScores(benchmarkData, 'cpu');
    lastSoftwareData.cpuAverage = cpuAverages;
    {
        const cfg = AVERAGE_CHART_CONFIG.cpuAverage;
        makeChartScrollable(cfg.chartId, cpuAverages.map(c => c.name), cpuAverages.map(c => c.average), cfg.label, cfg.color, cfg.border, cfg.maxItems, chartNorm[cfg.chartId], undefined, undefined, true);
    }

    // 11. Average GPU score by model
    const gpuAverages = getAverageScores(benchmarkData, 'gpu');
    lastSoftwareData.gpuAverage = gpuAverages;
    {
        const cfg = AVERAGE_CHART_CONFIG.gpuAverage;
        makeChartScrollable(cfg.chartId, gpuAverages.map(g => g.name), gpuAverages.map(g => g.average), cfg.label, cfg.color, cfg.border, cfg.maxItems, chartNorm[cfg.chartId], undefined, undefined, true);
    }

    /*
    // 13. Score Distribution Histogram
    const histogramData = getScoreHistogramData(benchmarkData);
    const totalRuns = Object.values(histogramData).reduce((a, b) => a + b, 0);
    const histogramPercentages = {};
    for (const [bin, count] of Object.entries(histogramData)) {
        histogramPercentages[bin] = totalRuns > 0 ? parseFloat(((count / totalRuns) * 100).toFixed(1)) : 0;
    }
    
    renderVerticalBarChart(
        'scoreHistogramChart',
        Object.keys(histogramPercentages),
        Object.values(histogramPercentages),
        'Percentage',
        'rgba(168, 85, 247, 0.85)',
        '#c084fc',
        true
    );
    */

    // 14. Mesa version distribution
    const mesaVersions = getVersionDistribution(getUniqueClientRuns(benchmarkData), 'mesa');
    renderDoughnutChart(
        'mesaVersionChart',
        Object.keys(mesaVersions),
        Object.values(mesaVersions),
        [
            'rgba(99, 102, 241, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(156, 163, 175, 0.8)'
        ],
        [
            '#818cf8',
            '#38bdf8',
            '#c084fc',
            '#fbbf24',
            '#9ca3af'
        ]
    );

    // 15. Kernel version distribution
    const kernelVersions = getVersionDistribution(getUniqueClientRuns(benchmarkData), 'kernel');
    renderDoughnutChart(
        'kernelVersionChart',
        Object.keys(kernelVersions),
        Object.values(kernelVersions),
        [
            'rgba(16, 185, 129, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(244, 63, 94, 0.8)',
            'rgba(156, 163, 175, 0.8)'
        ],
        [
            '#34d399',
            '#38bdf8',
            '#fbbf24',
            '#fb7185',
            '#9ca3af'
        ]
    );

    // 15b. NVIDIA Driver version distribution
    const nvidiaVersions = getVersionDistribution(getUniqueClientRuns(benchmarkData), 'nvidia');
    renderDoughnutChart(
        'nvidiaVersionChart',
        Object.keys(nvidiaVersions),
        Object.values(nvidiaVersions),
        [
            'rgba(16, 185, 129, 0.8)',
            'rgba(99, 102, 241, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(156, 163, 175, 0.8)'
        ],
        [
            '#34d399',
            '#818cf8',
            '#c084fc',
            '#fbbf24',
            '#9ca3af'
        ]
    );

    // Portable Devices Charts Rendering
    if (!document.getElementById('mobileDistChart')) return;

    const portableDist = getMobileDistribution(benchmarkData);
    const portableDistColors = {
        'Handheld': { bg: 'rgba(99, 102, 241, 0.8)', border: '#818cf8' },
        'SBC': { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' },
        'Notebook': { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' }
    };
    const portableDistLabels = Object.keys(portableDist);
    renderDoughnutChart(
        'mobileDistChart',
        portableDistLabels,
        Object.values(portableDist),
        portableDistLabels.map(l => portableDistColors[l] ? portableDistColors[l].bg : 'rgba(107, 114, 128, 0.8)'),
        portableDistLabels.map(l => portableDistColors[l] ? portableDistColors[l].border : '#9ca3af')
    );

    // Helper to get colors for OS labels
    const getMobileOsColors = (labels) => {
        const bgColors = [];
        const borderColors = [];
        let colorIdx = 0;
        labels.forEach(label => {
            if (label === 'Other') {
                bgColors.push('rgba(107, 114, 128, 0.8)');
                borderColors.push('#9ca3af');
            } else {
                const color = osPalette[colorIdx % osPalette.length];
                bgColors.push(color.bg);
                borderColors.push(color.border);
                colorIdx++;
            }
        });
        return { bgColors, borderColors };
    };

    function renderCategoryCharts(category, runsChartId, osChartId, cpuChartId, gpuChartId) {
        if (!document.getElementById(runsChartId)) return;

        // Top runs
        const runs = category === 'Notebook' ? getTopNotebookRuns :
                     category === 'Handheld' ? getTopHandheldRuns :
                     getTopSbcRuns;
        const runsData = runs(benchmarkData, 10);
        
        const runsScores = runsData.map(h => h.score);
        const runsMin = runsScores.length > 0 ? Math.min(...runsScores) : 0;
        const runsXMin = Math.floor(runsMin * 0.9);

        renderHorizontalBarChart(
            runsChartId,
            runsData.map(h => h.label),
            runsScores,
            'Main Score',
            SCORE_COLORS.portableRuns.bg,
            SCORE_COLORS.portableRuns.border,
            undefined,
            runsXMin,
            runsData.map(h => h.userName),
            runsData.map(h => h.cpuMaxFreq ? normalizeCPU(h.label) : null),
            null,
            runsData.map(h => h.cpuMaxFreq),
            'CPU Max Freq',
            undefined,
            undefined,
            chartNorm[runsChartId],
            true
        );

        // OS distribution
        const osFn = category === 'Notebook' ? getNotebookOSDistribution :
                     category === 'Handheld' ? getHandheldOSDistribution :
                     getSbcOSDistribution;
        const osDist = osFn(benchmarkData);
        const osLabels = Object.keys(osDist);
        const osColors = getMobileOsColors(osLabels);
        renderDoughnutChart(
            osChartId,
            osLabels,
            Object.values(osDist),
            osColors.bgColors,
            osColors.borderColors
        );

        // GPU filter for Notebook: exclude desktop GPUs
        const cpuData = getTopCategoryCPUs(benchmarkData, category, 10);
        const cpuLabels = category === 'SBC' ? cpuData.map(c => {
            const match = benchmarkData.find(r => classifyDevice(r) === 'SBC' && normalizeCPU(r.cpu) === c.name);
            return match && match.productName && match.productName !== 'N/D' ? `${c.name}\n${match.productName}` : c.name;
        }) : cpuData.map(c => c.name);

        const cpuScores = cpuData.map(c => c.score);
        const cpuMin = cpuScores.length > 0 ? Math.min(...cpuScores) : 0;
        const cpuXMin = Math.floor(cpuMin * 0.9);

        renderHorizontalBarChart(
            cpuChartId,
            cpuLabels,
            cpuScores,
            'CPU Single Score',
            'rgba(99, 102, 241, 0.85)',
            '#818cf8',
            undefined,
            cpuXMin,
            cpuData.map(c => c.displayName),
            null,
            null,
            cpuData.map(c => c.cpuMaxFreq),
            'CPU Max Freq',
            undefined,
            undefined,
            chartNorm[cpuChartId],
            true
        );

        const gpuData = getTopCategoryGPUs(benchmarkData, category, 10);
        const gpuLabels = category === 'SBC' ? gpuData.map(g => {
            const match = benchmarkData.find(r => classifyDevice(r) === 'SBC' && normalizeGPU(r.gpu) === g.name);
            return match && match.productName && match.productName !== 'N/D' ? `${g.name}\n${match.productName}` : g.name;
        }) : gpuData.map(g => g.name);

        const gpuScores = gpuData.map(g => g.score);
        const gpuMin = gpuScores.length > 0 ? Math.min(...gpuScores) : 0;
        const gpuXMin = Math.floor(gpuMin * 0.9);

        renderHorizontalBarChart(
            gpuChartId,
            gpuLabels,
            gpuScores,
            'GPU Score',
            SCORE_COLORS.gpu.bg,
            SCORE_COLORS.gpu.border,
            undefined,
            gpuXMin,
            gpuData.map(g => g.displayName),
            null,
            null,
            null,
            null,
            gpuData.map(g => g.gpuMaxFreq),
            undefined,
            chartNorm[gpuChartId],
            true
        );
    }

    renderCategoryCharts('Notebook', 'notebookRunsChart', 'notebookOsDistChart', 'notebookCpuChart', 'notebookGpuChart');
    renderCategoryCharts('Handheld', 'handheldRunsChart', 'handheldOsDistChart', 'handheldCpuChart', 'handheldGpuChart');
    renderCategoryCharts('SBC', 'sbcRunsChart', 'sbcOsDistChart', 'sbcCpuChart', 'sbcGpuChart');

    // 21. PascubeDB Community Insights Section Calculations & Rendering
    if (document.getElementById('stat-unique-clients')) {
        // 1. Unique Contributors
        const uniqueClients = new Set();
        benchmarkData.forEach(r => {
            if (r.clientId && r.clientId !== 'N/D') {
                uniqueClients.add(r.clientId);
            }
        });
        document.getElementById('stat-unique-clients').textContent = animateCounter('stat-unique-clients', uniqueClients.size, true);

        document.getElementById('stat-total-benchmarks').textContent = animateCounter('stat-total-benchmarks', benchmarkData.length, true);

        // 2. Hardware Models
        const uniqueCPUs = new Set();
        const uniqueGPUs = new Set();
        benchmarkData.forEach(r => {
            const cpuNorm = normalizeCPU(r.cpu);
            const gpuNorm = normalizeGPU(r.gpu);
            if (cpuNorm && cpuNorm !== 'Unknown CPU' && cpuNorm !== 'N/D') {
                uniqueCPUs.add(cpuNorm);
            }
            if (gpuNorm && gpuNorm !== 'Unknown GPU' && gpuNorm !== 'N/D') {
                uniqueGPUs.add(gpuNorm);
            }
        });
        document.getElementById('stat-unique-hardware').textContent = animateCounter('stat-unique-hardware', (uniqueCPUs.size + uniqueGPUs.size), true);

        // 3. Submissions in last 7 days
        const parsedDates = benchmarkData
            .map(r => parseDate(r.dateTime))
            .filter(d => d !== null);
        const maxDate = parsedDates.length > 0 ? new Date(Math.max(...parsedDates)) : new Date();
        const sevenDaysAgo = new Date(maxDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const last7DaysCount = benchmarkData.filter(r => {
            const d = parseDate(r.dateTime);
            return d !== null && d >= sevenDaysAgo;
        }).length;
        document.getElementById('stat-recent-submissions').textContent = animateCounter('stat-recent-submissions', last7DaysCount, true);

        // 4. Daily Submissions Activity (Last 30 Days)
        const activityData = {};
        const activityLabels = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() - i);
            const dateString = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
            activityData[dateString] = 0;
            activityLabels.push(dateString);
        }
        
        benchmarkData.forEach(r => {
            const d = parseDate(r.dateTime);
            if (d) {
                const diffDays = Math.floor((maxDate.getTime() - d.getTime()) / (24 * 60 * 60 * 1000));
                if (diffDays >= 0 && diffDays < 30) {
                    const dateString = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
                    if (activityData[dateString] !== undefined) {
                        activityData[dateString]++;
                    }
                }
            }
        });
        
        const activityCounts = activityLabels.map(label => activityData[label]);
        
        // Render Submission Activity Line Chart
        const activityChartEl = document.getElementById('submissionActivityChart');
        if (activityChartEl) {
            if (chartInstances['submissionActivityChart']) {
                chartInstances['submissionActivityChart'].destroy();
            }
            const actCtx = activityChartEl.getContext('2d');
            const gradient = actCtx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            
            chartInstances['submissionActivityChart'] = new Chart(actCtx, {
                type: 'line',
                data: {
                    labels: activityLabels,
                    datasets: [{
                        label: 'Submissions',
                        data: activityCounts,
                        borderColor: '#818cf8',
                        borderWidth: 3,
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#818cf8',
                        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
                        pointBorderWidth: 1.5,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
            plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(11, 15, 25, 1)',
                            titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                            bodyFont: { family: "'Inter', sans-serif", size: 13 },
                            padding: 12,
                            borderColor: 'rgba(99, 102, 241, 0.45)',
                            borderWidth: 1.5,
                            cornerRadius: 10,
                            displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0]?.dataset?.label || '';
                        },
                        label: function(context) {
                                    return `Submissions: ${context.parsed.y}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)', tickBorderDash: [3, 3] },
                            ticks: { color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 10 } }
                        },
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)', tickBorderDash: [3, 3] },
                            ticks: {
                                color: '#9ca3af',
                                font: { family: "'Inter', sans-serif", size: 10 },
                                stepSize: 1,
                                precision: 0
                            }
                        }
                    }
                }
            });
        }

        // Package Distribution
        const pkgDist = getPackageDistribution(getUniqueClientRuns(benchmarkData));
        const pkgLabels = Object.keys(pkgDist);
        const pkgColors = pkgLabels.map(label => {
            if (label === 'native') return { bg: 'rgba(99, 102, 241, 0.8)', border: '#818cf8' };
            if (label === 'flatpak') return { bg: 'rgba(16, 185, 129, 0.8)', border: '#34d399' };
            if (label === 'appimage') return { bg: 'rgba(245, 158, 11, 0.8)', border: '#fbbf24' };
            return { bg: 'rgba(107, 114, 128, 0.8)', border: '#9ca3af' };
        });
        if (document.getElementById('packageDistChart')) {
            renderDoughnutChart(
                'packageDistChart',
                pkgLabels,
                Object.values(pkgDist),
                pkgColors.map(c => c.bg),
                pkgColors.map(c => c.border)
            );
        }

        // Top Contributors Chart
        const contributors = getTopContributors(benchmarkData, 10);
        if (document.getElementById('topContributorsChart') && contributors.labels.length > 0) {
            renderHorizontalBarChart(
                'topContributorsChart',
                contributors.labels,
                contributors.counts,
                'Submissions',
                'rgba(99, 102, 241, 0.8)',
                '#818cf8',
                null,
                0,
                contributors.clientIds,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                true
            );
        }

    }

    // Software Comparison Charts + Winners
    try {
    function cleanOSName(os) {
        if (!os) return 'Other';
        const o = os.toLowerCase();
        if (o.includes('arch')) return 'Arch Linux';
        if (o.includes('fedora')) return 'Fedora';
        if (o.includes('ubuntu')) return 'Ubuntu';
        if (o.includes('cachyos') || o.includes('cachy os')) return 'CachyOS';
        if (o.includes('bazzite')) return 'Bazzite';
        if (o.includes('mint')) return 'Linux Mint';
        if (o.includes('nobara')) return 'Nobara';
        if (o.includes('pop!_os') || o.includes('pop_os')) return 'Pop!_OS';
        if (o.includes('zorin')) return 'Zorin OS';
        if (o.includes('steamos')) return 'SteamOS';
        if (o.includes('garuda')) return 'Garuda';
        if (o.includes('manjaro')) return 'Manjaro';
        if (o.includes('endeavouros')) return 'EndeavourOS';
        if (o.includes('pikaos') || o.includes('pika os')) return 'PikaOS';
        return os.split(' ')[0];
    }

    function getAbsoluteWinners(data, type) {
        const groups = {};
        data.forEach(r => {
            let hwKey, score, version;
            if (type === 'os') {
                hwKey = `${normalizeCPU(r.cpu)} + ${normalizeGPU(r.gpu)}`;
                score = r.mainScore;
                version = cleanOSName(r.os);
            } else if (type === 'mesa') {
                hwKey = normalizeGPU(r.gpu);
                score = r.gpuScore;
                const d = r.driver || '';
                const match = d.match(/Mesa\s+(\d+\.\d+)(?:\.(\d+))?/i);
                if (!match) return;
                version = match[2] === '99' ? `${match[1]} (mesa-git)` : match[1];
                // skip NVIDIA GPUs for Mesa comparison
                const gpuLower = (r.gpu || '').toLowerCase();
                if (gpuLower.includes('nvidia') || gpuLower.includes('rtx') || gpuLower.includes('geforce')) return;
            } else if (type === 'nvidia') {
                hwKey = normalizeGPU(r.gpu);
                score = r.gpuScore;
                const d = r.driver || '';
                const gpuLower = (r.gpu || '').toLowerCase();
                if (!gpuLower.includes('nvidia') && !gpuLower.includes('rtx') && !gpuLower.includes('geforce')) return;
                if (!d.includes('NVRM') && !d.includes('NVIDIA')) return;
                const match = d.match(/(?:NVRM|NVIDIA).*?(\d+\.\d+)/i);
                if (!match) return;
                version = match[1];
            } else if (type === 'kernel') {
                hwKey = normalizeCPU(r.cpu);
                score = r.cpuSingle;
                const k = r.kernel || '';
                const match = k.match(/^(\d+\.\d+)/);
                if (!match) return;
                version = `Kernel ${match[1]}`;
            }
            if (!hwKey || hwKey.includes('Unknown') || score === null || isNaN(score)) return;
            if (!groups[hwKey]) groups[hwKey] = {};
            if (!groups[hwKey][version]) groups[hwKey][version] = { total: 0, count: 0 };
            groups[hwKey][version].total += score;
            groups[hwKey][version].count += 1;
        });

        const versionStats = {};
        let totalCompared = 0;
        const K = 5;
        Object.entries(groups).forEach(([hw, versions]) => {
            const verList = Object.keys(versions);
            if (verList.length < 2) return;
            totalCompared++;
            // per-hardware pooled mean for shrinkage estimator
            const verEntries = Object.entries(versions);
            const hwTotalRuns = verEntries.reduce((s, [, d]) => s + d.count, 0);
            const hwPooledMean = hwTotalRuns > 0
                ? verEntries.reduce((s, [ver, d]) => s + (ver !== 'N/D' ? d.total : 0), 0) / hwTotalRuns
                : 0;
            let bestVersion = null;
            let bestAdjusted = -Infinity;
            verEntries.forEach(([ver, vdata]) => {
                if (!versionStats[ver]) versionStats[ver] = { wins: 0, total: 0, count: 0 };
                versionStats[ver].total += vdata.total;
                versionStats[ver].count += vdata.count;
                const rawMean = vdata.total / vdata.count;
                const n = vdata.count;
                const shrinkage = K / (K + n);
                const adjusted = rawMean * (1 - shrinkage) + hwPooledMean * shrinkage;
                if (adjusted > bestAdjusted) {
                    bestAdjusted = adjusted;
                    bestVersion = ver;
                }
            });
            if (bestVersion) versionStats[bestVersion].wins += 1;
        });

        const entries = Object.entries(versionStats)
            .map(([name, s]) => ({ name, wins: s.wins, avg: Math.round(s.total / s.count), runs: s.count }))
            .sort((a, b) => b.wins - a.wins || b.avg - a.avg);

        if (entries.length === 0) return null;
        return {
            winner: entries[0],
            second: entries[1] || null,
            third: entries[2] || null,
            totalCompared
        };
    }

    function renderWinnerCard(result, type) {
        const nameEl = document.getElementById(type + '-winner-name');
        const statEl = document.getElementById(type + '-winner-stat');
        const secondEl = document.getElementById(type + '-second');
        const thirdEl = document.getElementById(type + '-third');
        if (!nameEl || !statEl) return;
        if (result && result.winner) {
            nameEl.textContent = result.winner.name;
            let text = `${result.winner.wins}/${result.totalCompared} hw wins at ${result.winner.avg.toLocaleString()} avg`;
            statEl.textContent = text;
            if (secondEl) secondEl.textContent = result.second ? `2º ${result.second.name}` : '2º -';
            if (thirdEl) thirdEl.textContent = result.third ? `3º ${result.third.name}` : '3º -';
        } else {
            nameEl.textContent = 'Insufficient data';
            statEl.textContent = '';
            if (secondEl) secondEl.textContent = '2º -';
            if (thirdEl) thirdEl.textContent = '3º -';
        }
    }

    const osScatterData = getOSvsHardwareScatterData(benchmarkData);
    lastSoftwareData.os = osScatterData;
    if (document.getElementById('osHardwareScatterChart')) {
        const vso = chartVizState.os;
        if (vso.mode === 'delta') {
            if (modelSelection.os && modelSelection.os.length >= 2) {
                renderSoftwareDeltaChart('os');
            }
        } else if (vso.normalize) {
            renderHardwareComparisonBars('osHardwareScatterChart', computeNormalizedData(osScatterData));
        } else {
            renderHardwareComparisonBars('osHardwareScatterChart', osScatterData);
        }
    }
    renderWinnerCard(getAbsoluteWinners(benchmarkData, 'os'), 'os');

    const mesaData = getDriverScatterData(benchmarkData, 'mesa');
    lastSoftwareData.mesa = mesaData;
    if (document.getElementById('mesaDriverScatterChart')) {
        const vsm = chartVizState.mesa;
        if (vsm.mode === 'delta') {
            if (modelSelection.mesa) {
                renderSoftwareDeltaChart('mesa');
            }
        } else if (vsm.normalize) {
            renderHardwareComparisonBars('mesaDriverScatterChart', computeNormalizedData(mesaData));
        } else {
            renderHardwareComparisonBars('mesaDriverScatterChart', mesaData);
        }
    }
    renderWinnerCard(getAbsoluteWinners(benchmarkData, 'mesa'), 'mesa');

    const nvidiaData = getDriverScatterData(benchmarkData, 'nvidia');
    lastSoftwareData.nvidia = nvidiaData;
    if (document.getElementById('nvidiaDriverScatterChart')) {
        const vsn = chartVizState.nvidia;
        if (vsn.mode === 'delta') {
            if (modelSelection.nvidia) {
                renderSoftwareDeltaChart('nvidia');
            }
        } else if (vsn.normalize) {
            renderHardwareComparisonBars('nvidiaDriverScatterChart', computeNormalizedData(nvidiaData));
        } else {
            renderHardwareComparisonBars('nvidiaDriverScatterChart', nvidiaData);
        }
    }
    renderWinnerCard(getAbsoluteWinners(benchmarkData, 'nvidia'), 'nvidia');

    const kernelData = getKernelScatterData(benchmarkData);
    lastSoftwareData.kernel = kernelData;
    if (document.getElementById('kernelScatterChart')) {
        const vsk = chartVizState.kernel;
        if (vsk.mode === 'delta') {
            if (modelSelection.kernel) {
                renderSoftwareDeltaChart('kernel');
            }
        } else if (vsk.normalize) {
            renderHardwareComparisonBars('kernelScatterChart', computeNormalizedData(kernelData));
        } else {
            renderHardwareComparisonBars('kernelScatterChart', kernelData);
        }
    }
    renderWinnerCard(getAbsoluteWinners(benchmarkData, 'kernel'), 'kernel');
    populateBaselineSelects();

    } catch(e) {
        console.error('Software comparison charts error:', e);
    }

    // System Tab charts
    renderSystemCharts();

    // Remove skeleton loaders after charts are rendered
    removeSkeletonLoading();

    // Initial tab state: show hardware after all charts rendered
    if (window.switchTab) window.switchTab('hardware');

    PILL_STATE.rendered.performance = true;
    renderStats('performance');
}

// ── Efficiency Chart Computations ──

function computeCpuEfficiency(data) {
    const map = {};
    data.forEach(r => {
        if (r.cpuSingle === null || r.cpuMaxFreq === null || r.cpuMaxFreq <= 0) return;
        const hwKey = normalizeCPU(r.cpu);
        if (!hwKey || hwKey === 'Unknown CPU') return;
        const userKey = r.user || 'Anonymous';
        const key = hwKey + '|' + userKey;
        const ratio = r.cpuSingle / r.cpuMaxFreq;
        if (!map[key] || ratio > map[key].ratio) map[key] = { name: hwKey, ratio, score: r.cpuSingle, freq: r.cpuMaxFreq, user: userKey, cid: r.clientId || '—' };
    });
    return Object.values(map).sort((a, b) => b.ratio - a.ratio);
}

function computeGpuEfficiency(data) {
    const map = {};
    data.forEach(r => {
        if (r.gpuScore === null || r.gpuMaxFreq === null || r.gpuMaxFreq <= 0) return;
        const hwKey = normalizeGPU(r.gpu);
        if (!hwKey || hwKey === 'Unknown GPU') return;
        const userKey = r.user || 'Anonymous';
        const key = hwKey + '|' + userKey;
        const ratio = r.gpuScore / r.gpuMaxFreq;
        if (!map[key] || ratio > map[key].ratio) map[key] = { name: hwKey, ratio, score: r.gpuScore, freq: r.gpuMaxFreq, user: userKey, cid: r.clientId || '—' };
    });
    return Object.values(map).sort((a, b) => b.ratio - a.ratio);
}

function computeThermalEfficiency(data) {
    const map = {};
    data.forEach(r => {
        if (r.mainScore === null || r.gpuTempDelta === null || r.gpuTempDelta <= 0) return;
        const hwKey = normalizeGPU(r.gpu) || 'Unknown GPU';
        const userKey = r.user || 'Anonymous';
        const key = hwKey + '|' + userKey;
        const ratio = r.mainScore / r.gpuTempDelta;
        if (!map[key] || ratio > map[key].ratio) map[key] = { name: hwKey, ratio, score: r.mainScore, temp: r.gpuTempDelta, user: userKey };
    });
    return Object.values(map).sort((a, b) => b.ratio - a.ratio);
}

function renderEfficiencyCharts() {
    const bm = filteredData.length ? filteredData : benchmarkData;

    // CPU Efficiency
    const cpuEff = computeCpuEfficiency(bm);
    if (document.getElementById('cpuEfficiencyChart')) {
        const labels = cpuEff.map(d => d.name);
        const values = cpuEff.map(d => Math.trunc(d.ratio * 100) / 100);
        makeChartScrollable('cpuEfficiencyChart', labels, values, 'Score / MHz',
            'rgba(99, 102, 241, 0.85)', '#818cf8', 10, undefined,
            cpuEff.map(d => d.user), null, true,
            cpuEff.map(d => d.freq), 'Freq', cpuEff.map(d => d.score), cpuEff.map(d => d.user));
        const topEl = document.getElementById('cpuEffTop');
        if (topEl) topEl.textContent = cpuEff.length > 0 ? '1º ' + cpuEff[0].name : '—';
    }

    // GPU Efficiency
    const gpuEff = computeGpuEfficiency(bm);
    if (document.getElementById('gpuEfficiencyChart')) {
        const labels = gpuEff.map(d => d.name);
        const values = gpuEff.map(d => Math.trunc(d.ratio * 100) / 100);
        makeChartScrollable('gpuEfficiencyChart', labels, values, 'Score / MHz',
            'rgba(16, 185, 129, 0.85)', '#10b981', 10, undefined,
            gpuEff.map(d => d.user), gpuEff.map(d => d.freq), true,
            null, null, gpuEff.map(d => d.score), gpuEff.map(d => d.user));
        const topEl = document.getElementById('gpuEffTop');
        if (topEl) topEl.textContent = gpuEff.length > 0 ? '1º ' + gpuEff[0].name : '—';
    }

    // Populate GPU select then render bottleneck chart
    const sel = document.getElementById('bottleneckGpuSelect');
    if (sel) {
        sel.innerHTML = '<option value="">All GPUs</option>';
        const gpuCounts = {};
        const valid = bm.filter(r => r.cpuMulti !== null && r.gpuScore !== null && r.gpuScore > 0 && r.cpuMulti > 0);
        valid.forEach(r => {
            const g = normalizeGPU(r.gpu) || 'Unknown';
            gpuCounts[g] = (gpuCounts[g] || 0) + 1;
        });
        const sorted = Object.entries(gpuCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
        sorted.forEach(([g]) => {
            const opt = document.createElement('option');
            opt.value = g;
            opt.textContent = g;
            sel.appendChild(opt);
        });
        sel.onchange = () => renderBottleneckChart(bm, sel.value);
    }
    renderBottleneckChart(bm, '');

    // Thermal Efficiency (moved from Thermals tab)
    const thermalEff = computeThermalEfficiency(bm);
    if (document.getElementById('thermalEfficiencyChart')) {
        const labels = thermalEff.map(d => d.name);
        const values = thermalEff.map(d => Math.trunc(d.ratio * 10) / 10);
        makeChartScrollable('thermalEfficiencyChart', labels, values, 'Score / °C',
            'rgba(239, 68, 68, 0.8)', '#ef4444', 10, undefined,
            thermalEff.map(d => `${d.name} | ${d.score} pts / ${d.temp}°C`), null, true);
        const topEl = document.getElementById('thermalEffTop');
        if (topEl) topEl.textContent = thermalEff.length > 0 ? `1º ${thermalEff[0].user || '—'} — ${thermalEff[0].name}` : '—';
    }

    // Top 10 CPU Bottlenecks (deduped by lowest ratio per user+hardware)
    renderTopCpuBottlenecks(bm);
}

const ratioPlugin = {
    id: 'ratioLine',
    afterDraw(chart) {
        if (chart.config.options.indexAxis !== 'y') return;
        const xs = chart.scales.x;
        if (!xs) return;
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data) return;

        const bx = xs.getPixelForValue(1);
        if (bx >= chart.chartArea.left && bx <= chart.chartArea.right) {
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([6, 4]);
            ctx.moveTo(bx, chart.chartArea.top);
            ctx.lineTo(bx, chart.chartArea.bottom);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('Balanced', bx + 6, chart.chartArea.top + 8);
            ctx.restore();
        }

        ctx.save();
        ctx.textBaseline = 'middle';
        meta.data.forEach((bar, i) => {
            const val = chart.data.datasets[0].data[i];
            const barW = bar.x - bar.base;
            if (barW < 30) return;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(val.toFixed(3), bar.x - 8, bar.y);
        });
        ctx.restore();
    }
};

function ratioColor(val) {
    return val < 0.95 ? 'rgba(239, 68, 68, 0.85)' :
           val > 1.05 ? 'rgba(59, 130, 246, 0.85)' :
           'rgba(16, 185, 129, 0.85)';
}

function renderBottleneckChart(data, selectedGpu) {
    const canvasId = 'bottleneckRatioChart';
    if (!document.getElementById(canvasId)) return;
    const pts = data.filter(r => r.cpuMulti !== null && r.gpuScore !== null && r.gpuScore > 0 && r.cpuMulti > 0 && (r.cpuMulti / r.gpuScore) >= 0.1 && (r.cpuMulti / r.gpuScore) <= 10);
    const topEl = document.getElementById('bottleneckRatioTop');

    if (!selectedGpu) {
        const gpuMap = {};
        pts.forEach(r => {
            const gpu = normalizeGPU(r.gpu) || 'Unknown';
            if (!gpuMap[gpu]) gpuMap[gpu] = { sum: 0, count: 0, cpus: new Set() };
            gpuMap[gpu].sum += r.cpuMulti / r.gpuScore;
            gpuMap[gpu].count++;
            gpuMap[gpu].cpus.add(normalizeCPU(r.cpu));
        });
        const items = Object.entries(gpuMap).map(([gpu, d]) => ({
            label: gpu,
            avgRatio: d.sum / d.count,
            count: d.count,
            cpus: [...d.cpus].join(', ')
        })).sort((a, b) => a.avgRatio - b.avgRatio).slice(0, 15);
        buildBottleneckChart(canvasId, items, 'GPU model');
        if (topEl) topEl.textContent = '';
    } else {
        const cpuMap = {};
        pts.filter(r => normalizeGPU(r.gpu) === selectedGpu).forEach(r => {
            const cpu = normalizeCPU(r.cpu) || 'Unknown CPU';
            if (!cpuMap[cpu]) cpuMap[cpu] = { sum: 0, count: 0, cpus: new Set() };
            cpuMap[cpu].sum += r.cpuMulti / r.gpuScore;
            cpuMap[cpu].count++;
            cpuMap[cpu].cpus.add(normalizeCPU(r.cpu));
        });
        const items = Object.entries(cpuMap).map(([cpu, d]) => ({
            label: cpu,
            avgRatio: d.sum / d.count,
            count: d.count,
            cpus: [...d.cpus].join(', ')
        })).sort((a, b) => a.avgRatio - b.avgRatio);
        buildBottleneckChart(canvasId, items, 'CPU model');
        if (topEl) topEl.textContent = items.length > 0 ? items[items.length - 1].label + ': ' + items[items.length - 1].avgRatio.toFixed(3) : '—';
    }
}

function buildBottleneckChart(canvasId, allItems, prefix, contributors) {
    const n = allItems.length;
    const cv = document.getElementById(canvasId);
    if (!cv) return;
    const container = cv.parentElement;
    if (container) container.style.height = '320px';
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    const VIS = 10;
    let startIdx = 0;
    const existingOverlay = container?.querySelector('.chart-scroll-overlay');
    if (existingOverlay) existingOverlay.remove();

    const rawMax = allItems.reduce((m, d) => Math.max(m, d.avgRatio), 0);
    const xMax = Math.max(1.5, rawMax * 1.15);

    function makeChart(items) {
        if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
        const labels = items.map(d => d.label);
        const values = items.map(d => d.avgRatio);
        const colors = items.map(d => ratioColor(d.avgRatio));
        chartInstances[canvasId] = new Chart(cv.getContext('2d'), {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.85', '1')),
                    borderWidth: 1.5,
                    borderRadius: 6,
                    borderSkipped: false,
                    barPercentage: 0.85,
                    contributors: contributors
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false, max: xMax, min: 0 },
                    y: { ticks: { color: '#9ca3af' }, grid: { display: false } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(11, 15, 25, 1)',
                        titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                        bodyFont: { family: "'Inter', sans-serif", size: 13 },
                        padding: 12,
                        borderColor: 'rgba(99, 102, 241, 0.45)',
                        borderWidth: 1.5,
                        cornerRadius: 10,
                        displayColors: false,
                        callbacks: {
                            title: tooltipItems => {
                                const d = allItems[startIdx + tooltipItems[0].dataIndex];
                                return d ? d.label : '';
                            },
                            label: ctx => {
                                const d = allItems[startIdx + ctx.dataIndex];
                                if (!d) return '';
                                const label = d.avgRatio < 0.95 ? 'CPU bottleneck' : d.avgRatio > 1.05 ? 'GPU bottleneck' : 'Balanced';
                                return `Ratio: ${d.avgRatio.toFixed(3)} (${label}) · ${d.count} run${d.count > 1 ? 's' : ''}`;
                            }
                        }
                    }
                }
            },
            plugins: [ratioPlugin]
        });
    }

    makeChart(allItems.slice(0, VIS));
    if (n <= VIS) return;

    container.style.position = 'relative';
    const overlay = document.createElement('div');
    overlay.className = 'chart-scroll-overlay';
    const spacer = document.createElement('div');
    const totalHeight = 320 + (n - VIS) * 36;
    spacer.style.height = `${totalHeight}px`;
    spacer.style.width = '1px';
    overlay.appendChild(spacer);
    container.appendChild(overlay);

    let wheelTarget = container.querySelector('canvas');
    if (!wheelTarget) wheelTarget = cv;
    wheelTarget.addEventListener('wheel', e => {
        if (n <= VIS) return;
        const prev = overlay.scrollTop;
        overlay.scrollTop += e.deltaY;
        if (overlay.scrollTop !== prev) e.preventDefault();
    }, { passive: false });

    overlay.onscroll = () => {
        const maxScroll = spacer.offsetHeight - overlay.clientHeight;
        const ratio = maxScroll > 0 ? overlay.scrollTop / maxScroll : 0;
        const newIdx = Math.round(ratio * (n - VIS));
        if (newIdx === startIdx) return;
        startIdx = newIdx;
        const s = allItems.slice(startIdx, startIdx + VIS);
        const chart = chartInstances[canvasId];
        if (!chart) return;
        chart.data.labels = s.map(d => d.label);
        chart.data.datasets[0].data = s.map(d => d.avgRatio);
        chart.data.datasets[0].backgroundColor = s.map(d => ratioColor(d.avgRatio));
        chart.data.datasets[0].borderColor = s.map(d => ratioColor(d.avgRatio).replace('0.85', '1'));
        chart.options.scales.x.max = xMax;
        chart.update('none');
    };
}

function dedupByLowestRatio(entries) {
    const map = {};
    entries.forEach(r => {
        const key = (r.user || 'Anonymous') + '|' + normalizeCPU(r.cpu) + '|' + normalizeGPU(r.gpu);
        const ratio = r.cpuMulti / r.gpuScore;
        if (!map[key] || ratio < map[key].ratio) map[key] = { run: r, ratio };
    });
    return Object.values(map).map(v => v.run);
}

function renderTopCpuBottlenecks(data) {
    const canvasId = 'topCpuBottleneckChart';
    if (!document.getElementById(canvasId)) return;
    const pts = dedupByLowestRatio(data.filter(r => r.cpuMulti !== null && r.gpuScore !== null && r.gpuScore > 0 && r.cpuMulti > 0 && (r.cpuMulti / r.gpuScore) >= 0.1 && (r.cpuMulti / r.gpuScore) <= 10));
    const top10 = pts.map(r => ({
        label: normalizeCPU(r.cpu) + ' + ' + normalizeGPU(r.gpu),
        avgRatio: r.cpuMulti / r.gpuScore,
        count: 1,
        cpus: normalizeCPU(r.cpu),
        contributor: getDisplayName(r)
    })).sort((a, b) => a.avgRatio - b.avgRatio).slice(0, 10);
    const runs = top10.map(r => ({ label: r.label, avgRatio: r.avgRatio, count: r.count, cpus: r.cpus }));
    const contributors = top10.map(r => r.contributor);
    buildBottleneckChart(canvasId, runs, 'CPU+GPU', contributors);
}

function renderThermalsCharts() {
    const bm = filteredData.length ? filteredData : benchmarkData;

    // Vendor temp charts (re-use existing helper functions)
    if (document.getElementById('hottestAmdChart')) renderVendorChartClosure('hottestAmdChart', 'amd', 'rgba(239, 68, 68, 0.8)', '#ef4444', bm);
    if (document.getElementById('hottestNvidiaChart')) renderVendorChartClosure('hottestNvidiaChart', 'nvidia', 'rgba(16, 185, 129, 0.8)', '#34d399', bm);
    if (document.getElementById('hottestIntelChart')) renderVendorChartClosure('hottestIntelChart', 'intel', 'rgba(99, 102, 241, 0.8)', '#818cf8', bm);

    // Portable thermal charts
    if (document.getElementById('portableNoteChart')) renderCatChartClosure('portableNoteChart', 'Notebook', 'rgba(245, 158, 11, 0.8)', '#fbbf24', bm);
    if (document.getElementById('portableHandChart')) renderCatChartClosure('portableHandChart', 'Handheld', 'rgba(249, 115, 22, 0.8)', '#f97316', bm);
    if (document.getElementById('portableSbcChart')) renderCatChartClosure('portableSbcChart', 'SBC', 'rgba(239, 68, 68, 0.8)', '#ef4444', bm);
}

function renderVendorChartClosure(canvasId, vendor, bgColor, borderColor, data) {
    if (!data) data = benchmarkData;
    if (!document.getElementById(canvasId)) return;
    const d = getVendorHottestRuns(data, vendor, 999, true);
    if (d.labels.length === 0) return;
    const VIS = 10;
    const allL = d.labels, allD = d.data, allC = d.clientIds, allF = d.gpuFreqs;
    const fixedMax = Math.max(...allD) + 5;
    renderHorizontalBarChart(canvasId, allL.slice(0, VIS), allD.slice(0, VIS), 'Max Temp °C',
        bgColor, borderColor, fixedMax, 0, allC.slice(0, VIS), null, null, null, null, allF.slice(0, VIS), null, null, true);
    const chart = chartInstances[canvasId];
    if (!chart) return;
    chart.data.datasets[0].dataLabelUnit = '°C';
    chart.data.datasets[0].rankOneIcon = '🔥';
    chart.data.datasets[0].rankOneLocalIdx = 0;
    chart.data.datasets[0].startIndex = 0;
    if (allL.length <= VIS) return;
    const parent = chart.canvas.parentElement;
    parent.style.position = 'relative';
    const overlay = document.createElement('div');
    overlay.className = 'chart-scroll-overlay';
    const spacer = document.createElement('div');
    spacer.style.height = `${320 + (allL.length - VIS) * 18}px`;
    overlay.appendChild(spacer);
    parent.appendChild(overlay);
    let lastIdx = 0;
    function updateChart(idx) {
        lastIdx = idx;
        chart.data.labels = allL.slice(idx, idx + VIS);
        chart.data.datasets[0].data = allD.slice(idx, idx + VIS);
        chart.data.datasets[0].clientIds = allC.slice(idx, idx + VIS);
        chart.data.datasets[0].gpuFreqs = allF.slice(idx, idx + VIS);
        chart.data.datasets[0].rankOneLocalIdx = idx === 0 ? 0 : -1;
        chart.data.datasets[0].startIndex = idx;
        chart.options.scales.x.max = fixedMax;
        chart.update('none');
    }
    overlay.onscroll = () => {
        const maxScroll = spacer.offsetHeight - overlay.clientHeight;
        const ratio = maxScroll > 0 ? overlay.scrollTop / maxScroll : 0;
        const newIdx = Math.round(ratio * (allL.length - VIS));
        if (newIdx !== lastIdx) updateChart(newIdx);
    };
    chart.update('none');
}

function renderCatChartClosure(canvasId, category, bgColor, borderColor, data) {
    if (!data) data = benchmarkData;
    if (!document.getElementById(canvasId)) return;
    const d = getCategoryHottestRuns(benchmarkData, category, 999);
    if (d.labels.length === 0) return;
    const VIS = 10;
    const allL = d.labels, allD = d.data, allC = d.clientIds, allF = d.gpuFreqs;
    const fixedMax = Math.max(...allD) + 5;
    renderHorizontalBarChart(canvasId, allL.slice(0, VIS), allD.slice(0, VIS), 'Max Temp °C',
        bgColor, borderColor, fixedMax, 0, allC.slice(0, VIS), null, null, null, null, allF.slice(0, VIS), null, null, true);
    const chart = chartInstances[canvasId];
    if (!chart) return;
    chart.data.datasets[0].dataLabelUnit = '°C';
    chart.data.datasets[0].rankOneIcon = '🔥';
    chart.data.datasets[0].rankOneLocalIdx = 0;
    chart.data.datasets[0].startIndex = 0;
    if (allL.length <= VIS) return;
    const parent = chart.canvas.parentElement;
    parent.style.position = 'relative';
    const overlay = document.createElement('div');
    overlay.className = 'chart-scroll-overlay';
    const spacer = document.createElement('div');
    spacer.style.height = `${320 + (allL.length - VIS) * 18}px`;
    overlay.appendChild(spacer);
    parent.appendChild(overlay);
    let lastIdx = 0;
    function updateChart(idx) {
        lastIdx = idx;
        chart.data.labels = allL.slice(idx, idx + VIS);
        chart.data.datasets[0].data = allD.slice(idx, idx + VIS);
        chart.data.datasets[0].clientIds = allC.slice(idx, idx + VIS);
        chart.data.datasets[0].gpuFreqs = allF.slice(idx, idx + VIS);
        chart.data.datasets[0].rankOneLocalIdx = idx === 0 ? 0 : -1;
        chart.data.datasets[0].startIndex = idx;
        chart.options.scales.x.max = fixedMax;
        chart.update('none');
    }
    overlay.onscroll = () => {
        const maxScroll = spacer.offsetHeight - overlay.clientHeight;
        const ratio = maxScroll > 0 ? overlay.scrollTop / maxScroll : 0;
        const newIdx = Math.round(ratio * (allL.length - VIS));
        if (newIdx !== lastIdx) updateChart(newIdx);
    };
    chart.update('none');
}

const CHART_PAGE_MAP = { osHardwareScatterChart: 'os', mesaDriverScatterChart: 'mesa', nvidiaDriverScatterChart: 'nvidia', kernelScatterChart: 'kernel' };
let chartPageState = { os: 0, mesa: 0, nvidia: 0, kernel: 0 };

// Grouped Horizontal Bars for Hardware Comparison
function renderHardwareComparisonBars(canvasId, scatterData) {
    if (!scatterData || !scatterData.points || scatterData.points.length === 0) return;
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isNormalized = scatterData.__normalized === true;
    const PER_PAGE = canvasId === 'osHardwareScatterChart' || canvasId === 'nvidiaDriverScatterChart' || canvasId === 'mesaDriverScatterChart' || canvasId === 'kernelScatterChart' ? 4 : 5;
    const key = CHART_PAGE_MAP[canvasId];
    const totalHw = scatterData.hwLabels.length;
    const page = Math.min(chartPageState[key] || 0, Math.max(0, Math.ceil(totalHw / PER_PAGE) - 1));
    chartPageState[key] = page;
    const labels = scatterData.hwLabels.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

    const verSet = new Set(scatterData.points.map(p => p.label || p.os || ''));
    const palettes = [
        'rgba(99, 102, 241, 0.85)', 'rgba(16, 185, 129, 0.85)',
        'rgba(245, 158, 11, 0.85)', 'rgba(14, 165, 233, 0.85)',
        'rgba(244, 63, 94, 0.85)', 'rgba(139, 92, 246, 0.85)',
        'rgba(6, 182, 212, 0.85)', 'rgba(236, 72, 153, 0.85)'
    ];
    const borders = [
        '#818cf8', '#34d399', '#fbbf24', '#38bdf8',
        '#fb7185', '#a78bfa', '#22d3ee', '#f472b6'
    ];

    const maxVersions = canvasId === 'nvidiaDriverScatterChart' ? 4 : 8;
    let versions = [...verSet];
    if (canvasId === 'nvidiaDriverScatterChart' || canvasId === 'osHardwareScatterChart' || canvasId === 'kernelScatterChart' || canvasId === 'mesaDriverScatterChart') {
        const isVerSort = canvasId === 'nvidiaDriverScatterChart' || canvasId === 'kernelScatterChart' || canvasId === 'mesaDriverScatterChart';
        versions = versions.map(v => {
            const coverage = labels.filter(hw =>
                scatterData.points.some(p => p.hardwareLabel === hw && (p.label || p.os || '') === v)
            ).length;
            return { v, coverage };
        })
            .filter(x => x.coverage > 0)
            .sort(isVerSort
                ? (a, b) => b.v.localeCompare(a.v, undefined, { numeric: true }) || (b.coverage - a.coverage)
                : (a, b) => b.coverage - a.coverage || (b.v.localeCompare(a.v, undefined, { numeric: true }))
            )
            .slice(0, maxVersions)
            .map(x => x.v);
    }
    const datasets = versions.map((ver, idx) => {
        const data = labels.map(hw => {
            const pts = scatterData.points.filter(p => p.hardwareLabel === hw && (p.label || p.os || '') === ver);
            if (pts.length === 0) return 0;
            return Math.round(pts.reduce((s, p) => s + p.y * (p.count || 1), 0) / pts.reduce((s, p) => s + (p.count || 1), 0));
        });
        const sampleCounts = labels.map(hw => {
            const pts = scatterData.points.filter(p => p.hardwareLabel === hw && (p.label || p.os || '') === ver);
            return pts.reduce((s, p) => s + (p.count || 1), 0);
        });
        return {
            label: ver,
            data: data,
            sampleCounts: sampleCounts,
            backgroundColor: palettes[idx % palettes.length],
            borderColor: borders[idx % borders.length],
            borderWidth: 1.5,
            borderRadius: 4,
            barPercentage: 0.7,
            categoryPercentage: 0.8
        };
    });

    const barLabelsPlugin = {
        id: 'barLabels',
        afterDatasetsDraw(chart) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                if (meta.hidden) return;
                meta.data.forEach((element, index) => {
                    const val = dataset.data[index];
                    if (!val || val === 0) return;
                    const width = Math.abs(element.x - element.base);
                    const count = dataset.sampleCounts ? dataset.sampleCounts[index] : 0;
                    const hasCount = count > 0;
                    const isHigh = hasCount && count >= 10;
                    const arrow = isHigh ? '\u2191' : (hasCount ? '\u2193' : '');
                    const prefix = arrow ? `${dataset.label} ` : `${dataset.label}`;
                    const full = arrow ? `${prefix}${arrow}` : prefix;
                    const leftX = width >= 70
                        ? element.base + width / 2 - ctx.measureText(full).width / 2
                        : element.x + 6;
                    ctx.fillStyle = 'rgba(255,255,255,0.85)';
                    ctx.fillText(prefix, leftX, element.y);
                    if (arrow) {
                        ctx.fillStyle = isHigh ? '#22c55e' : '#ef4444';
                        ctx.fillText(arrow, leftX + ctx.measureText(prefix).width, element.y);
                    }
                    if (isNormalized) {
                        const pct = `${val}%`;
                        ctx.font = '9px Inter, sans-serif';
                        const pctW = ctx.measureText(pct).width;
                        const pctX = width >= 60 ? element.x - pctW - 4 : element.x + 6;
                        const maxAtIdx = Math.max(...chart.data.datasets.map(ds => ds.data[index] || 0));
                        ctx.fillStyle = val === maxAtIdx ? '#fbbf24' : 'rgba(255,255,255,0.85)';
                        ctx.fillText(pct, pctX, element.y);
                        ctx.font = 'bold 10px Inter, sans-serif';
                    }
                });
            });
            ctx.restore();
        }
    };

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: !isNormalized, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 10 } } },
                y: { grid: { display: false }, ticks: { color: '#f3f4f6', font: { family: "'Outfit', sans-serif", size: 10, weight: 500 },
                    callback: function(v) { const lbl = this.getLabelForValue(v); return lbl.length > 25 ? lbl.substring(0, 25) + '...' : lbl; }
                }}
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)', titleFont: { family: "'Outfit', sans-serif", size: 12 }, bodyFont: { family: "'Inter', sans-serif", size: 12 },
                    padding: 10, borderColor: 'rgba(99, 102, 241, 0.45)', borderWidth: 1.5, cornerRadius: 10, displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const samples = context.dataset.sampleCounts ? context.dataset.sampleCounts[context.dataIndex] : 0;
                            const lines = [`${context.dataset.label}: ${context.parsed.x.toLocaleString()}`, `Samples: ${samples || 0}`];
                            if (samples > 0 && samples < 10) lines.push('⚠ low confidence');
                            return lines;
                        }
                    }
                }
            }
        },
        plugins: [barLabelsPlugin]
    });

    chartInstances[canvasId].__scatterData = scatterData;

    // Pagination controls
    const chartArea = canvas.parentElement;
    const headerEl = chartArea.closest('.chart-container-wrapper')?.querySelector('.chart-header');
    let pagEl = document.getElementById(`pag-${canvasId}`);
    if (!pagEl && headerEl) {
        pagEl = document.createElement('div');
        pagEl.id = `pag-${canvasId}`;
        pagEl.className = 'chart-pagination';
        pagEl.addEventListener('click', function(e) {
            const btn = e.target.closest('.pag-btn');
            if (!btn || btn.classList.contains('pag-disabled')) return;
            const k = CHART_PAGE_MAP[canvasId];
            chartPageState[k] += (btn.dataset.dir === 'prev' ? -1 : 1);
            const sd = chartInstances[canvasId] && chartInstances[canvasId].__scatterData;
            if (sd) renderHardwareComparisonBars(canvasId, sd);
        });
        chartArea.appendChild(pagEl);
    }
    const totalPages = Math.ceil(totalHw / PER_PAGE);
    if (totalPages <= 1) { pagEl.style.display = 'none'; return; }
    pagEl.style.display = 'flex';
    pagEl.innerHTML = `
        <button class="pag-btn ${page <= 0 ? 'pag-disabled' : ''}" data-dir="prev">‹</button>
        <span class="pag-info">${page + 1}/${totalPages}</span>
        <button class="pag-btn ${page >= totalPages - 1 ? 'pag-disabled' : ''}" data-dir="next">›</button>
    `;
}

// OS vs Hardware Scatter Data Aggregation
function getOSvsHardwareScatterData(data, maxHardware = 40, minSamples = 3) {
    const groups = {};
    data.forEach(r => {
        const cpuKey = normalizeCPU(r.cpu);
        const gpuKey = normalizeGPU(r.gpu);
        if (!cpuKey || cpuKey.trim() === '' || cpuKey === 'Unknown CPU' || cpuKey === 'N/D') return;
        if (!gpuKey || gpuKey.trim() === '' || gpuKey === 'Unknown GPU' || gpuKey === 'N/D') return;
        const key = `${cpuKey} + ${gpuKey}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
    });

    const sorted = Object.entries(groups)
        .filter(([, runs]) => {
            if (runs.length < minSamples) return false;
            const osSet = new Set(runs.map(r => r.os));
            return osSet.size >= 2;
        })
        .sort((a, b) => {
            const avgA = a[1].reduce((s, r) => s + (cleanNumber(r.mainScore) || 0), 0) / (a[1].length || 1);
            const avgB = b[1].reduce((s, r) => s + (cleanNumber(r.mainScore) || 0), 0) / (b[1].length || 1);
            return avgB - avgA;
        })
        .slice(0, maxHardware);

    const points = [];
    sorted.forEach(([hwLabel, runs], hwIndex) => {
        const osGroups = {};
        runs.forEach(r => {
            const score = cleanNumber(r.mainScore);
            if (score === null) return;
            const osKey = r.os || 'Other';
            if (!osGroups[osKey]) osGroups[osKey] = [];
            osGroups[osKey].push({ score, run: r });
        });
        Object.entries(osGroups).forEach(([osName, entries]) => {
            const avgScore = Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length);
            const bestRun = entries.reduce((best, e) => e.score > best.score ? e : best, entries[0]).run;
            points.push({
                x: hwIndex,
                y: avgScore,
                label: osName,
                os: osName,
                user: bestRun.user,
                clientId: bestRun.clientId,
                kernel: bestRun.kernel,
                driver: bestRun.driver,
                hardwareLabel: hwLabel,
                count: entries.length
            });
        });
    });

    const hwLabels = sorted.map(([label]) => label);
    return { points, hwLabels };
}

// Kernel vs CPU Score Scatter Data
function getKernelScatterData(data, maxHardware = 40, minSamples = 2) {
    const groups = {};
    data.forEach(r => {
        const k = r.kernel || '';
        const match = k.match(/^(\d+\.\d+)/);
        if (!match) return;
        const version = match[1];
        const key = normalizeCPU(r.cpu);
        if (!key || key.trim() === '' || key === 'Unknown CPU' || key === 'N/D') return;
        if (!groups[key]) groups[key] = [];
        groups[key].push({ ...r, _kernelVer: version });
    });

    const hardwareRuns = Object.entries(groups)
        .filter(([, runs]) => {
            if (runs.length < minSamples) return false;
            const verSet = new Set(runs.map(r => r._kernelVer));
            return verSet.size >= 2;
        })
        .sort((a, b) => {
            const avgA = a[1].reduce((s, r) => s + (cleanNumber(r.cpuSingle) || 0), 0) / (a[1].length || 1);
            const avgB = b[1].reduce((s, r) => s + (cleanNumber(r.cpuSingle) || 0), 0) / (b[1].length || 1);
            return avgB - avgA;
        })
        .slice(0, maxHardware);

    const points = [];
    hardwareRuns.forEach(([hwLabel, runs], hwIndex) => {
        const verGroups = {};
        runs.forEach(r => {
            const score = cleanNumber(r.cpuSingle);
            if (score === null) return;
            if (!verGroups[r._kernelVer]) verGroups[r._kernelVer] = [];
            verGroups[r._kernelVer].push({ score, run: r });
        });
        Object.entries(verGroups).forEach(([ver, entries]) => {
            const avgScore = Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length);
            const bestRun = entries.reduce((best, e) => e.score > best.score ? e : best, entries[0]).run;
            points.push({
                x: hwIndex,
                y: avgScore,
                label: `Kernel ${ver}`,
                user: bestRun.user,
                clientId: bestRun.clientId,
                hardwareLabel: hwLabel,
                count: entries.length
            });
        });
    });

    const hwLabels = hardwareRuns.map(([label]) => label);
    return { points, hwLabels };
}

// Driver vs Hardware Scatter Data — GPU model × GPU Score per driver version
function getDriverScatterData(data, driverType, maxHardware = 40, minSamples = 2) {
    const groups = {};
    data.forEach(r => {
        let version = null;
        if (driverType === 'mesa') {
            const d = r.driver || '';
            const match = d.match(/Mesa\s+(\d+\.\d+)(?:\.(\d+))?/i);
            if (match) version = match[2] === '99' ? `${match[1]} (mesa-git)` : match[1];
        } else if (driverType === 'nvidia') {
            const d = r.driver || '';
            if (d.includes('NVRM') || d.includes('NVIDIA')) {
                const match = d.match(/(?:NVRM|NVIDIA).*?(\d+\.\d+)/i);
                if (match) version = match[1];
            }
        }
        if (!version) return;
        const key = normalizeGPU(r.gpu);
        if (!key || key.trim() === '' || key === 'Unknown GPU' || key === 'N/D') return;
        if (!groups[key]) groups[key] = [];
        groups[key].push({ ...r, _driverVer: version });
    });

    const hardwareRuns = Object.entries(groups)
        .filter(([, runs]) => {
            if (runs.length < minSamples) return false;
            const verSet = new Set(runs.map(r => r._driverVer));
            return verSet.size >= 2;
        })
        .sort((a, b) => {
            const avgA = a[1].reduce((s, r) => s + (cleanNumber(r.gpuScore) || 0), 0) / (a[1].length || 1);
            const avgB = b[1].reduce((s, r) => s + (cleanNumber(r.gpuScore) || 0), 0) / (b[1].length || 1);
            return avgB - avgA;
        })
        .slice(0, maxHardware);

    const points = [];
    hardwareRuns.forEach(([hwLabel, runs], hwIndex) => {
        const verGroups = {};
        runs.forEach(r => {
            const score = cleanNumber(r.gpuScore);
            if (score === null) return;
            if (!verGroups[r._driverVer]) verGroups[r._driverVer] = [];
            verGroups[r._driverVer].push({ score, run: r });
        });
        Object.entries(verGroups).forEach(([ver, entries]) => {
            const avgScore = Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length);
            const bestRun = entries.reduce((best, e) => e.score > best.score ? e : best, entries[0]).run;
            points.push({
                x: hwIndex,
                y: avgScore,
                label: ver,
                user: bestRun.user,
                clientId: bestRun.clientId,
                hardwareLabel: hwLabel,
                count: entries.length
            });
        });
    });

    const hwLabels = hardwareRuns.map(([label]) => label);
    return { points, hwLabels };
}

// Generic scatter renderer for driver comparisons
function renderDriverScatterChart(canvasId, data, title, yLabel = 'GPU Score') {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const groups = {};
    data.points.forEach(p => {
        if (!groups[p.label]) groups[p.label] = [];
        groups[p.label].push(p);
    });

    const labels = Object.keys(groups).sort();
    const colorMap = generateDistinctColors(labels);

    const datasets = Object.entries(groups).map(([label, pts]) => {
        const color = colorMap[label];
        return {
            label: label,
            data: pts.map(p => ({ x: p.x, y: p.y })),
            backgroundColor: color.bg,
            borderColor: color.border,
            borderWidth: 1.5,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHitRadius: 10,
            _points: pts
        };
    });

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 10 },
                        padding: 10,
                        boxWidth: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    borderColor: 'rgba(99, 102, 241, 0.45)',
                    borderWidth: 1.5,
                    cornerRadius: 10,
                    callbacks: {
                        title: function(items) {
                            const p = items[0];
                            const pts = p.dataset._points;
                            if (pts && pts[p.dataIndex]) return pts[p.dataIndex].hardwareLabel;
                            return '';
                        },
                        label: function(context) {
                            const pts = context.dataset._points;
                            if (!pts || !pts[context.dataIndex]) return '';
                            const p = pts[context.dataIndex];
                            const lines = [
                                `${title}: ${p.label}`,
                                `Avg Score: ${p.y.toLocaleString()}`,
                                `Samples: ${p.count || 1}`
                            ];
                            if (p.clientId && p.clientId !== 'N/D') {
                                lines.push(`Client: ${getDisplayName(p)}`);
                            }
                            return lines;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    offset: true,
                    min: -0.5,
                    max: data.hwLabels.length - 0.5,
                    grid: { color: 'rgba(255, 255, 255, 0.05)', tickBorderDash: [3, 3] },
                    ticks: {
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 10 },
                        stepSize: 1,
                        callback: function(value) {
                            const idx = Math.round(value);
                            if (idx >= 0 && idx < data.hwLabels.length) {
                                const label = data.hwLabels[idx];
                                return label.length > 22 ? label.substring(0, 22) + '...' : label;
                            }
                            return '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Hardware',
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 12 }
                    }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)', tickBorderDash: [3, 3] },
                    ticks: {
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 10 },
                        callback: function(value) { return value.toLocaleString(); }
                    },
                    title: {
                        display: true,
                        text: yLabel,
                        color: '#9ca3af',
                        font: { family: "'Inter', sans-serif", size: 12 }
                    }
                }
            }
        }
    });
}

// Horizontal Bar Chart Renderer
function renderHorizontalBarChart(canvasId, labels, data, datasetLabel, barColor, borderColor, xMax, xMin, clientIds, cpus, gpus, freqs, freqLabel, gpuFreqs, percentages, normalize, showDataLabels, centerScore, barClientIds) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    if (normalize && data && data.length > 0) {
        const maxVal = Math.max(...data);
        if (maxVal > 0) {
            data = data.map(v => (v / maxVal) * 100);
            percentages = data;
        }
        xMin = undefined;
        xMax = undefined;
    }
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Chart configurations
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: barColor,
                borderColor: borderColor,
                borderWidth: 1.5,
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.85,
                clientIds: clientIds,
                barClientIds: barClientIds,
                cpus: cpus,
                gpus: gpus,
                freqs: freqs,
                freqLabel: freqLabel,
                gpuFreqs: gpuFreqs,
                percentages: percentages,
                normalize: normalize,
                showDataLabels: showDataLabels,
                centerScore: centerScore,
                rankOneLocalIdx: showDataLabels ? 0 : -1,
                rankOneIcon: showDataLabels ? '🏆' : '',
                startIndex: 0
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { 
                padding: showDataLabels 
                    ? { 
                        right: (barClientIds || clientIds) && (barClientIds || clientIds).some(cid => cid) 
                            ? 120
                            : 10
                      } 
                    : { right: 4 } 
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: {
                        family: "'Outfit', sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Inter', sans-serif",
                        size: 13
                    },
                    padding: 12,
                    borderColor: 'rgba(99, 102, 241, 0.45)',
                    borderWidth: 1.5,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const val = context.parsed.x;
                            const lines = context.dataset.normalize
                                ? [`${val.toFixed(1)}%`]
                                : [`${context.dataset.label}: ${val.toLocaleString()}`];
                            const label = context.chart.data.labels[context.dataIndex];
                            if (context.dataset.showDataLabels && label) {
                                lines.unshift(label);
                            }
                            const freq = context.dataset.freqs && context.dataset.freqs[context.dataIndex];
                            if (freq) {
                                const fl = context.dataset.freqLabel || 'CPU Max Freq';
                                lines.push(`${fl}: ${freq.toLocaleString()} MHz`);
                            }
                            const gpuFreq = context.dataset.gpuFreqs && context.dataset.gpuFreqs[context.dataIndex];
                            if (gpuFreq) {
                                lines.push(`GPU Max Freq: ${gpuFreq.toLocaleString()} MHz`);
                            }
                            if (context.dataset.cpus && context.dataset.cpus[context.dataIndex]) {
                                lines.push(`CPU: ${context.dataset.cpus[context.dataIndex]}`);
                            }
                            if (context.dataset.gpus && context.dataset.gpus[context.dataIndex]) {
                                lines.push(`GPU: ${context.dataset.gpus[context.dataIndex]}`);
                            }
                            const cid = context.dataset.barClientIds && context.dataset.barClientIds[context.dataIndex]
                                ? context.dataset.barClientIds[context.dataIndex]
                                : context.dataset.clientIds && context.dataset.clientIds[context.dataIndex];
                            if (cid) {
                                lines.push(`Client: ${cid}`);
                            }
                            return lines;
                        }
                    }
                }
            },
            scales: {
                x: {
                    max: xMax,
                    min: xMin !== undefined ? xMin : 0,
                    display: true,
                    grid: {
                        display: !percentages && !showDataLabels,
                        drawBorder: !percentages && !showDataLabels,
                        color: 'rgba(255, 255, 255, 0.05)',
                        tickBorderDash: [3, 3]
                    },
                    ticks: {
                        display: !percentages && !showDataLabels,
                        color: '#9ca3af',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        display: false // Hide Y axis grid lines
                    },
                    ticks: {
                        color: '#f3f4f6',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 11,
                            weight: 500
                        },
                        // Truncate long hardware names; support multi-line via \n
                        callback: function(value) {
                            const label = this.getLabelForValue(value);
                            if (label.includes('\n')) {
                                const lines = label.split('\n');
                                return lines.map(l => l.length > 30 ? l.substring(0, 30) + '...' : l);
                            }
                            return label.length > 30 ? label.substring(0, 30) + '...' : label;
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'barLabels',
            afterDatasetsDraw(chart) {
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.data) return;
                const c = chart.ctx;
                c.save();
                const vals = chart.data.datasets[0].data;
                const percentages = chart.data.datasets[0].percentages || chart._pctLabels;

                if (percentages) {
                    c.textAlign = 'right';
                    c.textBaseline = 'middle';
                    const maxPct = Math.max(...percentages);
                    const icon = chart.data.datasets[0].rankOneIcon || '';
                    const startIndex = chart.data.datasets[0].startIndex || 0;
                    const xScale = chart.scales.x;
                    const baseX = xScale.getPixelForValue(xScale.min || 0);
                    
                    meta.data.forEach((bar, i) => {
                        if (bar.x < 1 || bar.height < 1) return;
                        const pct = percentages[i];
                        const isMax = pct === maxPct;
                        c.font = isMax ? 'bold 14px Inter, sans-serif' : '600 12px Inter, sans-serif';
                        c.fillStyle = '#ffffff';
                        
                        const absoluteRank = startIndex + i + 1;
                        let displayIcon = '';
                        if (icon === '🏆') {
                            if (absoluteRank === 1) displayIcon = '🏆';
                            else if (absoluteRank === 2) displayIcon = '🥈';
                            else if (absoluteRank === 3) displayIcon = '🥉';
                        } else if (absoluteRank === 1) {
                            displayIcon = icon;
                        }
                        
                        const label = `${pct.toFixed(1)}%`;
                        const scoreText = displayIcon ? displayIcon + '  ' + label : label;
                        const scoreWidth = c.measureText(scoreText).width;
                        const barW = bar.x - baseX;
                        const drawScoreInside = barW >= (scoreWidth + 12);
                        
                        if (drawScoreInside) {
                            c.textAlign = 'right';
                            c.fillText(scoreText, bar.x - 6, bar.y);
                        } else {
                            c.textAlign = 'left';
                            c.fillText(scoreText, bar.x + 6, bar.y);
                        }
                    });
                } else if (chart.data.datasets[0].showDataLabels) {
                    c.textBaseline = 'middle';
                    c.fillStyle = '#ffffff';
                    const labelUnit = chart.data.datasets[0].dataLabelUnit || '';
                    const gpuFreqs = chart.data.datasets[0].gpuFreqs;
                    const xScale = chart.scales.x;
                    const baseX = xScale.getPixelForValue(xScale.min || 0);
                    meta.data.forEach((bar, i) => {
                        if (bar.x < 1 || bar.height < 1) return;
                        
                        const label = `${vals[i].toLocaleString()}${labelUnit}`;
                        const icon = chart.data.datasets[0].rankOneIcon || '';
                        const startIndex = chart.data.datasets[0].startIndex || 0;
                        const absoluteRank = startIndex + i + 1;
                        
                        let displayIcon = '';
                        if (icon === '🏆') {
                            if (absoluteRank === 1) displayIcon = '🏆';
                            else if (absoluteRank === 2) displayIcon = '🥈';
                            else if (absoluteRank === 3) displayIcon = '🥉';
                        } else if (absoluteRank === 1) {
                            displayIcon = icon;
                        }
                        
                        const scoreText = displayIcon ? displayIcon + '  ' + label : label;
                        c.font = '12px Inter, sans-serif';
                        const scoreWidth = c.measureText(scoreText).width;
                        const barW = bar.x - baseX;
                        
                        const drawScoreInside = barW >= (scoreWidth + 16);
                        
                        if (drawScoreInside) {
                            c.font = '12px Inter, sans-serif';
                            c.textAlign = 'right';
                            c.fillStyle = '#ffffff';
                            c.fillText(scoreText, bar.x - 8, bar.y);
                        } else {
                            c.font = '12px Inter, sans-serif';
                            c.textAlign = 'left';
                            c.fillStyle = '#ffffff';
                            c.fillText(scoreText, bar.x + 6, bar.y);
                        }
                        
                        const gpuFreq = gpuFreqs && gpuFreqs[i];
                        const cpuFreq = chart.data.datasets[0].freqs && chart.data.datasets[0].freqs[i];
                        const centerFreq = gpuFreq || cpuFreq;
                        const centerScore = chart.data.datasets[0].centerScore && chart.data.datasets[0].centerScore[i];
                        if (drawScoreInside) {
                            const centerX = (baseX + bar.x) / 2;
                            c.font = '10px Inter, sans-serif';
                            c.textAlign = 'center';
                            c.fillStyle = '#ffffff';
                            if (barW > 60) {
                                const centerText = centerScore && centerFreq
                                    ? `${centerScore.toLocaleString()} / ${centerFreq.toLocaleString()} MHz`
                                    : centerFreq
                                        ? `${centerFreq.toLocaleString()} MHz`
                                        : '';
                                if (centerText) c.fillText(centerText, centerX, bar.y);
                            }
                        }
                        if (chart.data.datasets[0].barClientIds || chart.data.datasets[0].clientIds) {
                            const barIds = chart.data.datasets[0].barClientIds || chart.data.datasets[0].clientIds;
                            c.font = '10px Inter, sans-serif';
                            c.textAlign = 'left';
                            c.fillStyle = 'rgba(255,255,255,0.7)';
                            const isMobileChart = canvasId.toLowerCase().includes('notebook') || canvasId.toLowerCase().includes('handheld') || canvasId.toLowerCase().includes('sbc');
                            const maxLen = isMobileChart ? 10 : 16;
                            const contributorText = (barIds[i] || '').substring(0, maxLen);
                            
                            if (drawScoreInside) {
                                c.fillText(contributorText, bar.x + 4, bar.y);
                            } else {
                                c.fillText(contributorText, bar.x + 6 + scoreWidth + 8, bar.y);
                            }
                        }
                    });
                } else {
                    const freqs = chart.data.datasets[0].freqs;
                    if (!freqs) { c.restore(); return; }
                    c.font = 'bold 10px Inter, sans-serif';
                    c.textAlign = 'center';
                    c.textBaseline = 'middle';
                    const xScale = chart.scales.x;
                    const baseVal = xScale.min || 0;
                    const gpuFreqs = chart.data.datasets[0].gpuFreqs;
                    meta.data.forEach((bar, i) => {
                        const freq = freqs[i];
                        if (bar.x < 1 || bar.height < 1) return;
                        const midVal = (vals[i] + baseVal) / 2;
                        const midX = xScale.getPixelForValue(midVal);
                        const gpuFreq = gpuFreqs ? gpuFreqs[i] : null;
                        if (gpuFreq) {
                            c.fillStyle = 'rgba(100,200,255,0.9)';
                            const cpuLabel = freq ? `${freq}` : '';
                            const gpuLabel = `GPU: ${gpuFreq} MHz`;
                            const full = cpuLabel ? `${cpuLabel} / ${gpuLabel}` : gpuLabel;
                            c.fillText(full, midX, bar.y);
                        } else if (freq) {
                            c.fillStyle = 'rgba(255,255,255,0.85)';
                            c.fillText(`${freq} MHz`, midX, bar.y);
                        }
                    });
                }
                c.restore();
            }
        }]
    });
    if (percentages) {
        chartInstances[canvasId]._pctLabels = percentages;
    }
}

// Make a Horizontal Bar Chart scrollable by dynamically swapping visible data on scroll
function makeChartScrollable(canvasId, allLabels, allData, datasetLabel, barColor, borderColor, visibleCount = 10, normalize, clientIds, gpuFreqs, showDataLabels, freqs, freqLabel, centerScore, barClientIds) {
    // Pre-normalize data upfront so scroll updates use same scaled values
    if (normalize && allData.length > 0) {
        const maxVal = Math.max(...allData);
        if (maxVal > 0) {
            allData = allData.map(v => (v / maxVal) * 100);
        }
    }
    
    // Initial slice to render the first few bars
    const initialLabels = allLabels.slice(0, visibleCount);
    const initialData = allData.slice(0, visibleCount);
    
    // Find the maximum value in the entire dataset to lock the X-axis scale
    const xMax = allData.length > 0 ? Math.max(...allData) : undefined;
    
    renderHorizontalBarChart(canvasId, initialLabels, initialData, datasetLabel, barColor, borderColor, xMax, undefined, clientIds, undefined, undefined, freqs, freqLabel, gpuFreqs, normalize ? initialData : undefined, undefined, showDataLabels, centerScore, barClientIds);
    
    const chart = chartInstances[canvasId];
    if (!chart) return;
    
    const canvas = document.getElementById(canvasId);
    const parent = canvas.parentElement;
    if (!parent) return;
    
    // Ensure parent has relative positioning to contain the absolute overlay
    parent.style.position = 'relative';
    
    // Remove existing scrollbar overlay if any (to prevent duplicates on re-renders)
    const existingOverlay = parent.querySelector('.chart-scroll-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // If the total items are less than or equal to visibleCount, we don't need scrollbar
    if (allLabels.length <= visibleCount) return;
    
    // Create scrollbar overlay
    const overlay = document.createElement('div');
    overlay.className = 'chart-scroll-overlay';
    
    // Create spacer inside the overlay to represent total scrollable size
    const spacer = document.createElement('div');
    const totalHeight = 320 + (allLabels.length - visibleCount) * 18; // 18px per hidden item
    spacer.style.height = `${totalHeight}px`;
    spacer.style.width = '1px';
    overlay.appendChild(spacer);
    parent.appendChild(overlay);
    
    let lastIndex = 0;
    const updateVisibleData = () => {
        const scrollTop = overlay.scrollTop;
        const maxScroll = overlay.scrollHeight - overlay.clientHeight;
        if (maxScroll <= 0) return;
        
        const scrollPercent = scrollTop / maxScroll;
        const maxStartIndex = allLabels.length - visibleCount;
        const startIndex = Math.min(maxStartIndex, Math.max(0, Math.round(scrollPercent * maxStartIndex)));
        
        if (startIndex !== lastIndex) {
            lastIndex = startIndex;
            
            const newLabels = allLabels.slice(startIndex, startIndex + visibleCount);
            const newData = allData.slice(startIndex, startIndex + visibleCount);

            if (xMax !== undefined && !normalize) {
                chart.options.scales.x.max = xMax;
            }

            chart.data.labels = newLabels;
            chart.data.datasets[0].data = newData;
            if (clientIds) chart.data.datasets[0].clientIds = clientIds.slice(startIndex, startIndex + visibleCount);
            if (freqs) chart.data.datasets[0].freqs = freqs.slice(startIndex, startIndex + visibleCount);
            if (centerScore) chart.data.datasets[0].centerScore = centerScore.slice(startIndex, startIndex + visibleCount);
            if (barClientIds) chart.data.datasets[0].barClientIds = barClientIds.slice(startIndex, startIndex + visibleCount);
            if (gpuFreqs) chart.data.datasets[0].gpuFreqs = gpuFreqs.slice(startIndex, startIndex + visibleCount);
            if (showDataLabels) chart.data.datasets[0].rankOneLocalIdx = startIndex === 0 ? 0 : -1;
            chart.data.datasets[0].startIndex = startIndex;
            if (normalize) {
                chart.data.datasets[0].percentages = newData;
                chart._pctLabels = newData;
            }
            chart.update('none'); // Update without animation for buttery smooth scrolling
        }
    };
    
    overlay.onscroll = updateVisibleData;
    
    // Allow wheel scrolling on the canvas to scroll the overlay
    canvas.onwheel = (e) => {
        e.preventDefault();
        overlay.scrollTop += e.deltaY;
    };

    // Force re-render: ensures Chart.js scale layout is finalized so
    // afterDraw plugin gets valid bar.x positions for percentage labels
    chart.update('none');
}

// Render Grouped Vertical Bar Chart
function renderGroupedBarChart(canvasId, labels, datasets) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#f3f4f6',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        boxWidth: 12,
                        padding: 10
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: {
                        family: "'Outfit', sans-serif",
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Inter', sans-serif",
                        size: 13
                    },
                    padding: 12,
                    borderColor: 'rgba(99, 102, 241, 0.45)',
                    borderWidth: 1.5,
                    cornerRadius: 10
                }
            }
        }
    });
}

// Show Error state in table
function showError(message) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = `
        <tr>
            <td colspan="12" style="text-align: center; padding: 3rem; color: var(--warning);">
                <i data-lucide="alert-triangle" style="width: 24px; height: 24px; margin: 0 auto 0.5rem; display: block;"></i>
                <p>${message}</p>
            </td>
        </tr>
    `;
    lucide.createIcons();
}

// Animated Counter — animates a stat value from 0 to target
function animateCounter(elementId, targetValue, useLocaleFormat = false) {
    const el = document.getElementById(elementId);
    if (!el) return '';
    if (targetValue === 0 || targetValue === null || targetValue === undefined) {
        el.textContent = '-';
        return '-';
    }
    const existing = el.dataset.counterTarget;
    if (existing && Number(existing) === targetValue) return el.textContent;
    el.dataset.counterTarget = targetValue;

    const current = parseFloat(el.textContent?.replace(/[^0-9.]/g, '')) || 0;
    if (current === targetValue) return el.textContent;

    const duration = 1000;
    const start = performance.now();

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(current + (targetValue - current) * eased);
        el.textContent = useLocaleFormat ? val.toLocaleString() : val;
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = useLocaleFormat ? targetValue.toLocaleString() : targetValue;
        }
    }

    requestAnimationFrame(step);
    return useLocaleFormat ? targetValue.toLocaleString() : targetValue;
}

// Scroll Observers: nav active state + scroll reveal
function initScrollObservers() {
    const sectionIds = ['section-highest', 'section-demographics', 'section-advanced', 'section-software', 'section-portable', 'section-community'];

    // Nav active state
    const navPills = document.querySelectorAll('.nav-pill');
    if (navPills.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id.replace('section-', '');
                    navPills.forEach(pill => {
                        pill.classList.toggle('active', pill.dataset.section === sectionName);
                    });
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) navObserver.observe(el);
        });
    }

    // Scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.stat-card, .section-header, .chart-container-wrapper, .section-insight').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// Back to Top button
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Skeleton Loading
function initSkeletonLoading() {
    document.querySelectorAll('.chart-canvas-area').forEach(area => {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.style.position = 'absolute';
        skeleton.style.inset = '0';
        skeleton.style.zIndex = '1';
        area.style.position = area.style.position || 'relative';
        area.appendChild(skeleton);
    });
}

function removeSkeletonLoading() {
    document.querySelectorAll('.chart-canvas-area .skeleton').forEach(s => s.remove());
}


// Render all Software Comparison charts respecting vizState
function renderSoftwareCharts() {
    if (!benchmarkData || benchmarkData.length === 0) return;

    chartPageState = { os: 0, mesa: 0, nvidia: 0, kernel: 0 };

    ['osHardwareScatterChart', 'mesaDriverScatterChart', 'nvidiaDriverScatterChart', 'kernelScatterChart'].forEach(id => {
        if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
    });

    const osScatterData = getOSvsHardwareScatterData(benchmarkData);
    lastSoftwareData.os = osScatterData;
    if (document.getElementById('osHardwareScatterChart')) {
        const vso = chartVizState.os;
        if (vso.mode === 'delta') {
            if (modelSelection.os && modelSelection.os.length >= 2) {
                renderSoftwareDeltaChart('os');
            }
        } else if (vso.normalize) {
            renderHardwareComparisonBars('osHardwareScatterChart', computeNormalizedData(osScatterData));
        } else {
            renderHardwareComparisonBars('osHardwareScatterChart', osScatterData);
        }
    }

    const mesaData = getDriverScatterData(benchmarkData, 'mesa');
    lastSoftwareData.mesa = mesaData;
    if (document.getElementById('mesaDriverScatterChart')) {
        const vsm = chartVizState.mesa;
        if (vsm.mode === 'delta') {
            if (modelSelection.mesa) {
                renderSoftwareDeltaChart('mesa');
            }
        } else if (vsm.normalize) {
            renderHardwareComparisonBars('mesaDriverScatterChart', computeNormalizedData(mesaData));
        } else {
            renderHardwareComparisonBars('mesaDriverScatterChart', mesaData);
        }
    }

    const nvidiaData = getDriverScatterData(benchmarkData, 'nvidia');
    lastSoftwareData.nvidia = nvidiaData;
    if (document.getElementById('nvidiaDriverScatterChart')) {
        const vsn = chartVizState.nvidia;
        if (vsn.mode === 'delta') {
            if (modelSelection.nvidia) {
                renderSoftwareDeltaChart('nvidia');
            }
        } else if (vsn.normalize) {
            renderHardwareComparisonBars('nvidiaDriverScatterChart', computeNormalizedData(nvidiaData));
        } else {
            renderHardwareComparisonBars('nvidiaDriverScatterChart', nvidiaData);
        }
    }

    const kernelData = getKernelScatterData(benchmarkData);
    lastSoftwareData.kernel = kernelData;
    if (document.getElementById('kernelScatterChart')) {
        const vsk = chartVizState.kernel;
        if (vsk.mode === 'delta') {
            if (modelSelection.kernel) {
                renderSoftwareDeltaChart('kernel');
            }
        } else if (vsk.normalize) {
            renderHardwareComparisonBars('kernelScatterChart', computeNormalizedData(kernelData));
        } else {
            renderHardwareComparisonBars('kernelScatterChart', kernelData);
        }
    }

    populateBaselineSelects();
}

// Normalize scores: per hardware group, best = 100%
function computeNormalizedData(data) {
    const groups = {};
    data.points.forEach(p => {
        if (!groups[p.hardwareLabel]) groups[p.hardwareLabel] = [];
        groups[p.hardwareLabel].push(p);
    });
    const normPoints = [];
    let hwIdx = 0;
    const hwLabels = [];
    Object.entries(groups).forEach(([hwLabel, pts]) => {
        const maxY = Math.max(...pts.map(p => p.y));
        pts.forEach(p => {
            normPoints.push({ ...p, y: maxY > 0 ? Math.round((p.y / maxY) * 100) : 0, origY: p.y });
        });
        hwLabels.push(hwLabel);
        hwIdx++;
    });
    return { points: normPoints, hwLabels, __normalized: true };
}

// Delta from baseline: per hardware, user-selected or oldest version = 0%, others = % change
function computeDeltaData(data, baseline, normalize) {
    const groups = {};
    data.points.forEach(p => {
        if (!groups[p.hardwareLabel]) groups[p.hardwareLabel] = [];
        groups[p.hardwareLabel].push(p);
    });
    const deltaPoints = [];
    const hwLabels = [];
    Object.entries(groups).forEach(([hwLabel, pts]) => {
        const extractNum = (label) => {
            const m = (label || '').match(/(\d+\.?\d*)/g);
            if (!m) return 0;
            return parseFloat(m.join('').replace(/\./g, ''));
        };
        let baselinePoint;
        if (baseline) {
            baselinePoint = pts.find(p => p.label === baseline);
            if (!baselinePoint) {
                const sorted = [...pts].sort((a, b) => extractNum(a.label) - extractNum(b.label));
                baselinePoint = sorted[0];
            }
        } else {
            const sorted = [...pts].sort((a, b) => extractNum(a.label) - extractNum(b.label));
            baselinePoint = sorted[0];
        }
        const baseY = normalize ? (baselinePoint.origY || baselinePoint.y) : baselinePoint.y;
        pts.forEach(p => {
            const val = normalize ? (p.origY || p.y) : p.y;
            const delta = baseY > 0 ? Math.round(((val - baseY) / baseY) * 100) : 0;
            deltaPoints.push({
                ...p, y: delta, baseLabel: baselinePoint.label, origY: val, baseY: baseY
            });
        });
        hwLabels.push(hwLabel);
    });
    return { points: deltaPoints, hwLabels, baselineLabel: deltaPoints.length > 0 ? deltaPoints[0].baseLabel : '' };
}

// Diverging bar chart for delta and normalized modes
function renderDivergingBarChart(canvasId, data, isNormalized) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    const canvas = document.getElementById(canvasId);
    if (!canvas || data.points.length === 0) return;
    const ctx = canvas.getContext('2d');

    const groups = {};
    data.points.forEach(p => {
        const key = p.hardwareLabel;
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
    });

    const hwEntries = Object.entries(groups);
    const labels = hwEntries.map(([hw]) => hw.length > 25 ? hw.substring(0, 25) + '...' : hw);

    // Collect all version labels for per-column grouping
    const allLabels = [...new Set(data.points.map(p => p.label))].sort((a, b) => {
        const na = parseFloat((a.match(/(\d+\.?\d*)/g) || ['0']).join(''));
        const nb = parseFloat((b.match(/(\d+\.?\d*)/g) || ['0']).join(''));
        return na - nb;
    });

    const datasets = allLabels.map(lbl => {
        const pts = hwEntries.map(([hw, hwPts]) => {
            const match = hwPts.find(p => p.label === lbl);
            return match ? match.y : NaN;
        });
        const isBaseline = lbl === (data.baselineLabel || '');
        return { 
            label: lbl, 
            data: pts, 
            _origData: hwEntries.map(([hw, hwPts]) => hwPts.find(p => p.label === lbl) || null),
            minBarLength: isBaseline ? 0 : 6
        };
    });

    const allVals = [].concat(...datasets.map(d => d.data.filter(v => !isNaN(v))));
    const absMax = allVals.length > 0 ? Math.max(Math.abs(Math.min(...allVals)), Math.abs(Math.max(...allVals))) : 10;
    const xMax = Math.ceil(absMax * 1.15);

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets, _baselineLabel: data.baselineLabel || '' },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 10 }, padding: 10, boxWidth: 10, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 1)',
                    titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const orig = context.dataset._origData[context.dataIndex];
                            const versionName = context.dataset.label || '';
                            const deltaStr = context.raw > 0 ? '+' + context.raw + '%' : context.raw + '%';
                            let lines = [deltaStr];
                            if (versionName) lines[0] = versionName + ': ' + lines[0];
                            if (orig && orig.origY) lines.push('Abs: ' + orig.origY.toLocaleString());
                            if (orig && orig.count) lines.push('Samples: ' + orig.count + (orig.count < 10 ? ' (low confidence)' : ''));
                            if (orig && orig.baseLabel) lines.push('Baseline: ' + orig.baseLabel);
                            return lines;
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: -xMax,
                    max: xMax,
                    grid: { color: 'rgba(255,255,255,0.05)', tickBorderDash: [3, 3] },
                    ticks: { color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 10 }, callback: v => v + '%' },
                    title: { display: true, text: isNormalized ? 'Delta % (normalized)' : data.baselineLabel ? `Delta %  —  Baseline: ${data.baselineLabel}` : 'Delta %', color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 12 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 10 } }
                }
            }
        },
        plugins: [{
            id: 'deltaColors',
            beforeRender: function(chart) {
                try {
                    const ds = chart.data.datasets;
                    console.log("Diverging Bar Chart datasets:", JSON.stringify(ds.map(d => ({ label: d.label, data: d.data, minBarLength: d.minBarLength })), null, 2));
                    ds.forEach(d => {
                        const colors = d.data.map(v => {
                            if (isNaN(v)) return 'transparent';
                            return v >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';
                        });
                        d.backgroundColor = colors;
                        const borders = d.data.map(v => {
                            if (isNaN(v)) return 'transparent';
                            return v >= 0 ? '#10b981' : '#ef4444';
                        });
                        d.borderColor = borders;
                        if (d.borderWidth === undefined) d.borderWidth = 1;
                    });
                } catch (e) {
                    console.error("Error in deltaColors plugin:", e);
                }
            }
        }, {
            id: 'baselineLine',
            afterDraw: function(chart) {
                try {
                    if (!chart.data.datasets.length) return;
                    const xScale = chart.scales.x;
                    const yScale = chart.scales.y;
                    if (!xScale || !yScale) return;
                    const zeroPx = xScale.getPixelForValue(0);
                    const ctx = chart.ctx;
                    ctx.save();
                    const bl = chart.data._baselineLabel || '';
                    let lineColor = 'rgba(99, 102, 241, 0.5)';
                    if (bl) {
                        const ds = chart.data.datasets.find(d => d.label === bl);
                        if (ds && ds.backgroundColor && ds.backgroundColor.length > 0) {
                            lineColor = Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : ds.backgroundColor;
                        }
                    }
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([4, 4]);
                    ctx.beginPath();
                    ctx.moveTo(zeroPx, yScale.top);
                    ctx.lineTo(zeroPx, yScale.bottom);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.fillStyle = lineColor;
                    ctx.font = 'bold 10px Inter, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    if (bl) {
                        ctx.fillText(bl, zeroPx + 6, yScale.top + 8);
                    }
                    ctx.restore();
                } catch (e) {
                    console.error("Error in baselineLine plugin:", e);
                }
            }
        }, {
            id: 'deltaLabels',
            afterDatasetsDraw: function(chart) {
                try {
                    if (!chart.data.datasets.length) return;
                    const xScale = chart.scales.x;
                    const yScale = chart.scales.y;
                    if (!xScale || !yScale) return;
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.font = '10px Inter, sans-serif';
                    ctx.textBaseline = 'middle';
                    const basePx = xScale.getPixelForValue(0);
                    chart.data.datasets.forEach((ds, di) => {
                        const dsMeta = chart.getDatasetMeta(di);
                        if (!dsMeta || !dsMeta.data) return;
                        dsMeta.data.forEach((bar, idx) => {
                            const v = ds.data[idx];
                            if (v === undefined || v === null || isNaN(v)) return;
                            const label = ds.label || '';
                            if (label === chart.data._baselineLabel) return;
                            const orig = ds._origData ? ds._origData[idx] : null;
                            const count = orig && orig.count ? orig.count : 0;
                            const y = bar.y;
                            const x = basePx + (v >= 0 ? 4 : -4);
                            ctx.textAlign = v >= 0 ? 'left' : 'right';
                            ctx.fillStyle = 'rgba(243, 244, 246, 0.9)';
                            ctx.fillText(label, x, y - 12);
                            if (count > 0) {
                                ctx.fillStyle = 'rgba(156, 163, 175, 0.85)';
                        ctx.font = 'bold 9px Inter, sans-serif';
                                const sampleText = 'Samples=' + count;
                                const tw = ctx.measureText(sampleText).width;
                                ctx.fillText(sampleText, x, y + 1);
                                ctx.fillStyle = count >= 10 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)';
                                ctx.font = '10px Inter, sans-serif';
                                ctx.fillText(count >= 10 ? '\u25B2' : '\u25BC', x + (v >= 0 ? tw + 3 : -tw - 3), y + 1);
                            }
                        });
                    });
                    ctx.restore();
                } catch (e) {
                    console.error("Error in deltaLabels plugin:", e);
                }
            }
        }]
    });
}

// ══════════════════════════════════════════════════════
//  BLOG MODULE (Supabase-powered blog with GitHub auth)
// ══════════════════════════════════════════════════════

(function() {
    if (!supa) { console.warn('Supabase not loaded — blog disabled.'); return; }

    const blogBtn = document.getElementById('blog-btn');
    const blogModal = document.getElementById('blog-modal');
    const blogCloseBtn = document.getElementById('close-blog-modal');
    const backBtn = document.getElementById('blog-back-btn');
    const postsContainer = document.getElementById('blog-posts-container');
    const listView = document.getElementById('blog-list-view');
    const detailView = document.getElementById('blog-detail-view');
    const postBody = document.getElementById('blog-post-body');
    const commentsList = document.getElementById('blog-comments-list');
    const commentFormArea = document.getElementById('blog-comment-form-area');
    const commentsTitle = document.getElementById('blog-comments-title');
    const statsBtn = document.getElementById('blog-stats-btn');
    const statsBackBtn = document.getElementById('blog-stats-back-btn');
    const statsView = document.getElementById('blog-stats-view');
    const statsContent = document.getElementById('blog-stats-content');

    let currentPostId = null;

    // ── Auth (tasks 4.2-4.5) ──

    async function getSession() {
        const { data } = await supa.auth.getSession();
        blogSession = data.session;
        return blogSession;
    }

    async function loginWithGitHub() {
        const { error } = await supa.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
        if (error) console.error('Login error:', error.message);
    }

    async function logout() {
        await supa.auth.signOut();
        renderCommentForm();
    }

    function formatBlogDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    function formatCommentDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const now = new Date();
        const diffMs = now - d;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    supa.auth.onAuthStateChange((event, session) => {
        blogSession = session;
        if (blogModal.open && detailView.style.display !== 'none') {
            renderCommentForm();
        }
    });

    // ── Blog Modal (tasks 5.1-5.7) ──

    function openBlogModal() {
        dismissBadge();
        listView.style.display = 'block';
        detailView.style.display = 'none';
        currentPostId = null;
        blogModal.showModal();
        document.body.classList.add('modal-open');
        loadPosts();
        lucide.createIcons();
    }

    function closeBlogModal() {
        blogModal.close();
        document.body.classList.remove('modal-open');
        listView.style.display = 'block';
        detailView.style.display = 'none';
        statsView.style.display = 'none';
        currentPostId = null;
    }

    function renderSkeletonCards(n) {
        let html = '';
        for (let i = 0; i < n; i++) {
            html += `<div class="blog-skeleton blog-skeleton-card">
                <div style="padding: 1.15rem 1.35rem;">
                    <div class="blog-skeleton blog-skeleton-title"></div>
                    <div class="blog-skeleton blog-skeleton-meta"></div>
                </div>
            </div>`;
        }
        return html;
    }

    function renderSkeletonPost() {
        return `<div class="blog-skeleton blog-skeleton-body"></div>
            <div class="blog-skeleton blog-skeleton-line" style="width:85%"></div>
            <div class="blog-skeleton blog-skeleton-line" style="width:70%"></div>
            <div class="blog-skeleton blog-skeleton-line" style="width:60%"></div>`;
    }

    function renderSkeletonComments(n) {
        let html = '';
        for (let i = 0; i < n; i++) {
            html += `<div class="blog-skeleton blog-skeleton-comment"></div>`;
        }
        return html;
    }

    async function loadPosts() {
        postsContainer.innerHTML = renderSkeletonCards(3);
        try {
            const { data, error } = await supa
                .from('posts')
                .select('id, title, slug, created_at, comments(count)')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!data || data.length === 0) {
                postsContainer.innerHTML = `<div class="blog-empty-state">
                    <i data-lucide="inbox" style="width:36px;height:36px;margin-bottom:0.5rem;"></i>
                    <p>No posts yet. Stay tuned!</p>
                </div>`;
                lucide.createIcons();
                return;
            }

            let html = '';
            data.forEach(post => {
                const commentCount = post.comments && post.comments[0] ? post.comments[0].count : 0;
                html += `<div class="blog-post-card" data-post-id="${post.id}">
                    <div class="blog-post-card-title">${escapeHtml(post.title)}</div>
                    <div class="blog-post-card-meta">
                        <span><i data-lucide="calendar"></i> ${formatBlogDate(post.created_at)}</span>
                        <span><i data-lucide="message-circle"></i> ${commentCount} comment${commentCount !== 1 ? 's' : ''}</span>
                    </div>
                </div>`;
            });
            postsContainer.innerHTML = html;
            lucide.createIcons();

            postsContainer.querySelectorAll('.blog-post-card').forEach(card => {
                card.addEventListener('click', () => {
                    const postId = parseInt(card.dataset.postId);
                    openPost(postId);
                });
            });
        } catch (err) {
            console.error('Error loading posts:', err);
            postsContainer.innerHTML = `<div class="blog-error-state">
                <i data-lucide="alert-triangle" style="width:36px;height:36px;margin-bottom:0.5rem;"></i>
                <p>Failed to load posts.</p>
            </div>`;
            lucide.createIcons();
        }
    }

    async function openPost(postId) {
        currentPostId = postId;
        trackPostView(postId);
        listView.style.display = 'none';
        detailView.style.display = 'block';
        postBody.innerHTML = renderSkeletonPost();
        commentsList.innerHTML = renderSkeletonComments(3);
        commentFormArea.innerHTML = '';
        commentsTitle.textContent = 'Comments';

        try {
            const { data: post, error } = await supa
                .from('posts')
                .select('id, title, content, created_at')
                .eq('id', postId)
                .single();

            if (error || !post) throw error || new Error('Post not found');

            const rendered = renderMarkdown(post.content);
            postBody.innerHTML = `<h1 style="margin-top:0;">${escapeHtml(post.title)}</h1>
                <div class="blog-post-card-meta" style="margin-bottom:1.25rem;">
                    <span><i data-lucide="calendar"></i> ${formatBlogDate(post.created_at)}</span>
                </div>
                <div>${rendered}</div>`;
            lucide.createIcons();
        } catch (err) {
            console.error('Error loading post:', err);
            postBody.innerHTML = `<div class="blog-error-state">
                <p>Could not load this post.</p>
            </div>`;
        }

        await loadComments(postId);
        renderCommentForm();
    }

    function backToList() {
        currentPostId = null;
        listView.style.display = 'block';
        detailView.style.display = 'none';
    }

    function renderMarkdown(text) {
        if (!text) return '';
        try {
            if (typeof marked !== 'undefined') return marked.parse(text);
            return escapeHtml(text).replace(/\n/g, '<br>');
        } catch (e) {
            return escapeHtml(text).replace(/\n/g, '<br>');
        }
    }

    async function loadComments(postId) {
        commentsList.innerHTML = renderSkeletonComments(3);
        try {
            const { data, error } = await supa
                .from('comments')
                .select('id, user_name, content, created_at')
                .eq('post_id', postId)
                .order('created_at', { ascending: true });

            if (error) throw error;

            if (!data || data.length === 0) {
                commentsList.innerHTML = `<div class="blog-empty-state">
                    <p>Be the first to comment!</p>
                </div>`;
                return;
            }

            commentsTitle.textContent = `Comments (${data.length})`;
            let html = '';
            data.forEach(c => {
                const initial = (c.user_name || '?')[0].toUpperCase();
                html += `<div class="comment-item">
                    <div class="comment-avatar">${escapeHtml(initial)}</div>
                    <div class="comment-body">
                        <div class="comment-header">
                            <span class="comment-name">${escapeHtml(c.user_name)}</span>
                            <span class="comment-date">${formatCommentDate(c.created_at)}</span>
                        </div>
                        <div class="comment-text">${escapeHtml(c.content).replace(/\n/g, '<br>')}</div>
                    </div>
                </div>`;
            });
            commentsList.innerHTML = html;
        } catch (err) {
            console.error('Error loading comments:', err);
            commentsList.innerHTML = `<div class="blog-error-state">
                <p>Could not load comments.</p>
            </div>`;
        }
    }

    function renderCommentForm() {
        if (!currentPostId) return;

        if (!blogSession || !blogSession.user) {
            commentFormArea.innerHTML = `<div class="blog-login-prompt">
                <p>Sign in to leave a comment</p>
                <button class="blog-login-btn" id="blog-login-btn">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                    <span>Login with GitHub</span>
                </button>
            </div>`;
            document.getElementById('blog-login-btn')?.addEventListener('click', loginWithGitHub);
            return;
        }

        const userName = blogSession.user.user_metadata?.user_name
            || blogSession.user.user_metadata?.full_name
            || blogSession.user.user_metadata?.name
            || blogSession.user.email
            || 'Anonymous';

        commentFormArea.innerHTML = `<div class="blog-comment-form" id="blog-comment-form">
            <textarea id="blog-comment-input" placeholder="Share your thoughts..." maxlength="2000"></textarea>
            <div class="blog-comment-form-actions">
                <span class="blog-logged-in-as">Signed in as <strong>${escapeHtml(userName)}</strong></span>
                <div style="display:flex;gap:0.5rem;">
                    <button class="blog-logout-btn" id="blog-logout-btn">Logout</button>
                    <button class="btn btn-primary btn-sm" id="blog-submit-comment">Post Comment</button>
                </div>
            </div>
        </div>
        <div id="blog-comment-error" class="blog-error-state" style="display:none;"></div>`;

        document.getElementById('blog-logout-btn')?.addEventListener('click', logout);

        async function handleSubmit() {
            const input = document.getElementById('blog-comment-input');
            const submitBtn = document.getElementById('blog-submit-comment');
            const errorEl = document.getElementById('blog-comment-error');
            const content = input.value.trim();

            if (!content) {
                input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                input.focus();
                setTimeout(() => input.style.borderColor = '', 2000);
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Posting...';
            errorEl.style.display = 'none';

            try {
                const { error } = await supa
                    .from('comments')
                    .insert({
                        post_id: currentPostId,
                        user_id: blogSession.user.id,
                        user_name: userName,
                        content: content
                    });

                if (error) throw error;

                input.value = '';
                input.style.borderColor = '';
                submitBtn.textContent = 'Post Comment';
                submitBtn.disabled = false;
                await loadComments(currentPostId);
                renderCommentForm();
            } catch (err) {
                console.error('Error posting comment:', err);
                errorEl.style.display = 'block';
                errorEl.innerHTML = `<p>Failed to post comment.</p>`;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Post Comment';
            }
        }

        document.getElementById('blog-submit-comment')?.addEventListener('click', handleSubmit);
        document.getElementById('blog-comment-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── New post badge ──

    function dismissBadge() {
        const badge = document.getElementById('blog-badge');
        if (!badge) return;
        badge.style.display = 'none';
        localStorage.setItem('blogNewSeen', Date.now());
    }

    async function checkNewPosts() {
        const badge = document.getElementById('blog-badge');
        const banner = document.getElementById('blog-highlight-banner');
        const bannerTitle = document.getElementById('blog-highlight-title');
        const bannerClose = document.getElementById('blog-highlight-close-btn');
        const bannerRead = document.getElementById('blog-highlight-read-btn');
        
        if (!supa) return;
        const lastSeen = parseInt(localStorage.getItem('blogNewSeen') || '0', 10);
        
        try {
            const { data, error } = await supa
                .from('posts')
                .select('id, title, created_at')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(1);
            if (error || !data || data.length === 0) return;
            
            const latestPost = data[0];
            const latest = new Date(latestPost.created_at).getTime();
            
            if (badge && (!lastSeen || latest > lastSeen)) {
                badge.textContent = '+1';
                badge.style.display = 'flex';
            }
            
            if (banner && bannerTitle) {
                const isDismissed = localStorage.getItem('blogBannerDismissed_' + latestPost.id);
                if (!isDismissed) {
                    bannerTitle.textContent = latestPost.title;
                    banner.style.display = 'flex';
                    if (window.lucide) {
                        lucide.createIcons();
                    }
                    
                    if (bannerRead) {
                        bannerRead.onclick = () => {
                            dismissBadge();
                            listView.style.display = 'none';
                            detailView.style.display = 'block';
                            currentPostId = latestPost.id;
                            blogModal.showModal();
                            document.body.classList.add('modal-open');
                            openPost(latestPost.id);
                            
                            localStorage.setItem('blogBannerDismissed_' + latestPost.id, 'true');
                            banner.style.display = 'none';
                        };
                    }
                    
                    if (bannerClose) {
                        bannerClose.onclick = () => {
                            localStorage.setItem('blogBannerDismissed_' + latestPost.id, 'true');
                            banner.style.display = 'none';
                        };
                    }
                }
            }
        } catch (e) {
            // silently fail — badge is cosmetic
        }
    }

    // ── Event Listeners ──

    function openBlogStats() {
        listView.style.display = 'none';
        detailView.style.display = 'none';
        statsView.style.display = 'block';
        renderBlogStats();
    }

    function backToBlog() {
        statsView.style.display = 'none';
        listView.style.display = 'block';
    }

    async function renderBlogStats() {
        statsContent.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-secondary);">Loading...</p>';
        if (!supa) { statsContent.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-secondary);">Supabase not connected.</p>'; return; }
        try {
            const [tabRes, postRes] = await Promise.all([
                supa.from('pageviews').select('page, created_at'),
                supa.from('posts').select('title, views').eq('published', true).order('views', { ascending: false }).limit(10)
            ]);
            let html = '<div style="display:flex;flex-direction:column;gap:1.5rem;">';

            // Tab views
            const tabCounts = {};
            (tabRes.data || []).forEach(p => {
                const tab = p.page || 'unknown';
                tabCounts[tab] = (tabCounts[tab] || 0) + 1;
            });
            const tabSorted = Object.entries(tabCounts).sort((a, b) => b[1] - a[1]);
            const maxTab = tabSorted.length > 0 ? tabSorted[0][1] : 1;

            html += '<div class="blog-post-body"><h3>Views per Tab</h3>';
            tabSorted.forEach(([tab, count]) => {
                const pct = (count / maxTab) * 100;
                const tabName = tab.replace('tab:', '');
                html += `<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
                    <span style="width:100px;font-size:0.85rem;color:var(--text-secondary);">${escapeHtml(tabName)}</span>
                    <div style="flex:1;height:22px;background:rgba(255,255,255,0.05);border-radius:6px;overflow:hidden;">
                        <div style="height:100%;width:${pct}%;background:var(--primary-gradient);border-radius:6px;display:flex;align-items:center;padding-left:8px;">
                            <span style="font-size:0.75rem;color:white;font-weight:600;">${count}</span>
                        </div>
                    </div>
                </div>`;
            });
            html += '</div>';

            // Post views
            html += '<div class="blog-post-body"><h3>Most Viewed Posts</h3>';
            const postData = postRes.data || [];
            const maxPost = postData.length > 0 ? Math.max(...postData.map(p => p.views || 0)) : 1;
            if (postData.length === 0) {
                html += '<p style="color:var(--text-secondary);">No posts yet.</p>';
            } else {
                postData.forEach(p => {
                    const pct = ((p.views || 0) / maxPost) * 100;
                    html += `<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
                        <span style="width:200px;font-size:0.85rem;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(p.title)}</span>
                        <div style="flex:1;height:22px;background:rgba(255,255,255,0.05);border-radius:6px;overflow:hidden;">
                            <div style="height:100%;width:${pct}%;background:rgba(16,185,129,0.8);border-radius:6px;display:flex;align-items:center;padding-left:8px;">
                                <span style="font-size:0.75rem;color:white;font-weight:600;">${p.views || 0}</span>
                            </div>
                        </div>
                    </div>`;
                });
            }
            html += '</div>';

            html += '</div>';
            statsContent.innerHTML = html;
        } catch (e) {
            statsContent.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-secondary);">Failed to load stats.</p>';
            console.error('Stats error:', e);
        }
    }

    if (blogBtn && blogModal) {
        blogBtn.addEventListener('click', openBlogModal);

        if (blogCloseBtn) blogCloseBtn.addEventListener('click', closeBlogModal);
        if (backBtn) backBtn.addEventListener('click', backToList);
        if (statsBtn) statsBtn.addEventListener('click', openBlogStats);
        if (statsBackBtn) statsBackBtn.addEventListener('click', backToBlog);

        blogModal.addEventListener('close', () => {
            document.body.classList.remove('modal-open');
            listView.style.display = 'block';
            detailView.style.display = 'none';
            statsView.style.display = 'none';
            currentPostId = null;
        });

        if (!('closedBy' in HTMLDialogElement.prototype)) {
            blogModal.addEventListener('click', (event) => {
                if (event.target !== blogModal) return;
                const rect = blogModal.getBoundingClientRect();
                const isInside = (
                    rect.top <= event.clientY &&
                    event.clientY <= rect.top + rect.height &&
                    rect.left <= event.clientX &&
                    event.clientX <= rect.left + rect.width
                );
                if (!isInside) closeBlogModal();
            });
        }
    }

    getSession();
    checkNewPosts();
})();

// Baseline zero line plugin — draws colored line at x=0 with baseline name
