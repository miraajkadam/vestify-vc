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
  // logoBase64?: string;
  imgBase64?: string;
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
