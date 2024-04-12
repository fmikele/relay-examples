import * as React from "react";
import { graphql } from "relay-runtime";
import { ImageFragment$key } from "./__generated__/ImageFragment.graphql";
import { useFragment } from "react-relay";

const ImageFragment = graphql`
    fragment ImageFragment  on Image 
    @argumentDefinitions(
      width: {
        type: "Int",
        defaultValue: null
      }
      height: {
        type: "Int",
        defaultValue: null
      }
    )
    {
      url (
        width: $width,
        height: $height
      )
      altText
    }
`;

type Props = {
  image: ImageFragment$key;
  width?: number;
  height?: number;
  className?: string;
};


export default function Image({ image, width, height, className }: Props): React.ReactElement {

const data = useFragment(ImageFragment, image);

  if (image == null) {
    return null;
  }

  return (
    <img
      alt={data.altText}
      key={data.url}
      src={data.url}
      width={width}
      height={height}
      className={className}
    />
  );

}


/*
export default function Image({
  image,
  width,
  height,
  className,
}: Props): React.ReactElement {

const data = useFragment(ImageFragment, image);

  if (image == null) {
    return null;
  }
  return (
    <img
      key={image.url}
      src={image.url}
      width={width}
      height={height}
      className={className}
    />
  );
}

*/