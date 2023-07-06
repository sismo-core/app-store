"use client";

import styled from "styled-components";
import AppCardSmall from "../AppCardSmall";
import AppListGrid from "../Layouts/AppListGrid";
import SearchInput from "@/src/ui/SearchInput";
import { useEffect, useState } from "react";
import { searchInApps } from "@/src/utils/searchInApps";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import Select, { SelectOption } from "@/src/ui/Select";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";
import { ZkAppType } from "@/src/libs/spaces";

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

const LoadMore = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.neutral3};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 20px;
  cursor: pointer;
  margin: 16px 0px 8px 0px;
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

const StyledCaretDown = styled(CaretDown)<{ $isHovered: boolean }>`
  animation: ${({ $isHovered }) =>
    $isHovered ? "translate .8s infinite" : "none"};

  @keyframes translate {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

type Props = {
  apps: ZkAppType[];
};

export default function ExploreAppsMain({ apps }: Props): JSX.Element {
  const BATCH = 14;

  const [loadMoreHovered, setLoadMoreHovered] = useState<boolean>(false);
  const tagOptions: SelectOption[] = [{ label: "All", value: "" }];
  const [searchInput, setSearchInput] = useState("");
  const [selectedFromTagsApps, setSelectedFromTagsApps] = useState<ZkAppType[]>(apps);
  const [filteredApps, setFilteredApps] = useState<ZkAppType[]>(apps);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [displayedApps, setDisplayedApps] = useState<ZkAppType[]>(
    apps.slice(0, BATCH)
  );
  const [loadMore, setLoadMore] = useState<number>(0);

  for (const app of apps) {
    if (!app?.tags) continue;
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
    const _filteredApps = searchInApps({
      searchString: input,
      apps: selectedFromTagsApps,
    });
    setFilteredApps(_filteredApps);
    setDisplayedApps(filteredApps?.slice(0, BATCH + loadMore * BATCH) || []);
  }

  useEffect(() => {
    setSearchInput("");
    setFilteredApps(selectedFromTagsApps);
  }, [selectedFromTagsApps]);

  useEffect(() => {
    setDisplayedApps(filteredApps?.slice(0, BATCH + loadMore * BATCH) || []);
  }, [filteredApps, loadMore]);

  const isLoadMore =
    filteredApps?.length > displayedApps?.length && displayedApps.length > 0;

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

      {displayedApps.length > 0 && (
        <AppListGrid>
          {displayedApps.map((app, index) => (
            <AppCardSmall
              app={app}
              key={app.space.slug + app.slug + index }
              isSeparator={
                displayedApps.length % 2 === 0
                  ? index !== displayedApps.length - 1 &&
                    index !== displayedApps.length - 2
                  : index !== displayedApps.length - 1
              }
            />
          ))}
        </AppListGrid>
      )}
      {displayedApps.length === 0 && (
        <NotFound>
          <MagnifyingGlass size={32} />
          {`We can't find a result for "${searchInput}"`}
        </NotFound>
      )}
      {isLoadMore && (
        <LoadMore
          onClick={() => setLoadMore((curr) => curr + 1)}
          onMouseEnter={() => setLoadMoreHovered(true)}
          onMouseLeave={() => setLoadMoreHovered(false)}
        >
          Load more
          <StyledCaretDown size={20} $isHovered={loadMoreHovered} />
        </LoadMore>
      )}
    </Container>
  );
}
