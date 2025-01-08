export default function Features() {
      const features = [
        {
          icon: '📞',
          title: 'Automated Call Handling',
          description: 'Let our AI handle your calls 24/7, ensuring no customer is left unattended.',
        },
        {
          icon: '📊',
          title: 'Integrated CRM',
          description: 'Seamlessly integrate with your CRM to manage customer interactions efficiently.',
        },
        {
          icon: '🎙️',
          title: 'Custom AI Voices',
          description: 'Choose from a variety of AI voices to match your brand personality.',
        },
        {
          icon: '📈',
          title: 'In-depth Volume & Metrics Report',
          description: 'Get detailed analytics on call volumes, customer satisfaction, and more.',
        },
      ];

      return (
        <div className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose VocalHost.ai?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
