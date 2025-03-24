
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Fingerprint } from 'lucide-react';
import FingerPrintScanner from './FingerPrintScanner';

const formSchema = z.object({
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (values: { mobile: string, fingerprint: boolean }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [mobile, setMobile] = useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    setMobile(values.mobile);
    setShowScanner(true);
  };

  const handleFingerprintComplete = (success: boolean) => {
    if (success) {
      setTimeout(() => {
        onSubmit({
          mobile,
          fingerprint: true,
        });
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 animate-fade-in">
      {!showScanner ? (
        <>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your mobile number to sign in
            </p>
          </div>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleFormSubmit)} 
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Continue with Fingerprint
              </Button>
            </form>
          </Form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:underline">
                Register
              </a>
            </p>
          </div>
        </>
      ) : (
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Verify Your Identity</h2>
            <p className="text-muted-foreground mt-2">
              Please scan your fingerprint to continue
            </p>
          </div>
          
          <FingerPrintScanner 
            onScanComplete={handleFingerprintComplete} 
            className="py-8"
          />
          
          <Button 
            variant="outline" 
            onClick={() => setShowScanner(false)}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
