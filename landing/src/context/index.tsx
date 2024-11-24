import { ReactNode, useMemo } from 'react';
import { UserProvier } from './user-context';
import { AppProvider } from './app-context';
import { PlayerProvider } from './player-context';
import { UserTypes } from '@/types/user-types';

interface Props {
  children: ReactNode;
}

function RootContext({ children }: Props) {
  const providers = useMemo(() => [UserProvier, AppProvider], []);

  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}

export default RootContext;
