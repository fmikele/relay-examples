import * as React from "react";
import { graphql } from "relay-runtime";
import { useFragment, usePaginationFragment } from "react-relay";
import type { StoryCommentsSectionFragment$key } from "./__generated__/StoryCommentsSectionFragment.graphql";
import Comment from "./Comment";
import LoadMoreCommentsButton from "./LoadMoreCommentsButton";

const { useState, useTransition } = React;

export type Props = {
  story: StoryCommentsSectionFragment$key;
};

//startCursor
const StoryCommentsSectionFragment = graphql`
  fragment StoryCommentsSectionFragment on Story
    @refetchable(queryName: "StoryCommentsSectionPaginationQuery")
    @argumentDefinitions(
      cursor: { type: "String" }
      count: { 
        type: "Int", 
        defaultValue: 3 
        }
    )
   
   {
    comments(after: $cursor, first: $count)
      @connection(key: "StoryCommentsSectionFragment_comments")
     {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          ...CommentFragment
        }
      }
    }
  }
`;

// export default function StoryCommentsSection({ story }: Props) {
//   const data = useFragment(StoryCommentsSectionFragment, story);
//   return (
//     <div>
//       {data.comments.edges.map((edge) => (
//         <Comment key={edge.node.id} comment={edge.node} />
//       ))}
//     </div>
//   );
// }


export default function StoryCommentsSection({story}: Props) {
  const [isPending, startTransition] = useTransition();
  const {data, loadNext} = usePaginationFragment(StoryCommentsSectionFragment, story);
  const onLoadMore = () => startTransition(() => {
    loadNext(3);
  });
  return (
    <>
      {data.comments.edges.map(commentEdge =>
        <Comment comment={commentEdge.node} />
      )}
      {data.comments.pageInfo.hasNextPage && (
        <LoadMoreCommentsButton
          onClick={onLoadMore}
          disabled={isPending}
        />
      )}
      {/* {isPending && <CommentsLoadingSpinner />} */}
    </>
  );
}

