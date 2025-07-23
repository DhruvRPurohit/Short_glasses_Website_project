/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net", // ✅ For faker images
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // ✅ For GitHub avatars
        port: "",
        pathname: "**/*",
      },
    ],
  },
};

module.exports = nextConfig;
