/* Components */
import LogoBox from "./LogoBox";
import AdsBox from "./AdsBox";
import ImgCarousel from "../../Card/ImgCarousel";



function LogoAdsSection({imageLinks}) {
    
    return (
        <section className="sect-mn sect-logo-ads-main">
            <LogoBox/>  {/* box logo */}
            {/* <AdsBox/> */} {/* box big-ads */}
            <ImgCarousel images={imageLinks} /> 
        </section>
    );
}

export default LogoAdsSection;
