import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Navbar } from '../components/layout/Navbar';

const mockSetTheme = vi.fn();
const mockUseTheme = vi.fn(() => ({ setTheme: mockSetTheme, resolvedTheme: 'dark' }));

vi.mock('next-themes', () => ({ useTheme: () => mockUseTheme() }));
vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Sun: () => <div data-testid="sun-icon">Sun</div>,
  Moon: () => <div data-testid="moon-icon">Moon</div>,
}));
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

// Capture the scroll handler so tests can invoke it directly
let capturedScrollHandler: (() => void) | null = null;
const realAddEventListener = window.addEventListener.bind(window);
const realRemoveEventListener = window.removeEventListener.bind(window);

beforeEach(() => {
  capturedScrollHandler = null;
  vi.spyOn(window, 'addEventListener').mockImplementation((type: string, handler: any, opts?: any) => {
    if (type === 'scroll') capturedScrollHandler = handler;
    realAddEventListener(type, handler, opts);
  });
  vi.spyOn(window, 'removeEventListener').mockImplementation((type: string, handler: any) => {
    realRemoveEventListener(type, handler);
  });
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  mockUseTheme.mockReturnValue({ setTheme: mockSetTheme, resolvedTheme: 'dark' });
  vi.clearAllMocks();
});

describe('Navbar', () => {
  it('renders navbar with logo', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('ONP')).toBeInTheDocument();
  });

  it('renders logo with accent span', () => {
    render(<Navbar />);
    expect(screen.getByText('.')).toHaveClass('text-accent');
  });

  it('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders all navigation links with correct hrefs', () => {
    render(<Navbar />);
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/#about');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/#projects');
    expect(screen.getByText('Research').closest('a')).toHaveAttribute('href', '/#publications');
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/#blog');
    expect(screen.getByText('Education').closest('a')).toHaveAttribute('href', '/#education');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/#contact');
  });

  it('renders desktop nav list', () => {
    render(<Navbar />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('hidden', 'md:flex', 'items-center', 'gap-8');
  });

  it('applies base navbar classes', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'transition-all', 'duration-300');
  });

  it('is transparent when not scrolled', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toHaveClass('bg-transparent');
  });

  it('applies scrolled class when scrollY > 20', () => {
    render(<Navbar />);
    act(() => {
      (window as any).scrollY = 21;
      capturedScrollHandler?.();
    });
    expect(screen.getByRole('navigation')).toHaveClass('backdrop-blur-xl');
  });

  it('stays transparent when scrollY <= 20', () => {
    render(<Navbar />);
    act(() => {
      (window as any).scrollY = 20;
      capturedScrollHandler?.();
    });
    expect(screen.getByRole('navigation')).toHaveClass('bg-transparent');
  });

  it('sets up scroll event listener with passive option', () => {
    render(<Navbar />);
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
  });

  it('removes scroll event listener on unmount', () => {
    const { unmount } = render(<Navbar />);
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('renders logo as link to /', () => {
    render(<Navbar />);
    expect(screen.getByText('ONP').closest('a')).toHaveAttribute('href', '/');
  });

  it('applies logo styling', () => {
    render(<Navbar />);
    expect(screen.getByText('ONP')).toHaveClass('font-poppins', 'font-extrabold', 'text-lg', 'tracking-tight');
  });

  it('renders theme toggle button after mount', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('calls setTheme with light when in dark mode', () => {
    mockUseTheme.mockReturnValue({ setTheme: mockSetTheme, resolvedTheme: 'dark' });
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle theme'));
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('calls setTheme with dark when in light mode', () => {
    mockUseTheme.mockReturnValue({ setTheme: mockSetTheme, resolvedTheme: 'light' });
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle theme'));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('shows Sun icon in dark mode', () => {
    render(<Navbar />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('shows Moon icon in light mode', () => {
    mockUseTheme.mockReturnValue({ setTheme: mockSetTheme, resolvedTheme: 'light' });
    render(<Navbar />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navbar />);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('opens mobile menu when menu button is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getAllByText('About').length).toBeGreaterThan(1);
  });

  it('closes mobile menu when clicked again', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getAllByText('About').length).toBe(1);
  });

  it('shows X icon when menu is open', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });

  it('closes mobile menu when a mobile link is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    const allAbout = screen.getAllByText('About');
    fireEvent.click(allAbout[allAbout.length - 1]);
    expect(screen.getAllByText('About').length).toBe(1);
  });

  it('mobile menu links have correct hrefs', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    const allAbout = screen.getAllByText('About');
    expect(allAbout[allAbout.length - 1].closest('a')).toHaveAttribute('href', '/#about');
  });

  it('has correct container structure', () => {
    render(<Navbar />);
    const container = screen.getByRole('navigation').querySelector('.max-w-6xl');
    expect(container).toHaveClass('mx-auto', 'px-6', 'h-16', 'flex', 'items-center', 'justify-between');
  });
});
