import { NavigationConfig } from '../types/navigation';

const navigationConfig: NavigationConfig = {
  phase: 'default',
  smartNavigation: [
    {
      name: 'Dashboard',
      icon: 'home',
      path: '/dashboard',
      phases: {
        default: {
          title: 'Dashboard',
          icon: 'home'
        },
        admin: {
          title: 'Admin Panel',
          icon: 'settings'
        }
      }
    },
    {
      name: 'Users',
      icon: 'users',
      path: '/users',
      submenu: [
        {
          name: 'All Users',
          path: '/users/all',
          icon: 'list'
        },
        {
          name: 'Add User',
          path: '/users/add',
          icon: 'plus'
        }
      ],
      phases: {
        default: {
          title: 'Users',
          icon: 'users',
          submenu: [
            {
              name: 'View Users',
              path: '/users/view',
              icon: 'eye'
            }
          ]
        },
        admin: {
          title: 'User Management',
          icon: 'user-cog',
          submenu: [
            {
              name: 'All Users',
              path: '/users/all',
              icon: 'list'
            },
            {
              name: 'Add User',
              path: '/users/add',
              icon: 'plus'
            },
            {
              name: 'User Permissions',
              path: '/users/permissions',
              icon: 'shield'
            }
          ]
        }
      }
    }
  ]
};

export default navigationConfig;