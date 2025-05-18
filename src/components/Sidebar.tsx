import React from 'react';
import {
  EuiCollapsibleNavGroup,
  EuiText,
  EuiListGroup,
  EuiListGroupProps,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
  EuiSpacer,
  EuiButton,
  EuiButtonIcon,
  EuiLink,
} from '@elastic/eui';

const deploymentsList: EuiListGroupProps['listItems'] = [
  {
    label: 'combining-binaries',
    iconType: 'logoAzureMono',
    size: 's',
  },
  {
    label: 'stack-monitoring',
    iconType: 'logoAWSMono',
    size: 's',
  },
];

const TopNavLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    pinnable: false,
  },
  { label: 'Dashboards', pinned: true },
  { label: 'Dev tools', pinned: true },
  { label: 'Maps', pinned: true },
];

const KibanaNavLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Discover' },
  { label: 'Visualize' },
  { label: 'Dashboards' },
  { label: 'Canvas' },
  { label: 'Maps' },
  { label: 'Machine Learning' },
  { label: 'Graph' },
];

const DeploymentsGroup = (
  <EuiCollapsibleNavGroup
    title={
      <span>
        <small style={{ fontWeight: 'normal' }}>Deployment</small> <br />
        <strong>personal-databoard</strong>
      </span>
    }
    iconType="logoGCPMono"
    iconSize="xl"
    isCollapsible={true}
    initialIsOpen={false}
    background="light"
  >
    <EuiListGroup listItems={deploymentsList} flush />
    <EuiSpacer size="s" />
    <EuiButton fullWidth>Manage deployments</EuiButton>
  </EuiCollapsibleNavGroup>
);

const SecurityGroup = (
  <EuiCollapsibleNavGroup
    background="light"
    iconType="logoSecurity"
    title="Elastic Security"
    isCollapsible={true}
    initialIsOpen={true}
    arrowDisplay="none"
    extraAction={
      <EuiButtonIcon
        aria-label="Hide and never show again"
        title="Hide and never show again"
        iconType="cross"
      />
    }
  >
    <EuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
      <p>
        Threat prevention, detection, and response with SIEM and endpoint
        security.
        <br />
        <EuiLink>Learn more</EuiLink>
      </p>
    </EuiText>
  </EuiCollapsibleNavGroup>
);

const Sidebar = () => (
  <>
    {DeploymentsGroup}
    <EuiCollapsibleNavGroup background="light">
      <EuiPinnableListGroup
        listItems={TopNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="text"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
    <EuiCollapsibleNavGroup
      title="Kibana"
      iconType="logoKibana"
      isCollapsible={true}
      initialIsOpen={true}
    >
      <EuiPinnableListGroup
        listItems={KibanaNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="subdued"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
    {SecurityGroup}
  </>
);

export default Sidebar;