'use client';
import { useState } from 'react';
import NavLink from './nav-link';
import classes from './interactive-nav.module.css';

export default function InteractiveNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div>
            <button 
                className={classes.toggleButton} 
                onClick={toggleNav}
                aria-expanded={isOpen}
            >
                {isOpen ? '▲' : '☰'}
            </button>
            <nav className={`${classes.nav} ${isOpen ? classes.open : classes.closed}`}>
                <ul className="flex space-x-4">
                    <li>
                        <NavLink href="/meals">Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Community</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}