export interface PersonalSecurityChecklist {
  sections: Section[];
}

export type Sections = Section[];

export interface Section {
  title: string;
  slug: string;
  description: string;
  intro: string;
  icon: string;
  color: string;
  checklist: Checklist[];
  softwareLinks?: Link[];
  helpfulTools?: Link[];
  furtherResources?: Link[];
}

export type Priority = 'essential' | 'optional' | 'advanced';

export interface Checklist {
  /** Stable ID shared across languages (defaults to a slug of `point`) */
  id?: string;
  /** Item was added from the VHS course material (not in upstream checklist) */
  vhsOnly?: boolean;
  point: string;
  priority: Priority;
  details: string;
}

export interface Link {
  title: string;
  url: string;
  description?: string;
}
