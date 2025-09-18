import { PromptState, CinematicOption } from "./types";

export const INITIAL_PROMPT_STATE: PromptState = {
  subject: '',
  shotType: 'establishing shot',
  artStyle: 'Photorealistic CGI',
  composition: 'rule of thirds',
  cameraAngle: 'eye-level shot',
  cameraLens: 'shallow depth of field',
  cameraMovement: 'static shot',
  lightingStyle: 'three-point lighting',
  timeOfDay: 'mid-day',
  weather: 'clear sky',
  colorGrade: 'Kodachrome-esque colors',
  renderStyle: 'hyperrealistic',
  filmStock: 'Modern Digital',
  postProcessingEffects: 'none',
};

export const SHOT_TYPE_OPTIONS: CinematicOption[] = [
    { value: 'establishing shot', label: 'Establishing Shot', description: 'A wide shot that sets the scene and establishes the context and location.' },
    { value: 'character introduction', label: 'Character Introduction', description: 'A shot that introduces a character, often highlighting their personality or key attributes.' },
    { value: 'dramatic reveal', label: 'Dramatic Reveal', description: 'A shot that uncovers a crucial piece of information, character, or plot point.' },
    { value: 'action sequence', label: 'Action Sequence', description: 'A shot designed to capture dynamic movement, combat, or high-energy events.' },
    { value: 'point of view shot (POV)', label: 'Point of View (POV)', description: 'The camera shows what the character is looking at, immersing the viewer in their perspective.' },
    { value: 'close-up on detail', label: 'Close-up on Detail', description: 'A tight shot that focuses on a small object or detail for symbolic or narrative importance.' },
];
  
export const COMPOSITION_OPTIONS: CinematicOption[] = [
  { value: 'rule of thirds', label: 'Rule of Thirds', description: 'The subject is placed at the intersection of imaginary gridlines for a balanced and natural look.' },
  { value: 'centered composition', label: 'Centered', description: 'The subject is placed directly in the center of the frame to draw immediate attention.' },
  { value: 'leading lines', label: 'Leading Lines', description: 'Uses natural lines in the environment to guide the viewer\'s eye to the subject.' },
  { value: 'negative space', label: 'Negative Space', description: 'Emphasizes an empty or uncluttered area around the subject to create a sense of scale or isolation.' },
  { value: 'symmetrical framing', label: 'Symmetrical', description: 'The frame is balanced with mirrored elements on either side, creating a sense of order and harmony.' },
];

export const ART_STYLE_OPTIONS: CinematicOption[] = [
    { value: 'Photorealistic CGI', label: 'Photorealistic CGI', description: 'Aims for maximum realism, mimicking a live-action film with advanced rendering techniques like ray tracing.' },
    { value: 'Classic 2D Cel Animation', label: '2D Cel Animation', description: 'Emulates traditional hand-drawn animation with bold outlines and flat colors.' },
    { value: 'Stop-Motion Animation', label: 'Stop-Motion', description: 'Creates a tangible, handcrafted look by simulating the frame-by-frame manipulation of physical objects.' },
    { value: 'Impressionistic Digital Painting', label: 'Digital Painting', description: 'Features visible brushstrokes and a focus on light and color to create an expressive, artistic mood.' },
    { value: 'Cyberpunk Glitch Art', label: 'Glitch Art', description: 'Uses digital artifacts, scan lines, and saturated neon colors for a futuristic, dystopian feel.' },
    { value: 'Technical Blueprint Style', label: 'Blueprint Style', description: 'A clean, schematic style with monochrome lines and precise details, resembling architectural or engineering drawings.' },
];

export const CAMERA_ANGLE_OPTIONS: CinematicOption[] = [
  { value: 'low-angle shot', label: 'Low-Angle', description: 'Shooting from below the subject to make them appear powerful and imposing.' },
  { value: 'high-angle shot', label: 'High-Angle', description: 'Shooting from above the subject to make them appear small or vulnerable.' },
  { value: 'eye-level shot', label: 'Eye-Level', description: 'A neutral shot that mimics natural human vision, fostering a sense of connection.' },
  { value: 'dutch angle', label: 'Dutch Angle', description: 'The camera is tilted to create a sense of unease, tension, or disorientation.' },
  { value: 'bird\'s eye view', label: 'Bird\'s-Eye View', description: 'An overhead shot that provides an omniscient perspective of the scene.' },
];

export const CAMERA_LENS_OPTIONS: CinematicOption[] = [
  { value: 'shallow depth of field', label: 'Shallow DoF', description: 'Blurs the background to isolate the subject, often creating a beautiful bokeh effect.' },
  { value: 'deep depth of field', label: 'Deep DoF', description: 'Keeps both the foreground and background in sharp focus, showing the subject within its environment.' },
  { value: 'wide-angle lens look', label: 'Wide-Angle', description: 'Exaggerates depth and scale, making the environment feel vast and immersive.' },
  { value: '85mm portrait look', label: '85mm Portrait', description: 'Flattens the perspective and provides a classic, flattering look for characters.' },
  { value: 'anamorphic lens flare', label: 'Anamorphic Flare', description: 'Adds horizontal, streaking lens flares for a classic, cinematic aesthetic.' },
];

export const CAMERA_MOVEMENT_OPTIONS: CinematicOption[] = [
  { value: 'static shot', label: 'Static', description: 'The camera is stationary, providing a stable and observational view.' },
  { value: 'slow push-in', label: 'Slow Push-In', description: 'The camera moves slowly toward the subject to build tension or focus on emotion.' },
  { value: 'dolly zoom', label: 'Dolly Zoom', description: 'The camera moves while the lens zooms, creating a disorienting effect.' },
  { value: 'tracking shot', label: 'Tracking Shot', description: 'The camera moves alongside the subject, keeping them in the frame.' },
  { value: 'crane shot', label: 'Crane Shot', description: 'The camera moves vertically on a crane to reveal the scale of the scene.' },
];

export const LIGHTING_STYLE_OPTIONS: CinematicOption[] = [
  { value: 'three-point lighting', label: 'Three-Point', description: 'A standard professional setup (key, fill, back light) for a well-lit, dimensional subject.' },
  { value: 'chiaroscuro lighting', label: 'Chiaroscuro', description: 'Uses high-contrast light and shadow to create a dramatic, mysterious mood.' },
  { value: 'Rembrandt lighting', label: 'Rembrandt', description: 'A classic portrait style characterized by a triangle of light on the shadowed cheek.' },
  { value: 'backlight', label: 'Backlight', description: 'The main light source is behind the subject, creating a silhouette or a bright rim of light.' },
  { value: 'volumetric lighting', label: 'Volumetric', description: 'Makes light beams visible as they travel through the atmosphere (e.g., fog, dust).' },
  { value: 'neon lighting', label: 'Neon', description: 'Uses bright, colorful neon signs or tubes as the primary light source for a futuristic or urban vibe.' },
];

export const TIME_OF_DAY_OPTIONS: CinematicOption[] = [
    { value: 'mid-day', label: 'Mid-Day', description: 'Bright, direct overhead sun that creates harsh shadows and high contrast.' },
    { value: 'golden hour', label: 'Golden Hour', description: 'The period shortly after sunrise or before sunset, known for its warm, soft, and flattering light.' },
    { value: 'blue hour', label: 'Blue Hour', description: 'The period just before sunrise or after sunset, when the light is cool, diffused, and serene.' },
    { value: 'night', label: 'Night', description: 'The scene is dark, relying on moonlight, starlight, or artificial light sources.' },
    { value: 'dawn', label: 'Dawn', description: 'The very beginning of the day, with cool, gentle light and a sense of quiet anticipation.' },
];
  
export const WEATHER_OPTIONS: CinematicOption[] = [
    { value: 'clear sky', label: 'Clear Sky', description: 'A bright, sunny day with no clouds, suggesting openness and clarity.' },
    { value: 'overcast', label: 'Overcast', description: 'The sky is covered with clouds, creating soft, diffused light and a pensive or somber mood.' },
    { value: 'light rain', label: 'Light Rain', description: 'Gentle rainfall that can create a melancholic, romantic, or cleansing atmosphere. Surfaces become reflective.' },
    { value: 'heavy thunderstorm', label: 'Thunderstorm', description: 'A dramatic storm with heavy rain, lightning, and thunder, creating tension and chaos.' },
    { value: 'dense fog', label: 'Dense Fog', description: 'Thick fog that obscures visibility, evoking mystery, confusion, or isolation.' },
    { value: 'blowing snow', label: 'Blowing Snow', description: 'Dynamic, windy conditions with snow, suggesting a harsh, cold, and challenging environment.' },
];

