import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { X, ChevronLeft, CheckCircle, Fingerprint, QrCode as QrCodeIcon } from 'lucide-react';
import QRCode from 'qrcode.react';
import FingerPrintScanner from '../auth/FingerPrintScanner';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PresentationControls, ContactShadows } from '@react-three/drei';

interface ReceiveMoneyPanelProps {
  onClose: () => void;
}

const ReceiveMoneyPanel: React.FC<ReceiveMoneyPanelProps> = ({ onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [limit, setLimit] = useState<number[]>([1000]);
  const [stage, setStage] = useState<'form' | 'qr' | 'fingerprint' | 'success'>('form');
  const [paymentLink, setPaymentLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  const handleLimitChange = (value: number[]) => {
    setLimit(value);
  };
  
  const handleGenerateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const link = `biopay://payment?amount=${amount}&limit=${limit[0]}&merchant=ABC_Store&time=${Date.now()}`;
      setPaymentLink(link);
      setStage('qr');
      setLoading(false);
    }, 1500);
  };
  
  const handleScanComplete = (success: boolean) => {
    if (success) {
      setStage('success');
      
      setTimeout(() => {
        onClose();
        toast.success(`Payment of $${amount} received successfully!`);
      }, 3000);
    }
  };
  
  const handleBack = () => {
    if (stage === 'qr') {
      setStage('form');
    } else if (stage === 'fingerprint') {
      setStage('qr');
    } else {
      onClose();
    }
  };
  
  const WalletModel = () => {
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 0.4, 2]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.2} />
        </mesh>
        
        <mesh position={[0, 0.21, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.8, 0.1, 1.8]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.4} roughness={0.4} />
        </mesh>
        
        <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[1.8, 0.05, 1.2]} />
          <meshStandardMaterial color="#00a6ed" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[0.6, 0.35, 0]} rotation={[0, -0.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[1.8, 0.05, 1.2]} />
          <meshStandardMaterial color="#00ccaa" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
        </mesh>
      </group>
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          {stage === 'form' ? 'Back to Dashboard' : 'Back'}
        </Button>
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {stage === 'form' && 'Receive Payment'}
          {stage === 'qr' && 'Payment QR Code'}
          {stage === 'fingerprint' && 'Authenticate Payment'}
          {stage === 'success' && 'Payment Successful'}
        </h1>
        
        <Button variant="ghost" onClick={onClose} className="text-gray-500">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <AnimatePresence mode="wait">
        {stage === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 backdrop-blur-xl border border-cyan-800/30">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Enter Amount</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-cyan-400">
                          $
                        </div>
                        <Input
                          type="text"
                          value={amount}
                          onChange={handleAmountChange}
                          placeholder="0.00"
                          className="pl-8 text-xl font-semibold h-14"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Payment Limit: ${limit[0].toLocaleString()}
                      </label>
                      <Slider
                        value={limit}
                        onValueChange={handleLimitChange}
                        max={10000}
                        step={100}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$0</span>
                        <span>$10,000</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleGenerateQR}
                      disabled={loading || !amount || parseFloat(amount) <= 0}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 mt-4"
                    >
                      {loading ? "Generating QR Code..." : "Generate QR Code"}
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="bg-gradient-to-br from-cyan-950/20 to-blue-950/20 backdrop-blur-xl border border-cyan-800/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">How It Works</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-xs font-bold text-cyan-400">1</span>
                      </div>
                      <p className="text-sm text-gray-300">Enter the amount you want to receive</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-xs font-bold text-cyan-400">2</span>
                      </div>
                      <p className="text-sm text-gray-300">Set a payment limit (maximum amount allowed)</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-xs font-bold text-cyan-400">3</span>
                      </div>
                      <p className="text-sm text-gray-300">Generate and share the QR code with your customer</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-xs font-bold text-cyan-400">4</span>
                      </div>
                      <p className="text-sm text-gray-300">Verify the payment with your fingerprint</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-center h-[400px]">
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <PresentationControls
                    global
                    rotation={[0, 0, 0]}
                    polar={[-0.2, 0.2]}
                    azimuth={[-0.4, 0.4]}
                    config={{ mass: 1, tension: 170, friction: 26 }}
                  >
                    <WalletModel />
                  </PresentationControls>
                  <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.4}
                    scale={5}
                    blur={3}
                  />
                </Canvas>
              </div>
            </div>
          </motion.div>
        )}
        
        {stage === 'qr' && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 backdrop-blur-xl border border-cyan-800/30">
                <CardContent className="p-6 space-y-4 flex flex-col items-center">
                  <div className="bg-white p-6 rounded-xl mb-4">
                    <QRCode 
                      value={paymentLink} 
                      size={200} 
                      level="H"
                      renderAs="svg"
                    />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      ${parseFloat(amount).toFixed(2)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Payment request generated
                    </p>
                  </div>
                  
                  <div className="w-full bg-black/30 rounded-lg p-4 mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Merchant</span>
                      <span className="text-white">Your Business Name</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="text-white">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Maximum Limit</span>
                      <span className="text-white">${limit[0].toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setStage('fingerprint')}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 mt-4"
                  >
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Authenticate Payment
                  </Button>
                </CardContent>
              </Card>
              
              <div className="bg-gradient-to-br from-cyan-950/20 to-blue-950/20 backdrop-blur-xl border border-cyan-800/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-400">1</span>
                    </div>
                    <p className="text-sm text-gray-300">Share this QR code with your customer</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-400">2</span>
                    </div>
                    <p className="text-sm text-gray-300">Customer scans the code with their BioPay app</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-400">3</span>
                    </div>
                    <p className="text-sm text-gray-300">Once they confirm, click "Authenticate Payment"</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyan-500/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-400">4</span>
                    </div>
                    <p className="text-sm text-gray-300">Verify the payment with your fingerprint</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-center relative">
              <div className="absolute inset-0 bg-network-grid bg-[length:30px_30px] opacity-10"></div>
              <div className="absolute top-1/3 left-1/5 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-float"></div>
              <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
              
              <div className="relative z-10 bg-gradient-to-br from-cyan-950/60 to-blue-950/60 backdrop-blur-xl border border-cyan-800/30 rounded-3xl p-8 shadow-2xl max-w-md">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-500 mb-4">
                    <QrCodeIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Demo Mode</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    In a real-world scenario, your customer would scan this QR code.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2 w-full">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1 bg-black/20 rounded-lg p-3">
                      <div className="text-sm font-medium text-white">QR Code Generated</div>
                      <div className="text-xs text-muted-foreground">Ready for customer</div>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-dotted border-cyan-800/50 h-4"></div>
                  
                  <div className="flex items-center space-x-2 w-full opacity-60">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Fingerprint className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="flex-1 bg-black/20 rounded-lg p-3">
                      <div className="text-sm font-medium text-white">Next: Authentication</div>
                      <div className="text-xs text-muted-foreground">Verify with fingerprint</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {stage === 'fingerprint' && (
          <motion.div
            key="fingerprint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Authenticate Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Verify this transaction with your fingerprint
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 backdrop-blur-xl border border-cyan-800/30 rounded-xl p-8 w-full max-w-md">
                <FingerPrintScanner onScanComplete={handleScanComplete} className="py-4" />
              </div>
              
              <div className="mt-6 bg-black/30 rounded-lg p-4 w-full max-w-md">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Merchant</span>
                  <span className="text-white">Your Business Name</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-white">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="text-white">TXN-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-white">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center h-[400px]">
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-0.2, 0.2]}
                  azimuth={[-0.4, 0.4]}
                  config={{ mass: 1, tension: 170, friction: 26 }}
                >
                  <WalletModel />
                </PresentationControls>
                <ContactShadows
                  position={[0, -1.5, 0]}
                  opacity={0.4}
                  scale={5}
                  blur={3}
                />
              </Canvas>
            </div>
          </motion.div>
        )}
        
        {stage === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 backdrop-blur-xl border border-green-500/30 rounded-full p-8 mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-xl text-green-400 font-semibold mb-6">${parseFloat(amount).toFixed(2)}</p>
            
            <div className="bg-black/30 rounded-lg p-6 max-w-md w-full mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-white">${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Merchant</span>
                <span className="text-white">Your Business Name</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="text-white">TXN-{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-white">{new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReceiveMoneyPanel;
