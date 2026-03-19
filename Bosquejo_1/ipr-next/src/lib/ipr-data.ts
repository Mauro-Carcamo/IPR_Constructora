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
    title: "Construcción de oficinas",
    num: "01",
    images: [
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.46 PM (2).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.44 PM (1).jpeg",
    ],
  },
  {
    id: "residencial",
    title: "Proyectos residenciales",
    num: "02",
    images: [
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.44 PM (3).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.45 PM (2).jpeg",
    ],
  },
  {
    id: "obras-civiles",
    title: "Obras civiles",
    num: "03",
    images: [
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (3).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.44 PM (1).jpeg",
    ],
  },
  {
    id: "cafeterias",
    title: "Construcción de cafeterías",
    num: "04",
    images: [
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM (2).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.46 PM (2).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (1).jpeg",
    ],
  },
  {
    id: "clinicas",
    title: "Clínicas dentales",
    num: "05",
    images: [
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.45 PM (2).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.44 PM (3).jpeg",
    ],
  },
  {
    id: "retail",
    title: "Proyectos de retail",
    num: "06",
    images: [
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (1).jpeg",
      "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM (2).jpeg",
    ],
  },
];

export const clientTags: ClientTag[] = [
  {
    id: "retail",
    title: "Retail",
    description: "Locales pensados para experiencia, flujo y operación.",
  },
  {
    id: "oficinas",
    title: "Oficinas",
    description: "Espacios funcionales para productividad y cultura de equipo.",
  },
  {
    id: "cafeterias",
    title: "Cafeterías",
    description: "Interiorismo, materiales y flujos de atención bien resueltos.",
  },
  {
    id: "salud",
    title: "Salud",
    description: "Clínicas y proyectos con foco en norma, higiene y eficiencia operativa.",
  },
  {
    id: "residencial",
    title: "Residencial",
    description: "Proyectos a medida, con terminaciones durables y buena planificación.",
  },
  {
    id: "obras",
    title: "Obras civiles",
    description: "Ejecución con estándar, plazos claros y control de calidad en obra.",
  },
];

export const projects: Project[] = [
  {
    id: "the-coffee",
    title: "The Coffee",
    kicker: "Santiago · Retail",
    chips: ["Cafetería", "Finalizado"],
    images: [
      {
        src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM.jpeg",
        alt: "Proyecto cafetería The Coffee — vista general",
      },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (1).jpeg", alt: "" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.42 PM.jpeg", alt: "" },
    ],
  },
  {
    id: "the-coffee-detalles",
    title: "The Coffee · Detalles",
    kicker: "Cafetería · Terminaciones",
    chips: ["Interiorismo", "Finalizado"],
    images: [
      {
        src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (3).jpeg",
        alt: "Proyecto cafetería The Coffee — interior",
      },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.44 PM.jpeg", alt: "" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.43 PM (2).jpeg", alt: "" },
    ],
  },
  {
    id: "norai",
    title: "Norai",
    kicker: "Diseño · Experiencia",
    chips: ["Cafetería", "Render"],
    images: [
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM (2).jpeg", alt: "Proyecto Norai — render comedor" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.46 PM (2).jpeg", alt: "" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM.jpeg", alt: "" },
    ],
  },
  {
    id: "norai-back",
    title: "Norai · Back of House",
    kicker: "Operación · Layout",
    chips: ["Cocina", "Render"],
    images: [
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM (1).jpeg", alt: "Proyecto Norai — render cocina" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM (2).jpeg", alt: "" },
    ],
  },
  {
    id: "cinepolis",
    title: "Cinépolis",
    kicker: "Remodelación · Confitería",
    chips: ["Retail", "Ejecución"],
    images: [
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.45 PM (1).jpeg", alt: "Proyecto Cinépolis — confitería" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.45 PM (2).jpeg", alt: "" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.45 PM (3).jpeg", alt: "" },
    ],
  },
  {
    id: "obra-terreno",
    title: "Ejecución en terreno",
    kicker: "Obras civiles · Avance",
    chips: ["Obra", "En proceso"],
    images: [
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.47 PM (3).jpeg", alt: "Obra en ejecución — instalación y tabiquería" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.46 PM.jpeg", alt: "" },
      { src: "/imagenes/WhatsApp Image 2026-03-18 at 2.41.46 PM (1).jpeg", alt: "" },
    ],
  },
];
