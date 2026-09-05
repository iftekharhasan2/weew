import React from 'react';

/**
 * Renders the site directly using bundled data without blocking on backend connectivity.
 */
export const ContentGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default ContentGate;

