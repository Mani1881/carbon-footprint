import React, { useState } from 'react';
import { HelpCircle, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, Award, BookOpen } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});

  const cardDeck = [
    {
      id: 1,
      category: 'Recycling & Waste',
      title: 'The Plastic Recycling Myth',
      front: 'Myth: "Plastic recycling is highly efficient, so buying plastic containers is perfectly fine as long as we put them in the recycle bin."',
      back: 'Truth: Globally, only about 9% of plastic waste is successfully recycled. Most plastics degrade during recycling and can only be downcycled once or twice. Reducing single-use plastics is far more effective than recycling.',
      source: 'UN Environment Programme'
    },
    {
      id: 2,
      category: 'Transportation',
      title: 'Electric Vehicles vs Gas Cars',
      front: 'Myth: "Electric cars emit just as much carbon as petrol cars because the electric grid relies heavily on coal and gas."',
      back: 'Truth: Even on fossil-fuel heavy grids, EVs are 30% to 50% cleaner over their full lifecycle (including manufacturing). As the grid transitions to solar and wind, EV emissions drop by up to 85%.',
      source: 'International Council on Clean Transportation'
    },
    {
      id: 3,
      category: 'Diet & Agriculture',
      title: 'Food Miles vs Diet Sourcing',
      front: 'Myth: "Eating locally sourced beef is the best way to reduce your dietary carbon footprint."',
      back: 'Truth: Transport makes up only about 6% of food emissions. What you eat is far more important than where it comes from. Shifting from red meat to poultry or plant-based meals is 10x more carbon-efficient than eating 100% local beef.',
      source: 'Our World in Data (Oxford University)'
    },
    {
      id: 4,
      category: 'Home Utility',
      title: 'Vampire Power Consumption',
      front: 'Myth: "Electronics that are turned off do not consume any power even if they remain plugged into the wall."',
      back: 'Truth: "Vampire power" (standby power) from plugged-in devices (TVs, chargers, microwave clocks) accounts for 5% to 10% of household electricity consumption globally, emitting millions of tons of CO2 annually.',
      source: 'U.S. Department of Energy'
    },
    {
      id: 5,
      category: 'Carbon Offsets',
      title: 'Carbon Neutral Claims',
      front: 'Myth: "You can offset your carbon emissions by planting trees and continue high-emission behaviors without any environmental impact."',
      back: 'Truth: Tree offset benefits take 10-20 years to mature, and trees can catch fire or die, releasing the carbon. Offsetting is a helpful supplementary tool, but direct emissions reduction is the only scientifically viable solution.',
      source: 'IPCC Climate Assessment'
    }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardDeck.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cardDeck.length) % cardDeck.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMaster = (id, knewIt) => {
    setMasteredCards(prev => ({
      ...prev,
      [id]: knewIt
    }));
  };

  const currentCard = cardDeck[currentIndex];
  const totalMastered = Object.values(masteredCards).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
          <BookOpen className="text-emerald-400" />
          Eco Facts & Myth Busters
        </h2>
        <p className="text-gray-400 text-sm">Flip the cards to test your climate knowledge and separate carbon facts from fiction.</p>
      </div>

      {/* Gamified Score Tracker */}
      <div className="glass-panel p-4 mb-6 flex items-center justify-between bg-emerald-500/[0.02] border-emerald-500/15">
        <div className="flex items-center gap-2">
          <Award className="text-yellow-400" size={20} />
          <span className="text-xs font-semibold text-gray-300">Knowledge Progress:</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-emerald-400">{totalMastered} / {cardDeck.length} Facts Mastered</span>
        </div>
      </div>

      {/* Interactive 3D Flashcard */}
      <div 
        className={`flashcard-container ${isFlipped ? 'is-flipped' : ''} mb-6`}
        onClick={handleFlip}
      >
        <div className="flashcard-inner">
          {/* Card Front (Question/Myth) */}
          <div className="flashcard-front">
            <span className="badge badge-energy mb-4 uppercase tracking-wider text-[10px]">{currentCard.category}</span>
            <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center gap-2">
              <HelpCircle size={20} />
              {currentCard.title}
            </h3>
            <p className="text-sm md:text-base text-gray-200 italic px-4 leading-relaxed">
              {currentCard.front}
            </p>
            <div className="mt-8 flex items-center gap-1.5 text-xs text-gray-500">
              <RefreshCw size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>Click to reveal truth</span>
            </div>
          </div>

          {/* Card Back (Answer/Fact) */}
          <div className="flashcard-back">
            <span className="badge badge-diet mb-3 uppercase tracking-wider text-[10px]">VERIFIED FACT</span>
            <h3 className="text-xl font-bold mb-3 text-emerald-400">
              The Reality
            </h3>
            <p className="text-xs md:text-sm text-gray-200 px-4 leading-relaxed mb-4">
              {currentCard.back}
            </p>
            <div className="border-t border-white/5 pt-2 w-full text-[10px] text-gray-500 italic">
              Source: {currentCard.source}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-500/80">
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Controls & Master Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev}
            className="btn-secondary p-2.5 rounded-xl"
            aria-label="Previous card"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-semibold text-gray-400 min-w-[70px] text-center">
            Card {currentIndex + 1} of {cardDeck.length}
          </span>
          <button 
            onClick={handleNext}
            className="btn-secondary p-2.5 rounded-xl"
            aria-label="Next card"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Master Fact Buttons (available on card back) */}
        {isFlipped && (
          <div className="flex items-center gap-2 animate-fade-in">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaster(currentCard.id, true);
                handleNext();
              }}
              className="btn-primary text-xs py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <CheckCircle2 size={14} /> I Learned This!
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaster(currentCard.id, false);
                handleNext();
              }}
              className="btn-secondary text-xs py-2 px-4"
            >
              Needs Review
            </button>
          </div>
        )}
      </div>

      {/* Floating ambient glow effects relative to cards */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
    </div>
  );
}
