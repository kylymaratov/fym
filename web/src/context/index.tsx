import { ReactNode, useMemo } from 'react';
import { UserProvier } from './user-context';
import { AppProvider } from './app-context';
import { PlayerProvider } from './player-context';
import { UserTypes } from '@/types/user-types';

interface Props {
  children: ReactNode;
  user?: UserTypes;
}

function RootContext({ children, user }: Props) {
  const providers = useMemo(
    () => [UserProvier, AppProvider, PlayerProvider],
    [],
  );

  return providers.reduceRight(
    (acc, Provider) => <Provider user={user}>{acc}</Provider>,
    children,
  );
}

export default RootContext;
