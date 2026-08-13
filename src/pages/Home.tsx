import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Scale, Heart } from 'lucide-react';
import homeData from '../../content/home.json';

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statValues, setStatValues] = useState([0, 0, 0, 0]);
  const heroText = homeData.heroTitle || 'Dr. Kwan-Lamar Blount-Hill';

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 100; // milliseconds per character
    const text = heroText;
    const typeWriter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        setTimeout(() => setShowCursor(false), 500);
        setTimeout(() => setShowSubtitle(true), 300);
        setTimeout(() => setShowDescription(true), 800);
        setTimeout(() => setShowButtons(true), 1300);
        setTimeout(() => setShowImage(true), 400);
      }
    };
    const startDelay = setTimeout(typeWriter, 500);
    return () => clearTimeout(startDelay);
  }, [heroText]);

  const home = homeData as typeof homeData & {
    subtitle?: string;
    description?: string;
    ctaHeading?: string;
    ctaSubtext?: string;
  };

  const stats = (home as any).stats ?? homeData.stats;
  const mission = (home as any).mission ?? homeData.mission;

  // Scroll observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  // Counter animation function
  const animateStats = () => {
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    
    let frame = 0;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      
      setStatValues(stats.map((stat) => {
        return Math.min(stat.targetValue * easeProgress, stat.targetValue);
      }));
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Format stat value for display
  const formatStatValue = (value: number, stat: any) => {
    if (stat.prefix === '$') {
      return `${stat.prefix}${value.toFixed(1)}${stat.suffix}`;
    }
    return `${stat.prefix}${Math.floor(value)}${stat.suffix}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800 text-white pt-4 pb-4 lg:pt-6 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2 lg:mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="flex flex-col justify-start space-y-4 order-2 lg:order-1 lg:max-w-2xl pr-0 lg:pr-12">
              {/* Animated Name */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight min-h-[4rem] lg:min-h-[5rem]">
                <span className="inline-block">
                  {displayedText}
                  {showCursor && <span className="animate-pulse text-amber-400">|</span>}
                </span>
              </h1>
              {/* Animated Subtitle */}
              <div className={`transition-all duration-700 ease-out transform ${
                showSubtitle 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-xl sm:text-2xl md:text-3xl text-amber-200 font-light">
                  {home.subtitle || 'Scholar. Reformer. Developer. Advocate.'}
                </p>
              </div>
              {/* Animated Description */}
              <div className={`transition-all duration-700 ease-out transform ${
                showDescription 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl">
                  {home.description || 'Justice scholar, professor, researcher, and advocate for social, economic, and ecological justice. Advancing transformative scholarship that centers fairness, equity, and empowers the vulnerable.'}
                </p>
              </div>
              {/* Animated Buttons */}
              <div className={`transition-all duration-700 ease-out transform ${
                showButtons 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2 mb-0">
                  <Link
                    to="/cv"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span>Explore Research</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-stone-900 px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-center hover:shadow-lg hover:-translate-y-1"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>

              {/* Stats under hero buttons */}
              <div
                id="stats-section"
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-left transform transition-all duration-700 ease-out ${
                      statsAnimated
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-4 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-amber-300">
                      {statsAnimated ? formatStatValue(statValues[index], stat) : '0'}
                    </div>
                    <div className="text-sm text-stone-200 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Animated Image */}
            <div className={`flex justify-center items-start order-1 lg:order-2 transition-all duration-1000 ease-out transform ${
              showImage 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="relative w-full flex-shrink-0 max-w-xs md:max-w-sm lg:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">

                <img
                src={(home as any).heroImage || '/uploads/kwanbh-photo.jpg'}
                  alt="Dr. Kwan-Lamar Blount-Hill professional"
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mission Elegant Card */}
      <section className="py-10 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="bg-white rounded-none lg:rounded-2xl shadow-xl overflow-hidden">
              <div className="flex">
                <div className="hidden lg:block w-1 bg-amber-500" />
                <div className="w-full px-6 md:px-8 py-6 md:py-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-3">My Mission</h2>
                  <div className="prose prose-stone max-w-3xl text-base md:text-lg leading-relaxed">
                    {(mission || []).map((paragraph: string, index: number) => (
                      <p key={index} className={index === 0 ? 'text-base md:text-lg font-medium mb-2' : 'mb-2'}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link to="/about" className="inline-block text-amber-700 font-semibold hover:underline">Learn more about my work</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Recent Work Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Recent Work
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Recent research, publications, and advocacy initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {((home as any).recentWork ?? []).map((item: any, index: number) => (
              <React.Fragment key={index}>
                {(() => {
                  const cardClass = "bg-gray-100 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg block";
                  const isExternal = item.link.startsWith('http');

                  const cardContent = (
                    <>
                      <div className="h-48 overflow-hidden relative bg-gray-200">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className={`bg-gradient-to-br ${item.color} w-full h-full`}></div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-stone-900 mb-2 italic">
                          {item.title}
                        </h3>
                        <p className="text-stone-600 mb-4 italic">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">{item.type}</span>
                          <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-sm">{item.year}</span>
                        </div>
                      </div>
                    </>
                  );

                  if (isExternal) {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardClass}
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <Link to={item.link} className={cardClass}>
                      {cardContent}
                    </Link>
                  );
                })()}
              </React.Fragment>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/cv"
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>View Full CV</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {home.ctaHeading || 'Collaborate on Justice-Centered Work'}
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            {home.ctaSubtext || 'Interested in research collaboration, scheduling speaking engagements, or working with Kwan on community empowerment or justice initiatives?'}
          </p>
          <Link
            to="/contact"
            className="bg-white text-amber-700 hover:bg-stone-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;