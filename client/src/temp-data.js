const data = {
    users: [
        {
            'id': 1,
            'username': 'bobman',
            'password': '123bob'
        },
        {
            'id': 2,
            'username': 'kenguy',
            'password': '123ken'
        }
    ],
    trips: [
        {
            'id': 1,
            'user': 1,
            'name': 'Paris',
            'startDate': '12/01/2024',
            'endDate': '12/08/2024',
            'lists': [1]
        },
        {
            'id': 2,
            'user': 1,
            'name': 'Hong Kong',
            'startDate': '02/01/2025',
            'endDate': '02/14/2025',
            'lists': []
        },
        {
            'id': 3,
            'user': 2,
            'name': 'Boston',
            'startDate': '02/01/2025',
            'endDate': '02/14/2025',
            'lists': []
        }
    ],
    lists: [
        {
            'id': 1,
            'user': 1,
            'name': 'Sightseeing in Paris',
            'trip': 1,
            'locations': ['Eiffel Tower', 'The Louvre', 'Arc de Triumphe']
        },
        {
            'id': 2,
            'user': 1,
            'name': 'My Favourite Restaurants in Toronto',
            'trip': null,
            'locations': ['Luis H', 'Enoteca Sociale', 'PG Clucks']
        },
        {
            'id': 3,
            'user': 2,
            'name': 'Dive Bars',
            'trip': null,
            'locations': ['Mezzrows', 'Ted\'s Collision', 'Farside']
        }
    ],
    profiles: [
        {
            'id': 1,
            'fname': 'Robert',
            'lname': 'Man',
            'memberSince': '11/02/2024'
        },
        {
            'id': 2,
            'fname': 'Kenneth',
            'lname': 'Guy',
            'memberSince': '11/03/2024'
        }
    ]
}
export default data;