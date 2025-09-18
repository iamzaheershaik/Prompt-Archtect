import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { HistoryItem, ImageHistoryItem, PromptHistoryItem, VideoHistoryItem, HistoryContextType } from '../types';

const HISTORY_KEY = 'aiPromptArchitectHistory';

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const getHistoryFromStorage = (): HistoryItem[] => {
    try {
        const storedHistory = localStorage.getItem(HISTORY_KEY);
        if (storedHistory) {
            const parsed = JSON.parse(storedHistory);
            return Array.isArray(parsed) ? parsed : [];
        }
    } catch (error) {
        console.error("Failed to parse history from localStorage", error);
        localStorage.removeItem(HISTORY_KEY);
        return [];
    }
    return [];
};

const saveHistoryToStorage = (history: HistoryItem[]): void => {
    try {
        const limitedHistory = history.slice(0, 100);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
        console.error("Failed to save history to localStorage", error);
    }
};

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        setHistory(getHistoryFromStorage());
    }, []);

    const addItemToHistory = useCallback((item: Omit<ImageHistoryItem, 'id' | 'timestamp'> | Omit<PromptHistoryItem, 'id' | 'timestamp'> | Omit<VideoHistoryItem, 'id' | 'timestamp'>) => {
        const newHistoryItem: HistoryItem = {
            ...item,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        } as HistoryItem;

        setHistory(prevHistory => {
            const updatedHistory = [newHistoryItem, ...prevHistory];
            saveHistoryToStorage(updatedHistory);
            return updatedHistory;
        });
    }, []);

    const deleteHistoryItem = useCallback((id: string) => {
        setHistory(prevHistory => {
            const updatedHistory = prevHistory.filter(item => item.id !== id);
            saveHistoryToStorage(updatedHistory);
            return updatedHistory;
        });
    }, []);

    return (
        <HistoryContext.Provider value={{ history, addItemToHistory, deleteHistoryItem }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = (): HistoryContextType => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};