import React from 'react';
import { PromptState } from '../types';
import CustomSelect from './CustomSelect';
import {
  SHOT_TYPE_OPTIONS,
  COMPOSITION_OPTIONS,
  ART_STYLE_OPTIONS,
  CAMERA_ANGLE_OPTIONS,
  CAMERA_LENS_OPTIONS,
  CAMERA_MOVEMENT_OPTIONS,
  LIGHTING_STYLE_OPTIONS,
  TIME_OF_DAY_OPTIONS,
  WEATHER_OPTIONS,
  COLOR_GRADE_OPTIONS,
  RENDER_STYLE_OPTIONS,
  FILM_STOCK_OPTIONS,
  POST_PROCESSING_EFFECTS_OPTIONS,
} from '../constants';
import { usePrompt } from '../contexts/PromptContext';

const ControlsPanel: React.FC = () => {
  const { 
    promptState, 
    setPromptState, 
    suggestCinematics: onSuggest, 
    isSuggesting, 
    suggestionError 
  } = usePrompt();
  
  const handleChange = (key: keyof Omit<PromptState, 'subject'>, value: string) => {
    setPromptState((prev) => ({ ...prev, [key]: value }));
  };

  const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <details className="bg-gray-900/50 border border-gray-700 rounded-lg group" open>
      <summary className="p-3 font-semibold text-gray-200 cursor-pointer list-none flex justify-between items-center group-hover:bg-gray-800/50 rounded-t-lg">
        {title}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </summary>
      <div className="p-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </details>
  );

  return (
    <div>
        <h2 className="text-xl font-bold text-cyan-400">2. Engineer the Context</h2>
        <p className="text-sm text-gray-400 mt-1">Select cinematic elements manually, or use the AI Director to make expert choices for you.</p>

        <div className="my-4">
            <button
                onClick={onSuggest}
                disabled={isSuggesting}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
            >
                {isSuggesting ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>AI Director is thinking...</span>
                </>
                ) : (
                <span>AI Autopilot</span>
                )}
            </button>
            {suggestionError && <p className="text-red-400 text-sm mt-2 text-center">{suggestionError}</p>}
        </div>

        <div className="space-y-4">
            <Section title="Shot & Composition">
                <CustomSelect label="Shot Type" value={promptState.shotType} onChange={(e) => handleChange('shotType', e.target.value)} options={SHOT_TYPE_OPTIONS} />
                <CustomSelect label="Composition" value={promptState.composition} onChange={(e) => handleChange('composition', e.target.value)} options={COMPOSITION_OPTIONS} />
            </Section>
            
            <Section title="Camera & Lens">
                <CustomSelect label="Camera Angle" value={promptState.cameraAngle} onChange={(e) => handleChange('cameraAngle', e.target.value)} options={CAMERA_ANGLE_OPTIONS} />
                <CustomSelect label="Camera Lens" value={promptState.cameraLens} onChange={(e) => handleChange('cameraLens', e.target.value)} options={CAMERA_LENS_OPTIONS} />
                <CustomSelect label="Camera Movement" value={promptState.cameraMovement} onChange={(e) => handleChange('cameraMovement', e.target.value)} options={CAMERA_MOVEMENT_OPTIONS} />
            </Section>

            <Section title="Lighting & Environment">
                <CustomSelect label="Lighting Style" value={promptState.lightingStyle} onChange={(e) => handleChange('lightingStyle', e.target.value)} options={LIGHTING_STYLE_OPTIONS} />
                <CustomSelect label="Time of Day" value={promptState.timeOfDay} onChange={(e) => handleChange('timeOfDay', e.target.value)} options={TIME_OF_DAY_OPTIONS} />
                <CustomSelect label="Weather" value={promptState.weather} onChange={(e) => handleChange('weather', e.target.value)} options={WEATHER_OPTIONS} />
            </Section>
            
            <Section title="Style & Render">
                <CustomSelect label="Art Style / Medium" value={promptState.artStyle} onChange={(e) => handleChange('artStyle', e.target.value)} options={ART_STYLE_OPTIONS} />
                <CustomSelect label="Render Style" value={promptState.renderStyle} onChange={(e) => handleChange('renderStyle', e.target.value)} options={RENDER_STYLE_OPTIONS} />
                <CustomSelect label="Color Grade" value={promptState.colorGrade} onChange={(e) => handleChange('colorGrade', e.target.value)} options={COLOR_GRADE_OPTIONS} />
                <CustomSelect label="Film Stock" value={promptState.filmStock} onChange={(e) => handleChange('filmStock', e.target.value)} options={FILM_STOCK_OPTIONS} />
                <CustomSelect label="Post-Processing" value={promptState.postProcessingEffects} onChange={(e) => handleChange('postProcessingEffects', e.target.value)} options={POST_PROCESSING_EFFECTS_OPTIONS} />
            </Section>
        </div>
    </div>
  );
};

export default ControlsPanel;
