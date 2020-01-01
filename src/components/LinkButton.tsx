import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonIcon } from '@rmwc/button'
import { Fab } from '@rmwc/fab'
import '@material/fab/dist/mdc.fab.css'
import '@material/button/dist/mdc.button.css'

interface LinkFabProps {
  icon: string;
  to: string;
}

export const LinkFab = ({ icon, to }: LinkFabProps) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Fab icon={icon} label='Create' onClick={() => null} style={{ margin: '0 0 1em 1em' }} />
  </Link>
)

interface LinkButtonProps {
  icon: string | null;
  to: string;
  label: string;
}

export const LinkButton = ({ icon, to, label}: LinkButtonProps) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Button>
      {icon ? <ButtonIcon icon={icon} /> : null}
      {label}
    </Button>
  </Link>
)