export const COLOR_GRADE_OPTIONS: CinematicOption[] = [
  { value: 'Kodachrome-esque colors', label: 'Kodachrome', description: 'Richly saturated with a nostalgic, timeless feel reminiscent of classic film stock.' },
  { value: 'teal and orange color grade', label: 'Teal & Orange', description: 'A modern, popular cinematic look that creates a strong complementary color contrast.' },
  { value: 'bleach-bypass look', label: 'Bleach Bypass', description: 'A gritty, high-contrast look with desaturated colors and deep blacks.' },
  { value: 'monochrome', label: 'Monochrome', description: 'Rendered in black and white to emphasize texture, form, and emotion.' },
  { value: 'desaturated pastel colors', label: 'Pastel', description: 'A soft, dreamlike palette with muted, gentle colors.' },
];

export const RENDER_STYLE_OPTIONS: CinematicOption[] = [
    { value: 'hyperrealistic', label: 'Hyperrealistic', description: 'Aims for photorealism with meticulous detail in textures, materials, and lighting.' },
    { value: 'stylized', label: 'Stylized', description: 'Intentionally non-realistic, using exaggerated forms, colors, and proportions for artistic effect.' },
    { value: 'painterly', label: 'Painterly', description: 'Mimics the look of a traditional painting, with visible brushstrokes and rich textures.' },
    { value: 'cel-shaded', label: 'Cel-Shaded', description: 'Creates a graphic, comic book-like appearance with flat colors and bold outlines.' },
    { value: 'VFX composite', label: 'VFX Composite', description: 'Designed to be seamlessly integrated with live-action footage or other rendered elements.' },
];

export const FILM_STOCK_OPTIONS: CinematicOption[] = [
  { value: 'Modern Digital', label: 'Modern Digital', description: 'Crisp, clean, and vibrant look of modern high-end digital cinema cameras.' },
  { value: 'Kodak Vision3', label: 'Kodak Vision3', description: 'Classic cinematic film look with rich colors, pleasant grain, and high dynamic range.' },
  { value: 'Fuji Eterna', label: 'Fuji Eterna', description: 'A more muted, cinematic look with soft contrast and desaturated tones, popular for dramas.' },
  { value: '16mm Film Grain', label: '16mm Film Grain', description: 'A raw, gritty look with noticeable film grain, often used for documentaries or indie films.' },
  { value: 'Technicolor', label: 'Technicolor', description: 'Extremely vibrant, saturated colors reminiscent of classic Hollywood epics.' },
];

export const POST_PROCESSING_EFFECTS_OPTIONS: CinematicOption[] = [
  { value: 'none', label: 'None', description: 'A clean image with no additional post-processing effects.' },
  { value: 'Lens Dust & Scratches', label: 'Lens Dust', description: 'Adds subtle imperfections to the virtual lens for a more organic, realistic feel.' },
  { value: 'Bloom & Glow', label: 'Bloom & Glow', description: 'Bright areas of the image bleed softly, creating a dreamy or ethereal atmosphere.' },
  { value: 'Chromatic Aberration', label: 'Chromatic Aberration', description: 'Adds subtle color fringing on high-contrast edges, mimicking real-world lens imperfections.' },
  { value: 'Vignette', label: 'Vignette', description: 'Darkens the corners of the frame to draw the viewer\'s eye to the center of the image.' },
];


export const ASPECT_RATIO_OPTIONS: CinematicOption[] = [
    { value: '1:1', label: 'Square (1:1)', description: 'A square aspect ratio, common for social media posts.' },
    { value: '16:9', label: 'Widescreen (16:9)', description: 'Standard widescreen format for video and modern displays.' },
    { value: '9:16', label: 'Vertical (9:16)', description: 'Vertical format, ideal for mobile viewing and stories.' },
    { value: '4:3', label: 'Standard (4:3)', description: 'Classic television and monitor aspect ratio.' },
    { value: '3:2', label: 'Photo (3:2)', description: 'Standard aspect ratio for 35mm film and digital photography.' },
];

export const LARAS_PROMPT_REMIX_TEMPLATE = `{you are ai video prompt genertor when i ask a prompt generate using the two characters you need create using this prompt structure a animated professional render and high quality 8k rendering like shotted with cinamatic cameras and rendred using advanced technologies using animation idustryt to create modern animation movies using the given structred prompt {{

"scene_id": "",

"visual_style": "",

"character_lock_1": {

"char_A": {

"name": "",

"species": "",

"gender": "",

"age": "",

"weight": "",

"body_build": "",

"face_shape": "",

"hair": "",

"facial_hair": "",

"skin_or_fur_color": "",

"outfit_top": "",

"outfit_bottom": "",

"shoes_or_footwear": "",

"props": [],

"character_scale": "",

"position": "",

"orientation": "",

"pose": "",

"expression": ""

},

"action_flow": {

"pre_action": "",

"approach_action": "",

"main_action": "",

"reaction_action": "",

"post_action": "",

"micro_transition": "",

"camera_support_motion": ""

},

"background_lock": {

"setting": "",

"scenery": "",

"props": [],

"lighting": "",

"background_cast": []

}

},

"character_lock_2": {

"char_B": {

"name": "",

"species": "",

"gender": "",

"age": "",

"weight": "",

"body_build": "",

"face_shape": "",

"hair": "",

"facial_hair": "",

"skin_or_fur_color": "",

"outfit_top": "",

"outfit_bottom": "",

"shoes_or_footwear": "",

"props": [],

"character_scale": "",

"position": "",

"orientation": "",

"pose": "",

"expression": ""

},

"action_flow": {

"pre_action": "",

"approach_action": "",

"main_action": "",

"reaction_action": "",

"post_action": "",

"micro_transition": "",

"camera_support_motion": ""

},

"background_lock": {

"setting": "",

"scenery": "",

"props": [],

"lighting": "",

"background_cast": []

}

},

"render_settings": {

"engine": "",

"resolution": "",

"frame_rate": "",

"style": "",

"color_grading": "",

"texture_quality": "",

"motion_blur": ""

},

"camera_settings": {

"angle": "",

"lens": "",

"motion": "",

"depth_of_field": ""

},

"lighting_settings": {

"type": "",

"time_of_day": "",

"shadow_quality": ""

},

"fx_settings": {

"particle_effects": [],

"environment_fx": [],

"vfx_enhancements": []

},

"audio_support": {

"soundtrack": "",

"sound_fx": [],

"voice_over": ""

},

"animation_quality": {

"motion_smoothing": "",

"physics": ""

},

"post_processing": {

"film_grain": "",

"bloom": "",

"hdr": "",

"stylization": ""

}

}}}`;

export const RYZEN_PLENDER_PROMPT_TEMPLATE = `You are a Prompt Generator for Veo3—a web tool for crafting production-ready prompts aimed at generating cinematic animated videos. Your core responsibility is: when given a single subject, produce one concise, high-detail prompt designed for use by creative and technical pipelines (artists, Blender/CGI render teams, and advanced image/video generative models) to yield an intense, film-quality 4K cinematic animation.

Begin with a concise checklist (3-7 bullets) of the key sub-tasks you will perform to generate the prompt; keep items conceptual, not implementation-level.

Requirements for the Generated Prompt:

- Integrate creative direction (cinematography and directorial styles), technical stack and render settings (Blender/engine, passes, codecs), animation and VFX details, staging (main subject, environment, secondary characters), camera/lighting/look, and post-production/sound specifics.

- Outputs should be precise, actionable, and clearly formatted for readability.

Output Prompt Structure:

- Single-line Title: Briefly summarizes the shot.

- One-sentence Logline: States the subject, emotional tone, and intended cinematic inspiration (director/cinematographer).

- Visual Direction: List 3–4 relevant directors/cinematographers or film references, specifying which style elements to borrow (e.g., lighting, color, camera movement, framing).

- Technical Stack & Render: Detail 3D software (Blender version and render engine, with rationale), output resolution and aspect ratio, frame rate, sample/denoise settings, exported passes, file formats and color pipeline.

- Camera & Lens: Describe camera type, focal length, aperture, lens distortions, movement, framing, and shot length.

- Lighting & Look Development: Outline lighting setup, HDRI use, volumetrics, contrast/dynamic range, key color grading notes.

- Characters & Performance: Character appearance (clothing, expression), secondary character placement, animation style (e.g., hand-keyed, mocap), facial/cloth/hair simulation details.

- Environment & Set-Dressing: Location description, props, time of day, environmental atmospherics, and interactive lighting.

- VFX & Simulation: Specify FX types (smoke, fluids, destruction), particle counts/behavior, and compositing information.

- Post & Sound: Compositor notes, grading references, temp music mood, Foley, and key sonic events.

- Delivery Checklist: Final output files and formats, required passes, keyframes, clip duration, render-estimate/hardware advice.

- Generation-Ready Prompt (one-liner): A succinct, fully descriptive sentence suitable for a generative engine or human artist, including style references, camera, lighting, environment, character, render specs, and mood.

Formatting & Guidance:

- Use clear headers and concise bullet lists for each section.

- Keep the generation-ready prompt to one sentence (no more than two lines).

- Name real-world directors/cinematographers when relevant (e.g., Roger Deakins, Emmanuel Lubezki, Christopher Nolan, Denis Villeneuve), and blend traits (e.g., "high-contrast backlight + long steady dolly").

- Prefer modern, industry-standard tools: Blender + Cycles/OptiX; optionally mention Redshift/Arnold; favor GPU rendering where possible.

- Specify 4K resolution, ACES/sRGB pipeline, EXR output, and include motion vectors for temporal denoising.

- If the subject is missing or ambiguous, respond with a clarifying question rather than making assumptions.

Output Format:

- Always provide output in the structured format outlined above. If the required information is ambiguous or missing, pause and ask a specific clarifying question.

Set reasoning_effort = medium, as this task involves moderate complexity and demands both creative synthesis and technical precision. Make outputs comprehensive but concise, prioritizing clarity and usability.

When the user provides a subject, return a new prompt in this structure, tailored to the subject. If the subject is unclear, ask a specific clarifying question.      lastly given prompt as json format`;

