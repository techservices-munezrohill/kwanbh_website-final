import React from 'react';
import { Download, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutData from '../../content/about.json';

const About = () => {
  const about = aboutData;

  const profilePhotoPath = (about as any).profileImage || '/uploads/kwanbh-photo.jpg';
  const keyAchievements = about.keyAchievements || [];

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-width heading */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">{about.heroTitle}</h1>
          </div>

          {/* Clearfix container to hold the floating layout */}
          <div className="flow-root">
            
            {/* Image: Widened and floated to the right to fill the highlighted box area */}
            <div className="w-full sm:w-[400px] md:w-[450px] h-[380px] mb-6 sm:mb-4 sm:ml-8 lg:ml-12 float-none sm:float-right">
              <img
                src={profilePhotoPath}
                alt="Dr. Kwan-Lamar Blount-Hill"
                className="w-full h-full rounded-2xl object-cover object-top shadow-xl"
              />
            </div>

            {/* Text Content: Wraps dynamically around and below the image */}
            <div className="text-stone-300">
              <p className="text-xl mb-6 leading-relaxed">{about.heroBio1}</p>
              <p className="text-lg mb-8 leading-relaxed">{about.heroBio2}</p>

              {/* Action Buttons */}
              <div className="clear-both sm:clear-none flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/cv"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>View Full CV</span>
                </Link>

                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
                >
                  Contact
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Key Milestones</h2>
            <p className="text-xl text-stone-600">Defining moments in my journey as a scholar and advocate</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="bg-amber-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-stone-900">{achievement.title}</h3>
                    <span className="text-amber-700 font-medium">{achievement.year}</span>
                  </div>
                  <p className="text-stone-600">
                    {achievement.description}{' '}
                    {achievement.link && (
                      <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="text-amber-700 ml-2">
                        Learn more
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;