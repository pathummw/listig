
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

/* Headings 45px - Black
Sub heading 17px - Bold
Normal text 15px - Light
Övrig text mindre 15px - Thin italic */