export type PersonalityType = 'burnout' | 'buffet' | 'sale' | 'deadline' | 'finalboss' | 'lucky';

export type Rarity = 'Common' | 'Rare' | 'Super Rare' | 'Legendary' | 'Mythic';

export interface ScoreMap {
  burnout: number;
  buffet: number;
  sale: number;
  deadline: number;
  finalboss: number;
  lucky: number;
}

export interface Option {
  text: string;
  scores: Partial<ScoreMap>;
}

export interface Question {
  id: number;
  introStory: string;
  question: string;
  options: Option[];
}

export interface BlobResult {
  id: PersonalityType;
  name: string;
  subtitle: string;
  description: string;
  rarity: Rarity;
  badgeColor: string;
  gradientFrom: string;
  gradientTo: string;
  emoji: string;
  traits: string[];
  shareText: string;
}
