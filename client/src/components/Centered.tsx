import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Centered: React.FC<Props> = ({ children }) => {
  return (
    <div className="fixed w-screen h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-center h-full w-full items-center">
        {children}
      </div>
    </div>
  );
};
