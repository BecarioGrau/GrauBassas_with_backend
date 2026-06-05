// 1. Extraemos las medidas que se repiten en Redondo, Cuadrado y Hexágono
const MEDIDAS_ESTANDAR = [
  2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 32, 34, 35, 36, 38, 40, 41, 42, 44, 45, 46, 48,
  50, 52, 54, 55, 56, 58, 60, 62, 64, 65, 66, 68, 70, 72, 74, 75, 76, 78, 80,
  85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160,
  165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235,
  240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310,
  315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385,
  390, 395, 400, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450, 455, 460,
  465, 470, 475, 480, 485, 490, 495, 500, 510, 520, 530, 550, 575, 600, 650,
  700, 750, 800, 850, 900, 950, 1000,
];

// 2. Columna de peso común para perfiles por metro
const COL_PESO_M = { header: "Peso (kg/m)", key: "peso" };

export const PESOS_TEORICOS = {
  Redondo: {
    title: "Pesos Teóricos - Perfil Redondo",
    formula: "redondo",
    unidad: "kg/m",
    columns: [{ header: "Diámetro (mm)", key: "medida" }, COL_PESO_M],
    medidas: MEDIDAS_ESTANDAR,
  },
  Cuadrado: {
    title: "Pesos Teóricos - Perfil Cuadrado",
    formula: "cuadrado",
    unidad: "kg/m",
    columns: [{ header: "Lado (mm)", key: "medida" }, COL_PESO_M],
    medidas: MEDIDAS_ESTANDAR,
  },
  Hexágono: {
    title: "Pesos Teóricos - Perfil Hexagonal",
    formula: "hexagono",
    unidad: "kg/m",
    columns: [{ header: "e/caras (mm)", key: "medida" }, COL_PESO_M],
    medidas: MEDIDAS_ESTANDAR,
  },
  Chapa: {
    title: "Pesos Teóricos - Chapa",
    formula: "chapa",
    unidad: "kg/m²",
    note: "Peso = espesor (mm) × densidad (kg/dm³). Peso pieza = kg/m² × superficie (m²).",
    columns: [
      { header: "Espesor (mm)", key: "medida" },
      { header: "Peso (kg/m²)", key: "peso" },
    ],
    formatos: [
      { dimensiones: "3000 × 1500 mm", superficie: "4.50 m²" },
      { dimensiones: "2500 × 1250 mm", superficie: "3.13 m²" },
      { dimensiones: "2500 × 1000 mm", superficie: "2.50 m²" },
      { dimensiones: "2000 × 1500 mm", superficie: "3.00 m²" },
      { dimensiones: "2000 × 1270 mm", superficie: "2.54 m²" },
      { dimensiones: "2000 × 1000 mm", superficie: "2.00 m²" },
      { dimensiones: "2000 × 600 mm", superficie: "1.20 m²" },
      { dimensiones: "2000 × 500 mm", superficie: "1.00 m²" },
      { dimensiones: "2500 × 500 mm", superficie: "1.25 m²" },
      { dimensiones: "2500 × 450 mm", superficie: "1.13 m²" },
    ],
    medidas: [
      2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 15, 16, 18, 20, 22, 25, 28, 30,
      32, 35, 38, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 130,
      140, 150, 160, 170, 180, 190, 200,
    ],
  },
};
