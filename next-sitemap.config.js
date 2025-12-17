/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://marjantileco.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  alternateRefs: [
    { href: "https://marjantileco.com/en", hreflang: "en" },
    { href: "https://marjantileco.com/ar", hreflang: "ar" },
    { href: "https://marjantileco.com/ru", hreflang: "ru" },
    { href: "https://marjantileco.com/fa", hreflang: "fa" },
  ],

  exclude: [],

  additionalPaths: async (config) => {
    const locales = ["fa", "en", "ar", "ru"];
    const defaultLocale = "fa";

    const paths = [];

    for (const locale of locales) {
      const localePrefix = locale === defaultLocale ? "" : `/${locale}`;

      // Products
      const productsData = await fetch(
        `https://marjantileco.com/api/product/api/all-products/`,
        { headers: { "Accept-Language": locale } }
      ).then((res) => res.json());

      productsData.products?.forEach((p) => {
        paths.push({
          loc: `${localePrefix}/products/${p.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        });
      });

      const projectsData = await fetch(
        `https://marjantileco.com/api/app/project-list/`,
        { headers: { "Accept-Language": locale } }
      ).then((res) => res.json());

      projectsData.projects?.projects?.forEach((pr) => {
        paths.push({
          loc: `${localePrefix}/projects/${pr.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.7,
        });
      });

      const blogs = await fetch(
        "https://marjantileco.com/api/app/blog-slugs/",
        {
          headers: { "Accept-Language": locale },
        }
      ).then((res) => res.json());

      blogs?.slugs?.forEach((slug) => {
        paths.push({
          loc: `${localePrefix}/blogs/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: "daily",
          priority: 0.9,
        });
      });

      paths.push(
        {
          loc: `${localePrefix}/`,
          lastmod: new Date().toISOString(),
          priority: 1.0,
          changefreq: "daily",
        },
        {
          loc: `${localePrefix}/newsletter`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/aboutus`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/calculator`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/catalog`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/contactus`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/employment`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/faq`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/industrial`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/representationrequest`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/representatives`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/saved`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/suppliers`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "weekly",
        },
        {
          loc: `${localePrefix}/projects`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "daily",
        },
        {
          loc: `${localePrefix}/products`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "daily",
        },
        {
          loc: `${localePrefix}/blogs`,
          lastmod: new Date().toISOString(),
          priority: 0.6,
          changefreq: "daily",
        }
      );
    }

    return paths;
  },

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path.includes("/blogs/") ? "daily" : config.changefreq,
      priority: path === "/" || path.endsWith("/") ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
