interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
): { success: boolean; resetTime?: number } {
  const now = Date.now();
  const key = identifier;
  
  // Clean up expired entries
  if (store[key] && now > store[key].resetTime) {
    delete store[key];
  }
  
  if (!store[key]) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true };
  }
  
  if (store[key].count >= limit) {
    return { 
      success: false, 
      resetTime: store[key].resetTime 
    };
  }
  
  store[key].count++;
  return { success: true };
}

// Clean up expired entries periodically
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach(key => {
      if (now > store[key].resetTime) {
        delete store[key];
      }
    });
  }, 5 * 60 * 1000); // Clean up every 5 minutes
}
