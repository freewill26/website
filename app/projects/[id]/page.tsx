import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingEstimate from "@/components/site/FloatingEstimate";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { getProject, getRelatedProjects } from "@/lib/api/projects";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project not found · Freewill" };

  return {
    title: project.seo.title,
    description: project.seo.description,
    openGraph: {
      title: project.seo.ogTitle,
      description: project.seo.ogDescription,
      ...(project.seo.ogImage ? { images: [project.seo.ogImage] } : {}),
    },
  };
}

/**
 * One project — hero, the site's facts, and the tagged photo mosaic. The work
 * done here isn't a field on the record: it's the union of the photos' tags,
 * so the "What we built" strip and the gallery filter can never disagree.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  const related = await getRelatedProjects(project.id, project.sector);

  const facts = [
    { label: "Sector", value: project.sectorLabel },
    { label: "Location", value: project.location },
    { label: "Client", value: project.client },
    { label: "Completed", value: project.completedYear?.toString() ?? null },
  ].filter((f) => Boolean(f.value));

  return (
    <div className="overflow-x-clip bg-cream text-[#111820]">
      <SiteHeader solid />
      <main>
        {/* Intro band */}
        <section className="box-border bg-cream px-[6vw] pb-[clamp(28px,3vw,44px)] pt-[clamp(148px,12vw,180px)]">
          <FwReveal className="mb-3.5 flex items-center gap-3">
            <Link
              href="/projects"
              className="text-xs font-bold tracking-[0.28em] text-brand no-underline hover:underline"
            >
              PROJECTS
            </Link>
            <span className="block h-0.5 w-7 bg-brand" />
            <span className="text-xs font-bold tracking-[0.28em] text-[#181A20]/40">
              {project.sectorLabel.toUpperCase()}
            </span>
          </FwReveal>

          <div className="flex flex-wrap items-end justify-between gap-6 sm:gap-8">
            <div className="min-w-0 max-w-[900px]">
              <MaskedHeading
                as="h1"
                className="m-0 break-words font-display uppercase leading-[1.02] text-[#111820] sm:leading-[0.94]"
                style={{ fontSize: "clamp(30px,5.2vw,84px)" }}
                lines={[project.title]}
              />
            </div>
            <FwReveal
              as="p"
              className="m-0 max-w-[380px] leading-[1.7] text-[#181A20]/[0.62]"
              style={{ fontSize: "clamp(15px,1.4vw,18px)" }}
            >
              {project.description}
            </FwReveal>
          </div>

          {facts.length > 0 && (
            <FwReveal
              className="mt-[clamp(28px,3vw,44px)] grid grid-cols-2 gap-x-8 gap-y-5 border-t pt-5 sm:flex sm:flex-wrap sm:gap-x-12"
              style={{ borderColor: "rgba(24,26,32,0.12)" }}
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <p className="m-0 mb-1 text-[10px] font-bold tracking-[0.22em] text-[#181A20]/40">
                    {fact.label.toUpperCase()}
                  </p>
                  <p className="m-0 font-display text-[clamp(16px,1.6vw,22px)] uppercase leading-none text-[#111820]">
                    {fact.value}
                  </p>
                </div>
              ))}
            </FwReveal>
          )}
        </section>

        {/* Cover */}
        {project.cover && (
          <section className="box-border px-[6vw] pb-[clamp(28px,3vw,44px)]">
            <FwReveal className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#DCD3BE]">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                priority
                sizes="88vw"
                className="object-cover"
              />
            </FwReveal>
          </section>
        )}

        {/* What we built + long copy */}
        <section className="box-border px-[6vw] pb-[clamp(36px,4vw,60px)]">
          {project.works.length > 0 && (
            <FwReveal className="mb-[clamp(24px,3vw,40px)]">
              <p className="m-0 mb-3 text-[10px] font-bold tracking-[0.22em] text-[#181A20]/40">
                WHAT WE BUILT HERE
              </p>
              <div className="flex flex-wrap gap-2">
                {project.works.map((work) => (
                  <span
                    key={work.id}
                    className="rounded-full bg-[rgba(0,104,127,0.08)] px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] text-brand"
                  >
                    {work.title.toUpperCase()}
                  </span>
                ))}
              </div>
            </FwReveal>
          )}

          {project.broadDescription && (
            <FwReveal
              as="p"
              className="m-0 max-w-[760px] leading-[1.8] text-[#181A20]/[0.72]"
              style={{ fontSize: "clamp(15px,1.4vw,18px)" }}
            >
              {project.broadDescription}
            </FwReveal>
          )}
        </section>

        {/* Photo mosaic */}
        <section className="box-border bg-cream px-[6vw] pb-[clamp(56px,7vw,96px)]">
          <FwReveal className="mb-[clamp(18px,2vw,28px)] flex items-baseline gap-3.5">
            <span className="block h-0.5 w-7 flex-none bg-brand" />
            <h2
              className="m-0 font-display uppercase leading-none text-[#111820]"
              style={{ fontSize: "clamp(20px,2.2vw,34px)" }}
            >
              On site
            </h2>
            <span className="font-mono text-[11px] tracking-[0.18em] text-[#181A20]/40">
              {String(project.photos.length).padStart(2, "0")}
            </span>
          </FwReveal>

          <ProjectGallery photos={project.photos} works={project.works} />
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="box-border border-t px-[6vw] py-[clamp(48px,6vw,84px)]" style={{ borderColor: "rgba(24,26,32,0.1)" }}>
            <FwReveal className="mb-[clamp(18px,2vw,28px)] flex items-baseline gap-3.5">
              <span className="block h-0.5 w-7 flex-none bg-brand" />
              <h2
                className="m-0 font-display uppercase leading-none text-[#111820]"
                style={{ fontSize: "clamp(20px,2.2vw,34px)" }}
              >
                More projects
              </h2>
            </FwReveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <FwReveal
                  key={other.id}
                  className="group/card overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(24,26,32,0.09)]"
                  style={{ border: "1px solid rgba(24,26,32,0.08)" }}
                >
                  <Link
                    href={`/projects/${other.id}`}
                    className="flex h-full flex-col no-underline"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#DCD3BE]">
                      {other.cover && (
                        <Image
                          src={other.cover}
                          alt={other.coverAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 p-4">
                      <h3
                        className="m-0 font-display uppercase leading-[1.12] text-[#111820]"
                        style={{ fontSize: "clamp(16px,1.4vw,20px)" }}
                      >
                        {other.title}
                      </h3>
                      <p className="m-0 font-mono text-[11px] tracking-[0.14em] text-[#181A20]/40">
                        {other.sectorLabel.toUpperCase()}
                      </p>
                    </div>
                  </Link>
                </FwReveal>
              ))}
            </div>
          </section>
        )}

        {/* CTA banner */}
        <section className="box-border bg-brand px-[6vw] py-[clamp(60px,8vw,100px)] text-center text-cream">
          <FwReveal>
            <h3
              className="m-0 mb-4 font-display uppercase leading-[1.1]"
              style={{ fontSize: "clamp(32px,4vw,64px)" }}
            >
              Build one like it.
            </h3>
            <p className="mx-auto mb-7 max-w-[560px] text-base leading-[1.7] text-cream/[0.72]">
              Tell us the site and the sport — we&apos;ll come back with a
              surface, a seating plan and a number.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-[30px] py-4 text-[13px] font-bold tracking-[0.1em] text-brand no-underline transition-colors hover:bg-cream/90"
            >
              GET A FREE ESTIMATE <ArrowRightIcon size={14} color="00687F" />
            </Link>
          </FwReveal>
        </section>
      </main>
      <SiteFooter />
      <FloatingEstimate />
    </div>
  );
}
