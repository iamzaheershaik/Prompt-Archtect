import { ReactNode } from "react";

export interface PromptState {
  subject: string;
  shotType: string;
  artStyle: string;
  composition: string;
  cameraAngle: string;
  cameraLens: string;
  cameraMovement: string;
  lightingStyle: string;
  timeOfDay: string;
  weather: string;
  colorGrade: string;
  renderStyle: string;
  filmStock: string;
  postProcessingEffects: string;
}

export interface CinematicOption {
  value: string;
  label: string;
  description:string;
}

export type OutputFormat = 'default' | 'design-driven' | 'json' | 'yaml' | 'xml' | 'json-ld';

export interface OptimizerOutput {
  optimizedPrompt: string;
  whatChanged?: string;
  keyImprovements?: string;
  techniquesApplied?: string;
  proTip?: string;
}

export interface ImageHistoryItem {
  id: string;
  timestamp: number;
  type: 'image';
  imageDataUrl: string;
  prompt: string;
  settings: {
      aspectRatio: string;
      model: string;
  }
}

export interface VideoHistoryItem {
    id: string;
    timestamp: number;
    type: 'video';
    videoDataUrl: string;
    prompt: string;
    source: string;
}

export interface PromptHistoryItem {
  id: string;
  timestamp: number;
  type: 'prompt';
  prompt: string;
  subject: string; // The original subject used to generate the prompt
  source: string;
}

export type HistoryItem = ImageHistoryItem | PromptHistoryItem | VideoHistoryItem;

export interface CustomTemplate {
  id: string;
  name: string;
  content: string;
}

// Enum for type-safe template identifiers
export enum TemplateID {
  // Video - Stop Motion
  AardmanVideo = 'aardman-video',
  LaikaVideo = 'laika-video',
  // Video - Stylized
  CartoonSaloonVideo = 'cartoon-saloon-video',
  ForticheVideo = 'fortiche-video',
  SonyVideo = 'sony-video',
  // Video - Character & Scene
  Airb = 'airb',
  FilmMaking = 'film-making',
  LarasOriginal = 'laras-original',
  LarasPromptRemix = 'laras-prompt-remix',
  Panthfx = 'panthfx',
  // Video - Pro & Technical
  CgiAds = 'cgi-ads',
  OkayPrompt = 'okay-prompt',
  PerCity = 'percity',
  RyzenPlender = 'ryzen-plender',
  Transform = 'transform',
  VfxShot = 'vfx-shot',
  // Image - Stop Motion
  AardmanImage = 'aardman-image',
  LaikaImage = 'laika-image',
  // Image - Stylized
  CartoonSaloonImage = 'cartoon-saloon-image',
  SonyImage = 'sony-image',
  ForticheImage = 'fortiche-image',
  // Image - Graphic Design
  Airb2d = 'airb-2d',
  Logos = 'logos',
  Retro2d = 'retro-2d',
  Retro3d = 'retro-3d',
}

// Type for the strategy pattern in template panels
export type TemplateConfig = {
  [key in TemplateID]?: {
    name: string;
    placeholder: string;
    generate: (subject: string, images: string[]) => Promise<string> | string;
    // Optional field for templates with special UI controls
    renderAdditionalControls?: React.FC<any>; 
  }
}

export type PerCityConfig = {
  outputType: 'image' | 'video';
  outputFormat: string;
  generate: (subject: string, type: 'image' | 'video', format: string) => Promise<string>;
}

export type LogoConfig = {
  logoStyle: string;
  generate: (subject: string, style: string) => Promise<string>;
}

// Context Types
export interface PromptContextType {
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  optimizedSubject: string;
  promptState: PromptState;
  setPromptState: React.Dispatch<React.SetStateAction<PromptState>>;
  referenceImages: string[];
  setReferenceImages: React.Dispatch<React.SetStateAction<string[]>>;
  outputFormat: OutputFormat;
  setOutputFormat: React.Dispatch<React.SetStateAction<OutputFormat>>;
  generatedPrompt: string;
  isLoading: boolean;
  error: string | null;
  isSuggesting: boolean;
  suggestionError: string | null;
  enhanceSubject: () => Promise<void>;
  suggestCinematics: () => Promise<void>;
  reusePrompt: (promptSubject: string) => void;
}

export interface HistoryContextType {
  history: HistoryItem[];
  addItemToHistory: (item: Omit<ImageHistoryItem, 'id' | 'timestamp'> | Omit<PromptHistoryItem, 'id' | 'timestamp'> | Omit<VideoHistoryItem, 'id' | 'timestamp'>) => void;
  deleteHistoryItem: (id: string) => void;
}

export interface CustomTemplatesContextType {
  templates: CustomTemplate[];
  saveTemplate: (template: Omit<CustomTemplate, 'id'> & { id?: string }) => void;
  deleteTemplate: (id: string) => void;
}