import { GoogleGenAI, Type, Modality } from "@google/genai";
import { PromptState, OptimizerOutput } from "../types";
import { 
    LARAS_PROMPT_REMIX_TEMPLATE, 
    RYZEN_PLENDER_PROMPT_TEMPLATE, 
    PANTHFX_PROMPT_TEMPLATE,
    CGI_ADS_PROMPT_TEMPLATE,
    LARAS_ORIGINAL_PROMPT_TEMPLATE,
    OKAY_PROMPT_TEMPLATE,
    FILM_MAKING_PROMPT_TEMPLATE,
    PERCITY_PROMPT_TEMPLATE,
    AIRB_PROMPT_TEMPLATE,
    AIRB_2D_PROMPT_TEMPLATE,
    RETRO_3D_ICON_PROMPT_TEMPLATE,
    RETRO_2D_ICON_PROMPT_TEMPLATE,
    LOGO_PROMPT_TEMPLATE,
    LYRA_SYSTEM_PROMPT,
    AARDMAN_ANIMATIONS_TEMPLATE,
    LAIKA_TEMPLATE,
    CARTOON_SALOON_TEMPLATE,
    SONY_PICTURES_ANIMATION_TEMPLATE,
    FORTICHE_PRODUCTION_TEMPLATE,
    AARDMAN_VIDEO_TEMPLATE,
    LAIKA_VIDEO_TEMPLATE,
    CARTOON_SALOON_VIDEO_TEMPLATE,
    SONY_VIDEO_TEMPLATE,
    FORTICHE_VIDEO_TEMPLATE,
    TRANSFORM_TEMPLATE,
    VFX_SHOT_TEMPLATE,
} from "../constants";
import { wrapUserPrompt } from '../utils/security';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to convert base64 to GenerativePart
const fileToGenerativePart = (dataURI: string) => {
    const [header, base64] = dataURI.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1];
    if (!mimeType || !base64) {
        // Gracefully handle potential errors without crashing
        console.error("Invalid data URI for image conversion.");
        return null;
    }
    return {
        inlineData: {
            mimeType,
            data: base64,
        },
    };
};

const dataUriToVideoImage = (dataURI: string) => {
    const [header, base64] = dataURI.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1];
    if (!mimeType || !base64) {
        console.error("Invalid data URI for video image conversion.");
        return null;
    }
    return {
        imageBytes: base64,
        mimeType: mimeType,
    };
};

export const enhanceSubjectWithAI = async (subject: string, images: string[] = []): Promise<string> => {
    const parts: any[] = [];
    let instructionPrefix = `You are an expert in cinematic storytelling. `;
    
    const imageParts = images.map(fileToGenerativePart).filter(p => p !== null);

    if (imageParts.length > 0) {
        instructionPrefix += `Analyze the following simple subject AND the provided reference image(s). Synthesize them into a more vivid, detailed, and cinematic concept. `;
        parts.push(...imageParts);
    } else {
        instructionPrefix += `Take the following simple subject and enhance it into a more vivid, detailed, and cinematic concept. `;
    }
    instructionPrefix += `Make it high-concept and visually striking. Keep it to a single, powerful sentence.`;
    
    const prompt = wrapUserPrompt(subject, instructionPrefix);
    parts.unshift({ text: prompt });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts },
        config: {
            maxOutputTokens: 100,
            thinkingConfig: { thinkingBudget: 50 },
            temperature: 0.8,
        }
    });

    const enhancedSubject = response.text.trim();
    if (!enhancedSubject) {
        throw new Error("AI failed to generate an enhancement.");
    }
    return enhancedSubject;
};

export const getAIcinematicSuggestions = async (subject: string, images: string[] = []): Promise<Partial<PromptState>> => {
    const parts: any[] = [];
    let instructionPrefix = `As an expert Director of Photography, `;

    const imageParts = images.map(fileToGenerativePart).filter(p => p !== null);

    if (imageParts.length > 0) {
        instructionPrefix += `analyze the following subject AND reference image(s). Based on the combined context, mood, and style, choose the best cinematic options to bring the subject to life. Use the images as the primary inspiration. `;
        parts.push(...imageParts);
    } else {
        instructionPrefix += `analyze the following subject and choose the best cinematic options to bring it to life. `;
    }
    instructionPrefix += `Provide your response as a JSON object with keys for shotType, composition, artStyle, cameraAngle, cameraLens, cameraMovement, lightingStyle, timeOfDay, weather, colorGrade, renderStyle, filmStock, and postProcessingEffects.`;
    
    const prompt = wrapUserPrompt(subject, instructionPrefix);
    parts.unshift({ text: prompt });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    shotType: { type: Type.STRING },
                    composition: { type: Type.STRING },
                    artStyle: { type: Type.STRING },
                    cameraAngle: { type: Type.STRING },
                    cameraLens: { type: Type.STRING },
                    cameraMovement: { type: Type.STRING },
                    lightingStyle: { type: Type.STRING },
                    timeOfDay: { type: Type.STRING },
                    weather: { type: Type.STRING },
                    colorGrade: { type: Type.STRING },
                    renderStyle: { type: Type.STRING },
                    filmStock: { type: Type.STRING },
                    postProcessingEffects: { type: Type.STRING },
                },
            },
        },
    });

    try {
        const jsonString = response.text.trim();
        const suggestions = JSON.parse(jsonString);
        return suggestions;
    } catch (e) {
        console.error("Failed to parse AI suggestions:", e);
        throw new Error("AI returned an invalid response format.");
    }
};

