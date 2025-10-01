import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '../auth/auth-button';
import { ThemeToggle } from '../theme-toggle';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';

export function GlobalHeader() {
        const { user } = useAuth();

        return (
                <motion.header
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="sticky top-0 z-50"
                >
                        <div className="relative">
                                {/* Subtle gradient accent */}
                                <div className="absolute inset-0" />

                                {/* Main content - thinner height */}
                                <div className="relative flex items-center justify-between px-5 h-12">
                                        {/* Left section */}
                                        <motion.div
                                                whileTap={{ scale: 0.95 }}
                                                transition={{
                                                        type: 'spring',
                                                        stiffness: 400,
                                                        damping: 17,
                                                }}
                                                className='flex items-center'
                                        >
                                                {user && <SidebarTrigger className="h-8 w-8 text-text-primary rounded-md hover:bg-purple-50/40 transition-colors duration-200" />}
                                                <img 
                                                        src="/chirpy-logo.png" 
                                                        alt="Chirpy Logo" 
                                                        className="flex-shrink-0 transition-all duration-300"
                                                        style={{
                                                                width: '120px',
                                                                height: 'auto',
                                                                marginLeft: user ? '8px' : '0',
                                                        }}
                                                />
                                        </motion.div>

                                        {/* Right section */}
                                        <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="flex items-center gap-2"
                                        >
                        {/* Disable cost display for now */}
                                                {/* {user && (
                                                        <CostDisplay
                                                                {...extractUserAnalyticsProps(analytics)}
                                                                loading={analyticsLoading}
                                                                variant="inline"
                                                        />
                                                )} */}
                                                <ThemeToggle />
                                                <AuthButton />
                                        </motion.div>
                                </div>
                        </div>
                </motion.header>
        );
}
