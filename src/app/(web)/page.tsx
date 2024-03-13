import FeaturedSpace from '@/components/FeaturedSpace/FeaturedSpace';
import FeaturedRoom from '@/components/FeaturedSpace/FeaturedSpace';
import Gallery from '@/components/Gallery/Gallery';
import HeroSection from '@/components/HeroSection/HeroSection';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import PageSearch from '@/components/PageSearch/PageSearch';
import { getFeaturedSpace } from '@/libs/apis';


const Home = async () => {
 const featuredSpace = await getFeaturedSpace();
 console.log(featuredSpace)
  return (
    <>

      <HeroSection />
      <PageSearch/>
      <FeaturedSpace featuredSpace={featuredSpace} />
      <Gallery/>
      <NewsLetter/>

    </>
  );
};

export default Home;