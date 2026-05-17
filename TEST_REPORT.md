# Test Report — Om Narayan Pandit Portfolio
Generated: 2026-05-17

---

## Summary

| Suite | Files | Tests | Passed | Failed | Duration |
|---|---|---|---|---|---|
| Unit / Component (Vitest) | 28 | 295 | 295 | 0 | 24.3s |
| E2E / Integration (Playwright) | 6 | 20 | 20 | 0 | 18.6s |
| **Total** | **34** | **315** | **315** | **0** | — |

**Mutation Score: 75.85%** (245 killed / 323 total mutants)

---

## Unit & Component Tests (Vitest v4.1.6)

### AnimatedText
| Test | Result | Duration |
|---|---|---|
| renders with typewriter type immediately | ✓ | 39ms |
| starts empty for reveal type and fills over time | ✓ | 7ms |
| starts empty for scramble type and resolves | ✓ | 11ms |
| applies custom className | ✓ | 6ms |
| respects delay for reveal type | ✓ | 4ms |

### Badge
| Test | Result | Duration |
|---|---|---|
| renders with default props | ✓ | 40ms |
| applies variant classes correctly | ✓ | 4ms |
| applies accent variant by default | ✓ | 3ms |
| applies cyan variant | ✓ | 3ms |
| applies pink variant | ✓ | 25ms |
| applies muted variant | ✓ | 2ms |
| applies custom className | ✓ | 2ms |
| has base styling classes | ✓ | 2ms |
| renders TechPill component | ✓ | 3ms |
| renders TechPill with hot variant | ✓ | 3ms |
| renders TechPill with default variant | ✓ | 2ms |

### Button
| Test | Result | Duration |
|---|---|---|
| renders with default props | ✓ | 33ms |
| applies primary variant by default | ✓ | 73ms |
| applies ghost variant | ✓ | 8ms |
| applies danger variant | ✓ | 7ms |
| applies outline variant | ✓ | 5ms |
| applies small size | ✓ | 5ms |
| applies medium size by default | ✓ | 5ms |
| applies large size | ✓ | 5ms |
| handles click events | ✓ | 8ms |
| shows loading state | ✓ | 7ms |
| supports custom className | ✓ | 2ms |
| supports accessibility attributes | ✓ | 8ms |
| is disabled when loading | ✓ | 2ms |
| forwards other button props | ✓ | 1ms |
| LinkButton — renders with default props | ✓ | 4ms |
| LinkButton — applies primary variant by default | ✓ | 2ms |
| LinkButton — applies ghost variant | ✓ | 2ms |
| LinkButton — applies outline variant | ✓ | 2ms |
| LinkButton — applies small size | ✓ | 2ms |
| LinkButton — applies medium size by default | ✓ | 1ms |
| LinkButton — applies large size | ✓ | 1ms |
| LinkButton — handles click events | ✓ | 3ms |
| LinkButton — forwards other anchor props | ✓ | 2ms |
| LinkButton — supports custom className | ✓ | 1ms |

### ErrorBoundary
| Test | Result | Duration |
|---|---|---|
| renders children when there is no error | ✓ | 28ms |
| catches errors and renders default fallback | ✓ | 27ms |
| renders custom fallback when provided | ✓ | 45ms |
| calls componentDidCatch when error occurs | ✓ | 22ms |
| resets error state when reset is called | ✓ | 7ms |
| passes error and reset props to custom fallback | ✓ | 5ms |
| shows error message when present | ✓ | 7ms |
| shows fallback text when error has no message | ✓ | 4ms |
| logs error details in default fallback | ✓ | 7ms |
| does not log when error is undefined in useEffect | ✓ | 2ms |
| handles undefined error gracefully | ✓ | 9ms |
| renders Try again and Refresh page buttons | ✓ | 4ms |
| reload button calls window.location.reload | ✓ | 8ms |
| initializes with correct state | ✓ | 1ms |

### Footer
| Test | Result | Duration |
|---|---|---|
| renders footer with all elements | ✓ | 74ms |
| renders author information | ✓ | 7ms |
| highlights author name | ✓ | 7ms |
| renders social links | ✓ | 19ms |
| has correct link attributes | ✓ | 9ms |
| has correct link hrefs | ✓ | 19ms |
| applies correct styling to links | ✓ | 5ms |
| renders footer tagline | ✓ | 3ms |
| has correct container structure | ✓ | 6ms |
| has correct text content structure | ✓ | 4ms |
| renders all three social links | ✓ | 7ms |
| has semantic footer element | ✓ | 4ms |

