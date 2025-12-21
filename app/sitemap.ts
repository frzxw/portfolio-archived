import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://frzxw.me'
    const currentDate = new Date()

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        // Add more pages as needed
        // Example:
        // {
        //   url: `${baseUrl}/about`,
        //   lastModified: currentDate,
        //   changeFrequency: 'monthly',
        //   priority: 0.8,
        // },
    ]
}
