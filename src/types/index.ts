export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  details: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  industry: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  imageUrl: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  iconName: string;
  description: string;
  duration: string;
}

export interface MetricCard {
  value: string;
  label: string;
  iconName: string;
}

export interface TechCategory {
  name: string;
  items: string[];
}
