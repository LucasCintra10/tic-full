import "./Table.css";
import api from "../../lib/axios";
import { useEffect, useState } from "react";
import { TableData } from "../../models/table-data";

import AlertDelete from "../AlertDelete/AlertDelete";
import DialogUpdate from "../DialogUpdate/DialogUpdate";

function Table() {
  const [tableData, setTableData] = useState<TableData[]>([]);

  function getTableData() {
    api.get("/consulta").then((response) => setTableData(response.data));
  }

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead className="table-header">
          <tr>
            <th>Placa</th>
            <th>Descricao</th>
            <th>Categoria</th>
            <th>Data de Entrada</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Localizacao</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        {tableData?.length > 0 ? (
          tableData.map((data) => (
            <tbody className="table-body">
              <tr>
                <td>{data.placa}</td>
                <td>{data.descricao}</td>
                <td>{data.nm_categoria}</td>
                <td>{new Date(data.dataEntrada).toLocaleDateString()}</td>
                <td>{data.estado}</td>
                <td>{data.valor}</td>
                <td>{data.status}</td>
                <td>{data.nm_sala}</td>
                <td>
                  <DialogUpdate {...data} />
                </td>
                <td>
                  <AlertDelete {...data} />
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <p>Nenhum dado encontrado</p>
        )}
      </table>
    </div>
  );
}

export default Table;
