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
      title: "Images",
      name: "images",
      type: "array",
      of: [
        {
          title: "Image",
          name: "image",
          type: "image",
        },
      ],
      options: { layout: "list" },
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
}
