export const detectWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

export const getWebGLErrorMessage = (): string => {
  const messages = {
    no_webgl: 'Your browser does not support WebGL.',
    no_hardware: 'Your graphics card does not support WebGL.',
    blacklisted: 'Your browser has disabled WebGL due to stability issues.'
  };
  
  // Add more specific detection logic here
  return messages.no_webgl;
};