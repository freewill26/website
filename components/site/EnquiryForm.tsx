"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

interface EnquiryFormProps {
  /** Every category/product name searchable in the "surface / product" autocomplete. */
  options: string[];
  selectLabel: string;
  /** Card background (the panel surrounding the fields). */
  cardBg: string;
  /** Field/input background. */
  fieldBg: string;
  /** `dark` flips the text/label/accent colours for navy backgrounds. */
  tone?: "light" | "dark";
  /** Pre-fills the "surface / product" field, e.g. when arriving from a product page. */
  defaultValue?: string;
}

const MAX_SUGGESTIONS = 8;

/** Type-to-filter "surface / product" combobox — a free-text input backed by a suggestion list. */
function ProductAutocomplete({
  options,
  label,
  labelColor,
  fieldStyle,
  fieldCls,
  cardBg,
  border,
  defaultValue,
}: {
  options: string[];
  label: string;
  labelColor: string;
  fieldStyle: React.CSSProperties;
  fieldCls: string;
  cardBg: string;
  border: string;
  defaultValue?: string;
}) {
  const [query, setQuery] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (defaultValue) setQuery(defaultValue);
  }, [defaultValue]);

  const filtered = (
    query.trim()
      ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))
      : options
  ).slice(0, MAX_SUGGESTIONS);

  return (
    <label className="relative flex flex-col gap-2">
      <span className="text-[11px] font-bold tracking-[0.16em]" style={{ color: labelColor }}>
        {label}
      </span>
      <input
        type="text"
        name="surfaceProduct"
        role="combobox"
        aria-expanded={open}
        autoComplete="off"
        placeholder="Search a category or product…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={fieldCls}
        style={fieldStyle}
      />
      {open && filtered.length > 0 && (
        <ul
          className="absolute left-0 right-0 top-full z-10 mt-1.5 max-h-64 overflow-y-auto rounded-[10px] py-1.5 shadow-lg"
          style={{ background: cardBg, border: `1px solid ${border}` }}
        >
          {filtered.map((o) => (
            <li key={o}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setQuery(o);
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-[14px] hover:bg-black/5"
                style={{ color: fieldStyle.color }}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}

/**
 * Enquiry form with a local "sent" confirmation state — the React port of the
 * design's `submitForm` / `resetForm` flow (no backend wired yet). Works on both
 * the light (Home/About) and dark (Products) contact sections via `tone`.
 */
export default function EnquiryForm({
  options,
  selectLabel,
  cardBg,
  fieldBg,
  tone = "light",
  defaultValue,
}: EnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const dark = tone === "dark";

  const text = dark ? "#F6F4EC" : "#181A20";
  const labelColor = dark ? "rgba(246,244,236,0.55)" : "rgba(24,26,32,0.55)";
  const subColor = dark ? "rgba(246,244,236,0.5)" : "rgba(24,26,32,0.5)";
  const border = dark ? "rgba(255,255,255,0.16)" : "rgba(24,26,32,0.16)";
  const cardBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(24,26,32,0.08)";
  const focus = dark ? "focus:border-[#5FD0E0]" : "focus:border-brand";
  const placeholder = dark ? "placeholder:text-white/35" : "placeholder:text-black/35";

  const fieldStyle = { background: fieldBg, border: `1px solid ${border}`, color: text } as const;
  const fieldCls = `rounded-[10px] px-4 py-3.5 text-[15px] outline-none ${focus} ${placeholder}`;
  const labelCls = "text-[11px] font-bold tracking-[0.16em]";

  if (sent) {
    return (
      <div
        className="flex min-h-[360px] flex-col items-start justify-center rounded-[18px] p-[clamp(32px,4vw,56px)]"
        style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
      >
        <div className="mb-6 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-brand">
          <CheckIcon size={28} color="FFFFFF" />
        </div>
        <h3 className="m-0 mb-3 font-display text-[34px] uppercase leading-[1.05]" style={{ color: text }}>
          Thanks — we&apos;ve got it.
        </h3>
        <p className="m-0 mb-7 max-w-[420px] text-base leading-[1.8]" style={{ color: labelColor }}>
          Your enquiry is on its way to our team. We&apos;ll be in touch within
          one working day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="rounded-full border bg-transparent px-[26px] py-3.5 text-[13px] font-bold tracking-[0.1em]"
          style={{ borderColor: border, color: text }}
        >
          <span className="inline-flex items-center gap-2">SEND ANOTHER <ArrowRightIcon size={12} color={dark ? "F6F4EC" : "181A20"} /></span>
        </button>
      </div>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-5 rounded-[18px] p-[clamp(28px,3vw,44px)]"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ color: labelColor }}>FULL NAME</span>
          <input required type="text" placeholder="Your name" className={fieldCls} style={fieldStyle} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ color: labelColor }}>PHONE</span>
          <input required type="tel" placeholder="+91 …" className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ color: labelColor }}>EMAIL</span>
          <input required type="email" placeholder="you@company.com" className={fieldCls} style={fieldStyle} />
        </label>
        <ProductAutocomplete
          options={options}
          label={selectLabel}
          labelColor={labelColor}
          fieldStyle={fieldStyle}
          fieldCls={fieldCls}
          cardBg={dark ? "#111826" : "#FFFFFF"}
          border={border}
          defaultValue={defaultValue}
        />
      </div>
      <label className="flex flex-col gap-2">
        <span className={labelCls} style={{ color: labelColor }}>PROJECT DETAILS</span>
        <textarea
          rows={4}
          placeholder="Tell us about your venue, timeline and requirements…"
          className={`${fieldCls} resize-y leading-[1.7]`}
          style={fieldStyle}
        />
      </label>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="rounded-full bg-brand px-[34px] py-[18px] text-[13px] font-bold tracking-[0.1em] text-white transition-colors hover:bg-[#004E5F]"
        >
          <span className="inline-flex items-center gap-2">SEND ENQUIRY <ArrowRightIcon size={12} /></span>
        </button>
        <span className="text-xs leading-[1.6]" style={{ color: subColor }}>
          No obligation. We reply within 1 working day.
        </span>
      </div>
    </form>
  );
}
