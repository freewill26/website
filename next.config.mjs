/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Public assets uploaded through the service app (Supabase storage).
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        // YouTube poster stills for the Videos screen, when a CMS-uploaded
        // custom thumbnail isn't set.
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        // Placeholder hosts used by the service app's seed data.
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
