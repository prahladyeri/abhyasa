import fs from 'fs';
const res = await fetch("https://prahladyeri.github.io/open-quiz-commons/index.json");
const AppData = await res.json();

const BASE_URL = 'https://abhyasa.pages.dev';

function generateSitemap() {
    let urls = [
        { loc: '/', priority: '1.0' },
        { loc: '/about', priority: '0.5' }
    ];

    // Map through your topics and modules
    AppData.subjects.forEach(topic => {
        // Add Topic Main View
        urls.push({ loc: `/quiz/${topic.slug}/main`, priority: '0.8' });

        // Add Subtopics
        if (topic.subtopics) {
            topic.subtopics.forEach(st => {
                urls.push({ loc: `/quiz/${topic.slug}/${st.slug}`, priority: '0.7' });
                
                // Add individual Modules within subtopics
                st.modules.forEach(mod => {
                    urls.push({ loc: `/play/${topic.slug}/${st.slug}/${mod.slug}`, priority: '0.6' });
                });
            });
        }

        // Add Modules directly under main topic
        if (topic.modules) {
            topic.modules.forEach(mod => {
                urls.push({ loc: `/play/${topic.slug}/main/${mod.slug}`, priority: '0.6' });
            });
        }
    });

    // Build the XML string
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync('./public/sitemap.xml', xml);
    console.log('✅ sitemap.xml generated in /public');
}

generateSitemap();