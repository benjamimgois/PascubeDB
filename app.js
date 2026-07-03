// Pascube Benchmark Dashboard Logic

const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1nlMgeW0ZFmtwwT3hty8JAFT3sM0SNhMpc24mH3In9zI/export?format=csv";

// Fallback CSV Data to ensure the dashboard works even offline or in case of CORS/network issues
const FALLBACK_CSV = `Origem / Usuário,CPU,RAM,GPU,VRAM,Driver,Kernel,Operating System,Main Score,CPU Single,CPU Multi,GPU Score,Date/Time,client-id,architecture,package,,product name
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
Anonymous,i5-5250U @ 1.60GHz,8GB,Intel(R) HD Graphics 6000 (BDW GT3),7.7GB,Mesa 26.1.2,6.14.0-37-generic,Linux Mint 22.3,54,1,1,107,14/06/2026 18:04:47,,x86_64,native
Anonymous,Raspberry Pi 5,8GB,VideoCore VII,0.5GB,Mesa 26.1.2,7.0.12-1-cachyos,Ubuntu 24.04 LTS,94,1,1,67,20/06/2026 12:00:00,,aarch64,native,,Raspberry Pi 5 Rev 1.0
Anonymous,Orange Pi 5 Plus,16GB,Mali G610,2GB,Mesa 26.1.2,7.0.12-1-cachyos,Debian 12,78,1,1,52,22/06/2026 14:30:00,,aarch64,native,,Orange Pi 5 Plus 16GB`;

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
let currentSort = { column: 'mainScore', direction: 'desc' };
let chartVizState = { mesa: { mode: 'absolute', normalize: false }, nvidia: { mode: 'absolute', normalize: false }, kernel: { mode: 'absolute', normalize: false }, os: { mode: 'absolute', normalize: false }, cpuAverage: { mode: 'absolute', normalize: false }, gpuAverage: { mode: 'absolute', normalize: false } };
let baselineState = { mesa: null, nvidia: null, kernel: null, os: null, cpuAverage: null, gpuAverage: null };
let modelSelection = { cpuAverage: [], gpuAverage: [], mesa: null, nvidia: null, kernel: null, os: null };
let lastSoftwareData = { mesa: null, nvidia: null, kernel: null, os: null, cpuAverage: null, gpuAverage: null };
let modelSelectorActiveType = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupTabNavigation();
    setupBaselineListeners();
    setupChartVizControls();
    setupModelSelectorListeners();
    initSkeletonLoading();
    initScrollObservers();
    initBackToTop();
    fetchData();
});

// Tab Navigation — Hardware / Software
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    window.switchTab = (target) => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.style.display = 'none');
        const activeTab = document.querySelector(`.tab-btn[data-tab="${target}"]`);
        const activeContents = document.querySelectorAll(`.tab-content[data-tab="${target}"]`);
        if (activeTab) activeTab.classList.add('active');
        activeContents.forEach(c => c.style.display = 'block');
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

function renderAverageChart(type) {
    const cfg = AVERAGE_CHART_CONFIG[type];
    if (!cfg) return;
    const data = lastSoftwareData[type];
    if (!data || !document.getElementById(cfg.chartId)) return;
    if (chartInstances[cfg.chartId]) { chartInstances[cfg.chartId].destroy(); delete chartInstances[cfg.chartId]; }
    makeChartScrollable(cfg.chartId, data.map(d => d.name), data.map(d => d.average), cfg.label, cfg.color, cfg.border, cfg.maxItems);
}

function openModelSelector(type) {
    const data = lastSoftwareData[type];
    if (!data) return;
    const isAverage = type === 'cpuAverage' || type === 'gpuAverage';
    const maxItems = isAverage ? 5 : 10;

    let items;
    if (isAverage) {
        if (!data.length || data.length < 2) return;
        items = data.map(d => d.name);
    } else {
        items = data.hwLabels;
        if (items.length < 2) return;
    }

    modelSelectorActiveType = type;
    const modal = document.getElementById('model-select-modal');
    const list = document.getElementById('model-select-list');
    const title = document.getElementById('model-select-title');
    if (!modal || !list) return;

    const names = { cpuAverage: 'CPU Models', gpuAverage: 'GPU Models', mesa: 'GPU Models', nvidia: 'GPU Models', kernel: 'CPU Models' };
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
}

