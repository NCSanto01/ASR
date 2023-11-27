// Un apartamento que tenga una cama real, en el que me pueda quedar una única noche.
db.listingsAndReviews.find({minimum_nights:"1", bed_type:"Real Bed", property_type:"Apartment"});

// Top 10 de sitios más caros
db.listingsAndReviews.find().sort({price: -1}).limit(10);

// estancias en las que me puedo quedar 31 días y que tengan una política de cancelación moderada o flexible.
db.listingsAndReviews.find({
    $expr: {$gte: [{$toInt: "$maximum_nights"}, 31]},
    cancellation_policy: {$in: ["flexible", "moderate"]}
    })
    
// Todas las estancias que tengan en la descripción la palabra “clean” y ordenadas por número de reviews.
db.listingsAndReviews.find({
    description: {$regex: ".*clean.*"}
}).sort({number_of_reviews: -1})

// 3 índices que nos mejore el rendimiento de algunas de las consultas de arriba.

db.listingsAndReviews.createIndex({ "minimum_nights": 1, "bed_type": 1, "property_type": 1 })
// Este índice guarda los tres campos para poder acceder a ellos más rápidamente. Además, se buscan los apartamentos con el campo
// minimum_nights más bajo, por lo que al indexar ese campo en orden ascendente se optimiza mucho la consulta.

db.listingsAndReviews.createIndex({ "price": -1 })
// Este índice guarda directamente los documentos ordenados por el precio en orden descendente, por lo que la consulta
// solamente tiene que escoger los 10 primeros elementos del index.

db.listingsAndReviews.createIndex({ description: 1, number_of_reviews: -1 })
// Este índice permite almacenar las descripciones y el number_of_reviews de los documentos en orden descendente, para que no se tengan que leer los documentos enteros en la query.



   