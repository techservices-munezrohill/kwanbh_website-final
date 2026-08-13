import React from 'react';
import { Heart, Handshake, Users, Briefcase } from 'lucide-react';
import serviceData from '../../content/service.json';

// Icon shown in each section's header. Falls back to Briefcase for any
// section title not listed here.
const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Philanthropy': Heart,
  'Partnerships and Collaborations': Handshake,
  'Community Service': Users,
  'Expert and Professional Partners': Briefcase,
};

const Service = () => {
  const service = serviceData;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {service.pageTitle}
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            {service.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {service.sections.map((section, sIdx) => {
            const Icon = SECTION_ICONS[section.title] ?? Briefcase;
            const allBadgeStyle = section.items.every((item) => !item.description);

            return (
              <div
                key={sIdx}
                className="bg-white rounded-xl shadow-md border border-stone-100 overflow-hidden"
              >
                <div className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-stone-800 to-amber-800 text-white">
                  <Icon className="h-6 w-6" />
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>

                {allBadgeStyle ? (
                  <div className="p-6 flex flex-wrap gap-3">
                    {section.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-4 py-2 bg-stone-100 text-stone-800 rounded-full text-sm font-medium border border-stone-200"
                      >
                        {item.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ul className="divide-y divide-stone-100">
                    {section.items.map((item, iIdx) => (
                      <li key={iIdx} className="px-6 py-4">
                        <p className="font-semibold text-stone-900">{item.title}</p>
                        {item.description && (
                          <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Service;

