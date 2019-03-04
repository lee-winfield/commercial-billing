import * as React from 'react'
import Cards from './Cards'
import { Prompt } from 'react-router-dom'
import { Fab } from '@rmwc/fab'
import '@material/fab/dist/mdc.fab.css';

const { useEffect } = React

const BillingPage: React.SFC = (props) => {
  useEffect( () => {
    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"  
  }, [])

  return (
    <>
      <Prompt
        when={true}
        message={location => `Are you sure you want to go to ${location.pathname}`}
      />
      <Cards />
      <Fab icon='add' label='Create' onClick={() => null} />
    </>
  )
}

export default BillingPage;
