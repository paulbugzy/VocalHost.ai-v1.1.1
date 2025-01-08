import Link from 'next/link';

    export default function Pricing() {
      const plans = [
        {
          name: 'Basic',
          price: '$29/month',
          features: ['100 Call Minutes', 'Basic CRM Integration', 'Standard AI Voice'],
          cta: 'Get Started',
          highlight: false,
        },
        {
          name: 'Standard',
          price: '$59/month',
          features: ['500 Call Minutes', 'Advanced CRM Integration', 'Custom AI Voice', 'Basic Analytics'],
          cta: 'Get Started',
          highlight: true,
        },
        {
          name: 'Premium',
          price: '$99/month',
          features: ['Unlimited Call Minutes', 'Full CRM Integration', 'Custom AI Voice', 'Advanced Analytics', 'Priority Support'],
          cta: 'Get Started',
          highlight: false,
        },
      ];

      return (
        <div className="min-h-screen py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md ${
                    plan.highlight ? 'border-2 border-blue-500 transform scale-105' : ''
                  }`}
                >
                  <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold text-center mb-6">{plan.price}</p>
                  <ul className="mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-gray-600 mb-2">
                        ✔️ {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`block text-center px-6 py-3 rounded-lg ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
