// =============================================
// SCRIPT 1: CREACIÓN DE BASE DE DATOS Y DOCUMENTOS
// Sistema de Reservas para Restaurante - MongoDB
// Curso Big Data UNAD - Tarea 4
// ========================================================================================

// Crear y seleccionar la base de datos
use reservas_db

print("Iniciando creación de base de datos...");

// Crear 100 mesas
print("Creando 100 mesas...");
for (let i = 1; i <= 100; i++) {
    let capacidad = 2 + (i % 7);
    db.mesas.insertOne({
        numero: i,
        capacidad: capacidad
    });
}
print("100 mesas creadas exitosamente!");

// Crear 100 clientes 

// ========================================================================================
// Array de 100 nombres diferentes
const nombres = ["Ana García", "Carlos López", "María Rodríguez", "José Martínez", "Laura Hernández", 
                "Miguel González", "Elena Pérez", "David Sánchez", "Isabel Ramírez", "Francisco Torres",
                "Carmen Flores", "Javier Díaz", "Rosa Vázquez", "Antonio Castro", "Sandra Romero",
                "Daniel Molina", "Patricia Ortega", "Juan Navarro", "Teresa Iglesias", "Pedro Jiménez",
                "Lucía Rubio", "Alejandro Marín", "Beatriz Sosa", "Raúl Campos", "Olga Reyes",
                "Fernando Núñez", "Adriana Vega", "Roberto Medina", "Nuria Guerrero", "Alberto Cortés",
                "Eva Peña", "Sergio León", "Clara Rivas", "Víctor Gil", "Monica Silva",
                "Gabriel Morales", "Lidia Delgado", "Ricardo Bravo", "Verónica Cabrera", "Héctor Ponce",
                "Inés Otero", "Ángel Santana", "Celia Márquez", "Iván Pascual", "Alicia Rojas",
                "Óscar Franco", "Natalia Benítez", "Marcos Vidal", "Miriam Carmona", "Jorge Prieto",
                "Esther Gutiérrez", "Andrés Palma", "Lorena Calvo", "Rubén Crespo", "Silvia Méndez",
                "Guillermo Herrero", "Sonia Domínguez", "Emilio Lozano", "Noelia Cano", "Felipe Peinado",
                "Marina Redondo", "Alfonso Acosta", "Gloria Juárez", "Simón Valero", "Yolanda Rueda",
                "Tomás Arenas", "Lola Bernal", "Nicolás Rojo", "Aurora Figueroa", "Saúl Montes",
                "Carolina Segura", "Fermín Carrasco", "Esperanza Gallardo", "Aitor Paredes", "Rocío Polo",
                "Boris Rivera", "Pilar Salas", "Amador Soto", "Concepción Sanz", "Damián Lucas",
                "Jenifer Nieto", "César Ávila", "Manuela Rincón", "Samuel Román", "Eugenia Mora",
                "Rodrigo Vera", "Margarita Cobo", "Jaime Lorenzo", "Candela Montesinos", "Teodoro Pozo",
                "Asunción Quintana", "Ismael Sierra", "Elisa Villalba", "Hipólito Espejo", "Lidia Barrios",
                "Fabio Córdoba", "Aurelia Valverde", "Renato Téllez", "Matilde Garrido", "Leandro Correa"];

// Crear 100 clientes
for (let i = 0; i < 100; i++) {
    let telefono = "6" + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    let email = nombres[i].toLowerCase().replace(" ", ".") + "@email.com";
    
    db.clientes.insertOne({
        nombre: nombres[i],
        telefono: telefono,
        email: email
    });
    print("Cliente " + (i+1) + " creado: " + nombres[i]);
}
print("100 clientes creados exitosamente!");

// ========================================================================================

//CREAR 100 RESERVAS

// Obtener todos los IDs de mesas y clientes

const mesas = db.mesas.find().toArray();
const clientes = db.clientes.find().toArray();

print("Mesas disponibles: " + mesas.length);
print("Clientes registrados: " + clientes.length);

// Crear 100 reservas

for (let i = 0; i < 100; i++) {
    let cliente = clientes[Math.floor(Math.random() * clientes.length)];
    let mesa = mesas[Math.floor(Math.random() * mesas.length)];
    
    // Generar fecha aleatoria en los próximos 30 días
    let fecha = new Date();
    fecha.setDate(fecha.getDate() + Math.floor(Math.random() * 30));
    
    // Ajustar hora entre 12:00 y 22:00
    let hora = 12 + Math.floor(Math.random() * 10);
    fecha.setHours(hora, 0, 0, 0);
    
    let numero_personas = Math.min(1 + Math.floor(Math.random() * 6), mesa.capacidad);
    
    let notas = [
        "Sin observaciones",
        "Alergia a mariscos",
        "Celebración cumpleaños",
        "Mesa cerca de la ventana",
        "Cliente VIP",
        "Trae su propio vino",
        "Necesita silla alta",
        "Reserva empresarial",
        "Aniversario",
        "Preferencia comida vegetariana"
    ][Math.floor(Math.random() * 10)];
    
    db.reservas.insertOne({
        cliente_id: cliente._id,
        mesa_id: mesa._id,
        fecha_reserva: fecha,
        numero_personas: numero_personas,
        notas: notas
    });
    print("Reserva " + (i+1) + " creada para " + numero_personas + " personas");
}
print("100 reservas creadas exitosamente!");