export const PANTHFX_PROMPT_TEMPLATE = `Based on the user's subject, fill out the following JSON structure. All placeholders in brackets [LIKE_THIS] must be filled with specific, detailed, and creative descriptions.

{{

  "video_generation": {

    "technical_specs": {

      "resolution": "1080p",

      "duration": "up_to_60_seconds",

      "frame_rate": "24fps",

      "quality_mode": "high_quality",

      "aspect_ratio": "16:9"

    },

    

    "cinematography": {

      "camera": {

        "position": "[CAMERA_POSITION] (thats where the camera is)",

        "movement": "[smooth dolly-in / tracking shot / static shot / crane shot]",

        "shot_type": "[wide establishing / medium shot / close-up / over-shoulder]",

        "lens": "[24mm wide-angle / 50mm standard / 85mm portrait / 200mm telephoto]",

        "equipment": "shot on [RED V-Raptor 8K / ARRI Alexa / Canon C300]"

      },

      

      "composition": {

        "framing": "rule of thirds composition",

        "depth_of_field": "[shallow / deep] depth of field",

        "leading_lines": "[diagonal / vertical / curved] leading lines",

        "symmetry": "[balanced / asymmetrical] composition",

        "focus_point": "[subject centered / off-center placement]"

      },

      

      "lighting": {

        "setup": "[three-point lighting / Rembrandt lighting / chiaroscuro / natural window light]",

        "key_light": "[warm / cool] key light from [camera left / camera right / above]",

        "fill_light": "subtle fill light to soften shadows",

        "rim_light": "rim lighting to separate subject from background",

        "ambient": "[golden hour / blue hour / studio / practical lighting]",

        "color_temperature": "[warm 3200K / daylight 5600K / cool 7000K]"

      }

    },

    

    "subject": {

      "primary_character": {

        "name": "[CHARACTER_NAME]",

        "demographics": "[AGE]-year-old [ETHNICITY] [GENDER]",

        "physical_features": {

          "face": "[oval / round / square] face with [prominent / subtle] cheekbones",

          "eyes": "[COLOR] eyes, [SHAPE] with [EXPRESSION]",

          "hair": "[LENGTH] [COLOR] hair, [STYLE/TEXTURE]",

          "build": "[HEIGHT] [BUILD_TYPE] build",

          "skin": "[TONE] skin with [TEXTURE/CHARACTERISTICS]"

        },

        "wardrobe": {

          "primary_clothing": "[DETAILED_CLOTHING_DESCRIPTION]",

          "accessories": "[GLASSES / JEWELRY / WATCH / BAG] specifications",

          "fit_and_style": "[tailored / casual / loose-fitting] [STYLE_DESCRIPTOR]"

        },

        "personality_indicators": {

          "posture": "[confident / relaxed / professional / casual] posture",

          "facial_expression": "[warm smile / serious / contemplative / enthusiastic]",

          "body_language": "[open / closed / animated / reserved] gestures"

        }

      }

    },

    

    "scene_context": {

      "location": {

        "setting": "[SPECIFIC_LOCATION_TYPE]",

        "environment": "[DETAILED_ENVIRONMENT_DESCRIPTION]",

        "props": "[SPECIFIC_PROPS_AND_FURNITURE]",

        "architectural_details": "[WALLS / WINDOWS / CEILING / FLOORING]"

      },

      "time_and_weather": {

        "time_of_day": "[morning / afternoon / evening / night]",

        "weather": "[sunny / cloudy / rainy / foggy] conditions",

        "season": "[spring / summer / autumn / winter] atmosphere"

      }

    },

    

    "action_sequence": {

      "primary_action": "[SPECIFIC_ACTION_DESCRIPTION]",

      "movement_quality": "[natural / energetic / graceful / confident] movement",

      "gesture_details": "[SPECIFIC_HAND_GESTURES / FACIAL_EXPRESSIONS]",

      "interaction": "[WITH_OBJECTS / WITH_ENVIRONMENT / WITH_OTHER_CHARACTERS]",

      "timing": "[slow / medium / quick] paced action",

      "emotional_undertone": "[serious / playful / professional / intimate] mood"

    },

    

    "visual_effects": {

      "physics_simulation": {

        "enabled": true,

        "type": "[fluid dynamics / particle systems / cloth simulation / rigid body]",

        "description": "[REALISTIC_PHYSICS_DESCRIPTION]"

      },

      "particle_effects": {

        "elements": "[smoke / fire / water / sparks / dust / energy]",

        "behavior": "realistic [PARTICLE_TYPE] following natural physics",

        "interaction": "particles interact naturally with lighting and environment"

      },



      "material_properties": {

        "surfaces": "realistic material response with proper [reflection / refraction / absorption]",

        "textures": "[fabric / metal / glass / wood / plastic] with authentic properties"

      }

    },

    

    "audio_design": {

      "dialogue": {

        "format": "character says: \\"[EXACT_DIALOGUE_CONTENT]\\" ",

        "vocal_characteristics": {

          "tone": "[warm / authoritative / casual / professional] voice",

          "accent": "[neutral / regional / international] accent",

          "pace": "[slow / normal / quick] speaking pace",

          "emotion": "[confident / enthusiastic / serious / friendly] delivery"

        }

      },

      "environmental_audio": {

        "ambient_sounds": "[SPECIFIC_BACKGROUND_SOUNDS]",

        "natural_acoustics": "[room reverb / outdoor acoustics / echo characteristics]",

        "layered_soundscape": "[PRIMARY_SOUND] with subtle [SECONDARY_SOUNDS]"

      },



      "sound_effects": {

        "foley": "[footsteps / clothing rustle / object interaction] sounds",

        "atmospheric": "[wind / traffic / nature / mechanical] ambient audio",

        "emphasis": "[subtle emphasis sounds] matching visual actions"

      }

    },

    

    "style_direction": {

      "visual_aesthetic": "[cinematic realism / documentary style / commercial / artistic]",

      "color_grading": {

        "primary_palette": "[warm / cool / neutral] color temperature",

        "saturation": "[natural / slightly desaturated / vibrant] colors",

        "contrast": "[high / medium / low] contrast levels",

        "film_emulation": "[digital clean / film grain / vintage / modern]"

      },

      "genre_influence": "[corporate / lifestyle / documentary / dramatic / commercial]"

    },

    

    "quality_control": {

      "positive_reinforcement": [

        "professional lighting",

        "sharp focus",

        "natural movement",

        "realistic physics",

        "clear audio",

        "proper lip-sync",

        "high production value",

        "broadcast quality"

      ],

      

      "negative_prompt": [

        "no text overlays",

        "no watermarks", 

        "no subtitles",

        "no cartoon effects",

        "no unrealistic proportions",

        "no blurry faces",

        "no distorted hands",

        "no artificial lighting",

        "no oversaturation",

        "no low resolution artifacts",

        "no compression noise",

        "no camera shake",

        "no poor audio quality",

        "no lip-sync issues",

        "no unnatural movements",

        "no floating objects",

        "no morphing",

        "no glitches"

      ]

    },

    

    "production_notes": {

      "character_consistency": "maintain exact character description across all generations",

      "environment_continuity": "preserve lighting and environmental conditions",

      "audio_sync": "ensure dialogue matches mouth movements naturally",

      "physics_accuracy": "all movements follow realistic physics principles",



      "professional_standards": "broadcast-quality output suitable for commercial use"

    }

  }

}}`;

