import { loadStripe } from '@stripe/stripe-js';
    import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    const PaymentForm = ({ onSuccess }) => {
      const stripe = useStripe();
      const elements = useElements();

      const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

        if (error) {
          console.error('Error creating payment method:', error);
          alert('Payment failed. Please try again.');
          return;
        }

        // Call your backend to confirm the payment
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 2900 }), // $29.00 in cents
        });

        const { clientSecret } = await response.json();

        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          console.error('Error confirming payment:', confirmError);
          alert('Payment failed. Please try again.');
          return;
        }

        onSuccess();
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement className="p-3 border border-gray-300 rounded-lg" />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:shadow-lg"
          >
            Pay Now
          </button>
        </form>
      );
    };

    export default function StripePayment({ onSuccess }) {
      return (
        <Elements stripe={stripePromise}>
          <PaymentForm onSuccess={onSuccess} />
        </Elements>
      );
    }
