// Diccionario de nombres bíblicos / términos relacionados con personas.
// Se usa para el glosario de nombres: una palabra entra al glosario si su
// categoría tiene el tag "Nombres/Names/Nomi" O si aparece en este diccionario.

export const DICT_NOMBRES = {
  es: {
    patrones: /\b(HIJO DE|HIJA DE|DE TARSO|EL BAUTISTA|PADRE DE|MADRE DE)\b/i,
    nombres: new Set([
      "EMANUEL","ESAU","ZOROBABEL","ZACARIAS","ZEBEDEO","TIMEO","SAUL",
      "JESUS", "JESUCRISTO", "MARIA", "JOSE", "PEDRO", "PABLO", "JUAN", "SIMON", "SANTIAGO",
      "ANDRES", "FELIPE", "BARTOLOME", "TOMAS", "MATEO", "JUDAS", "TADEO", "MOISES", "ABRAHAM",
      "DAVID", "SALOMON", "NOE", "ADAN", "EVA", "AARON", "EZEQUIEL", "ISAIAS", "JEREMIAS",
      "DANIEL", "ELIAS", "PILATO", "HERODES", "LAZARO", "MARTA", "MAGDALENA", "ISAAC", "ISABEL",
      "ISMAEL", "JAIRO", "JACOB", "JEHOVA", "JONATAN", "JUDA", "JORDAN", "LEVI", "LUCAS",
      "MATIAS", "NAZARENO", "PUBLICANOS", "REBECA", "RAQUEL", "ROMANOS", "SADUCEOS",
      "SAMARITANOS", "SAMUEL", "SANSON", "SARA", "SARAH", "SEM", "YAHVEH",
      "ABEL", "ANA", "BALTASAR", "BELEN", "BENJAMIN", "FENICIOS", "FARISEOS", "GABRIEL",
      "GASPAR", "GRIEGOS", "HERODIANOS", "HINDUISMO", "ISLAM", "JUDAISMO", "MELCHOR"
    ])
  },
  it: {
    patrones: /\b(FIGLIO DI|FIGLIA DI|DI TARSO|IL BATTISTA|PADRE DI|MADRE DI)\b/i,
    nombres: new Set([
      "GESU", "CRISTO", "MARIA", "GIUSEPPE", "PIETRO", "PAOLO", "GIOVANNI", "SIMONE", "GIACOMO",
      "ANDREA", "FILIPPO", "BARTOLOMEO", "TOMMASO", "MATTEO", "GIUDA", "TADDEO", "MOISE",
      "ABRAMO", "DAVIDE", "SALOMONE", "NOE", "ADAMO", "EVA", "ARONNE", "EZECHIELE", "ISAIA",
      "GEREMIA", "DANIELE", "ELIA", "PILATO", "ERODE", "LAZZARO", "MARTA", "MADDALENA", "ISACCO",
      "ELISABETTA", "ISMAELE", "JAIRO", "GIACOBBE", "GEOVA", "GIONATA", "GIUDA", "GIORDANO",
      "LEVI", "LUCA", "MATTIA", "NAZARENO", "PUBBLICANI", "REBECCA", "RACHELE", "ROMANI",
      "SADDUCEI", "SAMARITANI", "SAMUELE", "SANSONE", "SARA", "SEM", "YAHWEH",
      "ABELE", "ANNA", "BALDASSARRE", "BETLEMME", "BENIAMINO", "FENICI", "FARISEI", "GABRIELE",
      "GASPARE", "GRECI", "ERODIANI", "INDUISMO", "ISLAM", "GIUDAISMO", "MELCHIORRE"
    ])
  },
  en: {
    patrones: /\b(SON OF|DAUGHTER OF|OF TARSUS|THE BAPTIST|FATHER OF|MOTHER OF)\b/i,
    nombres: new Set([
      "JESUS", "CHRIST", "MARY", "JOSEPH", "PETER", "PAUL", "JOHN", "SIMON", "JAMES",
      "ANDREW", "PHILIP", "BARTHOLOMEW", "THOMAS", "MATTHEW", "JUDAS", "THADDEUS", "MOSES",
      "ABRAHAM", "DAVID", "SOLOMON", "NOAH", "ADAM", "EVE", "AARON", "EZEKIEL", "ISAIAH",
      "JEREMIAH", "DANIEL", "ELIJAH", "PILATE", "HEROD", "LAZARUS", "MARTHA", "MAGDALENE",
      "ISAAC", "ELIZABETH", "ISHMAEL", "JAIRUS", "JACOB", "JEHOVAH", "JONATHAN", "JUDAH",
      "JORDAN", "LEVI", "LUKE", "MATTHIAS", "NAZARENE", "PUBLICANS", "REBEKAH", "RACHEL",
      "ROMANS", "SADDUCEES", "SAMARITANS", "SAMUEL", "SAMSON", "SARAH", "SHEM", "YAHWEH",
      "ABEL", "ANNA", "BALTHAZAR", "BETHLEHEM", "BENJAMIN", "PHOENICIANS", "PHARISEES", "GABRIEL",
      "CASPAR", "GREEKS", "HERODIANS", "HINDUISM", "ISLAM", "JUDAISM", "MELCHIOR"
    ])
  }
};

// Comprueba si una palabra (simple o compuesta) es un "nombre" según el
// diccionario del idioma indicado.
export function isNameWord(word, lang) {
  const dict = DICT_NOMBRES[lang] || DICT_NOMBRES.es;
  if (!word) return false;
  const upper = word.toUpperCase();
  if (dict.patrones && dict.patrones.test(upper)) return true;
  const tokens = upper.split(/[\s&]+/).filter(Boolean);
  for (const t of tokens) {
    if (dict.nombres.has(t)) return true;
  }
  return false;
}