import { styled } from "..";

export const SideNavContainer = styled('section', {
  position: 'relative',

  '.bm-item-list': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  h1: {
    fontWeight: 'bold',
    fontSize: '$lg',
    color: '$gray100',
    lineHeight: 1.6,

    padding: '3rem',
    paddingBottom: '2.5rem',
  },

  '.bm-cross': {
    cursor: 'pointer',
    backgroundColor: '$gray400',
  },

  '.bm-menu': {
    background: '$gray800',
    padding: '0.3rem 0.3rem 0',
    fontSize: '1.15em',
  },

  '.bm-overlay': {
    background: 'rgba(0, 0, 0, 0.3)',
  },
})

export const ItemsContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '0 3rem',
  gap: '1.5rem',
})

export const Content = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '3rem',

  article: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '3rem',
  },

  p: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  'span, small': {
    fontSize: '$m',
    lineHeight: 1.6,
    color: '$gray100',
  },

  small: {
    fontSize: '$md',
    color: '$gray300',
  },

  'strong , ins': {
    fontSize: '$m',
    fontWeight: 'bold',
    lineHeight: 1.6,
    color: '$gray100',
  },

  ins: {
    fontSize: '$xl',
    lineHeight: 1.4,
    textDecoration: 'none',
  },
})

export const Item = styled('div', {
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gap: '1.25rem',

  ins: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
  },

  img: {
    objectFit: 'cover',
  },

  article: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  small: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25rem',
  },

  span: {
    fontWeight: 'bold',
    fontSize: '$m',
    lineHeight: 1.6,
    color: '$green500',
    cursor: 'pointer',

    transition: 'color 200ms ease-in-out',

    '&:hover': {
      color: '$green300',
    },
  },

  strong: {
    fontWeight: 'bold',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray100',
  },

  p: {
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },
})

export const Button = styled('button', {
  border: 0,
  outline: 0,
  borderRadius: 8,

  padding: '1.25rem 2rem',
  width: '100%',

  fontSize: '$md',
  lineHeight: 1.6,
  fontWeight: 'bold',
  cursor: 'pointer',

  color: '$white',
  backgroundColor: '$green500',

  transition: 'background-color 200ms ease-in-out',

  '&:disabled': {
    filter: 'grayscale(0.6)',
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },
})
