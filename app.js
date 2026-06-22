// Pascube Benchmark Dashboard Logic

const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1nlMgeW0ZFmtwwT3hty8JAFT3sM0SNhMpc24mH3In9zI/export?format=csv";

// Fallback CSV Data to ensure the dashboard works even offline or in case of CORS/network issues
const FALLBACK_CSV = `Origem / Usuário,CPU,RAM,GPU,VRAM,Driver,Kernel,Operating System,Main Score,CPU Single,CPU Multi,GPU Score,Date/Time,client-id
Anonymous,Ryzen 7 9800X3D,31GB,RTX 4090,24GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (daniel@Cafetera)  dom 31 may 2026 19:42:58 CEST,7.0.10-2-cachyos-custom,CachyOS,5174,2780,3655,7306,16/06/2026 13:11:07,2648f98e2306731777b45289ec0a46e6d5466beb43cecb72104b6ea3449aa10a
Anonymous,Ryzen 7 9800X3D,30GB,RTX 4090,24GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  595.80  Release Build  (dvs-builder@U22-I3-AF05-29-2)  Thu May 21 19:21:58 UTC 2026,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),4975,2615,4019,6913,
Anonymous,Ryzen 9 7950X3D 16-Core,63GB,RX 7900 XTX,24GB,Mesa 26.1.99,7.0.12-1-cachyos,CachyOS,4938,3481,10783,4205,14/06/2026 14:22:49
Anonymous,Ryzen 9 9950X3D,96 GB,RX 9070 XT,,,,Arch Linux,4932,3576,11897,3791,
Anonymous,Ryzen 9 9900X3D 12-Core,60GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,4665,3731,9404,3897,14/06/2026 13:14:56
Anonymous,Ryzen 7 9800X3D,94GB,RTX 5070 Ti,,,,CachyOS,4609,3978,5679,4729,
Anonymous,Ryzen 7 9800X3D,96 GB,RTX 5070 Ti,,,,CachyOS,4546,N/D,N/D,N/D,
Anonymous,Ryzen 7 9800X3D,94GB,RTX 5070 Ti,,,,CachyOS,4546,"3,909","5,438","4,725",
Anonymous,RYZEN AI MAX+ 395 w/ Radeon 8060S,125GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4513,3062,10564,3713,
Anonymous,Ryzen 7 7800X3D,62GB,RX 7900 XTX,,,,CachyOS,4465,"3,767","5,508","4,641",
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,24GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4441,3980,5716,4382,
Anonymous,AMD Ryzen 9 9950X3D,96 GB,RX 9070 XT,,,,Arch Linux,4380,3754,12228,2464,
Anonymous,Ryzen 9 9950X3D,94GB,RX 9070 XT,,,,Arch Linux,4380,"3,754","12,228","2,464",
Anonymous,Ryzen 7 9800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,4323,4166,6530,3771,15/06/2026 04:48:03
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,24GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,4317,3929,5257,4307,14/06/2026 11:07:41
Anonymous,Ryzen 9 7950X3D 16-Core,62GB,RX 7900 XTX,24GB,Mesa 26.0.6,7.0.12-arch1-1,Arch Linux,4294,2603,7647,4471,15/06/2026 17:45:28
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,,,,CachyOS,4213,"3,689","5,503","4,193",
Anonymous,Ryzen 7 9800X3D,64 GB,RX 9070 XT,,,,Cachy OS,4207,N/D,N/D,N/D,
Anonymous,Ryzen 7 9800X3D,60GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4133,4004,6475,3520,
Anonymous,Ryzen 7 9800X3D,32 GB,RX 9070 XT,,,,CachyOS,4131,N/D,N/D,N/D,
Anonymous,RYZEN AI MAX+ 395 w/ Radeon 8060S,125GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,4130,2545,9451,3644,
Anonymous,Ryzen 7 9800X3D,62GB,RX 7900 XTX,24GB,Mesa 26.1.2,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),4109,2915,5029,4668,15/06/2026 03:38:39
Anonymous,Ryzen 7 7800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.1.0-rc7-1-cachyos-rc,CachyOS,4100,3808,6109,3702,
Anonymous,Ryzen 7 7800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.1.0-rc7-1-cachyos-rc,CachyOS,4040,3813,5996,3613,
Anonymous,Ryzen 7 5800X 8-Core,31GB,RTX 5070 Ti,,,,CachyOS,4032,3053,4610,4544,
Anonymous,Ryzen 7 9800X3D,64 GB,RX 9070 XT,,,,Cachy OS,3989,N/D,N/D,N/D,
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,3889,3283,5120,3944,
Anonymous,Ryzen 9 9950X3D 16-Core,92GB,RX 9070 XT,15.9GB,Mesa 26.0.6,6.17.7-ba29.fc43.x86_64,Bazzite,3820,2290,7314,3842,16/06/2026 12:40:48
Anonymous,Ryzen 7 5800X 8-Core,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,3690,2995,4983,3789,15/06/2026 09:39:07
Anonymous,Ryzen 7 7800X3D,31GB,RX 7900 XTX,24GB,Mesa 26.0.6,7.0.11-1-cachyos,CachyOS,3680,2703,3803,4327,
Anonymous,i5-14600KF,31GB,RTX 5070,12.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Wed Jun  3 22:21:41 UTC 2026,7.0.11-1-cachyos,CachyOS,3679,3058,6429,3289,
Anonymous,i5-14600KF,31GB,RTX 5070,12.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Wed Jun  3 22:21:41 UTC 2026,7.0.11-1-cachyos,CachyOS,3679,3058,6429,3289,
Anonymous,Ryzen 7 5800X 8-Core,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,3659,3008,4880,3748,14/06/2026 13:37:55
Anonymous,Ryzen 7 9800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3656,3010,4980,3711,15/06/2026 08:21:30
Anonymous,Ryzen 7 9700X 8-Core,60GB,RX 7900 XTX,24GB,Mesa 26.0.6,7.0.12-zen1-1-zen,Arch Linux,3638,2304,3456,4627,16/06/2026 14:47:46
Anonymous,Ryzen 7 7800X3D,30GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.12-cachyos1.fc44.x86_64,Fedora Linux 44 (Forty Four),3498,2855,3869,3836,16/06/2026 06:15:59
Anonymous,Ryzen 7 9800X3D,31GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),3412,2687,4274,3661,
Anonymous,Ryzen 7 7800X3D,47GB,RX 9070 XT,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,3393,3908,3496,3002,
Anonymous,Ryzen 9 5900X 12-Core,63 GB,RX 7800 XT,,,,Arch Linux,3367,2858,6.605,2751,
Anonymous,Ryzen 5 7500F 6-Core,31GB,RTX 5070,11.9GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (root@bezzerk-b650mgamingpluswifi),7.0.11-zen1-1-zen,Garuda Linux,3304,3336,4006,3070,
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,,,,CachyOS,3225,2203,1458,4471,
Anonymous,AMD Ryzen 7 7800X3D,32 GiB,RX 6750 XT,,,,EndeavourOS,3194,N/D,N/D,N/D,
Anonymous,Ryzen 7 7800X3D,31GB,RX 6750 XT,,,,EndeavourOS,3194,"3,989","6,352","1,69",
Anonymous,Ryzen 7 7800X3D,31GB,RTX 4070,,,,Bazzite,3148,2804,4186,3078,
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3078,2506,3548,3338,
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3075,2510,3522,3337,
Anonymous,Ryzen 7 5800X3D 8-Core,16GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.12-arch1-1,Arch Linux,3069,2344,3125,3560,16/06/2026 07:11:39
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.9-ogc3.2.fc44.x86_64,Bazzite,3035,2439,3547,3299,
Anonymous,Ryzen 7 7800X3D,58GB,RTX 5070 Ti,15.9GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (root@Linusive),7.0.12-1-cachyos,Garuda Linux,3029,3936,6010,1500,
Anonymous,Ryzen 7 5800X3D 8-Core,32 GB,RX 9070 XT,,,,Fedora 44 KDE,3021,2308,3.385,3411,
Anonymous,Ryzen 7 9700X 8-Core,31GB,RX 9070,15.9GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,2979,2444,3851,3092,16/06/2026 16:06:23
Anonymous,Ryzen 7 5800X3D 8-Core,63GB,RTX 5070,11.9GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,2970,2439,3559,3165,
Anonymous,i7-12700K,31GB,RX 7800 XT,,,,Arch Linux,2962,"2,699","4,096","2,806",
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,16.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.126.09  Release Build  (dvs-builder@U22-I3-AM02-24-3)  Wed Jan  7 22:51:36 UTC 2026,6.19.10-2-liquorix-amd64,Ubuntu 24.04.4 LTS,2959,1627,1129,4440,
Anonymous,Ryzen 9 5900X 12-Core,31GB,RX 6900 XT,16GB,Mesa 26.1.2,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),2954,2390,4546,2871,15/06/2026 10:36:04
Anonymous,Ryzen 5 5600X 6-Core,31GB,RX 9070 GRE,11.9GB,Mesa 26.1.1,6.18.33-1-MANJARO,Manjaro Linux,2946,2899,3228,2894,
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 6800 XT,,,,CachyOS,2935,3242,4396,2281,
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 6800,16GB,Mesa 26.1.2,7.0.10-1-cachyos-bore-lto,CachyOS,2930,3356,4598,2132,
Anonymous,Ryzen AI 9 HX 370 w/ Radeon 890M,94GB,RX 9070 XT,15.9GB,Mesa 26.0.6,7.0.0-22-generic,Ubuntu 26.04 LTS,2893,1704,2829,3745,16/06/2026 06:29:30
Anonymous,12th Gen i5-12400F,31GB,RX 9070,15.9GB,Mesa 26.1.2,7.0.12-1-cachyos,CachyOS,2820,2316,2936,3139,14/06/2026 16:00:38
Anonymous,Ryzen 7 5700X 8-Core,15GB,RX 9060 XT,16GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,2791,2987,4138,2249,
Anonymous,Ryzen 9 5900XT 16-Core,31GB,RX 6750 XT,12GB,Mesa 26.1.2,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),2763,2501,6547,1812,
Anonymous,Ryzen 7 9700X 8-Core,30GB,RX 9060 XT,,,,CachyOS,2752,3759,4576,1500,
Anonymous,Ryzen 7 5800X3D 8-Core,31GB,RX 7800 XT,16GB,Mesa 26.0.6,7.0.12-1-cachyos,CachyOS,2710,2289,3187,2862,
Anonymous,Ryzen 7 5700X 8-Core,30GB,RX 6800,16GB,Mesa 26.0.6,7.0.0-22-generic,Ubuntu 26.04 LTS,2391,2176,3460,2220,16/06/2026 08:23:53
Anonymous,i7-9700K @ 3.60GHz,31GB,RX 9060 XT,,,,EndeavourOS,2387,2590,2852,2105,
Anonymous,Ryzen 9 3900X 12-C,31GB,RTX 3060 Ti,,,,CachyOS,2384,"2,113","4,886","1,823",
Anonymous,i7-9700K @ 3.60GHz,N/D,RX 9060 XT,,,,CachyOS,2330,N/D,N/D,N/D,
Anonymous,13th Gen i9-13900HX,31GB,RTX 4070 Laptop GPU,8GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  595.71.05  Release Build  (root@Mahoraga)  Tue Jun  2 17:06:29 CEST 2026,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),2305,2152,4365,1794,
Anonymous,AMD Ryzen 7 5800x3d,32 GB,AMD Radeon RX 6700xt,,,,Nobara 43 KDE,2219,N/D,N/D,N/D,
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,16.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.126.09  Release Build  (dvs-builder@U22-I3-AM02-24-3)  Wed Jan  7 22:51:36 UTC 2026,6.19.10-2-liquorix-amd64,Ubuntu 24.04.4 LTS,2203,1,1,4405,
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,,,,Ubuntu 24.04.4 LTS,2202,1,1,4402,
Anonymous,i7-4790K @ 4.00GHz,31GB,RTX 5070 Ti,,,,Ubuntu 24.04.4 LTS,2200,1,1,4400,
Anonymous,AMD Ryzen 5 5600 6-Core,31 GB,Intel Arc A750 Graphics,,,,CachyOS,2169,2.992,3.245,1.270,
Anonymous,Ryzen 7 9800X3D,62GB,RX 7900 XTX,,,,PikaOS 4,1892,1,1,3784,
Anonymous,Ryzen 5 3600 6-Core,31GB,RTX 3060 Ti,8.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,1862,2156,2215,1550,16/06/2026 11:02:05
Anonymous,Ryzen 5 5600 6-Core,31GB,RX 6700,10GB,Mesa 26.1.2,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),1851,2333,2723,1252,15/06/2026 03:23:04
Anonymous,Ryzen 5 7600X 6-Core,31GB,Intel(R) Arc(tm) B580 Graphics (BMG G21),11.9GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,1844,2510,3060,1013,
Anonymous,12th Gen i5-12450HX,15GB,RTX 4050 Laptop GPU,6GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Wed Jun  3 22:21:41 UTC 2026,7.0.11-1-cachyos,CachyOS,1777,2152,2195,1390,
Anonymous,Ryzen 5 3600 6-Core,31GB,RX 6750 XT,12GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,1693,1540,2034,1697,
Anonymous,Ryzen 5 5600G with Radeon Graphics,31GB,RX 6650 XT,8GB,Mesa 26.0.6,7.0.0-22-generic,Ubuntu 26.04 LTS,1660,1832,2245,1365,15/06/2026 20:41:15
Anonymous,i7-10870H @ 2.20GHz,31GB,RTX 3080 Laptop,,,,CachyOS,1520,"1,352",887,"1,617",
Anonymous,12th Gen i5-12400F,15GB,GTX 1060 6GB,6.2GB,NVRM version: NVIDIA UNIX x86_64 Kernel Module  580.159.04  Wed Apr 29 17:32:45 UTC 2026,7.0.12-zen1-1-zen,Garuda Linux,1513,2277,2545,669,
Anonymous,12th Gen i5-12400F,31GB,RX 6600,8GB,Mesa 26.0.6,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),1438,1761,2221,978,16/06/2026 15:37:21
Anonymous,Ryzen 5 4600H with Radeon Graphics,15GB,GTX 1650 Ti,4.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,1320,1972,1947,676,16/06/2026 03:17:59
Anonymous,12th Gen i5-12450H,31GB,RTX 4060 Laptop GPU,8GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  595.80  Release Build  (dvs-builder@U22-I3-AF05-29-2)  Thu May 21 19:21:58 UTC 2026,7.0.12-201.fc44.x86_64,Fedora Linux 44 (KDE Plasma Desktop Edition),1312,1283,1178,1372,
Anonymous,i7-2600K @ 3.40GHz,16GB,RX 580,8GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,1298,2263,1558,544,
Anonymous,AMD Ryzen 7 3800XT,32 GB,GTX 1080,,,,Fedora 44 KDE (VM),1278,1294,1164,1300,
Anonymous,i7-2600K @ 3.40GHz,16GB,RX 580,8GB,Mesa 26.1.2,7.0.11-1-cachyos,CachyOS,1278,2228,1480,553,
Anonymous,Intel(R) Xeon(R) E5-2680 v3 @ 2.50GHz,16GB,GTX 980 Ti,6.2GB,NVRM version: NVIDIA UNIX x86_64 Kernel Module  580.159.04  Wed Apr 29 17:32:45 UTC 2026,7.0.12-201.fc44.x86_64,Fedora Linux 44 (Workstation Edition),1259,1119,2231,1065,
Anonymous,Ryzen Z1 Extreme,11 GB,Ryzen Z1 Extreme,,,,Bazzite (ROG Ally Z1E),1144,N/D,N/D,N/D,
Anonymous,Ryzen 5 5600G with Radeon Graphics,15GB,RX 580,8GB,Mesa 26.0.6,6.17.0-35-generic,Zorin OS 18.1,1143,1708,2017,485,15/06/2026 12:23:39
Anonymous,i7-9750H @ 2.60GHz,15GB,GTX 1660 Ti,6.2GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  610.43.02  Release Build  (notroot@)  Sat Jun 13 12:02:41 UTC 2026,7.0.12-1-cachyos,CachyOS,1112,1264,1098,1009,15/06/2026 09:19:31
Anonymous,11th Gen i5-11400H @ 2.70GHz,15GB,RTX 3050 Laptop GPU,4GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.159.03  Release Build  (dvs-builder@U22-I3-AM27-29-6)  Fri Apr 24 06:03:03 UTC 2026,7.0.11-76070011-generic,Pop!_OS 24.04 LTS,1060,1322,1327,796,16/06/2026 09:51:59
Anonymous,Ryzen 7 2700 Eight-Core,16GB,RX 590 Series,8GB,Mesa 26.0.6,6.17.0-35-generic,Linux Mint 22.3,978,1223,1556,634,16/06/2026 13:26:26
Anonymous,Intel(R) Xeon(R) E5-2667 v3 @ 3.20GHz,16GB,RX 580,8GB,Mesa 26.0.6,6.18.35-1-cachyos-lts,CachyOS,934,1183,1602,560,
Anonymous,Ryzen 5 5600H with Radeon Graphics,15GB,Graphics,5.3GB,Mesa 26.0.6,7.0.9-ogc3.2.fc44.x86_64,Bazzite,889,1569,1736,159,
Anonymous,i5-10500 @ 3.10GHz,15GB,Intel(R) UHD Graphics 630 (CML GT2),,,,CachyOS,847,1639,1491,100,
Anonymous,Custom APU 0405,14GB,AMD Custom GPU 0405,6GB,Mesa 26.1.2,6.11.11-valve29-1-neptune-611-g2dcfaf4df7ac,SteamOS,808,1454,1285,212,
Anonymous,i7-4770 @ 3.40GHz,16GB,RX 580,8GB,Mesa 26.0.6,7.0.11-arch1-1,Arch Linux,787,1266,901,417,
Anonymous,Ryzen 5 PRO 5650U with Radeon Graphics,23GB,Graphics,13.1GB,Mesa 26.0.6,7.0.9-200.nobara.fc43.x86_64,Nobara Linux 43 (KDE Plasma Desktop Edition),650,1181,1036,162,
Anonymous,i5-6400 @ 2.70GHz,12GB,R9 390 Series,8GB,Mesa 26.0.5,6.19.14-ogc5.1.fc44.x86_64,Bazzite,585,879,311,461,15/06/2026 14:41:25
Anonymous,i5-3470S @ 2.90GHz,16GB,GT 1030 (NVK GP108),2.3GB,NVIDIA 109051.91.0,6.17.0-35-generic,Zorin OS 18.1,528,1120,503,122,14/06/2026 12:29:55
Anonymous,11th Gen i5-11400H @ 2.70GHz,15GB,RTX 3050 Laptop GPU,4GB,NVRM version: NVIDIA UNIX Open Kernel Module for x86_64  580.159.03  Release Build  (dvs-builder@U22-I3-AM27-29-6)  Fri Apr 24 06:03:03 UTC 2026,7.0.11-76070011-generic,Pop!_OS 24.04 LTS,407,1,1,813,16/06/2026 12:20:04
Anonymous,i5-5250U @ 1.60GHz,8GB,Intel(R) HD Graphics 6000 (BDW GT3),7.7GB,Mesa 26.1.2,6.14.0-37-generic,Linux Mint 22.3,54,1,1,107,14/06/2026 18:04:47`;

