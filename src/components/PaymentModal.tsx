import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";

interface PaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentModal = ({ isOpen, onOpenChange }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "5000",
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorStatus(null);

    try {
      // 1. Initialize Cashfree SDK
      const cashfree = await load({
        mode: "sandbox", // Switch to "production" when strictly live
      });

      // 2. Fetch the Payment Session ID from your backend
      /* 
        DEVELOPER NOTE:
        You MUST replace this dummy fetch with an actual API endpoint from your backend.
        The backend must securely call the Cashfree API to generate the 'payment_session_id'
        based on the formData (amount, email, phone) passed above.
      */
      
      // const response = await fetch("https://your-backend-api.com/create-cashfree-session", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // const sessionId = data.payment_session_id;

      // Simulated Delay for Backend Request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const MOCK_SESSION_ID = ""; // Will fail intentionally to show the developer the setup works up to this point

      if (!MOCK_SESSION_ID) {
        throw new Error("Backend connection required. No Payment Session ID received.");
      }

      // 3. Initiate Checkout using the SDK
      const checkoutOptions = {
        paymentSessionId: MOCK_SESSION_ID,
        redirectTarget: "_modal", // "_self", "_blank", or "_modal" 
      };

      // The SDK mounts the payment modal
      // @ts-ignore
      await cashfree.checkout(checkoutOptions);

    } catch (error: any) {
      console.error("Payment Initialization Error:", error);
      setErrorStatus(error.message || "Failed to initialize the payment gateway.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white rounded-3xl border-0 shadow-2xl">
        <div className="bg-[#020617] px-6 py-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3" />
          <DialogHeader className="relative z-10 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg">
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white font-display font-bold">Secure Payment</DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Powered by Cashfree Payments
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handlePayment} className="p-6 space-y-5">
          {errorStatus && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errorStatus}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-600 font-medium text-xs uppercase tracking-wider">Full Name</Label>
              <Input
                id="name"
                required
                className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-medium text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-600 font-medium text-xs uppercase tracking-wider">Phone</Label>
                <Input
                  id="phone"
                  required
                  className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-xl"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="amount" className="text-slate-600 font-medium text-xs uppercase tracking-wider">Consultancy Fee (INR)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                <Input
                  id="amount"
                  required
                  type="number"
                  disabled
                  className="h-14 pl-8 text-lg font-bold bg-slate-100 border-transparent rounded-xl"
                  value={formData.amount}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 text-lg rounded-xl font-bold transition-all relative overflow-hidden group"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Secure Link...
                </>
              ) : (
                <>
                  Pay ₹{formData.amount} Now
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-medium text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                256-bit AES Encryption
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
