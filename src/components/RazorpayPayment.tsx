import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, CheckCircle, Loader2, Shield } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  formData: any;
  onSuccess: () => void;
  onFailure: (error: string) => void;
  amount?: number;
}

const RazorpayPayment = ({ 
  formData, 
  onSuccess, 
  onFailure, 
  amount = 23992 
}: RazorpayPaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  // Razorpay configuration
  const RAZORPAY_CONFIG = {
    key_id: 'rzp_live_SmpiBiYRrRrh0n',
    currency: 'INR',
    name: 'Global Pass Career Consultancy',
    description: 'Application Fee',
    image: '/logo.png',
    theme: {
      color: '#FF9933' // Saffron color for Indian theme
    }
  };

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('processing');
      setError('');

      // Create order data
      const orderData = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: RAZORPAY_CONFIG.currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          course: formData.selectedCourse,
          school: formData.selectedSchool,
          email: formData.email,
          phone: formData.phone
        }
      };

      // For now, we'll create a direct payment without backend order creation
      // In production, you should create order on your backend first
      openRazorpayCheckout(orderData);

    } catch (err: any) {
      setError(err.message || 'Failed to create payment order');
      setPaymentStatus('error');
      setIsLoading(false);
      onFailure(err.message || 'Payment failed');
    }
  };

  const openRazorpayCheckout = (orderData: any) => {
    if (!window.Razorpay) {
      setError('Payment gateway not loaded');
      setPaymentStatus('error');
      setIsLoading(false);
      onFailure('Payment gateway not loaded');
      return;
    }

    const options = {
      key: RAZORPAY_CONFIG.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: RAZORPAY_CONFIG.name,
      description: `${RAZORPAY_CONFIG.description} - ${formData.selectedCourse}`,
      image: RAZORPAY_CONFIG.image,
      order_id: undefined, // Set this if you create order on backend
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      notes: orderData.notes,
      theme: RAZORPAY_CONFIG.theme,
      handler: function (response: any) {
        // Payment success
        console.log('Payment successful:', response);
        setPaymentStatus('success');
        setIsLoading(false);
        onSuccess();
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
          setPaymentStatus('idle');
          setIsLoading(false);
        }
      },
      retry: {
        enabled: false
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response);
        setError(response.error.description || 'Payment failed. Please try again.');
        setPaymentStatus('error');
        setIsLoading(false);
        onFailure(response.error.description || 'Payment failed');
      });
      rzp.open();
    } catch (error) {
      console.error('Error opening payment modal:', error);
      setError('Failed to open payment gateway');
      setPaymentStatus('error');
      setIsLoading(false);
      onFailure('Failed to open payment gateway');
    }
  };

  const handlePayment = () => {
    if (paymentStatus === 'processing') return;
    createOrder();
  };

  return (
    <div className="w-full">
      {paymentStatus === 'idle' && (
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Secure Payment</h4>
            <p className="text-slate-600">Pay securely via Razorpay Payment Gateway</p>
          </div>
          
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-orange-500/25 px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay ₹{amount.toLocaleString('en-IN')}
              </>
            )}
          </Button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4" />
            <span>Secured by Razorpay</span>
          </div>
        </div>
      )}

      {paymentStatus === 'processing' && (
        <div className="text-center py-8">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h4>
          <p className="text-slate-600">Please wait while we process your payment...</p>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h4>
          <p className="text-slate-600">Your payment has been processed successfully.</p>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h4 className="text-xl font-bold text-red-600 mb-2">Payment Failed</h4>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button
            onClick={handlePayment}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default RazorpayPayment;
