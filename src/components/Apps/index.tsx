"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppCard from "./components/AppCard";
import ZkDropApp from "./ZkDropApp";
import ZkSubApp from "./ZkSubApp";
import {
  CustomAppConfig,
  SpaceConfig,
  ZkDropAppConfig,
  ZkSubAppConfig,
} from "@/space-config/types";
import { GroupMetadata } from "@/src/libs/group-provider";
import { ImportedImage } from "@/src/app/(space)/[...slug]/page";
import { DateTime } from "luxon";
import { useModals } from "@/src/state/ModalState";
import CustomApp from "./CustomApp";

const Container = styled.div`
  margin: 48px 0px 80px 0px;
  //min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

type Props = {
  config: SpaceConfig;
  appSlug: string;
  groupMetadataList: GroupMetadata[];
  importedImages: ImportedImage[];
};

export default function Apps({
  config,
  appSlug,
  groupMetadataList,
  importedImages,
}: Props): JSX.Element {
  const [zkSubApp, setZkSubApp] = useState<ZkSubAppConfig>(null);
  // Don't use Boolean(zkSubApp) to open the app in order to avoid seeing the app disappear during the close animation
  const { zkSubAppIsOpen, setZkSubAppIsOpen } = useModals();
  const [zkSubAppOpening, setZkAppOpening] = useState(false);

  const [customApp, setCustomApp] = useState<CustomAppConfig>(null);
  const [isCustomAppOpen, setIsCustomAppOpen] = useState(false);

  const [zkDropApp, setZkDropApp] = useState<ZkDropAppConfig>(null);
  const [isZkDropAppOpen, setIsZkDropAppOpen] = useState(false);

  useEffect(() => {
    if (!config) return;
    if (!appSlug) return;
    const app = config.apps.find(
      (app) => app.type === "zksub" && app.slug === appSlug
    );
    if (app && app.type === "zksub") {
      setZkAppOpening(true);
      // Can open the modal only 300ms after the init due to animation
      setTimeout(() => {
        setZkSubApp(app);
        setZkSubAppIsOpen(true);
        setZkAppOpening(false);
      }, 300);
    }
  }, [config, appSlug]);


  return (
    <Container>
      <ZkSubApp
        isOpen={zkSubAppIsOpen}
        app={zkSubApp}
        space={config}
        groupMetadataList={groupMetadataList}
        onClose={() => {
          let url = window.location.origin + `/${config.slug}`;
          window.history.replaceState(null, "", url);
          setZkSubAppIsOpen(false);
        }}
      />
      <ZkDropApp
        isOpen={isZkDropAppOpen}
        app={zkDropApp}
        onClose={() => setIsZkDropAppOpen(false)}
      />
      <CustomApp
        isOpen={isCustomAppOpen}
        app={customApp}
        space={config}
        onClose={() => setIsCustomAppOpen(false)}
      />
      <Grid>
        {config?.apps &&
          config.apps.map((app) => {
            const luxonUTCStartDate =
              app?.startDate && DateTime.fromJSDate(app?.startDate);
            const hasStarted =
              luxonUTCStartDate ? DateTime.now().toUTC() > luxonUTCStartDate : true;

            return (
              <div key={app.slug}>
                <AppCard
                  app={app}
                  groupMetadataList={groupMetadataList}
                  cover={
                    importedImages.find((image) => image.app.slug === app.slug)
                      ?.link
                  }
                    hasStarted={hasStarted}
                  onCTAClick={() => {
                    if (!hasStarted) return;

                    if (zkSubAppOpening) return;

                    if (app.type === "external")
                      window.location.href = app.link;
                    if (app.type === "zkdrop") {
                      setZkDropApp(app);
                      setIsZkDropAppOpen(true);
                    }
                    if (app.type === "custom") {
                      console.log("custom")
                      setCustomApp(app);
                      setIsCustomAppOpen(true);
                    }
                    if (app.type === "zksub") {
                      let url =
                        window.location.origin + `/${config.slug}/${app.slug}`;
                      window.history.replaceState(null, "", url);
                      setZkSubApp(app);
                      setZkSubAppIsOpen(true);
                    }
                  }}
                />
              </div>
            );
          })}
        {!config && <div>No apps found for this space</div>}
      </Grid>
    </Container>
  );
}
