import React, { useState } from 'react';
import ServStyles from './services.module.css';
import { CardsDummy } from './CardsDummy.jsx';

export default function ServCards() {
    const [cards] = useState(CardsDummy);

    return (
        <div className={ServStyles.servcards}>
            {cards.map((cardsdata, index) => (
                <div key={index} className={ServStyles.cardss}>
                    <div className={ServStyles.cardFront}>
                        <p style={{ color: 'white' }}>{cardsdata.Name}</p>
                        <img src={cardsdata.Image} alt={cardsdata.Name} />
                    </div>
                    <div className={ServStyles.cardBack}>
                        <img src={cardsdata.Image} className={ServStyles.smallImage} alt={cardsdata.Name} />
                        <p>{cardsdata.Text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
