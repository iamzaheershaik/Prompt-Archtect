import React, { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange, maxImages = 3 }) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} image(s).`);
      return;
    }

    const newImages: string[] = [];
    const filePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
            if (!file.type.startsWith('image/')) {
                setError('Only image files are allowed.');
                reject(new Error('Invalid file type'));
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result as string);
            };
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    });

    Promise.all(filePromises).then(results => {
        const updatedImages = [...images, ...results];
        setImages(updatedImages);
        onImagesChange(updatedImages);
    }).catch(err => {
        console.error("Error reading files:", err);
    });
    
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }

  }, [images, onImagesChange, maxImages]);

  const removeImage = useCallback((index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  }, [images, onImagesChange]);

  return (
    <div className="space-y-3">
        <div className="flex items-center space-x-2">
            <h3 className="text-md font-bold text-gray-200">Image Reference (Optional)</h3>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full font-bold">AI Analysis</span>
        </div>
        <p className="text-xs text-gray-400 -mt-2">Upload up to {maxImages} image(s) to guide the AI's style, mood, and composition choices.</p>
        
        <div className={`grid grid-cols-${Math.max(images.length + 1, 3)} gap-3`}>
            {images.map((src, index) => (
                <div key={index} className="relative group aspect-square">
                <img src={src} alt={`Reference ${index + 1}`} className="w-full h-full object-cover rounded-lg border-2 border-gray-600"/>
                <button 
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove image ${index + 1}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            ))}
            {images.length < maxImages && (
                <label className="flex items-center justify-center aspect-square border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-gray-800/50 transition-colors">
                <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="mt-1 text-xs block">Add Image</span>
                </div>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                </label>
            )}
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUploader;