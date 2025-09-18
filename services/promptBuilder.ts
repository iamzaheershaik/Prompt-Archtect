import { PromptState, OutputFormat } from '../types';

const toPascalCase = (str: string) => str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s/g, '');

const getDesignDrivenDescription = (key: keyof Omit<PromptState, 'subject'>, value: string): string => {
  const descriptions: Record<keyof Omit<PromptState, 'subject'>, Record<string, string>> = {
    shotType: {
      'establishing shot': "This is an establishing shot, designed to introduce the environment and set the overall tone.",
      'character introduction': "The shot serves as a character introduction, focusing on elements that reveal their personality or current state.",
      'dramatic reveal': "A dramatic reveal is central to the shot, uncovering a key element that shifts the narrative.",
      'action sequence': "The focus is on an action sequence, capturing dynamic movement and creating a sense of energy and excitement.",
      'point of view shot (POV)': "The scene is framed from a character's point of view (POV) to immerse the audience in their direct experience.",
      'close-up on detail': "A close-up on a specific detail is used to highlight its symbolic or narrative importance."
    },
    composition: {
      'rule of thirds': "The scene is composed using the rule of thirds to create a visually balanced and engaging frame.",
      'centered composition': "A centered composition is used to direct all attention to the subject, conveying stability and importance.",
      'leading lines': "Leading lines within the environment guide the viewer's eye, creating depth and focusing on the key subject.",
      'negative space': "Significant negative space is employed to isolate the subject, evoking feelings of solitude or scale.",
      'symmetrical framing': "Symmetrical framing provides a sense of deliberate order and aesthetic harmony to the scene."
    },
    artStyle: {
        'Photorealistic CGI': "The visual medium is photorealistic CGI, aiming for a seamless blend with reality through advanced rendering like ray tracing and global illumination.",
        'Classic 2D Cel Animation': "The style is classic 2D cel animation, characterized by hand-drawn aesthetics, bold outlines, and flat color palettes reminiscent of traditional animated features.",
        'Stop-Motion Animation': "A tactile, stop-motion animation approach will be used, giving characters and the environment a tangible, handcrafted quality.",
        'Impressionistic Digital Painting': "The scene is rendered as an impressionistic digital painting, where visible brushstrokes and a focus on light and color create an expressive, artistic mood.",
        'Cyberpunk Glitch Art': "A disruptive cyberpunk glitch art style is employed, featuring digital artifacts, scan lines, and saturated neon colors to build a futuristic, dystopian atmosphere.",
        'Technical Blueprint Style': "The visuals adopt a clean, technical blueprint style, presenting the scene with monochrome precision, schematic details, and an analytical feel.",
    },
    cameraAngle: {
      'low-angle shot': "A low-angle shot makes the subject dominate the frame, imbuing them with power and presence.",
      'high-angle shot': "Shot from a high angle, the subject appears smaller and more vulnerable, giving the viewer a sense of dominance.",
      'eye-level shot': "An eye-level shot fosters a direct, intimate connection between the viewer and the subject.",
      'dutch angle': "The camera is set at a Dutch angle, tilting the horizon to create a palpable sense of unease and disorientation.",
      "bird's eye view": "A bird's eye view offers an omniscient, top-down perspective, detaching the viewer and showing the larger context."
    },
    cameraLens: {
      'shallow depth of field': "A shallow depth of field beautifully isolates the subject, blurring the background into an artistic bokeh.",
      'deep depth of field': "With a deep depth of field, both the foreground and background remain sharp, grounding the subject in their environment.",
      'wide-angle lens look': "A wide-angle lens is used to exaggerate the scale of the environment and create a dynamic, immersive perspective.",
      '85mm portrait look': "The scene is captured with the classic look of an 85mm portrait lens, which flatters the subject and compresses the background.",
      'anamorphic lens flare': "Stylistic anamorphic lens flares streak across the frame, adding a classic, cinematic quality."
    },
    cameraMovement: {
      'static shot': "The camera remains static, creating a calm, observational tableau.",
      'slow push-in': "A slow push-in on the subject gradually builds tension and focuses the viewer's attention on their emotional state.",
      'dolly zoom': "The disorienting effect of a dolly zoom signals a moment of dramatic realization or internal turmoil.",
      'tracking shot': "A kinetic tracking shot follows the subject's movement, immersing the audience directly in the action.",
      'crane shot': "A sweeping crane shot reveals the scale of the location or follows action vertically for a dramatic effect."
    },
    lightingStyle: {
      'three-point lighting': "Classic three-point lighting is used to perfectly model the subject, giving them dimension and separating them from the background.",
      'chiaroscuro lighting': "Chiaroscuro lighting sculpts the scene with dramatic high-contrast shadows, evoking a mood of mystery.",
      'Rembrandt lighting': "Rembrandt lighting is employed to create a dramatic and intimate portrait, with a characteristic triangle of light on the shadowed cheek.",
      'backlight': "The subject is backlit, creating a brilliant rim of light that separates them from the background or throws them into silhouette.",
      'volumetric lighting': "Beams of volumetric light cut through the atmosphere, adding texture, depth, and a sense of magic.",
      'neon lighting': "Vibrant neon lighting saturates the scene, crafting a futuristic or moody urban aesthetic."
    },
    timeOfDay: {
      'mid-day': "The scene is set at mid-day, under the harsh, bright sun, creating strong contrasts and a sense of peak activity or exposure.",
      'golden hour': "The scene is bathed in the warm, diffused glow of golden hour, creating a nostalgic and serene atmosphere.",
      'blue hour': "Set during the blue hour, the ambient light is cool, soft, and even, lending a tranquil or somber mood.",
      'night': "The scene takes place at night, relying on moonlight or artificial sources to carve shapes out of the darkness and create suspense.",
      'dawn': "The setting is at dawn, with the first hint of cool morning light suggesting a new beginning or a moment of quiet solitude."
    },
    weather: {
      'clear sky': "A clear sky provides a clean, unobstructed backdrop, suggesting clarity, openness, or normalcy.",
      'overcast': "An overcast sky provides soft, diffused light, muting colors and creating a pensive, calm, or somber mood.",
      'light rain': "Light rain adds a layer of melancholy or renewal, with wet surfaces creating beautiful reflections.",
      'heavy thunderstorm': "A heavy thunderstorm rages, creating a dramatic and chaotic atmosphere filled with tension and energy.",
      'dense fog': "The scene is shrouded in dense fog, obscuring details and evoking a sense of mystery, isolation, or confusion.",
      'blowing snow': "Blowing snow fills the air, suggesting harsh, cold conditions and adding a dynamic, textural element to the scene."
    },
    colorGrade: {
      'Kodachrome-esque colors': "The image is graded to emulate the rich, saturated, and timeless look of Kodachrome film.",
      'teal and orange color grade': "A modern teal and orange color grade is applied, creating a dynamic and complementary color contrast.",
      'bleach-bypass look': "A gritty, high-contrast bleach-bypass effect is applied, desaturating the colors to enhance the raw intensity of the scene.",
      'monochrome': "The scene is rendered in stark monochrome, emphasizing texture, form, and emotion over color.",
      'desaturated pastel colors': "A palette of desaturated pastel colors gives the scene a soft, dreamlike, and gentle quality."
    },
    renderStyle: {
        'hyperrealistic': "The final render will be hyperrealistic, with meticulous attention to detail, physically accurate materials, and lifelike lighting.",
        'stylized': "A stylized render is chosen, where reality is artistically distorted to emphasize mood and character over photorealism.",
        'painterly': "The image has a painterly quality, with visible brushwork and a rich, textured feel that mimics traditional painting.",
        'cel-shaded': "Cel-shaded rendering gives the scene a graphic, animated look, similar to 2D comics or traditional animation.",
        'VFX composite': "The shot is designed as a VFX composite, intended to seamlessly integrate generated elements into a realistic final frame."
    },
    filmStock: {
        'Modern Digital': "The image has the crisp, clean characteristics of a modern digital cinema camera.",
        'Kodak Vision3': "The aesthetic mimics Kodak Vision3 film stock, with rich colors and a pleasing organic grain.",
        'Fuji Eterna': "The look is inspired by Fuji Eterna film, known for its muted, cinematic tones and soft contrast.",
        '16mm Film Grain': "A heavy 16mm film grain is applied, giving the shot a raw, documentary-style texture.",
        'Technicolor': "The scene is saturated with the vibrant, dream-like colors of classic Technicolor films."
    },
    postProcessingEffects: {
        'none': "The image is clean, with no additional post-processing effects applied.",
        'Lens Dust & Scratches': "Subtle lens dust and scratches are added to create a more grounded, imperfect, and realistic final image.",
        'Bloom & Glow': "A soft bloom effect is applied to the highlights, creating a dreamy and ethereal atmosphere.",
        'Chromatic Aberration': "Slight chromatic aberration is introduced at the edges of the frame to mimic the look of a vintage or anamorphic lens.",
        'Vignette': "A gentle vignette is added to darken the corners, subtly drawing the viewer's focus to the center of the composition."
    }
  };
  return descriptions[key]?.[value] || value;
}


