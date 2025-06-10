import dynamic from 'next/dynamic';
import  LoadingSpinner  from './Hero';

const Hero = dynamic(() => import('./Hero'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default Hero;