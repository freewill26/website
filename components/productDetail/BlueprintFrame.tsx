"use client";

import { useEffect, useRef, useState } from "react";

/** Fallback height until the document reports its own. */
const MIN_HEIGHT = 420;

/**
 * Renders a CMS-uploaded blueprint document inside a sandboxed iframe.
 *
 * The markup is authored outside our design system (it arrives as a whole
 * `.html` file), so it is isolated rather than inlined: `sandbox` withholds
 * `allow-same-origin`, which gives the frame a null origin — it cannot read our
 * cookies/storage, navigate the page, or submit forms. Scripts are allowed only
 * so blueprints can be interactive; that is safe precisely because the frame is
 * cross-origin to us.
 *
 * The frame can't be measured across that origin boundary, so a small reporter
 * script is appended to the document and posts its own height out.
 */
export default function BlueprintFrame({ html, title }: { html: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      // Null-origin frame, so identify it by source rather than origin.
      if (e.source !== frameRef.current?.contentWindow) return;
      const value = (e.data as { __fwBlueprintHeight?: unknown })?.__fwBlueprintHeight;
      if (typeof value === "number" && Number.isFinite(value)) {
        setHeight(Math.max(MIN_HEIGHT, Math.ceil(value)));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const srcDoc = `${html}
<script>
(function () {
  var report = function () {
    var d = document.documentElement, b = document.body;
    var h = Math.max(
      d ? d.scrollHeight : 0, d ? d.offsetHeight : 0,
      b ? b.scrollHeight : 0, b ? b.offsetHeight : 0
    );
    parent.postMessage({ __fwBlueprintHeight: h }, '*');
  };
  report();
  window.addEventListener('load', report);
  window.addEventListener('resize', report);
  if (window.ResizeObserver && document.body) {
    new ResizeObserver(report).observe(document.body);
  }
})();
</script>`;

  return (
    <iframe
      ref={frameRef}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      loading="lazy"
      referrerPolicy="no-referrer"
      style={{ height }}
      className="block w-full border-0 bg-white transition-[height] duration-300"
    />
  );
}