// State Variables
let benchmarkData = [];
let filteredData = [];
let chartInstances = {};
let currentSort = { column: 'mainScore', direction: 'desc' };

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    fetchData();
});

// Setup Events (search, filter, sort, sync)
function setupEventListeners() {
    document.getElementById('refresh-btn').addEventListener('click', fetchData);
    document.getElementById('search-input').addEventListener('input', handleFilterChange);
    document.getElementById('os-filter').addEventListener('change', handleFilterChange);
    document.getElementById('cpu-filter').addEventListener('change', handleFilterChange);
    document.getElementById('gpu-filter').addEventListener('change', handleFilterChange);
    document.getElementById('ram-filter').addEventListener('change', handleFilterChange);
    document.getElementById('vram-filter').addEventListener('change', handleFilterChange);
    
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
        }
        
        let gpuVal = getVal(3) || 'Unknown GPU';
        if (gpuVal.trim() === 'Graphics') {
            const isAmdMobile = /ryzen.*?\b\d{4}(h|hs|u|hx)\b/i.test(cpuVal);
            gpuVal = isAmdMobile ? 'RX Vega' : 'Radeon Graphics';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0405') {
            gpuVal = 'Steam Deck';
        } else if (/intel.*?\barc.*?\b([ab]\d{3})\b/i.test(gpuVal)) {
            const modelMatch = gpuVal.match(/\b([ab]\d{3})\b/i);
            gpuVal = `Arc ${modelMatch[1].toUpperCase()}`;
        }
        
        if (gpuVal.trim() === 'Radeon RX Vega' || gpuVal.trim() === 'Vega 8 Graphics') {
            gpuVal = 'RX Vega';
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
            dateTime: getFormattedVal(12) || 'N/D',
            clientId: getVal(13) || 'N/D'
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

// Show loader in table
function showLoading() {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = `
        <tr>
            <td colspan="12" class="loading-state">
                <div class="spinner"></div>
                <p>Loading benchmark data...</p>
            </td>
        </tr>
    `;
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
        }
        
        let gpuVal = row[3] || 'Unknown GPU';
        if (gpuVal.trim() === 'Graphics') {
            const isAmdMobile = /ryzen.*?\b\d{4}(h|hs|u|hx)\b/i.test(cpuVal);
            gpuVal = isAmdMobile ? 'RX Vega' : 'Radeon Graphics';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0405') {
            gpuVal = 'Steam Deck';
        } else if (/intel.*?\barc.*?\b([ab]\d{3})\b/i.test(gpuVal)) {
            const modelMatch = gpuVal.match(/\b([ab]\d{3})\b/i);
            gpuVal = `Arc ${modelMatch[1].toUpperCase()}`;
        }
        
        if (gpuVal.trim() === 'Radeon RX Vega' || gpuVal.trim() === 'Vega 8 Graphics') {
            gpuVal = 'RX Vega';
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
            dateTime: row[12] || 'N/D',
            clientId: row[13] || 'N/D'
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
    
    // Save current selected values
    const osSelected = osFilter.value;
    const cpuSelected = cpuFilter.value;
    const gpuSelected = gpuFilter.value;
    const ramSelected = ramFilter.value;
    const vramSelected = vramFilter.value;
    
    const osList = new Set();
    const cpuList = new Set();
    const gpuList = new Set();
    const ramList = new Set();
    const vramList = new Set();
    
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
}

// Handle Filters
function handleFilterChange() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    const osSelection = document.getElementById('os-filter').value;
    const cpuSelection = document.getElementById('cpu-filter').value;
    const gpuSelection = document.getElementById('gpu-filter').value;
    const ramSelection = document.getElementById('ram-filter').value;
    const vramSelection = document.getElementById('vram-filter').value;
    
    filteredData = benchmarkData.filter(row => {
        // Search filter
        const matchesSearch = !searchQuery || 
            row.cpu.toLowerCase().includes(searchQuery) ||
            row.gpu.toLowerCase().includes(searchQuery) ||
            row.os.toLowerCase().includes(searchQuery) ||
            row.user.toLowerCase().includes(searchQuery);
            
        // Dropdown filters
        const matchesOs = !osSelection || row.os === osSelection;
        const matchesCpu = !cpuSelection || row.cpu === cpuSelection;
        const matchesGpu = !gpuSelection || row.gpu === gpuSelection;
        const matchesRam = !ramSelection || row.ram === ramSelection;
        const matchesVram = !vramSelection || row.vram === vramSelection;
        
        return matchesSearch && matchesOs && matchesCpu && matchesGpu && matchesRam && matchesVram;
    });
    
    // Keep current sort
    sortData(currentSort.column, currentSort.direction);
    
    // Re-render
    renderTable();
}

