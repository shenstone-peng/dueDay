
import React from 'react';
import { AIAdvice } from '../types';
import { Heart, Utensils, Zap } from 'lucide-react';

interface PregnancyTipsProps {
  advice: AIAdvice | null;
  loading: boolean;
}

const PregnancyTips: React.FC<PregnancyTipsProps> = ({ advice, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-dashed border-pink-200 text-center space-y-4">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full" />
        <p className="text-pink-400 font-medium">正在为您和宝宝生成专属贴士...</p>
      </div>
    );
  }

  if (!advice) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-50 text-yellow-500 rounded-2xl shrink-0">
          <Zap size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">宝宝的大小</h4>
          <p className="text-gray-600 leading-relaxed">
            现在的宝宝大约有一个 <span className="text-rose-500 font-medium">{advice.babySize}</span> 那么大。
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-pink-50 text-pink-500 rounded-2xl shrink-0">
          <Heart size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">发育小百科</h4>
          <p className="text-gray-600 leading-relaxed">{advice.babyDevelopment}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-50 text-green-500 rounded-2xl shrink-0">
          <Utensils size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">妈妈的生活指南</h4>
          <p className="text-gray-600 leading-relaxed">{advice.momTips}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-6 rounded-2xl text-white text-center shadow-lg shadow-pink-100">
        <p className="font-cursive text-xl opacity-90">"{advice.encouragement}"</p>
      </div>
    </div>
  );
};

export default PregnancyTips;
