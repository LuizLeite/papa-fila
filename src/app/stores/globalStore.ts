import { create } from 'zustand'

type ItemProps = {
  id: number;
  qtd: number;
  name: string;
  price: number;
}

type ActionsProps = {
  addItem: (item: ItemProps) => void;
  delItem: (itemId: number) => void;
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
        state: {itens: [...state.state.itens, item]}
      })),
    delItem: (itemId: number) =>
      set((state: StoreProps) => ({
        state: { itens: state.state.itens.filter((item: any) => item.id != itemId)}
      }))
  }
}))