// Render Overview Statistics
function renderOverviewStats() {
    document.getElementById('stat-total-runs').textContent = benchmarkData.length;
    
    // Find absolute highest scores
    let topSingle = { score: 0, hardware: '-' };
    let topMulti = { score: 0, hardware: '-' };
    let topGpu = { score: 0, hardware: '-' };
    
    benchmarkData.forEach(row => {
        if (row.cpuSingle && row.cpuSingle > topSingle.score) {
            topSingle.score = row.cpuSingle;
            topSingle.hardware = row.cpu;
        }
        if (row.cpuMulti && row.cpuMulti > topMulti.score) {
            topMulti.score = row.cpuMulti;
            topMulti.hardware = row.cpu;
        }
        if (row.gpuScore && row.gpuScore > topGpu.score) {
            topGpu.score = row.gpuScore;
            topGpu.hardware = row.gpu;
        }
    });
    
    document.getElementById('stat-top-cpu-single').textContent = topSingle.score || '-';
    document.getElementById('stat-top-cpu-single-sub').textContent = topSingle.hardware;
    
    document.getElementById('stat-top-cpu-multi').textContent = topMulti.score ? topMulti.score.toLocaleString() : '-';
    document.getElementById('stat-top-cpu-multi-sub').textContent = topMulti.hardware;
    
    document.getElementById('stat-top-gpu').textContent = topGpu.score ? topGpu.score.toLocaleString() : '-';
    document.getElementById('stat-top-gpu-sub').textContent = topGpu.hardware;
}