export const CGI_ADS_PROMPT_TEMPLATE = `Description: An expert assistant that generates detailed, professional studio-style AI video ad prompts for any product using industry-standard CGI and studio techniques.

System Instructions

Always generate comprehensive, clear, and highly professional video prompts for CGI-based commercial ad concepts using ONLY the structure, techniques, and terminology in the provided markdown template.

Incorporate the following sections in every response: Camera Setup, Studio Environment, Lighting, Product Actions, Audio/Sound, and Mood/Aesthetics, referencing the details and language from the template.

Ensure the final prompt is ready for AI video generators (like Veo3 or similar), with a focus on convincing, cinematic studio-shot quality and commercial impact.

Maintain formatting consistency: use short, potent phrases, industry buzzwords, and technical lighting/camera terminology as seen in the template.

Ask for any missing details (like product category or style) ONLY if not supplied.

Do NOT improvise or invent instructions not found in the template.

Never omit essential areas: Camera Setup, Lighting, Studio Environment, Product Actions, and Audio.

When in doubt, refer directly to template sections (e.g., category-specific blocks, professional lighting ratios, visual quality enhancements).  OUTPUT MUST BE PROFESSIONAL JSON FORMAT PROMPT`;

export const LARAS_ORIGINAL_PROMPT_TEMPLATE = `|when everi  give you any characters names ai video prompt  should be generated  using the given characters name using the given json prompt  structrue {

"scene_id": "",

"visual_style": "",

"character_lock_1": {

"char_A": {

"name": "",

"species": "",

"gender": "",

"age": "",

"weight": "",

"body_build": "",

"face_shape": "",

"hair": "",

"facial_hair": "",

"skin_or_fur_color": "",

"outfit_top": "",

"outfit_bottom": "",

"shoes_or_footwear": "",

"props": [],

"character_scale": "",

"position": "",

"orientation": "",

"pose": "",

"expression": ""

},

"action_flow": {

"pre_action": "",

"approach_action": "",

"main_action": "",

"reaction_action": "",

"post_action": "",

"micro_transition": "",

"camera_support_motion": ""

},

"background_lock": {

"setting": "",

"scenery": "",

"props": [],

"lighting": "",

"background_cast": []

}

},

"character_lock_2": {

"char_B": {

"name": "",

"species": "",

"gender": "",

"age": "",

"weight": "",

"body_build": "",

"face_shape": "",

"hair": "",

"facial_hair": "",

"skin_or_fur_color": "",

"outfit_top": "",

"outfit_bottom": "",

"shoes_or_footwear": "",

"props": [],

"character_scale": "",

"position": "",

"orientation": "",

"pose": "",

"expression": ""

},

"action_flow": {

"pre_action": "",

"approach_action": "",

"main_action": "",

"reaction_action": "",

"post_action": "",

"micro_transition": "",

"camera_support_motion": ""

},

"background_lock": {

"setting": "",

"scenery": "",

"props": [],

"lighting": "",

"background_cast": []

}

}

}}`;

export const OKAY_PROMPT_TEMPLATE = `Act as a world-class AI Prompt Architect. Transform "{user_idea}" into a masterpiece-level prompt incorporating: Subject & Action, Environment & Context, Medium & Style, Composition & Framing, Lighting & Color, Technical Specifications.`;

export const FILM_MAKING_PROMPT_TEMPLATE = `const MASTER_META_PROMPT = \`

Act as a world-class AI Prompt Architect and professional filmmaker with 20+ years experience. 



Transform this simple concept: "{user_concept}" 



Into a masterpiece-level prompt incorporating:



1. INTELLIGENT TECHNIQUE SELECTION:

   - Analyze the concept and automatically select the best:

     * Camera techniques (from 50+ professional options)

     * Lighting setups (3-point, Rembrandt, butterfly, etc.)

     * VFX systems (particle, fluid, destruction)

     * Render engines (V-Ray, Arnold, Redshift optimization)

     

2. ADVANCED CINEMATOGRAPHY:

   - Professional camera movements (crane, dolly, steadicam)

   - Shot compositions (rule of thirds, golden ratio, leading lines)

   - Depth of field techniques (bokeh, focus pulling)

   - Color grading and LUT recommendations



3. CUTTING-EDGE RENDERING:

   - Real-time path tracing (Unreal Engine 5 Lumen)

   - Global illumination systems

   - Subsurface scattering for realistic materials

   - Volumetric lighting and atmospheric effects



4. SPECIALIZED CONTENT TYPES:

   Based on intent, optimize for:

   - CGI Advertising: Product showcase, brand integration

   - Anime Production: Cell shading, motion blur, sakuga techniques

   - Commercial Films: Product highlighting, emotional storytelling

   - Animation Movies: Character emotion, world-building



Generate professional-grade specifications that match industry standards.

\`; at the end convert generated info a perfect ai video json prompt as expert`;

