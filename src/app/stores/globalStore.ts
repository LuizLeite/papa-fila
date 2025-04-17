import { create } from 'zustand'

type ItemProps = {
  id: number;
  qtd: number;
  name: string;
  price: number;
}

type ActionsProps = {
  addItem: (item: ItemProps) => void;
  delItem: (item: ItemProps) => void;
}

type StoreProps = {
  state: {
    itens: ItemProps[];
    qtdTotal: number;
    valTotal: number;
  };
  actions: ActionsProps;
}

export const useCarrinho = create<StoreProps>((set) => ({
  state: {
    itens: [],
    qtdTotal: 0,
    valTotal: 0.0,
  },
  actions: {
    addItem: (item: ItemProps) =>
      set((state: StoreProps) => ({
        state: {
          qtdTotal: state.state.qtdTotal + 1,
          valTotal: state.state.valTotal + item.price,
          itens: [...state.state.itens, item]
        }
      })),
    delItem: (item: ItemProps) =>
      set((state: StoreProps) => ({
        state: {
          qtdTotal: state.state.qtdTotal - 1,
          valTotal: state.state.valTotal - item.price,
          itens: state.state.itens.filter((itemX: ItemProps) => itemX.id != item.id)
        }
      }))
  }
}))
