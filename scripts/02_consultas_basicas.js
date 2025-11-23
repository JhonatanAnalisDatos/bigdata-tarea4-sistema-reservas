// =============================================
// SCRIPT 2: CONSULTAS BÁSICAS
// Sistema de Reservas para Restaurante - MongoDB
// =============================================

// 1. LISTAR TODAS LAS MESAS
print("1. Listado de todas las mesas:");
db.mesas.find().pretty();

// 2. LISTAR CLIENTES (LIMITADO A 10)
print("2. Listado de 10 clientes:");
db.clientes.find({}, {nombre: 1, telefono: 1, email: 1}).limit(10).pretty();

// 3. RESERVAS ACTIVAS (PRÓXIMAS 5)
print("3. Próximas 5 reservas:");
db.reservas.find().sort({fecha_reserva: 1}).limit(5).pretty();

// 4. CONTEO TOTAL DE DOCUMENTOS
print("4. Conteo de documentos por colección:");
print("Mesas: " + db.mesas.countDocuments());
print("Clientes: " + db.clientes.countDocuments());
print("Reservas: " + db.reservas.countDocuments());