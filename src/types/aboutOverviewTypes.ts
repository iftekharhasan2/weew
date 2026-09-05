export interface AboutNavMenuItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  children?: AboutNavMenuItem[];
}

export interface NewsPost {
  id: string;
  title: string;
  date: string;
  author: string;
  commentsCount: number;
  excerpt: string;
  content: string;
  categories: string[];
  imageUrl?: string;
  imageAlt?: string;
}

export interface ValueAccordionItem {
  id: string;
  title: string;
  iconName: 'people' | 'innovation' | 'integrity' | 'flourish' | 'diversity';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  width: number;
  height: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  expertise: string[];
  imageUrl: string;
}

export type AboutTeamMember = TeamMember;
export type NavMenuItem = AboutNavMenuItem;
