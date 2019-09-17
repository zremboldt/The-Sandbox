export default {
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "valueStatement",
      title: "Value statement",
      type: "string",
    },
    {
      name: "startingPrice",
      title: "Starting price",
      type: "number",
    },
    {
      name: "marketingCopy",
      title: "Marketing copy",
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
      name: "heroProductImage",
      title: "Hero product image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "heroBackgroundImage",
      title: "Hero background image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "heroProductImage",
    },
  },
}
