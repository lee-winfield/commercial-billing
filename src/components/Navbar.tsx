import * as React from 'react'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

const Navbar = () => (
  <TopAppBar>
    <TopAppBarRow>
      <TopAppBarSection alignStart >
        <TopAppBarNavigationIcon icon="menu" />
        <TopAppBarTitle>
          Billing Center
        </TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection alignEnd >
        <TopAppBarNavigationIcon icon="search" />
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
)

export default Navbar