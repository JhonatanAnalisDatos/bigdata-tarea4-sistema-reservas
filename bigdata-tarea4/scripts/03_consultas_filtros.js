// =============================================
// SCRIPT 3: CONSULTAS CON FILTROS
// =============================================

// 1. RESERVAS PARA MÁS DE 4 PERSONAS
print("1. Reservas para más de 4 personas:");
db.reservas.find({numero_personas: {$gt: 4}}).count();

// 2. MESAS CON CAPACIDAD MAYOR A 6
print("2. Mesas con capacidad mayor a 6 personas:");
db.mesas.find({capacidad: {$gte: 6}}).pretty();

// 3. RESERVAS CON REQUERIMIENTOS ESPECIALES

print("3. Reservas con requerimientos especiales:");
db.reservas.find({
    notas: {$in: ["Alergia a mariscos", "Preferencia comida vegetariana"]}
}).pretty()