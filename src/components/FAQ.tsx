
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';

type FaqItem = { question: string; answer: string };
const defaultFaq: FaqItem[] = [
  {
    question: 'What is an AI design generator?',
    answer:
      'An AI design generator, like Magic Design, creates professional-quality, custom designs from a simple text prompt or your own media. It analyzes your prompt and generates a selection of templates for you to choose from and customize.',
  },
  {
    question: 'How do I use Canva’s AI design generator?',
    answer:
      'To use Magic Design, simply open Canva and look for the Magic Design feature. Enter a text prompt describing what you want to create, and the AI will generate design options for you. You can then edit and refine the chosen design.',
  },
  {
    question: 'What can I create with an AI design generator?',
    answer:
      'You can create a wide range of visual content, including social media posts, presentations, posters, flyers, invitations, and more. The possibilities are vast, and the AI helps you get started quickly with a solid design foundation.',
  },
  {
    question: 'Is the AI design generator free to use?',
    answer:
      'Canva offers a free tier that includes access to many features, including a certain number of uses for Magic Design. For more extensive use and access to premium features, you may need to subscribe to Canva Pro or Canva for Teams.',
  },
];

const AccordionItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold text-[#0d0c22]">{item.question}</h3>
        {isOpen ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-700">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const cfg = useConfig();
  const faqData: FaqItem[] = (cfg?.extra?.faq?.items as FaqItem[]) || defaultFaq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#0d0c22]">
          {cfg?.extra?.faq?.heading || 'Frequently asked questions'}
        </h2>
        <div>
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
  