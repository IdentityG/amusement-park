import { useState, useEffect } from 'react';
import navigationConfig from '../config/navigationConfig.'
import type { 
  NavigationItem, 
  ProcessedNavigationItem, 
  UseNavigationReturn 
} from '../types/navigation';

export const useNavigation = (): UseNavigationReturn => {
  const [currentPhase, setCurrentPhase] = useState<string>(navigationConfig.phase);
  
  const getNavItems = (): ProcessedNavigationItem[] => {
    return navigationConfig.smartNavigation.map((item: NavigationItem): ProcessedNavigationItem => {
      const phaseConfig = item.phases?.[currentPhase];
      
      return {
        ...item,
        displayTitle: phaseConfig?.title || item.name,
        displayIcon: phaseConfig?.icon || item.icon,
        submenu: phaseConfig?.submenu || item.submenu
      };
    });
  };

  const switchPhase = (newPhase: string): void => {
    setCurrentPhase(newPhase);
    localStorage.setItem('navigationPhase', newPhase);
  };

  useEffect(() => {
    const savedPhase: string | null = localStorage.getItem('navigationPhase');
    if (savedPhase) {
      setCurrentPhase(savedPhase);
    }
  }, []);

  return {
    navItems: getNavItems(),
    currentPhase,
    switchPhase
  };
};