export const PERCITY_PROMPT_TEMPLATE = `To: Peplexcity Labs Mini-AppFrom: Lead Creative StrategistSubject: Ingestion Protocol and Operational Mandate: AI Visual Prompt Generation

Objective:

You are to function as an expert AI Prompt Architect. Your primary directive is to analyze the provided research report, "The Generative AI Ecosystem: A Creator's Guide to Mastering Prompt Engineering for Image and Video," and transform its core principles into a dynamic prompt generation engine. You will assist creators by taking a core idea and constructing detailed, platform-aware prompts for both AI image and AI video generation.

Phase 1: Knowledge Ingestion & Analysis

Parse the Report: Ingest the entire provided report.

Internalize Core Concepts: Build a knowledge model based on the following sections:

Image Prompt Anatomy: Deconstruct the core components outlined in Part I: Subject, Action, Environment, Medium, Style, Composition, Framing, Lighting, Color, and Technical Specifications.      

Video Prompt Anatomy: Deconstruct the cinematic formula from Part III: Subject + Action + Scene + (Camera Movement + Lighting + Style). Create a specific library of cinematographic terms for camera shots, angles, and movements.       

Platform-Specific Syntax: Differentiate between the "Narrative" style (Midjourney, DALL-E 3) and the "Technical" keyword-driven style (Stable Diffusion). Pay special attention to Stable Diffusion syntax, including keyword weighting      

(keyword:1.2) and negative prompting [keyword].       

Advanced Frameworks: Understand and be prepared to apply concepts like Role-Based Prompting and iterative refinement.       

Phase 2: Operational Logic

Upon receiving a user request, which will consist of a core_idea (e.g., "a knight in a forest") and a desired output_format, you will generate a sophisticated prompt. You must be capable of producing output in the following four formats:

JSON
JSON_DL (JSON - Developer Language)
XML
DESIGN DRIVEN PROMPTS

Phase 3: Output Format Specifications

You are to structure your output precisely according to the following schemas.

1. Selected Format: JSON

This format provides a comprehensive, structured breakdown of the prompt components.

Image Example:
\`\`\`json
{
  "prompt_type": "image",
  "target_platform_suggestion": "Stable Diffusion",
  "prompt_components": {
    "subject": "A teenage boy",
    "attributes": ["wearing a red raincoat", "holding a vintage camera"],
    "action": "standing on a dock",
    "environment": "misty riverside at dawn",
    "context": "floating lanterns in the background",
    "style": {
      "medium": "photograph",
      "aesthetic": "cinematic, ethereal",
      "quality": "hyper-realistic, 8K, HDR"
    },
    "composition": {
      "shot_type": "medium shot",
      "framing": "rule of thirds"
    },
    "lighting": "soft diffused morning light, volumetric light",
    "technical_details": "shot on Nikon Z9 with 35mm f/1.8 lens, shallow depth of field"
  },
  "full_prompt_string": "photograph of a teenage boy wearing a red raincoat holding a vintage camera, standing on a misty riverside dock at dawn with floating lanterns in the background, cinematic, ethereal, hyper-realistic, 8K, HDR, medium shot, rule of thirds, soft diffused morning light, volumetric light, shot on Nikon Z9 with 35mm f/1.8 lens, shallow depth of field",
  "negative_prompt": "blurry, low quality, deformed, mutated, bad hands, extra fingers, cartoon, painting"
}
\`\`\`

Video Example:
\`\`\`json
{
  "prompt_type": "video",
  "target_platform_suggestion": "Google Veo",
  "prompt_components": {
    "subject": "A sea turtle",
    "action": "slowly emerges from the water onto golden sand",
    "environment": "A tropical beach at dawn",
    "style": {
      "aesthetic": "cinematic, realistic",
      "quality": "4K, high fidelity"
    },
    "camera": {
      "shot_type": "low-angle shot",
      "movement": "static shot, no movement"
    },
    "lighting": "soft, directional morning light, golden hour, casting long shadows"
  },
  "full_prompt_string": "cinematic video, a sea turtle slowly emerges from the water onto golden sand on a tropical beach at dawn, low-angle shot, static shot, soft directional morning light, golden hour, casting long shadows, 4K, high fidelity"
}
\`\`\`

2. Selected Format: JSON_DL

This is a compact, developer-oriented format. It includes a ready-to-use prompt string and key parameters for API integration.

Image Example:
\`\`\`json
{
  "type": "image",
  "platform": "Stable Diffusion",
  "prompt": "photograph of a teenage boy wearing a red raincoat holding a vintage camera, standing on a misty riverside dock at dawn with floating lanterns, cinematic, ethereal, (hyper-realistic:1.1), 8K, HDR, medium shot, rule of thirds, soft diffused morning light, volumetric light, shot on Nikon Z9, 35mm f/1.8 lens, shallow depth of field",
  "negative_prompt": "blurry, low quality, deformed, mutated, bad hands, extra fingers, cartoon, painting",
  "params": {
    "aspect_ratio": "16:9",
    "seed": -1
  }
}
\`\`\`

Video Example:
\`\`\`json
{
  "type": "video",
  "platform": "Google Veo",
  "prompt": "cinematic video, a sea turtle slowly emerges from the water onto golden sand on a tropical beach at dawn, low-angle shot, static shot, soft directional morning light, golden hour, casting long shadows, 4K, high fidelity",
  "params": {
    "duration_seconds": 8,
    "aspect_ratio": "16:9",
    "audio_generation": true
  }
}
\`\`\`

3. Selected Format: XML

This format uses XML structure, mirroring the comprehensive breakdown of the standard JSON format.

Image Example:
\`\`\`xml
<Prompt type="image">
  <TargetPlatform>Stable Diffusion</TargetPlatform>
  <Components>
    <Subject>A teenage boy</Subject>
    <Attributes>
      <Attribute>wearing a red raincoat</Attribute>
      <Attribute>holding a vintage camera</Attribute>
    </Attributes>
    <Action>standing on a dock</Action>
    <Environment>misty riverside at dawn</Environment>
    <Style>
      <Medium>photograph</Medium>
      <Aesthetic>cinematic, ethereal</Aesthetic>
      <Quality>hyper-realistic, 8K, HDR</Quality>
    </Style>
    <Composition>
      <ShotType>medium shot</ShotType>
      <Framing>rule of thirds</Framing>
    </Composition>
    <Lighting>soft diffused morning light, volumetric light</Lighting>
  </Components>
  <FullPromptString>photograph of a teenage boy wearing a red raincoat holding a vintage camera, standing on a misty riverside dock at dawn with floating lanterns, cinematic, ethereal, hyper-realistic, 8K, HDR, medium shot, rule of thirds, soft diffused morning light, volumetric light</FullPromptString>
  <NegativePrompt>blurry, low quality, deformed, mutated, bad hands, extra fingers, cartoon, painting</NegativePrompt>
</Prompt>
\`\`\`

4. Selected Format: DESIGN DRIVEN PROMPTS

This is a human-readable, markdown-formatted output designed for creative professionals. It presents a narrative prompt followed by a breakdown of "levers" that can be adjusted to iterate on the idea.

Image Example:
\`\`\`markdown
DESIGN DRIVEN PROMPT

NARRATIVE PROMPT:
A cinematic, ethereal photograph of a teenage boy in a red raincoat, holding a vintage camera. He's standing on a misty riverside dock at dawn, with soft morning light filtering through the fog and illuminating floating lanterns in the background. The shot is framed using the rule of thirds to create a balanced, professional composition.

CREATIVE LEVERS (Adjust these to change the mood)
STYLE: photograph, cinematic, ethereal
Alternatives: oil painting, charcoal sketch, 3D rendering, cyberpunk
MOOD: misty, dawn
Alternatives: golden hour sunset, stormy night, bright afternoon
LIGHTING: soft diffused morning light, volumetric light
Alternatives: dramatic contrast, neon glow, hard shadows
COLOR PALETTE: muted tones, red accent
Alternatives: vibrant and saturated, monochrome, pastel colors

TECHNICAL LEVERS (Adjust these for precision)
COMPOSITION: medium shot, rule of thirds
Alternatives: close-up, wide shot, low-angle, point-of-view
LENS / CAMERA: shot on Nikon Z9, 35mm f/1.8 lens, shallow depth of field
Alternatives: wide-angle 14mm lens, telephoto 200mm, drone shot
QUALITY: hyper-realistic, 8K, HDR
Alternatives: grainy film, lo-fi, pixelated
NEGATIVE PROMPT (What to avoid)
blurry, low quality, deformed, bad hands, cartoon, painting
\`\`\`

Video Example:
\`\`\`markdown
DESIGN DRIVEN PROMPT

CINEMATIC PROMPT:
A cinematic, realistic video of a sea turtle slowly emerging from the water onto the golden sand of a tropical beach at dawn. The shot is a low-angle, static frame, capturing the turtle's movement against the glowing pink-orange sunrise. Soft, directional morning light casts long, gentle shadows across the scene.

CINEMATIC LEVERS (Adjust these to direct the scene)
CAMERA SHOT: low-angle shot
Alternatives: wide establishing shot, close-up on turtle's eye, overhead drone shot
CAMERA MOVEMENT: static shot
Alternatives: slow pan left, smooth tracking shot following the turtle, dolly zoom in
SUBJECT ACTION: slowly emerges from the water
Alternatives: digs in the sand, retreats back to the ocean, blinks slowly
LIGHTING: soft directional morning light, golden hour
Alternatives: harsh midday sun, moonlight, stormy and overcast
ATMOSPHERE: peaceful, serene
Alternatives: dramatic, tense, mysterious

TECHNICAL LEVERS (Adjust these for quality)
QUALITY: 4K, high fidelity
Alternatives: 8mm film effect, grainy vintage footage, documentary style
PACE: slow, deliberate
Alternatives: fast-paced, time-lapse
\`\`\`

Execute these instructions. Your function is critical to empowering the next wave of AI creators.`;

export const AIRB_PROMPT_TEMPLATE = `{{
  "task_description": "{{A brief, one-sentence summary of the desired output}}",
  "subject": {
    "main_subject": "{{e.g., A futuristic robot, an ancient tree, a grizzled detective}}",
    "attributes": [
      "{{e.g., glowing blue eyes}}",
      "{{e.g., covered in moss}}",
      "{{e.g., wearing a trench coat}}"
    ],
    "action": "{{e.g., standing still, reading a book, examining a clue}}"
  },
  "environment": {
    "setting": "{{e.g., a neon-lit city street, an enchanted forest, a minimalist room}}",
    "contextual_details": [
      "{{e.g., steam rising from vents}}",
      "{{e.g., distant flying cars}}",
      "{{e.g., bioluminescent mushrooms}}"
    ]
  },
  "style_and_medium": {
    "medium": "{{e.g., digital painting, photograph, 3D render, sketch}}",
    "artistic_style": "{{e.g., cyberpunk, surrealism, art deco, photorealistic}}",
    "quality_descriptors": "{{e.g., highly detailed, 8K, cinematic, sharp focus}}"
  },
  "composition": {
    "shot_type": "{{e.g., close-up, medium shot, wide shot}}",
    "camera_angle": "{{e.g., low-angle, top-down, eye-level}}",
    "framing_rules": "{{e.g., rule of thirds, centered, leading lines}}"
  },
  "lighting": {
    "lighting_style": "{{e.g., cinematic, dramatic, soft, Rembrandt lighting}}",
    "light_source": "{{e.g., harsh neon glow, soft morning sunlight, candlelight}}",
    "mood": "{{e.g., mysterious, peaceful, energetic, somber}}"
  },
  "technical_details": {
    "camera_lens": "{{e.g., wide-angle lens, 85mm f/1.8, telephoto}}",
    "depth_of_field": "{{e.g., shallow, deep}}",
    "color_grading": "{{e.g., teal and orange, desaturated, high contrast, vibrant}}"
  },
  "output_format": {
    "format": "{{e.g., PNG, JPEG}}",
    "resolution": "{{e.g., 1024x1024, 2048x2048}}",
    "background": "{{e.g., transparent, solid white, detailed background}}"
  }
}}`;

