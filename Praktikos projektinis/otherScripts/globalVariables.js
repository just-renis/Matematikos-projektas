let circles;
let filledArea;
let currentGraph;
let graphs =
[
    new Graph("../Grafikai/1 lygis (1.0).png", "Lygis 1.0", -10, 11, 1, ["39.8%", "12px", "5px"], [-4, 6], "-4; 6", 1),
    new Graph("../Grafikai/1 lygis (1.1).png", "Lygis 1.1", -12, 13, 1, ["47.2%", "1.2px", "1.5px"], [-3, 2], "-3; 2", 1),
    new Graph("../Grafikai/1 lygis (1.2).png", "Lygis 1.2", -11, 10, 1, ["47.2%", "2.3%", "6px"], [-8, 4], "-8; 4", 1),
    new Graph("../Grafikai/2 lygis (2.0).png", "Lygis 2.0", -10, 11, 1, ["47.2%"], [-5, 5], "[-5; 5]", 1),
    new Graph("../Grafikai/2 lygis (2.1).png", "Lygis 2.1", -9, 9, 1, ["47.2%", "2.5%", "10px"], [0, 9], "[0; 9]", 1),
    new Graph("../Grafikai/2 lygis (2.2).png", "Lygis 2.2", -8, 7, 1, ["47.2%", "1.7%", "16.3px"], [-0.5, 0.3], "[-0,5; 0,3]", 10),
    new Graph("../Grafikai/3 lygis (3.0).png", "Lygis 3.0", -7, 9, 1, ["47.2%", "1.7px", "16.3px"], [-1, 1], "(-1; 1]", 1),
    new Graph("../Grafikai/3 lygis (3.1).png", "Lygis 3.1", -9, 12, 1, ["47.2%", "3.6%", "5.1px"], [-6, 7], "(-6; 7)", 1),
    new Graph("../Grafikai/3 lygis (3.2).png", "Lygis 3.2", -55, 60, 5, ["47.2%", "2.6%", "3.1px"], [-40, 20], "(-40; 20)", 1),
    new Graph("../Grafikai/4 lygis (4.0.1).png", "Lygis 4.0.1", -9, 10, 1, ["75.5%", "-17px", "8.2px"], ["-∞", 2], "(-∞; 2)", 1),
    new Graph("../Grafikai/4 lygis (4.0.2).png", "Lygis 4.0.2", -9, 12, 1, ["55.2%"], [0, "+∞"], "[0; +∞)", 1),
    new Graph("../Grafikai/4 lygis (4.1).png", "Lygis 4.1", -9, 10, 1, ["83.6%", "1%", "8.7px"], ["-∞", 2], "(-∞; 2]", 1),
    new Graph("../Grafikai/4 lygis (4.2).png", "Lygis 4.2", -12, 16, 1, ["78%", "1.8%", "-1.7px"], ["-∞", "+∞"], "(-∞; +∞)", 1),
    new Graph("../Grafikai/5 lygis (5.0).png", "Lygis 5.0", -45, 45, 5, ["29.5%", "-42px", "10.8px"], [-10, 30], "g[-10; 30)", 1),
    new Graph("../Grafikai/5 lygis (5.1).png", "Lygis 5.1", -12, 10, 1, ["62.2%", "-5px", "3.6px"], ["-∞", 4], "h(-∞; 4]", 1),
    new Graph("../Grafikai/5 lygis (5.2).png", "Lygis 5.2", -9, 13, 1, ["59.4%", "-5px", "3px"], [-6, 9], "t(-6; 9]", 1),
    new Graph("../Grafikai/6 lygis (6.0).png", "Lygis 6.0", -9, 9, 1, ["18.1%"], [-3, 3], "D(h)=[-3; 3]", 1),
    new Graph("../Grafikai/6 lygis (6.1).png", "Lygis 6.1", -20, 8, 2, ["73.5%", "-2%", "21.5px"], [-10, -2], "D(g)=[-10; -2]", 1),
    new Graph("../Grafikai/6 lygis (6.2).png", "Lygis 6.2", -7, 8, 1, ["82.3%", "-0.8%", "17.5px"], [2, 7], "D(t)=(2; 7]", 1),
    new Graph("../Grafikai/7 lygis (7.0).png", "Lygis 7.0", -10, 4, 1, ["64.7%"], ["-∞", 3], "D(g)=(-∞; 3)", 1),
    new Graph("../Grafikai/7 lygis (7.1).png", "Lygis 7.1", -8, 10, 1, ["50.5%", "2.4%", "9.4px"], ["-∞", "+∞"], "D(h)=(-∞; +∞)", 1),
    new Graph("../Grafikai/7 lygis (7.2).png", "Lygis 7.2", -9, 9, 1, ["50.7%", "-0.5%", "11.5px"], [-2, 2], "D(k)=[-2; 2]", 1),
    new Graph("../Grafikai/8 lygis (8.0).png", "Lygis 8.0", -10, 8, 1, ["68%"], [-8, 5], "D(f)=[-8; 5]", 1),
    new Graph("../Grafikai/8 lygis (8.1).png", "Lygis 8.1", -10, 9, 1, ["48%", "-0.1%", "8.8px"], [-4, 4], "D(d)=[-4; 4]", 1),
    new Graph("../Grafikai/8 lygis (8.2).png", "Lygis 8.2", -10, 12, 1, ["38.5%", "3.8%", "4px"], [-6, "+∞"], "D(t)=(-6; +∞)", 1),
    new Graph("../Grafikai/9 lygis (9.0.1).png", "Lygis 9.0.1", -9, 11, 1, ["50.5%"], [-3, 3], "D(s)=(-3; 3)", 1),
    new Graph("../Grafikai/9 lygis (9.0.2).png", "Lygis 9.0.2", -6, 6, 1, ["72.4%"], [-3, 2], "D(h)=[-3; 2)", 1),
    new Graph("../Grafikai/9 lygis (9.1).png", "Lygis 9.1", -10, 12, 1, ["48%", "3.4%", "3.9px"], [-5, 5], "D(k)=[-5; 5)", 1),
    new Graph("../Grafikai/9 lygis (9.2).png", "Lygis 9.2", -7, 10, 1, ["59%", "-0.8%", "12.6px"], [-3, 5], "D(h)=(-3; 5)", 1)
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