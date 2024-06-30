import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 18px;
    font-family: "Inter", sans-serif;

    *, *::before, *::after {
      box-sizing: border-box;
    }

    a:active, a:focus { outline: none; }

    b { font-weight: 600 } /* Bugzilla fix */

    input, textarea {outline:none;}
    input:active, textarea:active {outline:none;}
    :focus {outline:none;}
    textarea {resize:none;}
    textarea {resize:vertical;}
    textarea {resize:horizontal;}

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }

  html, body, #app, #app>div {
    height: 100%
  }
`
