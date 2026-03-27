export type Project = {
  id: string;
  title: string;
  kicker: string;
  chips: [string, string];
  images: { src: string; alt: string }[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  num: string;
  images: string[];
};

export type ClientTag = {
  id: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "oficinas",
    title: "Construcción Industrial",
    description: "Ejecución de galpones, bodegas y estructuras metálicas.",
    num: "01",
    images: [
      "/imagenes/Ipr_norai_1.jpeg",
      "/imagenes/Ipr_cinepolis_4.jpeg",
    ],
  },
  {
    id: "residencial",
    title: "Retail y Comercio",
    description: "Habilitación de locales comerciales y espacios de atención.",
    num: "02",
    images: [
      "/imagenes/Ipr_cinepolis_1.jpeg",
      "/imagenes/Ipr_the_coffee_2.jpeg",
    ],
  },
  {
    id: "obras-civiles",
    title: "Oficinas",
    description: "Diseño y remodelación de espacios corporativos.",
    num: "03",
    images: [
      "/imagenes/Ipr_the_coffee_6.jpeg",
      "/imagenes/Ipr_cinepolis_4.jpeg",
    ],
  },
  {
    id: "cafeterias",
    title: "Proyectos Habitacionales",
    description: "Construcción de viviendas seguras y de alto estándar.",
    num: "04",
    images: [
      "/imagenes/Ipr_the_coffee_2.jpeg",
      "/imagenes/Ipr_norai_2.jpeg",
      "/imagenes/Ipr_the_coffee_1.jpeg",
    ],
  },
  {
    id: "clinicas",
    title: "Obras Civiles",
    description: "Infraestructura y urbanización con ejecución eficiente.",
    num: "05",
    images: [
      "/imagenes/Ipr_the_coffee_5.jpeg",
      "/imagenes/Ipr_cinepolis_2.jpeg",
    ],
  },
  {
    id: "retail",
    title: "Ingeniería",
    description: "Desarrollo técnico y planificación de proyectos.",
    num: "06",
    images: [
      "/imagenes/Ipr_the_coffee_1.jpeg",
      "/imagenes/Ipr_norai_2.jpeg",
    ],
  },
];

export const clientTags: ClientTag[] = [
  {
    id: "retail",
    title: "Retail",
    description: "Locales pensados para experiencia, flujo y operaciÃ³n.",
  },
  {
    id: "oficinas",
    title: "Oficinas",
    description: "Espacios funcionales para productividad y cultura de equipo.",
  },
  {
    id: "cafeterias",
    title: "CafeterÃ­as",
    description: "Interiorismo, materiales y flujos de atenciÃ³n bien resueltos.",
  },
  {
    id: "salud",
    title: "Salud",
    description: "ClÃ­nicas y proyectos con foco en norma, higiene y eficiencia operativa.",
  },
  {
    id: "residencial",
    title: "Residencial",
    description: "Proyectos a medida, con terminaciones durables y buena planificaciÃ³n.",
  },
  {
    id: "obras",
    title: "Obras civiles",
    description: "EjecuciÃ³n con estÃ¡ndar, plazos claros y control de calidad en obra.",
  },
];

export const projects: Project[] = [
  {
    id: "the-coffee",
    title: "The Coffee",
    kicker: "Santiago Â· Retail",
    chips: ["CafeterÃ­a", "Finalizado"],
    images: [
      {
        src: "/imagenes/Ipr_the_coffee_1.jpeg",
        alt: "Proyecto cafeterÃ­a The Coffee â€” vista general",
      },
      { src: "/imagenes/Ipr_the_coffee_2.jpeg", alt: "" },
      { src: "/imagenes/Ipr_the_coffee_3.jpeg", alt: "" },
    ],
  },
  {
    id: "the-coffee-detalles",
    title: "The Coffee Â· Detalles",
    kicker: "CafeterÃ­a Â· Terminaciones",
    chips: ["Interiorismo", "Finalizado"],
    images: [
      {
        src: "/imagenes/Ipr_the_coffee_4.jpeg",
        alt: "Proyecto cafeterÃ­a The Coffee â€” interior",
      },
      { src: "/imagenes/Ipr_the_coffee_5.jpeg", alt: "" },
      { src: "/imagenes/Ipr_the_coffee_6.jpeg", alt: "" },
    ],
  },
  {
    id: "norai",
    title: "Norai",
    kicker: "DiseÃ±o Â· Experiencia",
    chips: ["CafeterÃ­a", "Render"],
    images: [
      { src: "/imagenes/Ipr_norai_1.jpeg", alt: "Proyecto Norai â€” render comedor" },
      { src: "/imagenes/Ipr_norai_2.jpeg", alt: "" },
      { src: "/imagenes/Ipr_norai_3.jpeg", alt: "" },
    ],
  },
  {
    id: "norai-back",
    title: "Norai Â· Back of House",
    kicker: "OperaciÃ³n Â· Layout",
    chips: ["Cocina", "Render"],
    images: [
      { src: "/imagenes/Ipr_norai_2.jpeg", alt: "Proyecto Norai â€” render cocina" },
      { src: "/imagenes/Ipr_norai_3.jpeg", alt: "" },
    ],
  },
  {
    id: "cinepolis",
    title: "CinÃ©polis",
    kicker: "RemodelaciÃ³n Â· ConfiterÃ­a",
    chips: ["Retail", "EjecuciÃ³n"],
    images: [
      { src: "/imagenes/Ipr_cinepolis_1.jpeg", alt: "Proyecto CinÃ©polis â€” confiterÃ­a" },
      { src: "/imagenes/Ipr_cinepolis_2.jpeg", alt: "" },
      { src: "/imagenes/Ipr_cinepolis_3.jpeg", alt: "" },
    ],
  },
  {
    id: "obra-terreno",
    title: "EjecuciÃ³n en terreno",
    kicker: "Obras civiles Â· Avance",
    chips: ["Obra", "En proceso"],
    images: [
      { src: "/imagenes/Ipr_cinepolis_4.jpeg", alt: "Obra en ejecuciÃ³n â€” instalaciÃ³n y tabiquerÃ­a" },
      { src: "/imagenes/Ipr_cinepolis_3.jpeg", alt: "" },
      { src: "/imagenes/Ipr_cinepolis_2.jpeg", alt: "" },
    ],
  },
];
