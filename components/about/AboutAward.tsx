import Image from "next/image";
import { MaskedHeading, FwReveal } from "@/components/site/FwReveal";
import type { AboutAwardVM } from "@/lib/api/about";

/**
 * Recognition panel on the dark navy band — one award: an image beside a
 * heading and a short description, all authored in the CMS
 * (About page → "Award Section").
 */
export default function AboutAward({ award }: { award: AboutAwardVM }) {
  return (
    <section
