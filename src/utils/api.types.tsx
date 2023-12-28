interface OurEcosystemData {
  created_at: string;
  updated_at: string;
  id: 1;
  button_name_am: string;
  button_name_en: string;
  button_name_ru: string;
  description_am: string;
  description_en: string;
  description_ru: string;
  image: string;
  title_am: string;
  title_en: string;
  title_ru: string;
}

export interface HeaderTypes {
  id: number;
  created_at: string;
  description_am: string;
  description_ru: string;
  description_en: string;
  title_am: string;
  title_ru: string;
  title_en: string;
  updated_at: string;
}

export interface DataHypotheses {
  description_am: string;
  description_en: string;
  description_ru: string;
  name_am: string;
  name_en: string;
  name_ru: string;
}

interface MonthData {
  month: string;
  month_am: string;
  month_description: string;
  month_description_am: string;
  month_description_en: string;
  month_description_ru: string;
  month_en: string;
  month_ru: string;
}

export interface ProjectsTypes {
  budget_image: null;
  budget_name_am: null;
  budget_name_en: null;
  budget_name_ru: null;
  budget_price: null;
  collected_image: null;
  collected_name_am: null;
  collected_name_en: null;
  collected_name_ru: null;
  collected_price: null;
  created_at: string;
  description_am: string;
  description_en: string;
  description_ru: string;
  id: number;
  image: null;
  month: null;
  month_data: MonthData[];
  month_description: null;
  problem_description_am: string;
  problem_description_en: string;
  problem_description_ru: string;
  project_category_id: number;
  project_name_am: string;
  project_name_en: string;
  project_name_ru: string;
  project_status_id: number;
  remaining_image: null;
  remaining_name_am: null;
  remaining_name_en: null;
  remaining_name_ru: null;
  remaining_price: null;
  sector_am: string;
  sector_en: string;
  sector_ru: string;
  updated_at: string;
  user_id: number;
  worker_id: null;
}

export interface FollowUsTypes {
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
  whatsapp: string;
}

interface PartnersTypes {
  created_at: string;
  id: number;
  image: string;
  updated_at: string;
}

export interface HomeData {
  OurProjects: HeaderTypes[];
  ambassadors: OurEcosystemData[];
  club301: OurEcosystemData[];
  dataHypotheses: DataHypotheses[];
  experts: OurEcosystemData[];
  followUs: FollowUsTypes;
  foundationFriends: OurEcosystemData[];
  hypothesesForTheFuture: HeaderTypes[];
  landOfWisdom: HeaderTypes;
  news: HeaderTypes[];
  ourEcosystem: HeaderTypes[];
  ourMission: any;
  partners: any;
  projects: ProjectsTypes[];
  sages: OurEcosystemData[];
  whyImportant: HeaderTypes[];
  partnerInfo: any;
}

export interface PrivactPolicy {
  agreementTerms: HeaderTypes;
  clubCodeOfEthics: HeaderTypes;
  supportForms: HeaderTypes;
  termsOfService: HeaderTypes;
  privacyPolicy: HeaderTypes;
}