function renderSoftwareDeltaChart(type) {
    const data = lastSoftwareData[type];
    if (!data) return;
    const sel = modelSelection[type];
    if (!sel || sel.length < 2) return;
    const filtered = { points: data.points.filter(p => sel.includes(p.hardwareLabel)), hwLabels: data.hwLabels.filter(h => sel.includes(h)) };
    const chartId = BASELINE_CHART_MAP[type];
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
    ['mesa', 'nvidia', 'kernel', 'cpuAverage', 'gpuAverage'].forEach(type => {
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
                    const baselineRow = document.querySelector(`#${VIZ_CHART_IDS[type].mode}`).closest('.chart-viz-row').querySelector('.baseline-row');
                    const toggleLabel = document.getElementById(VIZ_CHART_IDS[type].toggle);
                    if (baselineRow) baselineRow.style.display = btn.dataset.value === 'delta' ? '' : 'none';
                    if (toggleLabel) toggleLabel.style.display = btn.dataset.value === 'absolute' ? '' : 'none';
                    if (isAverageChart) {
                        renderAverageChart(type);
                    } else {
                        if (btn.dataset.value === 'delta') {
                            if (!modelSelection[type] || modelSelection[type].length === 0) {
                                openModelSelector(type);
                            } else {
                                renderSoftwareDeltaChart(type);
                            }
                        } else {
                            const data = lastSoftwareData[type];
                            if (!data || !document.getElementById(chartId)) return;
                            if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
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
                cb.addEventListener('change', () => {
                    chartVizState[type].normalize = cb.checked;
                    if (isAverageChart) {
                        renderAverageChart(type);
                    } else {
                        const vs = chartVizState[type];
                        if (vs.mode === 'delta') {
                            if (!modelSelection[type] || modelSelection[type].length === 0) {
                                openModelSelector(type);
                            } else {
                                renderSoftwareDeltaChart(type);
                            }
                        } else {
                            const data = lastSoftwareData[type];
                            if (!data || !document.getElementById(chartId)) return;
                            if (chartInstances[chartId]) { chartInstances[chartId].destroy(); delete chartInstances[chartId]; }
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
        const baselineRow = modeEl.closest('.chart-viz-row')?.querySelector('.baseline-row');
        const toggleLabel = document.getElementById(VIZ_CHART_IDS[type].toggle);
        const isDefaultDelta = chartVizState[type].mode === 'delta';
        if (baselineRow) baselineRow.style.display = isDefaultDelta ? '' : 'none';
        if (toggleLabel) toggleLabel.style.display = isDefaultDelta ? 'none' : '';
    });
}

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
            gpuVal = 'Radeon Graphics';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0405') {
            gpuVal = 'Steam Deck';
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
            dateTime: getFormattedVal(12) || 'N/D',
            clientId: getVal(13) || 'N/D',
            architecture: getVal(14) || 'N/D',
            packageType: getVal(15) || 'N/D',
            productName: getVal(17) || 'N/D'
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
            gpuVal = 'Radeon Graphics';
        } else if (gpuVal.trim() === 'AMD Custom GPU 0405') {
            gpuVal = 'Steam Deck';
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
            dateTime: row[12] || 'N/D',
            clientId: row[13] || 'N/D',
            architecture: row[14] || 'N/D',
            packageType: row[15] || 'N/D',
            productName: row[17] || 'N/D'
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
            row.user.toLowerCase().includes(searchQuery) ||
            (row.clientId && row.clientId.toLowerCase().includes(searchQuery));
            
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
    
    document.getElementById('stat-top-cpu-single').textContent = animateCounter('stat-top-cpu-single', topSingle.score || 0);
    document.getElementById('stat-top-cpu-single-sub').textContent = topSingle.hardware;
    
    document.getElementById('stat-top-cpu-multi').textContent = animateCounter('stat-top-cpu-multi', topMulti.score || 0, true);
    document.getElementById('stat-top-cpu-multi-sub').textContent = topMulti.hardware;
    
    document.getElementById('stat-top-gpu').textContent = animateCounter('stat-top-gpu', topGpu.score || 0, true);
    document.getElementById('stat-top-gpu-sub').textContent = topGpu.hardware;

    // Most Humble: lowest valid mainScore
    let humbleScore = Infinity;
    let humbleHardware = '-';
    benchmarkData.forEach(row => {
        if (humbleScore > 1 && row.mainScore && row.mainScore > 0 && row.mainScore < humbleScore) {
            humbleScore = row.mainScore;
            humbleHardware = normalizeCPU(row.cpu) + ' + ' + normalizeGPU(row.gpu);
        }
    });
    document.getElementById('stat-most-humble-score').textContent = animateCounter('stat-most-humble-score', humbleScore < Infinity ? humbleScore : 0);
    document.getElementById('stat-most-humble-hardware').textContent = humbleScore < Infinity ? humbleHardware : 'No data';
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
                    <span class="client-id-text">${displayName}</span>
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
    if (/^(AMD\s*)?Radeon\s*Graphics|^Graphics$/i.test(name.trim())) return 'AMD Vega';
    let clean = name.replace(/^(AMD|Intel|NVIDIA|Radeon|Intel\(R\))\s+/i, '');
    clean = clean.replace(/(?:^\s*|\s+)Graphics.*/i, ''); // strip " Graphics"
    clean = clean.replace(/\(tm\)/gi, '');
    clean = clean.replace(/\(R\)/gi, '');
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
            return { name, avg, displayName: getDisplayName(bestRun) };
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
            label: r.user && r.user !== 'Anonymous' ? `${r.user} (${normalizeCPU(r.cpu)})` : normalizeCPU(r.cpu),
            score: r.mainScore
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
            label: r.user && r.user !== 'Anonymous' ? `${r.user} (${normalizeCPU(r.cpu)})` : normalizeCPU(r.cpu),
            score: r.mainScore
        }));
}

// Get top CPUs by category (Notebook/Handheld/SBC) by average CPU Single score
function getTopCategoryCPUs(data, category, limit = 10) {
    const catData = data.filter(r => classifyDevice(r) === category && r.cpuSingle !== null);
    const groups = {};

    catData.forEach(r => {
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

    const groups = {};
    catData.forEach(r => {
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

// Helper to get CPU Brand distribution
function getCPUBrandDistribution(data) {
    const brands = { AMD: 0, Intel: 0, ARM: 0, Other: 0 };
    data.forEach(r => {
        const cpu = (r.cpu || '').toLowerCase();
        const arch = (r.architecture || '').toLowerCase();
        if (arch === 'aarch64') {
            brands.ARM++;
        } else if (cpu.includes('amd') || cpu.includes('ryzen') || cpu.includes('epyc') || cpu.includes('fx') || cpu.includes('apu') || cpu.includes('deck') || cpu.includes('bc-250')) {
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
        } else if (gpu.includes('amd') || gpu.includes('radeon') || gpu.includes('rx') || gpu.includes('r9') || gpu.includes('r7') || gpu.includes('r5') || gpu.includes('z1 extreme') || gpu.includes('deck') || gpu.includes('660m') || gpu.includes('610m') || gpu.includes('680m') || gpu.includes('550x') || gpu.includes('w5500') || gpu.includes('hd 8') || gpu.includes('hd 7') || gpu.includes('hd 6') || (gpu.includes('graphics') && !gpu.includes('intel'))) {
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
        if (!pkg || pkg === 'n/d' || pkg === '') pkg = 'Unknown';
        counts[pkg] = (counts[pkg] || 0) + 1;
    });
    const order = ['native', 'flatpak', 'appimage', 'Unknown'];
    const sorted = {};
    order.forEach(k => { if (counts[k]) sorted[k] = counts[k]; });
    Object.keys(counts).sort().forEach(k => { if (!order.includes(k)) sorted[k] = counts[k]; });
    return sorted;
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
    const id = run.clientId || 'N/D';
    if (id === 'N/D') return 'N/D';
    return id.length > 8 ? id.substring(0, 8) : id;
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
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
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
        mainRuns.map(r => r.gpu)
    );

    // 1. CPU Single Thread Top 10 Chart (best per client)
    const cpuSingleRuns = dedupeBestPerClient(
        benchmarkData.filter(r => r.cpuSingle !== null),
        'cpuSingle'
    ).slice(0, 10);
    
    const cpuSingleScores = cpuSingleRuns.map(r => r.cpuSingle);
    const cpuSingleMin = cpuSingleScores.length > 0 ? Math.min(...cpuSingleScores) : 0;
    const cpuSingleXMin = Math.floor(cpuSingleMin * 0.9);
    
    renderHorizontalBarChart(
        'cpuSingleChart',
        cpuSingleRuns.map(r => r.cpu),
        cpuSingleScores,
        'CPU Single Score',
        SCORE_COLORS.cpuSingle.bg,
        SCORE_COLORS.cpuSingle.border,
        undefined,
        cpuSingleXMin,
        cpuSingleRuns.map(r => getDisplayName(r))
    );
    
    // 2. CPU Multi Thread Top 10 Chart (best per client)
    const cpuMultiRuns = dedupeBestPerClient(
        benchmarkData.filter(r => r.cpuMulti !== null),
        'cpuMulti'
    ).slice(0, 10);
        
    const cpuMultiScores = cpuMultiRuns.map(r => r.cpuMulti);
    const cpuMultiMin = cpuMultiScores.length > 0 ? Math.min(...cpuMultiScores) : 0;
    const cpuMultiXMin = Math.floor(cpuMultiMin * 0.9);
    
    renderHorizontalBarChart(
        'cpuMultiChart',
        cpuMultiRuns.map(r => r.cpu),
        cpuMultiScores,
        'CPU Multi Score',
        SCORE_COLORS.cpuMulti.bg,
        SCORE_COLORS.cpuMulti.border,
        undefined,
        cpuMultiXMin,
        cpuMultiRuns.map(r => getDisplayName(r))
    );
    
    // 3. GPU Performance Top 10 Chart (best per client)
    const gpuRuns = dedupeBestPerClient(
        benchmarkData.filter(r => r.gpuScore !== null),
        'gpuScore'
    ).slice(0, 10);
        
    renderHorizontalBarChart(
        'gpuChart',
        gpuRuns.map(r => r.gpu),
        gpuRuns.map(r => r.gpuScore),
        'GPU Score',
        SCORE_COLORS.gpu.bg,
        SCORE_COLORS.gpu.border,
        undefined,
        undefined,
        gpuRuns.map(r => getDisplayName(r))
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
        SCORE_COLORS.popularGpu.bg,
        SCORE_COLORS.popularGpu.border
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
        makeChartScrollable(cfg.chartId, cpuAverages.map(c => c.name), cpuAverages.map(c => c.average), cfg.label, cfg.color, cfg.border, cfg.maxItems);
    }

    // 11. Average GPU score by model
    const gpuAverages = getAverageScores(benchmarkData, 'gpu');
    lastSoftwareData.gpuAverage = gpuAverages;
    {
        const cfg = AVERAGE_CHART_CONFIG.gpuAverage;
        makeChartScrollable(cfg.chartId, gpuAverages.map(g => g.name), gpuAverages.map(g => g.average), cfg.label, cfg.color, cfg.border, cfg.maxItems);
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
        // Top runs
        const runs = category === 'Notebook' ? getTopNotebookRuns :
                     category === 'Handheld' ? getTopHandheldRuns :
                     getTopSbcRuns;
        const runsData = runs(benchmarkData, 10);
        renderHorizontalBarChart(
            runsChartId,
            runsData.map(h => h.label),
            runsData.map(h => h.score),
            'Main Score',
            SCORE_COLORS.portableRuns.bg,
            SCORE_COLORS.portableRuns.border
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
        renderHorizontalBarChart(
            cpuChartId,
            cpuLabels,
            cpuData.map(c => c.avg),
            'Avg CPU Single Score',
            'rgba(99, 102, 241, 0.85)',
            '#818cf8',
            undefined,
            undefined,
            cpuData.map(c => c.displayName)
        );

        const gpuData = getTopCategoryGPUs(benchmarkData, category, 10);
        const gpuLabels = category === 'SBC' ? gpuData.map(g => {
            const match = benchmarkData.find(r => classifyDevice(r) === 'SBC' && normalizeGPU(r.gpu) === g.name);
            return match && match.productName && match.productName !== 'N/D' ? `${g.name}\n${match.productName}` : g.name;
        }) : gpuData.map(g => g.name);
        renderHorizontalBarChart(
            gpuChartId,
            gpuLabels,
            gpuData.map(g => g.avg),
            'Avg GPU Score',
            SCORE_COLORS.gpu.bg,
            SCORE_COLORS.gpu.border,
            undefined,
            undefined,
            gpuData.map(g => g.displayName)
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
                null
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
            if (modelSelection.mesa && modelSelection.mesa.length >= 2) {
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
            if (modelSelection.nvidia && modelSelection.nvidia.length >= 2) {
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
            if (modelSelection.kernel && modelSelection.kernel.length >= 2) {
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

    // Remove skeleton loaders after charts are rendered
    removeSkeletonLoading();

    // Update section insight analyses
    updateSectionInsights();

    // Initial tab state: show hardware after all charts rendered
    if (window.switchTab) window.switchTab('hardware');

}

// Grouped Horizontal Bars for Hardware Comparison
function renderHardwareComparisonBars(canvasId, scatterData) {
    if (!scatterData || !scatterData.points || scatterData.points.length === 0) return;
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Group points by version (dataset) and hardware (label)
    const labels = scatterData.hwLabels;
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

    const datasets = [...verSet].slice(0, 8).map((ver, idx) => {
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

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af', font: { family: "'Inter', sans-serif", size: 10 } } },
                y: { grid: { display: false }, ticks: { color: '#f3f4f6', font: { family: "'Outfit', sans-serif", size: 10, weight: 500 },
                    callback: function(v) { const lbl = this.getLabelForValue(v); return lbl.length > 25 ? lbl.substring(0, 25) + '...' : lbl; }
                }}
            },
            plugins: {
                legend: { display: true, position: 'top', labels: { color: '#f3f4f6', font: { family: "'Inter', sans-serif", size: 10 }, boxWidth: 10, padding: 8, usePointStyle: true } },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', titleFont: { family: "'Outfit', sans-serif", size: 12 }, bodyFont: { family: "'Inter', sans-serif", size: 12 },
                    padding: 10, borderColor: 'rgba(255, 255, 255, 0.15)', borderWidth: 1, cornerRadius: 8, displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const samples = context.dataset.sampleCounts ? context.dataset.sampleCounts[context.dataIndex] : 0;
                            return [`${context.dataset.label}: ${context.parsed.x.toLocaleString()}`, `Samples: ${samples || 0}`];
                        }
                    }
                }
            }
        }
    });
}

// OS vs Hardware Scatter Data Aggregation
function getOSvsHardwareScatterData(data, maxHardware = 15, minSamples = 3) {
    const groups = {};
    data.forEach(r => {
        const key = `${normalizeCPU(r.cpu)} + ${normalizeGPU(r.gpu)}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
    });

    const sorted = Object.entries(groups)
        .filter(([, runs]) => {
            if (runs.length < minSamples) return false;
            const osSet = new Set(runs.map(r => r.os));
            return osSet.size >= 2;
        })
        .sort((a, b) => b[1].length - a[1].length)
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
function getKernelScatterData(data, maxHardware = 12, minSamples = 2) {
    const groups = {};
    data.forEach(r => {
        const k = r.kernel || '';
        const match = k.match(/^(\d+\.\d+)/);
        if (!match) return;
        const version = match[1];
        const key = normalizeCPU(r.cpu);
        if (key === 'Unknown CPU' || key === 'N/D') return;
        if (!groups[key]) groups[key] = [];
        groups[key].push({ ...r, _kernelVer: version });
    });

    const hardwareRuns = Object.entries(groups)
        .filter(([, runs]) => {
            if (runs.length < minSamples) return false;
            const verSet = new Set(runs.map(r => r._kernelVer));
            return verSet.size >= 2;
        })
        .sort((a, b) => b[1].length - a[1].length)
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
function getDriverScatterData(data, driverType, maxHardware = 12, minSamples = 2) {
    const groups = {};
    data.forEach(r => {
        let version = null;
        if (driverType === 'mesa') {
            const gpuLower = (r.gpu || '').toLowerCase();
            if (gpuLower.includes('nvidia') || gpuLower.includes('rtx') || gpuLower.includes('geforce')) return;
            const d = r.driver || '';
            const match = d.match(/Mesa\s+(\d+\.\d+)(?:\.(\d+))?/i);
            if (match) version = match[2] === '99' ? `${match[1]} (mesa-git)` : match[1];
        } else if (driverType === 'nvidia') {
            const gpuLower = (r.gpu || '').toLowerCase();
            if (!gpuLower.includes('nvidia') && !gpuLower.includes('rtx') && !gpuLower.includes('geforce')) return;
            const d = r.driver || '';
            if (d.includes('NVRM') || d.includes('NVIDIA')) {
                const match = d.match(/(?:NVRM|NVIDIA).*?(\d+\.\d+)/i);
                if (match) version = match[1];
            }
        }
        if (!version) return;
        const key = normalizeGPU(r.gpu);
        if (key === 'Unknown GPU' || key === 'N/D') return;
        if (!groups[key]) groups[key] = [];
        groups[key].push({ ...r, _driverVer: version });
    });

    const hardwareRuns = Object.entries(groups)
        .filter(([, runs]) => {
            if (runs.length < minSamples) return false;
            const verSet = new Set(runs.map(r => r._driverVer));
            return verSet.size >= 2;
        })
        .sort((a, b) => b[1].length - a[1].length)
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
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
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

// Update section insight analyses with live data
function updateSectionInsights() {
    const data = benchmarkData;
    const total = data.length;

    // ---------- Highest Scores ----------
    const topByMain = [...data].filter(r => r.mainScore !== null).sort((a, b) => b.mainScore - a.mainScore).slice(0, 10);
    const topCpu = getTopHardware(topByMain, 'cpu', 1)[0];
    const topGpu = getTopHardware(topByMain, 'gpu', 1)[0];
    const topScore = topByMain.length > 0 ? topByMain[0].mainScore : 0;
    let hiText = '';
    if (topCpu && topGpu) {
        hiText = `The top 10 highest-scoring runs cluster around ${topCpu.name} and ${topGpu.name}, peaking at ${topScore.toLocaleString()} points. `;
        const topCpus = getTopHardware(topByMain, 'cpu', 3);
        const cpuNames = topCpus.map(c => c.name.toLowerCase());
        if (cpuNames.some(n => n.includes('amd') || n.includes('ryzen'))) {
            hiText += `AMD's strong showing reflects the maturity of the Zen architecture on Linux — where open-source driver support and scheduler optimizations give it an edge in both single and multi-threaded workloads. `;
        }
        const topGpus = getTopHardware(topByMain, 'gpu', 3);
        const gpuNames = topGpus.map(g => g.name.toLowerCase());
        const hasNvidia = gpuNames.some(n => n.includes('nvidia') || n.includes('rtx') || n.includes('geforce'));
        if (hasNvidia) {
            hiText += `NVIDIA's presence at the top underscores the impact of improved proprietary driver support and the growing Linux gaming scene driven by Proton and Steam.`;
        }
    }
    if (!hiText) hiText = 'Top benchmark scores showcase the best-performing hardware in the Linux ecosystem.';
    document.getElementById('insight-highest').textContent = hiText;

    // ---------- System Demographics ----------
    const topCpus = getTopHardware(data, 'cpu', 3);
    const topGpus = getTopHardware(data, 'gpu', 3);
    const osDist = getOSDistribution(data);
    const osEntries = Object.entries(osDist)
        .filter(([k]) => k !== 'Others' && k !== 'Other')
        .sort((a, b) => b[1] - a[1]);
    const topOs = osEntries.length > 0 ? osEntries[0] : null;
    const ramDist = getRAMDistribution(data);
    const ramEntries = Object.entries(ramDist || {}).sort((a, b) => b[1] - a[1]);
    const topRam = ramEntries.length > 0 ? ramEntries[0] : null;
    const top3Os = osEntries.slice(0, 3);
    const secondOs = top3Os.length > 1 ? top3Os[1] : null;
    const thirdOs = top3Os.length > 2 ? top3Os[2] : null;

    let demoText = '';
    if (topCpus.length > 0) {
        demoText += `${topCpus[0].name} leads CPU usage with ${topCpus[0].count} runs (${((topCpus[0].count/total)*100).toFixed(1)}%)`;
        if (topCpus.length > 1) demoText += `, followed by ${topCpus[1].name} (${((topCpus[1].count/total)*100).toFixed(1)}%)`;
        demoText += `. `;
        const cpuNames = topCpus.map(c => c.name.toLowerCase());
        if (cpuNames.some(n => n.includes('amd') || n.includes('ryzen'))) {
            demoText += `AMD's dominance reflects its strong open-source driver ecosystem and the Steam Deck's popularization of Ryzen APUs among Linux gamers. `;
        }
    }
    if (topGpus.length > 0) {
        demoText += `On the GPU side, ${topGpus[0].name} is the most common (${topGpus[0].count} runs, ${((topGpus[0].count/total)*100).toFixed(1)}%)`;
        if (topGpus.length > 1) demoText += `, ahead of ${topGpus[1].name}`;
        demoText += `. `;
        const gpuNames = topGpus.map(g => g.name.toLowerCase());
        const hasAmdGpu = gpuNames.some(n => n.includes('amd') || n.includes('radeon') || n.includes('rx'));
        const hasNvidiaGpu = gpuNames.some(n => n.includes('nvidia') || n.includes('rtx'));
        if (hasAmdGpu && hasNvidiaGpu) {
            demoText += `The AMD-vs-NVIDIA split in Linux benchmarks mirrors the broader community debate: AMD's open-source Mesa drivers vs NVIDIA's proprietary stack with increasingly capable open kernel modules. `;
        }
    }
    if (topOs) {
        demoText += `${topOs[0]} is the top OS at ${((topOs[1]/total)*100).toFixed(1)}%. `;
        if (secondOs) {
            const archNames = ['Arch Linux', 'CachyOS', 'Garuda'];
            if (archNames.includes(topOs[0]) || archNames.includes(secondOs[0]) || (thirdOs && archNames.includes(thirdOs[0]))) {
                demoText += `The strong presence of Arch-based distributions highlights the Linux benchmarking community's preference for rolling releases — they deliver the latest Mesa, kernel, and driver updates critical for gaming performance. `;
            }
        }
    }
    if (topRam) {
        demoText += `${topRam[0]} is the most common RAM tier.`;
    }
    document.getElementById('insight-demographics').textContent = demoText;

    // ---------- Advanced Performance & Versions ----------
    const mesaDist = getVersionDistribution(data, 'mesa');
    const mesaEntries = Object.entries(mesaDist || {}).sort((a, b) => b[1] - a[1]);
    const topMesa = mesaEntries.length > 0 ? mesaEntries[0] : null;
    const kernelDist = getVersionDistribution(data, 'kernel');
    const kernelEntries = Object.entries(kernelDist || {}).sort((a, b) => b[1] - a[1]);
    const topKernel = kernelEntries.length > 0 ? kernelEntries[0] : null;
    const nvidiaDist = getVersionDistribution(data, 'nvidia');
    const nvidiaEntries = Object.entries(nvidiaDist || {}).sort((a, b) => b[1] - a[1]);
    const topNvidia = nvidiaEntries.length > 0 ? nvidiaEntries[0] : null;

    let advText = '';
    if (topMesa) {
        const mesaPct = ((topMesa[1]/total)*100).toFixed(1);
        advText += `Mesa ${topMesa[0]} leads at ${mesaPct}% — `;
        if (mesaPct > 30) {
            advText += `this high concentration suggests most users are on up-to-date rolling releases or have recently upgraded their LTS distro. `;
        } else if (mesaEntries.length > 3) {
            advText += `the version fragmentation reveals the diversity of distro update cycles, from bleeding-edge Arch users on mesa-git to LTS holdouts. `;
        } else {
            advText += `. `;
        }
        const hasMesaGit = mesaEntries.some(([k]) => k.includes('mesa-git'));
        if (hasMesaGit) {
            advText += `The presence of mesa-git builds reflects a subset of enthusiasts tracking upstream development for the latest RADV and RadeonSI improvements. `;
        }
    }
    if (topKernel) {
        const kernelPct = ((topKernel[1]/total)*100).toFixed(1);
        advText += `Linux kernel ${topKernel[0]} powers ${kernelPct}% of runs. `;
        if (kernelEntries.length > 2) {
            advText += `The spread across multiple kernel versions mirrors the community's mix of LTS stability and cutting-edge mainline tracking. `;
        }
    }
    if (topNvidia) {
        const nvCount = data.filter(r => {
            const d = (r.driver || '').toLowerCase();
            return d.includes('nvidia') || d.includes('nvrm');
        }).length;
        advText += `Among the ${nvCount} NVIDIA users, driver ${topNvidia[0]} dominates — the proprietary stack remains the practical choice for CUDA and gaming, while the open-source NVK driver in Mesa is still maturing.`;
    }
    document.getElementById('insight-advanced').textContent = advText;

    // ---------- Portable Devices ----------
    const deviceTypes = { Notebook: 0, Handheld: 0, SBC: 0 };
    const notebookOS = {};
    const handheldOS = {};
    const sbcOS = {};
    data.forEach(r => {
        const type = classifyDevice(r);
        if (type === 'Notebook' || type === 'Handheld' || type === 'SBC') {
            deviceTypes[type]++;
            const os = (r.os || 'N/D').split(' ')[0];
            if (type === 'Notebook') notebookOS[os] = (notebookOS[os] || 0) + 1;
            if (type === 'Handheld') handheldOS[os] = (handheldOS[os] || 0) + 1;
            if (type === 'SBC') sbcOS[os] = (sbcOS[os] || 0) + 1;
        }
    });
    const sortOS = obj => Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const topNotebookOS = sortOS(notebookOS)[0];
    const topHandheldOS = sortOS(handheldOS)[0];
    const topSBCOs = sortOS(sbcOS)[0];
    const portableTotal = deviceTypes.Notebook + deviceTypes.Handheld + deviceTypes.SBC;
    const nbPct = portableTotal > 0 ? ((deviceTypes.Notebook/portableTotal)*100).toFixed(0) : 0;
    const hhPct = portableTotal > 0 ? ((deviceTypes.Handheld/portableTotal)*100).toFixed(0) : 0;
    const sbcPct = portableTotal > 0 ? ((deviceTypes.SBC/portableTotal)*100).toFixed(0) : 0;

    let portText = '';
    if (portableTotal > 0) {
        portText += `Notebooks make up ${nbPct}% of portable benchmarks (${deviceTypes.Notebook} runs), Handhelds ${hhPct}% (${deviceTypes.Handheld}), and SBCs ${sbcPct}% (${deviceTypes.SBC}). `;
    }
    if (deviceTypes.Handheld > 0) {
        const steamDeckCount = data.filter(r => {
            const cpu = (r.cpu || '').toLowerCase();
            const gpu = (r.gpu || '').toLowerCase();
            return cpu.includes('steam deck') || gpu.includes('steam deck');
        }).length;
        if (steamDeckCount > 0) {
            portText += `The Steam Deck accounts for a significant portion of handheld submissions — Valve's Linux-based gaming handheld has become the largest single driver of Linux benchmark contributions, validating Linux as a viable gaming platform. `;
        }
    }
    if (topNotebookOS) portText += `Notebooks predominantly run ${topNotebookOS[0]}. `;
    if (topHandheldOS) {
        portText += `Handhelds favor ${topHandheldOS[0]}`;
        if (topHandheldOS[0] === 'SteamOS' || topHandheldOS[0] === 'Bazzite') {
            portText += ` — the preference for gaming-oriented immutable distros reflects the console-like experience users expect from portable gaming PCs. `;
        } else {
            portText += `. `;
        }
    }
    if (topSBCOs) {
        portText += `SBCs mostly run ${topSBCOs[0]}`;
        if (topSBCOs[0].toLowerCase().includes('arm') || topSBCOs[0].toLowerCase().includes('debian') || topSBCOs[0].toLowerCase().includes('rasp')) {
            portText += ` — the ARM ecosystem continues to be a gateway for Linux experimentation and embedded development.`;
        } else {
            portText += `.`;
        }
    }
    if (!portText) portText = 'No portable device data available.';
    document.getElementById('insight-portable').textContent = portText;

    // ---------- Software Comparison ----------
    let softText = '';
    try {
        const osData = getOSvsHardwareScatterData(data);
        if (osData.points.length > 0) {
            const osCount = new Set(osData.points.map(p => p.os)).size;
            const best = [...osData.points].sort((a, b) => b.y - a.y)[0];
            const worst = [...osData.points].sort((a, b) => a.y - b.y)[0];

            // Find hardware with highest variance across OSes
            const osByHardware = {};
            osData.points.forEach(p => {
                if (!osByHardware[p.hardwareLabel]) osByHardware[p.hardwareLabel] = [];
                osByHardware[p.hardwareLabel].push(p);
            });
            let maxVarHw = '', maxVar = 0;
            Object.entries(osByHardware).forEach(([hw, pts]) => {
                const scores = pts.map(p => p.y);
                const range = Math.max(...scores) - Math.min(...scores);
                if (range > maxVar) { maxVar = range; maxVarHw = hw; }
            });

            // Count OS wins (best score per hardware)
            const osWins = {};
            Object.entries(osByHardware).forEach(([hw, pts]) => {
                const top = pts.reduce((a, b) => a.y > b.y ? a : b);
                osWins[top.os] = (osWins[top.os] || 0) + 1;
            });
            const winEntries = Object.entries(osWins).sort((a, b) => b[1] - a[1]);
            const topOs = winEntries[0];

            document.getElementById('insight-os-scatter').textContent =
                `${osData.hwLabels.length} hardware combos compared across ${osCount} OS — ${new Set(osData.points.map(p => p.os)).size} distinct. ` +
                (best ? `Peak: ${best.os} on ${best.hardwareLabel} (${best.y.toLocaleString()}). ` : '') +
                (topOs ? `${topOs[0]} leads with the best score on ${topOs[1]}/${osData.hwLabels.length} configs. ` : '') +
                (maxVar > 0 ? `Largest OS gap: ${maxVar.toLocaleString()} pts on ${maxVarHw} — OS choice matters most here.` : '');
            softText += `${osData.hwLabels.length} hardware combos, ${osCount} OS. `;
        }
    } catch (e) { /* ignore */ }

    try {
        const mesaData = getDriverScatterData(data, 'mesa');
        if (mesaData.points.length > 0) {
            const verCount = new Set(mesaData.points.map(p => p.label)).size;
            const best = [...mesaData.points].sort((a, b) => b.y - a.y)[0];
            const worst = [...mesaData.points].sort((a, b) => a.y - b.y)[0];

            // Group scores by version to see progression trend
            const verScores = {};
            mesaData.points.forEach(p => {
                if (!verScores[p.label]) verScores[p.label] = [];
                verScores[p.label].push(p.y);
            });
            const verAvgs = Object.entries(verScores).map(([v, s]) => ({
                label: v, avg: Math.round(s.reduce((a, b) => a + b, 0) / s.length)
            })).sort((a, b) => a.label.localeCompare(b.label));
            const trend = verAvgs.length >= 2
                ? (verAvgs[verAvgs.length - 1].avg - verAvgs[0].avg >= 0 ? 'upward' : 'flat')
                : null;

            document.getElementById('insight-mesa-scatter').textContent =
                `${mesaData.hwLabels.length} AMD GPU models across ${verCount} Mesa versions. ` +
                (best ? `Best: ${best.label} — ${best.hardwareLabel} (${best.y.toLocaleString()}). ` : '') +
                (verAvgs.length >= 3
                    ? `Average GPU score progression is ${trend} from ${verAvgs[0].label} (${verAvgs[0].avg.toLocaleString()}) to ${verAvgs[verAvgs.length-1].label} (${verAvgs[verAvgs.length-1].avg.toLocaleString()}). `
                    : '') +
                `RADV driver maturity means newer Mesa generally means better gaming performance on AMD.`;
            softText += `${mesaData.hwLabels.length} AMD GPUs, ${verCount} Mesa versions. `;
        }
    } catch (e) { /* ignore */ }

    try {
        const nvidiaData = getDriverScatterData(data, 'nvidia');
        if (nvidiaData.points.length > 0) {
            const verCount = new Set(nvidiaData.points.map(p => p.label)).size;
            const best = [...nvidiaData.points].sort((a, b) => b.y - a.y)[0];

            const verScores = {};
            nvidiaData.points.forEach(p => {
                if (!verScores[p.label]) verScores[p.label] = [];
                verScores[p.label].push(p.y);
            });
            const verAvgs = Object.entries(verScores).map(([v, s]) => ({
                label: v, avg: Math.round(s.reduce((a, b) => a + b, 0) / s.length)
            })).sort((a, b) => a.label.localeCompare(b.label));
            const trend = verAvgs.length >= 2
                ? (verAvgs[verAvgs.length - 1].avg - verAvgs[0].avg >= 0 ? 'upward' : 'flat')
                : null;

            document.getElementById('insight-nvidia-scatter').textContent =
                `${nvidiaData.hwLabels.length} NVIDIA GPU models across ${verCount} driver versions. ` +
                (best ? `Best: ${best.label} — ${best.hardwareLabel} (${best.y.toLocaleString()}). ` : '') +
                (verAvgs.length >= 3
                    ? `Average GPU score trend is ${trend} from ${verAvgs[0].label} (${verAvgs[0].avg.toLocaleString()}) to ${verAvgs[verAvgs.length-1].label} (${verAvgs[verAvgs.length-1].avg.toLocaleString()}). `
                    : '') +
                `Proprietary driver updates show measurable gains — worth tracking per GPU generation.`;
            softText += `${nvidiaData.hwLabels.length} NVIDIA GPUs, ${verCount} driver versions. `;
        }
    } catch (e) { /* ignore */ }

    try {
        const kernelData = getKernelScatterData(data);
        if (kernelData.points.length > 0) {
            const verCount = new Set(kernelData.points.map(p => p.label)).size;
            const best = [...kernelData.points].sort((a, b) => b.y - a.y)[0];

            const verScores = {};
            kernelData.points.forEach(p => {
                if (!verScores[p.label]) verScores[p.label] = [];
                verScores[p.label].push(p.y);
            });
            const verAvgs = Object.entries(verScores).map(([v, s]) => ({
                label: v, avg: Math.round(s.reduce((a, b) => a + b, 0) / s.length)
            })).sort((a, b) => a.label.localeCompare(b.label));
            const trend = verAvgs.length >= 2
                ? (verAvgs[verAvgs.length - 1].avg - verAvgs[0].avg >= 0 ? 'upward' : 'flat')
                : null;

            document.getElementById('insight-kernel-scatter').textContent =
                `${kernelData.hwLabels.length} CPU models across ${verCount} kernel versions. ` +
                (best ? `Best: ${best.label} — ${best.hardwareLabel} (${best.y.toLocaleString()}). ` : '') +
                (verAvgs.length >= 3
                    ? `CPU score trend is ${trend} from ${verAvgs[0].label} (${verAvgs[0].avg.toLocaleString()}) to ${verAvgs[verAvgs.length-1].label} (${verAvgs[verAvgs.length-1].avg.toLocaleString()}). `
                    : '') +
                `Scheduler and driver improvements in newer kernels yield gains especially on recent architectures.`;
            softText += `${kernelData.hwLabels.length} CPUs, ${verCount} kernel versions. `;
        }
    } catch (e) { /* ignore */ }

    if (!softText) softText = 'Insufficient data for software comparisons.';
    document.getElementById('insight-software').textContent = softText;

    // ---------- Community Insights ----------
    const uniqueClients = new Set(data.map(r => r.clientId).filter(id => id && id !== 'N/D'));
    const parsedDates = data.map(r => parseDate(r.dateTime)).filter(d => d !== null);
    const maxDate = parsedDates.length > 0 ? new Date(Math.max(...parsedDates)) : new Date();
    const sevenAgo = new Date(maxDate.getTime() - 7*24*60*60*1000);
    const recent7 = data.filter(r => { const d = parseDate(r.dateTime); return d !== null && d >= sevenAgo; }).length;
    const thirtyAgo = new Date(maxDate.getTime() - 30*24*60*60*1000);
    const recent30 = data.filter(r => { const d = parseDate(r.dateTime); return d !== null && d >= thirtyAgo; }).length;
    const pkgDist = getPackageDistribution(data);
    const pkgTotal = Object.values(pkgDist).reduce((s, v) => s + v, 0);
    const nativePct = pkgTotal > 0 ? ((pkgDist.native || 0) / pkgTotal * 100).toFixed(0) : 0;
    const flatpakPct = pkgTotal > 0 ? ((pkgDist.flatpak || 0) / pkgTotal * 100).toFixed(0) : 0;

    let commText = `${uniqueClients.size} unique contributors submitted ${total} benchmarks total. `;
    if (recent30 > 0) {
        const activeMonth = Math.round(recent30 / 30);
        commText += `The last 30 days saw ${recent30} submissions (avg ${activeMonth}/day)`;
        if (recent7 > 0) commText += ` with ${recent7} in the past week`;
        commText += `. `;
    }
    commText += `${nativePct}% of benchmarks use native packages`;
    if (flatpakPct > 0) {
        commText += ` and ${flatpakPct}% use Flatpak`;
        if (flatpakPct > 10) {
            commText += ` — the Flatpak share reflects the growing adoption of sandboxed distribution, particularly on immutable distros like SteamOS, Bazzite, and Fedora Silverblue`;
        }
    }
    commText += `. `;
    if (uniqueClients.size >= 5 && recent7 >= 3) {
        commText += `The project shows sustained community engagement — a healthy sign for the Linux benchmarking ecosystem.`;
    }
    document.getElementById('insight-community').textContent = commText;
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
                                lines.push(`Client: ${context.dataset.clientIds[context.dataIndex]}`);
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
            if (modelSelection.mesa && modelSelection.mesa.length >= 2) {
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
            if (modelSelection.nvidia && modelSelection.nvidia.length >= 2) {
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
            if (modelSelection.kernel && modelSelection.kernel.length >= 2) {
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
    return { points: normPoints, hwLabels };
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
        return { label: lbl, data: pts, _origData: hwEntries.map(([hw, hwPts]) => hwPts.find(p => p.label === lbl) || null) };
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
                    backgroundColor: 'rgba(15,23,42,0.95)',
                    titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const orig = context.dataset._origData[context.dataIndex];
                            const deltaStr = context.raw > 0 ? '+' + context.raw + '%' : context.raw + '%';
                            let lines = [deltaStr];
                            if (orig && orig.origY) lines.push('Abs: ' + orig.origY.toLocaleString());
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
                const ds = chart.data.datasets;
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
            }
        }, {
            id: 'baselineLine',
            afterDraw: function(chart) {
                if (!chart.data.datasets.length) return;
                const xScale = chart.scales.x;
                const yScale = chart.scales.y;
                if (!xScale || !yScale) return;
                const zeroPx = xScale.getPixelForValue(0);
                const ctx = chart.ctx;
                ctx.save();
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(zeroPx, yScale.top);
                const bl = chart.data._baselineLabel || '';
                let lineColor = 'rgba(99, 102, 241, 0.5)';
                if (bl) {
                    const ds = chart.data.datasets.find(d => d.label === bl);
                    if (ds && ds.backgroundColor && ds.backgroundColor.length > 0) {
                        lineColor = ds.backgroundColor[0];
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
            }
        }]
    });
}

// Baseline zero line plugin — draws colored line at x=0 with baseline name