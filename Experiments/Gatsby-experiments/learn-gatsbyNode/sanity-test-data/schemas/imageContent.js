export default {
  title: "Image with content",
  name: "imageWithContent",
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
    {
      title: "Alt text",
      name: "altText",
      type: "string",
      description:
        "Include a description of the image to improve SEO and accessibility.",
      options: {
        isHighlighted: true, // <-- make this field easily accessible
      },
    },
  ],
}
