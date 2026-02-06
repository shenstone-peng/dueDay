
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Calculator from './components/Calculator';
import ResultDisplay from './components/ResultDisplay';
import PregnancyTips from './components/PregnancyTips';
import { PregnancyInfo, AIAdvice } from './types';
import { calculatePregnancy } from './utils/dateUtils';
import { getPregnancyAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null);
  const [advice, setAdvice] = useState<AIAdvice | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  // Handle calculation and trigger AI advice fetch
  const handleCalculate = async (lmp: Date) => {
    const info = calculatePregnancy(lmp);
    setPregnancyInfo(info);
    
    // Reset advice and show loading state
    setAdvice(null);
    setLoadingAdvice(true);
    
    try {
      const data = await getPregnancyAdvice(info.weeks);
      setAdvice(data);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-0 bg-[#fffafb]">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/20 rounded-full blur-3xl"></div>
      </div>

      <header className="py-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4 text-rose-400">
          <Heart fill="currentColor" size={28} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">温馨孕周计算器</h1>
        <p className="text-gray-500">陪伴您和宝宝度过每一个温柔时刻</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-5 space-y-8">
          <Calculator 
            onCalculate={handleCalculate} 
            initialDate="2025-10-07" 
          />
          
          <div className="bg-white/50 rounded-2xl p-6 border border-pink-50">
            <h5 className="text-sm font-bold text-gray-700 mb-2">💡 关于计算方法</h5>
            <p className="text-xs text-gray-500 leading-relaxed">
              医学上通常从末次月经(LMP)的第一天开始计算孕周。整个孕期约为280天（40周）。
              实际分娩时间可能受多种因素影响，预产期仅供参考。
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          {!pregnancyInfo ? (
            <div className="h-full flex flex-col items-center justify-center py-20 bg-white/40 rounded-3xl border-2 border-dashed border-pink-100">
              <div className="text-pink-200 mb-4 animate-bounce">
                <Heart size={48} />
              </div>
              <p className="text-gray-400">输入日期，开启您的孕期记录</p>
            </div>
          ) : (
            <div className="space-y-8">
              <ResultDisplay info={pregnancyInfo} />
              {/* Dynamic AI Advice Component */}
              <PregnancyTips advice={advice} loading={loadingAdvice} />
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>© 2024 温馨孕周计算器 · 科学育儿 温暖相伴</p>
      </footer>
    </div>
  );
};

export default App;