export const generateImageWithAI = async (prompt: string, aspectRatio: string, model: 'imagen-4.0-generate-001' | 'gemini-2.5-flash-image-preview'): Promise<string[]> => {
    if (model === 'imagen-4.0-generate-001') {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16" | "4:3" | "3:2",
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
        }
    } else { // gemini-2.5-flash-image-preview
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        const images: string[] = [];
        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    images.push(`data:image/png;base64,${base64ImageBytes}`);
                }
            }
        }
        return images;
    }
    
    return [];
};

export const generateVideoWithAI = async (prompt: string, image?: string): Promise<any> => {
    const imagePart = image ? dataUriToVideoImage(image) : undefined;
    
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      ...(imagePart && { image: imagePart }),
      config: {
        numberOfVideos: 1,
      }
    });
    return operation;
};

export const checkVideoOperationStatus = async (operation: any): Promise<any> => {
    return await ai.operations.getVideosOperation({ operation: operation });
}

export const optimizePromptWithLyra = async (prompt: string, targetAi: string, style: string): Promise<OptimizerOutput> => {
    const userRequest = `User Request: Optimize for "${targetAi}" with style "${style}" — ${prompt}`;
    const fullPrompt = `${LYRA_SYSTEM_PROMPT}\n\n${userRequest}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            temperature: 0.5,
        }
    });

    const responseText = response.text.trim();

    // Helper to extract content based on an HTML tag/header
    const extractContent = (header: string, text: string): string | undefined => {
        const regex = new RegExp(`<h4>${header}:</h4>\\s*([\\s\\S]*?)(?=\\s*<h4>|$)`, 'i');
        let match = text.match(regex);
        
        if (header === "Your Optimized Prompt") {
             const preRegex = new RegExp(`<h4>Your Optimized Prompt:</h4>\\s*<pre><code>([\\s\\S]*?)</code></pre>`, 'i');
             match = text.match(preRegex);
        }

        return match?.[1].trim();
    };
    
    const output: OptimizerOutput = {
        optimizedPrompt: extractContent('Your Optimized Prompt', responseText) || 'Could not extract optimized prompt.',
        whatChanged: extractContent('What Changed', responseText),
        keyImprovements: extractContent('Key Improvements', responseText),
        techniquesApplied: extractContent('Techniques Applied', responseText),
        proTip: extractContent('Pro Tip', responseText),
    };

    return output;
};

// Generic Template filler for all template types
const generatePromptFromTemplate = async (subject: string, template: string, images: string[] = []): Promise<string> => {
    const parts: any[] = [];
    let instructionPrefix = `You are an expert AI prompt architect. `;
    const imageParts = images.map(fileToGenerativePart).filter(p => p !== null);

    if (imageParts.length > 0) {
        instructionPrefix += `Based on the user's subject AND the provided reference images, fill out the following JSON structure. Use the images as strong inspiration for mood, color, composition, and style. `;
        parts.push(...imageParts);
    } else {
        instructionPrefix += `Based on the user's subject, fill out the following JSON structure. `;
    }
    instructionPrefix += `Replace all placeholders in brackets [LIKE_THIS] or like '{{e.g., ...}}' with specific, detailed, and creative descriptions that fit the user's subject. The final output must be a valid JSON object without any markdown formatting.`;
    
    const finalPrompt = `${instructionPrefix}\n\nUser Subject: "${subject}"\n\nTemplate:\n${template}`;
    parts.unshift({ text: finalPrompt });

    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: { parts } });
    return response.text.replace(/```(json)?/g, '').trim();
};


// --- VIDEO TEMPLATE SERVICES ---
export const generateAardmanVideoPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, AARDMAN_VIDEO_TEMPLATE, i);
export const generateLaikaVideoPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, LAIKA_VIDEO_TEMPLATE, i);
export const generateCartoonSaloonVideoPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, CARTOON_SALOON_VIDEO_TEMPLATE, i);
export const generateSonyVideoPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, SONY_VIDEO_TEMPLATE, i);
export const generateForticheVideoPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, FORTICHE_VIDEO_TEMPLATE, i);
export const generateTransformPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, TRANSFORM_TEMPLATE, i);
export const generateVfxShotPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, VFX_SHOT_TEMPLATE, i);


// --- IMAGE TEMPLATE SERVICES ---
export const generateAardmanPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, AARDMAN_ANIMATIONS_TEMPLATE, i);
export const generateLaikaPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, LAIKA_TEMPLATE, i);
export const generateCartoonSaloonPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, CARTOON_SALOON_TEMPLATE, i);
export const generateSonyPicturesAnimationPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, SONY_PICTURES_ANIMATION_TEMPLATE, i);
export const generateFortichePrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, FORTICHE_PRODUCTION_TEMPLATE, i);
export const generateAirb2dPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, AIRB_2D_PROMPT_TEMPLATE, i);


// --- CUSTOM TEMPLATE SERVICE ---
export const generateCustomPrompt = (s: string, t: string, i: string[]) => generatePromptFromTemplate(s, t, i);

// --- OTHER PROMPT SERVICES ---
export const generateLarasRemixPrompt = (subject: string, i: string[] = []) => {
    const finalPrompt = wrapUserPrompt(subject, LARAS_PROMPT_REMIX_TEMPLATE);
    return ai.models.generateContent({ model: 'gemini-2.5-flash', contents: finalPrompt }).then(res => res.text);
};

export const generateRyzenPlenderPrompt = (subject: string, i: string[] = []) => {
    const finalPrompt = wrapUserPrompt(subject, RYZEN_PLENDER_PROMPT_TEMPLATE);
    return ai.models.generateContent({ model: 'gemini-2.5-flash', contents: finalPrompt }).then(res => res.text);
};

export const generatePanthfxPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, PANTHFX_PROMPT_TEMPLATE, i);

export const generateCgiAdsPrompt = (s: string, i: string[]) => {
    // The subject is passed to generatePromptFromTemplate, which injects it correctly.
    // No need to manually add it to the template string here.
    return generatePromptFromTemplate(s, CGI_ADS_PROMPT_TEMPLATE, i);
}

export const generateLarasOriginalPrompt = (s: string, i: string[] = []) => {
    const finalPrompt = wrapUserPrompt(s, LARAS_ORIGINAL_PROMPT_TEMPLATE);
    return ai.models.generateContent({ model: 'gemini-2.5-flash', contents: finalPrompt }).then(res => res.text);
};

export const generateOkayPrompt = (s: string, i: string[] = []) => {
    const finalPrompt = OKAY_PROMPT_TEMPLATE.replace('{user_idea}', s);
    return ai.models.generateContent({ model: 'gemini-2.5-flash', contents: finalPrompt }).then(res => res.text);
};

export const generateFilmMakingPrompt = (s: string, i: string[] = []) => {
    const finalPrompt = FILM_MAKING_PROMPT_TEMPLATE.replace('{user_concept}', s);
    return ai.models.generateContent({ model: 'gemini-2.5-flash', contents: finalPrompt }).then(res => res.text);
};

export const generatePerCityPrompt = async (coreIdea: string, outputType: 'image' | 'video', outputFormat: string): Promise<string> => {
    const finalPrompt = `${PERCITY_PROMPT_TEMPLATE}\n\nNow, process the following request:\ncore_idea: "${coreIdea}"\ndesired_output_type: "${outputType}"\ndesired_output_format: "${outputFormat}"`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: finalPrompt });
    return response.text.replace(/```(json|xml|markdown)?/g, '').trim();
}

