
import React from 'react';
import { Wand2, Type, Scan, Languages, Eraser, Music } from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="w-8 h-8 text-canva-purple" />,
    title: 'Magic Design',
    description: 'Generate unique designs from a text prompt or your own media.',
  },
  {
    icon: <Type className="w-8 h-8 text-canva-purple" />,
    title: 'Magic Write',
    description: 'Your AI-powered writing assistant.',
  },
  {
    icon: <Scan className="w-8 h-8 text-canva-purple" />,
    title: 'Magic Edit',
    description: 'Add, replace, or edit anything in your image with a simple text prompt.',
  },
  {
    icon: <Languages className="w-8 h-8 text-canva-purple" />,
    title: 'Translate',
    description: 'Automatically translate the text in your design.',
  },
  {
    icon: <Eraser className="w-8 h-8 text-canva-purple" />,
    title: 'Magic Eraser',
    description: 'Remove unwanted objects from your photos.',
  },
  {
    icon: <Music className="w-8 h-8 text-canva-purple" />,
    title: 'Beat Sync',
    description: 'Automatically sync your footage to the beat of your music.',
  },
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-6 p-4">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#0d0c22]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
  