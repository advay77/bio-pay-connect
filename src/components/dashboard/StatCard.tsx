
import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="bg-[#070b29]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
      <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#3defc0] to-[#3d8efc] bg-clip-text text-transparent">{value}</h3>
      <p className="text-white/70">{label}</p>
    </div>
  );
};

export default StatCard;
