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
    title: "ConstrucciÃ³n Industrial",
    description: "EjecuciÃ³n de galpones, bodegas y estructuras metÃ¡licas.",
    num: "01",
    images: ["/imagenes/Ipr_norai_1.jpeg", "/imagenes/Ipr_cinepolis_4.jpeg"],
  },
  {
    id: "residencial",
    title: "Retail y Comercio",
    description: "HabilitaciÃ³n de locales comerciales y espacios de atenciÃ³n.",
    num: "02",
    images: ["/imagenes/Ipr_cinepolis_1.jpeg", "/imagenes/Ipr_the_coffee_2.jpeg"],
  },
  {
    id: "obras-civiles",
    title: "Oficinas",
    description: "DiseÃ±o y remodelaciÃ³n de espacios corporativos.",
    num: "03",
    images: ["/imagenes/Ipr_the_coffee_6.jpeg", "/imagenes/Ipr_cinepolis_4.jpeg"],
  },
  {
    id: "cafeterias",
    title: "Proyectos Habitacionales",
    description: "ConstrucciÃ³n de viviendas seguras y de alto estÃ¡ndar.",
    num: "04",
    images: ["/imagenes/Ipr_the_coffee_2.jpeg", "/imagenes/Ipr_norai_2.jpeg", "/imagenes/Ipr_the_coffee_1.jpeg"],
  },
  {
    id: "clinicas",
    title: "Obras Civiles",
    description: "Infraestructura y urbanizaciÃ³n con ejecuciÃ³n eficiente.",
    num: "05",
    images: ["/imagenes/Ipr_the_coffee_5.jpeg", "/imagenes/Ipr_cinepolis_2.jpeg"],
  },
  {
    id: "retail",
    title: "IngenierÃ­a",
    description: "Desarrollo tÃ©cnico y planificaciÃ³n de proyectos.",
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
    kicker: "Santiago Â· Retail",
    chips: ["CafeterÃ­a", "Finalizado"],
    images: [
      { src: "/imagenes/Ipr_the_coffee_1.jpeg", alt: "Proyecto cafeterÃ­a The Coffee â€” vista general" },
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
      { src: "/imagenes/Ipr_the_coffee_4.jpeg", alt: "Proyecto cafeterÃ­a The Coffee â€” interior" },
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