// Sort data table columns
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
            case 'ram':
                valA = a.ram.toLowerCase();
                valB = b.ram.toLowerCase();
                break;
            case 'gpu':
                valA = a.gpu.toLowerCase();
                valB = b.gpu.toLowerCase();
                break;
            case 'vram':
                valA = a.vram.toLowerCase();
                valB = b.vram.toLowerCase();
                break;
            case 'os':
                valA = a.os.toLowerCase();
                valB = b.os.toLowerCase();
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
            case 'date':
                valA = a.dateTime;
                valB = b.dateTime;
                break;
            default:
                valA = a.mainScore || 0;
                valB = b.mainScore || 0;
        }
        
        if (valA < valB) return isAsc ? -1 : 1;
        if (valA > valB) return isAsc ? 1 : -1;
        return 0;
    });
}

// Render Table Rows
function renderTable() {
    const tbody = document.getElementById('leaderboard-body');
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="12" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
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
        
        const displayId = row.clientId !== 'N/D' && row.clientId.length > 8 
            ? row.clientId.substring(0, 8) 
            : row.clientId;
            
        let clientIdHtml = '';
        if (row.clientId === 'N/D') {
            clientIdHtml = '<span class="nd-cell">N/D</span>';
        } else {
            clientIdHtml = `
                <div class="client-id-badge" title="Full ID: ${row.clientId} (Click to copy)" onclick="copyToClipboard('${row.clientId}', this)">
                    <span class="client-id-text">${displayId}</span>
                    <i data-lucide="copy" class="copy-icon"></i>
                </div>
            `;
        }
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="rank-cell">${rankContent}</td>
            <td>${clientIdHtml}</td>
            <td title="${row.cpu}">${row.cpu}</td>
            <td>${row.ram}</td>
            <td title="${row.gpu}">${row.gpu}</td>
            <td>${row.vram}</td>
            <td title="${row.os}">${row.os}</td>
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
    let clean = name.replace(/^(AMD|Intel|NVIDIA|Intel\(R\))\s+/i, '');
    clean = clean.replace(/\s+Graphics.*/i, ''); // strip " Graphics"
    clean = clean.replace(/\(tm\)/gi, '');
    clean = clean.replace(/\(R\)/gi, '');
    return clean.trim();
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

    return null;
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
    const dist = { Handheld: 0, Notebook: 0 };
    data.forEach(r => {
        const type = classifyDevice(r);
        if (type) {
            dist[type]++;
        }
    });
    return dist;
}