export const buildPrompt = (state: PromptState, format: OutputFormat): string => {
  const { subject, ...settings } = state;
  const data = { subject, settings };

  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2);
    
    case 'json-ld':
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        "artform": "AI Generative Prompt",
        "headline": subject,
        "abstract": "A structured prompt for generating AI visual media.",
        "characterAttribute": {
          "@type": "Thing",
          "name": "Cinematic Properties",
          ...Object.entries(settings).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
        }
      };
      return JSON.stringify(jsonLd, null, 2);

    case 'xml':
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<Prompt>\n`;
      xml += `  <Subject>${subject}</Subject>\n`;
      xml += `  <Settings>\n`;
      for (const [key, value] of Object.entries(settings)) {
        xml += `    <${toPascalCase(key)}>${value}</${toPascalCase(key)}>\n`;
      }
      xml += `  </Settings>\n`;
      xml += `</Prompt>`;
      return xml;

    case 'yaml':
      let yaml = `subject: ${subject}\n`;
      yaml += `settings:\n`;
      for (const [key, value] of Object.entries(settings)) {
        yaml += `  ${key}: ${value}\n`;
      }
      return yaml;
    
    case 'design-driven':
      let designDriven = `${subject}.\n\n`;
      designDriven += "The creative and technical direction for this shot is as follows:\n";
      const { artStyle, ...otherSettings} = settings;
      const allSettings = { ...settings };
      const orderedKeys: (keyof typeof allSettings)[] = [
        'shotType', 'artStyle', 'composition', 'cameraAngle', 'cameraLens', 
        'cameraMovement', 'lightingStyle', 'timeOfDay', 'weather', 'colorGrade', 
        'renderStyle', 'filmStock', 'postProcessingEffects'
      ];

      for (const key of orderedKeys) {
          if (allSettings[key]) {
             designDriven += `- ${getDesignDrivenDescription(key, allSettings[key])}\n`;
          }
      }
      return designDriven;

    case 'default':
    default:
      const { artStyle: defaultArtStyle, subject: defaultSubject, ...defaultOtherSettings } = state;
      const parts = [defaultArtStyle, defaultSubject, ...Object.values(defaultOtherSettings)];
      return parts.filter(p => p).join(', ');
  }
};