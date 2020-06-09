import React from 'react';
import Banner from '../components/homePageCarousel/Banner';
import Shops from '../components/homePageShops/Shops';
import Footer from '../components/footer/Footer';


function HomePage() {
    return (
        <div>
            <Banner />
            <Shops />
            <div style={{width: '81%', margin: '0 auto'}}>
                <Footer />
            </div>
        </div>
    )
}

export default React.memo(HomePage);
