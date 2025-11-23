// ===============================================================
// SCRIPT 4: CONSULTAS DE AGREGACION PARA CALCULAR ESTADISTICAS
// ===============================================================

// 1. NUMERO DE RESERVAS POR CLIENTE
print("1. Numero de reservas por cliente:");
db.reservas.aggregate([
    {$group: {_id: "$cliente_id", totalReservas: {$sum: 1}}},
    {$sort: {totalReservas: -1}},
    {$limit: 5}
])

// 2. PROMEDIO DE PERSONAS POR RESERVA
print("2. Promedio de personas por reserva:");
db.reservas.aggregate([
    {$group: {_id: null, 
        promedioPersonas: {$avg: "$numero_personas"},
        maxPersonas: {$max: "$numero_personas"},
        minPersonas: {$min: "$numero_personas"}
    }}
])

// 3. HORARIOS MAS POPULARES
print("3. Horarios más populares:");
db.reservas.aggregate([
    {$project: {hora: {$hour: "$fecha_reserva"}}},
    {$group: {_id: "$hora", totalReservas: {$sum: 1}}},
    {$sort: {totalReservas: -1}},
    {$limit: 3}
])

// 4. DISTRIBUCIÓN DE RESERVAS POR CAPACIDAD DE MESA
print("4. Distribución de reservas por capacidad de mesa:");
db.reservas.aggregate([
    {$lookup: {
        from: "mesas",
        localField: "mesa_id",
        foreignField: "_id",
        as: "mesa_info"
    }},
    {$unwind: "$mesa_info"},
    {$group: {
        _id: "$mesa_info.capacidad",
        totalReservas: {$sum: 1},
        promedioOcupacion: {$avg: "$numero_personas"}
    }},
    {$sort: {_id: 1}}
])