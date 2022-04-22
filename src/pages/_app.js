import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import store from "../redux/store";
import Nav from "../component/nav";
import { Provider } from "react-redux";
import AuthProvider from "../component/AuthProvider";
import Nav from "../component/nav";





function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Nav />
          <Component {...pageProps} />
        </AuthProvider>

      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