// Get Mobile category averages
function getMobileAverages(data) {
    const handhelds = data.filter(r => classifyDevice(r) === 'Handheld');
    const notebooks = data.filter(r => classifyDevice(r) === 'Notebook');

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
        }
    };
}

// Get top mobile CPUs by average performance (using Single Thread)
function getTopMobileCPUs(data, limit = 10) {
    const mobileData = data.filter(r => classifyDevice(r) !== null && r.cpuSingle !== null);
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
            return { name, avg, clientId: bestRun.clientId };
        })
        .sort((a, b) => b.avg - a.avg)
        .slice(0, limit);
}

// Get top mobile GPUs by average performance (excluding desktop GPUs)
function getTopMobileGPUs(data, limit = 10) {
    const mobileData = data.filter(r => {
        if (classifyDevice(r) === null) return false;
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
            return { name, avg, clientId: bestRun.clientId };
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
            label: r.user && r.user !== 'Anonymous' ? `${r.user} (${normalizeCPU(r.cpu)})` : normalizeCPU(r.cpu),
            score: r.mainScore
        }));
}

// Get Mobile OS distribution
function getMobileOSDistribution(data) {
    const mobileData = data.filter(r => classifyDevice(r) !== null);
    return getOSDistribution(mobileData);
}

// Get Handheld OS distribution
function getHandheldOSDistribution(data) {
    const handheldData = data.filter(r => classifyDevice(r) === 'Handheld');
    return getOSDistribution(handheldData);
}

