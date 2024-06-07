import { privacyData } from "@/tools/constants/Data";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 w-full py-16">
   <main className="w-[80%] m-auto">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Privacy Policy
          </h2>
          <div className="prose prose-lg max-w-none">
            {privacyData.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
   </main>
    </div>
  );
};

export default PrivacyPolicy;