export const generateAirbPrompt = (s: string, i: string[]) => generatePromptFromTemplate(s, AIRB_PROMPT_TEMPLATE, i);

// These are simple string replacements, no AI call needed.
export const generateRetro3dIconPrompt = (subject: string): string => {
    return RETRO_3D_ICON_PROMPT_TEMPLATE.replace('"[your object here]"', `"${subject}"`);
};

export const generateRetro2dIconPrompt = (subject: string): string => {
    return RETRO_2D_ICON_PROMPT_TEMPLATE.replace('"[your object here]"', `"${subject}"`);
};


export const generateLogoPrompt = (s: string, logoStyle: string, i: string[] = []) => {
    const instruction = `You are an expert brand identity designer. Your task is to generate a detailed logo design prompt in JSON format. Based on the user's brand subject, the chosen logo style, and any provided reference images, fill out the following JSON structure. Use the images as strong inspiration for the logomark's concept and aesthetic. The final output must be a valid JSON object without any markdown formatting.`;

    const finalPrompt = `${instruction}\n\nUser Brand Subject: "${s}"\nDesired Logo Style: "${logoStyle}"\n\nTemplate:\n${LOGO_PROMPT_TEMPLATE}`;
    
    const parts: any[] = [];
    const imageParts = i.map(fileToGenerativePart).filter(p => p !== null);

    if (imageParts.length > 0) {
        parts.push(...imageParts);
    }
    parts.unshift({ text: finalPrompt });

    return ai.models.generateContent({ 
        model: 'gemini-2.5-flash', 
        contents: { parts } 
    }).then(res => res.text.replace(/```(json)?/g, '').trim());
};