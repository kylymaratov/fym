import { ReactNode, useMemo } from 'react';
import { UserProvier } from './context/UserContext';
import { AppProvider } from './context/AppContext';
import { PlayerProvider } from './context/PlayerContext';

interface Props {
  children: ReactNode;
}

function RootContext({ children }: Props) {
  const providers = useMemo(
    () => [UserProvier, AppProvider, PlayerProvider],
    [],
  );

  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}

export default RootContext;
