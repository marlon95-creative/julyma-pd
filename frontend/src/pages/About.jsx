import { Link } from "react-router-dom";
import { company } from "../config.js";
import { clients, structure } from "../data.js";
import { usePageTitle } from "../components/usePageTitle.js";

function Tree({ node }) {
  return (
    <li>
      <span className="node">{node.name}</span>
      {node.children && <ul>{node.children.map((c) => <Tree key={c.name} node={c} />)}</ul>}
    </li>
  );
}

export default function About() {
  usePageTitle("About Us");
  return (
    <section className="container section">
      <h1>About {company.name}</h1>
      <div className="prose">
        <h2>Who we are</h2>
        <p>{company.name} is a Tanzanian private company, incorporated in 2018 by the Business Registration and Licensing Authority (BRELA).</p>
        <p>The company currently specialises in the production and supply of PPEs (safety gear), uniforms and work wear, and in branding with screen printing, embroidery and printing services.</p>
        <p>Our factory is based in Kunduchi RTD, Plot No. 513, along Salasala Road, Dar es Salaam.</p>

        <h2>What we do</h2>
        <h3>Uniforms, work wear and PPE</h3>
        <ul>
          <li>Industrial uniforms</li>
          <li>Executive and office uniforms</li>
          <li>Hospital uniforms</li>
          <li>Education and school uniforms</li>
          <li>Personal protective equipment (PPEs)</li>
        </ul>
        <h3>Branding services</h3>
        <ul>
          <li>Printing services</li>
          <li>Embroidery services</li>
          <li>Screen printing services</li>
        </ul>

        <h2>Management</h2>
        <p>The company is headed by the Board of Directors. Under it we have different departments: Marketing, Human Resources, and the Finance and Administrative Directorate. A team of dedicated and experienced tailors (&ldquo;Fundis&rdquo;) works directly on fabrics and other printing machines.</p>
      </div>

      <h3 id="structure">Organization structure</h3>
      <div className="org" role="group" aria-labelledby="structure"><ul className="tree"><Tree node={structure} /></ul></div>

      <div className="prose">
        <h2>Customer service</h2>
        <p>At Julyma we are determined to provide the best production and supply of uniforms, work wear, branding services (large format printing, screen printing and embroidery) and personal protective equipment (PPE).</p>
        <p>Our commitment is to deliver the best results and to provide quality, personalised service tailored to meet your needs.</p>
      </div>

      <h2 id="clients">Our clientele</h2>
      <ul className="client-list">{clients.map((c) => <li key={c}>{c}</li>)}<li>and others</li></ul>

      <h2>Company registration</h2>
      <dl className="facts">
        <div><dt>Registered name</dt><dd>Julyma Printers and Designers Limited</dd></div>
        <div><dt>Certificate of Incorporation No.</dt><dd>137139294 (BRELA, 19 July 2018)</dd></div>
        <div><dt>Tax Identification No. (TIN)</dt><dd>137-139-294</dd></div>
      </dl>

      <p className="actions"><Link className="btn" to="/request-quote">Request Quote</Link><Link className="btn btn-outline" to="/contact">Contact Us</Link></p>
    </section>
  );
}
