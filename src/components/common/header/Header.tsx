import ShowBackLogo from './_component/ShowBackLogo';
import ShowSearchCart from './_component/ShowSearchCart';

type HeaderProps = {
  headerTitle?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
};

const Header = ({
  headerTitle,
  showBackButton = true,
  showLogo = false,
  showSearch = true,
  showCart = true
}: HeaderProps) => {
  return (
    //TODO mic md:hidden, 빈 div justify-between 유지
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between pt-5 pb-2 px-3 bg-normal md:hidden">
      <ShowBackLogo showBackButton={showBackButton} showLogo={showLogo} />
      <div className="flex items-center">{headerTitle}</div>
      <ShowSearchCart showSearch={showSearch} showCart={showCart} />
    </div>
  );
};

export default Header;
