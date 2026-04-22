import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle, CheckCircle, Loader2, Shield } from "lucide-react";

declare global {
  interface Window {
    Cashfree: any;
  }
}

interface CashfreePaymentProps {
  formData: any;
  onSuccess: () => void;
  onFailure: (error: string) => void;
  amount?: number;
}

const CashfreePayment = ({ 
  formData, 
  onSuccess, 
  onFailure, 
  amount = 25000 
}: CashfreePaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  // Cashfree configuration - using environment variables for security
  const CASHFREE_CONFIG = {
    appId: import.meta.env.VITE_CASHFREE_APP_ID || '',
    appSecret: import.meta.env.VITE_CASHFREE_APP_SECRET || '',
    environment: import.meta.env.VITE_CASHFREE_ENVIRONMENT || 'sandbox'
  };

  useEffect(() => {
    // Initialize Cashfree SDK
    if (window.Cashfree && CASHFREE_CONFIG.appId) {
      window.Cashfree.init({
        mode: CASHFREE_CONFIG.environment,
        appId: CASHFREE_CONFIG.appId
      });
    }
  }, []);

  const createOrder = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('processing');
      setError('');

      // Create order on backend (for now, simulate with test data)
      const orderData = {
        orderId: `ORDER_${Date.now()}`,
        orderAmount: amount,
        orderCurrency: 'INR',
        customerDetails: {
          customerId: formData.email || `CUST_${Date.now()}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerName: `${formData.firstName} ${formData.lastName}`
        },
        orderNote: `Application fee for ${formData.selectedCourse}`,
        orderTags: {
          source: 'web',
          course: formData.selectedCourse,
          school: formData.selectedSchool
        }
      };

      // For demo purposes, create a mock session
      // In production, this should call your backend API
      const mockSession = {
        paymentSessionId: `session_${Date.now()}`,
        orderId: orderData.orderId,
        amount: amount,
        currency: 'INR',
        customerDetails: orderData.customerDetails
      };

      // Open Cashfree payment modal
      openCashfreeModal(mockSession);

    } catch (err: any) {
      setError(err.message || 'Failed to create payment order');
      setPaymentStatus('error');
      setIsLoading(false);
      onFailure(err.message || 'Payment failed');
    }
  };

  const openCashfreeModal = (sessionData: any) => {
    if (!window.Cashfree) {
      setError('Payment gateway not loaded');
      setPaymentStatus('error');
      setIsLoading(false);
      onFailure('Payment gateway not loaded');
      return;
    }

    const paymentOptions = {
      paymentSessionId: sessionData.paymentSessionId,
      returnUrl: `${window.location.origin}/payment-success`,
      redirectTarget: '_self',
      paymentMode: 'all',
      theme: {
        primaryColor: '#0044B3',
        secondaryColor: '#EB1735'
      }
    };

    // Handle payment callbacks
    window.Cashfree.on('payment.success', (response: any) => {
      console.log('Payment successful:', response);
      setPaymentStatus('success');
      setIsLoading(false);
      onSuccess();
    });

    window.Cashfree.on('payment.failure', (response: any) => {
      console.error('Payment failed:', response);
      setError('Payment failed. Please try again.');
      setPaymentStatus('error');
      setIsLoading(false);
      onFailure('Payment failed. Please try again.');
    });

    // Open payment modal
    window.Cashfree.show(paymentOptions);
  };

  const handlePayment = () => {
    if (paymentStatus === 'processing') return;
    createOrder();
  };

  // Show configuration error if environment variables are not set
  if (!CASHFREE_CONFIG.appId) {
    return (
      <div className="w-full">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h4 className="text-xl font-bold text-yellow-600 mb-2">Payment Configuration Required</h4>
          <p className="text-slate-600 mb-4">
            Please configure Cashfree payment settings to enable online payments.
          </p>
          <div className="text-sm text-slate-500">
            <p>Set the following environment variables:</p>
            <ul className="mt-2 space-y-1">
              <li>VITE_CASHFREE_APP_ID</li>
              <li>VITE_CASHFREE_APP_SECRET</li>
              <li>VITE_CASHFREE_ENVIRONMENT</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {paymentStatus === 'idle' && (
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Secure Payment</h4>
            <p className="text-slate-600">Pay securely via Cashfree Payment Gateway</p>
          </div>
          
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25 px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <span>Secured by Cashfree</span>
          </div>
        </div>
      )}

      {paymentStatus === 'processing' && (
        <div className="text-center py-8">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default CashfreePayment;