### LazyImage
| Test | Result | Duration |
|---|---|---|
| does not render img before intersection | ✓ | 29ms |
| renders img after intersection | ✓ | 58ms |
| renders img immediately when priority=true | ✓ | 9ms |
| shows error fallback on image error | ✓ | 14ms |
| applies custom className | ✓ | 3ms |
| sets alt attribute | ✓ | 3ms |

### Navbar
| Test | Result | Duration |
|---|---|---|
| renders navbar with logo | ✓ | 97ms |
| renders logo with accent span | ✓ | 8ms |
| renders all navigation links | ✓ | 11ms |
| renders all navigation links with correct hrefs | ✓ | 11ms |
| renders desktop nav list | ✓ | 17ms |
| applies base navbar classes | ✓ | 8ms |
| is transparent when not scrolled | ✓ | 5ms |
| applies scrolled class when scrollY > 20 | ✓ | 7ms |
| stays transparent when scrollY <= 20 | ✓ | 4ms |
| sets up scroll event listener with passive option | ✓ | 4ms |
| removes scroll event listener on unmount | ✓ | 3ms |
| renders logo as link to / | ✓ | 2ms |
| applies logo styling | ✓ | 2ms |
| renders theme toggle button after mount | ✓ | 3ms |
| calls setTheme with light when in dark mode | ✓ | 5ms |
| calls setTheme with dark when in light mode | ✓ | 2ms |
| shows Sun icon in dark mode | ✓ | 2ms |
| shows Moon icon in light mode | ✓ | 2ms |
| renders mobile menu button | ✓ | 2ms |
| opens mobile menu when menu button is clicked | ✓ | 5ms |
| closes mobile menu when clicked again | ✓ | 6ms |
| shows X icon when menu is open | ✓ | 3ms |
| closes mobile menu when a mobile link is clicked | ✓ | 5ms |
| mobile menu links have correct hrefs | ✓ | 3ms |
| has correct container structure | ✓ | 3ms |

### OptimizedButton
| Test | Result | Duration |
|---|---|---|
| renders children | ✓ | 39ms |
| calls onClick when clicked | ✓ | 13ms |
| is disabled when loading=true | ✓ | 64ms |
| shows spinner when loading | ✓ | 8ms |
| applies primary variant classes by default | ✓ | 5ms |
| applies ghost variant classes | ✓ | 4ms |
| applies danger variant classes | ✓ | 5ms |
| applies outline variant classes | ✓ | 5ms |
| applies sm size classes | ✓ | 4ms |
| applies lg size classes | ✓ | 4ms |
| applies custom className | ✓ | 5ms |

### OptimizedImage
| Test | Result | Duration |
|---|---|---|
| does not render img before intersection | ✓ | 31ms |
| renders img after intersection | ✓ | 50ms |
| renders img immediately when priority=true | ✓ | 8ms |
| shows error fallback on image error | ✓ | 16ms |
| sets alt attribute | ✓ | 4ms |
| shows blur placeholder by default | ✓ | 4ms |
| shows pulse placeholder when placeholder=empty | ✓ | 3ms |

### OptimizedReveal
| Test | Result | Duration |
|---|---|---|
| renders children | ✓ | 22ms |
| starts hidden | ✓ | 3ms |
| becomes visible when intersecting | ✓ | 4ms |
| applies custom className | ✓ | 2ms |

### OptimizedSectionHeader
| Test | Result | Duration |
|---|---|---|
| renders label | ✓ | 34ms |
| renders title | ✓ | 4ms |
| renders subtitle when provided | ✓ | 4ms |
| does not render subtitle when not provided | ✓ | 4ms |
| applies text-center when centered | ✓ | 9ms |
| does not apply text-center when not centered | ✓ | 7ms |
| applies justify-center to label row when centered | ✓ | 9ms |
| renders accent line when not centered | ✓ | 2ms |
| applies custom className | ✓ | 5ms |

### OptimizedTiltCard
| Test | Result | Duration |
|---|---|---|
| renders children | ✓ | 38ms |
| applies custom className | ✓ | 5ms |
| resets transform on mouse leave | ✓ | 58ms |
| updates transform on mouse move | ✓ | 5ms |
| renders glare element when glare=true | ✓ | 80ms |
| does not render glare element when glare=false | ✓ | 2ms |

### Reveal
| Test | Result | Duration |
|---|---|---|
| renders children | ✓ | 33ms |
| is invisible initially (opacity 0) | ✓ | 3ms |
| becomes visible when isVisible=true | ✓ | 3ms |
| applies translateY transform for up direction | ✓ | 3ms |
| applies translateX transform for left direction | ✓ | 3ms |
| applies translateX transform for right direction | ✓ | 2ms |
| applies no transform for none direction | ✓ | 11ms |
| applies custom className | ✓ | 3ms |
| includes delay in transition style | ✓ | 2ms |

