import { TYPES } from "./types";

export default [
  {
    name: "Expertos",
    image: "img/expertos.jpg",
    type: TYPES.SECTION,
    children: [
      {
        name: "EDEP",
        image: "img/expertos/edep.jpg",
        type: TYPES.COURSE
      },
      {
        name: "DAIP",
        image: "img/expertos/daip.jpg",
        type: TYPES.COURSE
      },
      {
        name: "Mentoring familiar",
        image: "img/expertos/mentoring_familiar.jpg",
        type: TYPES.COURSE
      }
    ]
  },
  {
    name: "Familia",
    image: "img/familia.jpg",
    type: TYPES.SECTION,
    children: [
      {
        name: "Comunicar el amor",
        image: "img/familia/comunicar_el_amor.jpg",
        type: TYPES.COURSE
      },
      {
        name: "Educar desde pequeños",
        image: "img/familia/educar_desde_pequenos.jpg",
        type: TYPES.COURSE
      },
      {
        name: "Esperar la pubertad",
        image: "img/familia/esperar_la_pubertad.jpg",
        type: TYPES.COURSE
      },
      {
        name: "Sobrevivir a los adolescentes",
        image: "img/familia/sobrevivir_a_los_adolescentes.jpg",
        type: TYPES.COURSE
      }
    ]
  },
  {
    name: "Formación",
    image: "img/formacion.jpg",
    type: TYPES.SECTION,
    children: [
      {
        name: "Cursos Intensivos de Educación Familiar",
        image: "img/formacion/cief.jpg",
        type: TYPES.SECTION
      },
      {
        name: "Cursos Básicos de Educación Personalizada",
        image: "img/formacion/cbep.jpg",
        type: TYPES.SECTION
      }
    ]
  },
  {
    name: "Conferencias",
    image: "img/conferencias.jpg",
    type: TYPES.COURSE
  }
];
