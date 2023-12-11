import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import CreateProposal from "../components/CreateProposal";
import useEagerConnect from "../hooks/useEagerConnect";
import Vote from "../components/Vote";
import Proposals from "../components/Proposals";

function Home() {
  const { isActive } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  return (
    <div>
      <Head>
        <title>Governor interaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">Governor interaction</Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        {isActive && (
          <section>
            <Proposals />
          </section>
        )}
        <div>Proposal & Vote</div>
        {isActive && (
          <section>
            <CreateProposal />
          </section>
        )}

        {isActive && (
          <section>
            <Vote />
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
