import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "../app/constants";
import { selectToken } from "../app/redux/reducers/authSlice";
import { verifySession } from "./api/middleware/verifySession";

export default function Home() {
  const token = useSelector(selectToken);
  const router = useRouter();
  useEffect(() => {
    if (token) verifySession(ROUTES.INSTRUMENTS);
    else router.push(ROUTES.LOGIN);
  }, []);

  return (
    <div>
      <Head>
        <title>Frontend</title>
        <meta name="description" content="Frontend for full stack task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
