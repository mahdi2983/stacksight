export type Category = 
  | 'All' 
  | 'SaaS' 
  | 'Portfolio' 
  | 'E-Commerce' 
  | 'Agency' 
  | 'Editorial' 
  | 'AI / Tech'
  | 'Mobile App';

export type TechStack = 
  | 'Next.js' 
  | 'GSAP' 
  | 'Tailwind CSS' 
  | 'WebGL' 
  | 'Three.js' 
  | 'React' 
  | 'Framer Motion' 
  | 'TypeScript' 
  | 'Svelte' 
  | 'Vue.js'
  | 'Node.js'
  | 'Shadcn UI';

export type VisualStyle = 
  | 'Minimalist' 
  | 'Dark Tech' 
  | 'Glassmorphism' 
  | 'Industrial Brutalism' 
  | '3D / Interactive' 
  | 'Editorial Luxury' 
  | 'Fluid Kinetic';

export interface ExtractedColor {
  hex: string;
  name: string;
  type: 'Primary' | 'Secondary' | 'Accent' | 'Surface' | 'Background';
}

export interface MetricSpec {
  label: string;
  value: string;
}

export interface DesignItem {
  id: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  domain: string;
  category: Category;
  techStack: TechStack[];
  visualStyle: VisualStyle;
  thumbnail: string;
  gallery: string[];
  colorPalette: ExtractedColor[];
  metrics: MetricSpec[];
  description: string;
  visitUrl: string;
  likes: number;
  views: number;
  saved: boolean;
  featured: boolean;
  publishedAt: string;
  layoutSpan?: 'normal' | 'tall' | 'wide';
}

export interface FilterState {
  searchQuery: string;
  category: Category;
  techStack: TechStack | 'All';
  visualStyle: VisualStyle | 'All';
  sortBy: 'trending' | 'latest' | 'saved';
  viewMode: 'grid' | 'list';
  savedOnly: boolean;
}
