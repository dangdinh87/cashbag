import AppImage from '@/components/app/app-image';
import { AssetConst } from '@/configs';

function AnimateLogo() {
  return (
    <>
      <div className="box-center-affiliate">
        <AppImage
          src={AssetConst.image.redirectLogo}
          className="image-center-affiliate"
        />
      </div>
      <div className="circle circle1" />
      <div className="circle circle2" />
    </>
  );
}

export default AnimateLogo;
