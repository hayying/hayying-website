export default defineAppConfig({
  ui: {
    primary: "blue",
    gray: "zinc",
    icons: {
      dynamic: true,
    },
    input: {
      base: "border-b-2 border-gray-200 focus:border-primary-500",
      rounded: "",
      default: {
        variant: "none",
      },
    },
    button: {
      padding: {
        "2xs": "px-7 py-1",
        xs: "px-7 py-1.5",
        sm: "px-7 py-1.5",
        md: "px-7 py-2",
        lg: "px-7 py-2.5",
        xl: "px-7 py-2.5",
      },
    },
  },
});
