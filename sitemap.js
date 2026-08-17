export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://shashwatholistic.com'
  const now = new Date()
  const paths = ['', '#about', '#services', '#conditions', '#why-us', '#benefits', '#home-visit', '#testimonials', '#gallery', '#faq', '#contact', '#book']
  return paths.map((p) => ({ url: `${base}/${p}`, lastModified: now, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 }))
}
