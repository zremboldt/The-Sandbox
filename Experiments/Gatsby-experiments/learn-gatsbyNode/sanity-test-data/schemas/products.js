export default {
  title: "Products",
  name: "products",
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
      title: "Product type",
      name: "productType",
      type: "string",
      description:
        "In what category would you like this product to be displayed in places like the main menu on hustlerturf.com?",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Stand On", value: "standOn" },
          { title: "Walk Behind", value: "walkBehind" },
          { title: "Utility Vehicle", value: "utilityVehicle" },
          { title: "Pressure Washer", value: "pressureWasher" },
          { title: "Generator", value: "generator" },
        ],
        layout: "radio",
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Marketing copy",
      name: "marketingCopy",
      type: "text",
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
      title: "Test",
      name: "test",
      type: "string",
    },
    {
      title: "Studio images",
      name: "studioImages",
      type: "array",
      of: [
        {
          title: "Studio image",
          name: "studioImage",
          type: "imageWithContent",
        },
        // {
        //   title: "Studio image",
        //   name: "studioImage",
        //   type: "image",
        //   fields: [
        //     {
        //       title: "Title",
        //       name: "title",
        //       type: "string",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //     {
        //       title: "Caption",
        //       name: "caption",
        //       type: "string",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //     {
        //       title: "Alt text",
        //       name: "altText",
        //       type: "string",
        //       description:
        //         "Include a description of the image to improve SEO and accessibility.",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //   ],
        // },
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
          type: "imageWithContent",
        },
        // {
        //   title: "Lifestyle image",
        //   name: "lifestyleImage",
        //   type: "image",
        //   fields: [
        //     {
        //       title: "Title",
        //       name: "title",
        //       type: "string",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //     {
        //       title: "Caption",
        //       name: "caption",
        //       type: "string",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //     {
        //       title: "Alt text",
        //       name: "altText",
        //       type: "string",
        //       description:
        //         "Include a description of the image to improve SEO and accessibility.",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //   ],
        // },
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
          type: "imageWithContent",
        },
        // {
        //   title: "Feature",
        //   name: "feature",
        //   type: "image",
        //   fields: [
        //     {
        //       title: "Title",
        //       name: "title",
        //       type: "string",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //     {
        //       title: "Caption",
        //       name: "caption",
        //       type: "string",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //     {
        //       title: "Alt text",
        //       name: "altText",
        //       type: "string",
        //       description:
        //         "Include a description of the image to improve SEO and accessibility.",
        //       options: {
        //         isHighlighted: true, // <-- make this field easily accessible
        //       },
        //     },
        //   ],
        // },
      ],
      options: { layout: "list" },
    },

    // Creates a set of checkboxes ↓
    // {
    //   title: "Product type",
    //   name: "productType",
    //   type: "array",
    //   description:
    //     "In what category would you like this product to be displayed in places like the main menu on hustlerturf.com?",
    //   of: [{ type: "string" }],
    //   options: {
    //     layout: "tags",
    //     list: [
    //       { title: "Residential", value: "residential" },
    //       { title: "Commercial", value: "commercial" },
    //       { title: "Stand On", value: "standOn" },
    //       { title: "Walk Behind", value: "walkBehind" },
    //       { title: "Utility Vehicle", value: "utilityVehicle" },
    //       { title: "Pressure Washer", value: "pressureWasher" },
    //       { title: "Generator", value: "generator" },
    //     ],
    //   },
    // },

    // {
    //   title: "Marketing copy",
    //   name: "marketingCopy",
    //   type: "array",
    //   of: [
    //     {
    //       title: "Block",
    //       type: "block",
    //       styles: [{ title: "Normal", value: "normal" }],
    //       lists: [],
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: "name",
      media: "heroProductImage",
    },
  },
}
