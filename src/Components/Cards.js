import React, {useState} from 'react';
import Header from './Header';
import styles from '../styles/cards.module.css';
import RadialChart from './RadialChart';

const Cards = props => {
    const [selectedCard, setSelectedCard] = useState('None');
    
    const clickHandler = cardName => {
        setSelectedCard(cardName)
        props.handleSelect(cardName);
    }

    return (
        <div className={styles.container}>
            <section className={styles.cardList}>
                {props.renderList.map(item => (
                    <div key={item.title} className={styles.card} onClick={() => clickHandler(item.title)}>
                        <header className={styles.cardHeader}>
                            <h1 className={styles.cardTitle}>{item.title}</h1>
                        </header>
                        <div className={styles.radialChartContainer}>
                            <RadialChart progress={item.score} color='#3c71d0' radius={60}/>
                            <span className={styles.centerScore}>{item.score}%</span>
                        </div>
                    </div>
                )
                )}
            </section>
        </div>
    );
}

export default Cards;