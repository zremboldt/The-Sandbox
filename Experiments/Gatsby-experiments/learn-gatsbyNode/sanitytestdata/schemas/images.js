export default {
  name: "images",
  title: "Images",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      title: "Hero background images",
      name: "heroBackgroundImages",
      type: "array",
      of: [
        {
          title: "Photo",
          name: "photo",
          type: "image",
        },
      ],
      options: { layout: "grid" },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "heroProductImage",
    },
  },
}
