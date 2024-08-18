import { motion } from 'framer-motion';
import { NavItem } from './NavItem';

const navigation = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Ask Me Anything',
    link: '/ama',
  },
  {
    title: 'Contact',
    link: '/contact',
  },
];

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0.3 },
  },
};

export const Navigation = () => (
  <>
    <motion.ul className='navlist' variants={variants}>
      {navigation.map((item, i) => (
        <NavItem i={i} key={i} item={item} />
      ))}
    </motion.ul>
  </>
);
