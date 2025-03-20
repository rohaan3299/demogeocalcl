export type SoilType = 'clay' | 'sand' | 'silt' | 'rock' | 'gravel' | 'peat';

export type FoundationType = 
  | 'shallow_spread' 
  | 'shallow_raft' 
  | 'deep_piles' 
  | 'deep_caisson' 
  | 'micropiles'
  | 'sheet_piles';

export interface ProjectData {
  projectName: string;
  excavationVolume: number;
  foundationVolume: number;
  transportDistance: number;
  soilType: SoilType;
  foundationType: FoundationType;
  date: string;
}

export interface EmissionResults {
  excavation: number;
  foundation: number;
  transport: number;
  total: number;
  carbonIntensity: number;
  recommendations: string[];
  savings: {
    potential: number;
    methods: string[];
  };
}

export interface NavItem {
  name: string;
  icon: string;
  href: string;
}