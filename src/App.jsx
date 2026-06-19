/**
 * @fileoverview Root application component for EcoTrace Carbon Footprint Tracker.
 * Manages global state, tab navigation, and orchestrates child components.
 * Uses React.lazy for code-split loading and ErrorBoundary for resilience.
 * @module App
 */

import { useState, useMemo, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { Leaf, BarChart3, Calculator as CalcIcon, CheckSquare, Sparkles, BookOpen } from 'lucide-react';
import { ACTION_DEFINITIONS, DEFAULT_USER_DATA } from './constants.js';
import { calculateEmissions, calculateActionSavings } from './utils.js';

import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import ActionTracker from './components/ActionTracker';
import Flashcards from './components/Flashcards';



/**
 * Tab configuration for the main navigation.
 * @readonly
 * @type {Array<{id: string, label: string, icon: React.ComponentType}>}
 */
const TAB_CONFIG = [
  { id: 'dashboard', label: 'Dashboard', Icon: BarChart3 },
  { id: 'calculator', label: 'Calculator', Icon: CalcIcon },
  { id: 'actions', label: 'Green Actions', Icon: CheckSquare },
  { id: 'flashcards', label: 'Learn Facts', Icon: BookOpen },
];

/**
 * Root application component for the EcoTrace Carbon Footprint Tracker.
 *
 * Responsibilities:
 * - Manages user data state (transport, energy, diet profiles)
 * - Manages logged eco-action state
 * - Computes emissions and savings via memoized utility functions
 * - Provides tab-based navigation between Dashboard, Calculator, Actions, and Flashcards
 *
 * @returns {React.ReactElement} The complete application UI
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  /** @type {[import('./constants.js').UserData, Function]} User profile inputs */
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);

  /** @type {[Object<string, number>, Function]} Action tracker logged counts */
  const [loggedActions, setLoggedActions] = useState({});

  /**
   * Memoized emissions calculation — only recalculates when userData changes.
   * @type {import('./utils.js').EmissionsResult}
   */
  const emissions = useMemo(
    () => calculateEmissions(userData),
    [userData]
  );

  /**
   * Memoized action savings — only recalculates when loggedActions changes.
   * @type {number}
   */
  const actionSavings = useMemo(
    () => calculateActionSavings(loggedActions, ACTION_DEFINITIONS),
    [loggedActions]
  );

  /**
   * Increment or decrement a logged eco-action count.
   * @param {string} actionId - The unique action identifier
   * @param {number} change - Amount to change (positive or negative)
   */
  const handleLogAction = useCallback((actionId, change) => {
    setLoggedActions((prev) => {
      const currentCount = prev[actionId] || 0;
      const nextCount = Math.max(0, currentCount + change);
      return { ...prev, [actionId]: nextCount };
    });
  }, []);

  /**
   * Reset all logged actions to zero.
   */
  const handleResetActions = useCallback(() => {
    setLoggedActions({});
  }, []);

  return (
    <div className="app-container">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-emerald-600 focus:text-white focus:rounded-br-lg focus:outline-none"
      >
        Skip to main content
      </a>
      {/* Decorative Background Ambient Glows */}
      <div className="ambient-glow-1" aria-hidden="true"></div>
      <div className="ambient-glow-2" aria-hidden="true"></div>


      {/* Upper Navigation Bar */}
      <header className="app-header" role="banner">
        <div className="container py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Leaf size={24} className="glow-active rounded-full" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-1.5">
                EcoTrace
                <Sparkles size={16} className="text-secondary" aria-hidden="true" />
              </h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Carbon Footprint Planner</p>
            </div>
          </div>
          
          {/* Main Navigation Tabs — ARIA tablist pattern */}
          <nav aria-label="Main navigation">
            <div
              className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5"
              role="tablist"
              aria-label="Application sections"
            >
              {TAB_CONFIG.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  id={`nav-${id}`}
                  role="tab"
                  aria-selected={activeTab === id}
                  aria-controls={`tabpanel-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${activeTab === id ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Body Grid */}
      <main id="main-content" className="container" role="main">
        <ErrorBoundary>
            {activeTab === 'dashboard' && (
              <div role="tabpanel" id="tabpanel-dashboard" aria-labelledby="nav-dashboard">
                <Dashboard 
                  userData={userData}
                  emissions={emissions} 
                  actionSavings={actionSavings}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}
            
            {activeTab === 'calculator' && (
              <div role="tabpanel" id="tabpanel-calculator" aria-labelledby="nav-calculator">
                <Calculator 
                  userData={userData} 
                  setUserData={setUserData} 
                  setActiveTab={setActiveTab} 
                />
              </div>
            )}
            
            {activeTab === 'actions' && (
              <div role="tabpanel" id="tabpanel-actions" aria-labelledby="nav-actions">
                <ActionTracker 
                  actionDefinitions={ACTION_DEFINITIONS}
                  loggedActions={loggedActions} 
                  onLog={handleLogAction} 
                  onReset={handleResetActions}
                  actionSavings={actionSavings}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div role="tabpanel" id="tabpanel-flashcards" aria-labelledby="nav-flashcards">
                <Flashcards />
              </div>
            )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-gray-500" role="contentinfo">
        <p className="mb-2">🌱 EcoTrace App - Designed for sustainable individuals.</p>
      </footer>
    </div>
  );
}

App.propTypes = {};