// Helper to get CPU Brand distribution
function getCPUBrandDistribution(data) {
    const brands = { AMD: 0, Intel: 0, Other: 0 };
    data.forEach(r => {
        const cpu = (r.cpu || '').toLowerCase();
        if (cpu.includes('amd') || cpu.includes('ryzen') || cpu.includes('epyc') || cpu.includes('fx') || cpu.includes('apu') || cpu.includes('deck') || cpu.includes('bc-250')) {
            brands.AMD++;
        } else if (cpu.includes('intel') || cpu.includes('xeon') || cpu.includes('i3') || cpu.includes('i5') || cpu.includes('i7') || cpu.includes('i9') || cpu.includes('ultra')) {
            brands.Intel++;
        } else {
            brands.Other++;
        }
    });
    return brands;
}

// Helper to get GPU Brand distribution
function getGPUBrandDistribution(data) {
    const brands = { NVIDIA: 0, AMD: 0, Intel: 0, Other: 0 };
    data.forEach(r => {
        const gpu = (r.gpu || '').toLowerCase();
        if (gpu.includes('nvidia') || gpu.includes('rtx') || gpu.includes('gtx') || gpu.includes('geforce') || gpu.includes('quadro') || gpu.includes('nvk') || gpu.includes('gt 1030')) {
            brands.NVIDIA++;
        } else if (gpu.includes('amd') || gpu.includes('radeon') || gpu.includes('rx') || gpu.includes('r9') || gpu.includes('r7') || gpu.includes('r5') || gpu.includes('z1 extreme') || gpu.includes('deck') || (gpu.includes('graphics') && !gpu.includes('intel'))) {
            brands.AMD++;
        } else if (gpu.includes('intel') || gpu.includes('arc') || gpu.includes('uhd') || gpu.includes('hd graphics')) {
            brands.Intel++;
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
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
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
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
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
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
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
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
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
        'rgba(16, 185, 129, 0.85)',
        '#10b981',
        undefined,
        mainXMin,
        mainRuns.map(r => r.clientId),
        mainRuns.map(r => r.cpu),
        mainRuns.map(r => r.gpu)
    );

    // 1. CPU Single Thread Top 10 Chart
    const cpuSingleRuns = benchmarkData
        .filter(r => r.cpuSingle !== null)
        .sort((a, b) => b.cpuSingle - a.cpuSingle)
        .slice(0, 10);
    
    const cpuSingleScores = cpuSingleRuns.map(r => r.cpuSingle);
    const cpuSingleMin = cpuSingleScores.length > 0 ? Math.min(...cpuSingleScores) : 0;
    const cpuSingleXMin = Math.floor(cpuSingleMin * 0.9);
    
    renderHorizontalBarChart(
        'cpuSingleChart',
        cpuSingleRuns.map(r => r.cpu),
        cpuSingleScores,
        'CPU Single Score',
        'rgba(99, 102, 241, 0.85)',
        '#818cf8',
        undefined,
        cpuSingleXMin,
        cpuSingleRuns.map(r => r.clientId)
    );
    
    // 2. CPU Multi Thread Top 10 Chart
    const cpuMultiRuns = benchmarkData
        .filter(r => r.cpuMulti !== null)
        .sort((a, b) => b.cpuMulti - a.cpuMulti)
        .slice(0, 10);
        
    renderHorizontalBarChart(
        'cpuMultiChart',
        cpuMultiRuns.map(r => r.cpu),
        cpuMultiRuns.map(r => r.cpuMulti),
        'CPU Multi Score',
        'rgba(168, 85, 247, 0.85)',
        '#c084fc',
        undefined,
        undefined,
        cpuMultiRuns.map(r => r.clientId)
    );
    
    // 3. GPU Performance Top 10 Chart
    const gpuRuns = benchmarkData
        .filter(r => r.gpuScore !== null)
        .sort((a, b) => b.gpuScore - a.gpuScore)
        .slice(0, 10);
        
    renderHorizontalBarChart(
        'gpuChart',
        gpuRuns.map(r => r.gpu),
        gpuRuns.map(r => r.gpuScore),
        'GPU Score',
        'rgba(14, 165, 233, 0.85)',
        '#38bdf8',
        undefined,
        undefined,
        gpuRuns.map(r => r.clientId)
    );

    // 4. Top 10 CPU - Most Used Chart
    const popularCPUs = getTopHardware(benchmarkData, 'cpu', 10);
    renderHorizontalBarChart(
        'cpuPopularChart',
        popularCPUs.map(c => c.name),
        popularCPUs.map(c => c.count),
        'Count',
        'rgba(245, 158, 11, 0.85)',
        '#f59e0b'
    );

    // 5. Top 10 GPU - Most Used Chart
    const popularGPUs = getTopHardware(benchmarkData, 'gpu', 10);
    renderHorizontalBarChart(
        'gpuPopularChart',
        popularGPUs.map(g => g.name),
        popularGPUs.map(g => g.count),
        'Count',
        'rgba(16, 185, 129, 0.85)',
        '#10b981'
    );

    // 6. Pie/Doughnut OS Distribution Chart
    const osDist = getOSDistribution(benchmarkData);
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
    const cpuBrandDist = getCPUBrandDistribution(benchmarkData);
    renderDoughnutChart(
        'cpuBrandDistChart',
        Object.keys(cpuBrandDist),
        Object.values(cpuBrandDist),
        [
            'rgba(244, 63, 94, 0.8)', // AMD
            'rgba(14, 165, 233, 0.8)', // Intel
            'rgba(156, 163, 175, 0.8)'  // Other
        ],
        [
            '#fb7185',
            '#38bdf8',
            '#9ca3af'
        ]
    );

    // 8. Pie/Doughnut GPU Brand Distribution Chart
    const gpuBrandDist = getGPUBrandDistribution(benchmarkData);
    renderDoughnutChart(
        'gpuBrandDistChart',
        Object.keys(gpuBrandDist),
        Object.values(gpuBrandDist),
        [
            'rgba(16, 185, 129, 0.8)', // NVIDIA
            'rgba(244, 63, 94, 0.8)', // AMD
            'rgba(14, 165, 233, 0.8)', // Intel
            'rgba(156, 163, 175, 0.8)'  // Other
        ],
        [
            '#34d399',
            '#fb7185',
            '#38bdf8',
            '#9ca3af'
        ]
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
    makeChartScrollable(
        'cpuAverageChart',
        cpuAverages.map(c => c.name),
        cpuAverages.map(c => c.average),
        'Average CPU Single Score',
        'rgba(99, 102, 241, 0.85)',
        '#818cf8',
        10
    );

    // 11. Average GPU score by model
    const gpuAverages = getAverageScores(benchmarkData, 'gpu');
    makeChartScrollable(
        'gpuAverageChart',
        gpuAverages.map(g => g.name),
        gpuAverages.map(g => g.average),
        'Average GPU Score',
        'rgba(14, 165, 233, 0.85)',
        '#38bdf8',
        10
    );

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
    const mesaVersions = getVersionDistribution(benchmarkData, 'mesa');
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
    const kernelVersions = getVersionDistribution(benchmarkData, 'kernel');
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
    const nvidiaVersions = getVersionDistribution(benchmarkData, 'nvidia');
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

    // Mobile Charts Rendering
    if (!document.getElementById('mobileDistChart')) return;

    // 16. Mobile distribution
    const mobileDist = getMobileDistribution(benchmarkData);
    renderDoughnutChart(
        'mobileDistChart',
        Object.keys(mobileDist),
        Object.values(mobileDist),
        [
            'rgba(99, 102, 241, 0.8)', // Handheld - Indigo
            'rgba(245, 158, 11, 0.8)'   // Notebook - Amber
        ],
        [
            '#818cf8',
            '#fbbf24'
        ]
    );

    // Helper to get colors for OS labels
    const getMobileOsColors = (labels) => {
        const bgColors = [];
        const borderColors = [];
        let colorIdx = 0;
        labels.forEach(label => {
            if (label === 'Other') {
                bgColors.push('rgba(107, 114, 128, 0.8)'); // Gray
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

    // 16a. Mobile OS Distribution
    const mobileOsDist = getMobileOSDistribution(benchmarkData);
    const mobileOsLabels = Object.keys(mobileOsDist);
    const mobileOsColors = getMobileOsColors(mobileOsLabels);
    renderDoughnutChart(
        'mobileOsDistChart',
        mobileOsLabels,
        Object.values(mobileOsDist),
        mobileOsColors.bgColors,
        mobileOsColors.borderColors
    );

    // 16b. Handheld OS Distribution
    const handheldOsDist = getHandheldOSDistribution(benchmarkData);
    const handheldOsLabels = Object.keys(handheldOsDist);
    const handheldOsColors = getMobileOsColors(handheldOsLabels);
    renderDoughnutChart(
        'handheldOsDistChart',
        handheldOsLabels,
        Object.values(handheldOsDist),
        handheldOsColors.bgColors,
        handheldOsColors.borderColors
    );

    // 17. Notebook vs Handheld Averages comparison
    const mobileAvgs = getMobileAverages(benchmarkData);
    const avgLabels = ['Main Score', 'CPU Single', 'CPU Multi', 'GPU Score'];
    const avgDatasets = [
        {
            label: 'Handheld',
            data: [
                mobileAvgs.handheld.mainScore,
                mobileAvgs.handheld.cpuSingle,
                mobileAvgs.handheld.cpuMulti,
                mobileAvgs.handheld.gpuScore
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.85)',
            borderColor: '#818cf8',
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.8,
            categoryPercentage: 0.6
        },
        {
            label: 'Notebook',
            data: [
                mobileAvgs.notebook.mainScore,
                mobileAvgs.notebook.cpuSingle,
                mobileAvgs.notebook.cpuMulti,
                mobileAvgs.notebook.gpuScore
            ],
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            borderColor: '#fbbf24',
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.8,
            categoryPercentage: 0.6
        }
    ];
    renderGroupedBarChart('mobileAveragesChart', avgLabels, avgDatasets);

    // 18. Top 10 Mobile CPUs
    const topMobileCPUs = getTopMobileCPUs(benchmarkData, 10);
    renderHorizontalBarChart(
        'mobileCpuChart',
        topMobileCPUs.map(c => c.name),
        topMobileCPUs.map(c => c.avg),
        'Avg CPU Single Score',
        topMobileCPUs.map(c => isHandheldCPU(c.name) ? 'rgba(99, 102, 241, 0.85)' : 'rgba(168, 85, 247, 0.85)'),
        topMobileCPUs.map(c => isHandheldCPU(c.name) ? '#818cf8' : '#c084fc'),
        undefined,
        undefined,
        topMobileCPUs.map(c => c.clientId)
    );

    // 19. Top 10 Mobile GPUs
    const topMobileGPUs = getTopMobileGPUs(benchmarkData, 10);
    renderHorizontalBarChart(
        'mobileGpuChart',
        topMobileGPUs.map(g => g.name),
        topMobileGPUs.map(g => g.avg),
        'Avg GPU Score',
        topMobileGPUs.map(g => isHandheldGPU(g.name) ? 'rgba(99, 102, 241, 0.85)' : 'rgba(14, 165, 233, 0.85)'),
        topMobileGPUs.map(g => isHandheldGPU(g.name) ? '#818cf8' : '#38bdf8'),
        undefined,
        undefined,
        topMobileGPUs.map(g => g.clientId)
    );

    // 20. Top 10 Handheld Overall
    const topHandhelds = getTopHandheldRuns(benchmarkData, 10);
    renderHorizontalBarChart(
        'handheldOverallChart',
        topHandhelds.map(h => h.label),
        topHandhelds.map(h => h.score),
        'Main Score',
        'rgba(16, 185, 129, 0.85)',
        '#10b981'
    );

    // 21. PascubeDB Community Insights Section Calculations & Rendering
    if (document.getElementById('stat-unique-clients')) {
        // 1. Unique Contributors
        const uniqueClients = new Set();
        benchmarkData.forEach(r => {
            if (r.clientId && r.clientId !== 'N/D') {
                uniqueClients.add(r.clientId);
            }
        });
        document.getElementById('stat-unique-clients').textContent = uniqueClients.size.toLocaleString();

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
        document.getElementById('stat-unique-hardware').textContent = (uniqueCPUs.size + uniqueGPUs.size).toLocaleString();

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
        document.getElementById('stat-recent-submissions').textContent = last7DaysCount.toLocaleString();

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
                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                            titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                            bodyFont: { family: "'Inter', sans-serif", size: 13 },
                            padding: 12,
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
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

    }
}

// Horizontal Bar Chart Renderer
function renderHorizontalBarChart(canvasId, labels, data, datasetLabel, barColor, borderColor, xMax, xMin, clientIds, cpus, gpus) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
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
                barPercentage: 0.65,
                clientIds: clientIds,
                cpus: cpus,
                gpus: gpus
            }]
        },
        options: {
            indexAxis: 'y', // Makes it a horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide legend to keep it clean
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
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
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const lines = [`${context.dataset.label}: ${context.parsed.x.toLocaleString()}`];
                            if (context.dataset.cpus && context.dataset.cpus[context.dataIndex]) {
                                lines.push(`CPU: ${context.dataset.cpus[context.dataIndex]}`);
                            }
                            if (context.dataset.gpus && context.dataset.gpus[context.dataIndex]) {
                                lines.push(`GPU: ${context.dataset.gpus[context.dataIndex]}`);
                            }
                            if (context.dataset.clientIds && context.dataset.clientIds[context.dataIndex]) {
                                const clientId = context.dataset.clientIds[context.dataIndex];
                                const displayId = (clientId && clientId !== 'N/D') 
                                    ? (clientId.length > 8 ? clientId.substring(0, 8) : clientId)
                                    : 'N/D';
                                lines.push(`Client ID: ${displayId}`);
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
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        tickBorderDash: [3, 3]
                    },
                    ticks: {
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
                        // Truncate long hardware names to prevent chart squeezing
                        callback: function(value) {
                            const label = this.getLabelForValue(value);
                            return label.length > 30 ? label.substring(0, 30) + '...' : label;
                        }
                    }
                }
            }
        }
    });
}

