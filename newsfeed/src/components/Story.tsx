import * as React from "react";
import { graphql } from 'relay-runtime';
import Card from "./Card";
import Heading from "./Heading";
import PosterByline, { type Props as PosterBylineProps } from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import Timestamp from './Timestamp';
import { useFragment } from 'react-relay';
import type {StoryFragment$key} from './__generated__/StoryFragment.graphql';


const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    poster{
      ...PosterBylineFragment
    }
    thumbnail {
      ...ImageFragment @arguments(width: 400)
    }
  }
`;

type Props = {
  story: StoryFragment$key;
};

export default function Story({story}: Props) {
  const data = useFragment(
    StoryFragment,
    story,
  );
  return (
    <Card>
      <Heading>{data.title}</Heading>
      <PosterByline poster={data.poster} />
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
    </Card>
  );
}


  // return (
  //   <Card>
  //     <PosterByline poster={story.poster} />
  //     <Heading>{story.title}</Heading>
  //     <Timestamp time={story.createdAt} /> 
  //     <Image image={story.thumbnail} width={400} height={400} />
  //     <StorySummary summary={story.summary} />
  //   </Card>
  // );