### SectionHeader
| Test | Result | Duration |
|---|---|---|
| renders with required props | ✓ | 36ms |
| renders with subtitle | ✓ | 5ms |
| renders without subtitle when not provided | ✓ | 3ms |
| applies custom className | ✓ | 5ms |
| renders centered when centered prop is true | ✓ | 4ms |
| renders left-aligned by default | ✓ | 3ms |
| shows line when not centered | ✓ | 5ms |
| hides line when centered | ✓ | 2ms |
| applies correct label styling | ✓ | 3ms |
| applies correct title styling | ✓ | 3ms |
| applies subtitle styling when provided | ✓ | 3ms |
| centers subtitle when centered | ✓ | 61ms |
| renders with React title as string | ✓ | 3ms |
| renders with React title as element | ✓ | 3ms |

### SectionTransition
| Test | Result | Duration |
|---|---|---|
| renders with correct id | ✓ | 27ms |
| starts hidden | ✓ | 9ms |
| becomes visible after intersection | ✓ | 11ms |
| renders children when visible | ✓ | 17ms |
| applies custom className | ✓ | 4ms |

### ServiceWorkerRegister
| Test | Result | Duration |
|---|---|---|
| returns null | ✓ | 9ms |
| renders nothing | ✓ | 1ms |

### Skeleton
| Test | Result | Duration |
|---|---|---|
| renders text variant with one line by default | ✓ | 55ms |
| renders multiple lines for text variant | ✓ | 5ms |
| last line of text variant is 75% width | ✓ | 5ms |
| renders card variant | ✓ | 4ms |
| renders avatar variant with rounded-full | ✓ | 15ms |
| renders project variant | ✓ | 2ms |
| applies custom className | ✓ | 5ms |
| CardSkeleton — renders without crashing | ✓ | 5ms |
| ProjectGridSkeleton — renders 6 cards by default | ✓ | 20ms |
| ProjectGridSkeleton — renders custom count | ✓ | 16ms |

### TiltCard
| Test | Result | Duration |
|---|---|---|
| renders children | ✓ | 46ms |
| applies custom className | ✓ | 5ms |
| resets transform on mouse leave | ✓ | 34ms |
| updates transform on mouse move | ✓ | 89ms |
| renders glare overlay when glare=true | ✓ | 3ms |
| does not render glare overlay when glare=false | ✓ | 2ms |

### API Routes
| Test | Result | Duration |
|---|---|---|
| GET /api/projects — returns projects with success:true | ✓ | 10ms |
| GET /api/publications — returns publications with success:true | ✓ | 6ms |
| GET /api/blog — returns blogPosts with success:true | ✓ | 6ms |

### Contact Route
| Test | Result | Duration |
|---|---|---|
| returns 429 when rate limited | ✓ | 12ms |
| returns 500 when env vars missing | ✓ | 1ms |
| returns 400 when fields missing | ✓ | 1ms |
| returns 400 for invalid email | ✓ | 1ms |
| sends two emails and returns success on valid input | ✓ | 1ms |
| sanitizes HTML in inputs | ✓ | 1ms |
| returns 500 on Resend error | ✓ | 3ms |
| uses x-forwarded-for header for rate limiting | ✓ | 1ms |
| falls back to x-real-ip when x-forwarded-for absent | ✓ | 1ms |

### Hooks (hooks-index)
| Test | Result | Duration |
|---|---|---|
| useScrollReveal — starts not visible | ✓ | 18ms |
| useScrollReveal — becomes visible on intersection | ✓ | 4ms |
| useMousePosition — initializes at 0,0 | ✓ | 3ms |
| useMousePosition — updates on mousemove | ✓ | 4ms |
| useCardMouseGlow — returns ref and handleMouseMove | ✓ | 2ms |
| useCardMouseGlow — sets CSS custom properties on mouse move | ✓ | 3ms |
| useCounter — starts at 0 | ✓ | 4ms |
| useCounter — counts up when start=true | ✓ | 4ms |
| useCounter — reaches target value | ✓ | 22ms |
| useMediaQuery — returns false for non-matching query | ✓ | 2ms |
| useMediaQuery — returns true for matching query | ✓ | 1ms |
| useLocalStorage — returns initial value when key not set | ✓ | 1ms |
| useLocalStorage — persists value to localStorage | ✓ | 1ms |
| useLocalStorage — reads existing value from localStorage | ✓ | 1ms |
| useLocalStorage — works with object values | ✓ | 26ms |

