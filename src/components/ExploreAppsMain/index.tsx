"use client";
import {
  AppFront,
  SpaceConfigFront,
  SpaceImportedImage,
} from "@/src/app/(home)/page";
import env from "@/src/environments";
import Link from "next/link";
import styled from "styled-components";
import AppCardLarge from "../AppCardLarge";
import SpaceCard from "../SpaceCard";
import AppCardSmall from "../AppCardSmall";
import App from "next/app";
import AppListGrid from "../Layouts/AppListGrid";
import SearchInput from "@/src/ui/SearchInput";
import { use, useEffect, useState } from "react";
import { searchApps } from "@/src/utils/searchApps";
import { MagnifyingGlass } from "phosphor-react";
import Select, { SelectOption } from "@/src/ui/Select";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
`;

const FilterWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;

  @media (max-width: 900px) {
    gap: 16px;
    flex-direction: column;
  }
`;

const StyledAppCardSmall = styled(AppCardSmall)<{ $isSeparator: boolean }>`
  &::after {
    content: "";
    display: ${({ $isSeparator }) => ($isSeparator ? "block" : "none")};
    position: absolute;
    bottom: -32px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.neutral7};
  }

  @media (max-width: 900px) {
    &::after {
      display: block;
      bottom: -23px;
    }
    &:last-child::after {
      display: none;
    }
  }
`;

const NotFound = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  color: ${({ theme }) => theme.colors.neutral4};
  text-align: center;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  line-height: 20px;
`;

type Props = {
  configs: SpaceConfigFront[];
  apps: AppFront[];
};

export default function ExploreAppsMain({ configs, apps }: Props): JSX.Element {
  const tagOptions: SelectOption[] = [{ label: "All", value: "" }];
  const [searchInput, setSearchInput] = useState("");
  const [selectedFromTagsApps, setSelectedFromTagsApps] =
    useState<AppFront[]>(apps);
  const [filteredFromSearchApps, setFilteredFromSearchApps] =
    useState<AppFront[]>(apps);
  const [selectedTag, setSelectedTag] = useState<string>("");

  for (const app of apps) {
    for (const tag of app.tags) {
      if (
        !tagOptions.find(
          (option) => option.value?.toLowerCase() === tag.toLowerCase()
        )
      ) {
        tagOptions.push({
          label: capitalizeFirstLetter(tag),
          value: tag?.toLowerCase(),
        });
      }
    }
  }

  function onSelectTag(tag: string) {
    setSelectedTag(tag);
    console.log(tag);

    const _filteredApps = apps.filter((app) => {
      if (tag === "") {
        return true;
      }
      return app.tags.map((tag) => tag.toLowerCase()).includes(tag);
    });
    setSelectedFromTagsApps(_filteredApps);
  }

  function onUserInput(input: string) {
    setSearchInput(input);
    const _filteredApps = searchApps({ input, apps: selectedFromTagsApps });
    console.log(apps);
    console.log(_filteredApps);
    setFilteredFromSearchApps(_filteredApps);
  }

  useEffect(() => {
    setSearchInput("");
    console.log(selectedFromTagsApps);
    setFilteredFromSearchApps(selectedFromTagsApps);
  }, [selectedFromTagsApps]);

  return (
    <Container>
      <FilterWrapper>
        <SearchInput
          placeholder="Search for apps"
          value={searchInput}
          onChange={onUserInput}
        />
        <Select
          options={tagOptions}
          value={selectedTag}
          onChange={onSelectTag}
        />
      </FilterWrapper>

      {filteredFromSearchApps.length > 0 && (
        <AppListGrid>
          {filteredFromSearchApps.map((app, index) => (
            <StyledAppCardSmall
              key={app.slug + index}
              app={app}
              $isSeparator={
                filteredFromSearchApps.length % 2 === 0
                  ? index !== filteredFromSearchApps.length - 1 &&
                    index !== filteredFromSearchApps.length - 2
                  : index !== filteredFromSearchApps.length - 1
              }
            />
          ))}
        </AppListGrid>
      )}
      {filteredFromSearchApps.length === 0 && (
        <NotFound>
          <MagnifyingGlass size={32} />
          {`We can't find a result for '${searchInput}'`}
        </NotFound>
      )}
    </Container>
  );
}
