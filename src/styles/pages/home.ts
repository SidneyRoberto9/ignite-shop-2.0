import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
  marginLeft: 'auto',
  minHeight: 656,
  overflow: 'hidden',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    padding: '5.5rem',
    objectFit: 'cover',

    '@media (max-height: 767px)': {
      padding: 0,
    },
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.25rem',
    paddingRight: '2rem',
    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0,0,0,0.75)',
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 200ms ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '0.25rem',
    },
  },

  strong: {
    fontSize: '$lg',
    color: '$gray100',
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
    color: '$green300',
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
})

export const Icon = styled('button', {
  border: 0,
  position: 'relative',
  borderRadius: 6,
  padding: '0.75rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$green500',
  cursor: 'pointer',

  svg: {
    color: '$gray300',
  },

  transition: 'all 200ms ease-in-out',

  '&:hover': {
    backgroundColor: '$green300',
    svg: {
      color: '$gray100',
    },
  },
})
