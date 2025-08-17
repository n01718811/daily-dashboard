function googleNewsRss(q) {
  if (q && q.trim()) {
    return `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-CA&gl=CA&ceid=CA:en`;
  }
  return `https://news.google.com/rss?hl=en-CA&gl=CA&ceid=CA:en`;
}

export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").trim();
    const rss = googleNewsRss(q);
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;

    const r = await fetch(url, { cache: "no-store" });
    const j = await r.json();

    if (!r.ok || !j?.items) {
    
      return res.status(200).json({
        items: [
          {
            title: "Fallback: Canada tech news",
            source: { name: "Demo Source" },
            url: "https://example.com",
            description: "Demo article while RSS is unavailable."
          }
        ]
      });
    }
    const items = j.items.map((it) => ({
      title: it.title,
      source: { name: (it.author || j.feed?.title || "Google News").toString() },
      url: it.link,
      description: it.description?.replace(/<[^>]*>/g, "").slice(0, 200) || ""
    }));

    return res.status(200).json({ items });
  } catch (e) {
    return res.status(200).json({
      items: [
        {
          title: "Fallback: News unavailable",
          source: { name: "System" },
          url: "https://news.google.com/",
          description: "Showing fallback while fetching live news."
        }
      ]
    });
  }
}
