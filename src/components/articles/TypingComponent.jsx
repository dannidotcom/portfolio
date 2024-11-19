import React from 'react';
import Typed from 'react-typed';

const TypingComponent = () => {
    return (
        <div>
            <h1>
                <Typed
                    strings={['Bienvenue sur notre site!', 'Découvrez nos services.', 'Contactez-nous pour en savoir plus!']}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                />
            </h1>
        </div>
    );
};

export default TypingComponent;
