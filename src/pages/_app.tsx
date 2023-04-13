import { UserProvider } from "@/context/UsersContext";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7e22ce",
          colorSplit: "#7e22ce32",
        },
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ConfigProvider>
  );
}
