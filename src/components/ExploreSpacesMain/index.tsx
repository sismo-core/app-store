"use client";
import styled from "styled-components";
import SearchInput from "@/src/ui/SearchInput";
import { useEffect, useState } from "react";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import Select, { SelectOption } from "@/src/ui/Select";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";
import { searchInSpaceConfigs } from "@/src/utils/searchInSpaceConfigs";
import SpaceCard from "../SpaceCard";
import { SpaceType } from "@/src/services/spaces-service";

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

const Flex = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
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

const StyledSpaceCard = styled(SpaceCard)`
  @media (max-width: 900px) {
    width: 100%;
  }
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
  spaces: SpaceType[];
};

export default function ExploreSpacesMain({ spaces }: Props): JSX.Element {
  const BATCH = 20;

  const [loadMoreHovered, setLoadMoreHovered] = useState<boolean>(false);
  const tagOptions: SelectOption[] = [{ label: "All", value: "" }];
  const [searchInput, setSearchInput] = useState("");
  const [selectedFromTagsSpaces, setSelectedFromTagsSpaces] =
    useState<SpaceType[]>(spaces);
  const [filteredSpaces, setFilteredSpaces] =
    useState<SpaceType[]>(spaces);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [displayedSpaces, setDisplayedSpaces] = useState<SpaceType[]>(
    spaces.slice(0, BATCH)
  );
  const [loadMore, setLoadMore] = useState<number>(0);

  for (const space of spaces) {
    if (!space?.tags) continue;
    for (const tag of space?.tags) {
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
    const _filteredSpaces = spaces.filter((app) => {
      if (tag === "") {
        return true;
      }
      return app.tags.map((tag) => tag.toLowerCase()).includes(tag);
    });
    setSelectedFromTagsSpaces(_filteredSpaces);
  }

  function onUserInput(input: string) {
    setSearchInput(input);
    const _filteredSpaces = searchInSpaceConfigs({
      searchString: input,
      spaceConfigs: selectedFromTagsSpaces,
    });
    setFilteredSpaces(_filteredSpaces);
  }

  useEffect(() => {
    setSearchInput("");
    setFilteredSpaces(selectedFromTagsSpaces);
  }, [selectedFromTagsSpaces]);

  useEffect(() => {
    setDisplayedSpaces(
      filteredSpaces?.slice(0, BATCH + loadMore * BATCH) || []
    );
  }, [filteredSpaces, loadMore]);

  const isLoadMore = filteredSpaces?.length > displayedSpaces?.length;

  return (
    <Container>
      <FilterWrapper>
        <SearchInput
          placeholder="Search for spaces"
          value={searchInput}
          onChange={onUserInput}
        />
        <Select
          options={tagOptions}
          value={selectedTag}
          onChange={onSelectTag}
        />
      </FilterWrapper>

      {displayedSpaces.length > 0 && (
        <Flex>
          {displayedSpaces.map((space, index) => (
            <StyledSpaceCard key={space.slug + index} space={space} />
          ))}
        </Flex>
      )}
      {displayedSpaces.length === 0 && (
        <NotFound>
          <MagnifyingGlass size={32} />
          {`We can't find a result for '${searchInput}'`}
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
