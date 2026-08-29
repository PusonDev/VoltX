import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false, // Security: Hide X-Powered-By: Next.js
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Security: Prevent Clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Security: Prevent MIME type sniffing
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Privacy: Protect referrer data
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()", // Security: Disable sensitive browser features
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
