export const Footer = () => {
  return (
    <div className="bg-secondary py-10 px-4 mt-14 rounded-md">
      <div>
        <p className="text-sm text-gray-300 italic">Develop by @Kylym</p>
        {/* <p className="text-sm mt-2">
          Contact with me:{' '}
          <a className="text-blue-500" href="https://t.me/kylymaratov">
            Telegram
          </a>
        </p> */}
        <a
          href="https://t.me/songfiy"
          className="text-sm italic text-blue-500"
          target="_blank"
        >
          News channel {'->'}
        </a>
      </div>
    </div>
  );
};