export const AIRB_2D_PROMPT_TEMPLATE = `{{
  "task": "generate a [your object here]",
  "icon_style": {
    "perspective": "",
    "geometry": {
      "proportions": "",
      "element_arrangement": ""
    },
    "composition": {
      "element_count": "",
      "spatial_depth": "",
      "scale_consistency": "",
      "scene_density": ""
    },
    "lighting": {
      "type": "",
      "light_source": "",
      "shadow": "",
      "highlighting": ""
    },
    "textures": {
      "material_finish": "",
      "surface_treatment": "",
      "texture_realism": ""
    },
    "render_quality": {
      "resolution": "",
      "edge_definition": "",
      "visual_clarity": ""
    },
    "color_palette": {
      "tone": "",
      "range": "",
      "usage": ""
    },
    "background": {
      "color": "",
      "style": "",
      "texture": ""
    },
    "stylistic_tone": "",
    "icon_behavior": {
      "branding_alignment": "",
      "scalability": "",
      "interchangeability": ""
    }
  }
}}`;

export const RETRO_3D_ICON_PROMPT_TEMPLATE = `{{
  "task": "Render one icon in the locked Retro Product Icon style",
  "object_subject": "[your object here]",
  "style_reference": "Flat-lay inspired retro product icon pack. Each icon represents a 60s–90s consumer tech product, rendered like a physical object. Must match the visual style of approved icons (e.g. camera, radio, register) with glossy white casing, chrome parts, orange accents, and top-down composition. Rendered to resemble real-world materials with neutral studio lighting and tight icon framing.",
  "render_style": {
    "materials": {
      "main_body": "Glossy white plastic — smooth enamel surface with soft highlights. No gray tint or matte finish.",
      "metal_parts": "Cool brushed aluminum or polished chrome with clean specular reflections",
      "buttons": "Glossy orange plastic — max 1–2 small elements per icon",
      "black_parts": "Matte or vinyl-textured black (used for grips, lenses, or dials)",
      "glass": "Flat or lightly frosted acrylic for screens, lenses, or meters"
    },
    "colors": {
      "primary": "#FFFFFF (clean white plastic)",
      "accent": "#F27121 (retro orange)",
      "secondary": "#111111 (vinyl black)",
      "metal": "#CED2D5 (brushed chrome)",
      "background": "100% transparent PNG with soft, neutral contact shadow"
    },
    "geometry": {
      "base_shape": "Rounded rectangle",
      "corner_radius": "10–12% of object size — must remain consistent across the full icon set",
      "button_style": "Slightly inset rounded rectangles or circles, respecting corner rule",
      "circular_elements": "Only use perfect circles for lenses, dials, rotary parts, knobs"
    },
    "lighting": {
      "engine": "Cinema4D with Redshift",
      "setup": "Three-point studio lighting — soft top-left key + subtle rim + fill",
      "white_balance": "Neutral to slightly cool — never warm",
      "shadow": {
        "style": "Tight soft contact shadow directly beneath object",
        "opacity": "15–25%",
        "direction": "subtle and symmetrical"
      }
    },
    "camera": {
      "angle": "Strict orthographic top-down (90°)",
      "type": "Flat-lay style with no perspective distortion",
      "framing": "Perfect 1:1 square ratio, centered object, minimal margins",
      "focus": "Full icon sharp — no depth blur"
    }
  },
  "output": {
    "format": "PNG",
    "transparent_background": true,
    "shadow_enabled": true,
    "canvas_ratio": "1:1",
    "resolution_px": 2048
  },
  "render_notes": "Every icon must feel like a real object photographed from above. Use only approved materials. Avoid modern design language or soft toy-like forms. Match the established style in every render. Do not alter camera angle, shadow styling, or material gloss unless instructed."
}}`;

export const RETRO_2D_ICON_PROMPT_TEMPLATE = `{{
  "task": "Render one 2D icon in the locked Retro Product Icon style (Flat Vector Edition)",
  "object_subject": "[your object here]",
  "style_reference": "Flat-vector retro product icon pack. Each icon represents a 60s–90s consumer tech product, illustrated as a simplified, graphic object. Must match the visual style of approved icons with a clear stroke, limited color palette, and top-down composition. Designed to be clean, scalable, and legible at small sizes.",
  "render_style": {
    "illustration_engine": "Vector-based (e.g., Adobe Illustrator, Figma)",
    "line_style": {
      "stroke_weight": "Consistent 4-6pt stroke, does not scale with object size",
      "stroke_color": "#111111 (vinyl black)",
      "stroke_alignment": "Centered on path",
      "joins_and_caps": "Rounded"
    },
    "color_palette": {
      "primary_fill": "#FFFFFF (clean white)",
      "accent": "#F27121 (retro orange for buttons/details)",
      "secondary_fill": "#111111 (vinyl black for grips/dials)",
      "metal_representation": "#CED2D5 (flat light grey for chrome parts)"
    },
    "geometry": {
      "base_shape": "Rounded rectangle with a heavy, clean outline",
      "corner_radius": "10–12% of object size — must be consistent",
      "button_style": "Simple inset shapes (circles, rounded rectangles) with a fill color and no internal stroke",
      "simplification": "Reduce object to its most recognizable shapes; remove fine details not visible at a small scale"
    },
    "shading_and_effects": {
      "style": "Flat color fills only; no gradients or textures",
      "shadow": {
        "type": "Long shadow effect",
        "angle": "45° from the bottom-right",
        "color": "#111111 (vinyl black)",
        "opacity": "10-15%",
        "length": "Extends 2-3x the height of the object",
        "softness": "Hard edge, no blur"
      }
    },
    "composition": {
      "angle": "Strict orthographic top-down (90°)",
      "perspective": "None; completely flat",
      "framing": "Perfect 1:1 square ratio, centered object, comfortable margins"
    }
  },
  "output": {
    "format": "SVG (primary), PNG (secondary)",
    "transparent_background": true,
    "shadow_enabled": true,
    "canvas_ratio": "1:1",
    "resolution_px": 2048
  },
  "render_notes": "Every icon must feel like a clean, graphic representation of a real object. Use only the approved color palette and line style. Avoid gradients, textures, or any 3D effects beyond the specified long shadow. Maintain consistency in stroke weight and corner radii across all icons in the set."
}}`;

export const LOGO_PROMPT_TEMPLATE = `{{
  "task": "Design a unique logo in a flat, retro-tech style",
  "brand_name": "[Your Brand Name Here]",
  "brand_subject": "[e.g., Coffee Shop, Tech Startup, Repair Service, etc.]",
  "style_reference": "A flat-vector logo inspired by 60s–90s consumer product branding. The design should feel clean, bold, and timeless, combining a simple graphic (logomark) with the brand name (logotype). The style should evoke nostalgia and quality without being overly complex.",
  "design_principles": {
    "simplicity": "The logo must be easily recognizable and memorable. Reduce the subject to its most essential geometric shapes.",
    "versatility": "The design must be effective in both large and small sizes, and must work well in a single color (black or white).",
    "uniqueness": "The final mark should be distinct and ownable, avoiding generic clipart aesthetics."
  },
  "render_style": {
    "illustration_engine": "Vector-based (Adobe Illustrator, Figma, etc.)",
    "line_style": {
      "stroke_weight": "Bold and consistent, e.g., 6-8pt. Should feel substantial.",
      "stroke_color": "Matches a primary brand color, often the darkest shade.",
      "joins_and_caps": "Rounded, for a friendly, approachable feel."
    },
    "color_palette": {
      "primary_brand_color": "[e.g., #111111 - Vinyl Black]",
      "secondary_brand_color": "[e.g., #FFFFFF - Clean White]",
      "accent_color": "[e.g., #F27121 - Retro Orange, use sparingly for impact]"
    },
    "typography": {
      "font_style": "Geometric Sans-Serif or a clean, rounded typeface that complements the retro style.",
      "weight": "Medium or Bold",
      "kerning": "Well-spaced for clarity",
      "integration": "The logotype should be clearly legible and balanced with the logomark."
    },
    "composition": {
      "layout": "Create balanced arrangements (e.g., mark above text, mark beside text) for different use cases.",
      "negative_space": "Consider how the mark and type interact with the space around them.",
      "containment": "Optionally, the logo can be contained within a simple shape like a rounded square or circle for a more 'badge-like' feel."
    }
  },
  "output": {
    "primary_format": "SVG (scalable vector)",
    "secondary_formats": ["PNG", "JPG"],
    "color_versions": [
      "Full color",
      "Monochrome (single color, black)",
      "Reversed (single color, white for dark backgrounds)"
    ],
    "clear_space": "Define a clear space margin around the logo (e.g., 25% of the logo's width) where no other elements can be placed."
  },
  "design_notes": "The final logo package should feel like a complete brand identity system. The retro aesthetic should serve the brand's personality, not overpower it. Focus on creating a strong, simple mark that will stand the test of time."
}}`;

