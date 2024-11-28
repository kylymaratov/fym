import { ReactNode, useMemo } from 'react';
import { UserProvider } from './UserContext';
import { AppProvider } from './AppContext';

interface Props {
  children: ReactNode;
}

function RootContext({ children }: Props) {
  const providers = useMemo(() => [UserProvider, AppProvider], []);

  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}

export default RootContext;
