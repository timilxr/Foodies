import LogoImg from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import classes from './main-header.module.css';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';
export default function MainHeader(){
    return (
        <>
        <MainHeaderBackground />
        <header className={classes.header}>
            {/* <div className="container mx-auto flex justify-between items-center"> */}
                <Link href="/" className={classes.logo}>
                <Image src={LogoImg} alt="A plate with food on it" priority className="rounded-full" />
                <p className="text-lg font-semibold">Logo</p>
                </Link>
                <nav className={classes.nav}>
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink href="/meals">Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Community</NavLink>
                        </li>
                    </ul>
                </nav>
            {/* </div> */}
        </header>
        </>
    );
}