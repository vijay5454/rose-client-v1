import fs from "fs";
// const { SitemapStream, streamToPromise } = require("sitemap");
import { SitemapStream, streamToPromise } from "sitemap";

const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about-us", changefreq: "monthly", priority: 0.8 },
  { url: "/prayers", changefreq: "monthly", priority: 0.8 },
  // Add more routes here
];

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://www.rosacarmeliretreatcenter.com",
  });

  pages.forEach((page) => sitemap.write(page));
  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);
  fs.writeFileSync("./public/sitemap.xml", sitemapBuffer.toString());
}

generateSitemap()
  .then(() => console.log("Sitemap generated!"))
  .catch((err) => console.error(err));
