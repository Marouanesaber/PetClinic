
/**
 * Simple event bus for communicating between components
 */

// Define types of events
export type AppEvent = 
  | 'cart-updated'
  | 'user-logged-in'
  | 'user-logged-out'
  | 'dashboard-data-updated';

// Listen for an event
export const onEvent = (event: AppEvent, callback: (data?: any) => void): (() => void) => {
  const handler = (e: CustomEvent) => callback(e.detail);
  window.addEventListener(event, handler as EventListener);
  
  // Return a function to remove the listener
  return () => window.removeEventListener(event, handler as EventListener);
};

// Dispatch an event
export const emitEvent = (event: AppEvent, data?: any): void => {
  window.dispatchEvent(new CustomEvent(event, { detail: data }));
};
