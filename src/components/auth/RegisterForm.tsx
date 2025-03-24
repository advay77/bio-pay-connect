
import React from 'react';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from 'lucide-react';
import FingerPrintScanner from './FingerPrintScanner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  userType: z.enum(["customer", "merchant"], {
    required_error: "Please select a user type.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  onSubmit: (values: FormValues & { fingerprint: boolean }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [stage, setStage] = React.useState<'form' | 'fingerprint'>('form');
  const [fingerprintRegistered, setFingerprintRegistered] = React.useState(false);
  const [formValues, setFormValues] = React.useState<FormValues | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      userType: "customer",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    setFormValues(values);
    setStage('fingerprint');
  };

  const handleFingerprintComplete = (success: boolean) => {
    setFingerprintRegistered(success);
    if (success && formValues) {
      setTimeout(() => {
        onSubmit({
          ...formValues,
          fingerprint: true,
        });
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
      {stage === 'form' ? (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Enter your details to register a new account
            </p>
          </div>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleFormSubmit)} 
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
              
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="customer" id="customer" />
                          <label htmlFor="customer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Customer
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="merchant" id="merchant" />
                          <label htmlFor="merchant" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Merchant/Shopkeeper
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Continue to Fingerprint Registration
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Register Your Fingerprint</h2>
            <p className="text-muted-foreground mt-2">
              Please scan your fingerprint to complete registration
            </p>
          </div>
          
          <FingerPrintScanner 
            onScanComplete={handleFingerprintComplete} 
            className="py-8"
          />
          
          {fingerprintRegistered ? (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-green-600">Fingerprint Registered!</h3>
              <p className="text-muted-foreground mt-2">
                Completing your registration...
              </p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setStage('form')}
              className="mt-4"
            >
              Go Back to Form
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
