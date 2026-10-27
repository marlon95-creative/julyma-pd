// Services and copy come from the company profile. Products and categories come from the backend.
export const OTHER = "other";

export const serviceGroups = [
  {
    id: "uniforms",
    title: "Uniforms, work wear and PPE",
    intro: "We produce and supply safety gear, uniforms and work wear for businesses, hospitals and schools.",
    items: [
      {
        slug: "ppe",
        category: "ppe",
        title: "Personal protective equipment (PPE)",
        summary: "Production and supply of PPEs (safety gear).",
        scope: ["Safety boots and gumboots", "Dust masks and safety glasses", "Earplugs and helmets", "Gloves and reflectors", "Fire safety PPEs", "Bee PPEs"],
      },
      {
        slug: "industrial-uniforms",
        category: "industrial-uniforms",
        title: "Industrial uniforms and work wear",
        summary: "Safety garments for the workplace.",
        scope: ["Overalls and dust coats", "Work suits", "Work shirts and work trousers", "Work blouses and work skirts"],
      },
      {
        slug: "hospital-uniforms",
        category: "hospital-uniforms",
        title: "Hospital uniforms",
        summary: "Uniforms for hospital and clinic staff.",
        scope: ["Scrubs and nurse dresses", "Gowns and lab coats", "Aprons and caps"],
      },
      {
        slug: "executive-uniforms",
        category: "executive-uniforms",
        title: "Executive and office uniforms",
        summary: "Uniforms for offices and corporate teams.",
        scope: ["Shirts and polo shirts", "Kaunda suits", "Jackets"],
      },
      {
        slug: "school-uniforms",
        category: "school-uniforms",
        title: "Education and school uniforms",
        summary: "Uniforms for schools.",
        scope: ["Shirts and ties", "Skirts and shorts"],
        image: "/images/school-group.jpg",
        imageAlt: "Pupils in blue and white school uniforms",
      },
    ],
  },
  {
    id: "branding",
    title: "Branding and printing services",
    intro: "Add your logo to uniforms, work wear and PPE, or print for your business.",
    items: [
      {
        slug: "printing",
        category: "branding-services",
        item: "Large format printing",
        title: "Large format printing",
        summary: "Printing services for large formats.",
        scope: ["Large format printing for your business"],
        image: "/images/printing.jpg",
        imageAlt: "Large format printing machine",
      },
      {
        slug: "screen-printing",
        category: "branding-services",
        item: "Screen printing",
        title: "Screen printing",
        summary: "Screen printing on uniforms and work wear.",
        scope: ["Logos and designs on garments"],
      },
      {
        slug: "embroidery",
        category: "branding-services",
        item: "Embroidery",
        title: "Embroidery",
        summary: "Embroidery for uniforms and work wear.",
        scope: ["Embroidered logos and names"],
      },
    ],
  },
];

export const brandingItems = ["Large format printing", "Screen printing", "Embroidery"];

export const clients = [
  "Tanzania Breweries Limited (TBL)", "Coca-Cola Kwanza Ltd", "Tanzania Cigarette Company (JTI – TCC)", "Sogea Satom",
  "TATA Africa Holdings Tanzania", "SICPA Tanzania", "VIVO Energy Tanzania", "TANESCO", "Tanzania Revenue Authority (TRA)",
  "TUWASA", "SWISSPORT Tanzania", "NMB Bank Tanzania", "Mbeya Cement Tanzania", "Simba Logistics", "Murzah Wilmar Co. Ltd",
  "Yapi Merkez", "GRUMET Construction", "Wambilube Oil", "Total Tanzania Ltd", "Simba Trailer", "GRW Tanzania", "Air Tanzania",
  "Simba Supply Chain Solution", "P-Consultant Medical Clinic", "Atlas Schools", "Youth Mappers", "Tech Works Limited",
  "Transec Limited", "Promining Services Ltd", "Minelabs", "Kamal Plus Ltd", "Weight and Measures Tanzania",
  "Reflective Security", "Simba Valuable in Transit (SIMBA VIT)", "Maua Seminary", "Keko Pharmaceutical Limited",
  "PM Group (T) Limited", "A to Z Textile Ltd", "Namis Corporate Ltd", "Medical Stores Department (MSD)", "SGA Security",
  "East Africa Logistics Services (EALS)", "GRUMET Reserves",
];

export const structure = {
  name: "Board of Directors",
  children: [{
    name: "Managing Director",
    children: [
      { name: "Marketing & Sales Directorate", children: [{ name: "Marketing Division" }, { name: "Sales Division" }] },
      { name: "Human Resource Directorate" },
      {
        name: "Finance & Administration Directorate",
        children: [
          { name: "Administration Division" },
          { name: "Procurement Division" },
          { name: "Production Division", children: [{ name: "Production Manager", children: [{ name: "Printing Department" }, { name: "Tailoring Department" }] }] },
          { name: "Finance Division" },
        ],
      },
    ],
  }],
};
