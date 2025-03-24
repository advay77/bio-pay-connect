
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-[#070b29]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[#3defc0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#3defc0]/5">
      <div className="mb-4 h-12 w-12 rounded-lg flex items-center justify-center bg-white/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
