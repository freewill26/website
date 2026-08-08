/** Full-bleed YouTube showreel, autoplaying muted. */
export default function HomeShowreel({ youtubeId }: { youtubeId: string }) {
  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`;

  return (
    <section
      id="fw-reel"
      className="relative aspect-video overflow-hidden md:aspect-auto md:h-screen md:min-h-[560px]"
      style={{ background: "#E7DECB" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={src}
          title="Freewill showreel"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 border-0 md:h-[56.25vw] md:min-h-screen md:w-screen md:min-w-[177.78vh]"
        />
      </div>
    </section>
  );
}
