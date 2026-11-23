import childcareDrawing from "../assets/photos/childcare-teacher-drawing.jpg";
import homeBlocks from "../assets/photos/home-teacher-blocks.jpg";

export interface OrgPhoto {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

export const photos: Record<"home" | "childcare", OrgPhoto> = {
  home: {
    src: homeBlocks,
    alt: "A teacher sitting on the floor of a bright classroom shows a colourful block to young children",
    credit: "AMONWAT DUMKRUT",
    creditUrl: "https://unsplash.com/photos/teacher-shows-colorful-blocks-to-young-children-sQcFcFImSg8",
  },
  childcare: {
    src: childcareDrawing,
    alt: "A teacher in a bright blue dress guides young children who are drawing together at a table",
    credit: "Rewired Digital",
    creditUrl: "https://unsplash.com/photos/teacher-guiding-children-drawing-at-a-table-kPkRpy6pIIg",
  },
};
