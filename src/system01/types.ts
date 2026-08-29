export type LayerId =
  | 'DATA' | 'MODELS' | 'RETRIEVAL' | 'REASONING'
  | 'TOOLS' | 'SECURITY' | 'INTERFACES' | 'EVALUATION';

export interface SystemComponent {
  id: string;
  layer: LayerId;
  originalPosition: [number, number, number];
  originalRotation: [number, number, number];
  originalScale: [number, number, number];
  explodedPosition: [number, number, number];
  explodedRotation: [number, number, number];
  explodedScale: [number, number, number];
  renderMode: 'instanced' | 'hero';
}

export interface ProjectAssembly {
  slug: string;              // must match the id in src/data/projects.ts
  name: string;
  featured: boolean;         // filter for which projects get 3D treatment
  layerAffinity: LayerId[];
  visualMetaphor: string;    // visual map metaphor
}

export interface EvidenceMetric {
  id: string;
  label: string;
  value: string | number;
  verifiedBy?: string;       // what verified this
  sourceUrl?: string;        // link a visitor can click through
}
