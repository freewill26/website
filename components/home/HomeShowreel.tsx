const YT_ID = "StguKQPzkEs";

/** Full-bleed YouTube showreel, autoplaying muted. */
export default function HomeShowreel() {
  const src = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`;

  return (
    <section
      id="fw-reel"
      className="relative h-screen min-h-[560px] overflow-hidden"
      style={{ background: "#E7DECB" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={src}
          title="Freewill showreel"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.78vh",
          }}
        />
      </div>
    </section>
  );
}
