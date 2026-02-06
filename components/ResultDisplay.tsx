
import React from 'react';
import { PregnancyInfo } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Baby, Sparkles, CalendarDays } from 'lucide-react';

interface ResultDisplayProps {
  info: PregnancyInfo;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ info }) => {
  const progress = Math.min((info.totalDays / 280) * 100, 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Result */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 text-center border border-white shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Baby size={120} />
        </div>
        
        <h3 className="text-pink-400 font-medium mb-2 flex items-center justify-center gap-2">
          <Sparkles size={16} /> 此时此刻
        </h3>
        <div className="text-5xl font-bold text-gray-800 mb-4 flex items-baseline justify-center gap-2">
          {info.weeks} <span className="text-2xl font-normal text-gray-500">周</span> {info.days} <span className="text-2xl font-normal text-gray-500">天</span>
        </div>
        
        <div className="w-full bg-white rounded-full h-3 mb-2 shadow-sm p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-pink-300 to-rose-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 italic">孕期已完成约 {progress.toFixed(1)}%</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-pink-50 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-400 rounded-xl">
            <CalendarDays size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400">预产期 (EDD)</p>
            <p className="font-bold text-gray-700">{formatDate(info.dueDate)}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-pink-50 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-400 rounded-xl">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400">当前阶段</p>
            <p className="font-bold text-gray-700">第 {info.trimester} 孕期</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
