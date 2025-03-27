
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Building, 
  CircleDollarSign, 
  FileText, 
  Globe, 
  Landmark, 
  Mail 
} from 'lucide-react';
import { toast } from "sonner";
import { motion } from "framer-motion";

interface MerchantVerificationProps {
  userData: {
    name: string;
    email: string;
    mobile: string;
    userType: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

// Define steps for merchant verification
const steps = [
  {
    id: 'email',
    title: 'Email Verification',
    description: 'Verify your email address',
    icon: <Mail className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 'business-plan',
    title: 'Business Plan & Details',
    description: 'Tell us about your business',
    icon: <Building className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 'owner-details',
    title: 'Business Owner Details',
    description: 'Provide owner information',
    icon: <FileText className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 'registration',
    title: 'Business Registration',
    description: 'Add your business documents',
    icon: <FileText className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 'account',
    title: 'Bank Account Details',
    description: 'Set up your payment options',
    icon: <Landmark className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 'website',
    title: 'Website Details',
    description: 'Add your online presence',
    icon: <Globe className="h-6 w-6 text-cyan-400" />,
  },
];

const MerchantVerification: React.FC<MerchantVerificationProps> = ({ 
  userData, 
  onComplete, 
  onBack 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationData, setVerificationData] = useState({
    emailVerified: false,
    emailCode: '',
    businessName: '',
    businessType: '',
    businessDescription: '',
    ownerIdType: '',
    ownerId: '',
    ownerAddress: '',
    registrationNumber: '',
    taxId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    website: '',
    socialMedia: '',
  });
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Final step - complete verification
      handleComplete();
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      onBack();
    }
  };
  
  const handleSendEmailVerification = () => {
    setLoading(true);
    
    // Simulate sending verification email
    setTimeout(() => {
      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
      console.log('Email verification code:', verificationCode);
      
      toast.success("Verification code sent to your email");
      setLoading(false);
      setEmailSent(true);
      
      // Store the verification code (in a real app, this would be handled by the backend)
      setVerificationData({
        ...verificationData,
        emailCode: verificationCode,
      });
    }, 1500);
  };
  
