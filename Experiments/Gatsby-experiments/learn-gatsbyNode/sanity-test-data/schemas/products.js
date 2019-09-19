export default {
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      title: "Value statement",
      name: "valueStatement",
      type: "string",
    },
    {
      title: "Starting price",
      name: "startingPrice",
      type: "number",
    },
    {
      title: "Marketing copy",
      name: "marketingCopy",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Hero product image",
      name: "heroProductImage",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Hero background image",
      name: "heroBackgroundImage",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Studio images",
      name: "studioImages",
      type: "array",
      of: [
        {
          title: "Studio image",
          name: "studioImage",
          type: "image",
        },
      ],
      options: { layout: "list", editModal: "fullscreen" },
    },
    {
      title: "Lifestyle images",
      name: "lifestyleImages",
      type: "array",
      of: [
        {
          title: "Lifestyle image",
          name: "lifestyleImage",
          type: "image",
        },
      ],
      options: { layout: "list", editModal: "fullscreen" },
    },
    {
      title: "Features",
      name: "features",
      description:
        "Add feature images, then click each to add a title and caption.",
      type: "array",
      of: [
        {
          title: "Feature",
          name: "feature",
          type: "image",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
              options: {
                isHighlighted: true, // <-- make this field easily accessible
              },
            },
            {
              title: "Caption",
              name: "caption",
              type: "string",
              options: {
                isHighlighted: true, // <-- make this field easily accessible
              },
            },
          ],
        },
      ],
      options: { layout: "list" },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "heroProductImage",
    },
  },
}
