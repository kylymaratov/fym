import LogoPng from '@/assets/images/logo.png';

export const Logo = () => {
  return (
    <div className="flex items-center justify-start">
      <img src={LogoPng} alt="logo" loading="lazy" width={120} height={70} />
    </div>
  );
};
