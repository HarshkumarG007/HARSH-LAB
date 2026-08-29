module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost/'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Strict Core Web Vitals checks
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // We might fail some offscreen images or modern formats because this is a 3D app
        'uses-optimized-images': 'off',
        'uses-responsive-images': 'off',
        'offscreen-images': 'off',
        'unused-javascript': 'warn',
        
        // Let the R3F canvas handle its own sizing
        'viewport': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
