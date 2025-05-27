import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {CoinsProps} from '../Home/index';
import styles from './details.module.css';
//`https://api.coincap.io/v2/assets/${cripto}`

interface ResponseData {
    data: CoinsProps;
}

interface ErrorData {
    error: string;
}

type DataCoins = ResponseData | ErrorData;

export function Details(){
    const { cripto } = useParams();
    const [coin, setCoin] = useState<CoinsProps>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            try{
                fetch(`https://rest.coincap.io/v3/assets/${cripto}`, {
                    headers: {
                        'Authorization': 'Bearer 0d40c2fe0acc9a79236e710b5c0aac08afd410f8df1a5c158749173c00efa2ce'
                    }
                })
                .then(response => response.json())
                .then( (data:DataCoins) => {
                    
                    if("error" in data){
                        navigate('/');
                        alert("Algo deu errado!");
                        return;
                    }
                    
                    const price = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });

                    const priceCompact = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact',
                    });

                    const formatedResults = {
                        ...data.data,
                        formatedPrice: price.format(Number(data.data.priceUsd)),
                        formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
                    }
                    setCoin(formatedResults);
                    setLoading(false);
                })

            }catch(erro){
                alert(`Algo deu errado!`);
                console.log(erro);
                navigate("/");
            }
        }
        getData();
    }, [cripto]);

    {if(loading){
        return(
            <h1>Carregando detalhes...</h1>
        )
    }}

    return(
        <main className={styles.mainArea}>
            <h1>{coin?.name}</h1>
            <h1>{coin?.symbol}</h1>

            <section className={styles.coinInfo}>
                <img className={styles.imgLogo} src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} alt="Foto da moeda"/>
                <h1>{coin?.name} | {coin?.symbol}</h1>
                <h2>Preço: {coin?.formatedPrice}</h2>
                <h2>Mercado: {coin?.formatedMarket}</h2>
                <h2>Volume: {coin?.formatedVolume}</h2>
                <h2>
                    Mudança 24h: <span className={Number(coin?.changePercent24Hr) > 0 ? styles.Profit : styles.Loss }>
                        {Number(coin?.changePercent24Hr).toFixed(2)}
                        </span>
                </h2>

            </section>
        </main>
    )
}