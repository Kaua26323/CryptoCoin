import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styles from "./home.module.css";
import { toast } from "react-toastify";

export interface CoinsProps {
  changePercent24Hr: string;
  explorer: string;
  formatedMarket: string;
  formatedPrice: string;
  formatedVolume: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

interface DataProps {
  data: CoinsProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [control, setControl] = useState(0);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    LoadApi();
  }, [control]);

  async function LoadApi() {
    fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${control}`, {
      headers: {
        Authorization:
          "Bearer 0d40c2fe0acc9a79236e710b5c0aac08afd410f8df1a5c158749173c00efa2ce",
      },
    })
      .then((response) => response.json())
      .then((data: DataProps) => {
        const coinInfo = data.data;

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const priceCompact = Intl.NumberFormat("En-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const formatedResults = coinInfo.map((item) => {
          const formatedItems = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
          };
          return formatedItems;
        });

        const savedItems = [...coins, ...formatedResults];

        setCoins(savedItems);
        setLoading(false);
      });
  }

  function searchCoins(event: FormEvent) {
    event.preventDefault();
    if (input === "") {
      toast.warn("Digite uma Moeda Valida!");
      return;
    }

    navigate(`/details/${input}`, { replace: true });
  }

  function LoadMore() {
    if (control === 0) {
      setControl(10);
      return;
    } else {
      setControl(control + 10);
      return;
    }
  }

  {
    if (loading) {
      return <h1>Carregando...</h1>;
    }
  }

  return (
    <main className={styles.wrapper}>
      <form className={styles.formArea}>
        <input
          type="text"
          placeholder="Digite o nome da moeda...EX Bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={searchCoins} type="submit" className={styles.button}>
          <BsSearch className={styles.icons} />
        </button>
      </form>

      <table>
        <thead>
          <tr className={styles.trItems}>
            <th scope="col"> Moeda </th>
            <th scope="col"> Valor mercado</th>
            <th scope="col"> Preço </th>
            <th scope="col"> Volume </th>
            <th scope="col"> Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins?.length > 0 &&
            coins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <div className={styles.criptoInfo}>
                    <img
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                      alt="Cripto logo"
                    />

                    <Link to={`/details/${item.id}`}>
                      <span>
                        {item.name} | {item.symbol}{" "}
                      </span>
                    </Link>
                  </div>
                </td>

                <td className={styles.tdLabel} data-label="Valor mercado">
                  {item.formatedMarket}
                </td>

                <td className={styles.tdLabel} data-label="Preço">
                  {item.formatedPrice}
                </td>

                <td className={styles.tdLabel} data-label="volume">
                  {item.formatedVolume}
                </td>

                <td
                  className={
                    Number(item.changePercent24Hr) > 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                  data-label="Mudança 24h"
                >
                  {Number(item.changePercent24Hr).toFixed(2)}%
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={() => LoadMore()}>
        Carregar mais
      </button>
    </main>
  );
}
