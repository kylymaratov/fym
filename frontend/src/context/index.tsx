'use client';

import { ReactNode, useMemo } from 'react';
import { AppProvider } from './AppContext';
import { PlayerProvider } from './PlayerContext';

interface Props {
  children: ReactNode;
}

function RootContext({ children }: Props) {
  const providers = useMemo(() => [AppProvider, PlayerProvider], []);

  return providers.reduceRight(
    (acc, Provider) => <Provider>{children}</Provider>,
    children,
  );
}

export default RootContext;
