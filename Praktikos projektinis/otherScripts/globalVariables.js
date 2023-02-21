let circles;
let currentGraph;
let graphs =
[
    new Graph("../Grafikai/1 lygis (1.0).png", "Lygis 1.0", -10, 11, 1, ["40%", "7px", "5.3px", "19% 34%", ""], [-4, 6], "-4; 6", 1, "[]"),
    new Graph("../Grafikai/1 lygis (1.1).png", "Lygis 1.1", -12, 13, 1, ["47%", "6px", "1.7px", "52% 32%", ""], [-3, 2], "-3; 2", 1, "[]"),
    new Graph("../Grafikai/1 lygis (1.2).png", "Lygis 1.2", -11, 10, 1, ["65%", "16px", "6px", "39.5% 20%", ""], [-8, 4], "-8; 4", 1, "[]"),
    new Graph("../Grafikai/2 lygis (2.0).png", "Lygis 2.0", -10, 11, 1, ["48%", "20px", "5.1px", "58% 29%", ""], [-5, 5], "[-5; 5]", 1, "[]"),
    new Graph("../Grafikai/2 lygis (2.1).png", "Lygis 2.1", -9, 9, 1, ["57%", "15px", "10px", "32% 48%", ""], [0, 9], "[0; 9]", 1, "[]"),
    new Graph("../Grafikai/2 lygis (2.2).png", "Lygis 2.2", -8, 7, 1, ["52.5%", "6px", "16.8px", "30% 25%", ""], [-0.5, 0.3], "[-0,5; 0,3]", 10, "[]"),
    new Graph("../Grafikai/3 lygis (3.0).png", "Lygis 3.0", -7, 9, 1, ["57.5%", "-5px", "15.9px", "15% 33%", ""], [-1, 1], "(-1; 1]", 1, "(]"),
    new Graph("../Grafikai/3 lygis (3.1).png", "Lygis 3.1", -9, 12, 1, ["56%", "25px", "5.25px", "27% 22%", ""], [-6, 7], "(-6; 7)", 1, "()"),
    new Graph("../Grafikai/3 lygis (3.2).png", "Lygis 3.2", -55, 60, 5, ["50.5%", "17px", "3.25px", "51% 17%", ""], [-40, 20], "(-40; 20)", 1, "()"),
    new Graph("../Grafikai/4 lygis (4.0.1).png", "Lygis 4.0.1", -9, 10, 1, ["75%", "-19px", "8.3px", "7% 36%", ""], ["-∞", 2], "(-∞; 2)", 1, "()"),
    new Graph("../Grafikai/4 lygis (4.0.2).png", "Lygis 4.0.2", -9, 12, 1, ["55%", "-33px", "6.85px", "37% 45.5%", ""], [0, "+∞"], "[0; +∞)", 1, "[)"),
    new Graph("../Grafikai/4 lygis (4.1).png", "Lygis 4.1", -9, 10, 1, ["83.5%", "-31px", "9.05px", "10% 39%", ""], ["-∞", 2], "(-∞; 2]", 1, "(]"),
    new Graph("../Grafikai/4 lygis (4.2).png", "Lygis 4.2", -12, 16, 1, ["78%", "-14px", "-1.65px", "5% 20%", ""], ["-∞", "+∞"], "(-∞; +∞)", 1, "()"),
    new Graph("../Grafikai/5 lygis (5.0).png", "Lygis 5.0", -45, 45, 5, ["29.5%", "-42px", "10.8px", "15.7% 49%", ""], [-10, 30], "g[-10; 30)", 1, "[)"),
    new Graph("../Grafikai/5 lygis (5.1).png", "Lygis 5.1", -12, 10, 1, ["62%", "-8px", "4px", "13% 47%", ""], ["-∞", 4], "h(-∞; 4]", 1, "(]"),
    new Graph("../Grafikai/5 lygis (5.2).png", "Lygis 5.2", -9, 13, 1, ["59.5%", "-5px", "4.1px", "38% 27%", ""], [-6, 9], "t(-6; 9]", 1, "(]"),
    new Graph("../Grafikai/6 lygis (6.0).png", "Lygis 6.0", -9, 9, 1, ["18%", "-9px", "10.2px", "25% 44%", ""], [-3, 3], "D(h)=[-3; 3]", 1, "[]"),
    new Graph("../Grafikai/6 lygis (6.1).png", "Lygis 6.1", -20, 8, 2, ["73.5%", "-63px", "21.65px", "15% 47%", ""], [-10, -2], "D(g)=[-10; -2]", 1, "[]"),
    new Graph("../Grafikai/6 lygis (6.2).png", "Lygis 6.2", -7, 8, 1, ["82%", "-46px", "17.45px", "40.5% 62%", ""], [2, 7], "D(t)=(2; 7]", 1, "(]"),
    new Graph("../Grafikai/7 lygis (7.0).png", "Lygis 7.0", -10, 4, 1, ["64.5%", "-17px", "17.7px", "12% 42%", "268f"], ["-∞", 3], "D(g)=(-∞; 3)", 1, "()"),
    new Graph("../Grafikai/7 lygis (7.1).png", "Lygis 7.1", -8, 10, 1, ["50.5%", "-20px", "9.4px", "14% 45.5%", "310f"], ["-∞", "+∞"], "D(h)=(-∞; +∞)", 1, "()"),
    new Graph("../Grafikai/7 lygis (7.2).png", "Lygis 7.2", -9, 9, 1, ["50.5%", "-45px", "11.95px", "12% 53%", "348f"], [-2, 2], "D(k)=[-2; 2]", 1, "[]"),
    new Graph("../Grafikai/8 lygis (8.0).png", "Lygis 8.0", -10, 8, 1, ["68%", "-23px", "10.25px", "47.3% 60%", "351t"], [-8, 5], "D(f)=[-8; 5]", 1, "[]"),
    new Graph("../Grafikai/8 lygis (8.1).png", "Lygis 8.1", -10, 9, 1, ["48%", "-36px", "8.75px", "15% 39%", "354t"], [-4, 4], "D(d)=[-4; 4]", 1, "[]"),
    new Graph("../Grafikai/8 lygis (8.2).png", "Lygis 8.2", -10, 12, 1, ["38.5%", "-3px", "4.1px", "10.5% 38.5%", "418t"], [-6, "+∞"], "D(t)=(-6; +∞)", 1, "()"),
    new Graph("../Grafikai/9 lygis (9.0.1).png", "Lygis 9.0.1", -9, 11, 1, ["50.5%", "-9px", "6.45px", "7% 47%", "322f"], [-3, 3], "D(s)=(-3; 3)", 1, "()"),
    new Graph("../Grafikai/9 lygis (9.0.2).png", "Lygis 9.0.2", -6, 6, 1, ["72.5%", "-52px", "25.25px", "30% 30%", "236t"], [-3, 2], "D(h)=[-3; 2)", 1, "[)"),
    new Graph("../Grafikai/9 lygis (9.1).png", "Lygis 9.1", -10, 12, 1, ["48%", "-7px", "4.05px", "9% 30%", "240f 269f 298t 327f 356f 385t 414f"], [-5, 5], "D(k)=[-5; 5)", 1, "[)"),
    new Graph("../Grafikai/9 lygis (9.2).png", "Lygis 9.2", -7, 10, 1, ["59%", "-46px", "12.85px", "10% 33%", "319t"], [-3, 5], "D(h)=(-3; 5)", 1, "()")
];
let explanations =
[
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo srities pradžios ir pabaigos skaitines reikšmes, įrašykite jas langelyje po grafiku.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo srities pradžios ir pabaigos skaitines reikšmes, įrašykite jas langelyje po grafiku, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį, pasirinkite teisingus pradžią ir pabaigą žyminčius rutuliukus ir rezultatą užrašykite, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį, pasirinkdami jos pradžią ir pabaigą grafike ir užrašykite ją intervalu, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį, pasirinkdami jos pradžią ir pabaigą grafike ir užrašykite ją intervalu, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus ir nurodydami funkcijos vardą.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį, pasirinkdami jos pradžią ir pabaigą grafike ir užrašykite ją intervalu, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus ir nurodydami funkcijos vardą, kai funkijos grafikas prasideda/baigiasi lenkta linija.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį, pasirinkdami jos pradžią ir pabaigą grafike ir užrašykite ją intervalu, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus ir nurodydami funkcijos vardą, kai funkcijos grafikas sudarytas iš kelių atskirų dalių.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį, pasirinkdami jos pradžią ir pabaigą grafike ir užrašykite ją intervalu, nurodydami teisingus intervalo pradžios ir pabaigos skliaustus ir nurodydami funkcijos vardą, kai funkcijos grafikas sudarytas iš kelių atskirų dalių.",
    "Remdamiesi grafiku, nustatykite pateiktos funkcijos apibrėžimo sritį ir užrašykite ją intervalu."
];
let rules = 
[
    "1. Apibrėžimo sritis - visos argumento (x) reikšmės, su kuriomis funkcija egzistuoja (galima nubrėžti jos grafiką).\nApibrėžimo sritis žymima D(funkcijos vardas)=intervalas.",
    "2. Jei funkcijos grafikas prasideda/baigiasi užspalvintu rutuliuku, tai ir apibrėžimo sritis grafike prasidės/baigsis užspalvintu rutuliuku, o intervalo pradžioje/pabaigoje žymėsime laužtinius skliaustus.",
    "3. Jei funkcijos grafikas prasideda/baigiasi kiauru rutuliuku, tai ir apibrėžimo sritis grafike prasidės/baigsis kiauru rutuliuku, o intervalo pradžioje/pabaigoje žymėsime lenktus skliaustus.",
    "4. Jei funkcijos grafikas neturi pradžios/pabaigos, tai jos apibrėžimo sritis prasideda/pasibaigia begalybėje ir intervale yra žymima -∞/+∞. Begalybė visada rašoma su lenktais skliaustais.",
    "5. Kiekviena funkcija turi vardą. Funkcijos vadinamos mažosiomis abėcėlės raidėmis.",
    "6. Jei funkcijos grafikas prasideda/baigiasi lenkta linija, tai jos apibrėžimo sritis prasidės/baigsis užspalvintu rutuliuku, o intervalo pradžioje/pabaigoje žymėsime laužtinius skliaustus.",
    "7. Jei viena funkcijos grafiko dalis baigiasi užspalvintu rutuliuku, o kita funkcijos grafiko dalis toje pačioje vietoje prasideda užspalvintu rutuliuku, tai apibrėžimo sritį užrašome vienu intervalu be trūkių.",
    "8. Jei viena funkcijos grafiko dalis baigiasi užspalvintu/kiauru rutuliuku, o kita funkcijos grafiko dalis toje pačioje vietoje prasideda kiauru/užspalvintu rutuliuku, tai apibrėžimo sritį užrašome vienu intervalu be trūkių.",
    "9. Jei funkcijos grafikas sudarytas iš dviejų viena virš kitos einančių dalių ir vienoje iš tų dalių turime užspalvintą rutuliuką, tai apibrėžimo sritį užrašome vienu intervalu be trūkių."
];