import "../styles/globals.css";
import "@shopify/polaris/dist/styles.css";
import { Provider } from "next-auth/client";
import { AppProvider } from "@shopify/polaris";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AppProvider i18n={{}}>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