### useLazyLoad
| Test | Result | Duration |
|---|---|---|
| initializes isInView as false | ✓ | 12ms |
| creates IntersectionObserver and observes element | ✓ | 2ms |
| sets isInView to true when element intersects | ✓ | 3ms |
| unobserves after intersection when triggerOnce=true | ✓ | 2ms |
| does NOT unobserve after intersection when triggerOnce=false | ✓ | 2ms |
| sets isInView to false when not intersecting and triggerOnce=false | ✓ | 1ms |
| does not reset isInView when not intersecting and triggerOnce=true | ✓ | 1ms |
| passes custom threshold and rootMargin to IntersectionObserver | ✓ | 1ms |
| uses default threshold=0.1 and rootMargin=50px | ✓ | 1ms |
| unobserves on unmount | ✓ | 1ms |

### useLoadingState
| Test | Result | Duration |
|---|---|---|
| initializes with default state | ✓ | 11ms |
| sets loading state correctly | ✓ | 2ms |
| sets error state correctly | ✓ | 1ms |
| resets state correctly | ✓ | 2ms |
| handles successful execution | ✓ | 2ms |
| handles execution error | ✓ | 4ms |
| handles non-Error objects | ✓ | 1ms |
| sets loading to false after execution | ✓ | 1ms |
| maintains stable function references | ✓ | 1ms |
| provides all required functions | ✓ | 1ms |
| handles concurrent operations | ✓ | 1ms |
| clears error when setting loading | ✓ | 1ms |
| handles reset during loading | ✓ | 4ms |

### useTouchGestures
| Test | Result | Duration |
|---|---|---|
| returns isTouchDevice | ✓ | 16ms |
| calls swipeRight on right swipe | ✓ | 20ms |
| calls tap after touchstart | ✓ | 7ms |
| resets state on touchend | ✓ | 4ms |
| handles pinch gesture (2 touches on touchstart) | ✓ | 3ms |
| cleans up event listeners on unmount | ✓ | 2ms |

### rateLimit
| Test | Result | Duration |
|---|---|---|
| allows first request | ✓ | 3ms |
| allows requests within limit | ✓ | 0ms |
| blocks requests when limit is exceeded | ✓ | 0ms |
| resets after window expires | ✓ | 0ms |
| handles different identifiers separately | ✓ | 0ms |
| respects custom limit | ✓ | 0ms |
| respects custom window time | ✓ | 0ms |
| provides correct reset time | ✓ | 0ms |
| handles single request correctly | ✓ | 0ms |
| increments count correctly | ✓ | 0ms |
| creates new entry after expiration | ✓ | 0ms |
| handles edge case of exact window boundary | ✓ | 0ms |
| sets up cleanup interval in server environment | ✓ | 0ms |

### Utils
| Test | Result | Duration |
|---|---|---|
| cn — merges class names correctly | ✓ | 5ms |
| cn — handles conditional classes | ✓ | 0ms |
| cn — merges Tailwind classes correctly | ✓ | 0ms |
| formatDate — formats date string correctly | ✓ | 13ms |
| formatDate — handles different date formats | ✓ | 0ms |
| formatDateShort — formats date to short format | ✓ | 0ms |
| formatDateShort — handles different months | ✓ | 0ms |
| slugify — converts text to slug format | ✓ | 0ms |
| slugify — removes special characters | ✓ | 0ms |
| slugify — handles multiple spaces and hyphens | ✓ | 0ms |
| slugify — handles leading/trailing hyphens | ✓ | 0ms |
| readTime — calculates reading time correctly | ✓ | 0ms |
| readTime — rounds up for partial minutes | ✓ | 0ms |
| readTime — handles empty content | ✓ | 0ms |
| truncate — truncates long text | ✓ | 0ms |
| truncate — returns original text if under limit | ✓ | 0ms |
| truncate — handles exact length | ✓ | 0ms |
| statusConfig — has correct configuration for all statuses | ✓ | 1ms |
| statusConfig — has all required statuses | ✓ | 1ms |

### Metadata
| Test | Result | Duration |
|---|---|---|
| siteMetadata — has correct default title | ✓ | 1ms |
| siteMetadata — has title template | ✓ | 0ms |
| siteMetadata — has description | ✓ | 0ms |
| siteMetadata — has keywords array | ✓ | 0ms |
| siteMetadata — has openGraph with correct type | ✓ | 0ms |
| siteMetadata — has robots config | ✓ | 0ms |
| generatePageMetadata — sets title | ✓ | 0ms |
| generatePageMetadata — uses provided description | ✓ | 0ms |
| generatePageMetadata — falls back to siteMetadata description | ✓ | 0ms |
| generatePageMetadata — merges provided keywords | ✓ | 0ms |
| generatePageMetadata — uses site keywords when none provided | ✓ | 0ms |
| generatePageMetadata — sets openGraph title | ✓ | 0ms |

