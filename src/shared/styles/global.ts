import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }

    .site-layout-content {
        min-height: 280px;
        padding: 24px;
        background: #fff;
    }

    .page-header {
        border: 1px solid #eee;
        margin-bottom: 20px;
        background-color: #fff;
    }
`

export default GlobalStyle
