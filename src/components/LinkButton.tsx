import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonIcon } from '@rmwc/button'
import { Fab } from '@rmwc/fab'
import '@material/fab/dist/mdc.fab.css'
import '@material/button/dist/mdc.button.css'

export const LinkFab = ({ icon, to }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Fab icon={icon} label='Create' onClick={() => null} />
  </Link>
)

export const LinkButton = ({ icon, to, label}) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Button>
      {icon ? <ButtonIcon icon={icon} /> : null}
      {label}
    </Button>
  </Link>
)