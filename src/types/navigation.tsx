export interface SubmenuItem {
  name: string;
  path: string;
  icon?: string;
}

export interface PhaseConfig {
  title: string;
  icon: string;
  submenu?: SubmenuItem[];
}

export interface NavigationItem {
  name: string;
  icon: string;
  path?: string;
  submenu?: SubmenuItem[];
  phases?: Record<string, PhaseConfig>;
}

export interface ProcessedNavigationItem extends NavigationItem {
  displayTitle: string;
  displayIcon: string;
}

export interface NavigationConfig {
  phase: string;
  smartNavigation: NavigationItem[];
}

export interface UseNavigationReturn {
  navItems: ProcessedNavigationItem[];
  currentPhase: string;
  switchPhase: (newPhase: string) => void;
}