  const handleVerifyEmail = () => {
    // In a real app, verify code against what was sent
    if (verificationData.emailCode === verificationData.emailCode) {
      setVerificationData({
        ...verificationData,
        emailVerified: true,
      });
      toast.success("Email verified successfully");
    } else {
      toast.error("Invalid verification code");
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setVerificationData({
      ...verificationData,
      [field]: value,
    });
  };
  
  const handleComplete = () => {
    setLoading(true);
    
    // Simulate API call to create business wallet
    setTimeout(() => {
      toast.success("Business wallet created successfully!");
      onComplete();
    }, 2000);
  };
  
  // Check if current step is complete
  const isCurrentStepComplete = () => {
    switch (currentStep) {
      case 0: // Email verification
        return verificationData.emailVerified;
      case 1: // Business plan & details
        return verificationData.businessName && 
               verificationData.businessType && 
               verificationData.businessDescription;
      case 2: // Owner details
        return verificationData.ownerIdType && 
               verificationData.ownerId && 
               verificationData.ownerAddress;
      case 3: // Registration details
        return verificationData.registrationNumber && 
               verificationData.taxId;
      case 4: // Bank details
        return verificationData.bankName && 
               verificationData.accountNumber && 
               verificationData.ifscCode;
      case 5: // Website details
        return true; // Optional fields
      default:
        return false;
    }
  };
  
  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'email':
        return (
          <div className="space-y-6">
            {!verificationData.emailVerified ? (
              <>
                <div className="bg-cyan-900/20 backdrop-blur-md rounded-lg p-4 border border-cyan-800/30">
                  <p className="text-sm">We'll send a verification code to:</p>
                  <p className="text-lg font-medium mt-1">{userData.email}</p>
                </div>
                
                {emailSent ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Enter verification code" 
                        onChange={(e) => handleInputChange('emailCode', e.target.value)}
                        className="pl-4"
                      />
                    </div>
                    <Button 
                      onClick={handleVerifyEmail}
                      className="w-full"
                    >
                      Verify Code
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleSendEmailVerification} 
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>Sending verification code...</>
                    ) : (
                      <>Send Verification Code</>
                    )}
                  </Button>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4 bg-green-900/20 backdrop-blur-md rounded-lg p-4 border border-green-800/30">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="text-lg font-medium text-green-400">Email Verified</h3>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'business-plan':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <Input 
                  placeholder="Enter your business name" 
                  value={verificationData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Business Type</label>
                <Select
                  value={verificationData.businessType}
                  onValueChange={(value) => handleInputChange('businessType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="restaurant">Restaurant/Cafe</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Business Description</label>
                <Textarea 
                  placeholder="Describe your business in a few sentences" 
                  value={verificationData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        );
        
      case 'owner-details':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ID Type</label>
                <Select
                  value={verificationData.ownerIdType}
                  onValueChange={(value) => handleInputChange('ownerIdType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                    <SelectItem value="pan">PAN Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driving">Driving License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">ID Number</label>
                <Input 
                  placeholder="Enter your ID number" 
                  value={verificationData.ownerId}
                  onChange={(e) => handleInputChange('ownerId', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Owner Address</label>
                <Textarea 
                  placeholder="Enter your address" 
                  value={verificationData.ownerAddress}
                  onChange={(e) => handleInputChange('ownerAddress', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        );
        
      case 'registration':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Registration Number</label>
                <Input 
                  placeholder="Enter registration number" 
                  value={verificationData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tax ID (GST/PAN)</label>
                <Input 
                  placeholder="Enter tax identification number" 
                  value={verificationData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                />
              </div>
              
              <div className="bg-cyan-900/20 backdrop-blur-md rounded-lg p-4 border border-cyan-800/30">
                <p className="text-sm text-muted-foreground">
                  Note: You may be required to upload supporting documents for verification. 
                  These will be reviewed by our team.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'account':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bank Name</label>
                <Input 
                  placeholder="Enter bank name" 
                  value={verificationData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Account Number</label>
                <Input 
                  placeholder="Enter account number" 
                  value={verificationData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">IFSC Code</label>
                <Input 
                  placeholder="Enter IFSC code" 
                  value={verificationData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 'website':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Website (Optional)</label>
                <Input 
                  placeholder="https://yourbusiness.com" 
                  value={verificationData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Social Media Handles (Optional)</label>
                <Input 
                  placeholder="@yourbusiness" 
                  value={verificationData.socialMedia}
                  onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                />
              </div>
              
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-md rounded-lg p-4 border border-cyan-800/30">
                <div className="flex items-center space-x-3">
                  <CircleDollarSign className="h-8 w-8 text-cyan-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Business Wallet Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Upon verification, we'll automatically create your business wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight relative">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Merchant Verification
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Complete the verification steps to set up your merchant account</p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 overflow-auto pb-2 w-full">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="flex items-center"
            >
              <div 
                className={`flex flex-col items-center justify-center relative ${
                  index < currentStep ? 'text-green-500' : 
                  index === currentStep ? 'text-cyan-400' : 'text-gray-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                  index < currentStep ? 'bg-green-500/20 border border-green-500' : 
                  index === currentStep ? 'bg-cyan-500/20 border border-cyan-500' : 
                  'bg-gray-800/30 border border-gray-700'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                <span className={`text-xs mt-1 whitespace-nowrap ${
                  index === currentStep ? 'text-cyan-400' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-700'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/30 backdrop-blur-lg rounded-xl p-6 border border-cyan-800/30">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-cyan-500/10 mr-4">
            {steps[currentStep].icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{steps[currentStep].title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {renderStepContent()}
          
          <div className="flex justify-between pt-4 mt-6 border-t border-cyan-800/30">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              className="px-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {currentStep === 0 ? 'Back to OTP' : 'Previous'}
            </Button>
            
            <Button 
              onClick={handleNextStep}
              disabled={!isCurrentStepComplete() || loading}
              className="px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
            >
              {currentStep === steps.length - 1 ? (
                loading ? 'Creating wallet...' : 'Complete & Continue'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantVerification;