// Make a Horizontal Bar Chart scrollable by dynamically swapping visible data on scroll
function makeChartScrollable(canvasId, allLabels, allData, datasetLabel, barColor, borderColor, visibleCount = 10) {
    // Initial slice to render the first few bars
    const initialLabels = allLabels.slice(0, visibleCount);
    const initialData = allData.slice(0, visibleCount);
    
    // Find the maximum value in the entire dataset to lock the X-axis scale
    const xMax = allData.length > 0 ? Math.max(...allData) : undefined;
    
    // Check if initial visible items all have score < 1000
    const initialMax = initialData.length > 0 ? Math.max(...initialData) : 0;
    let initialXMax = xMax;
    if (xMax !== undefined && initialMax < 1000) {
        initialXMax = xMax / 2;
    }
    
    renderHorizontalBarChart(canvasId, initialLabels, initialData, datasetLabel, barColor, borderColor, initialXMax);
    
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
            
            // Adjust X-axis scale: if all currently visible items are < 1000, reduce max by half
            const currentMax = newData.length > 0 ? Math.max(...newData) : 0;
            if (xMax !== undefined) {
                if (currentMax < 1000) {
                    chart.options.scales.x.max = xMax / 2;
                } else {
                    chart.options.scales.x.max = xMax;
                }
            }
            
            chart.data.labels = newLabels;
            chart.data.datasets[0].data = newData;
            chart.update('none'); // Update without animation for buttery smooth scrolling
        }
    };
    
    overlay.onscroll = updateVisibleData;
    
    // Allow wheel scrolling on the canvas to scroll the overlay
    canvas.onwheel = (e) => {
        e.preventDefault();
        overlay.scrollTop += e.deltaY;
    };
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
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
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
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    cornerRadius: 8
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
