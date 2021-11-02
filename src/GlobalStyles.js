const sizes = {
    iPhone5: '320px',
    galaxyS5: '360px',
    iphone6_7_8_X: '375px',
    iphone6_7_8Plus: '414px',
    pixel2: '411px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const devices = {
    iPhone5: `(min-width: ${sizes.iPhone5})`,
    galaxyS5: `(min-width: ${sizes.galaxyS5})`,
    iphone6_7_8_X: `(min-width: ${sizes.iphone6_7_8_X})`,
    iphone6_7_8Plus: `(min-width: ${sizes.iphone6_7_8Plus})`,
    pixel2: `(min-width: ${sizes.pixel2})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    laptopL: `(min-width: ${sizes.laptopL})`,
    desktop: `(min-width: ${sizes.desktop})`,
};