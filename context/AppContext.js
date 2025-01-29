import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  const [moodData, setMoodData] = useState([]); // For mood tracking
  const [journalEntries, setJournalEntries] = useState([]); // For journal entries
  const [gratitudeEntries, setGratitudeEntries] = useState([]); // For gratitude logs

  return (
    <AppContext.Provider
      value={{
        moodData,
        setMoodData,
        journalEntries,
        setJournalEntries,
        gratitudeEntries,
        setGratitudeEntries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};