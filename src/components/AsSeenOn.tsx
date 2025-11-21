
import React from 'react';

const AsSeenOn: React.FC = () => {
  const logos = ['Forbes', 'The Hollywood Reporter', 'Fast Company', 'The Verge', 'TechCrunch'];

  return (
    <section className="py-8 md:py-12 bg-[#F9F9FB]">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold tracking-widest text-gray-500 mb-6">AS SEEN ON</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {logos.map((logo) => (
            <span key={logo} className="text-lg font-semibold text-gray-400 italic">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsSeenOn;
  