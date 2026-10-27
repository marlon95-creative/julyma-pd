import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { submitQuote } from "../api.js";
import { OTHER, brandingItems } from "../data.js";
import { useCategories, useProducts } from "../components/useCatalog.js";
import { usePageTitle } from "../components/usePageTitle.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s\-().]{6,19}$/;
const OK_EXT = ["pdf", "jpg", "jpeg", "png", "doc", "docx", "xls", "xlsx"];
const MAX_BYTES = 5 * 1024 * 1024;
const OTHER_ITEM = "Other item (describe in the note below)";

const empty = {
  full_name: "", company_name: "", phone: "", email: "", category: "", service_or_product: "",
  quantity: "", project_location: "", preferred_date: "", budget: "", request_note: "",
  preferred_contact_method: "", website: "",
};

function validate(v, file) {
  const e = {};
  if (!v.full_name.trim()) e.full_name = "Enter your full name.";
  if (!v.phone.trim()) e.phone = "Enter a phone number we can call.";
  else if (!PHONE.test(v.phone.trim())) e.phone = "Enter a valid phone number, for example +255 700 000 000.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address, for example name@example.com.";
  if (!v.category) e.category = "Choose what you are requesting.";
  if (!v.service_or_product.trim()) e.service_or_product = "Choose or enter the product or service.";
  if (v.quantity && (!/^\d+$/.test(v.quantity) || +v.quantity < 1)) e.quantity = "Enter a whole number of 1 or more.";
  if (v.request_note.trim().length < 10) e.request_note = "Describe what you need in at least 10 characters.";
  if (file) {
    const ext = file.name.split(".").pop().toLowerCase();
    if (!OK_EXT.includes(ext)) e.attachment = "Upload a PDF, image (JPG or PNG), Word or Excel file.";
    else if (file.size > MAX_BYTES) e.attachment = "The file is larger than 5 MB. Upload a smaller file.";
  }
  return e;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label} <span className="req">{required ? "(required)" : "(optional)"}</span></label>
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      {error && <p className="error" id={`${id}-err`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 17h.01" /></svg>{error}</p>}
    </div>
  );
}

