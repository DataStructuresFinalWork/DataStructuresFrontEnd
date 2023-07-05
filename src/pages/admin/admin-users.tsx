import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Button, TableBody } from "@mui/material"
import { useEffect, useState } from "react"
import { IUsers } from "../../interfaces/IUsers"
import { Link } from "react-router-dom";
import http from "../../http";
import styles from './Botao.module.scss';

const AdminUsers = () => {

  const [usuariosSelectionSort, setUsuariosSelectionSort] = useState<IUsers[]>([]);
  const [usuariosQuickSort, setUsuariosQuickSort] = useState<IUsers[]>([]);
  const [usuarios, setUsuarios] = useState<IUsers[]>([]);
  const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState<string>('');
  const [tempoOrdenacao, setTempoOrdenacao] = useState<number>(0);

  // Função de ordenação por Selection Sort
  const selectionSort = (arr: IUsers[]): IUsers[] => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let maxIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j].idade > arr[maxIndex].idade) {
          maxIndex = j;
        }
      }
      if (maxIndex !== i) {
        const temp = arr[i];
        arr[i] = arr[maxIndex];
        arr[maxIndex] = temp;
      }
    }
    return arr;
  };


  // Função de ordenação por Quick Sort
  const quickSort = (arr: IUsers[]): IUsers[] => {
    if (arr.length <= 1) {
      return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const less = [];
    const greater = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === pivotIndex) {
        continue;
      }
      if (arr[i].idade <= pivot.idade) {
        less.push(arr[i]);
      } else {
        greater.push(arr[i]);
      }
    }

    return [...quickSort(less), pivot, ...quickSort(greater)];
  };

  const calcularDesempenho = (funcao: Function, arr: IUsers[]): number => {
    const inicio = performance.now();
    funcao(arr);
    const fim = performance.now();
    const duracaoMilissegundos = fim - inicio;
    const duracaoSegundos = duracaoMilissegundos / 1000;
    const duracaoMicrossegundos = duracaoMilissegundos * 1000;

    console.log(`Tempo de execução: ${duracaoSegundos.toFixed(3)} segundos (${duracaoMicrossegundos.toFixed(3)} microssegundos)`);

    return duracaoMilissegundos;
  };



  const ordenarPorSelectionSort = () => {
    const usuariosOrdenados = selectionSort([...usuarios]);

    // Cálculo de desempenho
    const duracaoOrdenacao = calcularDesempenho(selectionSort, usuariosOrdenados);
    setTempoOrdenacao(duracaoOrdenacao);

    setUsuariosSelectionSort(usuariosOrdenados);
    setOrdenacaoSelecionada('selection'); // Atualiza a ordenação selecionada
  };

  const ordenarPorQuickSort = () => {
    const usuariosOrdenados = quickSort([...usuarios]);

    // Cálculo de desempenho
    const duracaoOrdenacao = calcularDesempenho(quickSort, usuariosOrdenados);
    setTempoOrdenacao(duracaoOrdenacao);

    setUsuariosQuickSort(usuariosOrdenados);
    setOrdenacaoSelecionada('quick'); // Atualiza a ordenação selecionada
  };

  const excluir = (usuario: IUsers) => {
    http.delete(`/${usuario.id}`)
      .then(() => {
        const listaUsuarios = usuarios.filter(u => u.id !== usuario.id);
        setUsuarios(listaUsuarios);
      });
  }

  const usuariosOrdenados =
    ordenacaoSelecionada === 'selection' ? selectionSort([...usuarios]) :
    ordenacaoSelecionada === 'quick' ? quickSort([...usuarios]) :
    usuarios;

  useEffect(() => {
    http.get<IUsers[]>('/')
      .then(resposta => {
        setUsuarios(resposta.data)
      })
      .catch(erro => {
        console.log(erro.data)
      });
  }, []);

  return (
    <>
      <div className={styles.separador}>
        <div>
          <Button variant="contained" color="success" onClick={ordenarPorQuickSort}>
            QUICK SORT
          </Button>
        </div>
        <div>
          <Button variant="outlined" color="error" onClick={ordenarPorSelectionSort}>
            SELECTION SORT
          </Button>
        </div>
        {tempoOrdenacao > 0 && (
          <div>
            <p>Tempo de Ordenação: {(tempoOrdenacao / 1000).toFixed(3)} segundos</p>
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Idade
              </TableCell>
              <TableCell>
                Editar
              </TableCell>
              <TableCell>
                Excluir
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosOrdenados.map((usuario: IUsers) =>
              <TableRow key={usuario.id}>
                <TableCell>
                  {usuario.nome}
                </TableCell>
                <TableCell>
                  {usuario.idade}
                </TableCell>
                <TableCell>
                  [ <Link to={`${usuario.id}`}>editar</Link> ]
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(usuario)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdminUsers;
