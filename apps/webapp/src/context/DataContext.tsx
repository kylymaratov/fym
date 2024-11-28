import { createContext, ReactNode, useState } from 'react';

interface DataItem<T> {
  data: T;
  url: string;
}

export interface DataContextState<T> {
  state: Record<string, DataItem<T>>;
  setDataState: <K extends keyof Record<string, DataItem<T>>>(
    key: K,
    value: DataItem<T>,
  ) => void;
}

const dataDefaultValue: DataContextState<any> = {
  state: {},
  setDataState: () => {},
};

const DataContext = createContext<DataContextState<any>>(dataDefaultValue);

function DataProvider<T>({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Record<string, DataItem<T>>>({});

  const setDataState = <K extends keyof Record<string, DataItem<T>>>(
    key: K,
    value: DataItem<T>,
  ) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <DataContext.Provider value={{ state, setDataState }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider, DataContext };
