import { styled } from "..";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  img: {
    cursor: 'pointer',
  },
})

export const IconGray = styled('div', {
  position: 'relative',
  borderRadius: 6,
  padding: '0.75rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray800',
  cursor: 'pointer',

  svg: {
    color: '$gray400',
  },
})

export const IconWhite = styled('div', {
  position: 'relative',
  borderRadius: 6,
  padding: '0.75rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray800',
  cursor: 'pointer',

  svg: {
    color: '$gray300',
  },
})

export const NotificationItems = styled('span', {
  position: 'absolute',
  top: '-0.75rem',
  right: '-0.75rem',
  width: '1.5rem',
  height: '1.5rem',

  fontWeight: 700,
  fontSize: '$sm',
  lineHeight: 1.6,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '$green500',
  color: '$white',

  borderRadius: '50%',
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: '$gray900',
})
