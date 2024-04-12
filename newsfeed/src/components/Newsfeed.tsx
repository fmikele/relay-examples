import * as React from "react";
import { graphql } from 'relay-runtime';
import Story from "./Story";
import { useLazyLoadQuery } from "react-relay";
import type {NewsfeedQuery as NewsfeedQueryType} from './__generated__/NewsfeedQuery.graphql';

// const NewsfeedQuery = graphql`
//   query NewsfeedQuery {
//     topStory {
//       ...StoryFragment
//     }
//   }
// `;

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStories {
      id
      ...StoryFragment
    }
  }
`;


export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(
    NewsfeedQuery,
    {},
  );

  // const story = data.topStory;
  const stories = data.topStories;

  return (
    <div className="newsfeed">
      {/* <Story story={story} /> */}
      {stories.map(story => <Story key={story.id} story={story} />)}
      
     
    </div>
  );
}
