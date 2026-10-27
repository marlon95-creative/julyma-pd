// Contact details taken from the Julyma Printers and Designers Ltd company profile.
export const company = {
  name: "Julyma Printers and Designers Ltd",
  short: "Julyma Printers & Designers",
  tagline: "Uniforms & work wear | Printing services | Production & supply of PPEs",
  email: "info@julyma-pd.co.tz",
  website: "www.julyma-pd.co.tz",
  phones: ["+255 622 552 421", "+255 754 620 348"],
  offices: [
    {
      id: "main",
      label: "Main Office",
      place: "Mwanza",
      lines: ["P.O. Box 238, Kona ya Bwiru", "Mwanza, Tanzania"],
      phones: ["+255 622 552 421"],
      mapQuery: "Kona ya Bwiru, Mwanza, Tanzania",
    },
    {
      id: "branch",
      label: "Branch Office",
      place: "Dar es Salaam",
      lines: ["P.O. Box 31996", "Ali Maua B Street / Salma Kikwete Road", "Kijitonyama, Dar es Salaam, Tanzania"],
      phones: ["+255 754 620 348", "+255 622 552 421"],
      mapQuery: "Ali Maua B Street, Kijitonyama, Dar es Salaam, Tanzania",
    },
  ],
  factory: {
    label: "Factory",
    place: "Dar es Salaam",
    lines: ["Kunduchi RTD, Plot No. 513", "Along Salasala Road, Dar es Salaam, Tanzania"],
    mapQuery: "Kunduchi RTD, Salasala Road, Dar es Salaam, Tanzania",
  },
};

export const telHref = (n) => `tel:${n.replace(/[^\d+]/g, "")}`;
export const mapHref = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
