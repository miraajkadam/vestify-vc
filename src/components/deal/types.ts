export interface TokenMetrics {
  tge: string;
  tgeUnlock: number;
  price: string;
  round: string;
  fdv: string;
}

export interface Projects {
  name: string;
  description: string;

  categories: string[];
  tokensReceived: string;
}

export interface TeamAndAdvisor {
  name: string;
  title: string;
  description: string;
  logoBase64?: string;
}

export interface Partners {
  name: string;
  logoBase64: string;
}

export interface ProjectSocials {
  medium?: string;
  discord?: string;
  x?: string;
  telegram?: string;
  youtube?: string;
  website?: string;
}

export interface Pools {
  address: string[];
  name: string;
  id: string;
}
[];

export interface PoolDetails {
  info: Info;
  investments: Investment[];
}

export interface Info {
  addresses: string[];
  projectsId: string;
  fee: string;
  maxAllocation: string;
  minAllocation: string;
  name: string;
}

export interface Investment {
  socials: Socials;
  investment: Investment2;
}

export interface Socials {
  x?: string;
  discord?: string;
  telegram?: string;
}

export interface Investment2 {
  amount: number;
}
