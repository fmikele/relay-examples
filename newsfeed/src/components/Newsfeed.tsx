import * as React from "react";
import { graphql } from 'relay-runtime';
import Story from "./Story";
import { useLazyLoadQuery } from "react-relay";
import type {NewsfeedQuery as NewsfeedQueryType} from './__generated__/NewsfeedQuery.graphql';

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      ...StoryFragment
    }
  }
`;



export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(
    NewsfeedQuery,
    {},
  );

  const story = data.topStory;

  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
