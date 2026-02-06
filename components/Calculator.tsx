
import React from 'react';
import { Calendar } from 'lucide-react';

interface CalculatorProps {
  onCalculate: (date: Date) => void;
  initialDate: string;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculate, initialDate }) => {
  const [dateStr, setDateStr] = React.useState(initialDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateStr) {
      onCalculate(new Date(dateStr));
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-pink-100 rounded-2xl text-pink-500">
          <Calendar size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">计算您的孕周</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            末次月经 (LMP) 第一天
          </label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all text-gray-700 bg-white"
            required
          />
          <p className="mt-2 text-xs text-gray-400">
            例如: 2025-10-07
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95"
        >
          开始计算
        </button>
      </form>
    </div>
  );
};

export default Calculator;
