import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

const baseUrl = 'https://ayush.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/about', '/contact'];
  const pages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date()
  }));

  return [...pages, ...projectPages];
}
