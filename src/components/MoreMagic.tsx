
import React from 'react';
import { Presentation, Video, Image } from 'lucide-react';

const magicTools = [
  {
    icon: <Presentation className="w-6 h-6 text-gray-700" />,
    title: 'Magic Presentation',
    description: 'Generate a presentation from a single text prompt.',
  },
  {
    icon: <Video className="w-6 h-6 text-gray-700" />,
    title: 'Magic Design for Video',
    description: 'Create a professional-looking video from your media and a text prompt.',
  },
  {
    icon: <Image className="w-6 h-6 text-gray-700" />,
    title: 'Text to Image',
    description: 'Turn your words into unique images.',
  },
];

const MoreMagic: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F9F9FB]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d0c22]">There's more Magic in Canva</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-12">
          Discover a full suite of AI-powered tools that will help you work faster.
        </p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
          {magicTools.map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                {tool.icon}
                <h3 className="text-lg font-bold text-[#0d0c22]">{tool.title}</h3>
              </div>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          ))}
        </div>
        <button className="text-md font-bold text-white bg-canva-purple px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
          Explore all AI features
        </button>
      </div>
    </section>
  );
};

export default MoreMagic;
  