### Unit Performance Benchmarks
| Test | Result | Duration |
|---|---|---|
| calculateSkillLevel performs within threshold | ✓ | 2ms |
| calculateSkillLevel handles large numbers efficiently | ✓ | 0ms |
| validateEmail performs within threshold | ✓ | 1ms |
| formatProjectDuration performs within threshold | ✓ | 1ms |
| calculateProjectComplexity performs within threshold | ✓ | 0ms |
| array transformation performance | ✓ | 1ms |
| string processing performance | ✓ | 1ms |
| object transformation performance | ✓ | 1ms |
| large array sorting performance | ✓ | 6ms |
| array filtering performance | ✓ | 2ms |
| array reduce performance | ✓ | 2ms |
| should not leak memory during repeated calculations | ✓ | 11ms |
| should handle large data structures efficiently | ✓ | 74ms |
| validation with invalid data performs efficiently | ✓ | 1ms |
| calculation with edge cases performs efficiently | ✓ | 0ms |

---

## E2E / Integration Tests (Playwright — Chromium)

### API Latency Validation
| Test | Result | Duration |
|---|---|---|
| GET /api/projects responds under 500ms | ✓ | 322ms |
| GET /api/publications responds under 500ms | ✓ | 548ms |
| GET /api/blog responds under 500ms | ✓ | 355ms |
| POST /api/contact returns 400 for missing fields | ✓ | 352ms |
| concurrent requests to /api/projects all succeed | ✓ | 48ms |

### Performance Audits
| Test | Result | Duration |
|---|---|---|
| homepage loads under 3s | ✓ | 516ms |
| homepage has correct title | ✓ | 1.4s |
| blog page loads under 3s | ✓ | 1.0s |
| homepage has no console errors on load | ✓ | 134ms |
| navigation links are present | ✓ | 644ms |

### Response Time Benchmarks
| Test | Result | Duration |
|---|---|---|
| homepage navigation under 3s | ✓ | 471ms |
| blog page navigation under 3s | ✓ | 2.4s |
| navbar toggle responds under 200ms | ✓ | 728ms |
| contact form is present on homepage | ✓ | 1.3s |
| page load performance metrics are reasonable | ✓ | 468ms |

### Working Performance Tests
| Test | Result | Duration |
|---|---|---|
| page load performance test (first paint: 344ms, load: 1553ms) | ✓ | 1.8s |
| interaction performance test (button click: 69ms) | ✓ | 1.5s |
| navigation performance test (nav time: 458ms) | ✓ | 1.1s |

### Navigation Tests
| Test | Result | Duration |
|---|---|---|
| Simple Test — basic navigation test | ✓ | 3.7s |
| Working Test — basic navigation test | ✓ | 3.0s |

---

## Mutation Testing (Stryker v9.6.1)

| File | Score | Killed | Survived | No Coverage |
|---|---|---|---|---|
| **All files** | **75.85%** | **245** | **64** | **14** |
| components/layout/Footer.tsx | 92.31% | 12 | 1 | 0 |
| components/layout/Navbar.tsx | 66.13% | 41 | 21 | 0 |
| components/ui/Badge.tsx | 94.44% | 17 | 1 | 0 |
| components/ui/Button.tsx | 72.22% | 26 | 6 | 4 |
| components/ui/ErrorBoundary.tsx | 70.00% | 28 | 12 | 0 |
| components/ui/SectionHeader.tsx | 79.17% | 19 | 5 | 0 |
| hooks/useLazyLoad.ts | 88.00% | 22 | 3 | 0 |
| hooks/useLoadingState.ts | 75.00% | 18 | 6 | 0 |
| lib/rateLimit.ts | 62.50% | 25 | 5 | 10 |
| lib/utils.ts | 90.24% | 37 | 4 | 0 |

> Note: Remaining survivors are primarily equivalent mutants (`useEffect` dep arrays, `process.env.NODE_ENV` branches untestable in test env) and server-side `setInterval` code with no coverage in jsdom.

---

## Notes

- stderr output from ErrorBoundary tests (React error boundary noise) is expected — tests intentionally throw errors to verify boundary behavior.
- `forwardRef` warnings on OptimizedButton, OptimizedTiltCard, SectionTransition are pre-existing component issues, not test failures.
- `useLoadingState` "handles reset during loading" produces an `act()` warning — benign, test passes correctly.
