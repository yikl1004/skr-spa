import GlobalStyle from "@styles/global";

export const parameters = {
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => (
        <>
            <GlobalStyle />
            <Story />
        </>
    ),
];
