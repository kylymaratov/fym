import RadioIcon from '@/assets/icons/radio.svg';
import BannerImg from '@/assets/images/banner.png';
import ProfileBadge from '@/components/ProfileBadge';
import SearchField from '@/components/SearchField';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLazyGetRandomSongsQuery } from '@/api/song.api';
import { toast } from 'react-toastify';
import { playerActions } from '@/store/slices/player.slice';

function HomeNavbar() {
  const { user } = useAppSelector((state) => state.user);
  const { playNow } = useAppSelector((state) => state.player);
  const [gerRandomSong] = useLazyGetRandomSongsQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const playRandomSong = async () => {
    try {
      if (playNow) return;
      const randomSongs = await gerRandomSong('?limit=1').unwrap();

      if (!randomSongs.songs.length) return;

      dispatch(playerActions.setPlayNow(randomSongs.songs[0]));
    } catch (error) {
      toast((error as Error).message, { type: 'error' });
    }
  };

  return (
    <div className="px-2 py-4 lg:px-4 lg:py-6 h-[450px] relative overflow-hidden">
      <div className="absolute w-0 lg:w-[37%] bg-secondary h-[120%] z-20 -top-10 left-20 opacity-100 blur-lg"></div>
      {playNow ? (
        <img
          src={`https://i.ytimg.com/vi/${playNow.song_id}/mqdefault.jpg`}
          loading="lazy"
          alt="bg"
          className="absolute select-none pointer-events-none z-10 top-0 right-0 w-full lg:w-[70%] opacity-50 object-cover h-[110%]"
        />
      ) : (
        <img
          src={BannerImg}
          loading="lazy"
          alt="banner"
          className="absolute select-none pointer-events-none z-10 top-0 right-0 w-[70%] opacity-50 object-cover h-[110%]"
        />
      )}
      <div className="z-30 relative h-full">
        <div className="flex h-[40px] justify-between">
          <div className="w-[80%] xl:w-1/3">
            <div
              onClick={() => navigate('/search')}
              className="cursor-pointer h-full"
            >
              <SearchField />
            </div>
          </div>
          <div>
            {user ? (
              <div>
                <ProfileBadge />
              </div>
            ) : (
              <Link
                to="/login"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="text-sm text-center relative p-1 lg:p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login / Signup
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="mt-[50px] w-full xl:w-[30%]">
          <h1 className="font-bold text-3xl text-gray-200">
            {user
              ? ` Welcome back, ${user.user_info?.name || 'User'}`
              : 'Welcome to Songfiy'}
            !
          </h1>
          <p className="text-md mt-4 text-gray-200">
            Discover a world of limitless music! Like, share, create playlists,
            and enjoy your favorite tracks anytime, anywhere. Music is the
            rhythm of your life, and we are your ultimate music platform! Here,
            everyone can find their melody to get inspired, dream, and keep
            moving forward.
          </p>

          <div className="absolute bottom-0 flex justify-between items-center w-full lg:w-[37%]">
            <button
              onClick={playRandomSong}
              type="button"
              className=" uppercase text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Listen now
            </button>
            <img src={RadioIcon} alt="radio" className="opacity-80 -mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNavbar;
