import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Centered: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
      {children}
    </div>
  );
};
