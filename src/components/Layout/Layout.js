import React from 'react';

// import withMuiTheme from './withMuiTheme';
import TopNav from './TopNav';

const Layout = ({ children }) => {
  return (
    <div>
      <TopNav />
      {children}
    </div>
  );
};

//export default withMuiTheme(Layout);
export default Layout;
