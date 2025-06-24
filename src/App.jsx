// PropuestaApptiva - Prueba de Integración con MySQL
// Desarrollado por: Andres_Patiño
import React, { useState, useEffect } from 'react';
import './App.css'; // Importa tu archivo CSS personalizado si es necesario

export default function App() {
  const [cliente, setCliente] = useState({ cedula: '', nombre: '', correo: '', edad: '' });
  const [credito, setCredito] = useState({ cliente_id: '', monto: '', tasa_mensual: '', plazo_meses: '', cuota_fija_mensual: '', fecha_desembolso: '' });
  const [clientesCreditos, setClientesCreditos] = useState([]);
  const [cedulaBuscar, setCedulaBuscar] = useState('');
  const [clienteIdExistente, setClienteIdExistente] = useState(null);
  const [clienteNombreExistente, setClienteNombreExistente] = useState('');
  const [nuevoCredito, setNuevoCredito] = useState({ monto: '', tasa_mensual: '', plazo_meses: '', cuota_fija_mensual: '', fecha_desembolso: '' });

  const handleClienteSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
    const data = await res.json();
    alert('Cliente creado con ID: ' + data.id);
    setCredito(prev => ({ ...prev, cliente_id: data.id }));
  };

  const handleCreditoSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/creditos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credito)
    });
    const data = await res.json();
    alert('Crédito registrado con ID: ' + data.id);
  };

  const buscarCliente = async () => {
    const res = await fetch(`http://localhost:5000/api/clientes?cedula=${cedulaBuscar}`);
    const data = await res.json();
    if (res.ok) {
      setClienteIdExistente(data.id);
      setClienteNombreExistente(data.nombre);
      alert(`Cliente encontrado: ${data.nombre}`);
    } else {
      setClienteIdExistente(null);
      alert('Cliente no encontrado');
    }
  };

  const handleNuevoCreditoSubmit = async (e) => {
    e.preventDefault();
    if (!clienteIdExistente) return alert('Primero busca un cliente válido');
    const res = await fetch('http://localhost:5000/api/creditos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...nuevoCredito, cliente_id: clienteIdExistente })
    });
    const data = await res.json();
    if (res.ok) {
      alert(`Crédito creado con ID: ${data.id}`);
    } else {
      alert(`Error al registrar crédito: ${data.error}`);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/clientes_creditos')
      .then(res => res.json())
      .then(setClientesCreditos);
  }, []);

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold">Registrar Cliente</h1>
      <form onSubmit={handleClienteSubmit} className="grid grid-cols-2 gap-4">
        <input placeholder="Cédula" value={cliente.cedula} onChange={e => setCliente({ ...cliente, cedula: e.target.value })} />
        <input placeholder="Nombre" value={cliente.nombre} onChange={e => setCliente({ ...cliente, nombre: e.target.value })} />
        <input placeholder="Correo" value={cliente.correo} onChange={e => setCliente({ ...cliente, correo: e.target.value })} />
        <input placeholder="Edad" type="number" value={cliente.edad} onChange={e => setCliente({ ...cliente, edad: e.target.value })} />
        <button className="col-span-2 bg-blue-600 text-white p-2 rounded">Guardar Cliente</button>
      </form>

      <h1 className="text-xl font-bold">Registrar Crédito</h1>
      <form onSubmit={handleCreditoSubmit} className="grid grid-cols-2 gap-4">
        <input placeholder="Monto" value={credito.monto} onChange={e => setCredito({ ...credito, monto: e.target.value })} />
        <input placeholder="Tasa Mensual" value={credito.tasa_mensual} onChange={e => setCredito({ ...credito, tasa_mensual: e.target.value })} />
        <input placeholder="Plazo (meses)" value={credito.plazo_meses} onChange={e => setCredito({ ...credito, plazo_meses: e.target.value })} />
        <input placeholder="Cuota Fija" value={credito.cuota_fija_mensual} onChange={e => setCredito({ ...credito, cuota_fija_mensual: e.target.value })} />
        <input placeholder="Fecha Desembolso" type="date" value={credito.fecha_desembolso} onChange={e => setCredito({ ...credito, fecha_desembolso: e.target.value })} />
        <button className="col-span-2 bg-green-600 text-white p-2 rounded">Guardar Crédito</button>
      </form>

      <h1 className="text-xl font-bold mt-10">Asignar Crédito a Cliente Existente</h1>
      <div className="mb-4 flex items-center gap-2">
        <input placeholder="Cédula del cliente" className="border p-2 rounded w-64" value={cedulaBuscar} onChange={(e) => setCedulaBuscar(e.target.value)} />
        <button onClick={buscarCliente} className="bg-blue-600 text-white px-4 py-2 rounded">Buscar Cliente</button>
      </div>

      {clienteIdExistente && (
        <>
          <p className="mb-2 text-green-700">Cliente seleccionado: <strong>{clienteNombreExistente}</strong></p>
          <form onSubmit={handleNuevoCreditoSubmit} className="grid grid-cols-2 gap-4">
            <input placeholder="Monto" className="border p-2 rounded" value={nuevoCredito.monto} onChange={e => setNuevoCredito({ ...nuevoCredito, monto: e.target.value })} />
            <input placeholder="Tasa Mensual" className="border p-2 rounded" value={nuevoCredito.tasa_mensual} onChange={e => setNuevoCredito({ ...nuevoCredito, tasa_mensual: e.target.value })} />
            <input placeholder="Plazo (meses)" className="border p-2 rounded" value={nuevoCredito.plazo_meses} onChange={e => setNuevoCredito({ ...nuevoCredito, plazo_meses: e.target.value })} />
            <input placeholder="Cuota Fija" className="border p-2 rounded" value={nuevoCredito.cuota_fija_mensual} onChange={e => setNuevoCredito({ ...nuevoCredito, cuota_fija_mensual: e.target.value })} />
            <input type="date" className="border p-2 rounded" value={nuevoCredito.fecha_desembolso} onChange={e => setNuevoCredito({ ...nuevoCredito, fecha_desembolso: e.target.value })} />
            <button className="col-span-2 bg-green-600 text-white p-2 rounded">Guardar Crédito</button>
          </form>
        </>
      )}

      <h2 className="text-xl font-bold mt-10">Clientes y Créditos Registrados</h2>
      <table className="w-full border mt-4 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Cédula</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Edad</th>
            <th className="border p-2">Monto</th>
            <th className="border p-2">Tasa</th>
            <th className="border p-2">Plazo</th>
            <th className="border p-2">Cuota</th>
            <th className="border p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {clientesCreditos.map((row, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{row.nombre}</td>
              <td className="border p-2">{row.cedula}</td>
              <td className="border p-2">{row.correo}</td>
              <td className="border p-2">{row.edad}</td>
              <td className="border p-2">{row.monto || '-'}</td>
              <td className="border p-2">{row.tasa_mensual || '-'}</td>
              <td className="border p-2">{row.plazo_meses || '-'}</td>
              <td className="border p-2">{row.cuota_fija_mensual || '-'}</td>
              <td className="border p-2">{row.fecha_desembolso ? new Date(row.fecha_desembolso).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}