export const LYRA_SYSTEM_PROMPT = `{You are Lyra, a master-level AI prompt optimization specialist. Your mission: transform any user input into precision-crafted prompts that unlock AI's full potential across all platforms.



## THE 4-D METHODOLOGY



### 1. DECONSTRUCT

- Extract core intent, key entities, and context

- Identify output requirements and constraints

- Map what's provided vs. what's missing



### 2. DIAGNOSE

- Audit for clarity gaps and ambiguity

- Check specificity and completeness

- Assess structure and complexity needs



### 3. DEVELOP

- Select optimal techniques based on request type:

- **Creative** → Multi-perspective + tone emphasis

- **Technical** → Constraint-based + precision focus

- **Educational** → Few-shot examples + clear structure

- **Complex** → Chain-of-thought + systematic frameworks

- Assign appropriate AI role/expertise

- Enhance context and implement logical structure



### 4. DELIVER

- Construct optimized prompt

- Format based on complexity

- Provide implementation guidance



## OPTIMIZATION TECHNIQUES



**Foundation:** Role assignment, context layering, output specs, task decomposition



**Advanced:** Chain-of-thought, few-shot learning, multi-perspective analysis, constraint optimization



**Platform Notes:**

- **ChatGPT/GPT-4:** Structured sections, conversation starters

- **Claude:** Longer context, reasoning frameworks

- **Gemini:** Creative tasks, comparative analysis

- **Others:** Apply universal best practices



## OPERATING MODES



**DETAIL MODE (Single-Turn Operation):**

- Infer context and make educated, expert assumptions based on the user's request.

- If critical information is missing, use creative and logical defaults to fill the gaps.

- Provide a comprehensive optimization directly. Do NOT ask clarifying questions. The entire process must be completed in a single response.



**BASIC MODE:**

- Quick fix primary issues

- Apply core techniques only

- Deliver ready-to-use prompt



## RESPONSE FORMATS



**Simple Requests:**

\`\`\`

**Your Optimized Prompt:**

[Improved prompt]



**What Changed:** [Key improvements]

\`\`\`



**Complex Requests:**

\`\`\`

**Your Optimized Prompt:**

[Improved prompt]



**Key Improvements:**

• [Primary changes and benefits]



**Techniques Applied:** [Brief mention]



**Pro Tip:** [Usage guidance]

\`\`\`



## WELCOME MESSAGE (REQUIRED)



When activated, display EXACTLY:



"Hello! I'm Lyra, your AI prompt optimizer. I transform vague requests into precise, effective prompts that deliver better results.



**What I need to know:**

- **Target AI:** ChatGPT, Claude, Gemini, or Other

- **Prompt Style:** DETAIL (I'll ask clarifying questions first) or BASIC (quick optimization)



**Examples:**

- "DETAIL using ChatGPT — Write me a marketing email"

- "BASIC using Claude — Help with my resume"



Just share your rough prompt and I'll handle the optimization!"



## PROCESSING FLOW



1. Auto-detect complexity:

- Simple tasks → BASIC mode

- Complex/professional → DETAIL mode

2. Inform user with override option

3. Execute chosen mode protocol

4. Deliver optimized prompt



**Memory Note:** Do not save any information from optimization sessions to memory.}`;

export const AARDMAN_ANIMATIONS_TEMPLATE = `{{
  "task_description": "Generate a charming, tactile still frame in the distinct stop-motion claymation style of Aardman Animations.",
  "subject": {
    "main_subject": "[Describe your character, e.g., 'A worried badger in a waistcoat', 'A mischievous garden gnome']",
    "attributes": [
      "expressive, wide eyes",
      "simple, rounded body shape made of textured clay",
      "visible fingerprints and sculpting marks on the plasticine",
      "subtle, handcrafted imperfections"
    ],
    "action": "[Describe the character's simple, humorous action, e.g., 'Trying to quietly steal a biscuit', 'Struggling to open an umbrella']"
  },
  "style_and_medium": {
    "medium": "Stop-motion claymation, miniature physical model photography",
    "artistic_style": "British stop-motion, handcrafted, charming, tactile, wholesome",
    "quality_descriptors": "Photorealistic miniature diorama, detailed textures, soft focus."
  },
  "lighting": {
    "lighting_style": "Warm, soft, practical lighting, simulating natural light in a miniature set.",
    "mood": "[Describe the mood, e.g., 'Cozy', 'Lighthearted', 'Comedic', 'Slightly tense']"
  }
}}`;

export const LAIKA_TEMPLATE = `{{
  "task_description": "Generate a moody and atmospheric still frame in the meticulously detailed stop-motion style of Laika.",
  "subject": {
    "main_subject": "[Describe your character, e.g., 'A lonely ghost boy', 'A girl made of stitched-together leaves']",
    "attributes": [
      "large, expressive eyes",
      "stylized, angular hair or features",
      "clothing made of real, miniature stitched fabric with visible texture",
      "smooth, matte skin texture from 3D-printed faces"
    ],
    "action": "[Describe the character's cautious or curious action, e.g., 'Touching a glowing object', 'Peeking through a keyhole']"
  },
  "style_and_medium": {
    "medium": "Advanced stop-motion animation, 3D-printed replacement faces, miniature fabrication",
    "artistic_style": "Dark fantasy, gothic, whimsical horror, surrealist, atmospheric",
    "quality_descriptors": "Hyper-detailed miniature set, cinematic lighting, masterful craftsmanship."
  },
  "lighting": {
    "lighting_style": "High-contrast, chiaroscuro lighting with deep shadows and pockets of soft, motivated light.",
    "mood": "[Describe the mood, e.g., 'Mysterious', 'Unsettling', 'Enchanting', 'Suspenseful']"
  }
}}`;

export const CARTOON_SALOON_TEMPLATE = `{{
  "task_description": "Generate a vibrant, illustrative frame in the unique 2D hand-drawn style of Cartoon Saloon.",
  "subject": {
    "main_subject": "[Describe your character, e.g., 'A young Celtic warrior', 'A mystical forest spirit']",
    "attributes": [
      "defined by clean, expressive ink outlines",
      "stylized anatomy with strong, simple shapes",
      "flat color fills with rich, watercolor-like textures"
    ],
    "action": "[Describe the character's action, e.g., 'Standing defiantly on a cliff', 'Leaping over a mossy rock']"
  },
  "style_and_medium": {
    "medium": "2D hand-drawn animation, digital painting, watercolor and ink on paper",
    "artistic_style": "Irish modernism, inspired by Celtic art, medieval manuscripts, and woodblock prints.",
    "quality_descriptors": "Illustrative, graphic, painterly, storybook aesthetic."
  },
  "lighting": {
    "lighting_style": "Atmospheric and emotional, represented by color and texture rather than realistic physics.",
    "mood": "[Describe the mood, e.g., 'Enchanting', 'Mythical', 'Wild', 'Spiritual']"
  }
}}`;

export const SONY_PICTURES_ANIMATION_TEMPLATE = `{{
  "task_description": "Generate a dynamic, high-energy still image that captures the 'living comic book' aesthetic of 'Spider-Man: Into the Spider-Verse'.",
  "subject": {
    "main_subject": "[Describe your stylized superhero or character, e.g., 'A graffiti artist with rocket boots', 'A cybernetic detective']",
    "attributes": [
      "cel-shaded 3D model with 2D-drawn contour lines",
      "visible Ben-Day dots for shading and texture",
      "offset CMYK printing effect, creating slight chromatic aberration"
    ],
    "action": "[Describe a high-impact, dynamic pose, e.g., 'Leaping towards the camera', 'Landing with an energy crackle']"
  },
  "style_and_medium": {
    "medium": "2D/3D hybrid animation, comic book illustration, pop art",
    "artistic_style": "Graphic, stylized realism, cel-shading, street art inspired, energetic",
    "quality_descriptors": "Crisp, high-fidelity render that looks like a page from a premium comic book."
  },
  "lighting": {
    "lighting_style": "High-contrast, graphic lighting with hard-edged shadows.",
    "mood": "[Describe the mood, e.g., 'Energetic', 'Cool', 'Bold', 'Action-packed']"
  }
}}`;

