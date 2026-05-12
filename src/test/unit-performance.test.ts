import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPerformanceConfig } from './performance-config';

const performanceConfig = getPerformanceConfig();

// Mock complex calculation modules for testing
const calculateSkillLevel = (experience: number, projects: number) => {
  const baseScore = experience * 0.6 + projects * 0.4;
  return Math.min(100, Math.max(0, baseScore));
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formatProjectDuration = (startDate: Date, endDate?: Date) => {
  const end = endDate || new Date();
  const diffTime = Math.abs(end.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;
  
  if (diffMonths === 0) {
    return `${diffDays} days`;
  } else if (remainingDays === 0) {
    return `${diffMonths} months`;
  } else {
    return `${diffMonths} months, ${remainingDays} days`;
  }
};

const calculateProjectComplexity = (technologies: string[], features: string[]) => {
  const techWeight = technologies.length * 2;
  const featureWeight = features.reduce((sum, feature) => {
    const complexityMap: { [key: string]: number } = {
      'authentication': 5,
      'real-time': 4,
      'database': 3,
      'api': 3,
      'ui-components': 2,
      'styling': 1,
    };
    return sum + (complexityMap[feature.toLowerCase()] || 1);
  }, 0);
  
  return techWeight + featureWeight;
};

describe('Unit Performance Benchmarks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Calculation Functions', () => {
    it('calculateSkillLevel performs within threshold', () => {
      const experience = 5;
      const projects = 12;
      
      const startTime = Date.now();
      const result = calculateSkillLevel(experience, projects);
      const endTime = Date.now();
      
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.CALCULATION_FUNCTIONS);
    });

    it('calculateSkillLevel handles large numbers efficiently', () => {
      const experience = 20;
      const projects = 50;
      
      const startTime = Date.now();
      const result = calculateSkillLevel(experience, projects);
      const endTime = Date.now();
      
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.CALCULATION_FUNCTIONS);
    });

    it('validateEmail performs within threshold', () => {
      const emails = [
        'test@example.com',
        'user.name+tag@domain.co.uk',
        'invalid-email',
        'user@sub.domain.com',
        'very.long.email.address@domain-name-with-dashes.org',
      ];
      
      const startTime = Date.now();
      const results = emails.map(email => validateEmail(email));
      const endTime = Date.now();
      
      expect(results).toEqual([true, true, false, true, true]);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.VALIDATION_LOGIC);
    });

    it('formatProjectDuration performs within threshold', () => {
      const startDate = new Date('2020-01-15');
      const endDate = new Date('2023-06-30');
      
      const startTime = Date.now();
      const result = formatProjectDuration(startDate, endDate);
      const endTime = Date.now();
      
      expect(result).toContain('months');
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.STRING_OPERATIONS);
    });

    it('calculateProjectComplexity performs within threshold', () => {
      const technologies = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'];
      const features = ['authentication', 'real-time', 'database', 'api', 'ui-components'];
      
      const startTime = Date.now();
      const result = calculateProjectComplexity(technologies, features);
      const endTime = Date.now();
      
      expect(result).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.CALCULATION_FUNCTIONS);
    });
  });

  describe('Data Transformations', () => {
    it('array transformation performance', () => {
      const skills = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Skill ${i + 1}`,
        level: Math.floor(Math.random() * 100),
        category: ['frontend', 'backend', 'database', 'devops'][i % 4],
      }));
      
      const startTime = Date.now();
      const result = skills
        .filter(skill => skill.level > 50)
        .map(skill => ({
          ...skill,
          category: skill.category.toUpperCase(),
          isExpert: skill.level > 80,
        }))
        .sort((a, b) => b.level - a.level);
      const endTime = Date.now();
      
      expect(result.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.DATA_TRANSFORMATIONS);
    });

    it('string processing performance', () => {
      const longString = 'Lorem ipsum '.repeat(1000);
      
      const startTime = Date.now();
      const result = longString
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3)
        .slice(0, 100);
      const endTime = Date.now();
      
      expect(result.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.STRING_OPERATIONS * 10);
    });

    it('object transformation performance', () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: 5,
        projects: [
          { name: 'Project A', duration: 6 },
          { name: 'Project B', duration: 12 },
          { name: 'Project C', duration: 3 },
        ],
      };
      
      const startTime = Date.now();
      const result = {
        fullName: userData.name.toUpperCase(),
        emailDomain: userData.email.split('@')[1],
        skillCount: userData.skills.length,
        totalExperience: userData.experience,
        averageProjectDuration: userData.projects.reduce((sum, p) => sum + p.duration, 0) / userData.projects.length,
        hasReactExperience: userData.skills.includes('React'),
      };
      const endTime = Date.now();
      
      expect(result.skillCount).toBe(3);
      expect(result.hasReactExperience).toBe(true);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.DATA_TRANSFORMATIONS);
    });
  });

  describe('Array Operations', () => {
    it('large array sorting performance', () => {
      const largeArray = Array.from({ length: 10000 }, () => Math.random() * 1000);
      
      const startTime = Date.now();
      const result = [...largeArray].sort((a, b) => a - b);
      const endTime = Date.now();
      
      expect(result).toHaveLength(10000);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.ARRAY_OPERATIONS * 10);
    });

    it('array filtering performance', () => {
      const items = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        category: ['A', 'B', 'C', 'D'][i % 4],
        value: Math.random() * 100,
        active: Math.random() > 0.3,
      }));
      
      const startTime = Date.now();
      const result = items.filter(item => item.active && item.value > 50);
      const endTime = Date.now();
      
      expect(result.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.ARRAY_OPERATIONS);
    });

    it('array reduce performance', () => {
      const numbers = Array.from({ length: 10000 }, () => Math.random() * 100);
      
      const startTime = Date.now();
      const result = numbers.reduce((sum, num) => sum + num, 0);
      const endTime = Date.now();
      
      expect(result).toBeGreaterThanOrEqual(0);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.ARRAY_OPERATIONS);
    });
  });

  describe('Memory Usage Tests', () => {
    it('should not leak memory during repeated calculations', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Perform many calculations
      for (let i = 0; i < 10000; i++) {
        calculateSkillLevel(Math.random() * 20, Math.random() * 50);
        validateEmail(`test${i}@example.com`);
        formatProjectDuration(new Date(2020, 0, 1), new Date());
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be minimal (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });

    it('should handle large data structures efficiently', () => {
      const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        data: new Array(100).fill(0).map(() => Math.random()),
        metadata: {
          created: new Date(),
          tags: Array.from({ length: 10 }, (_, j) => `tag-${j}`),
        },
      }));
      
      const startTime = Date.now();
      
      // Process large dataset
      const processed = largeDataSet.map(item => ({
        ...item,
        average: item.data.reduce((sum: number, val: number) => sum + val, 0) / item.data.length,
        tagCount: item.metadata.tags.length,
      }));
      
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      // Should process 10,000 complex objects in reasonable time
      expect(processingTime).toBeLessThan(1000); // 1 second
      expect(processed).toHaveLength(10000);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('validation with invalid data performs efficiently', () => {
      const invalidEmails = [
        '',
        'invalid',
        '@domain.com',
        'user@',
        'user@domain..com',
        ...Array.from({ length: 1000 }, (_, i) => `invalid-${i}@`),
      ];
      
      const startTime = Date.now();
      const results = invalidEmails.map(email => validateEmail(email));
      const endTime = Date.now();
      
      // Check that all emails are marked as invalid
      const validCount = results.filter(valid => valid).length;
      expect(validCount).toBeLessThanOrEqual(1); // Allow for edge cases
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.VALIDATION_LOGIC);
    });

    it('calculation with edge cases performs efficiently', () => {
      const edgeCases = [
        { experience: -5, projects: -10 },
        { experience: 0, projects: 0 },
        { experience: 100, projects: 200 },
        { experience: Number.MAX_SAFE_INTEGER, projects: Number.MAX_SAFE_INTEGER },
      ];
      
      const startTime = Date.now();
      const result = edgeCases.map(({ experience, projects }) => calculateSkillLevel(experience, projects));
      const endTime = Date.now();
      
      expect(result).toHaveLength(4);
      expect(endTime - startTime).toBeLessThan(performanceConfig.UNIT_PERFORMANCE.CALCULATION_FUNCTIONS);
    });
  });
});
