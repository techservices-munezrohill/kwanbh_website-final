import React from 'react';
import { Download, Award, Calendar, MapPin, Heart, Scale, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {

  // 1. Define the path to your image
  const profilePhotoPath = import.meta.env.BASE_URL + 'kwanbh-photo.jpg';

  const keyAchievements = [
    {
      year: '2025',
      title: 'Ruth Shonle Cavan Young Scholar Award',
      description: 'American Society of Criminology’s most prestigious award for early career scholars, recognizing outstanding contributions to criminological theory and research'
    },
    {
      year: '2020',
      title: 'Doctoral Achievement',
      description: 'Completed Ph.D. in Criminal Justice while maintaining active community advocacy and developing groundbreaking research on identity and justice'
    }
  ];

  const personalValues = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Faith & Justice',
      description: 'My Christian faith calls me to work for justice and healing, seeing each person as made in the image of God with inherent dignity and worth.'
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: 'Lived Experience',
      description: 'As a Black, queer person, I bring personal understanding of marginalization to my work, grounding scholarship in authentic experience.'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Liberation Through Learning',
      description: 'I believe knowledge should serve freedom—both personal liberation and collective transformation of unjust systems.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Dr. Kwan‑Lamar Blount‑Hill
              </h1>
              <p className="text-xl text-stone-300 mb-6 leading-relaxed">
                I am a Black, queer, Christian criminologist, attorney, and advocate dedicated to 
                advancing justice through scholarship, teaching, and community engagement.
              </p>
              <p className="text-lg text-stone-300 mb-8 leading-relaxed">
                My work centers on decolonizing criminology, advancing LGBTQ+ justice, and connecting 
                environmental harm with social justice. I believe in scholarship that serves communities 
                and education that transforms both minds and systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/cv"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>View Full CV</span>
                </Link>
              </div>
            </div>
            
            {/* MODIFIED IMAGE BLOCK */}
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-600 to-stone-700 rounded-2xl h-[550px] w-full overflow-hidden shadow-2xl"> {/* HEIGHT INCREASED TO 550PX */}
                <img 
                  src={profilePhotoPath} 
                  alt="Dr. Kwan-Lamar Blount-Hill Professional Headshot" 
                  className="w-full h-full object-cover object-top transition-all duration-300 hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Personal Values
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              The personal foundations that shape who I am and guide my work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalValues.map((value, index) => (
              <div key={index} className="bg-stone-50 p-8 rounded-xl shadow-lg text-center">
                <div className="text-amber-700 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Key Milestones Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Key Milestones
            </h2>
            <p className="text-xl text-stone-600">
              Defining moments in my journey as a scholar and advocate
            </p>
          </div>
          
          <div className="space-y-8">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="bg-amber-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-stone-900">
                      {achievement.title}
                    </h3>
                    <span className="text-amber-700 font-medium">{achievement.year}</span>
                </div>
                  <p className="text-stone-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Journey */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              My Journey
            </h2>
            <p className="text-xl text-stone-600">
              The personal experiences and pivotal moments that shaped my calling
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Early Foundations</h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-4">
                Growing up as a Black, queer person in America, I experienced firsthand the 
                intersections of identity, oppression, and resilience. These experiences weren't 
                just academic concepts—they were my reality.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                My Christian faith became both anchor and compass, teaching me that justice 
                work is sacred work, and that each person carries inherent dignity worthy 
                of protection and advocacy.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Academic Calling</h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-4">
                My path to criminology wasn't traditional. Personal encounters with injustice 
                sparked questions I couldn't ignore: Why do certain communities bear the brunt 
                of criminalization? How can systems designed to protect actually heal?
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Law school at Emory University gave me tools for advocacy, while my environmental 
                science background at Tuskegee University taught me to see connections between 
                social and ecological justice.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-stone-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center">Today's Mission</h3>
            <p className="text-lg text-stone-600 leading-relaxed mb-4 text-center">
              My doctoral work at John Jay College allowed me to develop the theoretical frameworks 
              I'd been searching for—ways to center marginalized voices and lived experiences in 
              criminological scholarship.
            </p>
            <blockquote className="text-xl text-stone-700 leading-relaxed italic text-center border-l-4 border-amber-600 pl-6">
              "I continue to bridge the worlds of academia, advocacy, and community organizing, 
              always asking: How can our work contribute to liberation and healing? How can we 
              transform systems rather than simply reform them?"
            </blockquote>
            <p className="text-center text-stone-600 mt-4 font-medium">
              This question drives everything I do—from the classroom to the courtroom to community spaces.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
