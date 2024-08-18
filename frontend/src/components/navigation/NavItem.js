import { motion } from 'framer-motion';

const variants = {
  open: {
    y: 0,
    display: 'block',
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

export const NavItem = ({ i, item }) => {
  return (
    <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <a href={item.link}>{item.title}</a>
    </motion.li>
  );
};
