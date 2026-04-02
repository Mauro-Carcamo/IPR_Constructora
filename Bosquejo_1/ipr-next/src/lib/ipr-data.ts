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
  logoSrc: string;
};

export const services: Service[] = [
  {
    id: "oficinas",
    title: "Construcción Industrial",
    description: "Ejecución de galpones, bodegas y estructuras metálicas.",
    num: "01",
    images: ["/imagenes/Ipr_norai_1.jpeg", "/imagenes/Ipr_cinepolis_4.jpeg"],
  },
  {
    id: "residencial",
    title: "Retail y Comercio",
    description: "Habilitación de locales comerciales y espacios de atención.",
    num: "02",
    images: ["/imagenes/Ipr_cinepolis_1.jpeg", "/imagenes/Ipr_the_coffee_2.jpeg"],
  },
  {
    id: "obras-civiles",
    title: "Oficinas",
    description: "Diseño y remodelación de espacios corporativos.",
    num: "03",
    images: ["/imagenes/Ipr_the_coffee_6.jpeg", "/imagenes/Ipr_cinepolis_4.jpeg"],
  },
  {
    id: "cafeterias",
    title: "Proyectos Habitacionales",
    description: "Construcción de viviendas seguras y de alto estándar.",
    num: "04",
    images: ["/imagenes/Ipr_the_coffee_2.jpeg", "/imagenes/Ipr_norai_2.jpeg", "/imagenes/Ipr_the_coffee_1.jpeg"],
  },
  {
    id: "clinicas",
    title: "Obras Civiles",
    description: "Infraestructura y urbanización con ejecución eficiente.",
    num: "05",
    images: ["/imagenes/Ipr_the_coffee_5.jpeg", "/imagenes/Ipr_cinepolis_2.jpeg"],
  },
  {
    id: "retail",
    title: "Ingeniería",
    description: "Desarrollo técnico y planificación de proyectos.",
    num: "06",
    images: ["/imagenes/Ipr_the_coffee_1.jpeg", "/imagenes/Ipr_norai_2.jpeg"],
  },
];

export const clientTags: ClientTag[] = [
  { id: "sme", title: "SME", description: "Espacios y soluciones para operación comercial.", logoSrc: "/clientes/sme.png" },
  { id: "cinepolis", title: "Cinépolis", description: "Retail con foco en experiencia y terminaciones.", logoSrc: "/clientes/cinepolis.png" },
  { id: "turbus", title: "Turbus", description: "Infraestructura y habilitación para operación continua.", logoSrc: "/clientes/turbus.png" },
  { id: "buffalo", title: "Buffalo", description: "Desarrollo comercial con detalle y consistencia.", logoSrc: "/clientes/buffalo.png" },
  { id: "domenica", title: "Domenica", description: "Proyectos con identidad, orden y ejecución cuidada.", logoSrc: "/clientes/domenica.png" },
  { id: "cavas-reunidas", title: "Cavas Reunidas", description: "Espacios técnicos y comerciales con alto estándar.", logoSrc: "/clientes/cavas-reunidas.png" },
  { id: "ando", title: "Ando", description: "Soluciones versátiles para espacios de uso mixto.", logoSrc: "/clientes/ando.png" },
  { id: "mc", title: "MC", description: "Obras con enfoque operativo y buena coordinación.", logoSrc: "/clientes/mc.jpg" },
  { id: "ab-inbev", title: "AB InBev", description: "Ejecución profesional en espacios de gran demanda.", logoSrc: "/clientes/ab-inbev.jpg" },
  { id: "afp", title: "AFP", description: "Ambientes corporativos con orden y continuidad.", logoSrc: "/clientes/afp.png" },
  { id: "frattelli", title: "Frattelli", description: "Proyectos comerciales con identidad y presencia.", logoSrc: "/clientes/frattelli.png" },
  { id: "kbd", title: "KBD", description: "Desarrollo técnico con foco en calidad de obra.", logoSrc: "/clientes/kbd.png" },
  { id: "mammut", title: "Mammut", description: "Espacios con fuerte presencia visual y constructiva.", logoSrc: "/clientes/mammut.png" },
  { id: "lc-waikiki", title: "LC Waikiki", description: "Retail con despliegue eficiente y uniforme.", logoSrc: "/clientes/lc-waikiki.png" },
  { id: "the-coffee", title: "The Coffee", description: "Locales con experiencia de marca y terminaciones finas.", logoSrc: "/clientes/the-coffee.png" },
];

export const projects: Project[] = [
  {
    id: "the-coffee",
    title: "The Coffee",
    kicker: "Santiago · Retail",
    chips: ["Cafetería", "Finalizado"],
    images: [
      { src: "/imagenes/Ipr_the_coffee_1.jpeg", alt: "Proyecto cafetería The Coffee — vista general" },
      { src: "/imagenes/Ipr_the_coffee_2.jpeg", alt: "" },
      { src: "/imagenes/Ipr_the_coffee_3.jpeg", alt: "" },
    ],
  },
  {
    id: "the-coffee-detalles",
    title: "The Coffee · Detalles",
    kicker: "Cafetería · Terminaciones",
    chips: ["Interiorismo", "Finalizado"],
    images: [
      { src: "/imagenes/Ipr_the_coffee_4.jpeg", alt: "Proyecto cafetería The Coffee — interior" },
      { src: "/imagenes/Ipr_the_coffee_5.jpeg", alt: "" },
      { src: "/imagenes/Ipr_the_coffee_6.jpeg", alt: "" },
    ],
  },
  {
    id: "norai",
    title: "Norai",
    kicker: "Diseño · Experiencia",
    chips: ["Cafetería", "Render"],
    images: [
      { src: "/imagenes/Ipr_norai_1.jpeg", alt: "Proyecto Norai — render comedor" },
      { src: "/imagenes/Ipr_norai_2.jpeg", alt: "" },
      { src: "/imagenes/Ipr_norai_3.jpeg", alt: "" },
    ],
  },
  {
    id: "norai-back",
    title: "Norai · Back of House",
    kicker: "Operación · Layout",
    chips: ["Cocina", "Render"],
    images: [
      { src: "/imagenes/Ipr_norai_2.jpeg", alt: "Proyecto Norai — render cocina" },
      { src: "/imagenes/Ipr_norai_3.jpeg", alt: "" },
    ],
  },
  {
    id: "cinepolis",
    title: "Cinépolis",
    kicker: "Remodelación · Confitería",
    chips: ["Retail", "Ejecución"],
    images: [
      { src: "/imagenes/Ipr_cinepolis_1.jpeg", alt: "Proyecto Cinépolis — confitería" },
      { src: "/imagenes/Ipr_cinepolis_2.jpeg", alt: "" },
      { src: "/imagenes/Ipr_cinepolis_3.jpeg", alt: "" },
    ],
  },
  {
    id: "obra-terreno",
    title: "Ejecución en terreno",
    kicker: "Obras civiles · Avance",
    chips: ["Obra", "En proceso"],
    images: [
      { src: "/imagenes/Ipr_cinepolis_4.jpeg", alt: "Obra en ejecución — instalación y tabiquería" },
      { src: "/imagenes/Ipr_cinepolis_3.jpeg", alt: "" },
      { src: "/imagenes/Ipr_cinepolis_2.jpeg", alt: "" },
    ],
  },
];
