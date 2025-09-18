import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CustomTemplate, CustomTemplatesContextType } from '../types';

const TEMPLATES_KEY = 'aiPromptArchitectCustomTemplates';

const CustomTemplatesContext = createContext<CustomTemplatesContextType | undefined>(undefined);

const getTemplatesFromStorage = (): CustomTemplate[] => {
    try {
        const stored = localStorage.getItem(TEMPLATES_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        }
    } catch (error) {
        console.error("Failed to parse custom templates from localStorage", error);
        localStorage.removeItem(TEMPLATES_KEY);
        return [];
    }
    return [];
};

const saveTemplatesToStorage = (templates: CustomTemplate[]): void => {
    try {
        localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    } catch (error) {
        console.error("Failed to save custom templates to localStorage", error);
    }
};

export const CustomTemplatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [templates, setTemplates] = useState<CustomTemplate[]>([]);

    useEffect(() => {
        setTemplates(getTemplatesFromStorage());
    }, []);

    const saveTemplate = useCallback((template: Omit<CustomTemplate, 'id'> & { id?: string }) => {
        setTemplates(prevTemplates => {
            let updatedTemplates;
            if (template.id) {
                // Update existing
                updatedTemplates = prevTemplates.map(t => t.id === template.id ? { ...t, ...template } as CustomTemplate : t);
            } else {
                // Add new
                const newTemplate: CustomTemplate = {
                    ...template,
                    id: crypto.randomUUID(),
                };
                updatedTemplates = [newTemplate, ...prevTemplates];
            }
            saveTemplatesToStorage(updatedTemplates);
            return updatedTemplates;
        });
    }, []);

    const deleteTemplate = useCallback((id: string) => {
        setTemplates(prevTemplates => {
            const updatedTemplates = prevTemplates.filter(t => t.id !== id);
            saveTemplatesToStorage(updatedTemplates);
            return updatedTemplates;
        });
    }, []);

    return (
        <CustomTemplatesContext.Provider value={{ templates, saveTemplate, deleteTemplate }}>
            {children}
        </CustomTemplatesContext.Provider>
    );
};

export const useCustomTemplates = (): CustomTemplatesContextType => {
    const context = useContext(CustomTemplatesContext);
    if (context === undefined) {
        throw new Error('useCustomTemplates must be used within a CustomTemplatesProvider');
    }
    return context;
};
