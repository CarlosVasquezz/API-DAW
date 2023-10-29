const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pensumTecnico = [
    { codigo: 'TIC101', nombre: 'Introducción a la Computación', uv: 4 },
    { codigo: 'TIC102', nombre: 'Programación Básica', uv: 4 },
    { codigo: 'TIC103', nombre: 'Estructuras de Datos', uv: 4 },
    { codigo: 'TIC104', nombre: 'Programación Web', uv: 4 },
    { codigo: 'TIC105', nombre: 'Sistemas Operativos', uv: 4 },
    { codigo: 'TIC106', nombre: 'Bases de Datos', uv: 4 },
    { codigo: 'TIC107', nombre: 'Redes de Computadoras', uv: 4 },
    { codigo: 'TIC108', nombre: 'Inteligencia Artificial', uv: 4 },
    { codigo: 'TIC109', nombre: 'Seguridad Informática', uv: 4 },
    { codigo: 'TIC110', nombre: 'Proyecto Final', uv: 6 },
  ];
  
  const pensumIngenieria = [
    { codigo: 'IC1001', nombre: 'Álgebra Lineal', uv: 4 },
    { codigo: 'IC1002', nombre: 'Cálculo Diferencial', uv: 4 },
    { codigo: 'IC1003', nombre: 'Física General', uv: 4 },
    { codigo: 'IC1004', nombre: 'Introducción a la Programación', uv: 4 },
    { codigo: 'IC1005', nombre: 'Circuitos Eléctricos', uv: 4 },
    { codigo: 'IC1006', nombre: 'Análisis de Algoritmos', uv: 4 },
    { codigo: 'IC1007', nombre: 'Sistemas Operativos', uv: 4 },
    { codigo: 'IC1008', nombre: 'Bases de Datos Avanzadas', uv: 4 },
    { codigo: 'IC1009', nombre: 'Redes de Computadoras', uv: 4 },
    { codigo: 'IC1010', nombre: 'Proyecto de Investigación', uv: 6 },
  ];

// Ruta para consultar prerrequisitos de una materia por código
app.get('/api/pensum/:carrera/prerrequisitos/:codigo', (req, res) => {
  const { carrera, codigo } = req.params;
  const pensum = carrera === 'tecnico' ? pensumTecnico : pensumIngenieria;

  const materia = pensum.find(m => m.codigo === codigo);

  if (materia) {
    res.json({ prerrequisitos: materia.prerequisitos });
  } else {
    res.status(404).json({ mensaje: 'Materia no encontrada' });
  }
});

// Ruta para consultar materias por ciclo
app.get('/api/pensum/:carrera/ciclo/:numero', (req, res) => {
  const { carrera, numero } = req.params;
  const pensum = carrera === 'tecnico' ? pensumTecnico : pensumIngenieria;

  const materiasPorCiclo = pensum.filter(m => m.ciclo === numero);

  if (materiasPorCiclo.length > 0) {
    res.json(materiasPorCiclo);
  } else {
    res.status(404).json({ mensaje: 'No se encontraron materias para el ciclo especificado' });
  }
});

// Ruta para inscribir materias
app.post('/api/inscripcion/:carrera', (req, res) => {
    const { carrera } = req.params;
    const inscripcion = req.body;
    const pensum = carrera === 'tecnico' ? pensumTecnico : pensumIngenieria;
    const inscritas = []; 
  
    if (inscripcion.materias.length !== 4) {
      res.status(400).json({ mensaje: 'Debe inscribir exactamente 4 materias' });
    } else {
      let totalUV = 0;
  
      // Verifica que las materias existan y suman las unidades de valor (UV)
      for (const codigoMateria of inscripcion.materias) {
        const materia = pensum.find(m => m.codigo === codigoMateria);
  
        if (!materia) {
          res.status(404).json({ mensaje: `La materia ${codigoMateria} no existe en el pensum` });
          return;
        }
  
        totalUV += materia.creditos;
      }
  
      // Lógica de validación adicional (puede incluir restricciones específicas)
  
      if (totalUV >= 16) {
        inscritas.push(...inscripcion.materias);
        res.json({ mensaje: 'Inscripción exitosa', inscritas });
      } else {
        res.status(400).json({ mensaje: 'No cumple con la cantidad de UV requeridas' });
      }
    }
  });
  

// Ruta para eliminar inscripciones de materias
app.delete('/api/inscripcion/:carrera/:materia', (req, res) => {
    const { carrera, materia } = req.params;
    const inscritas = []; 
  
    if (!inscritas.includes(materia)) {
      res.status(404).json({ mensaje: `La materia ${materia} no está inscrita` });
    } else {
      // Lógica para eliminar la materia del registro de inscripciones
      const index = inscritas.indexOf(materia);
      inscritas.splice(index, 1);
      res.json({ mensaje: `Se ha eliminado la materia ${materia}` });
    }
  });
  

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