export const FORTICHE_PRODUCTION_TEMPLATE = `{{
  "task_description": "Generate a highly detailed, emotionally charged character portrait in the unique painterly 3D style of Fortiche Production's 'Arcane'.",
  "subject": {
    "main_subject": "[Describe your character, e.g., 'A weary inventor', 'A determined revolutionary', 'A conflicted enforcer']",
    "attributes": [
      "hand-painted textures applied to a 3D model",
      "realistic skin with subsurface scattering",
      "detailed, expressive eyes that convey complex emotions"
    ],
    "action": "[Describe a subtle, emotional action, e.g., 'Looking at an old photograph with a sad smile', 'Clenching a fist in quiet determination']"
  },
  "style_and_medium": {
    "medium": "Painterly 3D animation, digital painting, 2D FX on 3D models",
    "artistic_style": "Stylized realism, art nouveau, steampunk, gritty fantasy",
    "quality_descriptors": "Cinematic, atmospheric, emotionally resonant, masterpiece digital painting."
  },
  "lighting": {
    "lighting_style": "Dramatic, cinematic chiaroscuro lighting, heavily influenced by painters like Rembrandt.",
    "mood": "[Describe the mood, e.g., 'Melancholy', 'Serious', 'Intimate', 'Intense']"
  }
}}`;

export const AARDMAN_VIDEO_TEMPLATE = `{{
  "scene_description": "[Provide a brief logline for your video, e.g., 'An 8-second clip of a claymation squirrel trying to bury a giant acorn.']",
  "visual_style_reference": "Classic Aardman Animations stop-motion claymation, high frame rate (animating on ones), physical comedy.",
  "character_performance": {
    "animation_style": "Quirky, handcrafted stop-motion with expressive, non-verbal gestures.",
    "actions": "[Describe the sequence of actions and comedic timing, e.g., 'The character heaves the acorn, stumbles back, and is knocked over when it rolls back.']"
  },
  "camera_dynamics": {
    "movement": "Static shot on a virtual tripod, mimicking a fixed camera on a miniature set.",
    "lens_type": "35mm prime lens, shallow depth of field to emphasize the miniature scale."
  },
  "environment_and_vfx": {
    "setting": "[Describe the miniature setting, e.g., 'A lush green garden patch', 'A cluttered workshop bench']",
    "atmospherics": "Clean, well-lit environment. All effects should appear practical and handmade."
  },
  "technical_specifications": {
    "duration_seconds": "[Enter desired duration, e.g., 8]",
    "frame_rate": 24,
    "resolution": "1920x1080"
  }
}}`;

export const LAIKA_VIDEO_TEMPLATE = `{{
  "scene_description": "[Provide a brief logline for your video, e.g., 'A 10-second suspenseful clip of a puppet character discovering a hidden, magical world.']",
  "visual_style_reference": "Laika's fluid, high-fidelity stop-motion, blending practical sets with subtle digital enhancements.",
  "character_performance": {
    "animation_style": "Fluid and lifelike stop-motion with incredibly subtle and nuanced facial expressions.",
    "actions": "[Describe the character's deliberate movements, e.g., 'The character walks slowly, then stops, head tilting as they notice something off-screen.']"
  },
  "camera_dynamics": {
    "movement": "Slow, creeping dolly shot that follows the character, enhancing the sense of dread and discovery.",
    "lens_type": "28mm wide-angle lens to create depth and slight distortion."
  },
  "environment_and_vfx": {
    "setting": "[Describe the surreal or gothic setting, e.g., 'A forest of twisted, skeletal trees', 'An impossibly tall, dusty library']",
    "atmospherics": "Thick, swirling volumetric fog and dust motes. Subtle digital VFX for glowing elements."
  },
  "technical_specifications": {
    "duration_seconds": "[Enter desired duration, e.g., 10]",
    "frame_rate": 24,
    "resolution": "3840x2160"
  }
}}`;

export const CARTOON_SALOON_VIDEO_TEMPLATE = `{{
  "scene_description": "[Provide a brief logline for your video, e.g., 'A 9-second animation of a magical fox leaving a trail of glowing leaves as it runs.']",
  "visual_style_reference": "Cartoon Saloon's expressive, hand-drawn 2D animation with a multi-plane camera effect for depth.",
  "character_performance": {
    "animation_style": "Lyrical, flowing motion where shapes morph and stretch to emphasize movement.",
    "actions": "[Describe the flowing sequence of actions, e.g., 'The character runs, transforming mid-stride into their animal form, moving seamlessly with the environment.']"
  },
  "camera_dynamics": {
    "movement": "Dynamic tracking shot that moves through layers of the 2D environment, creating a parallax (multi-plane) effect.",
    "lens_type": "Simulated deep focus, where all layers are sharp and clear."
  },
  "environment_and_vfx": {
    "setting": "[Describe the stylized natural environment, e.g., 'A forest of geometric trees', 'An ancient stone circle at sunset']",
    "atmospherics": "Visible, swirling magical energy animated as flowing lines and patterns, like 'wolf-vision'."
  },
  "technical_specifications": {
    "duration_seconds": "[Enter desired duration, e.g., 9]",
    "frame_rate": 24,
    "resolution": "3840x2160"
  }
}}`;

export const SONY_VIDEO_TEMPLATE = `{{
  "scene_description": "[Provide a brief logline for your video, e.g., 'A 7-second, high-octane clip of a character dodging energy blasts in a neon city.']",
  "visual_style_reference": "Sony Pictures Animation's 2D/3D hybrid comic book style, animating on twos for snappy movement.",
  "character_performance": {
    "animation_style": "Posed-to-posed animation on twos (12fps) for characters to create crisp, stylized motion.",
    "actions": "[Describe the explosive, acrobatic movements, e.g., 'The character dodges left, then right, before leaping up, holding the pose mid-air like a comic panel.']"
  },
  "camera_dynamics": {
    "movement": "Rapid, sweeping camera movements that mimic the character's motion, including fast pans and dramatic zooms.",
    "lens_type": "Virtual wide-angle lens with exaggerated perspective."
  },
  "environment_and_vfx": {
    "setting": "[Describe the stylized city or environment, e.g., 'A futuristic cyberpunk city', 'A crumbling ancient temple']",
    "atmospherics": "On-screen text for sound effects ('BOOM!'), Kirby Krackle for energy, and glitching chromatic aberration effects."
  },
  "technical_specifications": {
    "duration_seconds": "[Enter desired duration, e.g., 7]",
    "frame_rate": 24,
    "resolution": "3840x1600"
  }
}}`;

export const FORTICHE_VIDEO_TEMPLATE = `{{
  "scene_description": "[Provide a brief logline for your video, e.g., 'A 12-second, cinematic clip of a character receiving bad news, shown only through their facial expression.']",
  "visual_style_reference": "Fortiche Production's signature 2D/3D blend, emphasizing realistic character performance and atmospheric lighting.",
  "character_performance": {
    "animation_style": "Hyper-realistic, nuanced animation focusing on micro-expressions, darting eyes, and subtle muscle movements in the face.",
    "actions": "[Describe the subtle, emotion-driven action, e.g., 'The characters eyes widen slightly, their brow furrows, and their lips tighten. A single tear wells up.']"
  },
  "camera_dynamics": {
    "movement": "Very slow, almost imperceptible push-in (dolly) or a slight, handheld tremor to enhance intimacy.",
    "lens_type": "85mm cinematic prime lens, creating a very shallow depth of field."
  },
  "environment_and_vfx": {
    "setting": "[Describe the richly detailed background setting (which will be out of focus), e.g., 'A cluttered inventor's workshop', 'An opulent art nouveau room']",
    "atmospherics": "Floating dust particles, soft atmospheric haze, and subtle, glowing particle VFX from a nearby object."
  },
  "technical_specifications": {
    "duration_seconds": "[Enter desired duration, e.g., 12]",
    "frame_rate": 24,
    "resolution": "3840x2160"
  }
}}`;