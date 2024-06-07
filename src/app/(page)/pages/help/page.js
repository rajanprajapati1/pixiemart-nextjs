import { faqData } from '@/tools/constants/Data';
import React from 'react';

const FAQSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqData?.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                 {section?.title}
                </h3>
                <div className="space-y-4">
                  {section?.questions.map((question, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {question.question}
                      </h4>
                      <p className="text-gray-700">{question.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;