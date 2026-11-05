export interface Problem {
  es: string;
  ca: string;
  /** Arithmetic behind the answer; checked by scripts/check-questions.ts. */
  expr: string;
  answer: number;
  /** Hand-picked wrong options, mostly typical mistakes. */
  wrong: [number, number, number];
}

export const BLOCK_SIZE = 10;

/** 50 everyday word problems for 2nd–3rd grade, ordered by difficulty. */
export const PROBLEMS: Problem[] = [
  // Bloque 1 — un paso, hasta 20
  {
    es: "Lucía tiene 5 caramelos y su abuela le da 3 más. ¿Cuántos caramelos tiene ahora?",
    ca: "La Lucía té 5 caramels i la seva àvia li'n dona 3 més. Quants caramels té ara?",
    expr: "5+3", answer: 8, wrong: [2, 7, 9],
  },
  {
    es: "En el parque hay 9 palomas. Se van volando 4. ¿Cuántas palomas quedan?",
    ca: "Al parc hi ha 9 coloms. Se'n van volant 4. Quants coloms queden?",
    expr: "9-4", answer: 5, wrong: [13, 4, 6],
  },
  {
    es: "Marc tiene 7 cromos y gana 6 más en el recreo. ¿Cuántos cromos tiene?",
    ca: "En Marc té 7 cromos i en guanya 6 més a l'esbarjo. Quants cromos té?",
    expr: "7+6", answer: 13, wrong: [1, 12, 14],
  },
  {
    es: "Había 12 globos en la fiesta y explotaron 5. ¿Cuántos globos quedan?",
    ca: "Hi havia 12 globus a la festa i en van esclatar 5. Quants globus queden?",
    expr: "12-5", answer: 7, wrong: [17, 6, 8],
  },
  {
    es: "En el autobús van 8 niños. En la parada suben 9 más. ¿Cuántos niños van ahora?",
    ca: "A l'autobús hi van 8 nens. A la parada en pugen 9 més. Quants nens hi van ara?",
    expr: "8+9", answer: 17, wrong: [1, 16, 18],
  },
  {
    es: "Tengo 15 lápices de colores. Le presto 6 a mi amiga. ¿Cuántos me quedan?",
    ca: "Tinc 15 llapis de colors. En deixo 6 a la meva amiga. Quants me'n queden?",
    expr: "15-6", answer: 9, wrong: [21, 8, 10],
  },
  {
    es: "En una cesta hay 6 manzanas y 7 peras. ¿Cuántas frutas hay en total?",
    ca: "En una cistella hi ha 6 pomes i 7 peres. Quantes fruites hi ha en total?",
    expr: "6+7", answer: 13, wrong: [1, 12, 14],
  },
  {
    es: "Pablo tiene 18 canicas y pierde 9 jugando. ¿Cuántas canicas le quedan?",
    ca: "En Pau té 18 bales i en perd 9 jugant. Quantes bales li queden?",
    expr: "18-9", answer: 9, wrong: [27, 8, 10],
  },
  {
    es: "Ana leyó 8 páginas el lunes y 8 el martes. ¿Cuántas páginas leyó en total?",
    ca: "L'Anna va llegir 8 pàgines dilluns i 8 dimarts. Quantes pàgines va llegir en total?",
    expr: "8+8", answer: 16, wrong: [0, 15, 18],
  },
  {
    es: "Mi hermano tiene 11 años y yo tengo 7. ¿Cuántos años más que yo tiene mi hermano?",
    ca: "El meu germà té 11 anys i jo en tinc 7. Quants anys més que jo té el meu germà?",
    expr: "11-7", answer: 4, wrong: [18, 3, 5],
  },

  // Bloque 2 — un paso, hasta 100
  {
    es: "En la clase hay 14 niñas y 13 niños. ¿Cuántos alumnos hay en total?",
    ca: "A la classe hi ha 14 nenes i 13 nens. Quants alumnes hi ha en total?",
    expr: "14+13", answer: 27, wrong: [1, 26, 37],
  },
  {
    es: "Tengo 35 euros en la hucha y mi tía me da 20. ¿Cuántos euros tengo ahora?",
    ca: "Tinc 35 euros a la guardiola i la meva tia me'n dona 20. Quants euros tinc ara?",
    expr: "35+20", answer: 55, wrong: [15, 45, 65],
  },
  {
    es: "Un libro tiene 48 páginas. Ya he leído 25. ¿Cuántas páginas me faltan?",
    ca: "Un llibre té 48 pàgines. Ja n'he llegit 25. Quantes pàgines em falten?",
    expr: "48-25", answer: 23, wrong: [73, 13, 33],
  },
  {
    es: "En el árbol hay 27 pájaros y llegan 15 más. ¿Cuántos pájaros hay ahora?",
    ca: "A l'arbre hi ha 27 ocells i n'arriben 15 més. Quants ocells hi ha ara?",
    expr: "27+15", answer: 42, wrong: [12, 32, 41],
  },
  {
    es: "Una caja tiene 50 galletas. Nos comemos 18. ¿Cuántas galletas quedan?",
    ca: "Una capsa té 50 galetes. Ens en mengem 18. Quantes galetes queden?",
    expr: "50-18", answer: 32, wrong: [68, 42, 38],
  },
  {
    es: "En un partido, mi equipo marca 36 puntos y el otro equipo 29. ¿Cuántos puntos se marcan en total?",
    ca: "En un partit, el meu equip fa 36 punts i l'altre equip 29. Quants punts es fan en total?",
    expr: "36+29", answer: 65, wrong: [7, 55, 64],
  },
  {
    es: "El abuelo tiene 72 años y la abuela 68. ¿Cuántos años más que la abuela tiene el abuelo?",
    ca: "L'avi té 72 anys i l'àvia 68. Quants anys més que l'àvia té l'avi?",
    expr: "72-68", answer: 4, wrong: [140, 14, 6],
  },
  {
    es: "En el cole hay 45 bicis aparcadas. Se llevan 17. ¿Cuántas bicis quedan?",
    ca: "A l'escola hi ha 45 bicis aparcades. Se n'emporten 17. Quantes bicis queden?",
    expr: "45-17", answer: 28, wrong: [62, 32, 38],
  },
  {
    es: "Sara tiene 58 cromos y Leo tiene 34. ¿Cuántos cromos tienen entre los dos?",
    ca: "La Sara té 58 cromos i en Leo en té 34. Quants cromos tenen entre tots dos?",
    expr: "58+34", answer: 92, wrong: [24, 82, 93],
  },
  {
    es: "Una camiseta cuesta 23 euros. Pago con un billete de 50 euros. ¿Cuánto me devuelven?",
    ca: "Una samarreta costa 23 euros. Pago amb un bitllet de 50 euros. Quant em tornen?",
    expr: "50-23", answer: 27, wrong: [73, 37, 33],
  },

  // Bloque 3 — multiplicaciones
  {
    es: "Una bici tiene 2 ruedas. ¿Cuántas ruedas tienen 6 bicis?",
    ca: "Una bici té 2 rodes. Quantes rodes tenen 6 bicis?",
    expr: "2*6", answer: 12, wrong: [8, 10, 14],
  },
  {
    es: "Cada mano tiene 5 dedos. ¿Cuántos dedos hay en 4 manos?",
    ca: "Cada mà té 5 dits. Quants dits hi ha en 4 mans?",
    expr: "5*4", answer: 20, wrong: [9, 15, 25],
  },
  {
    es: "Un perro tiene 4 patas. ¿Cuántas patas tienen 5 perros?",
    ca: "Un gos té 4 potes. Quantes potes tenen 5 gossos?",
    expr: "4*5", answer: 20, wrong: [9, 16, 24],
  },
  {
    es: "Compro 3 sobres con 10 cromos cada uno. ¿Cuántos cromos tengo?",
    ca: "Compro 3 sobres amb 10 cromos cada un. Quants cromos tinc?",
    expr: "3*10", answer: 30, wrong: [13, 20, 40],
  },
  {
    es: "Una caja de huevos tiene 6 huevos. ¿Cuántos huevos hay en 4 cajas?",
    ca: "Una capsa d'ous té 6 ous. Quants ous hi ha en 4 capses?",
    expr: "6*4", answer: 24, wrong: [10, 18, 30],
  },
  {
    es: "En cada mesa se sientan 3 niños. Hay 7 mesas llenas. ¿Cuántos niños hay?",
    ca: "A cada taula hi seuen 3 nens. Hi ha 7 taules plenes. Quants nens hi ha?",
    expr: "3*7", answer: 21, wrong: [10, 18, 24],
  },
  {
    es: "Un helado cuesta 2 euros. ¿Cuánto cuestan 9 helados?",
    ca: "Un gelat costa 2 euros. Quant costen 9 gelats?",
    expr: "2*9", answer: 18, wrong: [11, 16, 20],
  },
  {
    es: "Una araña tiene 8 patas. ¿Cuántas patas tienen 3 arañas?",
    ca: "Una aranya té 8 potes. Quantes potes tenen 3 aranyes?",
    expr: "8*3", answer: 24, wrong: [11, 16, 32],
  },
  {
    es: "Una semana tiene 7 días. ¿Cuántos días hay en 5 semanas?",
    ca: "Una setmana té 7 dies. Quants dies hi ha en 5 setmanes?",
    expr: "7*5", answer: 35, wrong: [12, 28, 42],
  },
  {
    es: "En el huerto hay 6 filas con 9 lechugas cada una. ¿Cuántas lechugas hay?",
    ca: "A l'hort hi ha 6 fileres amb 9 enciams cada una. Quants enciams hi ha?",
    expr: "6*9", answer: 54, wrong: [15, 45, 63],
  },

  // Bloque 4 — dos pasos
  {
    es: "Tengo 10 caramelos. Me como 3 y luego mi madre me da 5. ¿Cuántos caramelos tengo ahora?",
    ca: "Tinc 10 caramels. Me'n menjo 3 i després la meva mare me'n dona 5. Quants caramels tinc ara?",
    expr: "10-3+5", answer: 12, wrong: [2, 7, 18],
  },
  {
    es: "En el autobús van 20 personas. En una parada bajan 8 y suben 6. ¿Cuántas personas van ahora?",
    ca: "A l'autobús hi van 20 persones. En una parada en baixen 8 i en pugen 6. Quantes persones hi van ara?",
    expr: "20-8+6", answer: 18, wrong: [22, 12, 34],
  },
  {
    es: "Compro 3 cajas de 5 rotuladores y me regalan 4 más. ¿Cuántos rotuladores tengo?",
    ca: "Compro 3 capses de 5 retoladors i me'n regalen 4 més. Quants retoladors tinc?",
    expr: "3*5+4", answer: 19, wrong: [15, 12, 23],
  },
  {
    es: "Un bocadillo cuesta 4 euros y un zumo 2 euros. ¿Cuánto pago por 2 bocadillos y 1 zumo?",
    ca: "Un entrepà costa 4 euros i un suc 2 euros. Quant pago per 2 entrepans i 1 suc?",
    expr: "2*4+2", answer: 10, wrong: [6, 12, 8],
  },
  {
    es: "Tengo 30 euros. Compro un libro de 12 euros y una libreta de 5 euros. ¿Cuánto dinero me queda?",
    ca: "Tinc 30 euros. Compro un llibre de 12 euros i una llibreta de 5 euros. Quants diners em queden?",
    expr: "30-12-5", answer: 13, wrong: [18, 17, 47],
  },
  {
    es: "En una granja hay 4 vacas y 3 gallinas. ¿Cuántas patas hay en total?",
    ca: "En una granja hi ha 4 vaques i 3 gallines. Quantes potes hi ha en total?",
    expr: "4*4+3*2", answer: 22, wrong: [7, 14, 28],
  },
  {
    es: "María tiene 15 cromos y Juan tiene el doble. ¿Cuántos cromos tienen entre los dos?",
    ca: "La Maria té 15 cromos i en Joan en té el doble. Quants cromos tenen entre tots dos?",
    expr: "15+15*2", answer: 45, wrong: [30, 17, 60],
  },
  {
    es: "Hay 5 platos con 4 galletas cada uno. Nos comemos 7 galletas. ¿Cuántas galletas quedan?",
    ca: "Hi ha 5 plats amb 4 galetes cada un. Ens mengem 7 galetes. Quantes galetes queden?",
    expr: "5*4-7", answer: 13, wrong: [20, 2, 27],
  },
  {
    es: "Leo tiene 25 canicas. Gana 12 y luego pierde 9. ¿Cuántas canicas tiene ahora?",
    ca: "En Leo té 25 bales. En guanya 12 i després en perd 9. Quantes bales té ara?",
    expr: "25+12-9", answer: 28, wrong: [37, 46, 4],
  },
  {
    es: "En una fiesta hay 3 pizzas cortadas en 8 trozos cada una. Se comen 19 trozos. ¿Cuántos trozos sobran?",
    ca: "En una festa hi ha 3 pizzes tallades en 8 trossos cada una. Se'n mengen 19 trossos. Quants trossos sobren?",
    expr: "3*8-19", answer: 5, wrong: [24, 11, 6],
  },

  // Bloque 5 — dos o tres pasos, números más grandes
  {
    es: "Una entrada de cine cuesta 7 euros. Vamos 4 personas y pagamos con 50 euros. ¿Cuánto nos devuelven?",
    ca: "Una entrada de cinema costa 7 euros. Hi anem 4 persones i paguem amb 50 euros. Quant ens tornen?",
    expr: "50-7*4", answer: 22, wrong: [28, 43, 32],
  },
  {
    es: "Un partido de fútbol tiene 2 partes de 45 minutos. Ya se han jugado 60 minutos. ¿Cuántos minutos faltan?",
    ca: "Un partit de futbol té 2 parts de 45 minuts. Ja se n'han jugat 60 minuts. Quants minuts falten?",
    expr: "2*45-60", answer: 30, wrong: [15, 45, 105],
  },
  {
    es: "En la biblioteca hay 3 estanterías con 40 libros cada una. Se prestan 25 libros. ¿Cuántos libros quedan?",
    ca: "A la biblioteca hi ha 3 prestatgeries amb 40 llibres cada una. Se'n deixen 25. Quants llibres queden?",
    expr: "3*40-25", answer: 95, wrong: [15, 105, 145],
  },
  {
    es: "Laura ahorra 5 euros cada semana. ¿Cuántas semanas necesita para tener 45 euros?",
    ca: "La Laura estalvia 5 euros cada setmana. Quantes setmanes necessita per tenir 45 euros?",
    expr: "45/5", answer: 9, wrong: [40, 50, 8],
  },
  {
    es: "Un tren tiene 6 vagones con 20 asientos cada uno. Hay 87 personas sentadas. ¿Cuántos asientos están libres?",
    ca: "Un tren té 6 vagons amb 20 seients cada un. Hi ha 87 persones assegudes. Quants seients estan lliures?",
    expr: "6*20-87", answer: 33, wrong: [26, 43, 207],
  },
  {
    es: "Compro 2 camisetas de 9 euros y unos pantalones de 15 euros. Pago con 50 euros. ¿Cuánto me devuelven?",
    ca: "Compro 2 samarretes de 9 euros i uns pantalons de 15 euros. Pago amb 50 euros. Quant em tornen?",
    expr: "50-(2*9+15)", answer: 17, wrong: [26, 33, 24],
  },
  {
    es: "En el cole hay 4 clases de 25 alumnos. Hoy faltan 8 alumnos. ¿Cuántos alumnos han venido?",
    ca: "A l'escola hi ha 4 classes de 25 alumnes. Avui en falten 8. Quants alumnes han vingut?",
    expr: "4*25-8", answer: 92, wrong: [100, 108, 17],
  },
  {
    es: "Pedro tiene 64 cromos. Le da 15 a su hermana y luego compra 3 sobres de 5 cromos. ¿Cuántos cromos tiene ahora?",
    ca: "En Pere té 64 cromos. Li'n dona 15 a la seva germana i després compra 3 sobres de 5 cromos. Quants cromos té ara?",
    expr: "64-15+3*5", answer: 64, wrong: [49, 94, 52],
  },
  {
    es: "Una caja trae 8 lápices. La maestra compra 7 cajas y reparte 50 lápices. ¿Cuántos lápices le quedan?",
    ca: "Una capsa porta 8 llapis. La mestra compra 7 capses i en reparteix 50. Quants llapis li queden?",
    expr: "8*7-50", answer: 6, wrong: [16, 106, 4],
  },
  {
    es: "A la excursión van 3 autobuses con 30 niños cada uno y 2 coches con 4 niños cada uno. Al llegar, 15 niños van al museo. ¿Cuántos niños se quedan en el parque?",
    ca: "A l'excursió hi van 3 autobusos amb 30 nens cada un i 2 cotxes amb 4 nens cada un. En arribar, 15 nens van al museu. Quants nens es queden al parc?",
    expr: "3*30+2*4-15", answer: 83, wrong: [98, 113, 73],
  },
];
