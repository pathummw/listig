export const GROCERY_ITEMS_DATA = [
    {
        value: 'mjölk_choklad',
        label: 'Mjölk choklad',
        id: 100,
        green_points: 3,
        quantity_type: 'st',
        quantity: 1,
        category: 'candy',
        group: 'chocolate'
    },
    {
        value: 'eko_mjölk_choklad',
        label: 'Eko mjölk choklad',
        id: 101,
        green_points: 5,
        quantity_type: 'st',
        quantity: 1,
        category: 'candy',
        group: 'chocolate'
    },
    {
        value: 'jordgubbar',
        label: 'Jordgubbar',
        id: 200,
        green_points: 4,
        quantity_type: 'pkt',
        quantity: 1,
        category: 'fruits',
        group: 'strawbery'
    },
    {
        value: 'svensk_jordgubbar',
        label: 'Svensk jordgubbar',
        id: 201,
        green_points: 5,
        quantity_type: 'pkt',
        quantity: 1,
        category: 'fruits',
        group: 'strawbery'
    },
    {
        value: 'gurka',
        label: 'Gurka',
        id: 300,
        green_points: 3,
        quantity_type: 'st',
        quantity: 1,
        category: 'vegitables',
        group: 'gurka'
    },
    {
        value: 'eko_gurka',
        label: 'Eko gurka',
        id: 301,
        green_points: 5,
        quantity_type: 'st',
        quantity: 1,
        category: 'vegitables',
        group: 'gurka'
    },
    {
        value: 'banana',
        label: 'Banana',
        id: 400,
        green_points: 2,
        quantity_type: 'kg',
        quantity: 1,
        category: 'fruits',
        group: 'banana'
    },
    {
        value: 'eco_banan',
        label: 'Ekologisk Banan',
        id: 401,
        green_points: 5,
        quantity_type: 'kg',
        quantity: 1,
        category: 'fruits',
        group: 'banana'

    },
    {
        value: 'kyckling_färs',
        label: 'Kyckling färs',
        id: 500,
        green_points: 1,
        quantity_type: 'kg',
        quantity: 1,
        category: 'meet',
        group: 'färs'
    },
    {
        value: 'soyafärs',
        label: 'Soya färs',
        id: 501,
        green_points: 5,
        quantity_type: 'kg',
        quantity: 1,
        category: 'vego',
        group: 'färs'
    },
    {
        value: 'quorn_färs',
        label: 'Quorn färs',
        id: 502,
        green_points: 5,
        quantity_type: 'kg',
        quantity: 1,
        category: 'vego',
        group: 'färs'
    },
    {
        value: 'nöttfärs',
        label: 'Nött färs',
        id: 503,
        green_points: 1,
        quantity_type: 'kg',
        quantity: 1,
        category: 'meet',
        group: 'färs'
    }
]


//..........................................................//
//.............How data categorized.........................//
//..........................................................//

/*
Nötfärs -> Soyafärs , Quorn färs
Köttfärs -> Soyafärs , Quorn färs

Banan -> Ekologisk Banan
Äpple -> Eko äpple

*/

/* Standardmjölk 3% Wrap
Art. nr. 205571
Skånemejerier

Mellanmjölk 1,5%, lång hållbarhet
Art. nr. 205493
Sverigemjölken

Mellanmjölk 1,5% 10 liter KRAV
Art. nr. 739421
Skånemejerier

Filmjölk 3% LF KRAV
Art. nr. 208415
Arla Ko

Banan EKO
Art. nr. 755052
MENIGO FOG

Banan Rättvisemärkt EKO
Art. nr. 729459
MENIGO FOG

Formbar Vegofärs
Art. nr. 409228
Anamma

Vegofärs
Art. nr. 408543
Anamma

Nötfärs 10%
Art. nr. 405580
Just Cook it

Blandfärs 70/30 3mm SE
Art. nr. 200053
Menigo Färskvaruhallen */