import { SongTypes } from '@/types/song.types';
import { createContext, ReactNode, useState } from 'react';

interface SearchContextState {
  state: {
    searchQuery: string;
    searchResult: SongTypes[];
  };
  setSearchState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: SearchContextState = {
  state: {
    searchQuery: '',
    searchResult: [],
  },
  setSearchState: () => {},
};

const SearchContext = createContext<SearchContextState>(defaultValue);

function SearchProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

  const setSearchState = <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => {
    setState((prevState) => ({ ...prevState, [action]: value }));
  };

  return (
    <SearchContext.Provider value={{ state, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchProvider, SearchContext };
