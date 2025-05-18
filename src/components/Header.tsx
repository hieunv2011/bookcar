import React from 'react';
import {
  EuiBreadcrumb,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiHeaderSections,
  EuiIcon,
  EuiAvatar,
} from '@elastic/eui';

const Header = ({
  onOpenSidebar,
  onOpenRightMenu
}: {
  onOpenSidebar?: () => void;
  onOpenRightMenu?: () => void;
}) => {
  const renderLogo = (
    <EuiHeaderLogo
      iconType="logoElastic"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Go to home page"
    />
  );

  const renderMenuLeft = (
    <EuiHeaderSectionItemButton aria-label="Open sidebar" onClick={onOpenSidebar}>
      <EuiIcon type="menu" size="m" />
    </EuiHeaderSectionItemButton>
  );

  const renderMenuRight = (
    <EuiHeaderSectionItemButton aria-label="Open right menu" onClick={onOpenRightMenu}>
      <EuiIcon type="menuRight" size="m" />
    </EuiHeaderSectionItemButton>
  );

  const renderSpaces = (
    <EuiHeaderSectionItemButton aria-label="Spaces menu">
      <EuiAvatar type="space" name="Sales Team" size="s" />
    </EuiHeaderSectionItemButton>
  );

  const breadcrumbs: EuiBreadcrumb[] = [
    {
      text: 'Management',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Users',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Create',
    },
  ];

  const renderSearch = (
    <EuiHeaderSectionItemButton disabled aria-label="Sitewide search">
      <EuiIcon type="search" size="m" />
    </EuiHeaderSectionItemButton>
  );

  const renderUser = (
    <EuiHeaderSectionItemButton disabled aria-label="Account menu">
      <EuiAvatar isDisabled name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );

  const renderApps = (
    <EuiHeaderSectionItemButton
      disabled
      aria-label="Apps menu with 1 new app"
      notification="1"
    >
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );

  const sections: EuiHeaderSections[] = [
    {
      items: [renderMenuLeft, renderLogo, renderSpaces],
      breadcrumbs: breadcrumbs,
      breadcrumbProps: {
        'aria-label': 'Header sections breadcrumbs',
      },
    },
    {
      items: [renderSearch, renderUser, renderApps, renderMenuRight],
    },
  ];

  return <EuiHeader sections={sections} />;
};

export default Header;