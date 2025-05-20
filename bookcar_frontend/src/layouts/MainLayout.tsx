import { useState } from "react";
import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiBreadcrumb,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiAvatar,
  EuiFlyout
} from "@elastic/eui";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const renderLogo = (
  <EuiHeaderLogo
    iconType="logoElastic"
    href="#"
    onClick={(e) => e.preventDefault()}
    aria-label="Go to home page"
  />
);


const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const panelled: EuiPageTemplateProps["panelled"] = undefined;
  const restrictWidth: EuiPageTemplateProps["restrictWidth"] = false;
  const bottomBorder: EuiPageTemplateProps["bottomBorder"] = "extended";

  return (
    <EuiPageTemplate
      panelled={panelled}
      restrictWidth={restrictWidth}
      bottomBorder={bottomBorder}
      offset={0}
      grow={true}
    >
      <Header
        onOpenSidebar={() => setShowSidebar(true)}
        onOpenRightMenu={() => alert('Right menu clicked!')}
      />
      {showSidebar && (
        <EuiFlyout
          ownFocus
          onClose={() => setShowSidebar(false)}
          side="left"
          size="380px"
        >
          <Sidebar />
        </EuiFlyout>
      )}
      <EuiPageTemplate.Section style={{ backgroundColor: "#ECF1F9" }}>
        <Outlet />
      </EuiPageTemplate.Section>
      <EuiPageTemplate.BottomBar
        paddingSize="s"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <EuiFlexGroup
          alignItems="center"
          justifyContent="spaceBetween"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiText size="s">
              <p>© 2025 Hệ thống đặt giờ tập lái. All rights reserved.</p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageTemplate.BottomBar>
    </EuiPageTemplate>
  );
};

export default MainLayout;
