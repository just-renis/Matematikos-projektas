let circles;
let filledArea;
let currentGraph;
let graphs =
[
    new Graph("../Grafikai/1 lygis (1.0).png", "Lygis 1.0", -10, 11, 1, 628, ["93%", "29.8%", "2%", "4.7%", "39.8%"], 14, [-4, 6], "-4;6", 1),
    new Graph("../Grafikai/1 lygis (1.1).png", "Lygis 1.1", -12, 13, 1, 658, ["97%", "35%", "1.4%", "1%", "47.2%", "1.2%", "1.5px"], 10, [-3, 2], "-3;2", 1),
    new Graph("../Grafikai/1 lygis (1.2).png", "Lygis 1.2", -11, 10, 1, 648, ["95%", "47.8%", "3%", "0.8%", "47.2%", "2.3%", "6px"], 21, [-8, 4], "-8;4", 1),
    new Graph("../Grafikai/2 lygis (2.0).png", "Lygis 2.0", -10, 11, 1, 628, ["92%", "35.8%", "3.7%", "3%", "47.2%"], 26, [-5, 5], "[-5;5]", 1),
    new Graph("../Grafikai/2 lygis (2.1).png", "Lygis 2.1", -9, 9, 1, 628, ["92%", "42.2%", "3.8%", "2.9%", "47.2%", "2.5%", "10px"], 26.5, [0, 9], "[0;9]", 1),
    new Graph("../Grafikai/2 lygis (2.2).png", "Lygis 2.2", -8, 7, 1, 618, ["91%", "39%", "3.8%", "4.4%", "47.2%", "1.7%", "16.3px"], 26.5, [-0.5, 0.3], "[-0.5;0.3]", 10),
    new Graph("../Grafikai/3 lygis (3.0).png", "Lygis 3.0", -7, 9, 1, 648, ["95%", "42.5%", "1.8%", "2%", "47.2%"], 13, [-1, 1], "(-1;1]", 1),
    new Graph("../Grafikai/3 lygis (3.1).png", "Lygis 3.1", -9, 12, 1, 630, ["93%", "41.3%", "4.2%", "2.3%", "47.2%", "3.6%", "5.1px"], 29, [-6, 7], "(-6;7)", 1),
    new Graph("../Grafikai/3 lygis (3.2).png", "Lygis 3.2", -55, 60, 5, 642, ["94%", "37.5%", "3%", "1.8%", "47.2%", "2.6%", "3.1px"], 21, [-40, 20], "(-40;20)", 1),
    new Graph("../Grafikai/4 lygis (4.0.1).png", "Lygis 4.0.1", -9, 10, 1, 630, ["93%", "55.2%", "3%", "3.5%", "75.5%"], 21, ["-∞", 2], "(-∞;2)", 1),
    new Graph("../Grafikai/4 lygis (4.0.2).png", "Lygis 4.0.2", -9, 12, 1, 660, ["97%", "40.7%", "1%", "1.1%", "55.2%"], 7, [0, "∞"], "[0;∞)", 1),
    new Graph("../Grafikai/4 lygis (4.1).png", "Lygis 4.1", -9, 10, 1, 638, ["94%", "61%", "2%", "3.2%", "83.6%", "1%", "8.7px"], 14, ["-∞", 2], "(-∞;2]", 1),
    new Graph("../Grafikai/4 lygis (4.2).png", "Lygis 4.2", -12, 16, 1, 648, ["95%", "57%", "1.4%", "2.4%", "78%", "1.8%", "-1.7px"], 10, ["-∞", "∞"], "(-∞;∞)", 1),
    new Graph("../Grafikai/5 lygis (5.0).png", "Lygis 5.0", -45, 45, 5, 638, ["95%", "22.3%", "1%", "4.3%", "29.5%"], 7, [-10, 30], "D(g)=[-10;30)", 1),
    new Graph("../Grafikai/5 lygis (5.1).png", "Lygis 5.1", -12, 10, 1, 638, ["95%", "45.7%", "3.3%", "2%", "62.2%", "2.5%", "4.2px"], 23, ["-∞", 4], "D(h)=(-∞;4]", 1),
    new Graph("../Grafikai/5 lygis (5.2).png", "Lygis 5.2", -9, 13, 1, 638, ["94%", "43.7%", "3.8%", "1.5%", "59.4%", "3.1%", "4.2px"], 27, [-6, 9], "D(t)=(-6;9]", 1),
    new Graph("../Grafikai/6 lygis (6.0).png", "Lygis 6.0", -9, 9, 1, 632, ["93%", "14.2%", "5%", "1.1%", "18.1%"], 35, [-3, 3], "D(h)=[-3;3]", 1),
    new Graph("../Grafikai/6 lygis (6.1).png", "Lygis 6.1", -20, 8, 2, 648, ["95%", "53.8%", "1%", "2.8%", "73.5%", "-2%", "21.5px"], 7, [-10, -2], "D(g)=[-10;-2]", 1),
    new Graph("../Grafikai/6 lygis (6.2).png", "Lygis 6.2", -7, 8, 1, 635, ["94%", "60%", "1.7%", "4%", "82.3%", "-0.8%", "17.5px"], 12, [2, 7], "D(t)=(2;7]", 1),
    new Graph("../Grafikai/7 lygis (7.0).png", "Lygis 7.0", -10, 4, 1, 600, ["89%", "47.4%", "5.7%", "5%", "64.7%"], 40, ["-∞", 3], "D(g)=(-∞;3)", 1),
    new Graph("../Grafikai/7 lygis (7.1).png", "Lygis 7.1", -8, 10, 1, 615, ["91%", "37.3%", "3.7%", "4.8%", "50.5%", "2.4%", "9.4px"], 26, ["-∞", "∞"], "D(h)=(-∞;∞)", 1),
    new Graph("../Grafikai/7 lygis (7.2).png", "Lygis 7.2", -9, 9, 1, 655, ["96%", "37.4%", "1%", "1.9%", "50.7%", "-0.5%", "11.5px"], 7, [-2, 2], "D(k)=[-2;2]", 1),
    new Graph("../Grafikai/8 lygis (8.0).png", "Lygis 8.0", -10, 8, 1, 633, ["93%", "49.9%", "3%", "3%", "68%"], 21, [-8, 5], "D(f)=[-8;5]", 1),
    new Graph("../Grafikai/8 lygis (8.1).png", "Lygis 8.1", -10, 9, 1, 639, ["94%", "35.6%", "1%", "4.1%", "48%", "-0.1%", "8.8px"], 7, [-4, 4], "D(d)=[-4;4]", 1),
    new Graph("../Grafikai/8 lygis (8.2).png", "Lygis 8.2", -10, 12, 1, 635, ["94%", "28.8%", "4.3%", "1.5%", "38.5%", "3.8%", "4px"], 30, [-6, "∞"], "D(t)=(-6;∞)", 1),
    new Graph("../Grafikai/9 lygis (9.0.1).png", "Lygis 9.0.1", -9, 11, 1, 625, ["93%", "37.3%", "4.3%", "2.9%", "50.5%"], 30, [-3, 3], "D(s)=(-3;3)", 1),
    new Graph("../Grafikai/9 lygis (9.0.2).png", "Lygis 9.0.2", -6, 6, 1, 600, ["89%", "53%", "3.3%", "7.4%", "72.4%"], 23, [-3, 2], "D(h)=[-3;2)", 1),
    new Graph("../Grafikai/9 lygis (9.1).png", "Lygis 9.1", -10, 12, 1, 633, ["94%", "35.6%", "3.8%", "2.2%", "48%", "3.4%", "3.9px"], 27, [-5, 5], "D(k)=[-5;5)", 1),
    new Graph("../Grafikai/9 lygis (9.2).png", "Lygis 9.2", -7, 10, 1, 637, ["94%", "43.5%", "0.9%", "4.6%", "59%", "-0.8%", "12.6px"], 6, [-3, 5], "D(h)=(-3;5)", 1)
];
let explanations =
[
    "Šiame lygyje reikia nutempti rutuliukus į tinkamas vietas ir įrašyti tinkamas intervalo reikšmės.",
    "Šiame lygyje reikia papildomai įrašyti tinkamus skliaustus intervale.",
    "Šiame lygyje reikia papildomai pakeisti reikalingą rutuliukų tipą(tuščiavidurį arba pilnavidurį).",
    "Šiame lygyje reikia atskirti kada grafike žymima begalybės.",
    "Šiame lygyje reikia rašyti pilną apibrėžimo srities atsakymą, įskaitant funkcijos vardą.",
    "Šiame lygyje reikia atskirti kaip žymėti grafikus, kurių funkcijos baigiasi lenkta tiese.",
    "Šiame lygyje reikia atskirti kaip žymėti grafikus, kurių dalis baigiasi pilnaviduriu rutuliuku, o kita dalis prasideda pilnaviduriu rutuliuku.",
    "Šiame lygyje reikia atskirti kaip žymėti grafikus, jei toje pačioje vietoje yra ir tuščiaviduris ir pilnaviduris rutuliukas/tiesė.",
    "Šiame lygyje reikia atskirti kaip žymėti grafikus, jei linija persidengia su tuščiaviduriu arba pilnaviduriu rutuliuku."
];