export default function RequestQuote() {
  usePageTitle("Request Quote");
  const [params] = useSearchParams();
  const cats = useCategories();
  const prods = useProducts();
  const [values, setValues] = useState(() => ({
    ...empty,
    category: params.get("category") || "",
    service_or_product: params.get("item") || "",
  }));
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState("");
  const summary = useRef(null);
  const fileInput = useRef(null);

  useEffect(() => { if (formError) summary.current?.focus(); }, [formError, errors]);

  const set = (name) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value, ...(name === "category" ? { service_or_product: "" } : {}) }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };
  const aria = (name, hint) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": [errors[name] && `${name}-err`, hint && `${name}-hint`].filter(Boolean).join(" ") || undefined,
  });

  const selected = cats.data.find((c) => c.slug === values.category);
  let choices = null;
  if (selected?.kind === "product") choices = [...prods.data.filter((p) => p.category === selected.slug).map((p) => p.name), OTHER_ITEM];
  else if (selected?.kind === "service") choices = [...brandingItems, "Other branding service (describe in the note below)"];
  // an item chosen from a product card may not be in the list while products load
  const listed = !choices || choices.includes(values.service_or_product);

  async function onSubmit(ev) {
    ev.preventDefault();
    if (status === "sending") return;
    const clientErrors = validate(values, file);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError("Some details need fixing. Check the highlighted fields.");
      requestAnimationFrame(() => document.querySelector(".has-error input, .has-error select, .has-error textarea")?.focus());
      return;
    }
    const data = new FormData();
    Object.entries(values).forEach(([k, v]) => { if (String(v).trim() !== "") data.append(k, String(v).trim()); });
    if (file) data.append("attachment", file);

    setStatus("sending");
    setFormError("");
    try {
      const res = await submitQuote(data);
      setReference(res.reference);
      setStatus("done");
    } catch (err) {
      setStatus("idle"); // keep everything the client typed
      const fe = {};
      Object.entries(err.fieldErrors || {}).forEach(([k, msgs]) => { fe[k] = Array.isArray(msgs) ? msgs[0] : String(msgs); });
      setErrors(fe);
      setFormError(err.message);
    }
  }

  function reset() {
    setValues(empty); setFile(null); setErrors({}); setFormError(""); setStatus("idle");
    if (fileInput.current) fileInput.current.value = "";
  }

  if (status === "done") {
    return (
      <section className="container section narrow">
        <div className="notice success" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
          <h1>Request received</h1>
          <p>Thank you, {values.full_name.split(" ")[0]}. We will review your request and contact you with a quotation.</p>
          <p>Your reference number: <strong className="ref">{reference}</strong></p>
          <p className="hint">A confirmation was sent to {values.email}. Keep the reference number if you contact us.</p>
        </div>
        <p className="actions"><button type="button" className="btn" onClick={reset}>Send another request</button><Link className="btn btn-outline" to="/">Back to Home</Link></p>
      </section>
    );
  }

  const sending = status === "sending";
  const errorList = Object.entries(errors).filter(([, m]) => m);

  return (
    <section className="container section narrow">
      <h1>Request a quote or note</h1>
      <p>Tell us what you need. We will reply with a quotation. Fields marked (required) must be filled in.</p>

      {formError && (
        <div className="notice error-box" role="alert" tabIndex={-1} ref={summary}>
          <strong>{formError}</strong>
          {errorList.length > 0 && <ul>{errorList.map(([k, m]) => <li key={k}>{m}</li>)}</ul>}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate aria-busy={sending}>
        <fieldset disabled={sending}>
          <legend>Your details</legend>
          <Field id="full_name" label="Full name" required error={errors.full_name}>
            <input type="text" autoComplete="name" {...aria("full_name")} value={values.full_name} onChange={set("full_name")} maxLength={120} />
          </Field>
          <Field id="company_name" label="Company or organization" error={errors.company_name}>
            <input type="text" autoComplete="organization" {...aria("company_name")} value={values.company_name} onChange={set("company_name")} maxLength={150} />
          </Field>
          <div className="row">
            <Field id="phone" label="Phone number" required error={errors.phone}>
              <input type="tel" inputMode="tel" autoComplete="tel" {...aria("phone")} value={values.phone} onChange={set("phone")} maxLength={25} />
            </Field>
            <Field id="email" label="Email address" required error={errors.email}>
              <input type="email" inputMode="email" autoComplete="email" {...aria("email")} value={values.email} onChange={set("email")} maxLength={254} />
            </Field>
          </div>
          <Field id="preferred_contact_method" label="Preferred contact method" error={errors.preferred_contact_method}>
            <select {...aria("preferred_contact_method")} value={values.preferred_contact_method} onChange={set("preferred_contact_method")}>
              <option value="">No preference</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </Field>
        </fieldset>

        <fieldset disabled={sending}>
          <legend>Your request</legend>
          <div className="row">
            <Field id="category" label="Request type" required error={errors.category}>
              <select {...aria("category")} value={values.category} onChange={set("category")}>
                <option value="">Choose a type</option>
                {cats.data.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                {values.category && values.category !== OTHER && !selected && !cats.loading && <option value={values.category}>{values.category}</option>}
                <option value={OTHER}>Other request</option>
              </select>
            </Field>
            <Field id="service_or_product" label="Product or service" required error={errors.service_or_product}
              hint={!values.category ? "Choose a request type first." : undefined}>
              {choices ? (
                <select {...aria("service_or_product", !values.category)} value={values.service_or_product} onChange={set("service_or_product")}>
                  <option value="">Choose one</option>
                  {!listed && values.service_or_product && <option value={values.service_or_product}>{values.service_or_product}</option>}
                  {choices.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <input type="text" {...aria("service_or_product", !values.category)} value={values.service_or_product} onChange={set("service_or_product")} maxLength={150} disabled={!values.category} />
              )}
            </Field>
          </div>
          <div className="row">
            <Field id="quantity" label="Quantity" error={errors.quantity}>
              <input type="text" inputMode="numeric" {...aria("quantity")} value={values.quantity} onChange={set("quantity")} maxLength={6} />
            </Field>
            <Field id="preferred_date" label="Preferred date or timeline" error={errors.preferred_date}>
              <input type="text" {...aria("preferred_date")} value={values.preferred_date} onChange={set("preferred_date")} maxLength={100} placeholder="For example: within 2 weeks" />
            </Field>
          </div>
          <div className="row">
            <Field id="project_location" label="Delivery location" error={errors.project_location}>
              <input type="text" autoComplete="street-address" {...aria("project_location")} value={values.project_location} onChange={set("project_location")} maxLength={200} />
            </Field>
            <Field id="budget" label="Estimated budget" error={errors.budget}>
              <input type="text" {...aria("budget")} value={values.budget} onChange={set("budget")} maxLength={100} />
            </Field>
          </div>
          <Field id="request_note" label="Detailed request" required error={errors.request_note} hint="Sizes, colours, logo or branding, quantities and anything else we should know.">
            <textarea rows={6} {...aria("request_note", true)} value={values.request_note} onChange={set("request_note")} maxLength={3000} />
          </Field>
          <Field id="attachment" label="Attachment" error={errors.attachment} hint="Designs, size lists or specifications. PDF, JPG, PNG, Word or Excel, up to 5 MB.">
            <input type="file" ref={fileInput} {...aria("attachment", true)} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              onChange={(e) => { setFile(e.target.files[0] || null); setErrors((x) => ({ ...x, attachment: undefined })); }} />
          </Field>
        </fieldset>

        {/* Honeypot: hidden from people and assistive technology, bots fill it in */}
        <div className="hp" aria-hidden="true">
          <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} /></label>
        </div>

        <button type="submit" className="btn btn-block" disabled={sending}>
          {sending ? (<><span className="spinner" aria-hidden="true" /> Sending your request…</>) : "Send request"}
        </button>
        <p className="sr-only" role="status">{sending ? "Sending your request" : ""}</p>
      </form>
    </section>
  );
}
